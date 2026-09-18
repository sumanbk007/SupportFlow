import type { Request, Response } from "express";

import { MESSAGES } from "../../constants/messages.js";
import { sendResponse } from "../../utils/api-response.js";
import { requireParam } from "../../utils/require-param.js";
import type { IUserService } from "./user.service.js";

export interface IUserController {
  getUsersController(req: Request, res: Response): Promise<Response>;
  getUserByIdController(req: Request, res: Response): Promise<Response>;
  updateUserController(req: Request, res: Response): Promise<Response>;
  deleteUserController(req: Request, res: Response): Promise<Response>;
  createAgentController(req: Request, res: Response): Promise<Response>;
  setAgentCategoriesController(req: Request, res: Response): Promise<Response>;
}

export const createUserController = (
  userService: IUserService,
): IUserController => ({
  getUsersController: async (_req, res) => {
    const users = await userService.getUsers();

    return sendResponse(res, {
      message: MESSAGES.USER.LIST_SUCCESS,
      data: users,
    });
  },

  getUserByIdController: async (req, res) => {
    const id = requireParam(req.params, "id");
    const user = await userService.getUserById(id);

    return sendResponse(res, {
      message: MESSAGES.USER.GET_SUCCESS,
      data: user,
    });
  },

  updateUserController: async (req, res) => {
    const id = requireParam(req.params, "id");
    const user = await userService.updateUser(id, req.body);

    return sendResponse(res, {
      message: MESSAGES.USER.UPDATE_SUCCESS,
      data: user,
    });
  },

  deleteUserController: async (req, res) => {
    const id = requireParam(req.params, "id");
    await userService.deleteUser(id);

    return sendResponse(res, {
      message: MESSAGES.USER.DELETE_SUCCESS,
    });
  },

  createAgentController: async (req, res) => {
    const agent = await userService.createAgent(req.body);

    return sendResponse(res, {
      statusCode: 201,
      message: MESSAGES.USER.AGENT_CREATE_SUCCESS,
      data: agent,
    });
  },

  setAgentCategoriesController: async (req, res) => {
    const id = requireParam(req.params, "id");
    const agent = await userService.setAgentCategories(id, req.body);

    return sendResponse(res, {
      message: MESSAGES.USER.EXPERTISE_UPDATE_SUCCESS,
      data: agent,
    });
  },
});
