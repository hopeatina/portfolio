"use client";
import React, { useEffect, useRef, useState } from "react";

interface MaterializeHeroProps {
  children: React.ReactNode;
  storageKey?: string;
  className?: string;
}

// Module-scoped flag. Persists across client-side nav in the same
// browser tab. Resets on hard refresh — which is exactly the moment
// we want the entry to play again.
const hasPlayed: Record<string, boolean> = {};

/**
 * Signature entry sequence:
 *   1. A subtle blueprint grid flashes in and fades out.
 *   2. An accent-green scanline sweeps top → bottom over the hero.
 *   3. Child elements marked with `data-materialize` blur-in + fade up
 *      on staggered delays (set via CSS variable `--materialize-delay`).
 *   4. Sequence plays once per browser tab per storageKey. Hard refresh
 *      replays it (module-scope flag resets). Client-side navigation
 *      back to the same page does NOT replay (flag persists).
 *   5. Respects prefers-reduced-motion by skipping animations entirely.
 *   6. Force replay with `?materialize=1` URL param (for demos).
 *
 * All animation is pure CSS transform + opacity + filter. Zero canvas,
 * zero WebGL. Total duration ~1100ms.
 */
export default function MaterializeHero({
  children,
  storageKey = "home",
  className = "",
}: MaterializeHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setPhase("done");
      return;
    }
    const forceReplay = new URLSearchParams(window.location.search).has(
      "materialize"
    );
    if (hasPlayed[storageKey] && !forceReplay) {
      setPhase("done");
      return;
    }
    hasPlayed[storageKey] = true;
    // One rAF ensures the idle state actually rendered before we flip
    // to playing — prevents browsers from skipping the initial
    // hidden state when React batches the updates.
    const raf = window.requestAnimationFrame(() => {
      setPhase("playing");
    });
    const doneTimer = window.setTimeout(() => setPhase("done"), 1400);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(doneTimer);
    };
  }, [storageKey]);

  return (
    <section
      ref={ref}
      className={`materialize-hero materialize-${phase} ${className}`.trim()}
    >
      <div className="materialize-grid" aria-hidden="true" />
      <div className="materialize-scanline" aria-hidden="true" />
      <div className="materialize-content">{children}</div>
    </section>
  );
}
