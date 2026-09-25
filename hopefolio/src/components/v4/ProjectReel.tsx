import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export interface ProjectReelProps {
  /** 1920×1080 H.264 film under /public/video/reels */
  src: string;
  poster: string;
  label: string;
  caption: string;
  /** Visible soundtrack credit, e.g. “Kdila” by Hope Atina. Omit for silent cuts. */
  score?: string;
  className?: string;
}

/**
 * A project film in the hero slot. Muted autoplay loop by default (the films
 * are built to read with the sound off), one control to hear the score, and
 * no autoplay at all for readers who prefer reduced motion.
 */
export default function ProjectReel({ src, poster, label, caption, score, className = "" }: ProjectReelProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      return;
    }
    // Play only while the film is on screen.
    if (reduceMotion === false) video.play().catch(() => undefined);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  function toggleSound() {
    const video = ref.current;
    if (!video) return;
    const next = !soundOn;
    video.muted = !next;
    if (next) {
      video.currentTime = 0;
      video.play().catch(() => undefined);
    }
    setSoundOn(next);
  }

  return (
    <figure className={`project-visual project-visual-surface project-reel${className ? ` ${className}` : ""}`}>
      <div className="project-visual-frame project-reel-frame">
        <video
          ref={ref}
          className="project-reel-video"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          controls={Boolean(reduceMotion)}
          aria-label={`${label}. ${caption}`}
        />
      </div>
      <figcaption className="project-visual-caption">
        <div className="project-visual-copy">
          <span className="project-visual-label">{label}</span>
          <p>
            {caption}
            {score ? <span className="project-reel-score"> Score: {score}.</span> : null}
          </p>
        </div>
        {score ? (
          <button className="project-visual-open" type="button" aria-pressed={soundOn} onClick={toggleSound}>
            {soundOn ? "Sound off" : "Sound on"} <span aria-hidden="true">{soundOn ? "■" : "▶"}</span>
          </button>
        ) : null}
      </figcaption>
    </figure>
  );
}
