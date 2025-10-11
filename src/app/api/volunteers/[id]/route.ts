import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { prismaRetry } from '@/lib/prismaRetry';

// Allowed roles from your Prisma enum
const ALLOWED_ROLES = ["REFEREE","PHOTOGRAPHER","LOGISTICS","FIRST_AID","TECH_SUPPORT"] as const;
type VolunteerRole = (typeof ALLOWED_ROLES)[number];

// ---------------- GET ----------------
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const volunteer = await prismaRetry(
      () => prisma.volunteer.findUnique({ where: { id: params.id } }),
      5,
      1000
    );

    if (!volunteer)
      return NextResponse.json({ message: 'Could not find user' }, { status: 404 });

    return NextResponse.json(volunteer);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Error: ${errorMessage}` }, { status: 500 });
  }
}

// ---------------- PATCH ----------------
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    
    const formData = await req.formData();
    const fullname = formData.get("fullname")?.toString();
    const email = formData.get("email")?.toString();
    const role = formData.get("role")?.toString();
    const reason = formData.get("reason")?.toString();

    
    let dataToUpdate: any = {};
    if (fullname) dataToUpdate.fullname = fullname;
    if (email) dataToUpdate.email = email;
    if (role) {
      if (!ALLOWED_ROLES.includes(role as VolunteerRole)) {
        return NextResponse.json({ error: `Invalid role: ${role}` }, { status: 400 });
      }
      dataToUpdate.role = role as VolunteerRole;
    }
    if (reason !== undefined) dataToUpdate.reason = reason;

    const updated = await prismaRetry(
      () => prisma.volunteer.update({
        where: { id: params.id },
        data: dataToUpdate
      }),
      5,
      1000
    );

    if (!updated)
      return NextResponse.json({ message: `Could not update user with id ${params.id}` }, { status: 404 });

    return NextResponse.json(updated);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Error: ${errorMessage}` }, { status: 500 });
  }
}

// ---------------- DELETE ----------------
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const volunteer = await prismaRetry(
      () => prisma.volunteer.delete({ where: { id: params.id } }),
      5,
      1000
    );

    if (!volunteer)
      return NextResponse.json({ message: 'User could not be found' }, { status: 404 });

    return NextResponse.json({ message: 'Volunteer has been deleted' });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Error: ${errorMessage}` }, { status: 500 });
  }
}
