import prisma from '@/prisma/db';
import UsersTable from './UsersTable';

const Users = async () => {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1 className="font-bold text-3xl p-4 text-center">Users</h1>
      <UsersTable users={users} />
    </div>
  );
};

export default Users;
