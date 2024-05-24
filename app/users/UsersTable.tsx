import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '@prisma/client';
import Link from 'next/link';

const UsersTable = ({ users }: { users: User[] }) => {
  return (
    <div>
      <div className="w-full mt-4 border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium bg-primary rounded-tl-lg text-black dark:text-white">
                Name
              </TableHead>
              <TableHead className="font-medium bg-primary text-black dark:text-white">
                Username
              </TableHead>
              <TableHead className="font-medium bg-primary rounded-tr-lg text-black dark:text-white">
                Role
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              ? users.map((user) => (
                  <TableRow key={user.username}>
                    <TableCell>
                      <Link href={`/users/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
      <Button className="w-full mt-6">
        <Link href="/users/add">Add</Link>
      </Button>
    </div>
  );
};

export default UsersTable;
