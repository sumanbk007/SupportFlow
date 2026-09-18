import { Outlet } from "react-router";
import { Sidebar } from "./components/Sidebar/Sidebar";
import styles from "./dashboradLayout.module.scss";

const DashboardLayout = () => (
  <div className={styles.root}>
    <Sidebar />
    <div className={styles.main}>
      <Outlet />
    </div>
  </div>
);

export default DashboardLayout;
