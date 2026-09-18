import { Router } from "express";

import ROUTES from "../../constants/routes.js";
import { validate } from "../../middleware/validate.middleware.js";
import { asyncHandler } from "../../utils/async-handler.js";
import type { IAuthController } from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

export const createAuthRouter = (controller: IAuthController): Router => {
  const router = Router();

  router.post(
    ROUTES.AUTH_REGISTER,
    validate(registerSchema),
    asyncHandler(controller.registerController),
  );

  router.post(
    ROUTES.AUTH_LOGIN,
    validate(loginSchema),
    asyncHandler(controller.loginController),
  );

  return router;
};
