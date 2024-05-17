import prisma from '@/prisma/db';
import TicketsTable from './TicketsTable';

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <div>
      <TicketsTable tickets={tickets} />
    </div>
  );
};

export default Tickets;
