import type { Request, Response } from "express";

import { UserRole } from "../../generated/prisma/enums.js";
import { MESSAGES } from "../../constants/messages.js";
import { sendResponse } from "../../utils/api-response.js";
import { requireParam } from "../../utils/require-param.js";
import { requireUser } from "../../utils/require-user.js";
import type { ICategoryService } from "./category.service.js";

export interface ICategoryController {
  listCategoriesController(req: Request, res: Response): Promise<Response>;
  getCategoryByIdController(req: Request, res: Response): Promise<Response>;
  createCategoryController(req: Request, res: Response): Promise<Response>;
  updateCategoryController(req: Request, res: Response): Promise<Response>;
  deactivateCategoryController(req: Request, res: Response): Promise<Response>;
}

export const createCategoryController = (
  categoryService: ICategoryService,
): ICategoryController => ({
  listCategoriesController: async (req, res) => {
    const user = requireUser(req);
    const includeInactive =
      user.role === UserRole.ADMIN && req.query.includeInactive === "true";

    const categories = await categoryService.listCategories(includeInactive);

    return sendResponse(res, {
      message: MESSAGES.CATEGORY.LIST_SUCCESS,
      data: categories,
    });
  },

  getCategoryByIdController: async (req, res) => {
    const id = requireParam(req.params, "id");
    const category = await categoryService.getCategoryById(id);

    return sendResponse(res, {
      message: MESSAGES.CATEGORY.GET_SUCCESS,
      data: category,
    });
  },

  createCategoryController: async (req, res) => {
    const category = await categoryService.createCategory(req.body);

    return sendResponse(res, {
      statusCode: 201,
      message: MESSAGES.CATEGORY.CREATE_SUCCESS,
      data: category,
    });
  },

  updateCategoryController: async (req, res) => {
    const id = requireParam(req.params, "id");
    const category = await categoryService.updateCategory(id, req.body);

    return sendResponse(res, {
      message: MESSAGES.CATEGORY.UPDATE_SUCCESS,
      data: category,
    });
  },

  deactivateCategoryController: async (req, res) => {
    const id = requireParam(req.params, "id");
    const category = await categoryService.deactivateCategory(id);

    return sendResponse(res, {
      message: MESSAGES.CATEGORY.DEACTIVATE_SUCCESS,
      data: category,
    });
  },
});
