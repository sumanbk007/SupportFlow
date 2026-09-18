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
import type { IMessageController } from "./message.controller.js";
import { createMessageSchema } from "./message.validation.js";
import type { ITicketController } from "./ticket.controller.js";
import {
  createTicketSchema,
  idParamSchema,
  updateAssignmentSchema,
  updatePrioritySchema,
  updateStatusSchema,
} from "./ticket.validation.js";

export const createTicketRouter = (
  ticketController: ITicketController,
  messageController: IMessageController,
): Router => {
  const router = Router();

  router.post(
    ROUTES.TICKETS,
    authenticate,
    authorize(UserRole.CUSTOMER),
    validate(createTicketSchema),
    asyncHandler(ticketController.createTicketController),
  );

  router.get(
    ROUTES.TICKETS,
    authenticate,
    asyncHandler(ticketController.listTicketsController),
  );

  router.get(
    ROUTES.TICKET_BY_ID,
    authenticate,
    validateParams(idParamSchema),
    asyncHandler(ticketController.getTicketByIdController),
  );

  router.patch(
    ROUTES.TICKET_STATUS,
    authenticate,
    validateParams(idParamSchema),
    validate(updateStatusSchema),
    asyncHandler(ticketController.updateStatusController),
  );

  router.patch(
    ROUTES.TICKET_PRIORITY,
    authenticate,
    validateParams(idParamSchema),
    validate(updatePrioritySchema),
    asyncHandler(ticketController.updatePriorityController),
  );

  router.patch(
    ROUTES.TICKET_ASSIGNMENT,
    authenticate,
    authorize(UserRole.ADMIN),
    validateParams(idParamSchema),
    validate(updateAssignmentSchema),
    asyncHandler(ticketController.updateAssignmentController),
  );

  router.get(
    ROUTES.TICKET_MESSAGES,
    authenticate,
    validateParams(idParamSchema),
    asyncHandler(messageController.listMessagesController),
  );

  router.post(
    ROUTES.TICKET_MESSAGES,
    authenticate,
    validateParams(idParamSchema),
    validate(createMessageSchema),
    asyncHandler(messageController.createMessageController),
  );

  return router;
};
