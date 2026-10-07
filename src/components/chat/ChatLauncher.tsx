"use client";

import { useEffect, useState } from "react";
import ChatWindow from "@/components/chat/ChatWindow";

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        className={`chat-fab${open ? " open" : ""}`}
        aria-expanded={open}
        aria-label={open ? "Close Kiphnic AI chat" : "Open Kiphnic AI chat"}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "✕" : "✦"}
      </button>
      {open ? (
        <div
          className="chat-panel"
          role="dialog"
          aria-label="Chat with Kiphnic AI"
          aria-modal="false"
        >
          <ChatWindow compact />
        </div>
      ) : null}
    </>
  );
}
