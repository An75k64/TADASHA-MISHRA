"use client";

import Image from "next/image";
import { type FocusEvent, type TouchEvent, useEffect, useMemo, useRef, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  featured?: boolean;
  tags?: string[];
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const onChange = () => setMatches(mediaQueryList.matches);

    onChange();
    mediaQueryList.addEventListener("change", onChange);
    return () => mediaQueryList.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

function wrapIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

function uniq<T>(values: T[]) {
  return Array.from(new Set(values));
}

export function VisualDiaryGallery({ images }: { images: GalleryImage[] }) {
  const isSm = useMediaQuery("(max-width: 640px)");
  const isMd = useMediaQuery("(max-width: 1024px)");

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [zoomedImage, setZoomedImage] = useState<GalleryImage | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return images;
    return images.filter((image) => (image.tags ?? []).includes(activeCategory));
  }, [activeCategory, images]);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (activeIndex >= filteredImages.length) setActiveIndex(0);
  }, [activeIndex, filteredImages.length]);

  const spread = isSm ? 120 : isMd ? 170 : 230;

  const visibleOffsets = useMemo(() => {
    if (filteredImages.length <= 1) return [0];
    if (filteredImages.length === 2) return [-1, 0];
    if (filteredImages.length === 3) return [-1, 0, 1];
    return [-2, -1, 0, 1, 2];
  }, [filteredImages.length]);

  const goToIndex = (nextIndex: number) => {
    setDirection(nextIndex >= activeIndex ? 1 : -1);
    setActiveIndex(wrapIndex(nextIndex, filteredImages.length));
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex((current) => wrapIndex(current + 1, filteredImages.length));
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((current) => wrapIndex(current - 1, filteredImages.length));
  };

  const canAutoSlide = filteredImages.length > 1 && !zoomedImage && !isPaused;

  useEffect(() => {
    if (!canAutoSlide) return;

    const intervalMs = 3600;
    const intervalId = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => wrapIndex(current + 1, filteredImages.length));
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [canAutoSlide, filteredImages.length]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") setIsPaused(true);
      else setIsPaused(false);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const closeZoom = () => setZoomedImage(null);

  const toggleShowAll = () => {
    setShowAll((current) => {
      const next = !current;
      if (current && !next) {
        requestAnimationFrame(() => {
          sliderRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
      return next;
    });
  };

  const handleCardClick = (offset: number, index: number, image: GalleryImage) => {
    if (offset === 0) {
      setZoomedImage(image);
      return;
    }
    goToIndex(index);
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const deltaX = touchStartX - touchEndX;
    setTouchStartX(null);

    if (Math.abs(deltaX) < 42 || filteredImages.length <= 1) return;
    if (deltaX > 0) goNext();
    else goPrev();

    window.setTimeout(() => setIsPaused(false), 900);
  };

  useEffect(() => {
    if (!zoomedImage) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeZoom();
    };

    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [zoomedImage]);

  const onSliderBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && sliderRef.current?.contains(nextTarget)) return;
    setIsPaused(false);
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-10 sm:py-12 lg:px-14">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#e8850a]">Gallery</p>
            <h1
              className="mt-3 text-3xl font-bold text-navy sm:text-4xl"
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

          <div className="mt-10">
            <div
              ref={sliderRef}
              className="relative mx-auto h-[270px] max-w-5xl touch-pan-y sm:h-[320px] lg:h-[360px]"
              tabIndex={0}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocusCapture={() => setIsPaused(true)}
              onBlurCapture={onSliderBlurCapture}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") goPrev();
                if (event.key === "ArrowRight") goNext();
                }}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                aria-label="Interactive gallery slider"
              >
              {filteredImages.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 z-[90] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/25 text-white shadow-sm backdrop-blur transition hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:left-5"
                    aria-label="Previous photo"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M15 18l-6-6 6-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-3 top-1/2 z-[90] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/25 text-white shadow-sm backdrop-blur transition hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:right-5"
                    aria-label="Next photo"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M9 6l6 6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              ) : null}

              {visibleOffsets.map((offset) => {
                const index = wrapIndex(activeIndex + offset, filteredImages.length);
                const image = filteredImages[index];
                if (!image) return null;

                const depth = Math.abs(offset);
                const directionalShift = depth === 0 ? 0 : direction * 16;
                const translateX = offset * spread + directionalShift;
                const translateY = depth * 13;
                const rotate = offset * 2.4;
                const scale = 1 - depth * 0.08;
                const opacity = 1 - depth * 0.16;
                const blur = depth === 0 ? 0 : depth * 1.8;
                const zIndex = 40 - depth;

                return (
                  <button
                    key={`${image.src}-${offset}`}
                    type="button"
                    className="absolute left-1/2 top-1/2 block w-[82%] max-w-[360px] cursor-pointer select-none rounded-[1.5rem] border border-black/10 bg-transparent shadow-soft outline-none transition focus-visible:ring-2 focus-visible:ring-navy/40 sm:w-[72%] sm:max-w-[430px] lg:w-[58%] lg:max-w-[490px]"
                    style={{
                      zIndex,
                      opacity,
                      filter: `blur(${blur}px)`,
                      transform: `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                      transitionProperty: "transform, opacity, filter",
                      transitionDuration: "560ms",
                      transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)"
                    }}
                    onClick={() => handleCardClick(offset, index, image)}
                    aria-label={offset === 0 ? `Active image: ${image.alt}` : `View image: ${image.alt}`}
                  >
                    <div
                      className="relative h-[210px] overflow-hidden rounded-[1.45rem] bg-black/10 sm:h-[250px] lg:h-[285px]"
                      style={{
                        animation: depth === 0 ? "galleryFocus 420ms ease-out" : undefined
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        quality={76}
                        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 60vw, 490px"
                        className="object-cover"
                        priority={offset === 0}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              {filteredImages.slice(0, 8).map((_, index) => {
                  const selected = index === wrapIndex(activeIndex, filteredImages.length);
                  return (
                    <button
                      key={`dot-${index}`}
                      type="button"
                      onClick={() => goToIndex(index)}
                      className={[
                        "h-3 w-3 rounded-full border transition",
                        selected
                          ? "border-navy/75 bg-white ring-2 ring-navy/65"
                          : "border-navy/30 bg-white hover:border-navy/50"
                      ].join(" ")}
                      aria-label={`Go to image ${index + 1}`}
                      aria-current={selected ? "true" : undefined}
                    />
                  );
                })}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={toggleShowAll}
                className="w-full rounded-full border border-navy/20 bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/75 transition hover:-translate-y-0.5 hover:border-[#e8850a]/55 hover:bg-[#fff7ee] hover:text-[#e8850a] sm:w-auto sm:text-[12px]"
                aria-pressed={showAll}
              >
                {showAll ? "View Slider" : "View More"}
              </button>
            </div>

            {showAll ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredImages.map((image) => (
                  <figure
                    key={`grid-${image.src}`}
                    className="group relative cursor-zoom-in overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-soft"
                    onClick={() => setZoomedImage(image)}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 94vw, (max-width: 1024px) 45vw, 30vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/10 to-transparent opacity-80" />
                      <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <p
                          className="line-clamp-2 text-sm leading-snug sm:text-base"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {image.alt}
                        </p>
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
      </div>

      {zoomedImage ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-x-hidden bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed gallery image"
          onClick={closeZoom}
        >
          <button
            type="button"
            onClick={closeZoom}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-black/25 text-xl leading-none text-white transition hover:bg-black/45 sm:right-6 sm:top-6"
            aria-label="Close zoomed image"
          >
            ×
          </button>
          <div
            className="relative mx-auto h-[70vh] w-full max-w-3xl animate-[zoomIn_260ms_ease-out] sm:h-[80vh] sm:max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              fill
              quality={82}
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      ) : null}

      <style jsx global>{`
        @keyframes galleryFocus {
          0% {
            transform: scale(0.965);
            filter: saturate(0.9) contrast(0.94);
          }
          100% {
            transform: scale(1);
            filter: saturate(1) contrast(1);
          }
        }
        @keyframes zoomIn {
          0% {
            opacity: 0;
            transform: scale(0.96);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
