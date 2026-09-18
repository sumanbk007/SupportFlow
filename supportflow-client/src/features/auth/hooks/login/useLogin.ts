import { loginApi } from "@features/auth/services/login/login.api";
import { LoginPayload } from "@features/auth/services/login/login.types";

import { useMutation } from "@tanstack/react-query";
import { storage } from "@services/storage";

export const useLogin = () => {
  const { setAccessToken, setRefreshToken } = storage;

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),

    onSuccess: (data) => {
      const { access_token, refresh_token } = data || {};
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
    },

    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });
};
