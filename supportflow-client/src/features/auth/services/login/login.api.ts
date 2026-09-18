import { client } from "@services/http";

import { LoginPayload } from "./login.types";
import { API_ROUTES } from "@config/api.routes";

export const loginApi = async (payload: LoginPayload) => {
  const { data } = await client.post(API_ROUTES.auth.login, payload);
  return data;
};
