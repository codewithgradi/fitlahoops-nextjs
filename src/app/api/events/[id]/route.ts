import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { prismaRetry } from "@/lib/prismaRetry";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Type-safe EventCategory
type EventCategory = "BEHIND_SCENES" | "TOURNAMENTS" | "LEAGUES";
const ALLOWED_CATEGORIES: EventCategory[] = [
  "BEHIND_SCENES",
  "TOURNAMENTS",
  "LEAGUES",
];

// ------------------ GET ------------------
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { params } = await context; 
  const id = params.id;

  if (!id) return NextResponse.json({ message: "Missing ID" }, { status: 400 });

  try {
    const event = await prismaRetry(() => prisma.event.findUnique({ where: { id } }), 5, 1000);

    if (!event) return NextResponse.json({ message: "Event not found" }, { status: 404 });

    return NextResponse.json(event);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// ------------------ PATCH ------------------
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const { params } = await context; 
  const id = params.id;

  if (!id) return NextResponse.json({ message: "Missing ID" }, { status: 400 });

  try {
    const formData = await req.formData();

    const event = formData.get("event") as string | null;
    const location = formData.get("location") as string | null;
    const date = formData.get("date") as string | null;
    const categoryValue = formData.get("category") as string | null;
    const title = formData.get("title") as string | null;
    const file = formData.get("img") as File | null;

    const newDate = date ? new Date(date) : undefined;

    // Type-safe category
    let category: EventCategory | undefined;
    if (categoryValue && ALLOWED_CATEGORIES.includes(categoryValue as EventCategory)) {
      category = categoryValue as EventCategory;
    }

    // Fetch current event
    const currentEvent = await prisma.event.findUnique({ where: { id } });
    if (!currentEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    let uploadedImageUrl = currentEvent.img;
    let publicId = currentEvent.public_id;

    // Upload new image if provided
    if (file) {
      if (publicId) await cloudinary.uploader.destroy(publicId);

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

    // Update event in DB
    const updatedEvent = await prismaRetry(
      () =>
        prisma.event.update({
          where: { id },
          data: {
            ...(event && { event }),
            ...(location && { location }),
            ...(newDate && { date: newDate }),
            ...(category && { category }),
            ...(title && { title }),
            img: uploadedImageUrl,
            public_id: publicId,
          },
        }),
      5,
      1000
    );

    return NextResponse.json(updatedEvent);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("PATCH /events/[id] error:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// ------------------ DELETE ------------------
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { params } = await context; 
  const id = await params.id;

  if (!id) return NextResponse.json({ message: "Missing ID" }, { status: 400 });

  try {
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) return NextResponse.json({ message: "Event not found" }, { status: 404 });

    if (event.public_id) await cloudinary.uploader.destroy(event.public_id);

    await prismaRetry(() => prisma.event.delete({ where: { id } }), 5, 1000);

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
