import React from "react";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import baseStyles from "@/styles/themes/base-theme.module.css";
import cameroonianStyles from "@/styles/themes/cameroonian-theme.module.css";
import riceStyles from "@/styles/themes/rice-theme.module.css";
import futuristicStyles from "@/styles/themes/futuristic-theme.module.css";

interface CardProps {
  title?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  href?: string;
  external?: boolean;
  variant?: "default" | "elevated" | "glass" | "outline";
  hoverable?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const cx = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ");

export default function Card({
  title,
  description,
  image,
  href,
  external = false,
  variant = "default",
  hoverable = true,
  children,
  className = "",
  onClick,
  padding = "md",
  hover = true,
}: CardProps) {
  const variantClasses = {
    default: "card",
    elevated: "card elevation-md",
    glass: "card glass",
    outline: "bg-transparent border-2 border-border rounded-lg p-6",
  };

  const classes = cx(
    variantClasses[variant],
    padding !== "md" && `card-${padding}`,
    (href || onClick) && hover && "card-interactive",
    className
  );

  const content = (
    <>
      {image && (
        <div className="relative mb-4 -mx-6 -mt-6">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </div>
      )}

      {title && (
        <h3 className="mb-2">
          {href ? (
            <span className="hover:text-primary transition-colors">
              {title}
            </span>
          ) : (
            title
          )}
        </h3>
      )}

      {description && <p className="text-muted mb-4">{description}</p>}

      {children}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div
        className={classes}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {content}
      </div>
    );
  }

  return <div className={classes}>{content}</div>;
}

// Feature Card variant
export function FeatureCard({
  icon,
  title,
  description,
  href,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}) {
  const content = (
    <>
      <div className="feature-card-icon">{icon}</div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
      {href && <span className="feature-card-link">Learn more →</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cx("feature-card", className)}>
        {content}
      </Link>
    );
  }

  return <div className={cx("feature-card", className)}>{content}</div>;
}

// Stat Card variant
export function StatCard({
  value,
  label,
  trend,
  className = "",
}: {
  value: string | number;
  label: string;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  className?: string;
}) {
  return (
    <Card variant="glass" className={cx("stat-card", className)}>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
      {trend && (
        <div
          className={cx(
            "stat-card-trend",
            trend.direction === "up" ? "text-accent" : "text-error"
          )}
        >
          <span>{trend.direction === "up" ? "↑" : "↓"}</span>
          <span>{Math.abs(trend.value)}%</span>
        </div>
      )}
    </Card>
  );
}
