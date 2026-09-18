import { Router } from "express";

import { UserRole } from "../../generated/prisma/enums.js";
import ROUTES from "../../constants/routes.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorization.middleware.js";
import {
  validate,
  validateParams,
} from "../../middleware/validate.middleware.js";
import { asyncHandler } from "../../utils/async-handler.js";
import type { ICategoryController } from "./category.controller.js";
import {
  createCategorySchema,
  idParamSchema,
  updateCategorySchema,
} from "./category.validation.js";

export const createCategoryRouter = (
  controller: ICategoryController,
): Router => {
  const router = Router();

  router.get(
    ROUTES.CATEGORIES,
    authenticate,
    asyncHandler(controller.listCategoriesController),
  );

  router.get(
    ROUTES.CATEGORY_BY_ID,
    authenticate,
    validateParams(idParamSchema),
    asyncHandler(controller.getCategoryByIdController),
  );

  router.post(
    ROUTES.CATEGORIES,
    authenticate,
    authorize(UserRole.ADMIN),
    validate(createCategorySchema),
    asyncHandler(controller.createCategoryController),
  );

  router.patch(
    ROUTES.CATEGORY_BY_ID,
    authenticate,
    authorize(UserRole.ADMIN),
    validateParams(idParamSchema),
    validate(updateCategorySchema),
    asyncHandler(controller.updateCategoryController),
  );

  router.delete(
    ROUTES.CATEGORY_BY_ID,
    authenticate,
    authorize(UserRole.ADMIN),
    validateParams(idParamSchema),
    asyncHandler(controller.deactivateCategoryController),
  );

  return router;
};
