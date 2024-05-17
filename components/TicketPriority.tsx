import { Priority } from '@prisma/client';
import { Sparkle } from 'lucide-react';

const TicketPriority = ({ priority }: { priority: Priority }) => {
  const priorityStarsMap = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
  };

  const numberOfStars = priorityStarsMap[priority];

  return (
    <div className="flex text-primary">
      <Sparkle className={numberOfStars >= 1 ? 'text-primary' : 'text-muted'} />
      <Sparkle className={numberOfStars >= 2 ? 'text-primary' : 'text-muted'} />
      <Sparkle className={numberOfStars >= 3 ? 'text-primary' : 'text-muted'} />
    </div>
  );
};

export default TicketPriority;
