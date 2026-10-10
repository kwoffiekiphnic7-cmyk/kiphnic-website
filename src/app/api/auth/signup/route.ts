import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { kvConfigured } from "@/lib/auth/kv";
import { createUser, findUser, validateCredentials } from "@/lib/auth/user";
import { createSession, setSessionCookie, type PublicUser } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!kvConfigured())
    return NextResponse.json({ error: "Accounts aren't set up yet." }, { status: 503 });

  const rl = rateLimit(`signup:${clientIp(req)}`, 8, 60_000);
  if (!rl.ok)
    return NextResponse.json(
      { error: "Too many attempts — please wait a minute and try again." },
      { status: 429, headers: { "retry-after": String(Math.ceil(rl.retryAfterMs / 1000)) } }
    );

  let body: { name?: unknown; email?: unknown; password?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill this hidden field; humans never see it.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const v = validateCredentials(body.email, body.password, body.name);
  if (!v.ok) return NextResponse.json({ error: v.problems[0] }, { status: 400 });

  const existing = await findUser(v.email);
  if (existing)
    return NextResponse.json(
      { error: "An account with that email already exists — try signing in." },
      { status: 409 }
    );

  const user: PublicUser = await createUser(v.email, v.password, v.name);
  const token = await createSession(user);
  await setSessionCookie(token);
  return NextResponse.json({ ok: true, user });
}
