import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useId, useState } from "react";

export interface ThreadStory {
  id: string;
  label: string;
  before: string;
  decision: string;
  consequence: string;
  evidence?: string;
  /** When present, the evidence label becomes a real receipt: a link you can open. */
  evidenceHref?: string;
  tone?: "signal" | "heat" | "cold";
}

interface MaterialThreadFieldProps {
  stories: ThreadStory[];
  eyebrow?: string;
  title?: string;
  className?: string;
  compact?: boolean;
}

const paths = [
  "M-50 96C80 22 168 176 302 106S520 14 878 98",
  "M-42 170C108 258 190 40 344 154S588 266 870 146",
  "M-60 238C110 142 206 300 368 220S618 92 876 232",
  "M104 -32C184 84 224 172 308 326",
  "M646 -22C564 98 554 208 506 328",
];

export default function MaterialThreadField({
  stories,
  eyebrow = "Pressure reveals structure",
  title,
  className = "",
  compact = false,
}: MaterialThreadFieldProps) {
  const [activeId, setActiveId] = useState(stories[0]?.id ?? "");
  const reduceMotion = useReducedMotion();
  const rawId = useId().replace(/:/g, "");
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 110, damping: 22, mass: 0.8 });
  const y = useSpring(pointerY, { stiffness: 110, damping: 22, mass: 0.8 });
  const active = stories.find((story) => story.id === activeId) ?? stories[0];

  if (!active) return null;

  return (
    <section className={`v5-thread-field ${compact ? "is-compact" : ""} ${className}`}>
      <div
        className="v5-thread-material"
        onPointerMove={(event) => {
          if (reduceMotion) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 22);
          pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 15);
        }}
        onPointerLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
      >
        <motion.svg
          viewBox="0 0 820 300"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ x, y }}
        >
          <defs>
            <linearGradient id={`${rawId}-fiber`} x1="0" x2="1">
              <stop offset="0" stopColor="#8a877e" />
              <stop offset="0.45" stopColor="#f2efe4" />
              <stop offset="1" stopColor="#b7f34a" />
            </linearGradient>
            <filter id={`${rawId}-depth`} x="-30%" y="-40%" width="160%" height="180%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#000" floodOpacity="0.62" />
              <feDropShadow dx="-4" dy="-2" stdDeviation="2" floodColor="#d69a45" floodOpacity="0.22" />
              <feDropShadow dx="5" dy="2" stdDeviation="3" floodColor="#4e5854" floodOpacity="0.2" />
            </filter>
            <filter id={`${rawId}-rough`} x="-10%" y="-20%" width="120%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.12" numOctaves="2" seed="8" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
            </filter>
          </defs>

          <g className="v5-thread-shadow" filter={`url(#${rawId}-depth)`}>
            {paths.map((path, index) => <path d={path} key={`shadow-${index}`} />)}
          </g>
          <g className="v5-thread-ribbon" filter={`url(#${rawId}-rough)`}>
            {paths.map((path, index) => (
              <motion.path
                d={path}
                key={`ribbon-${index}`}
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0.25 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: "spring", stiffness: 26, damping: 15, delay: index * 0.07 }}
              />
            ))}
          </g>
          <g className="v5-thread-highlight" stroke={`url(#${rawId}-fiber)`}>
            {paths.map((path, index) => <path d={path} key={`highlight-${index}`} />)}
          </g>
          <path className="v5-thread-snap" d="M352 154l18-18m-18 18 20 17" />
        </motion.svg>

        <div className="v5-thread-knots" role="tablist" aria-label="Inspect the decisions in the weave">
          {stories.map((story, index) => (
            <button
              key={story.id}
              id={`${rawId}-tab-${story.id}`}
              type="button"
              role="tab"
              aria-selected={story.id === active.id}
              aria-controls={`${rawId}-panel`}
              tabIndex={story.id === active.id ? 0 : -1}
              className={`is-${story.tone ?? "signal"}`}
              style={{ "--knot-x": `${18 + index * (64 / Math.max(1, stories.length - 1))}%` } as React.CSSProperties}
              onClick={() => setActiveId(story.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveId(story.id);
                  return;
                }

                const keyOffsets: Record<string, number> = {
                  ArrowLeft: -1,
                  ArrowUp: -1,
                  ArrowRight: 1,
                  ArrowDown: 1,
                };
                const offset = keyOffsets[event.key];
                const targetIndex = event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? stories.length - 1
                    : offset
                      ? (index + offset + stories.length) % stories.length
                      : null;

                if (targetIndex === null) return;
                event.preventDefault();
                const nextStory = stories[targetIndex];
                setActiveId(nextStory.id);
                const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
                requestAnimationFrame(() => tabs?.[targetIndex]?.focus());
              }}
            >
              <span aria-hidden="true" />
              <b>{String(index + 1).padStart(2, "0")}</b>
              <em>{story.label}</em>
            </button>
          ))}
        </div>
      </div>

      <div
        className="v5-thread-disclosure"
        id={`${rawId}-panel`}
        role="tabpanel"
        aria-labelledby={`${rawId}-tab-${active.id}`}
        aria-live="polite"
      >
        <div className="v5-thread-disclosure-heading">
          <span>{eyebrow}</span>
          {title ? <h2>{title}</h2> : null}
        </div>
        <div className="v5-thread-state">
          <div>
            <span>Before / tension</span>
            <p>{active.before}</p>
          </div>
          <div className="is-knot">
            <span>The knot / decision</span>
            <p>{active.decision}</p>
          </div>
          <div>
            <span>After / consequence</span>
            <p>{active.consequence}</p>
          </div>
        </div>
        {active.evidence ? (
          active.evidenceHref ? (
            <small>
              <a href={active.evidenceHref} target="_blank" rel="noreferrer">
                {active.evidence} <span aria-hidden="true">↗</span>
              </a>
            </small>
          ) : (
            <small>{active.evidence}</small>
          )
        ) : null}
      </div>
    </section>
  );
}
