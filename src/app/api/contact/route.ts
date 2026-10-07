import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  const rl = rateLimit(`contact:${clientIp(req)}`, 10);
  if (!rl.ok)
    return NextResponse.json(
      { error: "Too many messages — please wait a minute and try again." },
      { status: 429, headers: { "retry-after": String(Math.ceil(rl.retryAfterMs / 1000)) } }
    );

  let body: { name?: string; email?: string; message?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot: bots fill this hidden field; humans never see it.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (!name || !email)
    return NextResponse.json(
      { error: "Please provide your name and email." },
      { status: 400 }
    );
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ error: "That email doesn't look valid." }, { status: 400 });
  if (!message)
    return NextResponse.json({ error: "Tell us a little about your project." }, { status: 400 });

  const to = process.env.CONTACT_TO_EMAIL ?? "kiphnic7@gmail.com";
  const subject = `New project inquiry from ${name}`;

  const textBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;

  // Send via Gmail SMTP when configured.
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      const nodemailer = require("nodemailer");
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: `Kiphnic Website <${process.env.GMAIL_USER}>`,
        to: [to],
        replyTo: email,
        subject,
        text: textBody,
      });
    } catch (err) {
      console.error("[kiphnic contact — smtp error]", err);
      return NextResponse.json(
        { error: "Could not send — please email kiphnic7@gmail.com directly." },
        { status: 502 }
      );
    }
  } else {
    // No credentials at all: log only, tell the UI to show a helpful fallback.
    console.log("[kiphnic contact — logging only]", {
      name,
      email,
      message: message.slice(0, 2000),
    });
    return NextResponse.json(
      { ok: true, delivered: false, hint: "Set GMAIL_USER + GMAIL_APP_PASSWORD to enable email delivery." },
      { status: 200 }
    );
  }

  // SMTP path succeeded.
  return NextResponse.json({ ok: true, delivered: true });
}

