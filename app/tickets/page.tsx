import prisma from '@/prisma/db';
import TicketsTable from './TicketsTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { Status } from '@prisma/client';

const Tickets = async ({
  searchParams: { page = '1', status },
}: {
  searchParams: { page: string; status: Status };
}) => {
  const pageSize = 10;

  const statuses = Object.values(Status);
  const searchStatus = statuses.includes(status) ? status : undefined;

  let where = {};

  if (searchStatus) {
    where = {
      status: searchStatus,
    };
  } else {
    where = {
      NOT: [{ status: 'CLOSED' as Status }],
    };
  }

  const ticketCount = await prisma.ticket.count({ where });
  const tickets = await prisma.ticket.findMany({
    where,
    take: pageSize,
    skip: (+page - 1) * pageSize,
  });

  return (
    <div className="flex flex-col items-center">
      <Link className="self-end" href="/tickets/new">
        <Button>New Ticket</Button>
      </Link>
      <StatusFilter />
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
