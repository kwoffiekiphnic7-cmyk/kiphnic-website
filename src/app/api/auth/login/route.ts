import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { kvConfigured } from "@/lib/auth/kv";
import { checkPassword, validateCredentials } from "@/lib/auth/user";
import { createSession, setSessionCookie, type PublicUser } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!kvConfigured())
    return NextResponse.json({ error: "Accounts aren't set up yet." }, { status: 503 });

  const rl = rateLimit(`login:${clientIp(req)}`, 12, 60_000);
  if (!rl.ok)
    return NextResponse.json(
      { error: "Too many attempts — please wait a minute and try again." },
      { status: 429, headers: { "retry-after": String(Math.ceil(rl.retryAfterMs / 1000)) } }
    );

  let body: { email?: unknown; password?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const v = validateCredentials(body.email, body.password);
  if (!v.ok) return NextResponse.json({ error: v.problems[0] }, { status: 400 });

  const user: PublicUser | null = await checkPassword(v.email, v.password);
  if (!user)
    return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });

  const token = await createSession(user);
  await setSessionCookie(token);
  return NextResponse.json({ ok: true, user });
}
