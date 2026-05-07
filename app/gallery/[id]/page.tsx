"use client";

import Image from "next/image";
import Link from "next/link";

const GALLERY_ITEMS = [
  { 
    id: 1,
    slug: "official-handover-welcome",
    src: "/images/gallery/photo1.jpg.jpeg", 
    title: "Official Handover & Welcome Ceremony Marks Historic Transition", 
    shortTitle: "Official Handover & Welcome",
    tags: ["Ceremony", "Leadership"],
    date: "March 15, 2024",
    author: "Official Records",
    category: "Ceremony",
    location: "State Headquarters, Jharkhand",
    excerpt: "A historic moment marking the official handover and ceremonial welcome of the new leadership.",
    content: "<p>A significant and historic moment unfolded as the official handover ceremony took place, welcoming the new administrative leadership with full ceremonial honors. This momentous occasion brought together various officials, political leaders, and representatives from government departments.</p><p>The ceremony highlighted the commitment to maintaining administrative continuity while introducing fresh perspectives to governance. Senior officials participated in the formal transition, ensuring a smooth and respectful handover of responsibilities.</p><p>The event was marked by traditional protocols and modern administrative practices, symbolizing the bridge between established governance and forward-thinking leadership. Representatives from all major government departments were present to witness this historic transition.</p><p>The significance of this event extends beyond the immediate administrative sphere - it represents a collective commitment to public service and the continuity of governance structures. The ceremony reinforced the importance of institutional continuity and professional transitions.</p>",
  },
  { 
    id: 2,
    slug: "balancing-policing-compassionate-leadership",
    src: "/images/gallery/photo2.jpg.jpeg", 
    title: "Balancing Tough Policing With Compassionate Leadership: A New Approach", 
    shortTitle: "Balancing Tough Policing With Compassionate Leadership",
    tags: ["Leadership", "Policing", "Community"],
    date: "March 20, 2024",
    author: "Official Records",
    category: "Police Affairs",
    location: "Police Headquarters, Jharkhand",
    excerpt: "Demonstrating the delicate balance between maintaining law and order while showing compassion.",
    content: "<p>Effective policing in modern times requires a delicate balance between firmness in maintaining law and order, and compassion in understanding community needs. This approach has proven to be transformative in building trust between law enforcement and citizens.</p><p>Leadership that understands this nuance is essential for creating safer communities. The approach prioritizes both security and human welfare, recognizing that long-term public safety depends on community cooperation and trust.</p><p>Recent initiatives have demonstrated improved community relations and better public cooperation in law enforcement activities. This balanced approach has led to more effective crime prevention and community engagement.</p><p>By combining professional policing standards with human-centered practices, this model shows how law enforcement can serve communities more effectively. The success of this approach lies in understanding that true security is built on mutual respect and trust.</p>",
  },
  { 
    id: 3,
    slug: "statement-jharkhand-crime-control",
    src: "/images/gallery/photo3.jpg.jpeg", 
    title: "Comprehensive Strategy Unveiled for Jharkhand Crime Control", 
    shortTitle: "Statement on Jharkhand Crime Control",
    tags: ["Crime Control", "Security", "Strategy"],
    date: "March 22, 2024",
    author: "Official Records",
    category: "Public Safety",
    location: "Press Conference Hall",
    excerpt: "Addressing the state regarding comprehensive strategies for crime control and public safety.",
    content: "<p>A comprehensive strategy for crime control in Jharkhand has been unveiled, focusing on prevention, investigation, and community engagement. The multi-faceted approach aims to create a safer environment for all citizens.</p><p>The strategy emphasizes using modern technology and improved inter-agency coordination. Special focus is given to strengthening community partnerships and grassroots engagement in crime prevention.</p><p>Key initiatives include enhanced surveillance systems, better training for law enforcement personnel, and community awareness programs. These measures are designed to address both organized crime and street-level offenses.</p><p>The strategy recognizes that effective crime control requires sustained effort across multiple agencies and community participation. Implementation will be monitored through regular reviews and performance metrics.</p>",
  },
  { 
    id: 4,
    slug: "administrative-duties-official-signings",
    src: "/images/gallery/photo4.jpg.jpeg", 
    title: "Administrative Duties and Official Signings Shape Governance", 
    shortTitle: "Administrative Duties & Official Signings",
    tags: ["Administration", "Policy", "Governance"],
    date: "March 25, 2024",
    author: "Official Records",
    category: "Administration",
    location: "Administrative Office",
    excerpt: "Performing critical administrative functions and signing important official documents.",
    content: "<p>Administrative responsibilities form the backbone of effective governance. From policy approvals to official documentation, each decision impacts the lives of citizens and shapes the future direction of the state.</p><p>The signing of key administrative documents represents important commitments to development, welfare, and progress. These official acts ensure that government programs and policies are properly authorized and implemented.</p><p>Each signature represents careful deliberation and commitment to public interest. The documents signed cover areas ranging from development projects to welfare programs to administrative reforms.</p><p>Transparent and accountable administrative processes ensure that government functions effectively and serves citizens equitably. These official duties underscore the commitment to good governance and administrative excellence.</p>",
  },
  { 
    id: 5,
    slug: "public-engagement-community-outreach",
    src: "/images/gallery/photo5.jpg.jpeg", 
    title: "Public Engagement and Community Outreach: Bridging the Gap", 
    shortTitle: "Public Engagements and Community Outreach",
    tags: ["Community", "Engagement", "Outreach"],
    date: "April 2, 2024",
    author: "Official Records",
    category: "Community",
    location: "Community Centers, Jharkhand",
    excerpt: "Engaging directly with the public to understand their concerns and demonstrate commitment.",
    content: "<p>Public engagement is crucial for understanding the real needs and challenges faced by citizens across the state. Direct interactions help in formulating policies that are grounded in reality and responsive to public needs.</p><p>Community outreach initiatives have provided valuable insights into local issues and citizen concerns. These interactions have strengthened the relationship between government and the people it serves.</p><p>Regular engagement sessions allow government representatives to listen directly to citizens and address their concerns. This two-way communication ensures that governance remains connected to ground realities.</p><p>The feedback gathered from these interactions is instrumental in shaping policies and programs. By prioritizing public engagement, the government demonstrates its commitment to participatory and responsive governance.</p>",
  },
  { 
    id: 6,
    slug: "strategic-briefings-press-conferences",
    src: "/images/gallery/photo6.jpg.jpeg", 
    title: "Strategic Briefings and Press Conferences: Keeping Citizens Informed", 
    shortTitle: "Strategic Briefings and Press Conferences",
    tags: ["Communication", "Media", "Transparency"],
    date: "April 5, 2024",
    author: "Official Records",
    category: "Media",
    location: "Media Centre",
    excerpt: "Keeping the media and public informed about important government initiatives.",
    content: "<p>Transparent communication is essential for building public confidence in government. Strategic briefings and press conferences ensure that important information reaches citizens through credible channels.</p><p>These sessions provide opportunities to discuss government initiatives, policies, and developments. Media representatives get to ask questions and clarify concerns about government actions and programs.</p><p>Regular communication helps counter misinformation and ensures that accurate information reaches the public. Strategic communications also address public concerns and clarify government positions on important issues.</p><p>The commitment to transparent communication reflects confidence in government actions and accountability to citizens. These interactions strengthen the relationship between government and media, and between government and public.</p>",
  },
  { 
    id: 7,
    slug: "field-inspections-operational-oversight",
    src: "/images/gallery/photo7.jpg.jpeg", 
    title: "Field Inspections and Operational Oversight: Ensuring Accountability", 
    shortTitle: "Field Inspections and Operational Oversight",
    tags: ["Oversight", "Field Operations", "Accountability"],
    date: "April 10, 2024",
    author: "Official Records",
    category: "Operations",
    location: "Various Districts, Jharkhand",
    excerpt: "Conducting on-ground inspections to ensure operational efficiency.",
    content: "<p>Field inspections are vital for ensuring that government programs are being implemented effectively at the ground level. These visits help identify challenges, gather feedback, and ensure accountability in program execution.</p><p>Direct oversight ensures that resources are being utilized optimally for public benefit. Inspections cover various departments and programs, assessing their performance and impact on communities.</p><p>The feedback gathered during field visits provides valuable insights for improving program implementation. Issues identified during inspections are promptly addressed to ensure better service delivery.</p><p>Regular field oversight reinforces the commitment to accountability and effective governance. It ensures that government programs translate into real benefits for citizens and communities.</p>",
  },
  { 
    id: 8,
    slug: "ceremonial-events-honors",
    src: "/images/gallery/photo8.jpg.jpeg", 
    title: "Ceremonial Events and Honors: Recognizing Excellence and Contributions", 
    shortTitle: "Ceremonial Events and Honors",
    tags: ["Ceremony", "Recognition", "Excellence"],
    date: "April 15, 2024",
    author: "Official Records",
    category: "Ceremony",
    location: "State Functions Hall",
    excerpt: "Participating in important ceremonial events and honoring outstanding contributions.",
    content: "<p>Ceremonial events provide opportunities to recognize excellence and inspire others. Honoring those who have contributed significantly to society strengthens community bonds and motivates others to contribute.</p><p>Recognition of outstanding individuals and organizations celebrates achievements and reinforces shared values. These events highlight the importance of dedication, service, and commitment to public welfare.</p><p>The ceremony serves as an inspiration for others to strive for excellence in their respective fields. It reinforces that exceptional contributions are valued and recognized by society.</p><p>These events are significant in fostering a culture of excellence and public service. By celebrating achievements, we encourage more people to contribute to the betterment of society.</p>",
  },
];

