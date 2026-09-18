import { SidebarNavItem } from "../SidebarNavItem/SidebarNavItem";
import type { SidebarNavItemProps } from "../SidebarNavItem/SidebarNavItem";
import { ROUTES } from "@router/constants.routes";
import styles from "./sidebarNav.module.scss";

const NAV_ITEMS: SidebarNavItemProps[] = [
  { label: "Dashboard", icon: "LayoutDashboard", path: ROUTES.DASHBOARD },
  { label: "Leads", icon: "Users", path: ROUTES.LEADS },
  { label: "Students", icon: "GraduationCap", path: ROUTES.STUDENTS },
  { label: "Tasks", icon: "CheckSquare", path: ROUTES.TASKS },
  { label: "Reports", icon: "BarChart2", path: ROUTES.REPORTS },
  { label: "Settings", icon: "Settings", path: ROUTES.SETTINGS },
];

const SidebarNav = () => (
  <nav className={styles.root}>
    {NAV_ITEMS.map((item) => (
      <SidebarNavItem key={item.path} {...item} />
    ))}
  </nav>
);

export { SidebarNav };
