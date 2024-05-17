import dynamic from 'next/dynamic';

const TicketForm = dynamic(() => import('@/components/TicketForm'), {
  ssr: false,
});

const NewTicket = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <TicketForm />
    </div>
  );
};

export default NewTicket;
