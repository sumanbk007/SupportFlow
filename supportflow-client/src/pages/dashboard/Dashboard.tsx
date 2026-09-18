import {
  WelcomeHeader,
  StatsGrid,
  LeadPipeline,
  RecentActivity,
  TodaysTasks,
  OverdueTasks,
  MonthlyGoal,
  TeamPerformance,
  STATS_DATA,
  PIPELINE_DATA,
  ACTIVITY_DATA,
  TASKS_DATA,
  OVERDUE_DATA,
  PERFORMANCE_DATA,
} from "@features/dashboard/components";
import styles from "./dashboard.module.scss";
import { Navbar } from "@features/navbar/Navbar";

const DashboardPage = () => (
  <div className={styles.root}>
    <Navbar />
    <WelcomeHeader name="James" date="October 24, 2024" />

    <StatsGrid stats={STATS_DATA} />

    <div className={styles.grid}>
      <div className={styles.main}>
        <LeadPipeline columns={PIPELINE_DATA} />
        <RecentActivity data={ACTIVITY_DATA} />
      </div>

      <div className={styles.side}>
        <TodaysTasks tasks={TASKS_DATA} totalCount={12} />
        <OverdueTasks items={OVERDUE_DATA} urgentCount={6} />
        <MonthlyGoal
          amount="$245,800"
          percentage={72}
          target="$340,000"
          todayIncrease="$12k"
        />
        <TeamPerformance rows={PERFORMANCE_DATA} />
      </div>
    </div>
  </div>
);

export default DashboardPage;
