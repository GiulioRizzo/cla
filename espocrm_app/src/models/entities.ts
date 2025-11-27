import { z } from 'zod';

const baseEntity = {
  id: z.string(),
  name: z.string(),
  assignedUserId: z.string().nullable(),
  status: z.string().nullable(),
  dateCreated: z.string().nullable(),
  dateModified: z.string().nullable(),
};

export const leadSchema = z.object({
  ...baseEntity,
  emailAddress: z.string().email().nullable(),
  phoneNumber: z.string().nullable(),
});

export const opportunitySchema = z.object({
  ...baseEntity,
  amount: z.number().nullable(),
  closeDate: z.string().nullable(),
});

export const contactSchema = z.object({
  ...baseEntity,
  accountId: z.string().nullable(),
  emailAddress: z.string().email().nullable(),
});

export const taskSchema = z.object({
  ...baseEntity,
  dueDate: z.string().nullable(),
  priority: z.string().nullable(),
});

export const meetingSchema = z.object({
  ...baseEntity,
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  location: z.string().nullable(),
});

export type Lead = z.infer<typeof leadSchema>;
export type Opportunity = z.infer<typeof opportunitySchema>;
export type Contact = z.infer<typeof contactSchema>;
export type Task = z.infer<typeof taskSchema>;
export type Meeting = z.infer<typeof meetingSchema>;

export type PaginatedResponse<T> = {
  list: T[];
  total: number;
  offset: number;
  maxSize: number;
};
