import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (key) {
      const setting = await prisma.siteSetting.findUnique({ where: { key } });
      const value = setting ? JSON.parse(setting.value) : null;
      console.log(`[GET] Retrieved setting for key="${key}":`, value);
      return NextResponse.json(value);
    }

    const allSettings = await prisma.siteSetting.findMany();
    const result: Record<string, any> = {};
    allSettings.forEach(s => {
      result[s.key] = JSON.parse(s.value);
    });
    console.log('[GET] Retrieved all settings:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings', details: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, value } = body;

    console.log('[POST] Saving setting:', { key, value });

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    }

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value: JSON.stringify(value) },
      create: { key, value: JSON.stringify(value) }
    });

    const parsedValue = JSON.parse(setting.value);
    console.log('[POST] Successfully saved setting:', { key, value: parsedValue });
    return NextResponse.json({ success: true, key, value: parsedValue });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ error: 'Failed to save settings', details: String(error) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updates: Array<{ key: string; value: any }> = Array.isArray(body) ? body : [body];

    console.log('[PUT] Batch updating settings:', updates);

    const results = [];
    for (const { key, value } of updates) {
      if (!key) continue;
      const setting = await prisma.siteSetting.upsert({
        where: { key },
        update: { value: JSON.stringify(value) },
        create: { key, value: JSON.stringify(value) }
      });
      results.push({ key, value: JSON.parse(setting.value) });
    }

    console.log('[PUT] Successfully updated settings:', results);
    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings', details: String(error) }, { status: 500 });
  }
}
