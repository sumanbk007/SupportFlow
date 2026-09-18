import type { Request, Response } from "express";

import { MESSAGES } from "../../constants/messages.js";
import { sendResponse } from "../../utils/api-response.js";
import type { IAuthService } from "./auth.service.js";

export interface IAuthController {
  registerController(req: Request, res: Response): Promise<Response>;
  loginController(req: Request, res: Response): Promise<Response>;
}

export const createAuthController = (
  authService: IAuthService,
): IAuthController => ({
  registerController: async (req, res) => {
    const user = await authService.registerCustomer(req.body);

    return sendResponse(res, {
      statusCode: 201,
      message: MESSAGES.AUTH.REGISTER_SUCCESS,
      data: user,
    });
  },

  loginController: async (req, res) => {
    const result = await authService.login(req.body);

    return sendResponse(res, {
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      data: result,
    });
  },
});
