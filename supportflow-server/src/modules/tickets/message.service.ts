import { TicketStatus } from "../../generated/prisma/enums.js";
import { MESSAGES } from "../../constants/messages.js";
import { AppError } from "../../utils/app-error.js";
import { canAccessTicket } from "./ticket.access.js";
import type { ITicketRepository } from "./ticket.repository.js";
import type { RequesterContext } from "./ticket.types.js";
import type { IMessageRepository } from "./message.repository.js";
import type { CreateMessageInput, MessageRecord } from "./message.types.js";

export interface IMessageService {
  listMessages(
    ticketId: string,
    requester: RequesterContext,
  ): Promise<MessageRecord[]>;
  createMessage(
    ticketId: string,
    requester: RequesterContext,
    input: CreateMessageInput,
  ): Promise<MessageRecord>;
}

export const createMessageService = (
  messageRepository: IMessageRepository,
  ticketRepository: ITicketRepository,
): IMessageService => ({
  listMessages: async (ticketId, requester) => {
    const ticket = await ticketRepository.findById(ticketId);

    if (!ticket) {
      throw new AppError(MESSAGES.TICKET.NOT_FOUND, 404);
    }

    if (!canAccessTicket(ticket, requester)) {
      throw new AppError(MESSAGES.TICKET.FORBIDDEN, 403);
    }

    return messageRepository.findByTicketId(ticketId);
  },

  createMessage: async (ticketId, requester, input) => {
    const ticket = await ticketRepository.findById(ticketId);

    if (!ticket) {
      throw new AppError(MESSAGES.TICKET.NOT_FOUND, 404);
    }

    if (!canAccessTicket(ticket, requester)) {
      throw new AppError(MESSAGES.TICKET.FORBIDDEN, 403);
    }

    if (ticket.status === TicketStatus.CLOSED) {
      throw new AppError(MESSAGES.TICKET.CLOSED, 403);
    }

    return messageRepository.create({
      ticketId,
      authorId: requester.id,
      content: input.content,
    });
  },
});
