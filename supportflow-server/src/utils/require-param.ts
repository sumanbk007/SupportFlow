import { AppError } from "./app-error.js";

export const requireParam = (
  params: Record<string, string | string[] | undefined>,
  key: string,
): string => {
  const value = params[key];

  if (!value || Array.isArray(value)) {
    throw new AppError(`Missing or invalid "${key}" parameter`, 400);
  }

  return value;
};
