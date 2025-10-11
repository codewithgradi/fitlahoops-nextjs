import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "fitlahoops" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json(uploadResult);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { public_id } = await req.json();

    if (!public_id) {

      return NextResponse.json({ message: "Missing public_id" }, { status: 400 });
      
    }

    const result = await cloudinary.uploader.destroy(public_id);

    return NextResponse.json(result);

  } catch (error: unknown) {

    if (error instanceof Error) {

      return NextResponse.json({ message: error.message }, { status: 500 });

    }

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });

  }
}
