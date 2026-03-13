"use client";

import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import type { ReviewState } from "@/data/homepage";

interface StateBadgeProps {
  state: ReviewState;
  className?: string;
}

const statePalette: Record<ReviewState, { color: string }> = {
  "Ready for review": {
    color: "#FBBF24",
  },
  "Shipped in production": {
    color: "#34D399",
  },
  "Live tool": {
    color: "#60A5FA",
  },
  Experimental: {
    color: "#CBD5E1",
  },
};

export default function StateBadge({
  state,
  className = "",
}: StateBadgeProps) {
  const { theme } = useTheme();
  const colors = statePalette[state];
  const isDarkTheme =
    theme === "futuristic" || theme === "rice" || theme === "cameroonian";

  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${className}`}
      style={{
        color: isDarkTheme ? colors.color : "var(--color-text)",
        opacity: isDarkTheme ? 1 : 0.72,
      }}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: colors.color }}
      />
      {state}
    </span>
  );
}
