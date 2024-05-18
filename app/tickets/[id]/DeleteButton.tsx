'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Ticket } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteButton = ({ ticket }: { ticket: Ticket }) => {
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    try {
      setIsDeleting(true);
      setError('');
      const res = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'DELETE',
      });
      router.push('/tickets');
      router.refresh();
    } catch (error) {
      setError('error deleting ticket');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button disabled={isDeleting}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permantently delete this ticket.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isDeleting} onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="text-primary">{error}</div>
    </>
  );
};

export default DeleteButton;
