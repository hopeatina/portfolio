import React, { ReactNode } from "react";
import Card from "@/components/ui/Card";

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
  // Map ProjectCard variants to Card variants
  const cardVariant = variant === "default" ? "elevated" : "outline";

  return (
    <Card variant={cardVariant} className={`${className}`}>
      {title && (
        <h4 className="font-semibold mb-4 text-lg text-heading">{title}</h4>
      )}
      <div className="text-body">{children}</div>
    </Card>
  );
}
