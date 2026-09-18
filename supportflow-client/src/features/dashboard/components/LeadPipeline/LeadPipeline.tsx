import { Icon } from "@ui/icon/Icon";
import { PipelineColumn } from "./components/PipelineColumn/PipelineColumn";
import type { PipelineColumnData } from "../../types/dashboard.types";
import styles from "./leadPipeline.module.scss";

interface LeadPipelineProps {
  columns: PipelineColumnData[];
}

const LeadPipeline = ({ columns }: LeadPipelineProps) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <div>
        <h2 className={styles.title}>Lead Pipeline</h2>
        <p className={styles.subtitle}>Manage candidate progress stages</p>
      </div>
      <button className={styles.viewBoard}>
        View Full Board
        <Icon name="ArrowRight" size="xs" />
      </button>
    </div>

    <div className={styles.columns}>
      {columns.map((column) => (
        <PipelineColumn key={column.id} {...column} />
      ))}
    </div>
  </div>
);

export { LeadPipeline };
