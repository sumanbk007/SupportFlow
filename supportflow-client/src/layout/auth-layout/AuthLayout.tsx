import { Outlet } from "react-router";
import styles from "./AuthLayout.module.scss";
import AuthBranding from "@features/auth/components/shared/AuthBranding/AuthBranding";

const AuthLayout = () => (
  <div className={styles.root}>
    <div className={styles.left}>
      <Outlet />
    </div>

    <div className={styles.right}>
      <AuthBranding />
    </div>
  </div>
);

export default AuthLayout;
