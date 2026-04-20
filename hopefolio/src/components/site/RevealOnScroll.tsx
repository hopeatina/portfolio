"use client";
import React, { useEffect, useRef, useState } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export default function RevealOnScroll({
  children,
  delay = 0,
  as = "div",
  className = "",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      className={`reveal-on-scroll ${visible ? "reveal-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
