import { timeline } from "@/lib/site-data";

export function ServiceShowcase() {
  return (
    <div className="mt-14 space-y-10">
      {timeline.map((entry) => (
        <div key={entry.year} className="grid gap-4 border-l border-bronze/50 pl-8 md:grid-cols-[140px_1fr] md:items-start">
          <p className="text-sm uppercase tracking-[0.28em] text-bronze">{entry.year}</p>
          <div>
            <h3 className="text-5xl font-semibold leading-tight text-ink sm:text-[2.2rem]" style={{ fontFamily: "var(--font-serif)" }}>
              {entry.title}
            </h3>
            <p className="mt-3 max-w-3xl text-[2rem] leading-9 text-ink/80 sm:text-[2.05rem] sm:leading-[3.15rem]">
              {entry.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
