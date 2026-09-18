import { SidebarLogo } from "./componenets/SidebarLogo/SidebarLogo";
import { SidebarNav } from "./componenets/SidebarNav/SidebarNav";
import styles from "./sidebar.module.scss";

interface SidebarProps {
  onAddLead?: () => void;
}

const Sidebar = ({ onAddLead }: SidebarProps) => (
  <aside className={styles.root}>
    <SidebarLogo />
    <SidebarNav />
  </aside>
);

export { Sidebar };
