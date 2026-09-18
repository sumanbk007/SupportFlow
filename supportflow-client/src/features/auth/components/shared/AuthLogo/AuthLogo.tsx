import styles from "./authLogo.module.scss";
import { Icon } from "@ui/icon/Icon";

interface AuthLogoProps {
  tagline: string;
  title: string;
}

const AuthLogo = ({ tagline, title }: AuthLogoProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.brand}>
        <span className={styles.name}>{title}</span>
      </div>
      <p className={styles.tagline}>{tagline}</p>
    </div>
  );
};

export default AuthLogo;
