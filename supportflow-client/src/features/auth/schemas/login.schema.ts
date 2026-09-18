import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberDevice: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
