import { ArticleCard } from "@/components/article-card";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { prisma } from "@/lib/db";

export default async function WritingsPage() {
  const dbArticles = await prisma.article.findMany({ orderBy: { orderIndex: 'asc' } });
  const articles = dbArticles.map(a => ({
    ...a,
    content: JSON.parse(a.contentJson),
    externalLinks: JSON.parse(a.externalLinksJson)
  }));

  return (
    <Container className="py-20">
      <SectionHeading eyebrow="Writings" title="Essays, reflections, and editorial notes on service, leadership, and public duty." description="A curated archive of writing and publication pathways for future interviews, essays, and reference features." />
      <div className="mt-14">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </Container>
  );
}
