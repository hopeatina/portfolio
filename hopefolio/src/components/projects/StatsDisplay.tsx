import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

interface Stat {
  value: string;
  label: string;
  description?: string;
}

interface StatsDisplayProps {
  stats: Stat[];
  columns?: number;
  className?: string;
  title?: string;
}

export default function StatsDisplay({
  stats,
  columns = 3,
  className = "",
  title,
}: StatsDisplayProps) {
  const { themeProps, theme } = useTheme();

  const getStatColor = (index: number) => {
    const colors = [
      themeProps.colors.primary,
      themeProps.colors.accent,
      themeProps.colors.highlight,
      themeProps.colors.secondary,
    ];
    return colors[index % colors.length];
  };

  return (
    <div
      className={className}
      role="region"
      aria-label={title || "Project statistics"}
    >
      {title && (
        <h3
          className="text-2xl font-bold mb-6 text-center"
          style={{
            color: themeProps.colors.text,
            fontFamily: themeProps.typography.headingFont,
            fontWeight: themeProps.typography.headingWeight,
          }}
        >
          {title}
        </h3>
      )}

      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: `repeat(${Math.min(
            columns,
            4
          )}, minmax(0, 1fr))`,
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center group cursor-default"
            role="article"
            aria-label={`Statistic: ${stat.value} ${stat.label}`}
            tabIndex={0}
          >
            <div
              className="text-4xl font-bold mb-2 transition-all duration-300 group-hover:scale-110 group-focus:scale-110"
              style={{
                color: getStatColor(index),
                fontFamily: themeProps.typography.headingFont,
                fontWeight: themeProps.typography.headingWeight,
                textShadow:
                  theme === "futuristic"
                    ? `0 0 20px ${getStatColor(index)}40`
                    : "none",
              }}
            >
              {stat.value}
            </div>

            <div
              className="text-sm font-medium transition-colors duration-200 group-hover:opacity-80"
              style={{
                color: themeProps.colors.text,
                fontFamily: themeProps.typography.bodyFont,
                opacity: 0.8,
              }}
            >
              {stat.label}
            </div>

            {stat.description && (
              <div
                className="text-xs mt-1 transition-colors duration-200 group-hover:opacity-90"
                style={{
                  color: themeProps.colors.text,
                  fontFamily: themeProps.typography.bodyFont,
                  opacity: 0.6,
                }}
              >
                {stat.description}
              </div>
            )}

            {/* Decorative underline */}
            <div
              className="mx-auto mt-3 h-px w-8 transition-all duration-300 group-hover:w-12 group-focus:w-12"
              style={{
                background: getStatColor(index),
                opacity: 0.4,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
