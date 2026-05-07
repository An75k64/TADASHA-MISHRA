"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

const GALLERY_ITEMS = [
  { 
    id: 1,
    src: "/images/gallery/photo1.jpg.jpeg", 
    title: "Official Handover & Welcome", 
    tags: ["All", "Featured", "Ceremony"],
    date: "March 15, 2024",
    location: "State Headquarters, Jharkhand",
    description: "A historic moment marking the official handover and ceremonial welcome of the new leadership. This significant event brought together various officials and dignitaries to mark the beginning of a new era in state administration.",
    content: "The official handover ceremony was a momentous occasion that witnessed the transition of administrative responsibilities. The event was attended by senior officials, political leaders, and representatives from various government departments. The ceremony highlighted the commitment to maintaining continuity while introducing fresh perspectives to governance."
  },
  { 
    id: 2,
    src: "/images/gallery/photo2.jpg.jpeg", 
    title: "Balancing Tough Policing With Compassionate Leadership", 
    tags: ["All", "Office", "Meetings"],
    date: "March 20, 2024",
    location: "Police Headquarters, Jharkhand",
    description: "Demonstrating the delicate balance between maintaining law and order while showing compassion for the community. This event showcased leadership that prioritizes both security and human welfare.",
    content: "Effective policing requires a balance between firmness and compassion. Leadership that understands this nuance is essential for building trust with the community while maintaining order. This approach has led to improved community relations and better public cooperation in law enforcement initiatives."
  },
  { 
    id: 3,
    src: "/images/gallery/photo3.jpg.jpeg", 
    title: "Statement on Jharkhand Crime Control", 
    tags: ["All", "Meetings", "Field"],
    date: "March 22, 2024",
    location: "Press Conference Hall",
    description: "Addressing the state regarding comprehensive strategies for crime control and public safety. A detailed presentation of initiatives and measures being undertaken to ensure a safer Jharkhand.",
    content: "Crime control requires a multi-faceted approach involving prevention, investigation, and community engagement. The strategies outlined focus on using modern technology, improving inter-agency coordination, and strengthening community partnerships. These initiatives aim to create a safer environment for all citizens."
  },
  { 
    id: 4,
    src: "/images/gallery/photo4.jpg.jpeg", 
    title: "Administrative Duties & Official Signings", 
    tags: ["All", "Office"],
    date: "March 25, 2024",
    location: "Administrative Office",
    description: "Performing critical administrative functions and signing important official documents that govern state operations and policies.",
    content: "Administrative responsibilities form the backbone of effective governance. From policy approvals to official documentation, each decision impacts the lives of citizens. These signings represent important commitments to development, welfare, and progress."
  },
  { 
    id: 5,
    src: "/images/gallery/photo5.jpg.jpeg", 
    title: "Public Engagements and Community Outreach", 
    tags: ["All", "Portraits", "Field"],
    date: "April 2, 2024",
    location: "Community Centers, Jharkhand",
    description: "Engaging directly with the public to understand their concerns and demonstrate government's commitment to serving the community.",
    content: "Public engagement is crucial for understanding the real needs and challenges faced by citizens. These interactions help in formulating policies that are grounded in reality and responsive to public needs. Regular community outreach builds trust and strengthens the relationship between government and citizens."
  },
  { 
    id: 6,
    src: "/images/gallery/photo6.jpg.jpeg", 
    title: "Strategic Briefings and Press Conferences", 
    tags: ["All", "Meetings"],
    date: "April 5, 2024",
    location: "Media Centre",
    description: "Keeping the media and public informed about important government initiatives, policies, and developments through strategic communications.",
    content: "Transparent communication is essential for building public confidence in government. Strategic briefings ensure that important information reaches citizens through credible channels. These sessions also provide opportunities to address public concerns and clarify government positions."
  },
  { 
    id: 7,
    src: "/images/gallery/photo7.jpg.jpeg", 
    title: "Field Inspections and Operational Oversight", 
    tags: ["All", "Field", "Office"],
    date: "April 10, 2024",
    location: "Various Districts, Jharkhand",
    description: "Conducting on-ground inspections to ensure operational efficiency and proper implementation of government programs.",
    content: "Field inspections are vital for ensuring that government programs are being implemented effectively at the ground level. These visits help identify challenges, gather feedback, and ensure accountability. Direct oversight ensures that resources are being utilized optimally for public benefit."
  },
  { 
    id: 8,
    src: "/images/gallery/photo8.jpg.jpeg", 
    title: "Ceremonial Events and Honors ", 
    tags: ["All", "Featured", "Ceremony", "Media"],
    date: "April 15, 2024",
    location: "State Functions Hall",
    description: "Participating in important ceremonial events and honoring outstanding individuals and organizations for their contributions.",
    content: "Ceremonial events provide opportunities to recognize excellence and inspire others. Honoring those who have contributed significantly to society strengthens the bonds of community and motivates others to contribute. These events celebrate achievements and reinforce shared values."
  },
  { 
    id: 9,
    src: "/images/gallery/photo9.jpg.jpeg", 
    title: "Odisha IPS officer becomes Jharkhand's first woman DGP", 
    tags: ["All", "Featured", "Ceremony"],
    date: "April 18, 2024",
    location: "Bhubaneshwar / Ranchi",
    description: "IPS officer Tadasha Mishra makes history by becoming the first woman to head the Jharkhand Police force.",
    content: "A landmark moment in the history of Jharkhand Police as Tadasha Mishra, a 1994 batch IPS officer, takes charge as the Director General of Police. Her appointment marks a significant step forward in institutional transparency and leadership diversity."
  },
];

