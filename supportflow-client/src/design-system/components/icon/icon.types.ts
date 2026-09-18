import * as LucideIcons from "lucide-react";

export type IconSize = "sm" | "md" | "lg";

export interface IconProps {
  name: keyof typeof LucideIcons;

  size?: IconSize;

  className?: string;
  color?: string;
}
