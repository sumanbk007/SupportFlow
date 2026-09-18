import authBanner from "../../../../../assets/authBanner.png";

import styles from "./authBranding.module.scss";

const AuthBranding = () => {
  return (
    // <aside className={styles.root}>
    <div className={styles.content}>
      <div className={styles.logo}>
        <span className={styles.logoMark}>
          <span />
          <span />
        </span>

        <span>SupportFlow</span>
      </div>

      <div className={styles.copy}>
        <h1 className={styles.title}>
          Support that keeps
          <br />
          moving.
        </h1>

        <p className={styles.description}>
          Manage customer problems from the first message
          <br />
          to final resolution — all in one place.
        </p>
      </div>

      <div className={styles.preview}>
        <div className={styles.previewWindow}>
          <img src={authBanner} alt="SupportFlow platform preview" />
        </div>
      </div>
    </div>
    // </aside>
  );
};

export default AuthBranding;
