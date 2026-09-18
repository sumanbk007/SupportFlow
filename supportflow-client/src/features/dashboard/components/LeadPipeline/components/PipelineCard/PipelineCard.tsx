import type { PipelineCardData } from "../../../../types/dashboard.types";
import styles from "./pipelineCard.module.scss";

const PipelineCard = ({ name, subtitle }: PipelineCardData) => (
  <div className={styles.root}>
    <p className={styles.name}>{name}</p>
    <p className={styles.subtitle}>{subtitle}</p>
  </div>
);

export { PipelineCard };
