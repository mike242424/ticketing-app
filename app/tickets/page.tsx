import prisma from '@/prisma/db';
import TicketsTable from './TicketsTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <div className="flex flex-col items-end">
      <Link href="/tickets/new">
        <Button>New Ticket</Button>
      </Link>
      <TicketsTable tickets={tickets} />
    </div>
  );
};

export default Tickets;
