import type {
  StatCardData,
  PipelineColumnData,
  ActivityRowData,
  TaskItemData,
  OverdueItemData,
  PerformanceRowData,
} from "../types/dashboard.types";

export const STATS_DATA: StatCardData[] = [
  {
    id: "open",
    label: "Open Tickets",
    value: "1,284",
    icon: "Hourglass",
    trend: 12,
    iconBg: "purple",
    valueLabel: "awaiting agents review",
  },
  {
    id: "inProgress",
    label: "In Progress",
    value: "456",
    icon: "RefreshCcw",
    trend: 5.2,
    iconBg: "green",
    valueLabel: "actively being solved",
  },
  {
    id: "resolved",
    label: "Resolved this month",
    value: "89%",
    icon: "CircleCheck",
    trend: -2,
    iconBg: "amber",
    valueLabel: "100% resolutions",
  },
];

export const PIPELINE_DATA: PipelineColumnData[] = [
  {
    id: "discovery",
    label: "Discovery",
    count: 12,
    accent: "default",
    cards: [
      {
        id: "1",
        name: "Sarah Jenkins",
        subtitle: "Masters in Computer Science",
      },
      { id: "2", name: "Liam O'Connor", subtitle: "MBA Finance" },
    ],
  },
  {
    id: "documents",
    label: "Documents",
    count: 8,
    accent: "success",
    cards: [{ id: "3", name: "Mei Lin", subtitle: "PhD Engineering" }],
  },
  {
    id: "applied",
    label: "Applied",
    count: 15,
    accent: "primary",
    cards: [
      { id: "4", name: "Carlos Ruiz", subtitle: "BSc Nursing" },
      { id: "5", name: "Amara Okafor", subtitle: "BA Architecture" },
    ],
  },
  {
    id: "decision",
    label: "Decision",
    count: 4,
    accent: "warning",
    cards: [{ id: "6", name: "Ivan Petrov", subtitle: "LLM Int. Law" }],
  },
];

export const ACTIVITY_DATA: ActivityRowData[] = [
  {
    id: "1",
    initials: "SJ",
    name: "Sarah Jenkins",
    action: "IELTS Score Uploaded",
    destination: "United Kingdom",
    status: "verified",
    timestamp: "Today, 10:45 AM",
  },
  {
    id: "2",
    initials: "ML",
    name: "Mei Lin",
    action: "Offer Letter Received",
    destination: "Australia",
    status: "processing",
    timestamp: "Today, 09:12 AM",
  },
];

export const TASKS_DATA: TaskItemData[] = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/100?img=5",
    name: "Sarah Jenkins",
    description: "Phone Call at 14:30",
    actionIcon: "Phone",
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/100?img=12",
    name: "Amara Okafor",
    description: "Email Follow-up",
    actionIcon: "Mail",
  },
];

export const OVERDUE_DATA: OverdueItemData[] = [
  {
    id: "1",
    title: "Review Portfolio - Mei Lin",
    meta: "2 days late • James W.",
  },
  { id: "2", title: "Visa Subm. - Carlos Ruiz", meta: "Yesterday • Sarah K." },
];

export const PERFORMANCE_DATA: PerformanceRowData[] = [
  { id: "1", rank: 1, name: "James Wilson", percentage: 98 },
  { id: "2", rank: 2, name: "Sarah Klein", percentage: 85 },
];
