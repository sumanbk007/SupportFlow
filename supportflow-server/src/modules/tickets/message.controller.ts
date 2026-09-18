import type { Request, Response } from "express";

import type { UserRole } from "../../generated/prisma/enums.js";
import { MESSAGES } from "../../constants/messages.js";
import { sendResponse } from "../../utils/api-response.js";
import { requireParam } from "../../utils/require-param.js";
import { requireUser } from "../../utils/require-user.js";
import type { IMessageService } from "./message.service.js";

export interface IMessageController {
  listMessagesController(req: Request, res: Response): Promise<Response>;
  createMessageController(req: Request, res: Response): Promise<Response>;
}

export const createMessageController = (
  messageService: IMessageService,
): IMessageController => ({
  listMessagesController: async (req, res) => {
    const user = requireUser(req);
    const ticketId = requireParam(req.params, "id");
    const messages = await messageService.listMessages(ticketId, {
      id: user.id,
      role: user.role as UserRole,
    });

    return sendResponse(res, {
      message: MESSAGES.MESSAGE.LIST_SUCCESS,
      data: messages,
    });
  },

  createMessageController: async (req, res) => {
    const user = requireUser(req);
    const ticketId = requireParam(req.params, "id");
    const message = await messageService.createMessage(
      ticketId,
      { id: user.id, role: user.role as UserRole },
      req.body,
    );

    return sendResponse(res, {
      statusCode: 201,
      message: MESSAGES.MESSAGE.CREATE_SUCCESS,
      data: message,
    });
  },
});
