/** Minimal Upstash Redis / Vercel KV REST client — uses fetch only, no npm deps.
 *  Set KV_REST_API_URL + KV_REST_API_TOKEN (from a free Upstash database).
 *  When unset, every call is a safe no-op so the site keeps working without accounts.
 */
const url = () => process.env.KV_REST_API_URL;
const token = () => process.env.KV_REST_API_TOKEN;

export function kvConfigured(): boolean {
  return Boolean(url() && token());
}

type Cmd = (string | number)[];

async function command<T = unknown>(...args: Cmd): Promise<T | null> {
  const base = url();
  const tok = token();
  if (!base || !tok) return null;
  const res = await fetch(base, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${tok}`,
    },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`KV error ${res.status}`);
  const data = (await res.json()) as { result: T };
  return data.result ?? null;
}

export async function kvGet(key: string): Promise<string | null> {
  return command<string>("GET", key);
}

export async function kvSet(key: string, value: string, ttlSeconds?: number): Promise<void> {
  if (ttlSeconds && ttlSeconds > 0) {
    await command("SET", key, value, "EX", Math.floor(ttlSeconds));
  } else {
    await command("SET", key, value);
  }
}

export async function kvDel(key: string): Promise<void> {
  await command("DEL", key);
}
