import { Button } from "@ui/button/Button";
import { Icon } from "@ui/icon/Icon";
import styles from "./socialLogin.module.scss";

const SocialLogin = () => (
  <div className={styles.root}>
    <div className={styles.divider}>
      <span className={styles.dividerLine} />
      <span className={styles.dividerText}>Or continue with</span>
      <span className={styles.dividerLine} />
    </div>

    <div className={styles.buttons}>
      <Button
        variant="outline"
        fullWidth
        leftIcon={<Icon name="EthernetPort" />}
      >
        Google
      </Button>
      <Button variant="outline" fullWidth leftIcon={<Icon name="LayoutGrid" />}>
        Azure AD
      </Button>
    </div>
  </div>
);

export { SocialLogin };
