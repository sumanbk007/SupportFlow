import { Icon } from "@ui/icon/Icon";
import styles from "./sidebarLogo.module.scss";

const SidebarLogo = () => (
  <div className={styles.root}>
    <div className={styles.icon}>
      <Icon name="GraduationCap" color="var(--surface)" />
    </div>
    <div className={styles.text}>
      <span className={styles.name}>EduConsult CRM</span>
      <span className={styles.sub}>Global Admissions</span>
    </div>
  </div>
);

export { SidebarLogo };
