"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CHAT_SEED,
  loadHistory,
  saveHistory,
  streamChat,
  toApiMessages,
  type ChatMsg,
} from "@/lib/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMsg[]>(CHAT_SEED);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const hydrated = useRef(false);
  const busyRef = useRef(false);
  // Ref mirror so rapid consecutive sends include the latest state.
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const stored = loadHistory();
    if (stored && stored.length > 0) setMessages(stored);
  }, []);

  useEffect(() => {
    if (hydrated.current) saveHistory(messages);
  }, [messages]);

  const push = useCallback(async (raw: string) => {
    const text = raw.trim();
    if (!text || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setInput("");

    const history: ChatMsg[] = [...messagesRef.current, { from: "me", text } as ChatMsg];
    setMessages(history);
    // Append an empty AI bubble that fills in as tokens stream.
    setMessages((m) => [...m, { from: "ai", text: "" }]);

    try {
      let full = "";
      await streamChat(toApiMessages(history), (token) => {
        full += token;
        const snapshot = full;
        setMessages((m) => {
          const next = [...m];
          next[next.length - 1] = { from: "ai", text: snapshot };
          return next;
        });
      });
      if (full.trim() === "") {
        setMessages((m) => {
          const next = [...m];
          next[next.length - 1] = {
            from: "ai",
            text: "Kiphnic AI is coming online — full intelligence lands next.",
          };
          return next;
        });
      }
    } catch {
      const fallback =
        "Connection hiccup — try again, or reach us at kiphnic7@gmail.com.";
      setMessages((m) => {
        const last = m[m.length - 1];
        if (last?.from === "ai" && last.text.trim() !== "") {
          // Partial stream survived — keep it and note the cut.
          const next = [...m];
          next[next.length - 1] = { from: "ai", text: `${last.text}\n\n_${fallback}_` };
          return next;
        }
        const next = [...m];
        next[next.length - 1] = { from: "ai", text: fallback };
        return next;
      });
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }, []);

  const clear = useCallback(() => {
    setMessages(CHAT_SEED);
  }, []);

  return { messages, input, setInput, busy, push, clear };
}

