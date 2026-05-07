"use client";

import { useMemo, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  featured?: boolean;
  tags?: string[];
};

function uniq<T>(values: T[]) {
  return Array.from(new Set(values));
}

export function VisualDiaryGallery({ images }: { images: GalleryImage[] }) {
  const categories = useMemo(() => {
    const tags = images.flatMap((image) => image.tags ?? []);
    const ordered = ["Featured", "Office", "Meetings", "Ceremony", "Field", "Portraits"];
    const unique = uniq(tags);
    const sorted = [
      ...ordered.filter((tag) => unique.includes(tag)),
      ...unique.filter((tag) => !ordered.includes(tag)).sort()
    ];
    return ["All", ...sorted];
  }, [images]);

  const [activeCategory, setActiveCategory] = useState<string>("All");

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-10 sm:py-12 lg:px-14">
        <header className="mx-auto max-w-2xl text-center">
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
        </header>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
          <div className="flex max-w-full flex-wrap justify-center gap-2.5">
            {categories.map((category) => {
              const selected = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={[
                    "rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition sm:text-[11px]",
                    selected
                      ? "border-navy bg-navy text-white shadow-sm"
                      : "border-navy/20 bg-white text-navy/70 hover:border-navy/35"
                  ].join(" ")}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}