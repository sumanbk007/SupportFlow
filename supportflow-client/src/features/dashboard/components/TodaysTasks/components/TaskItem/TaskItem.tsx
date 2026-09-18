import { Icon } from "@ui/icon/Icon";
import type { TaskItemData } from "../../../../types/dashboard.types";
import styles from "./taskItem.module.scss";

const TaskItem = ({ avatar, name, description, actionIcon }: TaskItemData) => (
  <div className={styles.root}>
    <img src={avatar} alt={name} className={styles.avatar} />
    <div className={styles.info}>
      <p className={styles.name}>{name}</p>
      <p className={styles.description}>{description}</p>
    </div>
    <button className={styles.action}>
      <Icon name={actionIcon} size="sm" color="#fff" />
    </button>
  </div>
);

export { TaskItem };
