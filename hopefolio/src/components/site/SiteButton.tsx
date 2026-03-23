import Link from "next/link";
import React from "react";

interface SiteButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
  className?: string;
}

export default function SiteButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: SiteButtonProps) {
  const baseClass =
    variant === "text"
      ? "site-link-inline"
      : `site-button ${variant === "secondary" ? "site-button-secondary" : "site-button-primary"}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${baseClass} ${className}`.trim()}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClass} ${className}`.trim()}>
      {children}
    </Link>
  );
}

