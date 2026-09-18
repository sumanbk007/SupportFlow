import { z } from "zod";

export const createMessageSchema = z.object({
  content: z.string().trim().min(1, "Message content is required"),
});
