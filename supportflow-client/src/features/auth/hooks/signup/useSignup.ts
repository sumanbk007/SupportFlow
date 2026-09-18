import { signupApi } from "@features/auth/services/signup/signup.api";
import { SignupPayload } from "@features/auth/services/signup/signup.types";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationFn: (payload: SignupPayload) => signupApi(payload),

    onSuccess: (data) => {
      console.log("Signup successful:", data);
    },

    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });
};
