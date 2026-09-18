import styles from "./stepper.module.scss";
import { StepItem } from "./StepItem";
import { StepConnector } from "./StepConnector";

type Step = { label: string };

interface StepperProps {
  steps: Step[];
  currentStep: number; // 1-based
}

const getStepState = (
  stepNumber: number,
  currentStep: number,
): "completed" | "active" | "pending" => {
  if (stepNumber < currentStep) return "completed";
  if (stepNumber === currentStep) return "active";
  return "pending";
};

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const state = getStepState(stepNumber, currentStep);
        const isLast = index === steps.length - 1;

        return (
          <div key={step.label} className={styles.stepperRow}>
            <StepItem
              stepNumber={stepNumber}
              label={step.label}
              state={state}
            />
            {!isLast && <StepConnector filled={state === "completed"} />}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
