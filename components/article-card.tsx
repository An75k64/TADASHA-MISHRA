import Link from "next/link";
import { Article } from "@/lib/site-data";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group border-t border-black/10 py-8">
      <div className="grid gap-4 md:grid-cols-[160px_1fr] md:items-start">
        <p className="text-sm uppercase tracking-[0.22em] text-bronze">
          {new Date(article.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}
        </p>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-navy/70">{article.category}</p>
          <h3 className="mt-2 text-2xl font-semibold text-ink transition group-hover:text-navy">
            {article.title}
          </h3>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-ink/75">{article.excerpt}</p>
          <Link
            href={`/writings/${article.slug}`}
            className="mt-5 inline-flex text-sm font-medium uppercase tracking-[0.2em] text-navy"
          >
            Read Article
          </Link>
        </div>
      </div>
    </article>
  );
}
