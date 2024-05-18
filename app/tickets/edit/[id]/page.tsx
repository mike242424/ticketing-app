import prisma from '@/prisma/db';
import dynamic from 'next/dynamic';

const TicketForm = dynamic(() => import('@/components/TicketForm'), {
  ssr: false,
});

const EditTicket = async ({ params: { id } }: { params: { id: string } }) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: +id,
    },
  });

  if (!ticket) {
    return <p>ticket not found!</p>;
  }

  return (
    <>
      <h1 className="font-bold text-3xl text-center mt-4 w-full">
        Update Ticket
      </h1>
      <TicketForm ticket={ticket}></TicketForm>
    </>
  );
};

export default EditTicket;
