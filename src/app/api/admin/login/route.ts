import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import {prismaRetry} from '@/lib/prismaRetry'
import { signJWT } from "@/lib/jwt"; // your JWT helper

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // Find admin by username
    const admin = await prismaRetry(
      () => prisma.admin.findFirst({ where: { username } }),
      5,
      1000
    );

    if (!admin) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    //  Sign JWT
    const token = signJWT({ username: admin.username });

    //  Set cookie
    const response = NextResponse.json({
      message: "Login successful",
      admin: { username: admin.username },
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production", 
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (err: unknown) {
    let errorMessage = "Unknown error";
    if (err instanceof Error) errorMessage = err.message;

    return NextResponse.json({ message: `ERROR: ${errorMessage}` }, { status: 500 });
  }
}

