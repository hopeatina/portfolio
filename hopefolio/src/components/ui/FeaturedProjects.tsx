"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { flagshipSystems } from "@/data/homepage";
import StateBadge from "./StateBadge";
import { ThemeAnimatedSection, ThemeHoverElement } from "../animations/ThemePhysics";

export default function FeaturedProjects() {
  return (
    <section className="relative w-full bg-background pb-32">
      <ThemeAnimatedSection className="mx-auto max-w-7xl px-6 lg:px-12 mb-32 pt-32 text-center">
        <p className="mb-6 text-xs font-mono uppercase tracking-[0.25em] text-text-muted">
          Flagship systems
        </p>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-text">
          Start with the <span className="italic text-primary font-light">strongest</span> object
        </h2>
        <p className="mt-8 text-xl font-body font-light text-text-muted leading-relaxed max-w-2xl mx-auto">
          OrgX should feel like the unmistakable center of gravity. The other systems matter because they prove the same operating judgment under production, tooling, and workflow constraints.
        </p>
      </ThemeAnimatedSection>

      <div className="flex flex-col gap-40">
        {flagshipSystems.map((project, index) => (
          <ThemeAnimatedSection key={project.id} delay={0.1} className="relative w-full group">
            <Link href={`/projects/${project.slug}`} className="block no-underline">
              <div className="relative mx-auto max-w-7xl px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16 lg:gap-24 z-10">
                
                {/* Content Side */}
                <ThemeHoverElement className={`w-full md:w-5/12 flex flex-col items-start ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <StateBadge state={project.state} />
                  <p className="mt-6 text-xs font-mono uppercase tracking-[0.2em] text-primary">
                    {project.meta}
                  </p>
                  <h3 className="mt-4 text-5xl md:text-6xl font-heading text-text tracking-tight group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="mt-6 text-xl font-body font-light text-text-muted leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="mt-10 pt-10 border-t border-border w-full flex flex-col gap-6">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-2">Proof</p>
                      <p className="text-base font-body font-light text-text-muted">{project.proof}</p>
                    </div>
                  </div>

                  <div className="mt-12 flex items-center gap-3 text-text group-hover:text-primary transition-colors">
                    <span className="font-mono text-sm tracking-wide">Inspect case study</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-2" />
                  </div>
                </ThemeHoverElement>

                {/* Massive Image Mockup Intersecting Scroll */}
                <ThemeHoverElement className={`w-full md:w-7/12 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/5 transition-transform duration-700 ease-out group-hover:scale-[1.02] group-hover:-translate-y-4 ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                  <Image
                    src={project.image}
                    alt={`Preview of ${project.name}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </ThemeHoverElement>

              </div>
            </Link>
          </ThemeAnimatedSection>
        ))}
      </div>
    </section>
  );
}
