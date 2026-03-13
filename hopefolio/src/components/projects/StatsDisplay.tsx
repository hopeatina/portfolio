import React from "react";

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
  return (
    <div className={className}>
      {title && (
        <h3 className="mb-6 text-2xl font-semibold tracking-[-0.03em] text-heading">
          {title}
        </h3>
      )}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={`${stat.label}-${stat.value}`}
            className="rounded-[28px] border border-border bg-[var(--card-bg)] px-6 py-5 shadow-[0_22px_60px_-46px_rgba(15,23,42,0.24)]"
          >
            <div className="text-xs uppercase tracking-[0.18em] text-body-secondary">
              {stat.label}
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-heading">
              {stat.prefix}
              {stat.value}
              {stat.suffix}
            </div>
            {stat.description && (
              <div className="mt-3 text-sm leading-6 text-body-secondary">
                {stat.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
