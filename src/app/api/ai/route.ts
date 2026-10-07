import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { mockReply } from "@/lib/ai-fallback";

export const runtime = "nodejs";

/** Legacy non-streaming endpoint — kept so older clients keep working.
 *  New UI uses /api/chat (streaming). Without ANTHROPIC_API_KEY both use the mock engine.
 */
export async function POST(req: Request) {
  const rl = rateLimit(`ai:${clientIp(req)}`, 30);
  if (!rl.ok)
    return NextResponse.json(
      { reply: "Too many messages — slow down for a few seconds and try again." },
      { status: 429, headers: { "retry-after": String(Math.ceil(rl.retryAfterMs / 1000)) } }
    );

  try {
    const { message, messages } = await req.json();
    const text =
      typeof message === "string" && message.trim() !== ""
        ? message
        : Array.isArray(messages) && messages.length > 0
          ? String(messages[messages.length - 1]?.content ?? messages[messages.length - 1]?.text ?? "")
          : "";
    const trimmed = text.trim().slice(0, 4000);
    if (!trimmed)
      return NextResponse.json({ reply: "Ask me anything — ideas, code, research, building." });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ reply: mockReply(trimmed), engine: "fallback" });

    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system:
          "You are Kiphnic AI on the Kiphnic company website — concise, friendly, practical. Kiphnic is an AI-first technology company (Founder: Mr. Joseph) building AI, software, web, mobile, games and digital systems. Contact: kiphnic7@gmail.com, 0200823079 / 0538616119.",
        messages: [{ role: "user", content: trimmed }],
      }),
    });
    if (!resp.ok) {
      console.error("[kiphnic ai]", resp.status, (await resp.text().catch(() => "")).slice(0, 300));
      return NextResponse.json({ reply: mockReply(trimmed), engine: "fallback" });
    }
    const data = await resp.json();
    const reply =
      data?.content
        ?.filter((b: { type?: string }) => b.type === "text")
        .map((b: { text?: string }) => b.text ?? "")
        .join("") || mockReply(trimmed);
    return NextResponse.json({ reply, engine: "anthropic" });
  } catch {
    return NextResponse.json(
      { reply: "Connection hiccup — try again, or reach us at kiphnic7@gmail.com." },
      { status: 500 }
    );
  }
}
