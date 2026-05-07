import Link from "next/link";
import { Container } from "@/components/container";
import { contactDetails } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="relative border-t border-black/10 overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/foot.png')",
        }}
      />

      {/* Overlay for opacity */}
      <div className="absolute inset-0 bg-white/90" />
      {/* change 80 → 70 / 60 depending how visible you want image */}

      {/* Content */}
      <div className="relative z-10">
        <Container className="py-12">

          <div className="grid gap-10 md:grid-cols-3">

            {/* Identity */}
            <div>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#d24a43]" />
                <p className="text-xs uppercase tracking-[0.32em] text-[#e8850a] font-semibold">
                  Tadasha Mishra
                </p>
              </div>

              <h2
                className="mt-3 text-lg font-semibold text-ink font-semibold"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Director General of Police, Jharkhand
              </h2>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#e8850a] mb-4 font-semibold">
                Navigation
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink/80 font-semibold">
                <Link href="/" className="hover:text-navy transition">Home</Link>
                <Link href="/about" className="hover:text-navy transition">About</Link>
                <Link href="/career" className="hover:text-navy transition">Career</Link>
                <Link href="/work" className="hover:text-navy transition">Work</Link>
                <Link href="/gallery" className="hover:text-navy transition">Gallery</Link>
                <Link href="/contact" className="hover:text-navy transition">Contact</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#e8850a] mb-4 font-semibold" >
                Contact
              </p>

              <div className="space-y-2 text-sm text-ink/80 font-semibold">
                <p>{contactDetails.office}</p>

                <Link
                  href={`mailto:${contactDetails.email}`}
                  className="block hover:text-navy transition font-semibold"
                >
                  {contactDetails.email}
                </Link>
              </div>

              <div className="flex items-center gap-4 mt-4 font-semibold">
                <a href={contactDetails.social.twitter} target="_blank" className="text-ink/70 hover:text-[#e8850a] transition text-xs">X</a>
                <a href={contactDetails.social.instagram} target="_blank" className="text-ink/70 hover:text-[#e8850a] transition text-xs">Instagram</a>
                <a href={contactDetails.social.linkedin} target="_blank" className="text-ink/70 hover:text-[#e8850a] transition text-xs">LinkedIn</a>
              </div>
            </div>

          </div>

          {/* Bottom */}
          <div className="mt-8 border-t border-black/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-navy font-semibold">
            <p>© {new Date().getFullYear()} Tadasha Mishra</p>

            <div className="flex gap-5">
              <Link href="/privacy" className="hover:text-navy transition">Privacy</Link>
              <Link href="/terms" className="hover:text-navy transition">Terms</Link>
            </div>
          </div>

        </Container>
      </div>
    </footer>
  );
}