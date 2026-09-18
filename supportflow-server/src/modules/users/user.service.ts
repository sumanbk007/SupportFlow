import bcrypt from "bcryptjs";

import { UserRole } from "../../generated/prisma/enums.js";
import { MESSAGES } from "../../constants/messages.js";
import { AppError } from "../../utils/app-error.js";
import type { ICategoryRepository } from "../categories/category.repository.js";
import type { IUserRepository } from "./user.repository.js";
import type {
  AgentRecord,
  CreateAgentInput,
  SetAgentCategoriesInput,
  UpdateUserInput,
  UserRecord,
} from "./user.types.js";

export interface IUserService {
  getUsers(): Promise<UserRecord[]>;
  getUserById(id: string): Promise<UserRecord>;
  updateUser(id: string, input: UpdateUserInput): Promise<UserRecord>;
  deleteUser(id: string): Promise<void>;
  createAgent(data: CreateAgentInput): Promise<AgentRecord>;
  setAgentCategories(
    agentId: string,
    input: SetAgentCategoriesInput,
  ): Promise<AgentRecord>;
}

const assertCategoriesExist = async (
  categoryRepository: ICategoryRepository,
  categoryIds: string[],
) => {
  if (categoryIds.length === 0) {
    return;
  }

  const found = await categoryRepository.findManyByIds(categoryIds);

  if (found.length !== new Set(categoryIds).size) {
    throw new AppError(MESSAGES.USER.INVALID_CATEGORY, 400);
  }
};

export const createUserService = (
  userRepository: IUserRepository,
  categoryRepository: ICategoryRepository,
): IUserService => ({
  getUsers: () => userRepository.findMany(),

  getUserById: async (id) => {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError(MESSAGES.USER.NOT_FOUND, 404);
    }

    return user;
  },

  updateUser: async (id, input) => {
    const existingUser = await userRepository.findById(id);

    if (!existingUser) {
      throw new AppError(MESSAGES.USER.NOT_FOUND, 404);
    }

    if (input.email && input.email !== existingUser.email) {
      const emailOwner = await userRepository.findByEmail(input.email);

      if (emailOwner) {
        throw new AppError(MESSAGES.AUTH.EMAIL_TAKEN, 409);
      }
    }

    const data: UpdateUserInput = {};

    if (input.firstName !== undefined) {
      data.firstName = input.firstName;
    }

    if (input.lastName !== undefined) {
      data.lastName = input.lastName;
    }

    if (input.email !== undefined) {
      data.email = input.email;
    }

    return userRepository.update(id, data);
  },

  deleteUser: async (id) => {
    const existingUser = await userRepository.findById(id);

    if (!existingUser) {
      throw new AppError(MESSAGES.USER.NOT_FOUND, 404);
    }

    await userRepository.softDelete(id);
  },

  createAgent: async (data) => {
    const exists = await userRepository.existsByEmail(data.email);

    if (exists) {
      throw new AppError(MESSAGES.AUTH.EMAIL_TAKEN, 409);
    }

    await assertCategoriesExist(categoryRepository, data.categoryIds);

    const passwordHash = await bcrypt.hash(data.password, 12);

    return userRepository.createAgentWithCategories(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passwordHash,
        role: UserRole.AGENT,
      },
      data.categoryIds,
    );
  },

  setAgentCategories: async (agentId, input) => {
    const agent = await userRepository.findById(agentId);

    if (!agent) {
      throw new AppError(MESSAGES.USER.NOT_FOUND, 404);
    }

    if (agent.role !== UserRole.AGENT) {
      throw new AppError(MESSAGES.USER.NOT_FOUND, 404);
    }

    await assertCategoriesExist(categoryRepository, input.categoryIds);

    return userRepository.setAgentCategories(agentId, input.categoryIds);
  },
});
