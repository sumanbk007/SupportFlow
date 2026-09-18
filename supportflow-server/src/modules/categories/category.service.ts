import { MESSAGES } from "../../constants/messages.js";
import { AppError } from "../../utils/app-error.js";
import type { ICategoryRepository } from "./category.repository.js";
import type {
  CategoryRecord,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./category.types.js";

export interface ICategoryService {
  listCategories(includeInactive: boolean): Promise<CategoryRecord[]>;
  getCategoryById(id: string): Promise<CategoryRecord>;
  createCategory(input: CreateCategoryInput): Promise<CategoryRecord>;
  updateCategory(id: string, input: UpdateCategoryInput): Promise<CategoryRecord>;
  deactivateCategory(id: string): Promise<CategoryRecord>;
}

export const createCategoryService = (
  categoryRepository: ICategoryRepository,
): ICategoryService => ({
  listCategories: (includeInactive) =>
    categoryRepository.findMany(includeInactive),

  getCategoryById: async (id) => {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new AppError(MESSAGES.CATEGORY.NOT_FOUND, 404);
    }

    return category;
  },

  createCategory: async (input) => {
    const existing = await categoryRepository.findByName(input.name);

    if (existing) {
      throw new AppError(MESSAGES.CATEGORY.NAME_TAKEN, 409);
    }

    return categoryRepository.create(input);
  },

  updateCategory: async (id, input) => {
    const existing = await categoryRepository.findById(id);

    if (!existing) {
      throw new AppError(MESSAGES.CATEGORY.NOT_FOUND, 404);
    }

    if (input.name && input.name !== existing.name) {
      const nameOwner = await categoryRepository.findByName(input.name);

      if (nameOwner) {
        throw new AppError(MESSAGES.CATEGORY.NAME_TAKEN, 409);
      }
    }

    return categoryRepository.update(id, input);
  },

  deactivateCategory: async (id) => {
    const existing = await categoryRepository.findById(id);

    if (!existing) {
      throw new AppError(MESSAGES.CATEGORY.NOT_FOUND, 404);
    }

    return categoryRepository.update(id, { isActive: false });
  },
});
