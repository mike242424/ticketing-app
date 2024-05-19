import prisma from '@/prisma/db';
import TicketsTable from './TicketsTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Pagination from '@/components/Pagination';

const Tickets = async ({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) => {
  const pageSize = 10;
  const ticketCount = await prisma.ticket.count();

  const tickets = await prisma.ticket.findMany({
    take: pageSize,
    skip: (+page - 1) * pageSize,
  });

  return (
    <div className="flex flex-col items-center">
      <Link className="self-end" href="/tickets/new">
        <Button>New Ticket</Button>
      </Link>
      <TicketsTable tickets={tickets} />
      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={+page || 1}
      />
    </div>
  );
};

export default Tickets;
