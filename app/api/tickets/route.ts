import prisma from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();
  await prisma.ticket.create({
    data: {
      title,
      description,
    },
  });

  return NextResponse.json({ msg: 'ticket created successfully' });
}
