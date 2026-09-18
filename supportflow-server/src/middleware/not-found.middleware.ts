import type { NextFunction, Request, Response } from "express";

import { MESSAGES } from "../constants/messages.js";
import { sendErrorResponse } from "../utils/api-response.js";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  return sendErrorResponse(res, {
    statusCode: 404,
    message: `${MESSAGES.COMMON.NOT_FOUND}: ${req.method} ${req.originalUrl}`,
  });
};
