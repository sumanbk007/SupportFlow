import type { NextFunction, Request, Response } from "express";

import { UserRole } from "../generated/prisma/enums.js";
import { MESSAGES } from "../constants/messages.js";
import { AppError } from "../utils/app-error.js";

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AppError(MESSAGES.AUTH.AUTH_REQUIRED, 401));
      return;
    }

    if (!allowedRoles.includes(req.user.role as UserRole)) {
      next(new AppError(MESSAGES.AUTH.FORBIDDEN, 403));
      return;
    }

    next();
  };
};

export const authorizeUserUpdate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    next(new AppError(MESSAGES.AUTH.AUTH_REQUIRED, 401));
    return;
  }

  const isAdmin = req.user.role === UserRole.ADMIN;
  const isOwnProfile = req.user.id === req.params.id;

  if (!isAdmin && !isOwnProfile) {
    next(new AppError(MESSAGES.AUTH.FORBIDDEN_USER_UPDATE, 403));
    return;
  }

  next();
};
