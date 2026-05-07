type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.36em] text-bronze">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-lg leading-8 text-ink/75">{description}</p> : null}
    </div>
  );
}
