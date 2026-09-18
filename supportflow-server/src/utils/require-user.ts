import type { Request } from "express";

import { MESSAGES } from "../constants/messages.js";
import { AppError } from "./app-error.js";

export interface AuthenticatedUser {
  id: string;
  role: string;
}

export const requireUser = (req: Request): AuthenticatedUser => {
  if (!req.user) {
    throw new AppError(MESSAGES.AUTH.AUTH_REQUIRED, 401);
  }

  return req.user;
};
