import Image from "next/image";
import Link from "next/link";
import React from "react";
import MermaidDiagram from "@/components/projects/MermaidDiagram";
import StatusBadge from "./StatusBadge";
import type { ProjectStatus } from "@/data/portfolio";

export interface CaseStudyFact {
  label: string;
  value: string;
}

export function CaseStudyHero({
  kicker,
  status,
  title,
  subtitle,
  description,
  facts,
  image,
  imageAlt,
}: {
  kicker: string;
  status: ProjectStatus;
  title: string;
  subtitle: string;
  description: string;
  facts: CaseStudyFact[];
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="case-study-hero">
      <div className="case-study-intro">
        <div className="case-study-meta">
          <span className="eyebrow">{kicker}</span>
          <StatusBadge status={status} />
        </div>
        <h1>{title}</h1>
        <p className="case-study-subtitle">{subtitle}</p>
        <p className="case-study-description">{description}</p>
        <div className="case-study-facts">
          {facts.map((fact) => (
            <div key={`${fact.label}-${fact.value}`} className="case-study-fact">
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
      </div>

      {image ? (
        <div className="case-study-hero-visual">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            priority
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="object-cover"
          />
          <div className="work-card-overlay" />
        </div>
      ) : null}
    </section>
  );
}

export function CaseStudySection({
  kicker,
  title,
  children,
  raised = false,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
  raised?: boolean;
}) {
  return (
    <section className={`case-study-section ${raised ? "case-study-section-raised" : ""}`}>
      <div className="case-study-section-head">
        <span className="eyebrow">{kicker}</span>
        <h2>{title}</h2>
      </div>
      <div className="case-study-section-body">{children}</div>
    </section>
  );
}

export function CaseStudySplit({
  children,
  media,
}: {
  children: React.ReactNode;
  media: React.ReactNode;
}) {
  return (
    <div className="case-study-split">
      <div className="case-study-prose">{children}</div>
      <div>{media}</div>
    </div>
  );
}

export function VisualFrame({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="visual-frame">
      <div className="visual-frame-media">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 1100px, 100vw"
          className="object-cover"
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function DiagramFrame({
  title,
  description,
  diagram,
}: {
  title: string;
  description: string;
  diagram: string;
}) {
  return (
    <div className="visual-frame visual-frame-diagram">
      <MermaidDiagram title={title} description={description} diagram={diagram} />
    </div>
  );
}

export function BuildSurface({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <section className="build-surface">
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="build-surface-item">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </section>
  );
}

export function CalloutList({ items }: { items: string[] }) {
  return (
    <ul className="callout-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function TerminalPanel({
  lines,
  label,
}: {
  lines: string[];
  label: string;
}) {
  return (
    <div className="terminal-panel">
      <div className="terminal-top">
        <span />
        <span />
        <span />
        <p>{label}</p>
      </div>
      <pre>
        <code>{lines.join("\n")}</code>
      </pre>
    </div>
  );
}

export function CaseStudyEndcap({
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  shellLine,
}: {
  title: string;
  body: React.ReactNode;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  shellLine?: string;
}) {
  const primaryIsExternal = primaryHref.startsWith("http");
  const secondaryIsExternal = secondaryHref.startsWith("http");

  return (
    <section className="case-study-endcap">
      <div>
        <h2>{title}</h2>
        <div className="case-study-endcap-body">{body}</div>
        {shellLine ? <pre className="case-study-command">{shellLine}</pre> : null}
      </div>
      <div className="case-study-endcap-actions">
        {primaryIsExternal ? (
          <a
            href={primaryHref}
            target="_blank"
            rel="noreferrer"
            className="site-button site-button-primary"
          >
            {primaryLabel}
          </a>
        ) : (
          <Link href={primaryHref} className="site-button site-button-primary">
            {primaryLabel}
          </Link>
        )}
        {secondaryIsExternal ? (
          <a
            href={secondaryHref}
            target="_blank"
            rel="noreferrer"
            className="site-button site-button-secondary"
          >
            {secondaryLabel}
          </a>
        ) : (
          <Link href={secondaryHref} className="site-button site-button-secondary">
            {secondaryLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
