import prisma from '@/prisma/db';
import { ticketPatchSchema } from '@/validationSchemas/ticket';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const body = await request.json();
  const validation = ticketPatchSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 },
    );
  }

  const ticket = await prisma.ticket.findUnique({
    where: {
      id: +id,
    },
  });

  if (!ticket) {
    return NextResponse.json({ error: 'ticket not found ' }, { status: 404 });
  }

  if (body?.assignedToUserId) {
    body.assignedToUserId = +body.assignedToUserId;
  }

  const updatedTicket = await prisma.ticket.update({
    where: {
      id: ticket.id,
    },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      priority: body.priority,
      assignedToUserId: body.assignedToUserId,
    },
  });

  return NextResponse.json({ message: 'ticket updated successfully' });
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: +id,
    },
  });

  if (!ticket) {
    return NextResponse.json({ error: 'ticket not found' }, { status: 404 });
  }

  const deletedTicket = await prisma.ticket.delete({
    where: {
      id: ticket.id,
    },
  });

  return NextResponse.json({
    message: 'ticket deleted successfully',
  });
}
