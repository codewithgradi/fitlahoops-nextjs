import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { prismaRetry } from '@/lib/prismaRetry';

// ---------------- GET ----------------
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const partner = await prismaRetry(() => prisma.partner.findUnique({ where: { id } }), 5, 1000);

    if (!partner) {
      return NextResponse.json({ message: 'Partner does not exist' }, { status: 404 });
    }

    return NextResponse.json(partner);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Error: ${errorMessage}` }, { status: 500 });
  }
}

// ---------------- PATCH ----------------
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    
    const formData = await req.formData();
    const fullname = formData.get('fullname')?.toString();
    const email = formData.get('email')?.toString();

    // Build update object
    const updateData: { fullname?: string; email?: string } = {};
    if (fullname) updateData.fullname = fullname;
    if (email) updateData.email = email;

    const updated = await prismaRetry(
      () => prisma.partner.update({ where: { id }, data: updateData }),
      5,
      1000
    );

    return NextResponse.json(updated);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Error: ${errorMessage}` }, { status: 500 });
  }
}

// ---------------- DELETE ----------------
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const deleted = await prismaRetry(() => prisma.partner.delete({ where: { id } }), 5, 1000);

    return NextResponse.json({ message: 'Partner was deleted', deleted });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Error: ${errorMessage}` }, { status: 500 });
  }
}
