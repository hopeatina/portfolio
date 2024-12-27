"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import styles from "@/styles/themes/base-theme.module.css";

interface BlogPostCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category?: string;
}

export default function BlogPostCard({
  slug,
  title,
  date,
  excerpt,
  category,
}: BlogPostCardProps) {
  const { theme, getThemeStyles } = useTheme();
  const themeStyles = getThemeStyles();

  return (
    <Link href={`/blog/${slug}`}>
      <Card
        className={`group cursor-pointer ${styles.card} ${styles.cardHover}`}
        style={{
          background: "var(--card-bg)",
          boxShadow: "var(--box-shadow-card)",
          border: "1px solid var(--icon-border)",
        }}
      >
        {category && (
          <div className="mb-4">
            <Tag variant="default" size="sm">
              {category}
            </Tag>
          </div>
        )}

        <h2
          className={`text-2xl mb-2 ${styles.headingH3}`}
          style={{ color: "var(--text-on-light)" }}
        >
          {title}
        </h2>

        <time
          className="text-sm block mb-4"
          style={{ color: "var(--text-muted-on-light)" }}
        >
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <p
          className={styles.body}
          style={{ color: "var(--text-muted-on-light)" }}
        >
          {excerpt}
        </p>

        <div className="mt-4">
          <Tag variant="muted" size="sm">
            Read More →
          </Tag>
        </div>
      </Card>
    </Link>
  );
}
