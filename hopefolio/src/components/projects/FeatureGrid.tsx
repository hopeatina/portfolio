import React from "react";
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
  const getVariantByIndex = (index: number) => {
    const variants = ["accent", "secondary", "highlight", "default"] as const;
    return variants[index % variants.length];
  };

  return (
    <div
      className={`grid gap-6 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${Math.min(columns, 3)}, minmax(0, 1fr))`,
      }}
    >
      {features.map((feature, index) => (
        <ProjectCard
          key={index}
          title={feature.title}
          variant={getVariantByIndex(index)}
          className="h-full"
        >
          <div className="space-y-3">
            {feature.description && (
              <p className="text-body-secondary leading-relaxed">
                {feature.description}
              </p>
            )}

            {feature.items && feature.items.length > 0 && (
              <ul className="space-y-2 list-none">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 group">
                    <span
                      className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary opacity-60 transition-transform group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <span className="text-body text-sm">{item}</span>
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
