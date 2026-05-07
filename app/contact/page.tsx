import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import Image from "next/image";

export default function ContactPage() {
  return (
    <Container className="py-20 lg:py-24">
      <header className="mx-auto max-w-5xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#e8850a]">Get in touch</p>
        <h1 className="mt-4 text-4xl font-semibold text-navy sm:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>
          Contact Information
        </h1>
      </header>

      <div className="mx-auto mt-12 grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#e8850a]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e8850a]">Directory</p>
          </div>
          <div className="mt-5 h-px w-full bg-line/40" aria-hidden="true" />

          <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-soft">
            <div className="absolute inset-y-0 left-0 z-20 w-1.5 bg-[#e8850a]" aria-hidden="true" />
            <div className="relative aspect-[16/8]">
              <Image
                src="/images/contact/directory.jpeg"
                alt="Directory background illustration"
                fill
                sizes="(max-width: 1024px) 92vw, 520px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
              <div className="absolute inset-0 z-10 p-8 sm:p-10">
                <p
                  className="text-xl font-bold text-[#ff9a2e] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:text-2xl"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Office of the Special DGP, Jharkhand
                </p>
                <ul className="mt-5 space-y-2.5 text-lg font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-xl">
                  <li>DGP Headquarters</li>
                  <li>Jharkhand Police</li>
                  <li>Dhurwa, Ranchi</li>
                  <li>Jharkhand 834004</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-black/10 bg-paper p-8">
            <p
              className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e8850a]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Response Disclaimer
            </p>
            <p className="mt-4 text-base leading-7 text-ink/70">
              This portal is maintained for public information and institutional transparency. Direct responses to correspondence via
              this platform are not guaranteed. For emergencies, please dial 112 or contact your local police station immediately.
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#e8850a]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e8850a]">Public Correspondence</p>
          </div>
          <div className="mt-5 h-px w-full bg-line/40" aria-hidden="true" />

          <div className="mt-10 sm:pr-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
