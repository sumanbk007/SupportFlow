import { AuthLogo } from "@features/auth";
import { LoginForm } from "@features/auth/components/login/LoginForm/LoginForm";
import type { LoginFormData } from "@features/auth/schemas/login.schema";
import styles from "./loginPage.module.scss";
import { useLogin } from "@features/auth/hooks/login/useLogin";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (data: LoginFormData) => {
    const { email, password } = data || {};
    const finalPayload = { email, password };
    mutate(finalPayload, {
      onSuccess: () => {
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
      <LoginForm onSubmit={handleSubmit} isLoading={isPending} />

      <div className={styles.links}>
        <span>Don't have an account?</span>
        <button
          className={styles.link}
          type="button"
          onClick={() => navigate("/register")}
        >
          Sign up here
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default LoginPage;
