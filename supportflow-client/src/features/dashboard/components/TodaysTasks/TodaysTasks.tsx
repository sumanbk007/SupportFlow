import { Icon } from "@ui/icon/Icon";
import { TaskItem } from "./components/TaskItem/TaskItem";
import type { TaskItemData } from "../../types/dashboard.types";
import styles from "./todaysTasks.module.scss";

interface TodaysTasksProps {
  tasks: TaskItemData[];
  totalCount: number;
}

const TodaysTasks = ({ tasks, totalCount }: TodaysTasksProps) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <h3 className={styles.title}>Today's Follow-ups</h3>
      <button className={styles.menuBtn}>
        <Icon name="MoreVertical" size="sm" />
      </button>
    </div>

    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </div>

    <button className={styles.viewAll}>View All ({totalCount})</button>
  </div>
);

export { TodaysTasks };
