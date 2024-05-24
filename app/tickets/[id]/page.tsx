import prisma from '@/prisma/db';
import TicketDetail from './TicketDetail';

const Ticket = async ({ params: { id } }: { params: { id: string } }) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: +id,
    },
  });

  const users = await prisma.user.findMany();

  if (!ticket) {
    return <p>ticket not found</p>;
  }

  return (
    <div>
      <TicketDetail ticket={ticket} users={users} />
    </div>
  );
};

export default Ticket;
