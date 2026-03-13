import React from "react";
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
  title = "Build surface",
  className = "",
}: TechStackProps) {
  return (
    <ProjectCard
      title={title}
      variant="secondary"
      className={`mb-8 ${className}`}
      role="region"
      ariaLabel="Technology stack information"
    >
      <div className="mb-6 max-w-3xl text-sm leading-6 text-white/62">
        The implementation surface for this system. These are the layers that
        mattered in practice, not a generic skills wall.
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            role="listitem"
          >
            <div className="text-xs uppercase tracking-[0.16em] text-white/42">
              {item.category}
            </div>
            <div className="mt-2 text-sm leading-6 text-white/78">
              {item.technologies}
            </div>
          </div>
        ))}
      </div>
    </ProjectCard>
  );
}
