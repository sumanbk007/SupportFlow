import type { NextFunction, Request, Response } from "express";

import { MESSAGES } from "../constants/messages.js";
import { logger } from "../config/logger.js";
import { sendErrorResponse } from "../utils/api-response.js";
import { AppError } from "../utils/app-error.js";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return sendErrorResponse(res, {
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  logger.error("Unhandled error", error);

  return sendErrorResponse(res, {
    statusCode: 500,
    message: MESSAGES.COMMON.INTERNAL_ERROR,
  });
};
