import { PrismaClient } from '@prisma/client';
import { stats, timeline, achievements, articles, galleryImages, contactDetails } from '../lib/site-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding started...');

  const count = await prisma.stat.count();
  if (count > 0) {
    console.log('Database already seeded!');
    return;
  }

  // Seed stats
  for (const [i, s] of stats.entries()) {
    await prisma.stat.create({ data: { label: s.label, value: s.value, orderIndex: i } });
  }

  // Seed Timeline
  for (const [i, t] of timeline.entries()) {
    await prisma.timelineEntry.create({
      data: {
        year: t.year,
        title: t.title,
        description: t.description,
        focus: t.focus,
        detailsJson: JSON.stringify(t.details),
        orderIndex: i
      }
    });
  }

  // Seed Articles
  for (const [i, a] of articles.entries()) {
    await prisma.article.create({
      data: {
        slug: a.slug,
        title: a.title,
        date: a.date,
        excerpt: a.excerpt,
        category: a.category,
        contentJson: JSON.stringify(a.content),
        externalLinksJson: JSON.stringify(a.externalLinks),
        orderIndex: i
      }
    });
  }

  // Seed Gallery
  for (const [i, g] of galleryImages.entries()) {
    await prisma.galleryImage.create({
      data: {
        src: g.src,
        alt: g.alt,
        featured: g.featured || false,
        tagsJson: JSON.stringify(g.tags || []),
        orderIndex: i
      }
    });
  }

  // Seed SiteSettings
  await prisma.siteSetting.create({ data: { key: 'achievements', value: JSON.stringify(achievements) } });
  await prisma.siteSetting.create({ data: { key: 'contactDetails', value: JSON.stringify(contactDetails) } });

  console.log('Seeding completed successfully!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
