"use client";

import { useEffect, useRef } from "react";
import { QUICK_REPLIES } from "@/lib/chat";
import { useChat } from "@/components/chat/useChat";
import { useAuth } from "@/components/auth/AuthProvider";

export default function ChatWindow({ compact = false }: { compact?: boolean }) {
  const { messages, input, setInput, busy, push, clear } = useChat();
  const { user, loading, openAuth } = useAuth();
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  function onSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    void push(input);
  }

  // Signed-out visitors must create an account before chatting.
  const gated = !loading && !user;

  return (
    <div className={`terminal${compact ? " terminal-compact" : ""}`}>
      <div className="terminal-top">
        <span>KIPHNIC AI // CORE</span>
        <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {!gated && (
            <button
              type="button"
              onClick={clear}
              aria-label="Clear chat history"
              className="terminal-clear"
            >
              CLEAR
            </button>
          )}
          <span className="online">● ONLINE</span>
        </span>
      </div>
      <div className="chat">
        <div className="chat-log" ref={logRef} role="log" aria-live="polite" aria-label="Kiphnic AI conversation">
          {messages.map((m, i) => (
            <div
              className="chat-row"
              key={i}
              style={m.from === "me" ? { justifyContent: "flex-end" } : undefined}
            >
              <div className={`bubble${m.from === "me" ? " me" : ""}`}>
                {m.text !== "" ? m.text : <span className="typing">Kiphnic AI is thinking…</span>}
              </div>
            </div>
          ))}
          {busy && messages[messages.length - 1]?.text !== "" ? (
            <div className="typing">Kiphnic AI is thinking…</div>
          ) : null}
        </div>

        {gated ? (
          <div className="chat-gate">
            <div className="chat-gate-icon" aria-hidden="true">✦</div>
            <p className="chat-gate-title">Create a free account to chat</p>
            <p className="chat-gate-sub">
              Kiphnic AI is ready — sign up or sign in to start the conversation.
            </p>
            <div className="chat-gate-actions">
              <button className="btn" type="button" onClick={() => openAuth("signup")}>
                CREATE ACCOUNT →
              </button>
              <button className="btn alt" type="button" onClick={() => openAuth("signin")}>
                SIGN IN
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="chips" aria-label="Quick replies">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="chip"
                  disabled={busy}
                  onClick={() => void push(q)}
                >
                  {q}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit}>
              <div className="input" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  aria-label="Ask Kiphnic AI"
                  style={{ flex: 1, background: "transparent", border: 0, outline: "none", color: "var(--text-soft)", font: "inherit" }}
                />
                <button
                  type="submit"
                  aria-label="Send"
                  disabled={busy || !input.trim()}
                  style={{ background: "transparent", border: 0, color: "var(--accent)", cursor: "pointer", fontSize: 18 }}
                >
                  →
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

