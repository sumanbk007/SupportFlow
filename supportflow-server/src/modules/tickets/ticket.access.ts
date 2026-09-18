import { UserRole } from "../../generated/prisma/enums.js";
import type { RequesterContext, TicketRecord } from "./ticket.types.js";

export const canAccessTicket = (
  ticket: Pick<TicketRecord, "customerId" | "agentId">,
  requester: RequesterContext,
): boolean => {
  if (requester.role === UserRole.ADMIN) {
    return true;
  }

  if (requester.role === UserRole.CUSTOMER) {
    return ticket.customerId === requester.id;
  }

  if (requester.role === UserRole.AGENT) {
    return ticket.agentId === requester.id;
  }

  return false;
};
