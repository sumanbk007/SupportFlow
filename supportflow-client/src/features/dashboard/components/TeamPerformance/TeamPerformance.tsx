import type { PerformanceRowData } from "../../types/dashboard.types";
import styles from "./teamPerformance.module.scss";

interface TeamPerformanceProps {
  rows: PerformanceRowData[];
}

const TeamPerformance = ({ rows }: TeamPerformanceProps) => (
  <div className={styles.root}>
    <h3 className={styles.title}>Team Performance</h3>

    <div className={styles.list}>
      {rows.map((row) => (
        <div key={row.id} className={styles.row}>
          <div className={styles.rowTop}>
            <span className={styles.rank}>{row.rank}</span>
            <span className={styles.name}>{row.name}</span>
            <span className={styles.percentage}>{row.percentage}%</span>
          </div>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{ width: `${row.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export { TeamPerformance };
