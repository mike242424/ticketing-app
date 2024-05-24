import prisma from '@/prisma/db';
import { userSchema } from '@/validationSchemas/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: +id },
  });

  if (!user) {
    return NextResponse.json({ error: 'user not found' }, { status: 404 });
  }

  if (body?.password && body.password !== '') {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
  } else {
    delete body.password;
  }

  if (user.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (duplicateUsername) {
      return NextResponse.json({ error: 'duplicate username' });
    }
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: body.name,
      username: body.username,
      password: body.password,
      role: body.role,
    },
  });

  return NextResponse.json({ message: 'user updated' });
}
