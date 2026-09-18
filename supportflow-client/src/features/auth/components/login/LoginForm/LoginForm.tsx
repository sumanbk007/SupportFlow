import { Icon } from "@ui/icon/Icon";
import { Input } from "@ui/input/Input";
import { Button } from "@ui/button/Button";
import { Checkbox } from "@ui/checkbox/Checkbox";
import { Card } from "@ui/card";
import { Link } from "react-router";
import { useAppForm } from "@utils/useAppForm";
import { loginSchema, type LoginFormData } from "../../../schemas/login.schema";
import { SocialLogin } from "../SocialLogin/SocialLogin";
import { LoginFooter } from "../LoginFooter/LoginFooter";
import { ROUTES } from "@router/constants.routes";
import styles from "./loginForm.module.scss";
import { Label } from "@ui/label/Label";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  workspace?: string;
  isLoading?: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAppForm<LoginFormData>(loginSchema);

  return (
    <Card>
      <div className={styles.fields}>
        <Input
          label="Email Address"
          required
          placeholder="name@company.com"
          leftIcon={<Icon name="Mail" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <div className={styles.passwordWrapper}>
          <div className={styles.passwordLabel}>
            <Label required>Password</Label>
            <Label></Label>
            <Link to={ROUTES.FORGOT_PASSWORD} className={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>
          <Input
            variant="password"
            required
            placeholder="••••••••"
            leftIcon={<Icon name="Lock" />}
            error={errors.password?.message}
            {...register("password")}
          />
        </div>

        <Checkbox
          label="Remember this device"
          checked={true}
          {...register("rememberDevice")}
        />

        <Button
          variant="primary"
          fullWidth
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          Sign In
        </Button>
      </div>
    </Card>
  );
};

export { LoginForm };
