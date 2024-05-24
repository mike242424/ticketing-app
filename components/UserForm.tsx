'use client';

import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { $Enums, User } from '@prisma/client';
import { userSchema } from '@/validationSchemas/user';

type UserFormData = z.infer<typeof userSchema>;
interface UserProps {
  password: string;
  name?: string | undefined;
  username?: string | undefined;
  role?: $Enums.Role | undefined;
  id?: number | undefined;
}

const UserForm = ({ user }: { user?: UserProps }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  async function handleSubmit(values: z.infer<typeof userSchema>) {
    try {
      setIsSubmitting(true);
      setError('');

      if (user) {
        const res = await fetch(`/api/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
          }),
        });
      } else {
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
          }),
        });
      }

      router.push('/users');
      router.refresh();
    } catch (error) {
      setError('unknown error orrcured');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          className="flex flex-col gap-6 px-10"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    required={user ? false : true}
                    placeholder="Password..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            defaultValue={user?.role}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Role..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="TECH">Tech</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            {user ? 'Update' : 'Add'}
          </Button>
        </form>
      </Form>
      <p className="text-primary">{error}</p>
    </div>
  );
};

export default UserForm;
