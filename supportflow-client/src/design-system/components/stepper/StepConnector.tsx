import clsx from "clsx";
import styles from "./stepper.module.scss";

interface StepConnectorProps {
  filled: boolean;
}

export const StepConnector = ({ filled }: StepConnectorProps) => {
  return (
    <div
      className={clsx(
        styles.stepConnector,
        filled && styles["stepConnector--filled"],
      )}
    />
  );
};
