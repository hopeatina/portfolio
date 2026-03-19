import React from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface ProjectCTAProps {
  demoUrl?: string;
  githubUrl?: string;
  title?: string;
  description?: string;
  note?: string;
  className?: string;
}

export default function ProjectCTA({
  demoUrl,
  githubUrl,
  title = "Inspect the system further",
  description = "Use the live surface or the source as the next level of proof. The goal here is not to end on a marketing flourish, but to make the next inspection step obvious.",
  note,
  className = "",
}: ProjectCTAProps) {
  return (
    <section className={`mt-16 ${className}`}>
      <Card
        variant="glass"
        className="overflow-hidden rounded-[32px] border border-border/30 bg-surface p-0 text-text shadow-[0_32px_100px_-65px_rgba(2,8,23,0.9)]"
      >
        <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_320px]">
          <div className="p-8 md:p-10">
            <div className="text-xs uppercase tracking-[0.18em] text-text-muted">
              Next inspection step
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-text md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted md:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {demoUrl && (
                <Button href={demoUrl} external size="lg" variant="primary">
                  Open live surface
                </Button>
              )}

              {githubUrl && (
                <Button href={githubUrl} external size="lg" variant="secondary">
                  Read the source
                </Button>
              )}
            </div>
          </div>

          <div className="border-t border-border/30 bg-primary/10 p-8 md:border-l md:border-t-0 md:p-10">
            <div className="space-y-4 text-sm leading-6 text-text-muted">
              {demoUrl && (
                <div className="rounded-2xl border border-border/30 bg-primary/10 px-4 py-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-text-muted">
                    Live surface
                  </div>
                  <div className="mt-2 break-all text-text-muted">{demoUrl}</div>
                </div>
              )}

              {githubUrl && (
                <div className="rounded-2xl border border-border/30 bg-primary/10 px-4 py-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-text-muted">
                    Source
                  </div>
                  <div className="mt-2 break-all text-text-muted">
                    {githubUrl}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-border/30 bg-primary/10 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.16em] text-text-muted">
                  Why this matters
                </div>
                <div className="mt-2 text-text-muted">
                  Strong systems work should be inspectable from multiple
                  angles: interface, architecture, and implementation.
                </div>
              </div>

              {note && <div className="pt-2 text-text-muted">{note}</div>}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
