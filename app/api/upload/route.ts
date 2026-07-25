import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

// Configure ImageKit using environment variables
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || ""
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: buffer, // can be a buffer, base64 string, or url
      fileName: file.name || "uploaded_image",
      folder: "/tadasha_mishra_uploads", // Optional: organize files into folders
    });

    return NextResponse.json({ success: true, url: result.url });
  } catch (error) {
    console.error("ImageKit upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

