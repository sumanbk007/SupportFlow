import type { LucideIconName } from "@ui/icon/icon.types";

export interface StatCardData {
  id: string;
  label: string;
  value: string;
  icon: LucideIconName;
  trend: number;
  iconBg: "purple" | "green" | "amber" | "blue";
  valueLabel: string;
}

export interface PipelineCardData {
  id: string;
  name: string;
  subtitle: string;
}

export interface PipelineColumnData {
  id: string;
  label: string;
  count: number;
  accent: "default" | "success" | "primary" | "warning";
  cards: PipelineCardData[];
}

export interface ActivityRowData {
  id: string;
  initials: string;
  name: string;
  action: string;
  destination: string;
  status: "verified" | "processing";
  timestamp: string;
}

export interface TaskItemData {
  id: string;
  avatar: string;
  name: string;
  description: string;
  actionIcon: LucideIconName;
}

export interface OverdueItemData {
  id: string;
  title: string;
  meta: string;
}

export interface PerformanceRowData {
  id: string;
  rank: number;
  name: string;
  percentage: number;
}
