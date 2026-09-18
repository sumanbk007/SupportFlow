import { NavLink } from "react-router";
import { Icon } from "@ui/icon/Icon";
import styles from "./sidebarNavItem.module.scss";

interface SidebarNavItemProps {
  label: string;
  icon: any;
  path: string;
}

const SidebarNavItem = ({ label, icon, path }: SidebarNavItemProps) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `${styles.root} ${isActive ? styles.active : ""}`
    }
  >
    <Icon name={icon} size="sm" />
    <span className={styles.label}>{label}</span>
  </NavLink>
);

export { SidebarNavItem };
export type { SidebarNavItemProps };
