import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { id: 'desc' }
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
