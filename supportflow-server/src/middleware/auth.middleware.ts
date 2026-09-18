import type { NextFunction, Request, Response } from "express";

import { MESSAGES } from "../constants/messages.js";
import { AppError } from "../utils/app-error.js";
import { verifyJwt } from "../utils/jwt.js";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next(new AppError(MESSAGES.AUTH.AUTH_REQUIRED, 401));
    return;
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    next(new AppError(MESSAGES.AUTH.INVALID_AUTH_HEADER, 401));
    return;
  }

  try {
    const decoded = verifyJwt(token);

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch {
    next(new AppError(MESSAGES.AUTH.INVALID_TOKEN, 401));
  }
};
