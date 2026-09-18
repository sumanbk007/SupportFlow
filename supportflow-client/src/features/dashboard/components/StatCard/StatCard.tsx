import { Icon } from "@ui/icon/Icon";
import type { StatCardData } from "../../types/dashboard.types";
import styles from "./statCard.module.scss";

const StatCard = ({
  label,
  value,
  icon,
  trend,
  iconBg,
  valueLabel,
}: StatCardData) => {
  const isPositive = trend >= 0;

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <p className={styles.label}>{label}</p>

        <div className={`${styles.iconBox} ${styles[`iconBox--${iconBg}`]}`}>
          <Icon name={icon} size="md" />
        </div>
      </div>

      <p>
        <span className={styles.value}>{value}</span>{" "}
        <span className={styles.valuelabel}>{valueLabel}</span>
      </p>
    </div>
  );
};

export { StatCard };
