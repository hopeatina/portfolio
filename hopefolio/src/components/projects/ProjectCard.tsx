import React, { ReactNode } from "react";

interface ProjectCardProps {
  title?: string;
  children: ReactNode;
  variant?: "default" | "accent" | "secondary" | "highlight";
  className?: string;
  role?: string;
  ariaLabel?: string;
}

export default function ProjectCard({
  title,
  children,
  variant = "default",
  className = "",
  role,
  ariaLabel,
}: ProjectCardProps) {
  const variantClassMap = {
    default:
      "border border-border bg-[var(--card-bg)] shadow-[0_24px_80px_-55px_rgba(15,23,42,0.32)]",
    accent:
      "border border-[color:var(--border-color)] bg-[linear-gradient(180deg,var(--surface),var(--card-bg))] shadow-[0_26px_80px_-56px_rgba(15,23,42,0.28)]",
    secondary:
      "border border-border/30 bg-surface text-text shadow-[0_30px_90px_-60px_rgba(2,8,23,0.92)]",
    highlight:
      "border border-border bg-[linear-gradient(135deg,var(--card-bg),var(--surface))] shadow-[0_20px_70px_-50px_rgba(15,23,42,0.26)]",
  } as const;

  return (
    <div
      role={role}
      aria-label={ariaLabel}
      className={`min-w-0 rounded-[28px] p-6 md:p-7 ${variantClassMap[variant]} ${className}`}
    >
      {title && (
        <h4
          className={`mb-4 text-lg font-semibold tracking-[-0.03em] ${
            variant === "secondary" ? "text-text" : "text-heading"
          }`}
        >
          {title}
        </h4>
      )}
      <div className={variant === "secondary" ? "min-w-0 text-text-muted" : "min-w-0 text-body"}>
        {children}
      </div>
    </div>
  );
}
