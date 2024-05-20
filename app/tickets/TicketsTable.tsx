import TicketPriority from '@/components/TicketPriority';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ticket } from '@prisma/client';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { SearchParamsInterface } from './page';

const TicketsTable = async ({
  tickets,
  searchParams,
}: {
  tickets: Ticket[];
  searchParams: SearchParamsInterface;
}) => {
  return (
    <div className="w-full mt-4 border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center justify-start gap-2">
                <Link href={{ query: { ...searchParams, orderBy: 'title' } }}>
                  Title
                </Link>
                {searchParams.orderBy === 'title' && <ArrowDown />}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex justify-center">Status</div>
            </TableHead>
            <TableHead>
              <div className="flex items-center justify-start gap-2">
                {' '}
                <Link
                  href={{ query: { ...searchParams, orderBy: 'priority' } }}
                >
                  Priority
                </Link>
                {searchParams.orderBy === 'priority' && <ArrowDown />}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center justify-start gap-2">
                <Link
                  href={{ query: { ...searchParams, orderBy: 'createdAt' } }}
                >
                  Created At
                </Link>
                {searchParams.orderBy === 'createdAt' && <ArrowDown />}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets
            ? tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <TicketStatusBadge status={ticket.status} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <TicketPriority priority={ticket.priority} />
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))
            : ''}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketsTable;
