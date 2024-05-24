import TicketPriority from '@/components/TicketPriority';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Ticket, User } from '@prisma/client';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
import AssignTicket from '@/components/AssignTicket';

const TicketDetail = ({ ticket, users }: { ticket: Ticket; users: User[] }) => {
  return (
    <div className="flex justify-center m-10">
      <Card className="flex flex-col items-center p-10 w-full md:w-8/12">
        <CardHeader className="mb-6">
          <CardTitle>{ticket.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>{ticket.description}</p>
          <div className="flex gap-4">
            Status: <TicketStatusBadge status={ticket.status} />
          </div>
          <div className="flex gap-4">
            Priority: <TicketPriority priority={ticket.priority} />
          </div>
          <div>
            Created:{' '}
            {ticket.createdAt
              .toLocaleDateString('en-US', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
              .replace(',', '')}
          </div>
          <div>
            Updated:{' '}
            {ticket.updatedAt
              .toLocaleDateString('en-US', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
              .replace(',', '')}
          </div>
        </CardContent>
        <CardFooter className="flex w-full sm:flex-row flex-col justify-between items-center gap-4 mt-4">
          <Link href={`/tickets/edit/${ticket.id}`}>
            <Button>Update</Button>
          </Link>
          <DeleteButton ticket={ticket} />
          <AssignTicket ticket={ticket} users={users} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default TicketDetail;
