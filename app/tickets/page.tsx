import prisma from '@/prisma/db';
import TicketsTable from './TicketsTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Pagination from '@/components/Pagination';

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <div className="flex flex-col items-center">
      <Link className="self-end" href="/tickets/new">
        <Button>New Ticket</Button>
      </Link>
      <TicketsTable tickets={tickets} />
      <Pagination itemCount={26} pageSize={10} currentPage={1} />
    </div>
  );
};

export default Tickets;
