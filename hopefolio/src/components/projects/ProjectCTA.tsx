import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface ProjectCTAProps {
  demoUrl?: string;
  githubUrl?: string;
  className?: string;
}

export default function ProjectCTA({
  demoUrl,
  githubUrl,
  className = "",
}: ProjectCTAProps) {
  return (
    <section className={`mt-16 ${className}`}>
      <Card variant="elevated" className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-heading">
          Experience It Yourself
        </h2>

        <div className="flex flex-wrap gap-4 justify-center">
          {demoUrl && (
            <Button href={demoUrl} external size="lg" variant="primary">
              View Live Demo
            </Button>
          )}

          {githubUrl && (
            <Button href={githubUrl} external size="lg" variant="secondary">
              View Source Code
            </Button>
          )}
        </div>
      </Card>
    </section>
  );
}
