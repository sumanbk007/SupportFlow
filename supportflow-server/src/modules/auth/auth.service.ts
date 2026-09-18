import bcrypt from "bcryptjs";

import { UserRole } from "../../generated/prisma/enums.js";
import { MESSAGES } from "../../constants/messages.js";
import { AppError } from "../../utils/app-error.js";
import { signJwt } from "../../utils/jwt.js";
import type { IUserRepository } from "../users/user.repository.js";
import type { AuthResult, LoginInput, RegisterCustomerInput } from "./auth.types.js";

export interface IAuthService {
  registerCustomer(data: RegisterCustomerInput): Promise<AuthResult["user"]>;
  login(data: LoginInput): Promise<AuthResult>;
}

export const createAuthService = (
  userRepository: IUserRepository,
): IAuthService => ({
  registerCustomer: async (data) => {
    const exists = await userRepository.existsByEmail(data.email);

    if (exists) {
      throw new AppError(MESSAGES.AUTH.EMAIL_TAKEN, 409);
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    return userRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash,
      role: UserRole.CUSTOMER,
    });
  },

  login: async (data) => {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError(MESSAGES.AUTH.INVALID_CREDENTIALS, 401);
    }

    const passwordMatches = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new AppError(MESSAGES.AUTH.INVALID_CREDENTIALS, 401);
    }

    const token = signJwt({
      userId: user.id,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    };
  },
});
