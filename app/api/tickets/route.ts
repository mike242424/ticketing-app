import prisma from '@/prisma/db';
import { ticketSchema } from '@/validationSchemas/ticket';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 },
    );
  }

  const newTicket = await prisma.ticket.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      priority: body.priority,
    },
  });

  return NextResponse.json({ msg: 'ticket created successfully' });
}
