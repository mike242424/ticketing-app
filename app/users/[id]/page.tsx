import UserForm from '@/components/UserForm';
import prisma from '@/prisma/db';

const EditUser = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await prisma.user.findUnique({
    where: { id: +id },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
    },
  });

  if (!user) {
    <p className="text-primary">User not found</p>;
  }

  const editableUser = { ...user, password: '' };

  return (
    <div>
      <h1 className="font-bold text-3xl p-4 text-center">Update User</h1>
      <UserForm user={editableUser} />
    </div>
  );
};

export default EditUser;
