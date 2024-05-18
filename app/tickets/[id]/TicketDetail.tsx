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
import { Ticket } from '@prisma/client';
import Link from 'next/link';

const TicketDetail = ({ ticket }: { ticket: Ticket }) => {
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
        <CardFooter className="flex w-full justify-between mt-4">
          <Link href={`/tickets/edit/${ticket.id}`}>
            <Button>Update</Button>
          </Link>
          <Button className="bg-secondary">Delete</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TicketDetail;
