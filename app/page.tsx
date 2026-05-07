import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { galleryImages, stats, timeline } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-black/10">
        <div className="absolute inset-0 bg-#F6F1EA opacity-80" />

        <Container className="relative grid min-h-[86vh] items-stretch gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          
          {/* LEFT CONTENT */}
          <div className="max-w-2xl flex flex-col justify-center">
            <h1
              className="text-5xl font-semibold leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl lg:text-7xl text-[#0d2a52]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Tadasha Mishra
            </h1>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-10 bg-[#d24a43]" />
              <p
                className="text-xs font-semibold uppercase tracking-[0.34em]"
                style={{ color: "#e8850a" }}
              >
                DIRECTOR GENERAL OF POLICE, JHARKHAND
              </p>
            </div>

            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/75">
              First woman to lead Jharkhand Police, focused on strengthening accountability, public trust, and effective policing systems.
            </p>

            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/75">
              Leading Jharkhand Police with over three decades of experience in investigation, administration, and public service.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border border-[#b98a53] bg-[#f3e1c8] px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#5b3b16] shadow-[0_8px_20px_rgba(155,107,45,0.22)] transition hover:bg-[#eed4b2]"
              >
                View Biography
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center rounded-full border border-navy bg-navy px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_10px_24px_rgba(16,34,53,0.3)] transition hover:bg-[#1f3953]"
              >
                Explore Gallery
              </Link>
            </div>
          </div>

        {/* RIGHT IMAGE */}
        <div className="w-full flex items-center">
          <Image
            src="/images/hero.png"
            alt="Tadasha Mishra with dignitary at office"
            width={900}
            height={1100}
            priority
            quality={82}
            sizes="(max-width: 1024px) 92vw, 40vw"
            className="w-full max-h-[520px] object-cover rounded-[2.5rem]"
          />
        </div>
        </Container>
      </section>
    


      <section className="relative overflow-hidden bg-navy py-20 text-white">
        
        {/* Background Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: "url('/images/sohrai-pattern-alpha.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "980px auto",
            mixBlendMode: "screen"
          }}
        />

        <Container className="relative">
          <div className="relative rounded-[2rem]">
            
            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-3">
              
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="relative bg-white p-8"
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-[#c9a35a]">
                    {stat.label}
                  </p>

                  <p
                    className="mt-4 text-3xl font-semibold text-black"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </Container>
      </section>



      <section className="deferred-section border-y border-black/10 bg-[#f7f2ea] py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          
          {/* LEFT HEADING */}
          <div>
            {/* Line + Eyebrow */}
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-[#d24a43]" />
              <p
                className="text-xs font-semibold uppercase tracking-[0.34em]"
                style={{ color: "#e8850a" }}
              >
                Service Journey
              </p>
            </div>

            {/* Title (Serif only here) */}
            <h2
              className="mt-6 text-3xl font-semibold md:text-4xl text-ink text-[#0d2a52]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              A Public Career Defined by Continuity, Composure, and Responsibility.
            </h2>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-8">
            {timeline.slice(0, 3).map((entry) => (
              <div
                key={entry.year}
                className="relative grid gap-3 border-l border-bronze/40 pl-6 md:grid-cols-[120px_1fr]"
              >
                <p className="text-sm uppercase tracking-[0.22em] text-[#e8850a]">
                  {entry.year}
                </p>

                <div>
                  <h3
                    className="text-2xl font-semibold text-ink"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {entry.title}
                  </h3>

                  <p className="mt-2 text-lg leading-8 text-ink/75">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}

            <Link
              href="/service"
              className="inline-flex text-sm uppercase tracking-[0.22em] text-navy"
            >
              View Full Journey
            </Link>
          </div>

        </Container>
      </section>

      <section className="deferred-section relative overflow-hidden bg-white py-32 text-center">
  
        {/* Ultra-subtle texture (optional but premium) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/images/sohrai-pattern-alpha.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "900px auto"
          }}
        />

        <Container className="relative max-w-3xl">
          
          {/* Eyebrow + divider (balanced + official) */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-14 bg-[#e8850a]" />
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#e8850a]">
              Service Philosophy
            </p>
            <div className="h-px w-14 bg-[#e8850a]" />
          </div>

          {/* Main Quote */}
          <blockquote
            className="mt-12 text-[28px] leading-[1.4] text-[#0d2a52] sm:text-4xl md:text-[44px]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            “Effective policing is rooted in intelligence-driven strategy, institutional transparency, and an unwavering commitment to public safety.”
          </blockquote>

          {/* Elegant separator */}
          <div className="mx-auto mt-12 h-px w-16 bg-black/20" />

          {/* Supporting text */}
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-black/70">
            This philosophy reflects a disciplined approach to governance—anchored in clarity of thought, institutional integrity, and a steadfast commitment to public service.
          </p>

        </Container>
      </section>

      <section className="py-24 bg-[#f7f2ea] border-t border-black/10">
        <Container className="max-w-6xl">

          <div className="grid gap-16 md:grid-cols-2">

            {/* ── Column 1: Latest Writings ── */}
            <div>

              {/* Heading */}
              <div className="mb-10 flex items-center gap-4">
                <div className="h-px w-10 bg-[#d24a43]" />
                <p className="text-l font-semibold uppercase tracking-[0.34em] text-[#0d2a52]">
                  Latest Writings
                </p>
              </div>

              {[
                { date: "14 April 2026", title: "Directive on Cyber Crime Pre-emption Strategies", image: "/gallery/photo2.jpg" },
                { date: "10 April 2026", title: "Election Security Protocol Advisory for District Units", image: "/gallery/photo3.jpg" },
                { date: "02 April 2026", title: "Quarterly Review of Major Case Resolutions", image: "/gallery/photo5.jpg" },
              ].map((item, index) => (
                <Link
                  href="/writings"
                  key={item.title}
                  className="group flex items-center gap-6 rounded-xl border border-transparent p-5 transition-all duration-300 hover:bg-white hover:border-[#e8850a]"
                >
                  {/* Image (NO CROP) */}
                  <div className="relative w-[150px] h-[100px] rounded-lg overflow-hidden flex-shrink-0 bg-white flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e8850a]">
                      {item.date}
                    </p>

                    <h3
                      className="mt-1 text-[18px] leading-snug text-black font-semibold"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}

              <Link
                href="/writings"
                className="inline-flex mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-navy"
              >
                View All Writings →
              </Link>
            </div>


            {/* ── Column 2: Updates ── */}
            <div>

              {/* Heading */}
              <div className="mb-10 flex items-center gap-4">
                <div className="h-px w-10 bg-[#d24a43]" />
                <p className="text-l font-semibold uppercase tracking-[0.34em] text-[#0d2a52]">
                  Updates
                </p>
              </div>

              {[
                { date: "18 April 2026", title: "Official Visit to CID Cyber Lab Facilities", image: "/gallery/photo1.jpg" },
                { date: "12 April 2026", title: "Coordination Meeting with Central Agencies", image: "/gallery/photo4.jpg" },
                { date: "05 April 2026", title: "Public Interaction Program on Community Policing", image: "/gallery/photo6.jpg" },
              ].map((item, index) => (
                <Link
                  href="/gallery"
                  key={item.title}
                  className="group flex items-center gap-6 rounded-xl border border-transparent p-5 transition-all duration-300 hover:bg-white hover:border-[#e8850a]"
                >
                  {/* Image (NO CROP) */}
                  <div className="relative w-[150px] h-[100px] rounded-lg overflow-hidden flex-shrink-0 bg-white flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e8850a]">
                      {item.date}
                    </p>

                    <h3
                      className="mt-1 text-[18px] leading-snug text-black font-semibold"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}

              <Link
                href="/gallery"
                className="inline-flex mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-navy"
              >
                View All Updates →
              </Link>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}
