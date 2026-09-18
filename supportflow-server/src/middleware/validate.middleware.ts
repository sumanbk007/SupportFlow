import type { RequestHandler } from "express";
import { ZodError, type ZodType } from "zod";

import { MESSAGES } from "../constants/messages.js";
import { AppError } from "../utils/app-error.js";

type ValidationTarget = "body" | "params" | "query";

const validateTarget = (schema: ZodType, target: ValidationTarget): RequestHandler => {
  return (req, _res, next) => {
    try {
      const parsed = schema.parse(req[target]);
      Object.assign(req[target], parsed);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError(MESSAGES.COMMON.VALIDATION_FAILED, 400));
        return;
      }

      next(error);
    }
  };
};

export const validate = (schema: ZodType): RequestHandler =>
  validateTarget(schema, "body");

export const validateParams = (schema: ZodType): RequestHandler =>
  validateTarget(schema, "params");

export const validateQuery = (schema: ZodType): RequestHandler =>
  validateTarget(schema, "query");
