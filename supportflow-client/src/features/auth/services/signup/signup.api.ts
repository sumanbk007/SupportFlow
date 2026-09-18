import { client } from "@services/http";

import { SignupPayload } from "./signup.types";
import { API_ROUTES } from "@config/api.routes";

export const signupApi = async (payload: SignupPayload) => {
  const { data } = await client.post(API_ROUTES.auth.signup, payload);
  return data;
};
