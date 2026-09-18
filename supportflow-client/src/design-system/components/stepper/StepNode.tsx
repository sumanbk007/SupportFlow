// stepper/StepNode.tsx
import clsx from "clsx";
import styles from "./stepper.module.scss";

type StepState = "completed" | "active" | "pending";

interface StepNodeProps {
  stepNumber: number;
  state: StepState;
}

export const StepNode = ({ stepNumber, state }: StepNodeProps) => {
  return (
    <div
      className={clsx(
        styles.stepNode,
        state === "completed" && styles["stepNode--completed"],
        state === "active" && styles["stepNode--active"],
        state === "pending" && styles["stepNode--pending"],
      )}
    >
      {state === "completed" ? <CheckIcon /> : <span>{stepNumber}</span>}
    </div>
  );
};

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 8.5L6.5 12L13 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
