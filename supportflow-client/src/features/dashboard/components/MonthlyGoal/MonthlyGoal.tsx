import styles from "./monthlyGoal.module.scss";

interface MonthlyGoalProps {
  amount: string;
  percentage: number;
  target: string;
  todayIncrease: string;
}

const MonthlyGoal = ({
  amount,
  percentage,
  target,
  todayIncrease,
}: MonthlyGoalProps) => (
  <div className={styles.root}>
    <span className={styles.label}>Monthly Goal</span>
    <p className={styles.amount}>{amount}</p>

    <div className={styles.barTrack}>
      <div className={styles.barFill} style={{ width: `${percentage}%` }} />
    </div>

    <div className={styles.footer}>
      <span className={styles.footerText}>
        {percentage}% of {target} reached
      </span>
      <span className={styles.increase}>+{todayIncrease} today</span>
    </div>
  </div>
);

export { MonthlyGoal };
