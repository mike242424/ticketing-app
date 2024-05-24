'use client';

import { Ticket, User } from '@prisma/client';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useRouter } from 'next/navigation';

const AssignTicket = ({ ticket, users }: { ticket: Ticket; users: User[] }) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const assignTicket = async function (userId: string) {
    setError('');
    setIsAssigning(true);

    const updatedTicket = await fetch(`/api/tickets/${ticket.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        assignedToUserId: userId === '0' ? null : userId,
      }),
    }).catch((error) => {
      setError('unable to assign ticket');
    });

    router.refresh();
    setIsAssigning(false);
  };

  return (
    <div>
      <Select
        defaultValue={ticket.assignedToUserId?.toString() || '0'}
        onValueChange={assignTicket}
        disabled={isAssigning}
      >
        <SelectTrigger className="bg-primary">
          <SelectValue placeholder="Select User..."></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassign</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-primary">{error}</p>
    </div>
  );
};

export default AssignTicket;
