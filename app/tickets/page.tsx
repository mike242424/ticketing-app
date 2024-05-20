import Link from 'next/link';
import TicketsTable from './TicketsTable';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import prisma from '@/prisma/db';
import { Status, Ticket } from '@prisma/client';

export interface SearchParamsInterface {
  page: string;
  status: Status;
  orderBy: keyof Ticket;
}

const Tickets = async ({
  searchParams,
}: {
  searchParams: SearchParamsInterface;
}) => {
  const pageSize = 10;
  searchParams.page = '1';

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = searchParams.orderBy ? searchParams.orderBy : 'createdAt';

  let where = {};

  if (status) {
    where = {
      status,
    };
  } else {
    where = {
      NOT: [{ status: 'CLOSED' as Status }],
    };
  }

  const ticketCount = await prisma.ticket.count({ where });
  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: {
      [orderBy]: 'desc',
    },
    take: pageSize,
    skip: (+searchParams.page - 1) * pageSize,
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full gap-4">
        <Link href="/tickets/new">
          <Button>New Ticket</Button>
        </Link>
        <StatusFilter />
      </div>

      <TicketsTable tickets={tickets} searchParams={searchParams} />
      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={+searchParams.page || 1}
      />
    </div>
  );
};

export default Tickets;
