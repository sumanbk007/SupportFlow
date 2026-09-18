import styles from "./stepper.module.scss";
import { StepNode } from "./StepNode";
import { StepLabel } from "./StepLabel";

type StepState = "completed" | "active" | "pending";

interface StepItemProps {
  stepNumber: number;
  label: string;
  state: StepState;
}

export const StepItem = ({ stepNumber, label, state }: StepItemProps) => {
  return (
    <div className={styles.stepItem}>
      <StepNode stepNumber={stepNumber} state={state} />
      <StepLabel label={label} state={state} />
    </div>
  );
};
