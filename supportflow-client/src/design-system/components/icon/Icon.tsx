import * as LucideIcons from "lucide-react";

import clsx from "clsx";

import "./icon.scss";

import type { IconProps } from "./icon.types";

export const Icon = ({ name, size = "md", color, className }: IconProps) => {
  const LucideIcon = LucideIcons[name];

  const sizeMap = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  if (!LucideIcon) {
    return null;
  }

  return (
    <span className={clsx("ds-icon", className)}>
      <LucideIcon size={sizeMap[size]} color={color || "currentColor"} />
    </span>
  );
};
