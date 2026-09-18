import { Router } from "express";

import { UserRole } from "../../generated/prisma/enums.js";
import ROUTES from "../../constants/routes.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import {
  authorize,
  authorizeUserUpdate,
} from "../../middleware/authorization.middleware.js";
import {
  validate,
  validateParams,
} from "../../middleware/validate.middleware.js";
import { asyncHandler } from "../../utils/async-handler.js";
import type { IUserController } from "./user.controller.js";
import {
  createAgentSchema,
  idParamSchema,
  setAgentCategoriesSchema,
  updateUserSchema,
} from "./user.validation.js";

export const createUserRouter = (controller: IUserController): Router => {
  const router = Router();

  router.post(
    ROUTES.USER_AGENTS,
    authenticate,
    authorize(UserRole.ADMIN),
    validate(createAgentSchema),
    asyncHandler(controller.createAgentController),
  );

  router.put(
    ROUTES.AGENT_EXPERTISE,
    authenticate,
    authorize(UserRole.ADMIN),
    validateParams(idParamSchema),
    validate(setAgentCategoriesSchema),
    asyncHandler(controller.setAgentCategoriesController),
  );

  router.get(ROUTES.USERS, authenticate, asyncHandler(controller.getUsersController));

  router.get(
    ROUTES.USER_BY_ID,
    authenticate,
    validateParams(idParamSchema),
    asyncHandler(controller.getUserByIdController),
  );

  router.patch(
    ROUTES.USER_BY_ID,
    authenticate,
    validateParams(idParamSchema),
    authorizeUserUpdate,
    validate(updateUserSchema),
    asyncHandler(controller.updateUserController),
  );

  router.delete(
    ROUTES.USER_BY_ID,
    authenticate,
    authorize(UserRole.ADMIN),
    validateParams(idParamSchema),
    asyncHandler(controller.deleteUserController),
  );

  return router;
};
