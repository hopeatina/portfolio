import React from "react";
import Image from "next/image";
import Tag from "@/components/ui/Tag";

interface ProjectFact {
  label: string;
  value: string;
  detail?: string;
}

interface ArtifactPanel {
  title: string;
  items: string[];
  footer?: string;
}

interface ProjectHeroProps {
  title: string;
  description: string;
  tags?: string[];
  eyebrow?: string;
  facts?: ProjectFact[];
  image?: string;
  artifactLabel?: string;
  artifactCaption?: string;
  artifactPanel?: ArtifactPanel;
}

export default function ProjectHero({
  title,
  description,
  tags = [],
  eyebrow = "Flagship case study",
  facts = [],
  image,
  artifactLabel,
  artifactCaption,
  artifactPanel,
}: ProjectHeroProps) {
  return (
    <section className="mb-18">
      <div className="overflow-hidden rounded-[32px] border border-border/30 bg-surface text-text shadow-[0_35px_120px_-65px_rgba(2,8,23,0.9)]">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.12fr)_370px]">
          <div className="p-8 md:p-10 lg:p-12">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-text-muted">
              <span className="font-medium uppercase tracking-[0.22em]">
                {eyebrow}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
              <span className="text-text-muted">review surface</span>
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-text-muted md:text-xl">
              {description}
            </p>

            {facts.length > 0 && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {facts.map((fact) => (
                  <div
                    key={`${fact.label}-${fact.value}`}
                    className="rounded-2xl border border-border/30 bg-primary/10 px-4 py-4"
                  >
                    <div className="text-xs uppercase tracking-[0.16em] text-text-muted">
                      {fact.label}
                    </div>
                    <div className="mt-2 text-xl font-semibold tracking-[-0.03em] text-text">
                      {fact.value}
                    </div>
                    {fact.detail && (
                      <div className="mt-2 text-sm leading-6 text-text-muted">
                        {fact.detail}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    size="sm"
                    className="border-border/30 bg-primary/10 text-text-muted"
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-border/30 bg-background p-6 md:p-8 lg:border-l lg:border-t-0">
            {artifactPanel ? (
              <div className="flex h-full flex-col rounded-[28px] border border-border/30 bg-surface p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="text-xs uppercase tracking-[0.18em] text-text-muted">
                  inspection panel
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-text">
                  {artifactPanel.title}
                </h2>
                <div className="mt-6 space-y-3">
                  {artifactPanel.items.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex items-start gap-4 rounded-2xl border border-border/30 bg-primary/10 px-4 py-4"
                    >
                      <div className="mt-0.5 text-xs font-medium tracking-[0.14em] text-text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="text-sm leading-6 text-text-muted">
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
                {artifactPanel.footer && (
                  <div className="mt-auto pt-6 text-sm leading-6 text-text-muted">
                    {artifactPanel.footer}
                  </div>
                )}
              </div>
            ) : image ? (
              <div className="flex h-full flex-col">
                {artifactLabel && (
                  <div className="mb-3 text-xs uppercase tracking-[0.18em] text-text-muted">
                    {artifactLabel}
                  </div>
                )}
                <div className="relative overflow-hidden rounded-[28px] border border-border/30 bg-surface aspect-[4/3]">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 370px, 100vw"
                    className="object-cover"
                  />
                </div>
                {artifactCaption && (
                  <p className="mt-4 text-sm leading-6 text-text-muted">
                    {artifactCaption}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex h-full items-end rounded-[28px] border border-dashed border-border/30 bg-surface p-6">
                <p className="text-sm leading-6 text-text-muted">
                  This case study is presented as a systems review:
                  architectural decisions, operational constraints, and proof of
                  what shipped.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
