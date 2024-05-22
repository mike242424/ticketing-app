import prisma from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { userSchema } from '@/validationSchemas/user';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 },
    );
  }

  const duplicateUser = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (duplicateUser) {
    return NextResponse.json({ error: 'duplicate username' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      username: body.username,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'user created' }, { status: 201 });
}
