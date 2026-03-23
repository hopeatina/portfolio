import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { PortfolioProject } from "@/data/portfolio";
import StatusBadge from "./StatusBadge";

interface ProjectCardProps {
  project: PortfolioProject;
  featured?: boolean;
}

export default function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps) {
  return (
    <Link
      href={project.href}
      className={`work-card ${featured ? "work-card-featured" : ""}`}
    >
      <div className="work-card-body">
        <StatusBadge status={project.status} />
        <div className="work-card-copy">
          <div className="eyebrow">{project.shortLabel}</div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="work-card-proof">
          {project.proof.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="work-card-link">{project.primaryCta} →</div>
      </div>

      {project.heroImage ? (
        <div className="work-card-visual">
          <Image
            src={project.heroImage}
            alt={project.heroAlt || `${project.title} preview`}
            fill
            priority={featured}
            sizes={featured ? "(min-width: 1024px) 38vw, 100vw" : "100vw"}
            className="object-cover"
          />
          <div className="work-card-overlay" />
        </div>
      ) : (
        <div className="work-card-accent" aria-hidden="true" />
      )}
    </Link>
  );
}
