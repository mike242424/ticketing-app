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
            <TableHead className="font-medium bg-primary rounded-tl-lg text-black dark:text-white">
              <div className="flex items-center justify-start ">
                <Link href={{ query: { ...searchParams, orderBy: 'title' } }}>
                  Title
                </Link>
                {searchParams.orderBy === 'title' && (
                  <ArrowDown className="inline p-1" />
                )}
              </div>
            </TableHead>
            <TableHead className="flex justify-center items-center font-medium bg-primary text-black dark:text-white">
              <Link href={{ query: { ...searchParams, orderBy: 'status' } }}>
                Status
              </Link>
              {searchParams.orderBy === 'status' && (
                <ArrowDown className="inline p-1" />
              )}
            </TableHead>
            <TableHead className="font-medium bg-primary text-black dark:text-white">
              <div className="flex items-center justify-start">
                <Link
                  href={{ query: { ...searchParams, orderBy: 'priority' } }}
                >
                  Priority
                </Link>
                {searchParams.orderBy === 'priority' && (
                  <ArrowDown className="inline p-1" />
                )}
              </div>
            </TableHead>
            <TableHead className="font-medium bg-primary rounded-tr-lg text-black dark:text-white">
              <div className="flex items-center justify-start">
                <Link
                  href={{ query: { ...searchParams, orderBy: 'createdAt' } }}
                >
                  Created At
                </Link>
                {searchParams.orderBy === 'createdAt' && (
                  <ArrowDown className="inline p-1" />
                )}
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
