import Link from "next/link";
import React from "react";

interface NextProjectNavProps {
  currentSlug: string;
}

const CHAIN = [
  { slug: "orgx", title: "OrgX", label: "Flagship — agent platform" },
  { slug: "alma", title: "Alma", label: "Production AI in HIPAA" },
  { slug: "perfpulse", title: "PerfPulse", label: "Rust developer tool" },
  { slug: "openclaw", title: "OpenClaw", label: "Plugin architecture" },
];

export default function NextProjectNav({ currentSlug }: NextProjectNavProps) {
  const idx = CHAIN.findIndex((c) => c.slug === currentSlug);
  if (idx === -1) return null;
  const prev = CHAIN[(idx - 1 + CHAIN.length) % CHAIN.length];
  const next = CHAIN[(idx + 1) % CHAIN.length];

  return (
    <nav
      aria-label="Case study navigation"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: "1.25rem",
        padding: "1.5rem 1.75rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: "14px",
        background: "rgba(255, 255, 255, 0.015)",
      }}
      className="next-project-nav"
    >
      <Link
        href={`/projects/${prev.slug}`}
        style={{
          display: "grid",
          gap: "0.25rem",
          textDecoration: "none",
          color: "inherit",
          textAlign: "left",
        }}
      >
        <span
          className="eyebrow"
          style={{ fontSize: "0.7rem", color: "var(--shell-muted)" }}
        >
          ← Previous
        </span>
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          {prev.title}
        </span>
        <span
          style={{
            fontSize: "0.8rem",
            color: "var(--shell-text-soft)",
          }}
        >
          {prev.label}
        </span>
      </Link>

      <Link
        href="/projects"
        className="site-link-inline"
        style={{
          fontSize: "0.8rem",
          color: "var(--shell-muted)",
          whiteSpace: "nowrap",
        }}
      >
        All work ↗
      </Link>

      <Link
        href={`/projects/${next.slug}`}
        style={{
          display: "grid",
          gap: "0.25rem",
          textDecoration: "none",
          color: "inherit",
          textAlign: "right",
          justifyItems: "end",
        }}
      >
        <span
          className="eyebrow"
          style={{ fontSize: "0.7rem", color: "var(--shell-muted)" }}
        >
          Next →
        </span>
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          {next.title}
        </span>
        <span
          style={{
            fontSize: "0.8rem",
            color: "var(--shell-text-soft)",
          }}
        >
          {next.label}
        </span>
      </Link>
    </nav>
  );
}
