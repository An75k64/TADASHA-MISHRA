"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/container";

export default function AboutPage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#f7f2ea]">

      {/* Soft background accents */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-navy/10 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-bronze/10 blur-3xl" />

      <Container className="relative py-14">

        {/* HERO */}
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_1.3fr] items-center">

          <div>
            <h1
              className="text-4xl md:text-5xl font-semibold text-[#0d2a52] leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              About
            </h1>

            <p className="mt-5 text-[18px] md:text-[19px] leading-8 text-ink/80 max-w-xl">
              Tadasha Mishra is a 1994 batch Indian Police Service officer serving as the Director General of Police, Jharkhand, and the first woman to lead the state police.
            </p>

            <p className="mt-4 text-[18px] md:text-[19px] leading-8 text-ink/80 max-w-xl">
              Her professional identity blends operational leadership, investigative discipline, and institutional reform across more than three decades of service.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative w-full">
            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-t from-black/10 to-transparent" />

            <Image
              src="/images/about-profile-desk.png"
              alt="Tadasha Mishra"
              width={1000}
              height={1300}
              className="w-full max-h-[620px] rounded-[3rem] object-cover shadow-[0_25px_80px_rgba(0,0,0,0.15)]"
              priority
            />
          </div>

        </div>
      </Container>

      {/* BIOGRAPHY */}
      <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 bg-white py-16 text-center">

        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-[#e8850a]" />
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e8850a]">
            Biography
          </p>
          <div className="h-px w-12 bg-[#e8850a]" />
        </div>

        <h2
          className="mt-8 text-3xl md:text-5xl leading-[1.2] text-[#0d2a52] max-w-4xl mx-auto"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          A 1994 batch Indian Police Service officer, Tadasha Mishra has built a distinguished career spanning field operations, district leadership, and senior command roles across Bihar and Jharkhand.
        </h2>

        <div className="mt-8 flex justify-center">
          <div className="h-px w-12 bg-[#d6cfc5]" />
        </div>

        <p className="mt-5 text-[16px] md:text-[17px] leading-7 text-ink/70 max-w-2xl mx-auto">
          She has held key positions including Additional Director General of Police and Special Director General of Police, CID.
        </p>

        {showMore && (
          <div className="mt-4 space-y-3 text-[16px] md:text-[17px] leading-7 text-ink/70 max-w-2xl mx-auto">
            <p>With deep experience in investigations, intelligence coordination, and operational command.</p>
            <p>As Director General of Police, Jharkhand, she focuses on investigation quality, accountability, and strong coordination across units.</p>
            <p>Her leadership reflects a belief in combining operational discipline with institutional collaboration.</p>
          </div>
        )}

        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-5 text-sm font-semibold text-[#e8850a] hover:underline"
        >
          {showMore ? "View Less" : "View More"}
        </button>

      </div>

      {/* APPROACH & VISION */}
      <Container className="relative py-16">

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">

          {/* APPROACH CARD */}
          <div className="relative group bg-white border border-[#e5e5e5] rounded-2xl p-6 h-[180px] overflow-hidden
                       transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#e8850a]/50">

            <span className="absolute left-0 top-5 bottom-5 w-[3px] bg-[#e8850a] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-full" />

            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#0d2a52]
                         transition-colors duration-300 group-hover:text-[#e8850a]">
              Approach
            </h3>

            <div className="my-3 h-px w-full bg-[#e7cfd4]" />

            <p className="text-[15px] leading-6 text-ink/75">
              Focus on investigative integrity, procedural discipline, and inter-agency coordination with evidence-based policing.
            </p>
          </div>

          {/* VISION CARD */}
          <div className="relative group bg-white border border-[#e5e5e5] rounded-2xl p-6 h-[180px] overflow-hidden
                       transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#e8850a]/50">

            <span className="absolute left-0 top-5 bottom-5 w-[3px] bg-[#e8850a] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-full" />

            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#0d2a52]
                         transition-colors duration-300 group-hover:text-[#e8850a]">
              Vision
            </h3>

            <div className="my-3 h-px w-full bg-[#e7cfd4]" />

            <p className="text-[15px] leading-6 text-ink/75">
              Build a policing system defined by accountability, investigative excellence, and public trust.
            </p>

          </div>

        </div>

      </Container>

    </section>
  );
}