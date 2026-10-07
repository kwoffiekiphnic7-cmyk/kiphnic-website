export type ChatMsg = { from: "ai" | "me"; text: string };

/** API-shaped message for /api/chat (role/content), converted from ChatMsg. */
export type ApiChatMessage = { role: "user" | "assistant"; content: string };

export function toApiMessages(messages: ChatMsg[]): ApiChatMessage[] {
  return messages
    .map((m) => ({
      role: m.from === "ai" ? ("assistant" as const) : ("user" as const),
      content: m.text,
    }))
    .filter((m) => m.content.trim() !== "");
}

export const QUICK_REPLIES = [
  "2D Platformer",
  "3D Adventure",
  "RPG",
  "Puzzle Game",
  "AI Chatbot",
  "Business Website",
] as const;

export const CHAT_HISTORY_KEY = "kiphnic-chat-history";

export const CHAT_SEED: ChatMsg[] = [
  { from: "ai", text: "Hello, I'm Kiphnic AI. How can I help you today?" },
  { from: "me", text: "I want to build something." },
];

export async function streamChat(
  messages: ApiChatMessage[],
  onToken: (token: string) => void
): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok || !res.body) {
    let detail = "";
    try {
      detail = (await res.json()).error ?? "";
    } catch {
      /* fall through to generic error */
    }
    throw new Error(detail || `Chat request failed (${res.status})`);
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    full += chunk;
    onToken(chunk);
  }
  full += decoder.decode();
  return full.trim() !== ""
    ? full
    : "Kiphnic AI is coming online — full intelligence lands next.";
}

/** Legacy non-streaming helper (kept for compatibility). */
export async function sendChatMessage(text: string): Promise<string> {
  let full = "";
  await streamChat([{ role: "user", content: text }], (t) => {
    full += t;
  });
  return full;
}

export function loadHistory(): ChatMsg[] | null {
  try {
    const raw = localStorage.getItem(CHAT_HISTORY_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(
      (m) => m && (m.from === "ai" || m.from === "me") && typeof m.text === "string"
    );
  } catch {
    return null;
  }
}

export function saveHistory(messages: ChatMsg[]) {
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages.slice(-50)));
  } catch {
    /* storage unavailable — chat still works in-memory */
  }
}
