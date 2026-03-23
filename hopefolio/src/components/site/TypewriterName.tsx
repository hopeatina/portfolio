"use client";

import React, { useEffect, useMemo, useState } from "react";

interface TypewriterNameProps {
  text: string;
}

export default function TypewriterName({ text }: TypewriterNameProps) {
  const [displayed, setDisplayed] = useState(text);
  const [isReady, setIsReady] = useState(false);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(text);
      setIsReady(true);
      return;
    }

    setDisplayed("");
    setIsReady(false);

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
        window.setTimeout(() => setIsReady(true), 200);
      }
    }, 90);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, text]);

  return (
    <div>
      <h1 className="hero-name" aria-label={text}>
        <span aria-hidden="true">
          {displayed}
          <span className="hero-cursor">|</span>
        </span>
      </h1>
      <div
        className={`hero-reveal ${isReady ? "hero-reveal-visible" : ""}`}
        aria-hidden={!isReady}
      />
    </div>
  );
}
