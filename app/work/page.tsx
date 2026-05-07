import Image from "next/image";
import { Container } from "@/components/container";

const keyAreas = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#e8850a]" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="10" cy="10" r="7" />
        <path d="M15 15l5 5" />
      </svg>
    ),
    title: "Investigation Quality & Accountability",
    description:
      "Strengthening procedural discipline and improving investigation standards across departments."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#e8850a]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3l4 4-1.4 1.4L12 6.8 9.4 8.4 8 7 12 3z" />
        <path d="M4 11h16v10H4z" />
      </svg>
    ),
    title: "Cyber Security & Digital Policing",
    description:
      "Expanding cybercrime units and digital forensics capabilities to address emerging threats."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#e8850a]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 4l12 8-12 8V4z" />
      </svg>
    ),
    title: "Organized Crime & Intelligence Coordination",
    description:
      "Enhancing intelligence sharing and inter-agency collaboration for proactive crime prevention."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#e8850a]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14" />
        <path d="M8 8l-3 4 3 4" />
        <path d="M16 8l3 4-3 4" />
      </svg>
    ),
    title: "Community Policing & Public Trust",
    description:
      "Reinforcing citizen engagement, transparency, and confidence in law enforcement."
  }
];

const highlights = [
  {
    title: "Case Solving Initiatives",
    description: "Successful high-profile investigations and case closures."
  },
  {
    title: "Cyber Crime Units",
    description: "Advanced cyber labs and anti-hacking operations."
  },
  {
    title: "Major Crime Busts",
    description: "Crackdowns on organized crime syndicates."
  },
  {
    title: "Community Outreach Programs",
    description: "Awareness campaigns and citizen engagement drives."
  }
];

export default function WorkPage() {
  return (
    <section className="relative overflow-hidden bg-[#f7f2ea]">

      <Container className="relative py-16">

        {/* TOP SECTION (reduced top spacing) */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">

          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-[#0d2a52]">
              Work
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-10 bg-[#e8850a]" />
              <p className="text-base font-semibold uppercase tracking-[0.34em] text-[#e8850a]">
                Key Areas of Work
              </p>
            </div>

            {/* UPDATED HEADING */}
            <h2 className="mt-5 text-3xl font-semibold text-[#0d2a52] max-w-2xl">
            
              <span className="text-lg font-medium text-[#6b7280]">
                What she is actively focused on
              </span>
              <br /><br />
              A focused overview of her core responsibilities and strategic priorities across policing, criminal investigations, technological modernization, and institutional leadership development.
            </h2>
          </div>

          {/* IMAGE 1 */}
          <div className="relative">
            <Image
              src="/images/gallery/work-img-1.png"
              alt="Work Image 1"
              width={900}
              height={1100}
              className="w-full rounded-[2.5rem] object-cover shadow-[0_25px_80px_rgba(0,0,0,0.15)]"
              priority
            />
          </div>

        </div>

        {/* KEY AREAS */}
        <div className="mt-10 space-y-4">

          {keyAreas.map((area) => (
            <div
              key={area.title}
              className="group relative flex flex-col gap-4 rounded-[2rem] border border-[#e5d6c7] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center overflow-hidden"
            >
              <span className="absolute left-0 top-5 bottom-5 w-[3px] bg-[#e8850a] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-full" />

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8f0e6] shadow-sm">
                {area.icon}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0d2a52]">
                  {area.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-ink/75">
                  {area.description}
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* HIGHLIGHTS */}
        <div className="mt-16">

          <div className="flex items-center justify-center gap-6">
            <div className="h-px flex-1 bg-[#d6c0a3] opacity-60" />
            <h3 className="text-2xl font-semibold text-[#0d2a52]">
              Focus Highlights
            </h3>
            <div className="h-px flex-1 bg-[#d6c0a3] opacity-60" />
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">

            {/* IMAGE 2 — MORE ZOOM + FRAME MATCH */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[560px] overflow-hidden rounded-[2.5rem] border border-[#e5d6c7] bg-[#f3e9dc] shadow-soft p-4">

                <Image
                  src="/images/gallery/work-img-2.png"
                  alt="Work Image 2"
                  width={700}
                  height={900}
                  className="w-full h-auto object-cover scale-125"
                  priority
                />

              </div>
            </div>

            {/* CARDS */}
            <div className="grid gap-6 sm:grid-cols-2">

              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="group relative rounded-[2rem] border border-[#d6c0a3] bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] overflow-hidden"
                >
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e8850a] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />

                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e8850a]">
                    — {item.title}
                  </p>

                  <p className="mt-4 text-base leading-7 text-ink/75">
                    {item.description}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </div>

      </Container>
    </section>
  );
}