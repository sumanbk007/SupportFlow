import { Icon } from "@ui/icon/Icon";
import { Input } from "@ui/input/Input";
import { Button } from "@ui/button/Button";
import { Card } from "@ui/card";
import { Link } from "react-router";
import { useAppForm } from "@utils/useAppForm";

import { ROUTES } from "@router/constants.routes";
import styles from "./signupform.module.scss";
import { Label } from "@ui/label/Label";
import {
  SignupFormData,
  signupSchema,
} from "@features/auth/schemas/signup.schema";

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
  isLoading?: boolean;
}

const SignupForm = ({ onSubmit, isLoading }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAppForm<SignupFormData>(signupSchema);

  return (
    <Card>
      <div className={styles.fields}>
        <div className={styles.name}>
          <Input
            label="First Name"
            required
            inputSize="sm"
            placeholder="John "
            error={errors.firstName?.message}
            {...register("firstName")}
          />

          <Input
            label="Last Name"
            required
            placeholder=" Doe"
            inputSize="sm"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>
        <Input
          label="Email Address"
          required
          inputSize="sm"
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
            inputSize="sm"
            placeholder="••••••••"
            leftIcon={<Icon name="Lock" />}
            error={errors.password?.message}
            {...register("password")}
          />
        </div>

        <Button
          variant="primary"
          fullWidth
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          Register
        </Button>
      </div>
    </Card>
  );
};

export { SignupForm };
