"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/container";

export default function CareerPage() {
  const [showMore, setShowMore] = useState(false);
  const [milestones, setMilestones] = useState<{id: number; year: string; title: string; description: string; focus: string; details: string[]}[]>([
    {
      id: 0,
      year: "1994 - 2000",
      title: "Joined IPS, Bihar Cadre",
      description: "Began her career as a 1994 batch IPS officer, building foundational field experience in Bihar district policing.",
      focus: "",
      details: []
    },
    {
      id: 1,
      year: "2000 - 2008",
      title: "Transitioned to Jharkhand",
      description: "Joined the Jharkhand cadre after state formation and served in key field roles including Giridih, Bokaro, and Ranchi.",
      focus: "",
      details: []
    },
    {
      id: 2,
      year: "2008 - 2015",
      title: "Senior Leadership Roles",
      description: "Became a trusted leader in senior command, strengthening coordination and administrative discipline across the state.",
      focus: "",
      details: []
    },
    {
      id: 3,
      year: "2015 - 2020",
      title: "Special DGP, CID",
      description: "Led CID functions with a focus on investigative excellence, intelligence coordination, and procedural accountability.",
      focus: "",
      details: []
    },
    {
      id: 4,
      year: "2020 - 2026",
      title: "DGP Jharkhand",
      description: "Leads the state police with authority, institutional clarity, and a strong focus on accountable and efficient policing.",
      focus: "",
      details: []
    }
  ]);

  useEffect(() => {
    fetch('/api/timeline')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setMilestones(data);
        }
      })
      .catch(err => console.error("Failed to fetch timeline:", err));
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f7f2ea]">

      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-navy/10 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-bronze/10 blur-3xl" />

      <Container className="relative pt-10 pb-20">

        {/* TOP SECTION */}
        <div className="mt-4 grid lg:grid-cols-2 gap-14 items-center">

          <div className="order-1 -translate-x-8">
            <Image
              src="/images/gallery/career.png"
              alt="Tadasha Mishra"
              width={900}
              height={1100}
              className="w-full rounded-[2.5rem] object-cover shadow-[0_25px_80px_rgba(0,0,0,0.15)]"
              priority
            />
          </div>

          <div className="order-2 max-w-3xl translate-x-8">

            <h1 className="text-4xl md:text-5xl font-semibold text-[#0d2a52]">
              Career
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px w-16 bg-[#e8850a]" />
              <p className="text-xs uppercase tracking-[0.34em] text-[#e8850a]">
                Career & Experience
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-semibold text-[#0d2a52]">
              A distinguished career in public service defined by leadership and discipline.
            </h2>

            <div className="mt-6 space-y-5 text-lg leading-8 text-ink/75">

              <p>
                Tadasha Mishra is a 1994 batch Indian Police Service officer whose career reflects leadership in policing and administration.
              </p>

              <p>
                She began her service in Bihar cadre and later transitioned to Jharkhand after state formation.
              </p>

              {showMore && (
                <>
                  <p>
                    She has served in key leadership positions across field operations and state administration.
                  </p>

                  <p>
                    As Special DGP, CID she strengthened investigative systems and intelligence coordination.
                  </p>

                  <p>
                    As DGP Jharkhand, she focuses on accountability, discipline, and modernization.
                  </p>
                </>
              )}

            </div>

            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-5 text-sm font-semibold text-[#e8850a] hover:underline"
            >
              {showMore ? "View Less" : "View More"}
            </button>

          </div>

        </div>

      </Container>

      {/* TIMELINE HEADING */}
      <div className="mt-4 text-center">

        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-[#e8850a]" />
          <p className="text-xs uppercase tracking-[0.34em] text-[#e8850a]">
            Timeline
          </p>
          <div className="h-px w-20 bg-[#e8850a]" />
        </div>

        <h3 className="mt-2 text-2xl font-medium text-[#0d2a52]">
          1994 — Present
        </h3>

      </div>

      {/* TIMELINE */}
      <div className="relative w-full mt-6">

        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/gallery/career-timeline.png"
            alt="timeline bg"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-[#0d2a52]/80 via-[#123a66]/70 to-[#0d2a52]/90" />

        <div className="relative z-10 py-14">

          <Container>

            <div className="grid grid-cols-5 gap-4">

              {milestones.map((item) => (
                <div
                  key={item.year}
                  className="relative flex flex-col items-center text-center rounded-[2rem] bg-white/95 backdrop-blur-md p-4
                  transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
                >

                  <span className="absolute left-0 top-5 bottom-5 w-[3px] bg-[#e8850a] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-full" />

                  <div className="flex h-14 w-14 p-1 items-center justify-center rounded-full border border-[#b98a53] bg-[#f7f2ea] text-[9px] font-semibold text-[#0d2a52] text-center leading-[1.2] break-words">
                    {item.year}
                  </div>

                  <div className="mt-4 text-xs font-semibold text-[#0d2a52]">
                    {item.title}
                  </div>

                  <p className="mt-2 text-xs leading-5 text-gray-600">
                    {item.description}
                  </p>

                  {item.details && item.details.length > 0 && (
                    <ul className="mt-3 text-left list-disc list-outside ml-4 text-[11px] leading-5 text-gray-600 space-y-1">
                      {item.details.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}

                </div>
              ))}

            </div>

          </Container>

        </div>
      </div>

      <div className="mb-20"></div>

    </section>
  );
}