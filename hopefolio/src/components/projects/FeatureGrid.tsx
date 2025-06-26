import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import ProjectCard from "./ProjectCard";

interface Feature {
  title: string;
  description: string;
  items?: string[];
  icon?: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: number;
  className?: string;
}

export default function FeatureGrid({
  features,
  columns = 2,
  className = "",
}: FeatureGridProps) {
  const { themeProps, theme } = useTheme();

  const getVariantByIndex = (index: number) => {
    const variants = ["accent", "secondary", "highlight", "default"] as const;
    return variants[index % variants.length];
  };

  const getAccessibleTitle = (title: string, icon?: string) => {
    if (icon) {
      // Remove emoji from title for screen readers
      const cleanTitle = title
        .replace(
          /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
          ""
        )
        .trim();
      return cleanTitle;
    }
    return title;
  };

  return (
    <div
      className={`grid gap-6 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${Math.min(columns, 3)}, minmax(0, 1fr))`,
      }}
      role="region"
      aria-label="Project features"
    >
      {features.map((feature, index) => (
        <ProjectCard
          key={index}
          title={feature.title}
          variant={getVariantByIndex(index)}
          className="h-fit"
          role="article"
          ariaLabel={`Feature: ${getAccessibleTitle(
            feature.title,
            feature.icon
          )}`}
        >
          <div className="space-y-3">
            {feature.description && (
              <p
                className="leading-relaxed"
                style={{
                  color: themeProps.colors.text,
                  fontFamily: themeProps.typography.bodyFont,
                  lineHeight: themeProps.typography.lineHeight,
                }}
              >
                {feature.description}
              </p>
            )}

            {feature.items && feature.items.length > 0 && (
              <ul
                className="space-y-2 list-none"
                role="list"
                aria-label={`${getAccessibleTitle(feature.title)} details`}
              >
                {feature.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-2 group"
                    role="listitem"
                  >
                    <span
                      className="flex-shrink-0 w-2 h-2 rounded-full mt-2 transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: themeProps.colors.primary,
                        opacity: 0.6,
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="transition-colors duration-200 group-hover:opacity-90"
                      style={{
                        color: themeProps.colors.text,
                        fontFamily: themeProps.typography.bodyFont,
                        fontSize: "0.9rem",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ProjectCard>
      ))}
    </div>
  );
}
