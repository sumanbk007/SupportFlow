import type { UserRole } from "../../generated/prisma/enums.js";

export interface CreateAgentInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  categoryIds: string[];
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface SetAgentCategoriesInput {
  categoryIds: string[];
}

export interface UserRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithPassword extends UserRecord {
  passwordHash: string;
}

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

export interface CategorySummary {
  id: string;
  name: string;
}

export interface AgentRecord extends UserRecord {
  categories: CategorySummary[];
}
