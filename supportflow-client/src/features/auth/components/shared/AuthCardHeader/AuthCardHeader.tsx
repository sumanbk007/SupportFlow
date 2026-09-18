import type { ReactNode } from "react";
import styles from "./AuthCardHeader.module.scss";

interface AuthCardHeaderProps {
  title: string;
  description: string;
  badge?: ReactNode;
}

const AuthCardHeader = ({ title, description, badge }: AuthCardHeaderProps) => (
  <div className={styles.root}>
    {badge && <div className={styles.badge}>{badge}</div>}
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.description}>{description}</p>
  </div>
);

export default AuthCardHeader;
