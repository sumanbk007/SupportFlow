import type { PrismaClient } from "../../generated/prisma/client.js";
import { TicketStatus, UserRole } from "../../generated/prisma/enums.js";
import type {
  CreateTicketData,
  EligibleAgent,
  TicketFilter,
  TicketRecord,
  UpdateTicketData,
} from "./ticket.types.js";

export interface ITicketRepository {
  create(data: CreateTicketData): Promise<TicketRecord>;
  findById(id: string): Promise<TicketRecord | null>;
  findMany(filter: TicketFilter): Promise<TicketRecord[]>;
  update(id: string, data: UpdateTicketData): Promise<TicketRecord>;
  findEligibleAgents(categoryId: string): Promise<EligibleAgent[]>;
  nextTicketNumber(): Promise<string>;
}

export const createTicketRepository = (
  prisma: PrismaClient,
): ITicketRepository => ({
  create: (data) => prisma.ticket.create({ data }),

  findById: (id) => prisma.ticket.findFirst({ where: { id } }),

  findMany: (filter) =>
    prisma.ticket.findMany({
      where: {
        ...(filter.customerId ? { customerId: filter.customerId } : {}),
        ...(filter.agentId ? { agentId: filter.agentId } : {}),
      },
      orderBy: { createdAt: "desc" },
    }),

  update: (id, data) => prisma.ticket.update({ where: { id }, data }),

  findEligibleAgents: async (categoryId) => {
    const agents = await prisma.user.findMany({
      where: {
        role: UserRole.AGENT,
        deletedAt: null,
        agentCategories: { some: { categoryId } },
      },
      select: {
        id: true,
        assignedTickets: {
          where: {
            status: { in: [TicketStatus.OPEN, TicketStatus.IN_PROGRESS] },
          },
          select: { id: true },
        },
      },
    });

    return agents.map((agent) => ({
      id: agent.id,
      activeTicketCount: agent.assignedTickets.length,
    }));
  },

  nextTicketNumber: async () => {
    const rows = await prisma.$queryRaw<
      { nextval: bigint | string }[]
    >`SELECT nextval('ticket_number_seq') as nextval`;

    const value = rows[0]?.nextval;

    if (value === undefined) {
      throw new Error("Failed to generate a ticket number");
    }

    return `SF-${String(value).padStart(6, "0")}`;
  },
});
