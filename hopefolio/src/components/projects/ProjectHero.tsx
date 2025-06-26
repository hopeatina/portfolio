import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Tag from "@/components/ui/Tag";

interface ProjectHeroProps {
  title: string;
  description: string;
  tags?: string[];
  image?: string;
}

export default function ProjectHero({
  title,
  description,
  tags = [],
  image,
}: ProjectHeroProps) {
  const { theme } = useTheme();

  return (
    <section className="mb-16">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Content Side */}
        <div className="flex-1">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <Tag key={tag} size="md">
                  {tag}
                </Tag>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{title}</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-body-secondary max-w-3xl">
            {description}
          </p>
        </div>

        {/* Image Side */}
        {image && (
          <div className="lg:flex-1 w-full lg:w-auto">
            <div className="relative rounded-lg overflow-hidden group">
              <img
                src={image}
                alt={title}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
