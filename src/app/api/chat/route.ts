import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { mockReply, mockStream } from "@/lib/ai-fallback";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are Kiphnic AI, the conversational assistant on the Kiphnic company website.
Kiphnic is an AI-first technology company (Founder: Mr. Joseph) building AI products, software, websites, mobile apps, games and digital systems. Tagline: "Intelligence. Elevated."
Contact: kiphnic7@gmail.com, phones 0200823079 / 0538616119, WhatsApp https://wa.me/233538616119.
Be concise, friendly and practical. Help with questions, code, ideas, research and scoping builds. When someone wants to build something, ask about goal, users and must-have features, then propose steps and a stack. Keep replies under ~180 words unless asked for more.`;

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";
const MAX_HISTORY = 20;
const MAX_CONTENT_CHARS = 4000;

type InMsg = { role?: string; content?: string; from?: string; text?: string };

function normalizeMessages(body: { messages?: InMsg[]; message?: string }) {
  let list: InMsg[] = [];
  if (Array.isArray(body.messages)) list = body.messages;
  else if (typeof body.message === "string" && body.message.trim() !== "")
    list = [{ role: "user", content: body.message }];
  return list
    .map((m) => {
      const role = m.role === "assistant" || m.from === "ai" ? "assistant" : "user";
      const content = String(m.content ?? m.text ?? "").slice(0, MAX_CONTENT_CHARS);
      return { role, content };
    })
    .filter((m) => m.content.trim() !== "")
    .slice(-MAX_HISTORY);
}

function streamHeaders(engine: string) {
  return {
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "no-cache, no-transform",
    "x-kiphnic-engine": engine,
  };
}

async function streamOpenAICompat(
  messages: { role: string; content: string }[],
  cfg: { url: string; key: string; model: string }
) {
  const resp = await fetch(cfg.url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${cfg.key}`,
    },
    body: JSON.stringify({
      model: cfg.model,
      max_tokens: 1024,
      stream: true,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  });
  if (!resp.ok || !resp.body) {
    const detail = await resp.text().catch(() => "");
    throw new Error(`Chat endpoint error ${resp.status}: ${detail.slice(0, 300)}`);
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const upstream = resp.body.getReader();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let buf = "";
      try {
        for (;;) {
          const { done, value } = await upstream.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith("data:")) continue;
            const payload = t.slice(5).trim();
            if (payload === "[DONE]" || payload === "") continue;
            let evt: { choices?: { delta?: { content?: string } }[] };
            try {
              evt = JSON.parse(payload);
            } catch {
              continue;
            }
            const delta = evt.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta !== "") {
              controller.enqueue(encoder.encode(delta));
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });
}

async function streamAnthropic(messages: { role: string; content: string }[], apiKey: string) {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
      stream: true,
    }),
  });
  if (!resp.ok || !resp.body) {
    const detail = await resp.text().catch(() => "");
    throw new Error(`Anthropic error ${resp.status}: ${detail.slice(0, 300)}`);
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const upstream = resp.body.getReader();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let buf = "";
      try {
        for (;;) {
          const { done, value } = await upstream.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith("data:")) continue;
            const payload = t.slice(5).trim();
            if (payload === "[DONE]" || payload === "") continue;
            let evt: { type?: string; delta?: { type?: string; text?: string }; error?: { message?: string } };
            try {
              evt = JSON.parse(payload);
            } catch {
              continue;
            }
            if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta" && typeof evt.delta.text === "string") {
              controller.enqueue(encoder.encode(evt.delta.text));
            } else if (evt.type === "error") {
              throw new Error(evt.error?.message ?? "Anthropic stream error");
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });
}

export async function POST(req: Request) {
  const rl = rateLimit(`chat:${clientIp(req)}`, 30);
  if (!rl.ok)
    return NextResponse.json(
      { error: "Too many messages — slow down for a few seconds and try again." },
      { status: 429, headers: { "retry-after": String(Math.ceil(rl.retryAfterMs / 1000)) } }
    );

  let body: { messages?: InMsg[]; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const messages = normalizeMessages(body);
  if (messages.length === 0)
    return NextResponse.json({ error: "Send at least one message." }, { status: 400 });

  // 1) Your own AI — any OpenAI-compatible endpoint (Groq, OpenRouter, OpenAI, etc.).
  const compatUrl = process.env.OPENAI_COMPAT_API_URL;
  const compatKey = process.env.OPENAI_COMPAT_API_KEY;
  if (compatUrl && compatKey) {
    const cfg = {
      url: compatUrl,
      key: compatKey,
      model: process.env.OPENAI_COMPAT_MODEL ?? "llama-3.3-70b-versatile",
    };
    try {
      const stream = await streamOpenAICompat(messages, cfg);
      return new Response(stream, { headers: streamHeaders("openai-compat") });
    } catch (err) {
      console.error("[kiphnic chat] openai-compat failed, trying fallback chain", err);
    }
  }

  // 2) Anthropic when configured.
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (apiKey) {
    try {
      const stream = await streamAnthropic(messages, apiKey);
      return new Response(stream, { headers: streamHeaders("anthropic") });
    } catch (err) {
      console.error("[kiphnic chat] anthropic failed", err);
    }
  }

  // 3) Built-in mock engine — keeps the chat usable with no keys at all.
  const last = messages[messages.length - 1].content;
  return new Response(mockStream(mockReply(last)), { headers: streamHeaders("fallback") });
}
