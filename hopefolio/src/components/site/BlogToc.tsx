"use client";
import React, { useEffect, useState } from "react";

export interface TocEntry {
  slug: string;
  text: string;
  level: 2 | 3;
}

interface BlogTocProps {
  entries: TocEntry[];
}

export default function BlogToc({ entries }: BlogTocProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    if (entries.length === 0) return;
    const elements = entries
      .map((e) => document.getElementById(e.slug))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((o) => o.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <aside
      aria-label="Table of contents"
      className="blog-toc"
      style={{
        position: "sticky",
        top: "5rem",
        alignSelf: "start",
        fontSize: "0.82rem",
        color: "var(--shell-text-soft)",
        maxHeight: "calc(100vh - 8rem)",
        overflowY: "auto",
        paddingLeft: "1rem",
        borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div
        className="eyebrow"
        style={{ marginBottom: "0.9rem", fontSize: "0.7rem" }}
      >
        In this post
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.45rem" }}>
        {entries.map((e) => (
          <li
            key={e.slug}
            style={{ paddingLeft: e.level === 3 ? "0.85rem" : 0 }}
          >
            <a
              href={`#${e.slug}`}
              style={{
                color:
                  activeSlug === e.slug ? "var(--shell-text)" : "var(--shell-text-soft)",
                textDecoration: "none",
                borderLeft:
                  activeSlug === e.slug
                    ? "2px solid rgba(0, 229, 160, 0.75)"
                    : "2px solid transparent",
                paddingLeft: "0.6rem",
                marginLeft: "-0.6rem",
                display: "block",
                lineHeight: 1.45,
                transition: "color 150ms ease, border-color 150ms ease",
              }}
            >
              {e.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
