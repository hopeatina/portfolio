import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import ProjectCard from "./ProjectCard";

interface TechStackItem {
  category: string;
  technologies: string;
}

interface TechStackProps {
  items: TechStackItem[];
  title?: string;
  columns?: number;
  className?: string;
}

export default function TechStack({
  items,
  title = "🔧 Tech Stack",
  columns = 4,
  className = "",
}: TechStackProps) {
  const { themeProps } = useTheme();

  return (
    <ProjectCard
      title={title}
      variant="default"
      className={`mb-8 ${className}`}
      role="region"
      ariaLabel="Technology stack information"
    >
      <div
        className={`grid grid-cols-2 gap-4 text-sm`}
        style={{
          gridTemplateColumns: `repeat(${Math.min(
            columns,
            4
          )}, minmax(0, 1fr))`,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="group" role="listitem">
            <div
              className="font-semibold mb-1 transition-colors duration-200 group-hover:opacity-80"
              style={{
                color: themeProps.colors.primary,
                fontFamily: themeProps.typography.headingFont,
                fontSize: "0.9rem",
              }}
            >
              {item.category}:
            </div>
            <div
              className="transition-colors duration-200 group-hover:opacity-90"
              style={{
                color: themeProps.colors.text,
                fontFamily: themeProps.typography.bodyFont,
                opacity: 0.9,
              }}
            >
              {item.technologies}
            </div>
          </div>
        ))}
      </div>
    </ProjectCard>
  );
}
