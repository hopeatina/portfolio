import React from "react";
import styles from "@/styles/themes/base-theme.module.css";

interface QuoteProps {
  text: string;
  attribution?: string;
  className?: string;
  showBackground?: boolean;
}

export default function Quote({
  text,
  attribution,
  className = "",
  showBackground = true,
}: QuoteProps) {
  const QuoteContent = () => (
    <blockquote className={`max-w-2xl mx-auto text-center ${styles.fadeUp}`}>
      <p
        className="text-xl md:text-3xl font-light italic leading-relaxed"
        style={{
          color: "var(--text)",
          fontFamily: "var(--font-heading)",
        }}
      >
        "{text}"
        {attribution && (
          <span
            className="block mt-1 text-lg md:text-xl"
            style={{ opacity: 0.9 }}
          >
            {attribution}
          </span>
        )}
      </p>
    </blockquote>
  );

  if (!showBackground) {
    return <QuoteContent />;
  }

  return (
    <div className={`${styles.heroBackground} relative ${className}`}>
      <div className={`${styles.container} py-10 md:py-16 relative z-10`}>
        <QuoteContent />
      </div>
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          background: "var(--cosmic-swirl), var(--starry-pattern)",
          backgroundBlendMode: "overlay",
        }}
      />
    </div>
  );
}
