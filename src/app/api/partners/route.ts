import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';
import { prismaRetry } from '@/lib/prismaRetry';

// ---------------- GET ----------------
export async function GET() {
  try {
    const partners = await prismaRetry(() => prisma.partner.findMany(), 5, 1000);

    if (partners.length === 0) {
      return NextResponse.json({ message: 'No partners are available at the moment' });
    }

    return NextResponse.json(partners);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Error: ${errorMessage}` }, { status: 500 });
  }
}

// ---------------- POST ----------------
export async function POST(req: Request) {
  try {
    
    const formData = await req.formData();
    const fullname = formData.get('fullname')?.toString();
    const email = formData.get('email')?.toString();

    if (!fullname || !email) {
      return NextResponse.json({ error: 'Fullname and email are required' }, { status: 400 });
    }

    const newPartner = await prismaRetry(
      () =>
        prisma.partner.create({
          data: { fullname, email },
        }),
      5,
      1000
    );

    return NextResponse.json(newPartner);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Error: ${errorMessage}` }, { status: 500 });
  }
}
