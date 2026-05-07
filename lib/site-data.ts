export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  content: string[];
  externalLinks: { label: string; href: string }[];
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
  focus: string;
  details: string[];
};

export const stats = [
  { label: "Service Batch", value: "1994 Batch IPS Officer" },
  { label: "Historic Milestone", value: "First Woman DGP of Jharkhand" },
  { label: "Previous Role", value: "Former Special DGP, CID" }
];

export const timeline: TimelineEntry[] = [
  {
    year: "1994 - 2000",
    title: "Joined the Indian Police Service",
    description: "Served in the Bihar cadre, gaining early field experience across key districts.",
    focus: "Bihar cadre",
    details: [
      "Joined the Indian Police Service in 1994.",
      "Built foundational operational experience in district policing.",
      "Developed early field command and administrative discipline."
    ]
  },
  {
    year: "2000 - 2008",
    title: "Jharkhand Cadre Field Roles",
    description: "Part of the Jharkhand cadre after state formation; served in key field roles including Giridih, Bokaro, and as City SP, Ranchi.",
    focus: "Field operations",
    details: [
      "Transitioned to Jharkhand cadre following formation of the state.",
      "Held key assignments in Giridih and Bokaro.",
      "Served as City SP, Ranchi, handling major urban policing responsibilities."
    ]
  },
  {
    year: "2008 - 2015",
    title: "Inspector General of Police",
    description: "Jharkhand.",
    focus: "Senior command",
    details: [
      "Handled senior command-level policing responsibilities in Jharkhand.",
      "Strengthened organizational coordination and administrative execution.",
      "Led operations with focus on consistency and discipline."
    ]
  },
  {
    year: "2015 - 2020",
    title: "Additional Director General of Police",
    description: "Jharkhand.",
    focus: "Administrative leadership",
    details: [
      "Served in top-tier administrative and policing leadership.",
      "Managed broad institutional responsibilities across the state.",
      "Contributed to policy-level execution and organizational governance."
    ]
  },
  {
    year: "2020 - Present",
    title: "Special Director General of Police, CID",
    description: "Ranchi, Jharkhand.",
    focus: "CID leadership",
    details: [
      "Led CID functions focused on investigation and intelligence.",
      "Worked to improve investigation quality and procedural accountability.",
      "Advanced coordinated responses to evolving criminal challenges."
    ]
  }
];

export const achievements = [
  "Long-standing service in Indian policing and state administration.",
  "Leadership in institutional law-and-order management.",
  "Experience spanning field command, administrative stewardship, and public-facing governance.",
  "Recognized for a composed, disciplined, and service-first professional presence."
];

export const articles: Article[] = [
  {
    slug: "discipline-public-duty",
    title: "Discipline as the Quiet Foundation of Public Duty",
    date: "2026-01-12",
    excerpt: "A reflection on why disciplined institutions create calm, continuity, and public confidence in moments of pressure.",
    category: "Public Service",
    content: [
      "Public service is often measured by moments of visible action, yet its real strength is built in quieter habits. Discipline is what allows institutions to remain steady when events become difficult and expectations intensify.",
      "Leadership in policing asks for more than command. It asks for composure, a sense of proportion, and an ability to protect both order and dignity. These values do not appear suddenly in crisis. They are formed through daily practice.",
      "A disciplined institution gives citizens confidence that systems will hold, decisions will be weighed carefully, and service will remain guided by responsibility rather than impulse."
    ],
    externalLinks: [
      { label: "Publish on Hindustan Times", href: "https://www.hindustantimes.com/" },
      { label: "Interview placement on The Indian Express", href: "https://indianexpress.com/" }
    ]
  },
  {
    slug: "clarity-and-leadership",
    title: "Leadership Requires Clarity Before Speed",
    date: "2025-11-07",
    excerpt: "Why inner clarity matters in administrative leadership, especially when the public expects quick and decisive response.",
    category: "Leadership",
    content: [
      "Administrative life often rewards urgency, but not every urgent moment benefits from haste. Clear leadership depends on the ability to pause, weigh consequences, and act with conviction rather than noise.",
      "Clarity is not withdrawal from action. It is what allows action to remain effective, proportionate, and aligned with duty.",
      "Institutions gain moral force when their leaders combine responsiveness with steadiness. That balance shapes trust."
    ],
    externalLinks: [
      { label: "Editorial syndication on The Telegraph", href: "https://www.telegraphindia.com/" },
      { label: "Profile feature on India Today", href: "https://www.indiatoday.in/" }
    ]
  },
  {
    slug: "service-and-stillness",
    title: "Service and Stillness Can Coexist",
    date: "2025-08-18",
    excerpt: "An editorial note on public action, restraint, and the role of inner stillness in responsible leadership.",
    category: "Philosophy",
    content: [
      "A life of service is rarely quiet on the outside. Yet without a disciplined interior life, action can lose precision and meaning.",
      "Stillness is not passivity. It is the source of perspective. It helps leaders distinguish the immediate from the important and the loud from the necessary.",
      "In public roles, that inner discipline becomes a form of service in itself."
    ],
    externalLinks: [
      { label: "Essay placement on The Print", href: "https://theprint.in/" },
      { label: "Opinion publication on Firstpost", href: "https://www.firstpost.com/" }
    ]
  }
];

