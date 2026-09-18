import type {
  TicketPriority,
  TicketStatus,
  UserRole,
} from "../../generated/prisma/enums.js";

export interface CreateTicketInput {
  subject: string;
  description: string;
  categoryId: string;
}

export interface RequesterContext {
  id: string;
  role: UserRole;
}

export interface TicketRecord {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  customerId: string;
  agentId: string | null;
  categoryId: string;
  resolvedAt: Date | null;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTicketData {
  ticketNumber: string;
  subject: string;
  description: string;
  categoryId: string;
  customerId: string;
  agentId: string | null;
}

export interface UpdateTicketData {
  status?: TicketStatus;
  priority?: TicketPriority;
  agentId?: string | null;
  resolvedAt?: Date | null;
  closedAt?: Date | null;
}

export interface TicketFilter {
  customerId?: string;
  agentId?: string;
}

export interface EligibleAgent {
  id: string;
  activeTicketCount: number;
}
