"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const trap = String(formData.get("company") || "").trim();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subjectInput = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (trap) {
      setStatus("Submission blocked.");
      return;
    }

    if (!name || !email || !subjectInput || !message) {
      setStatus("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: trap,
          name,
          email,
          subject: subjectInput,
          message,
        }),
      });

      let data: { ok?: boolean; error?: string; hint?: string } | null = null;
      try {
        data = (await response.json()) as { ok?: boolean; error?: string; hint?: string };
      } catch {
        const text = await response.text().catch(() => "");
        data = { ok: false, error: text || "Failed to send. Please try again later." };
      }
      if (!response.ok || !data.ok) {
        const message = data.error || "Failed to send. Please try again later.";
        setStatus(data.hint ? `${message} ${data.hint}` : message);
        return;
      }

      setStatus("Message sent successfully.");
      event.currentTarget.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send. Please try again later.";
      setStatus(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold uppercase tracking-[0.18em] text-navy">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="Your full name"
          className="w-full rounded-xl border border-black/15 bg-white px-5 py-3.5 text-[15px] text-ink/80 outline-none transition placeholder:text-ink/45 focus:border-[#e8850a] focus:ring-2 focus:ring-[#e8850a]/15"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold uppercase tracking-[0.18em] text-navy">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-black/15 bg-white px-5 py-3.5 text-[15px] text-ink/80 outline-none transition placeholder:text-ink/45 focus:border-[#e8850a] focus:ring-2 focus:ring-[#e8850a]/15"
        />
      </div>
      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-semibold uppercase tracking-[0.18em] text-navy">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          placeholder="Brief subject line"
          className="w-full rounded-xl border border-black/15 bg-white px-5 py-3.5 text-[15px] text-ink/80 outline-none transition placeholder:text-ink/45 focus:border-[#e8850a] focus:ring-2 focus:ring-[#e8850a]/15"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold uppercase tracking-[0.18em] text-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Your message..."
          className="w-full rounded-2xl border border-black/15 bg-white px-5 py-4 text-[15px] text-ink/80 outline-none transition placeholder:text-ink/45 focus:border-[#e8850a] focus:ring-2 focus:ring-[#e8850a]/15"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-navy px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-[#e8850a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8850a]/40 active:translate-y-0 sm:w-auto sm:min-w-[320px]"
      >
        {isSubmitting ? "Sending..." : "Submit Correspondence"}
      </button>
      {status ? <p className="text-sm text-ink/70">{status}</p> : null}
    </form>
  );
}
