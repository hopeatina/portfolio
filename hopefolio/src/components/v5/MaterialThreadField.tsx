import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

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

const SAMPLES = 44;
const VIEW_W = 820;
const KNOT_Y = 152;

/** Base ribbon waves — five strands of the woven field. */
const RIBBONS = [
  (u: number) => 96 + Math.sin(u * Math.PI * 2.2 + 0.4) * 62,
  (u: number) => 152 + Math.sin(u * Math.PI * 2.6 + 2.1) * 74,
  (u: number) => 216 + Math.sin(u * Math.PI * 2.0 + 4.0) * 58,
  (u: number) => 120 + Math.sin(u * Math.PI * 3.1 + 1.2) * 40,
  (u: number) => 196 + Math.sin(u * Math.PI * 2.9 + 5.1) * 44,
];

function bump(u: number, center: number, width: number) {
  const d = Math.abs(u - center) / width;
  return d >= 1 ? 0 : (1 - d * d) * (1 - d * d);
}

/**
 * The material answers the selection: strands cinch into a knot at the active
 * decision's position — "pressure reveals structure" as geometry, not a caption.
 */
function ribbonPath(ribbonIndex: number, knotU: number | null, cinch: number) {
  const wave = RIBBONS[ribbonIndex];
  let d = "";
  for (let i = 0; i < SAMPLES; i++) {
    const u = i / (SAMPLES - 1);
    let y = wave(u);
    if (knotU !== null) {
      y = y + (KNOT_Y - y) * cinch * bump(u, knotU, 0.17);
    }
    const x = -40 + (VIEW_W + 80) * u;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

function knotUFor(index: number, count: number) {
  return (18 + index * (64 / Math.max(1, count - 1))) / 100;
}

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

  const activeIndex = Math.max(0, stories.findIndex((story) => story.id === active.id));
  const knotU = knotUFor(activeIndex, stories.length);
  const cinch = active.tone === "heat" ? -0.55 : 0.82; // heat = strain apart, else cinch tight
  const initialDs = RIBBONS.map((_, index) => ribbonPath(index, knotU, cinch));
  const knotX = -40 + (VIEW_W + 80) * knotU;

  // The re-weave: interpolate (knotU, cinch) imperatively — the material answers
  // the selection with real motion, not a caption swap.
  const groupsRef = useRef<Array<SVGGElement | null>>([]);
  const markRef = useRef<SVGGElement | null>(null);
  const morphState = useRef({ u: knotU, c: cinch, raf: 0 });

  useEffect(() => {
    const state = morphState.current;
    const fromU = state.u;
    const fromC = state.c;
    const apply = (u: number, c: number) => {
      state.u = u;
      state.c = c;
      const ds = RIBBONS.map((_, index) => ribbonPath(index, u, c));
      for (const group of groupsRef.current) {
        if (!group) continue;
        const nodes = group.querySelectorAll("path");
        nodes.forEach((node, index) => {
          if (ds[index]) node.setAttribute("d", ds[index]);
        });
      }
      if (markRef.current) {
        const x = -40 + (VIEW_W + 80) * u;
        markRef.current.style.transform = `translate(${x}px, ${KNOT_Y}px)`;
      }
    };

    cancelAnimationFrame(state.raf);
    if (reduceMotion || (fromU === knotU && fromC === cinch)) {
      apply(knotU, cinch);
      return;
    }

    const started = performance.now();
    const duration = 620;
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      const e = 1 - Math.pow(1 - t, 3); // ease-out cubic
      apply(fromU + (knotU - fromU) * e, fromC + (cinch - fromC) * e);
      if (t < 1) state.raf = requestAnimationFrame(tick);
    };
    state.raf = requestAnimationFrame(tick);
    // rAF is throttled/suspended in background tabs — guarantee the final state lands.
    const settle = window.setTimeout(() => {
      if (state.u !== knotU || state.c !== cinch) apply(knotU, cinch);
    }, duration + 120);
    return () => {
      cancelAnimationFrame(state.raf);
      window.clearTimeout(settle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [knotU, cinch, reduceMotion]);

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

          <g
            className="v5-thread-shadow"
            filter={`url(#${rawId}-depth)`}
            ref={(node) => { groupsRef.current[0] = node; }}
          >
            {initialDs.map((d, index) => <path d={d} key={`shadow-${index}`} />)}
          </g>
          <g
            className="v5-thread-ribbon"
            filter={`url(#${rawId}-rough)`}
            ref={(node) => { groupsRef.current[1] = node; }}
          >
            {initialDs.map((d, index) => (
              <motion.path
                d={d}
                key={`ribbon-${index}`}
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0.25 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: "spring", stiffness: 26, damping: 15, delay: index * 0.07 }}
              />
            ))}
          </g>
          <g
            className="v5-thread-highlight"
            stroke={`url(#${rawId}-fiber)`}
            ref={(node) => { groupsRef.current[2] = node; }}
          >
            {initialDs.map((d, index) => <path d={d} key={`highlight-${index}`} />)}
          </g>
          <g
            className={`v5-thread-knotmark ${active.tone === "heat" ? "is-heat" : ""}`}
            ref={markRef}
            style={{ transform: `translate(${knotX}px, ${KNOT_Y}px)` }}
          >
            {active.tone === "heat" ? (
              <path d="M-11 -11 L11 11 M-11 11 L11 -11" />
            ) : (
              <>
                <circle r="9" />
                <circle r="3.2" className="is-core" />
              </>
            )}
          </g>
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
