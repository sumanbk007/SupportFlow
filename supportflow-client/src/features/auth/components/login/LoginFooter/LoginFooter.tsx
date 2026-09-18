import { Link } from "react-router";
import { ROUTES } from "@router/constants.routes";
import styles from "./loginFooter.module.scss";

const LoginFooter = () => (
  <div className={styles.root}>
    <p className={styles.signup}>
      Don't have an account?{" "}
      <Link to={ROUTES.REGISTER} className={styles.link}>
        Sign up for Company Setup
      </Link>
    </p>
  </div>
);

export { LoginFooter };
