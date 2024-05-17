import { Badge } from '@/components/ui/badge';
import { Status } from '@prisma/client';

const TicketStatusBadge = ({ status }: { status: Status }) => {
  return (
    <div>
      <Badge
        variant={
          status === 'OPEN'
            ? 'default'
            : status === 'STARTED'
            ? 'outline'
            : 'secondary'
        }
      >
        {status}
      </Badge>
    </div>
  );
};

export default TicketStatusBadge;
