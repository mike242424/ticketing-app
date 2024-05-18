'use client';

import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { z } from 'zod';
import { ticketSchema } from '@/validationSchemas/ticket';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Ticket } from '@prisma/client';

type TicketFormData = z.infer<typeof ticketSchema>;

const TicketForm = ({ ticket }: { ticket?: Ticket }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  async function handleSubmit(values: z.infer<typeof ticketSchema>) {
    try {
      setIsSubmitting(true);
      setError('');

      if (ticket) {
        const res = await fetch(`/api/tickets/${ticket.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            status: values.status,
            priority: values.priority,
          }),
        });
      } else {
        const res = await fetch('/api/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            status: values.status,
            priority: values.priority,
          }),
        });
      }

      router.push('/tickets');
      router.refresh();
    } catch (error) {
      setError('unknown error orrcured');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          className="flex flex-col gap-6 px-10"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            defaultValue={ticket?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            defaultValue={ticket?.description}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Description</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="Description..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            defaultValue={ticket?.status}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="STARTED">Started</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            defaultValue={ticket?.priority}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            {ticket ? 'Update' : 'Add'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
