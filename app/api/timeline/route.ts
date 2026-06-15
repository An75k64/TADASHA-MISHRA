import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const entries = await prisma.timelineEntry.findMany({
      orderBy: { orderIndex: 'asc' }
    });

    const parsed = entries.map(e => ({
      ...e,
      details: JSON.parse(e.detailsJson)
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Failed to fetch timeline:", error);
    return NextResponse.json({ error: 'Failed to fetch timeline' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { year, title, description, focus, details } = data;

    if (!year || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const detailsArr = Array.isArray(details) ? details : details ? [details] : [];

    const maxOrder = await prisma.timelineEntry.aggregate({ _max: { orderIndex: true } });
    const nextOrder = (maxOrder._max.orderIndex ?? -1) + 1;

    const entry = await prisma.timelineEntry.create({
      data: {
        year,
        title,
        description: description || '',
        focus: focus || '',
        detailsJson: JSON.stringify(detailsArr),
        orderIndex: nextOrder,
      }
    });

    return NextResponse.json({
      ...entry,
      details: JSON.parse(entry.detailsJson)
    }, { status: 201 });
  } catch (error) {
    console.error("Failed to create timeline entry:", error);
    return NextResponse.json({ error: 'Failed to create timeline entry' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, year, title, description, focus, details } = data;

    if (!id) {
      return NextResponse.json({ error: 'Missing entry ID' }, { status: 400 });
    }

    const detailsArr = Array.isArray(details) ? details : details ? [details] : undefined;

    const updateData: Record<string, any> = {};
    if (year !== undefined) updateData.year = year;
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (focus !== undefined) updateData.focus = focus;
    if (detailsArr !== undefined) updateData.detailsJson = JSON.stringify(detailsArr);

    const entry = await prisma.timelineEntry.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json({
      ...entry,
      details: JSON.parse(entry.detailsJson)
    });
  } catch (error) {
    console.error("Failed to update timeline entry:", error);
    return NextResponse.json({ error: 'Failed to update timeline entry' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing entry ID' }, { status: 400 });
    }

    await prisma.timelineEntry.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete timeline entry:", error);
    return NextResponse.json({ error: 'Failed to delete timeline entry' }, { status: 500 });
  }
}
