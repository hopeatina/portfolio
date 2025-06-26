import React from "react";
import MetricsCounter from "@/components/interactive/MetricsCounter";

interface Stat {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  description?: string;
}

interface StatsDisplayProps {
  title?: string;
  stats: Stat[];
  className?: string;
}

export default function StatsDisplay({
  title,
  stats,
  className = "",
}: StatsDisplayProps) {
  // Convert stats to metrics format for MetricsCounter
  const metrics = stats.map((stat) => {
    // Extract numeric value from string if needed
    let numericValue = typeof stat.value === "number" ? stat.value : 0;
    let decimals = 0;

    if (typeof stat.value === "string") {
      const match = stat.value.match(/^([\d.]+)/);
      if (match) {
        numericValue = parseFloat(match[1]);
        decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
      }
    }

    return {
      label: stat.label,
      value: numericValue,
      prefix: stat.prefix,
      suffix:
        stat.suffix ||
        (typeof stat.value === "string"
          ? stat.value.replace(/^[\d.]+/, "")
          : ""),
      description: stat.description,
      decimals,
    };
  });

  return (
    <div className={className}>
      {title && (
        <h3 className="text-2xl font-semibold text-heading mb-6">{title}</h3>
      )}
      <MetricsCounter metrics={metrics} duration={2500} />
    </div>
  );
}
