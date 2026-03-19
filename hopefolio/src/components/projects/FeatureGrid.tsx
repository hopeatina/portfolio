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

  if (columns === 1) {
    return (
      <div
        className={`overflow-hidden rounded-[32px] border border-border bg-[var(--card-bg)] shadow-[0_24px_80px_-56px_rgba(15,23,42,0.28)] ${className}`}
      >
        {features.map((feature, index) => (
          <article
            key={index}
            className="grid gap-6 border-t border-border px-6 py-6 first:border-t-0 md:grid-cols-[220px_minmax(0,1fr)] md:px-8"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-body-secondary">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-heading">
                {feature.title}
              </h3>
            </div>

            <div className="space-y-4">
              {feature.description && (
                <p className="leading-7 text-body-secondary">
                  {feature.description}
                </p>
              )}

              {feature.items && feature.items.length > 0 && (
                <ul className="space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary opacity-65"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-6 text-body">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${Math.min(columns, 3)}, minmax(0, 1fr))`,
      }}
    >
      {features.map((feature, index) => {
        const variant = getVariantByIndex(index);

        return (
          <ProjectCard
            key={index}
            title={feature.title}
            variant={variant}
            className="h-full"
          >
            <div className="space-y-3">
              {feature.description && (
                <p
                  className={`leading-relaxed ${
                    variant === "secondary"
                      ? "text-text-muted"
                      : "text-body-secondary"
                  }`}
                >
                  {feature.description}
                </p>
              )}

              {feature.items && feature.items.length > 0 && (
                <ul className="space-y-2 list-none">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <span
                        className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary opacity-60"
                        aria-hidden="true"
                      />
                      <span
                        className={`text-sm leading-6 ${
                          variant === "secondary"
                            ? "text-text-muted"
                            : "text-body"
                        }`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ProjectCard>
        );
      })}
    </div>
  );
}
