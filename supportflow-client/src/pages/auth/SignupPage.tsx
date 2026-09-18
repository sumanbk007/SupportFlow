import styles from "./signupPage.module.scss";
import { AuthLogo } from "@features/auth";

import { useSignup } from "@features/auth/hooks/signup/useSignup";
import { useNavigate } from "react-router";
import { storage } from "@services/storage";
import { SignupForm } from "@features/auth/components/signup/SignupForm";

const SignupPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useSignup();
  const { setAccessToken, setRefreshToken } = storage || {};

  const handleSubmit = (data: SignupData) => {
    const { firstName, lastName, email, password } = data;

    const signupPayload = {
      firstName,
      lastName,
      email,
      password,
    };

    mutate(signupPayload, {
      onSuccess: (res) => {
        const { access_token, refresh_token } = res || {};
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        navigate("/");
      },

      onError: (err) => {
        console.error("Signup failed:", err);
      },
    });
  };

  return (
    <div className={styles.root}>
      <AuthLogo
        tagline="Sign in to continue to SupportFlow "
        title="Welcome back"
      />
      <SignupForm onSubmit={handleSubmit} isLoading={isPending} />

      <div className={styles.links}>
        <span>Already have an account?{}</span>
        <button
          className={styles.link}
          type="button"
          onClick={() => navigate("/login")}
        >
          Sign in here
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
