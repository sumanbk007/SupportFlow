import { Icon } from "@ui/icon/Icon";
import type { OverdueItemData } from "../../types/dashboard.types";
import styles from "./overdueTasks.module.scss";

interface OverdueTasksProps {
  items: OverdueItemData[];
  urgentCount: number;
}

const OverdueTasks = ({ items, urgentCount }: OverdueTasksProps) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <Icon name="AlertTriangle" size="sm" color="var(--danger)" />
        <h3 className={styles.title}>Overdue</h3>
      </div>
      <span className={styles.badge}>{urgentCount} Urgent</span>
    </div>

    <div className={styles.list}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <span className={styles.dot} />
          <div>
            <p className={styles.itemTitle}>{item.title}</p>
            <p className={styles.itemMeta}>{item.meta}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export { OverdueTasks };
