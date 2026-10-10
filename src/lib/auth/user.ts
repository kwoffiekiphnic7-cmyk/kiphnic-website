/** User validation + persistence. Stored records never leave the server;
 *  only { email, name } is ever returned to clients.
 */
import { kvGet, kvSet } from "./kv";
import { USER_KEY, type PublicUser } from "./session";
import { hashPassword, verifyPassword } from "./hash";

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type StoredUser = PublicUser & { hash: string; createdAt: number };

type Validation = {
  ok: boolean;
  problems: string[];
  email: string;
  password: string;
  name: string;
};

export function validateCredentials(
  email: unknown,
  password: unknown,
  name?: unknown
): Validation {
  const problems: string[] = [];
  const e = typeof email === "string" ? email.trim().toLowerCase() : "";
  const p = typeof password === "string" ? password : "";

  if (!EMAIL_RE.test(e) || e.length > 200) problems.push("Enter a valid email address.");
  if (p.length < 8) problems.push("Password must be at least 8 characters.");
  if (p.length > 200) problems.push("Password is too long.");

  let n = "";
  if (name !== undefined) {
    n = typeof name === "string" ? name.trim().slice(0, 80) : "";
    if (!n) problems.push("Please enter your name.");
  }

  return { ok: problems.length === 0, problems, email: e, password: p, name: n };
}

export async function findUser(email: string): Promise<StoredUser | null> {
  const raw = await kvGet(USER_KEY(email));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<PublicUser> {
  const stored: StoredUser = {
    email,
    name,
    hash: hashPassword(password),
    createdAt: Date.now(),
  };
  await kvSet(USER_KEY(email), JSON.stringify(stored));
  return { email, name };
}

export async function checkPassword(
  email: string,
  password: string
): Promise<PublicUser | null> {
  const user = await findUser(email);
  if (!user) return null;
  if (!verifyPassword(password, user.hash)) return null;
  return { email: user.email, name: user.name };
}
