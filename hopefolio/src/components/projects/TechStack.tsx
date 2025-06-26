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
  const { theme } = useTheme();

  return (
    <ProjectCard
      title={title}
      variant="default"
      className={`mb-8 ${className}`}
      role="region"
      ariaLabel="Technology stack information"
    >
      <div
        className={`grid gap-4 text-sm`}
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="group" role="listitem">
            <div className="font-semibold mb-1 text-primary">
              {item.category}:
            </div>
            <div className="text-body-secondary">{item.technologies}</div>
          </div>
        ))}
      </div>
    </ProjectCard>
  );
}
