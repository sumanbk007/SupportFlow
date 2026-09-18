import { PipelineCard } from "../PipelineCard/PipelineCard";
import type { PipelineColumnData } from "../../../../types/dashboard.types";
import styles from "./pipelineColumn.module.scss";

const PipelineColumn = ({
  label,
  count,
  accent,
  cards,
}: PipelineColumnData) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <span className={`${styles.label} ${styles[`label--${accent}`]}`}>
        {label.toUpperCase()}
      </span>
      <span className={styles.count}>{count}</span>
    </div>

    <div className={styles.cards}>
      {cards.map((card) => (
        <div
          key={card.id}
          className={`${styles.cardWrapper} ${styles[`cardWrapper--${accent}`]}`}
        >
          <PipelineCard {...card} />
        </div>
      ))}
    </div>
  </div>
);

export { PipelineColumn };
