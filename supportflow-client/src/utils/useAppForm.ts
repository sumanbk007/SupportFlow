import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodSchema } from "zod";
import type { DefaultValues } from "react-hook-form";

const useAppForm = <T extends Record<string, unknown>>(
  schema: ZodSchema<T>,
  defaultValues?: DefaultValues<T>,
) => {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });
};

export { useAppForm };
