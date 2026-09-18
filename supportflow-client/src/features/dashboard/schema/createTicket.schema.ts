import { z } from "zod";

export const createTicketSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type CreateTiecketSchema = z.infer<typeof createTicketSchema>;
