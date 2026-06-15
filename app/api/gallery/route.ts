import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { orderIndex: 'asc' }
    });

    const parsedImages = images.map(img => ({
      ...img,
      tags: JSON.parse(img.tagsJson)
    }));

    return NextResponse.json(parsedImages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { src, alt, description, link, tags } = data;

    // Build tags array: always include "All", plus whatever categories were selected
    const categoryTags: string[] = Array.isArray(tags) && tags.length > 0 ? tags : ["Featured"];
    const finalTags = ["All", ...categoryTags.filter((t: string) => t !== "All")];

    const newImage = await prisma.galleryImage.create({
      data: {
        src,
        alt: alt || "Gallery Image",
        description,
        link,
        tagsJson: JSON.stringify(finalTags),
        featured: finalTags.includes("Featured"),
      }
    });

    return NextResponse.json({ ...newImage, tags: JSON.parse(newImage.tagsJson) }, { status: 201 });
  } catch (error) {
    console.error("Failed to create gallery image:", error);
    return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, description, link } = data;

    if (!id) {
      return NextResponse.json({ error: 'Missing image ID' }, { status: 400 });
    }

    const updatedImage = await prisma.galleryImage.update({
      where: { id: Number(id) },
      data: {
        description,
        link
      }
    });

    return NextResponse.json({ ...updatedImage, tags: JSON.parse(updatedImage.tagsJson) });
  } catch (error) {
    console.error("Failed to update gallery image:", error);
    return NextResponse.json({ error: 'Failed to update gallery image' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing image ID' }, { status: 400 });
    }

    await prisma.galleryImage.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete gallery image:", error);
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 });
  }
}
