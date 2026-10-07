"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — invisible to humans
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [note, setNote] = useState("");
  const [fieldError, setFieldError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setFieldError("");
    setStatus("sending");
    setNote("Sending…");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send");
      if (!data.delivered) {
        // Not configured end-to-end: surface a clear, actionable fallback.
        setStatus("err");
        setNote(
          "Message saved — email isn't set up yet. Use the button below to write to Kiphnic directly."
        );
        return;
      }
      setStatus("ok");
      setNote("Message sent — Kiphnic will get back to you shortly.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("err");
      setNote(err instanceof Error ? err.message : "Could not send — email kiphnic7@gmail.com directly.");
    }
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <input
        placeholder="Your name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Your name"
      />
      <input
        type="email"
        placeholder="Your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Your email"
      />
      <textarea
        placeholder="Tell us about your project"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        aria-label="Your message"
      />
      {/* Honeypot — hidden from humans, traps bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
      />
      {fieldError && <div className="form-status err">{fieldError}</div>}
      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "SENDING…" : "SEND MESSAGE →"}
      </button>
      <div className={`form-status${status === "ok" ? " ok" : status === "err" ? " err" : ""}`}>
        {note}
      </div>
    </form>
  );
}
