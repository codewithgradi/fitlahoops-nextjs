import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from '../../../lib/prisma';
import { prismaRetry } from '@/lib/prismaRetry';

// ------------------- Define Event Categories -------------------
export const EVENT_CATEGORIES = ['BEHIND_SCENES', 'TOURNAMENTS', 'LEAGUES'] as const;
export type EventCategory = (typeof EVENT_CATEGORIES)[number];

// ------------------- Configure Cloudinary -------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ------------------- GET: List All Events -------------------
export async function GET() {
  try {
    const events = await prismaRetry(() => prisma.event.findMany({
      orderBy: { date: 'desc' }, // latest first
    }), 5, 1000);

    if (events.length === 0) {
      return NextResponse.json({ message: 'There are no events available' });
    }

    return NextResponse.json(events);
  } catch (err) {
    console.error("GET /events error:", err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ------------------- POST: Create Event -------------------
export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const eventName = formData.get("event") as string;
    const location = formData.get("location") as string;
    const categoryValue = formData.get("category") as string;
    const date = formData.get("date") as string;
    const file = formData.get("img") as File | null;

    if (!EVENT_CATEGORIES.includes(categoryValue as EventCategory)) {
      return NextResponse.json({ error: `Invalid category: ${categoryValue}` }, { status: 400 });
    }
    const category = categoryValue as EventCategory;

    // ✅ Upload image to Cloudinary
    let uploadedImageUrl = "";
    let publicId = "";
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse = await new Promise<{ secure_url: string; public_id: string }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "events" },
            (error, result) => {
              if (error || !result) reject(error ?? new Error("Upload failed"));
              else resolve({ secure_url: result.secure_url, public_id: result.public_id });
            }
          );
          stream.end(buffer);
        }
      );

      uploadedImageUrl = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    }

    // ✅ Create event in Prisma
    const newEvent = await prisma.event.create({
      data: {
        title,
        event: eventName,
        location,
        category,
        date: new Date(date),
        img: uploadedImageUrl,
        public_id: publicId,
      },
    });

    return NextResponse.json(newEvent);
  } catch (err) {
    console.error("POST /events error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
