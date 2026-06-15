import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET all settings as a key-value map
export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);
    
    return NextResponse.json(settingsMap);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// POST to update settings (accepts an object of key-value pairs)
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Update or create each setting
    const promises = Object.entries(data).map(([key, value]) => {
      if (typeof value === 'string') {
        return prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
      return Promise.resolve();
    });

    await Promise.all(promises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save settings:", error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
