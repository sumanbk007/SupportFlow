import type { Request, Response } from "express";

import type { UserRole } from "../../generated/prisma/enums.js";
import { MESSAGES } from "../../constants/messages.js";
import { sendResponse } from "../../utils/api-response.js";
import { requireParam } from "../../utils/require-param.js";
import { requireUser } from "../../utils/require-user.js";
import type { ITicketService } from "./ticket.service.js";

export interface ITicketController {
  createTicketController(req: Request, res: Response): Promise<Response>;
  listTicketsController(req: Request, res: Response): Promise<Response>;
  getTicketByIdController(req: Request, res: Response): Promise<Response>;
  updateStatusController(req: Request, res: Response): Promise<Response>;
  updatePriorityController(req: Request, res: Response): Promise<Response>;
  updateAssignmentController(req: Request, res: Response): Promise<Response>;
}

export const createTicketController = (
  ticketService: ITicketService,
): ITicketController => ({
  createTicketController: async (req, res) => {
    const user = requireUser(req);
    const ticket = await ticketService.createTicket(user.id, req.body);

    return sendResponse(res, {
      statusCode: 201,
      message: MESSAGES.TICKET.CREATE_SUCCESS,
      data: ticket,
    });
  },

  listTicketsController: async (req, res) => {
    const user = requireUser(req);
    const tickets = await ticketService.listTickets({
      id: user.id,
      role: user.role as UserRole,
    });

    return sendResponse(res, {
      message: MESSAGES.TICKET.LIST_SUCCESS,
      data: tickets,
    });
  },

  getTicketByIdController: async (req, res) => {
    const user = requireUser(req);
    const id = requireParam(req.params, "id");
    const ticket = await ticketService.getTicketById(id, {
      id: user.id,
      role: user.role as UserRole,
    });

    return sendResponse(res, {
      message: MESSAGES.TICKET.GET_SUCCESS,
      data: ticket,
    });
  },

  updateStatusController: async (req, res) => {
    const user = requireUser(req);
    const id = requireParam(req.params, "id");
    const ticket = await ticketService.changeStatus(
      id,
      { id: user.id, role: user.role as UserRole },
      req.body.status,
    );

    return sendResponse(res, {
      message: MESSAGES.TICKET.STATUS_UPDATE_SUCCESS,
      data: ticket,
    });
  },

  updatePriorityController: async (req, res) => {
    const user = requireUser(req);
    const id = requireParam(req.params, "id");
    const ticket = await ticketService.changePriority(
      id,
      { id: user.id, role: user.role as UserRole },
      req.body.priority,
    );

    return sendResponse(res, {
      message: MESSAGES.TICKET.PRIORITY_UPDATE_SUCCESS,
      data: ticket,
    });
  },

  updateAssignmentController: async (req, res) => {
    const user = requireUser(req);
    const id = requireParam(req.params, "id");
    const ticket = await ticketService.changeAssignment(
      id,
      { id: user.id, role: user.role as UserRole },
      req.body.agentId,
    );

    return sendResponse(res, {
      message: MESSAGES.TICKET.ASSIGNMENT_UPDATE_SUCCESS,
      data: ticket,
    });
  },
});
