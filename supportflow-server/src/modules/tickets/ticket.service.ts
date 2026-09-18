import { TicketStatus, UserRole } from "../../generated/prisma/enums.js";
import type { TicketPriority } from "../../generated/prisma/enums.js";
import { MESSAGES } from "../../constants/messages.js";
import { AppError } from "../../utils/app-error.js";
import type { ICategoryRepository } from "../categories/category.repository.js";
import type { IUserRepository } from "../users/user.repository.js";
import { canAccessTicket } from "./ticket.access.js";
import type { ITicketRepository } from "./ticket.repository.js";
import type {
  CreateTicketInput,
  RequesterContext,
  TicketRecord,
  UpdateTicketData,
} from "./ticket.types.js";

const STATUS_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  [TicketStatus.OPEN]: [TicketStatus.IN_PROGRESS],
  [TicketStatus.IN_PROGRESS]: [TicketStatus.OPEN, TicketStatus.RESOLVED],
  [TicketStatus.RESOLVED]: [TicketStatus.OPEN, TicketStatus.CLOSED],
  [TicketStatus.CLOSED]: [TicketStatus.OPEN],
};

export interface ITicketService {
  createTicket(
    customerId: string,
    input: CreateTicketInput,
  ): Promise<TicketRecord>;
  listTickets(requester: RequesterContext): Promise<TicketRecord[]>;
  getTicketById(id: string, requester: RequesterContext): Promise<TicketRecord>;
  changeStatus(
    id: string,
    requester: RequesterContext,
    status: TicketStatus,
  ): Promise<TicketRecord>;
  changePriority(
    id: string,
    requester: RequesterContext,
    priority: TicketPriority,
  ): Promise<TicketRecord>;
  changeAssignment(
    id: string,
    requester: RequesterContext,
    agentId: string | null,
  ): Promise<TicketRecord>;
}

export const createTicketService = (
  ticketRepository: ITicketRepository,
  categoryRepository: ICategoryRepository,
  userRepository: IUserRepository,
): ITicketService => ({
  createTicket: async (customerId, input) => {
    const category = await categoryRepository.findActiveById(input.categoryId);

    if (!category) {
      throw new AppError(MESSAGES.CATEGORY.NOT_FOUND_OR_INACTIVE, 400);
    }

    const eligibleAgents = await ticketRepository.findEligibleAgents(
      input.categoryId,
    );

    let agentId: string | null = null;

    if (eligibleAgents.length > 0) {
      const leastLoaded = eligibleAgents.reduce((lowest, candidate) =>
        candidate.activeTicketCount < lowest.activeTicketCount
          ? candidate
          : lowest,
      );

      agentId = leastLoaded.id;
    }

    const ticketNumber = await ticketRepository.nextTicketNumber();

    return ticketRepository.create({
      ticketNumber,
      subject: input.subject,
      description: input.description,
      categoryId: input.categoryId,
      customerId,
      agentId,
    });
  },

  listTickets: (requester) => {
    if (requester.role === UserRole.ADMIN) {
      return ticketRepository.findMany({});
    }

    if (requester.role === UserRole.CUSTOMER) {
      return ticketRepository.findMany({ customerId: requester.id });
    }

    return ticketRepository.findMany({ agentId: requester.id });
  },

  getTicketById: async (id, requester) => {
    const ticket = await ticketRepository.findById(id);

    if (!ticket) {
      throw new AppError(MESSAGES.TICKET.NOT_FOUND, 404);
    }

    if (!canAccessTicket(ticket, requester)) {
      throw new AppError(MESSAGES.TICKET.FORBIDDEN, 403);
    }

    return ticket;
  },

  changeStatus: async (id, requester, status) => {
    const ticket = await ticketRepository.findById(id);

    if (!ticket) {
      throw new AppError(MESSAGES.TICKET.NOT_FOUND, 404);
    }

    const allowedNextStatuses = STATUS_TRANSITIONS[ticket.status];

    if (!allowedNextStatuses.includes(status)) {
      throw new AppError(MESSAGES.TICKET.INVALID_STATUS_TRANSITION, 400);
    }

    const isAdmin = requester.role === UserRole.ADMIN;
    const isAssignedAgent =
      requester.role === UserRole.AGENT && ticket.agentId === requester.id;
    const isOwningCustomer =
      requester.role === UserRole.CUSTOMER &&
      ticket.customerId === requester.id;

    const isReopenFromClosed =
      ticket.status === TicketStatus.CLOSED && status === TicketStatus.OPEN;
    const isCloseFromResolved =
      ticket.status === TicketStatus.RESOLVED &&
      status === TicketStatus.CLOSED;
    const isReopenFromResolved =
      ticket.status === TicketStatus.RESOLVED && status === TicketStatus.OPEN;

    let authorized: boolean;

    if (isReopenFromClosed || isCloseFromResolved) {
      authorized = isAdmin;
    } else if (isReopenFromResolved) {
      authorized = isAdmin || isOwningCustomer;
    } else {
      authorized = isAdmin || isAssignedAgent;
    }

    if (!authorized) {
      throw new AppError(MESSAGES.TICKET.FORBIDDEN, 403);
    }

    const data: UpdateTicketData = { status };

    if (status === TicketStatus.RESOLVED) {
      data.resolvedAt = new Date();
    }

    if (status === TicketStatus.CLOSED) {
      data.closedAt = new Date();
    }

    if (status === TicketStatus.OPEN) {
      data.resolvedAt = null;
      data.closedAt = null;
    }

    return ticketRepository.update(id, data);
  },

  changePriority: async (id, requester, priority) => {
    const ticket = await ticketRepository.findById(id);

    if (!ticket) {
      throw new AppError(MESSAGES.TICKET.NOT_FOUND, 404);
    }

    if (ticket.status === TicketStatus.CLOSED) {
      throw new AppError(MESSAGES.TICKET.CLOSED, 403);
    }

    const isAdmin = requester.role === UserRole.ADMIN;
    const isAssignedAgent =
      requester.role === UserRole.AGENT && ticket.agentId === requester.id;

    if (!isAdmin && !isAssignedAgent) {
      throw new AppError(MESSAGES.TICKET.FORBIDDEN, 403);
    }

    return ticketRepository.update(id, { priority });
  },

  changeAssignment: async (id, requester, agentId) => {
    const ticket = await ticketRepository.findById(id);

    if (!ticket) {
      throw new AppError(MESSAGES.TICKET.NOT_FOUND, 404);
    }

    if (requester.role !== UserRole.ADMIN) {
      throw new AppError(MESSAGES.TICKET.FORBIDDEN, 403);
    }

    if (agentId) {
      const agent = await userRepository.findById(agentId);

      if (!agent || agent.role !== UserRole.AGENT) {
        throw new AppError(MESSAGES.TICKET.INVALID_AGENT, 400);
      }
    }

    return ticketRepository.update(id, { agentId });
  },
});
