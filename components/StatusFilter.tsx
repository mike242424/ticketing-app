'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const stautses: { label: string; value?: string }[] = [
  { label: 'Open / Started' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Started', value: 'STARTED' },
  { label: 'Closed', value: 'CLOSED' },
];

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select
      defaultValue={searchParams.get('status') || ''}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);

        const query = params.size ? `?${params.toString()}` : '0';
        router.push(`/tickets${query}`);
      }}
    >
      <SelectTrigger className="w-4/12">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {stautses.map((status) => (
            <SelectItem key={status.value || '0'} value={status.value || '0'}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
