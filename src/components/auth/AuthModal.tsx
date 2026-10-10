"use client";

import { useEffect, useRef, useState } from "react";
import type { AuthMode } from "./AuthProvider";

export default function AuthModal({
  open,
  mode,
  onClose,
  onModeChange,
  onAuthed,
}: {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (m: AuthMode) => void;
  onAuthed: () => void | Promise<void>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "err">("idle");
  const [note, setNote] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Close on Escape + focus the first field when opened.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const id = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(id);
    };
  }, [open, onClose]);

  // Reset transient state whenever the modal opens or the mode flips.
  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setNote("");
  }, [open, mode]);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setNote("");
    try {
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "signup" ? { name, email, password, website } : { email, password, website }
        ),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong — try again.");
      setName("");
      setEmail("");
      setPassword("");
      await onAuthed();
    } catch (err) {
      setStatus("err");
      setNote(err instanceof Error ? err.message : "Could not continue — try again.");
    }
  }

  const isSignup = mode === "signup";

  return (
    <div
      className="auth-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={isSignup ? "Create an account" : "Sign in"}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="auth-card">
        <button className="auth-close" type="button" aria-label="Close" onClick={onClose}>
          ✕
        </button>

        <div className="auth-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={isSignup}
            className={`auth-tab${isSignup ? " active" : ""}`}
            onClick={() => onModeChange("signup")}
          >
            CREATE ACCOUNT
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isSignup}
            className={`auth-tab${!isSignup ? " active" : ""}`}
            onClick={() => onModeChange("signin")}
          >
            SIGN IN
          </button>
        </div>

        <h3 className="auth-title">
          {isSignup ? "JOIN KIPHNIC" : "WELCOME BACK"}
          <span>.</span>
        </h3>
        <p className="auth-sub">
          {isSignup
            ? "Create a free account to chat with Kiphnic AI and play Canvas Dodger."
            : "Sign in to continue to Kiphnic AI and Canvas Dodger."}
        </p>

        <form className="auth-form" onSubmit={submit} noValidate>
          {isSignup && (
            <input
              ref={firstFieldRef}
              placeholder="Your name"
              aria-label="Your name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {!isSignup && (
            <input
              ref={firstFieldRef}
              type="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          {isSignup && (
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            aria-label="Password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
          />

          {note && <div className="auth-status err">{note}</div>}

          <button className="btn" type="submit" disabled={status === "sending"}>
            {status === "sending"
              ? "PLEASE WAIT…"
              : isSignup
                ? "CREATE ACCOUNT →"
                : "SIGN IN →"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "New to Kiphnic?"}{" "}
          <button type="button" onClick={() => onModeChange(isSignup ? "signin" : "signup")}>
            {isSignup ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
}
