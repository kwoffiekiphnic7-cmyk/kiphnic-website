/** Opaque-token sessions stored in KV; the cookie only holds the random token,
 *  which is looked up server-side. httpOnly + sameSite=lax (+ secure in prod).
 */
import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { kvDel, kvGet, kvSet } from "./kv";

export const SESSION_COOKIE = "kiphnic_session";
const SESSION_TTL = 60 * 60 * 24 * 30; // 30 days
export const SESSION_TTL_SECONDS = SESSION_TTL;

export type PublicUser = { email: string; name: string };

export const USER_KEY = (email: string) => `user:${email.toLowerCase()}`;
const SESSION_KEY = (token: string) => `session:${token}`;

export function newToken(): string {
  return randomBytes(32).toString("hex");
}

export async function createSession(user: PublicUser): Promise<string> {
  const token = newToken();
  await kvSet(SESSION_KEY(token), JSON.stringify(user), SESSION_TTL);
  return token;
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL,
  });
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const raw = await kvGet(SESSION_KEY(token));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PublicUser;
    if (!parsed || typeof parsed.email !== "string") return null;
    return { email: parsed.email, name: parsed.name ?? "" };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) await kvDel(SESSION_KEY(token));
  store.delete(SESSION_COOKIE);
}
