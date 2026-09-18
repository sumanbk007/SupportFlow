import type { PrismaClient } from "../../generated/prisma/client.js";
import type {
  CategoryRecord,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./category.types.js";

export interface ICategoryRepository {
  findMany(includeInactive: boolean): Promise<CategoryRecord[]>;
  findById(id: string): Promise<CategoryRecord | null>;
  findActiveById(id: string): Promise<CategoryRecord | null>;
  findByName(name: string): Promise<CategoryRecord | null>;
  findManyByIds(ids: string[]): Promise<CategoryRecord[]>;
  create(data: CreateCategoryInput): Promise<CategoryRecord>;
  update(id: string, data: UpdateCategoryInput): Promise<CategoryRecord>;
}

export const createCategoryRepository = (
  prisma: PrismaClient,
): ICategoryRepository => ({
  findMany: (includeInactive) =>
    prisma.category.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: { name: "asc" },
    }),

  findById: (id) => prisma.category.findFirst({ where: { id } }),

  findActiveById: (id) =>
    prisma.category.findFirst({ where: { id, isActive: true } }),

  findByName: (name) => prisma.category.findFirst({ where: { name } }),

  findManyByIds: (ids) =>
    prisma.category.findMany({ where: { id: { in: ids } } }),

  create: (data) => prisma.category.create({ data }),

  update: (id, data) => prisma.category.update({ where: { id }, data }),
});
