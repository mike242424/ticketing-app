import { Ticket } from '@prisma/client';

const TicketDetail = ({ ticket }: { ticket: Ticket }) => {
  return (
    <div>
      <h1>{ticket.title}</h1>
      <p>{ticket.description}</p>
    </div>
  );
};

export default TicketDetail;