const CATEGORIES = ["All", "Featured", "Office", "Meetings", "Ceremony", "Field", "Portraits", "Media"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.tags.includes(activeCategory));
  }, [activeCategory]);

  return (
    <main className="container section pt-16 lg:pt-20">

      {/* My Visual Diary Section */}
      <div className="mx-auto max-w-2xl text-center mb-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#e8850a]">Gallery</p>
        <h1
          className="mt-3 text-3xl font-semibold text-navy sm:text-4xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          My Visual Diary
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#e8850a] sm:text-base">
          See the world through my lens, adventures, emotions and stories.
        </p>
      </div>

      {/* Category Filters */}
      <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5 mb-12">
        <div className="flex max-w-full flex-wrap justify-center gap-2.5">
          {CATEGORIES.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={[
                  "rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition duration-300 sm:text-[11px]",
                  isActive
                    ? "border-navy bg-navy text-white shadow-sm hover:shadow-md hover:scale-105"
                    : "border-navy/20 bg-white text-navy/70 hover:border-navy/35 hover:bg-navy/5 hover:scale-105"
                ].join(" ")}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <section className="gallery-section">
        <div className="gallery-grid">
          {filteredItems.map((item, idx) => {
            const externalLinks: Record<number, string> = {
              1: "https://lagatar.in/ranchi-news-dgp-shares-mantra-to-improve-functioning-of-jharkhand-police-stations-emphasizes-making-them-best-police-stations",
              2: "https://www.joharlive.com/news/police-station-chiefs-taught-conduct-with-the-public-special-training-program-to-run-for-9-days/",
              3: "https://www.facebook.com/photo/?fbid=977023311851087&set=pcb.977023461851072",
              4: "https://lagatar.in/dgp-held-a-review-meeting-on-law-and-order-including-crackdown-on-naxalites-and-missing-children",
              5: "https://www.facebook.com/story.php?story_fbid=973236168902019&id=100086469341617",
              6: "https://www.facebook.com/story.php?story_fbid=1406604568168399&id=100064566077412&post_id=100064566077412_1406604568168399",
              7: "https://www.ndtv.com/india-news/1994-batch-ips-officer-tadasha-mishra-is-1st-woman-to-head-jharkhand-police-9593450",
              8: "https://indianmasterminds.com/news/ips-tadasha-mishra-first-woman-jharkhand-dgp-172981/",
              9: "https://www.jagran.com/odisha/bhubaneshwar-tadasha-mishra-odisha-ips-officer-becomes-jharkhand-first-woman-dgp-40031926.html"
            };
            const extUrl = externalLinks[item.id];

            return (
              <div key={item.id} className="reveal">
                {extUrl ? (
                  <a 
                    href={extUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="group relative overflow-hidden rounded-2xl bg-navy/5 ring-1 ring-navy/10 transition hover:-translate-y-0.5 hover:shadow-lg">
                      <div className="relative aspect-[1.3333] w-full">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent p-4">
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="group relative overflow-hidden rounded-2xl bg-navy/5 ring-1 ring-navy/10 transition hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="relative aspect-[1.3333] w-full">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent p-4">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal code removed - using detail pages instead */}
    </main>
  );
}
