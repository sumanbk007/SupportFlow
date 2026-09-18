import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../config/env.js";

export interface JwtPayload {
  userId: string;
  role: string;
}

const expiresIn = env.JWT_EXPIRES_IN as NonNullable<SignOptions["expiresIn"]>;

export const signJwt = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
};

export const verifyJwt = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};
