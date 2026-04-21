"use client";
import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealLineProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper that adds .scroll-revealed when the element enters the
 * viewport. Sibling CSS can use this class to animate child accent
 * bars, stagger their children, or kick off a scanline sweep.
 *
 * Respects prefers-reduced-motion.
 */
export default function ScrollRevealLine({
  children,
  className = "",
}: ScrollRevealLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    const fallback = window.setTimeout(() => setRevealed(true), 1500);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal-line ${revealed ? "scroll-revealed" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
