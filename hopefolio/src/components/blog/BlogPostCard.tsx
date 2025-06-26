"use client";

import React from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import { formatDate } from "@/utils/date";

interface BlogPostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readTime?: string;
  image?: {
    src: string;
    alt: string;
  };
}

export default function BlogPostCard({
  slug,
  title,
  excerpt,
  date,
  author,
  tags,
  readTime,
  image,
}: BlogPostCardProps) {
  return (
    <Card href={`/blog/${slug}`} variant="default" hoverable className="h-full">
      {image && (
        <div className="relative aspect-video mb-4 -mx-6 -mt-6 overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="mb-2 line-clamp-2">{title}</h3>
          <p className="text-muted mb-4 line-clamp-3">{excerpt}</p>
        </div>

        <div className="space-y-3">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <Tag key={tag} size="sm">
                  {tag}
                </Tag>
              ))}
              {tags.length > 3 && (
                <Tag size="sm" variant="muted">
                  +{tags.length - 3}
                </Tag>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-muted">
            <div className="flex items-center gap-2">
              <span>{author}</span>
              <span>•</span>
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
            {readTime && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {readTime}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
