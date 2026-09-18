import { z } from "zod";

import { TicketPriority, TicketStatus } from "../../generated/prisma/enums.js";

export const idParamSchema = z.object({
  id: z.uuid("Invalid id"),
});

export const createTicketSchema = z.object({
  subject: z.string().trim().min(1, "Subject is required"),
  description: z.string().trim().min(1, "Description is required"),
  categoryId: z.uuid("Invalid category id"),
});

export const updateStatusSchema = z.object({
  status: z.enum(TicketStatus),
});

export const updatePrioritySchema = z.object({
  priority: z.enum(TicketPriority),
});

export const updateAssignmentSchema = z.object({
  agentId: z.uuid("Invalid agent id").nullable(),
});
