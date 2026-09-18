import type { PrismaClient } from "../../generated/prisma/client.js";
import type { CreateMessageData, MessageRecord } from "./message.types.js";

export interface IMessageRepository {
  findByTicketId(ticketId: string): Promise<MessageRecord[]>;
  create(data: CreateMessageData): Promise<MessageRecord>;
}

export const createMessageRepository = (
  prisma: PrismaClient,
): IMessageRepository => ({
  findByTicketId: (ticketId) =>
    prisma.ticketMessage.findMany({
      where: { ticketId },
      orderBy: { createdAt: "asc" },
    }),

  create: (data) => prisma.ticketMessage.create({ data }),
});
