// import { Table } from "@ui/table";
// import type { TableColumn } from "@ui/table";
import type { ActivityRowData } from "../../types/dashboard.types";
import styles from "./recentActivity.module.scss";

interface RecentActivityProps {
  data: ActivityRowData[];
}

const RecentActivity = ({ data }: RecentActivityProps) => {
  //   const columns: <ActivityRowData>[] = [
  //     {
  //       key: "name",
  //       header: "Lead Name",
  //       render: (row) => (
  //         <div className={styles.nameCell}>
  //           <div className={styles.avatar}>{row.initials}</div>
  //           <span className={styles.nameText}>{row.name}</span>
  //         </div>
  //       ),
  //     },
  //     { key: "action", header: "Action Taken", render: (row) => row.action },
  //     {
  //       key: "destination",
  //       header: "Destination",
  //       render: (row) => row.destination,
  //     },
  //     {
  //       key: "status",
  //       header: "Status",
  //       render: (row) => (
  //         <span className={`${styles.status} ${styles[`status--${row.status}`]}`}>
  //           {row.status === "verified" ? "Verified" : "Processing"}
  //         </span>
  //       ),
  //     },
  //     { key: "timestamp", header: "Timestamp", render: (row) => row.timestamp },
  //   ];

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Global Activity</h2>
        <div className={styles.actions}>
          <button className={styles.btn}>Filter</button>
          <button className={styles.btn}>Export CSV</button>
        </div>
      </div>

      {/* <Table columns={columns} data={data} rowKey={(row) => row.id} /> */}
    </div>
  );
};

export { RecentActivity };
