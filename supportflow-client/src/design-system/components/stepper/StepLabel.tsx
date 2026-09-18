// stepper/StepLabel.tsx
import clsx from "clsx";
import styles from "./stepper.module.scss";

type StepState = "completed" | "active" | "pending";

interface StepLabelProps {
  label: string;
  state: StepState;
}

export const StepLabel = ({ label, state }: StepLabelProps) => {
  return (
    <span
      className={clsx(
        styles.stepLabel,
        state === "active" && styles["stepLabel--active"],
        state === "pending" && styles["stepLabel--pending"],
        state === "completed" && styles["stepLabel--completed"],
      )}
    >
      {label}
    </span>
  );
};
