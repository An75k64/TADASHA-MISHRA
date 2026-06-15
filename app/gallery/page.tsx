"use client";

import { useState, useMemo, useEffect } from "react";
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
    tags: ["All", "Meetings", "Media"],
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
    tags: ["All", "Portraits"],
    date: "April 2, 2024",
    location: "Community Centers, Jharkhand",
    description: "Engaging directly with the public to understand their concerns and demonstrate government's commitment to serving the community.",
    content: "Public engagement is crucial for understanding the real needs and challenges faced by citizens. These interactions help in formulating policies that are grounded in reality and responsive to public needs. Regular community outreach builds trust and strengthens the relationship between government and citizens."
  },
  { 
    id: 6,
    src: "/images/gallery/photo6.jpg.jpeg", 
    title: "Strategic Briefings and Press Conferences", 
    tags: ["All", "Meetings", "Media"],
    date: "April 5, 2024",
    location: "Media Centre",
    description: "Keeping the media and public informed about important government initiatives, policies, and developments through strategic communications.",
    content: "Transparent communication is essential for building public confidence in government. Strategic briefings ensure that important information reaches citizens through credible channels. These sessions also provide opportunities to address public concerns and clarify government positions."
  },
  { 
    id: 7,
    src: "/images/gallery/photo7.jpg.jpeg", 
    title: "Field Inspections and Operational Oversight", 
    tags: ["All", "Office"],
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

const CATEGORIES = ["All", "Featured", "Office", "Meetings", "Ceremony", "Portraits", "Media"];

// Type for DB-fetched images
interface DbGalleryImage {
  id: number;
  src: string;
  alt: string;
  description?: string;
  link?: string;
  tags: string[];
}



const POPUP_DATA = {
  popup1: {
    src: "/images/image1.jpg",
    desc: `DGP Reviews Crime, Law & Order and Anti-Naxal Operations in Palamu Division\n\nDGP Tadasha Mishra visited Medininagar on Friday and chaired a review meeting with the Superintendents of Police (SPs) of Palamu, Garhwa and Latehar districts. The meeting focused on assessing the overall law and order situation in the division, reviewing crime trends and evaluating the progress of anti-Naxal operations being carried out in the region.\nDuring the review, district police officials presented updates on major criminal cases, crime control measures and security-related developments. The DGP took stock of the current situation in each district and discussed ways to improve policing and strengthen public safety. Particular attention was given to anti-Naxal operations, considering the significance of Palamu Division in Jharkhand’s security landscape.\nThe DGP also reviewed ongoing efforts against extremist activities and stressed the need for continued vigilance and coordination among district police units. She directed officials to maintain close monitoring of sensitive areas and ensure timely action against criminal elements.\nWhile interacting with the media, the DGP was asked about land-related disputes in the region. She clarified that such matters mainly fall under the jurisdiction of the civil administration. However, the police continue to provide support whenever required to maintain peace and prevent any law-and-order issues.\nReferring to the Rampur issue in the Chainpur area, she said adequate police deployment has already been made and the situation is under constant watch. According to her, the local administration and police are working together to ensure that the matter does not affect public order.\nThe visit formed part of the state police leadership’s regular monitoring of crime, security and operational preparedness in the Palamu region.`,
    link: "https://www.jagran.com/jharkhand/palamu-jharkhand-dgp-tadasha-mishra-reviews-palamu-crime-naxalism-40263596.html"
  },
  popup2: {
    src: "/images/image2.jpg",
    desc: `DGP Orders SIT Formation to Speed Up Investigation of Missing Children Cases\n\nDuring her visit, DGP Tadasha Mishra also addressed concerns regarding missing children cases in Jharkhand. She stated that the issue remains a priority for the state police and that continuous efforts are being made to trace and recover missing children across districts.\nThe DGP clarified that there has not been any significant increase in the number of missing children cases in the state. She said Jharkhand Police has already been running a special campaign aimed at locating missing children and reuniting them with their families.\nSharing details about the Palamu Division, she informed that only a few cases are currently pending. According to the information provided during the review, two cases remain unresolved in Garhwa district and one case is pending in Latehar district. Police teams are actively working on all three cases.\nTo strengthen the investigation process and ensure focused action, the DGP directed the formation of a Special Investigation Team (SIT). The SIT will work specifically on the pending cases, improve coordination between different police units and help speed up the search and investigation process.\nShe emphasized that every missing child case is treated with seriousness and that police headquarters continues to monitor progress in such investigations. The objective is to ensure that pending cases are resolved at the earliest and that children are safely reunited with their families.\nThe move reflects the department’s continued focus on child safety and its commitment to taking dedicated action in sensitive cases involving children.`,
    link: "https://www.prabhatkhabar.com/state/jharkhand/palamu/jharkhand-missing-children-sit-probe-dgp/amp"
  },
  popup3: {
    src: "/images/image3.jpg",
    desc: `Supreme Court Directs Reconsideration of 888 Candidates in Jharkhand Police Recruitment 2015 Case\n\nIn a significant development related to the Jharkhand Police Constable Recruitment 2015 process, the Supreme Court has provided relief to 888 candidates whose appointments were affected by the long-running recruitment dispute.\nThe Court directed the Jharkhand Government and the Jharkhand Staff Selection Commission (JSSC) to reconsider the candidature of these applicants against available vacancies. The matter has been pending for several years, with candidates seeking resolution regarding their eligibility and appointment.\nAs part of its order, the Supreme Court also observed that age relaxation may be considered wherever necessary while reviewing the cases. The authorities have been asked to examine the candidates’ claims and take an appropriate decision in accordance with applicable rules and available posts.\nThe judgment is expected to bring relief to hundreds of aspirants who have been waiting for a final decision for nearly a decade. Many of the affected candidates had crossed the normal recruitment age limit during the prolonged legal process, making the issue of age relaxation particularly important.\nThe order does not automatically guarantee appointments but opens the door for a fresh review of the affected candidates’ cases. The state government and JSSC are now expected to undertake the required examination and take further action based on the Court’s directions.\nThe development is being viewed as an important step towards resolving one of the longest-pending recruitment-related disputes connected to Jharkhand Police.`,
    link: "https://www.jagran.com/jharkhand/ranchi-sc-relief-for-888-in-jharkhand-police-recruitment-2015-40262594.html"
  }
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalData, setModalData] = useState<{ src: string, desc: string, link: string } | null>(null);
  const [dbImages, setDbImages] = useState<DbGalleryImage[]>([]);

  // Fetch admin-uploaded images from DB
  useEffect(() => {
    fetch("/api/gallery")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setDbImages(data);
      })
      .catch(() => {});
  }, []);

  const filteredStaticItems = useMemo(() => {
    if (activeCategory === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.tags.includes(activeCategory));
  }, [activeCategory]);

  const filteredDbImages = useMemo(() => {
    if (activeCategory === "All") return dbImages;
    return dbImages.filter(img => Array.isArray(img.tags) && img.tags.includes(activeCategory));
  }, [activeCategory, dbImages]);

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
          {filteredStaticItems.map((item, idx) => {
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
          
          {/* 3 Specific Images Added as Requested */}
          <div className="reveal">
            <div className="group relative overflow-hidden rounded-2xl bg-navy/5 ring-1 ring-navy/10 transition hover:-translate-y-0.5 hover:shadow-lg cursor-pointer" onClick={() => setModalData(POPUP_DATA.popup1)}>
              <div className="relative aspect-[1.3333] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img id="popup1" src="/images/image1.jpg" alt="Popup 1" className="object-cover w-full h-full transition duration-500 group-hover:scale-105" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent p-4">
                <p className="text-sm font-semibold text-white">DGP Reviews Crime in Palamu</p>
              </div>
            </div>
          </div>

          <div className="reveal">
            <div className="group relative overflow-hidden rounded-2xl bg-navy/5 ring-1 ring-navy/10 transition hover:-translate-y-0.5 hover:shadow-lg cursor-pointer" onClick={() => setModalData(POPUP_DATA.popup2)}>
              <div className="relative aspect-[1.3333] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img id="popup2" src="/images/image2.jpg" alt="Popup 2" className="object-cover w-full h-full transition duration-500 group-hover:scale-105" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent p-4">
                <p className="text-sm font-semibold text-white">DGP Orders SIT Formation</p>
              </div>
            </div>
          </div>

          <div className="reveal">
            <div className="group relative overflow-hidden rounded-2xl bg-navy/5 ring-1 ring-navy/10 transition hover:-translate-y-0.5 hover:shadow-lg cursor-pointer" onClick={() => setModalData(POPUP_DATA.popup3)}>
              <div className="relative aspect-[1.3333] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img id="popup3" src="/images/image3.jpg" alt="Popup 3" className="object-cover w-full h-full transition duration-500 group-hover:scale-105" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent p-4">
                <p className="text-sm font-semibold text-white">Public Addresses Issues</p>
              </div>
            </div>
          </div>

          {/* DB-uploaded images from admin */}
          {filteredDbImages.map((img) => (
            <div key={`db-${img.id}`} className="reveal">
              {img.description ? (
                <div
                  className="group relative overflow-hidden rounded-2xl bg-navy/5 ring-1 ring-navy/10 transition hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  onClick={() => img.description && setModalData({ src: img.src, desc: img.description!, link: img.link || "" })}
                >
                  <div className="relative aspect-[1.3333] w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt} className="object-cover w-full h-full transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent p-4">
                    <p className="text-sm font-semibold text-white">{img.alt}</p>
                  </div>
                </div>
              ) : img.link ? (
                <a href={img.link} target="_blank" rel="noopener noreferrer">
                  <div className="group relative overflow-hidden rounded-2xl bg-navy/5 ring-1 ring-navy/10 transition hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="relative aspect-[1.3333] w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.src} alt={img.alt} className="object-cover w-full h-full transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent p-4">
                      <p className="text-sm font-semibold text-white">{img.alt}</p>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="group relative overflow-hidden rounded-2xl bg-navy/5 ring-1 ring-navy/10 transition hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="relative aspect-[1.3333] w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt} className="object-cover w-full h-full transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent p-4">
                    <p className="text-sm font-semibold text-white">{img.alt}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Storytelling Popup Modal */}
      {modalData && (() => {
        const paragraphs = modalData.desc.split('\n').filter(p => p.trim());
        const headline = paragraphs[0] || "";
        const body = paragraphs.slice(1);
        const wordCount = body.join(' ').split(' ').length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));
        return (
          <div
            id="storyModal"
            onClick={() => setModalData(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
              background: 'rgba(10,12,18,0.88)',
              backdropFilter: 'blur(6px)',
              animation: 'storyFadeIn 0.3s ease forwards',
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%', maxWidth: '680px',
                maxHeight: '92vh',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
                animation: 'storySlideUp 0.35s cubic-bezier(0.22,1,0.36,1) forwards',
              }}
            >
              {/* ── HERO IMAGE ── */}
              <div style={{ position: 'relative', width: '100%', height: '280px', flexShrink: 0, overflow: 'hidden', background: '#111' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={modalData.src}
                  alt={headline}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, transform: 'scale(1.04)' }}
                />
                {/* Gradient overlays */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.75) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 60%)' }} />

                {/* Category badge */}
                <div style={{ position: 'absolute', top: '18px', left: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{
                    background: '#e8850a',
                    color: '#fff',
                    fontSize: '9px',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: '20px',
                  }}>Jharkhand Police</span>
                  <span style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}>
                    {readTime} min read
                  </span>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setModalData(null)}
                  style={{
                    position: 'absolute', top: '16px', right: '16px',
                    width: '34px', height: '34px',
                    background: 'rgba(0,0,0,0.45)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    color: '#fff',
                    fontSize: '18px',
                    lineHeight: 1,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s',
                    zIndex: 10,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.75)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.45)')}
                  aria-label="Close"
                >
                  ×
                </button>

                {/* Headline over image */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px 22px' }}>
                  <h2 style={{
                    margin: 0,
                    color: '#fff',
                    fontSize: 'clamp(15px, 3vw, 20px)',
                    fontWeight: 700,
                    lineHeight: 1.3,
                    textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '-0.01em',
                  }}>
                    {headline}
                  </h2>
                </div>
              </div>

              {/* ── ARTICLE BODY ── */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                background: '#fdfaf6',
                scrollbarWidth: 'thin',
                scrollbarColor: '#d4c4a8 transparent',
              }}>
                {/* Decorative rule */}
                <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ height: '2px', width: '28px', background: '#e8850a', borderRadius: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e8850a' }}>
                    Full Story
                  </span>
                  <div style={{ height: '1px', flex: 1, background: '#e8d9c8' }} />
                </div>

                {/* Body paragraphs */}
                <div style={{ padding: '16px 28px 24px' }}>
                  {body.map((paragraph, idx) => (
                    idx === 0 ? (
                      <div
                        key={idx}
                        style={{
                          margin: '0 0 18px',
                          padding: '16px 18px',
                          background: 'linear-gradient(135deg, #fff8f0 0%, #fef3e8 100%)',
                          borderRadius: '10px',
                          borderTop: '1px solid #f0d9bc',
                          borderRight: '1px solid #f0d9bc',
                          borderBottom: '1px solid #f0d9bc',
                          borderLeftWidth: '4px',
                          borderLeftStyle: 'solid',
                          borderLeftColor: '#e8850a',
                          position: 'relative',
                          transition: 'box-shadow 0.25s ease, transform 0.25s ease, border-left-width 0.25s ease, border-left-color 0.25s ease',
                          cursor: 'default',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.boxShadow = '0 6px 24px rgba(232,133,10,0.22)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.borderLeftWidth = '6px';
                          e.currentTarget.style.borderLeftColor = '#c96800';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.borderLeftWidth = '4px';
                          e.currentTarget.style.borderLeftColor = '#e8850a';
                        }}
                      >
                        <span style={{
                          display: 'block',
                          fontSize: '9px',
                          fontWeight: 800,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: '#e8850a',
                          marginBottom: '8px',
                        }}>Lead</span>
                        <p style={{
                          margin: 0,
                          fontSize: '15px',
                          fontWeight: 600,
                          lineHeight: 1.75,
                          color: '#1a1208',
                          fontFamily: 'Georgia, serif',
                        }}>
                          {paragraph}
                        </p>
                      </div>
                    ) : (
                      <p
                        key={idx}
                        style={{
                          margin: '0 0 14px',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: 1.8,
                          color: '#4a4540',
                        }}
                      >
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>

                {/* ── FOOTER ── */}
                <div style={{
                  padding: '16px 28px 24px',
                  borderTop: '1px solid #e8d9c8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                  background: '#f7f1e8',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0f2438, #1a3a5c)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>T</span>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#1a1d1b', lineHeight: 1.2 }}>DGP Tadasha Mishra</p>
                      <p style={{ margin: 0, fontSize: '10px', color: '#888', lineHeight: 1.2 }}>Jharkhand Police</p>
                    </div>
                  </div>
                  <a
                    href={modalData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'linear-gradient(135deg, #0f2438 0%, #1a3a5c 100%)',
                      color: '#fff',
                      padding: '10px 20px',
                      borderRadius: '50px',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textDecoration: 'none',
                      boxShadow: '0 4px 16px rgba(15,36,56,0.35)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(15,36,56,0.45)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,36,56,0.35)'; }}
                  >
                    Read Full Article
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <style>{`
              @keyframes storyFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes storySlideUp {
                from { opacity: 0; transform: translateY(28px) scale(0.97); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
              }
            `}</style>
          </div>
        );
      })()}
    </main>
  );
}
