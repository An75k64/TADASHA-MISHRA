import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { orderIndex: 'asc' }
    });

    const parsed = articles.map(a => ({
      ...a,
      content: JSON.parse(a.contentJson),
      externalLinks: JSON.parse(a.externalLinksJson)
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { title, date, excerpt, category, content, externalLinks } = data;

    if (!title || !date || !excerpt || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Check slug uniqueness
    const existing = await prisma.article.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const contentArr = Array.isArray(content) ? content : content ? [content] : [];
    const linksArr = Array.isArray(externalLinks) ? externalLinks : [];

    const maxOrder = await prisma.article.aggregate({ _max: { orderIndex: true } });
    const nextOrder = (maxOrder._max.orderIndex ?? -1) + 1;

    const article = await prisma.article.create({
      data: {
        slug: finalSlug,
        title,
        date,
        excerpt,
        category,
        contentJson: JSON.stringify(contentArr),
        externalLinksJson: JSON.stringify(linksArr),
        orderIndex: nextOrder,
      }
    });

    return NextResponse.json({
      ...article,
      content: JSON.parse(article.contentJson),
      externalLinks: JSON.parse(article.externalLinksJson),
    }, { status: 201 });
  } catch (error) {
    console.error("Failed to create article:", error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, title, date, excerpt, category, content, externalLinks } = data;

    if (!id) {
      return NextResponse.json({ error: 'Missing article ID' }, { status: 400 });
    }

    const contentArr = Array.isArray(content) ? content : content ? [content] : undefined;
    const linksArr = Array.isArray(externalLinks) ? externalLinks : undefined;

    const updateData: Record<string, any> = {};
    if (title !== undefined) updateData.title = title;
    if (date !== undefined) updateData.date = date;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (category !== undefined) updateData.category = category;
    if (contentArr !== undefined) updateData.contentJson = JSON.stringify(contentArr);
    if (linksArr !== undefined) updateData.externalLinksJson = JSON.stringify(linksArr);

    const article = await prisma.article.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json({
      ...article,
      content: JSON.parse(article.contentJson),
      externalLinks: JSON.parse(article.externalLinksJson),
    });
  } catch (error) {
    console.error("Failed to update article:", error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing article ID' }, { status: 400 });
    }

    await prisma.article.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete article:", error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