export default function GalleryDetail({ params }: { params: { id: string } }) {
  const item = GALLERY_ITEMS.find(i => i.id === parseInt(params.id));

  if (!item) {
    return (
      <main className="container section py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy mb-4">Record Not Found</h1>
          <Link href="/gallery" className="text-orange-500 hover:text-orange-600 font-semibold">
            ← Back to Gallery
          </Link>
        </div>
      </main>
    );
  }

  const relatedItems = GALLERY_ITEMS.filter(i => 
    i.id !== item.id && (i.tags.some(tag => item.tags.includes(tag)) || i.category === item.category)
  ).slice(0, 3);

  return (
    <main className="bg-white">
      {/* Header with Meta Info */}
      <div className="bg-gradient-to-b from-navy/10 to-transparent border-b border-navy/10">
        <div className="container section py-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/gallery"
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold mb-6 transition"
            >
              ← Back to Gallery
            </Link>

            <div className="inline-block mb-4 px-3 py-1 bg-orange-500 text-white rounded text-xs font-bold uppercase tracking-wider">
              {item.category}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              {item.title}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-navy/70 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-orange-500 font-bold">📅</span>
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500 font-bold">📍</span>
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500 font-bold">✍️</span>
                <span>By {item.author}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-navy/10 text-navy text-xs font-semibold rounded hover:bg-navy/20 transition cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] w-full">
        <Image
          src={item.src}
          alt={item.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="container section py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded mb-8">
                <p className="text-lg text-navy font-semibold m-0">
                  {item.excerpt}
                </p>
              </div>

              <div 
                className="article-content text-navy/80 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />

              {/* Share Buttons */}
              <div className="mt-12 pt-8 border-t border-navy/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy/60 mb-4">Share This Record:</h3>
                <div className="flex gap-4">
                  <button className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition" title="Share on Facebook">
                    f
                  </button>
                  <button className="p-3 bg-blue-400 text-white rounded hover:bg-blue-500 transition" title="Share on Twitter">
                    𝕏
                  </button>
                  <button className="p-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition" title="Share via Email">
                    ✉️
                  </button>
                  <button className="p-3 bg-gray-400 text-white rounded hover:bg-gray-500 transition" title="Copy Link">
                    🔗
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Officer Info Card */}
            <div className="bg-navy/5 rounded-lg p-6 mb-8 border border-navy/10">
              <h3 className="font-bold text-navy mb-3">Official Record</h3>
              <p className="text-sm text-navy/70 mb-4">
                This record is part of official documentation showcasing key events, engagements, and administrative activities.
              </p>
              <div className="w-full h-1 bg-orange-500 rounded mb-4"></div>
              <p className="text-xs text-navy/60">
                Part of the official gallery of state activities and records.
              </p>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded-lg border border-navy/10 overflow-hidden">
              <div className="bg-navy/5 px-6 py-4 border-b border-navy/10">
                <h3 className="font-bold text-navy">Related Records</h3>
              </div>
              <div className="divide-y divide-navy/10">
                {relatedItems.map((relatedItem) => (
                  <Link 
                    key={relatedItem.id}
                    href={`/gallery/${relatedItem.id}`}
                    className="block p-4 hover:bg-orange-50 transition"
                  >
                    <h4 className="text-sm font-semibold text-navy hover:text-orange-500 transition line-clamp-2 mb-2">
                      {relatedItem.shortTitle}
                    </h4>
                    <p className="text-xs text-navy/60">{relatedItem.date}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-navy/5 border-t border-navy/10">
        <div className="container section py-8">
          <div className="grid grid-cols-2 gap-4">
            {GALLERY_ITEMS.findIndex(i => i.id === item.id) > 0 && (
              <Link 
                href={`/gallery/${GALLERY_ITEMS[GALLERY_ITEMS.findIndex(i => i.id === item.id) - 1].id}`}
                className="group p-4 bg-white rounded-lg border border-navy/10 hover:border-orange-500 transition"
              >
                <div className="text-xs text-navy/60 font-semibold uppercase mb-1">← Previous</div>
                <div className="text-sm font-semibold text-navy group-hover:text-orange-500 transition line-clamp-2">
                  {GALLERY_ITEMS[GALLERY_ITEMS.findIndex(i => i.id === item.id) - 1].shortTitle}
                </div>
              </Link>
            )}
            
            {GALLERY_ITEMS.findIndex(i => i.id === item.id) < GALLERY_ITEMS.length - 1 && (
              <Link 
                href={`/gallery/${GALLERY_ITEMS[GALLERY_ITEMS.findIndex(i => i.id === item.id) + 1].id}`}
                className="group p-4 bg-white rounded-lg border border-navy/10 hover:border-orange-500 transition text-right ml-auto"
              >
                <div className="text-xs text-navy/60 font-semibold uppercase mb-1">Next →</div>
                <div className="text-sm font-semibold text-navy group-hover:text-orange-500 transition line-clamp-2">
                  {GALLERY_ITEMS[GALLERY_ITEMS.findIndex(i => i.id === item.id) + 1].shortTitle}
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
