import React from "react";
import type { ProjectStatus } from "@/data/portfolio";

interface StatusBadgeProps {
  status: ProjectStatus;
}

const badgeClassMap: Record<ProjectStatus, string> = {
  "Shipped in production": "site-badge site-badge-shipped",
  "Live tool": "site-badge site-badge-live",
  Experimental: "site-badge site-badge-experimental",
  "Ready for review": "site-badge site-badge-review",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={badgeClassMap[status]}>{status}</span>;
}

