import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");
    
    // Ensure the uploads directory exists
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (e) {
      // Ignore if directory already exists
    }

    // Sanitize filename and add timestamp to avoid collisions
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const uniqueFilename = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    await writeFile(filePath, buffer);

    // Return the public URL for the uploaded image
    const publicUrl = `/images/uploads/${uniqueFilename}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
