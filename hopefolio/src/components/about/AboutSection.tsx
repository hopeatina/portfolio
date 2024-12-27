import React from "react";
import styles from "@/styles/themes/base-theme.module.css";

interface AboutSectionProps {
  title: string;
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export default function AboutSection({
  title,
  children,
  accent = false,
  className = "",
}: AboutSectionProps) {
  return (
    <section className={`${className} ${accent ? styles.surface : ""}`}>
      <h2
        className={`text-3xl font-bold mb-8 ${styles.gradientText}`}
        style={{
          fontFamily: "var(--font-heading)",
          letterSpacing: "var(--letter-spacing-heading)",
          lineHeight: "var(--line-height-heading)",
        }}
      >
        {title}
      </h2>
      <div
        className={`${styles.bodyLarge} ${accent ? "bg-accent/5" : ""}`}
        style={{
          color: "var(--text)",
          fontFamily: "var(--font-body)",
          lineHeight: "var(--line-height-body)",
        }}
      >
        {children}
      </div>
    </section>
  );
}
