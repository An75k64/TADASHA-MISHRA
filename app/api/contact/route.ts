import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string; // honeypot
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function isConsumerEmailDomain(domain: string) {
  const normalized = domain.trim().toLowerCase();
  return (
    normalized === "gmail.com" ||
    normalized === "googlemail.com" ||
    normalized === "yahoo.com" ||
    normalized === "outlook.com" ||
    normalized === "hotmail.com" ||
    normalized === "live.com" ||
    normalized === "icloud.com"
  );
}

function pickResendFrom() {
  // Resend requires a verified domain for custom FROM addresses.
  // Using consumer email domains (gmail.com, outlook.com, etc.) will fail domain verification.
  const configured = process.env.RESEND_FROM || process.env.EMAIL_FROM;
  if (configured) {
    const at = configured.lastIndexOf("@");
    if (at > -1) {
      const domain = configured.slice(at + 1);
      if (!isConsumerEmailDomain(domain)) return configured;
    }
  }

  return "onboarding@resend.dev";
}

async function sendViaResend(args: { to: string; replyTo: string; subject: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = pickResendFrom();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [args.to],
      subject: args.subject,
      text: args.text,
      reply_to: args.replyTo,
    }),
  });

  if (!response.ok) {
    const bodyText = await response.text().catch(() => "");

    // Try to extract a helpful message without dumping large JSON into the UI.
    try {
      const body = JSON.parse(bodyText) as { message?: string; name?: string };
      const msg = String(body.message || "").trim();
      if (msg.toLowerCase().includes("domain is not verified")) {
        throw new Error(
          "Resend: FROM domain not verified. Set RESEND_FROM to an address on a verified domain (or leave it unset to use onboarding@resend.dev).",
        );
      }
    } catch {
      // ignore JSON parse errors
    }

    throw new Error(`Resend error: HTTP ${response.status}${bodyText ? ` - ${bodyText}` : ""}`);
  }

  return true;
}

async function sendViaSmtp(args: { to: string; replyTo: string; subject: string; text: string }) {
  if (!process.env.SMTP_HOST) return false;
  const host = requiredEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT || "587");
  const secure = String(process.env.SMTP_SECURE || "").toLowerCase() === "true";
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");

  const from = process.env.SMTP_FROM || user;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // Prevent long hangs on platforms that block outbound SMTP.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  await transporter.sendMail({
    from,
    to: args.to,
    replyTo: args.replyTo,
    subject: args.subject,
    text: args.text,
  });

  return true;
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const company = String(payload.company || "").trim();
  if (company) {
    return NextResponse.json({ ok: false, error: "Submission blocked." }, { status: 400 });
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const subject = String(payload.subject || "").trim();
  const message = String(payload.message || "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  if (name.length > 200 || email.length > 200 || subject.length > 200 || message.length > 5000) {
    return NextResponse.json({ ok: false, error: "Message too long." }, { status: 400 });
  }

  try {
    const formattedDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    await prisma.message.create({
      data: {
        name,
        email,
        subject,
        message,
        date: formattedDate,
      }
    });
  } catch (dbErr) {
    console.error("Failed to save message to db", dbErr);
  }

  try {
    const to = process.env.CONTACT_TO || "tadashamishraofficial@gmail.com";
    const replyTo = email;
    const mailSubject = `[Website] ${subject}`;
    const text = `${message}\n\nFrom: ${name}\nEmail: ${email}`;

    let resendError: unknown = null;
    try {
      const sentViaResend = await sendViaResend({ to, replyTo, subject: mailSubject, text });
      if (sentViaResend) {
        return NextResponse.json({ ok: true }, { status: 200 });
      }
    } catch (error) {
      resendError = error;
    }

    const sentViaSmtp = await sendViaSmtp({ to, replyTo, subject: mailSubject, text });
    if (!sentViaSmtp) {
      if (resendError) throw resendError;
      throw new Error("Email is not configured. Set RESEND_API_KEY or SMTP_* environment variables.");
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send email.";
    const hint =
      "If you're deploying on Vercel, outbound SMTP is often blocked; set RESEND_API_KEY (recommended) or use another email API provider.";
    return NextResponse.json({ ok: false, error: message, hint }, { status: 500 });
  }
}
