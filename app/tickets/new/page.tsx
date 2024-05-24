import dynamic from 'next/dynamic';

const TicketForm = dynamic(() => import('@/components/TicketForm'), {
  ssr: false,
});

const NewTicket = () => {
  return (
    <>
      <h1 className="font-bold text-3xl text-center p-4 w-full">Add Ticket</h1>
      <TicketForm />
    </>
  );
};

export default NewTicket;
