import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { prismaRetry } from '@/lib/prismaRetry';

// Allowed roles from Prisma enum
const ALLOWED_ROLES = ["REFEREE","PHOTOGRAPHER","LOGISTICS","FIRST_AID","TECH_SUPPORT"] as const;
type VolunteerRole = (typeof ALLOWED_ROLES)[number];

export async function GET() {
  try {
    const volunteers = await prismaRetry(() => prisma.volunteer.findMany(), 5, 1000);

    if (volunteers.length === 0)
      return NextResponse.json({ message: "No Volunteers are available" });

    return NextResponse.json(volunteers);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Error: ${errorMessage}` }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    
    const formData = await req.formData();
    const fullname = formData.get("fullname")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const role = formData.get("role")?.toString();
    const reason = formData.get("reason")?.toString() || null;

  
    if (!fullname || !email || !role) {
      return NextResponse.json({ error: "fullname, email and role are required" }, { status: 400 });
    }

   
    if (!ALLOWED_ROLES.includes(role as VolunteerRole)) {
      return NextResponse.json({ error: `Invalid role: ${role}` }, { status: 400 });
    }

    
    const newVolunteer = await prismaRetry(() =>
      prisma.volunteer.create({
        data: { fullname, email, role: role as VolunteerRole, reason }
      }), 5, 1000
    );

    return NextResponse.json(newVolunteer);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("POST /volunteers error:", err);
    return NextResponse.json({ error: `Error: ${errorMessage}` }, { status: 500 });
  }
}
