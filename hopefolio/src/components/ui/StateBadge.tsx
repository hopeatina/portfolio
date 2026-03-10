"use client";

import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import type { ReviewState } from "@/data/homepage";

interface StateBadgeProps {
  state: ReviewState;
  className?: string;
}

const statePalette: Record<
  ReviewState,
  { background: string; border: string; color: string }
> = {
  "Ready for review": {
    background: "rgba(245, 158, 11, 0.14)",
    border: "rgba(245, 158, 11, 0.4)",
    color: "#FBBF24",
  },
  "Shipped in production": {
    background: "rgba(16, 185, 129, 0.14)",
    border: "rgba(16, 185, 129, 0.38)",
    color: "#34D399",
  },
  "Live tool": {
    background: "rgba(59, 130, 246, 0.14)",
    border: "rgba(59, 130, 246, 0.38)",
    color: "#60A5FA",
  },
  Experimental: {
    background: "rgba(148, 163, 184, 0.14)",
    border: "rgba(148, 163, 184, 0.35)",
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
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-[0.14em] uppercase ${className}`}
      style={{
        background: isDarkTheme ? colors.background : "rgba(255, 255, 255, 0.78)",
        border: `1px solid ${colors.border}`,
        color: isDarkTheme ? colors.color : "var(--color-text)",
        boxShadow: isDarkTheme ? "none" : "0 8px 20px rgba(15, 23, 42, 0.06)",
        backdropFilter: "blur(10px)",
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