export const galleryImages = [
  {
    src: "/images/portraits/tadasha-portrait.png",
    alt: "Formal portrait of Tadasha Mishra in uniform",
    featured: true,
    tags: ["Featured", "Portraits"]
  },
  {
    src: "/images/gallery/office-writing.jpg",
    alt: "Tadasha Mishra writing at her desk",
    tags: ["Office"]
  },
  {
    src: "/images/gallery/desk-signing.jpg",
    alt: "Tadasha Mishra signing documents at headquarters",
    tags: ["Office"]
  },
  {
    src: "/images/gallery/flag-meeting.jpg",
    alt: "Official meeting at police headquarters",
    tags: ["Meetings"]
  },
  {
    src: "/images/gallery/formal-address.jpg",
    alt: "Formal seated portrait in office",
    tags: ["Office", "Portraits"]
  },
  {
    src: "/images/gallery/ceremonial-bouquet.jpg",
    alt: "Ceremonial bouquet presentation in office",
    tags: ["Ceremony"]
  },
  {
    src: "/images/gallery/government-meeting.jpg",
    alt: "Official gathering with government representatives",
    tags: ["Meetings"]
  },
  {
    src: "/images/gallery/arrival-ceremony.jpg",
    alt: "Ceremonial arrival with officers and dignitaries",
    tags: ["Ceremony"]
  },
  {
    src: "/images/gallery/field-visit.jpg",
    alt: "Field visit and reception by officials",
    tags: ["Field"]
  },
  {
    src: "/images/gallery/gallery-extra-1.png",
    alt: "News feature image of Tadasha Mishra",
    tags: ["Media", "Portraits"]
  },
  {
    src: "/images/gallery/gallery-extra-2.png",
    alt: "Appointment announcement visual",
    tags: ["Media"]
  },
  {
    src: "/images/gallery/gallery-extra-3.png",
    alt: "Bouquet presentation with dignitary",
    tags: ["Ceremony", "Office"]
  },
  {
    src: "/images/gallery/gallery-extra-4.png",
    alt: "Historic portrait in uniform",
    tags: ["Media", "Portraits"]
  },
  {
    src: "/images/gallery/gallery-extra-5.png",
    alt: "Office desk profile image",
    tags: ["Office", "Portraits"]
  }
];

export const contactDetails = {
  email: "tadashamishraofficial@gmail.com",
  office: "Police Headquarters, Ranchi, Jharkhand",
  social: {
    twitter: "https://twitter.com", // Update with actual profile
    instagram: "https://instagram.com", // Update with actual profile
    linkedin: "https://linkedin.com", // Update with actual profile
  }
};
