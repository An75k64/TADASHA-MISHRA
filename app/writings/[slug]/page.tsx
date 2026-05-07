import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { articles } from "@/lib/site-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function WritingDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <Container className="py-20">
      <article className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.32em] text-bronze">{article.category}</p>
        <h1 className="mt-6 text-5xl font-semibold leading-tight text-ink sm:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
          {article.title}
        </h1>
        <p className="mt-5 text-sm uppercase tracking-[0.24em] text-navy/70">
          {new Date(article.date).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
        </p>

        <div className="prose-copy mt-12 border-t border-black/10 pt-10 text-xl leading-9 text-ink/80">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <section className="mt-14 rounded-[2rem] border border-black/10 bg-white p-8 shadow-soft">
          <p className="text-xs uppercase tracking-[0.32em] text-bronze">External Publishing Links</p>
          <div className="mt-6 space-y-4">
            {article.externalLinks.map((link) => (
              <Link key={link.href} href={link.href} target="_blank" className="flex items-center justify-between rounded-[1.2rem] bg-[#f7f1e7] px-5 py-4 text-base text-ink transition hover:bg-[#efe5d6]">
                <span>{link.label}</span>
                <span aria-hidden>↗</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </Container>
  );
}
