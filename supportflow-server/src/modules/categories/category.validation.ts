import { z } from "zod";

export const idParamSchema = z.object({
  id: z.uuid("Invalid id"),
});

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
});

export const updateCategorySchema = z
  .object({
    name: z.string().trim().min(1, "Name cannot be empty").optional(),
    description: z.string().trim().min(1, "Description cannot be empty").optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });
