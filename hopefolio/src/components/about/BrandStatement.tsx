import React from "react";
import styles from "@/styles/themes/base-theme.module.css";

interface BrandStatementProps {
  className?: string;
}

export default function BrandStatement({
  className = "",
}: BrandStatementProps) {
  return (
    <section
      className={`${styles.card} p-8 rounded-lg ${className}`}
      style={{
        background: "var(--card-bg)",
        boxShadow: "var(--box-shadow-card)",
        border: "1px solid var(--icon-border)",
      }}
    >
      <h2
        className={`text-3xl font-bold mb-6 ${styles.gradientText}`}
        style={{
          fontFamily: "var(--font-heading)",
          letterSpacing: "var(--letter-spacing-heading)",
          lineHeight: "var(--line-height-heading)",
        }}
      >
        Brand Statement
      </h2>
      <div
        className={styles.bodyLarge}
        style={{
          color: "var(--text)",
          fontFamily: "var(--font-body)",
          lineHeight: "var(--line-height-body)",
        }}
      >
        <p className="mb-4">
          I am a software engineer who believes in the power of technology to
          create positive change. My unique perspective comes from bridging
          different worlds: Cameroon and America, engineering and art, tradition
          and innovation.
        </p>
        <p>
          Through my work, I aim to build solutions that not only solve
          technical challenges but also empower communities and inspire others
          to dream bigger.
        </p>
      </div>
    </section>
  );
}
