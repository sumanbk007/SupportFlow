import { StatCard } from "../StatCard/StatCard";
import type { StatCardData } from "../../types/dashboard.types";

interface StatsGridProps {
  stats: StatCardData[];
}

const StatsGrid = ({ stats }: StatsGridProps) => (
  <div className="grid grid-cols-3 gap-4">
    {stats.map((stat) => (
      <StatCard key={stat.id} {...stat} />
    ))}
  </div>
);

export { StatsGrid };
