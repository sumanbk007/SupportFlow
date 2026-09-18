import type { PrismaClient } from "../../generated/prisma/client.js";
import type {
  AgentRecord,
  CreateUserData,
  UpdateUserInput,
  UserRecord,
  UserWithPassword,
} from "./user.types.js";

const userSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

const userWithPasswordSelect = {
  ...userSelect,
  passwordHash: true,
} as const;

const agentSelect = {
  ...userSelect,
  agentCategories: {
    select: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
} as const;

const toAgentRecord = (agent: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRecord["role"];
  createdAt: Date;
  updatedAt: Date;
  agentCategories: { category: { id: string; name: string } }[];
}): AgentRecord => ({
  id: agent.id,
  firstName: agent.firstName,
  lastName: agent.lastName,
  email: agent.email,
  role: agent.role,
  createdAt: agent.createdAt,
  updatedAt: agent.updatedAt,
  categories: agent.agentCategories.map((ac) => ac.category),
});

export interface IUserRepository {
  findMany(): Promise<UserRecord[]>;
  findById(id: string): Promise<UserRecord | null>;
  findByEmail(email: string): Promise<UserWithPassword | null>;
  existsByEmail(email: string): Promise<boolean>;
  create(data: CreateUserData): Promise<UserRecord>;
  update(id: string, data: UpdateUserInput): Promise<UserRecord>;
  softDelete(id: string): Promise<void>;
  createAgentWithCategories(
    data: CreateUserData,
    categoryIds: string[],
  ): Promise<AgentRecord>;
  setAgentCategories(
    agentId: string,
    categoryIds: string[],
  ): Promise<AgentRecord>;
}

export const createUserRepository = (
  prisma: PrismaClient,
): IUserRepository => ({
  findMany: () =>
    prisma.user.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      select: userSelect,
    }),

  findById: (id) =>
    prisma.user.findFirst({
      where: { id, deletedAt: null },
      select: userSelect,
    }),

  findByEmail: (email) =>
    prisma.user.findFirst({
      where: { email, deletedAt: null },
      select: userWithPasswordSelect,
    }),

  existsByEmail: async (email) => {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return user !== null;
  },

  create: (data) =>
    prisma.user.create({
      data,
      select: userSelect,
    }),

  update: (id, data) =>
    prisma.user.update({
      where: { id },
      data,
      select: userSelect,
    }),

  softDelete: async (id) => {
    await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  createAgentWithCategories: async (data, categoryIds) => {
    const agent = await prisma.user.create({
      data: {
        ...data,
        agentCategories: {
          create: categoryIds.map((categoryId) => ({ categoryId })),
        },
      },
      select: agentSelect,
    });

    return toAgentRecord(agent);
  },

  setAgentCategories: async (agentId, categoryIds) => {
    const agent = await prisma.$transaction(async (tx) => {
      await tx.agentCategory.deleteMany({ where: { agentId } });

      return tx.user.update({
        where: { id: agentId },
        data: {
          agentCategories: {
            create: categoryIds.map((categoryId) => ({ categoryId })),
          },
        },
        select: agentSelect,
      });
    });

    return toAgentRecord(agent);
  },
});
