import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type GlyphName = "context" | "branch" | "judgment" | "receipt" | "inspect";
export type MotifVariant = "weave" | "handoff" | "aperture" | "branch" | "memory" | "resolve";

const motifPaths: Record<MotifVariant, string[]> = {
  weave: [
    "M-40 236C92 74 216 78 348 184S624 330 850 82",
    "M-24 82C134 274 286 284 414 142S668 6 844 214",
    "M92 -20C180 116 252 160 390 168S654 126 740 334",
  ],
  handoff: [
    "M-30 186H194C266 186 274 76 352 76H526C600 76 606 226 680 226H840",
    "M352 76V226H526",
  ],
  aperture: [
    "M-30 164H252C290 164 302 136 320 106C348 58 432 56 470 106C494 138 500 164 548 164H840",
    "M395 35A112 112 0 1 0 395 259A112 112 0 1 0 395 35",
    "M395 70A77 77 0 1 0 395 224A77 77 0 1 0 395 70",
  ],
  branch: [
    "M-30 154H190C274 154 270 58 356 58H842",
    "M190 154H842",
    "M190 154C274 154 270 252 356 252H842",
  ],
  memory: [
    "M-30 208C108 208 118 78 250 78S392 220 520 220S656 90 842 90",
    "M250 78V220H520",
    "M104 208V254H654V90",
  ],
  resolve: [
    "M-30 70C122 70 160 246 314 246S514 70 670 70H842",
    "M-30 246C122 246 160 70 314 70S514 246 670 246H842",
    "M670 70V246",
  ],
};

export function LivingMotif({
  variant,
  label,
  className = "",
  interactive = true,
}: {
  variant: MotifVariant;
  label?: string;
  className?: string;
  interactive?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-12%" });
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 150, damping: 24, mass: 0.65 });
  const y = useSpring(pointerY, { stiffness: 150, damping: 24, mass: 0.65 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 18);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
  };

  const releasePointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={rootRef}
      className={`v4-living-motif is-${variant} ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={releasePointer}
      aria-label={label}
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
    >
      <motion.div className="v4-living-motif-plane" style={{ x, y }}>
        <svg viewBox="0 0 800 300" preserveAspectRatio="none">
          <g className="v4-motif-registration is-cold">
            {motifPaths[variant].map((path, index) => (
              <path d={path} key={`cold-${index}`} />
            ))}
          </g>
          <g className="v4-motif-registration is-heat">
            {motifPaths[variant].map((path, index) => (
              <path d={path} key={`heat-${index}`} />
            ))}
          </g>
          <g className="v4-motif-signal">
            {motifPaths[variant].map((path, index) => (
              <motion.path
                d={path}
                key={`signal-${index}`}
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0.25 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
                transition={{
                  type: "spring",
                  stiffness: 34,
                  damping: 18,
                  mass: 0.8,
                  delay: index * 0.08,
                }}
              />
            ))}
          </g>
          <g className="v4-motif-nodes">
            <circle cx="190" cy="154" r="5" />
            <circle cx="395" cy="164" r="5" />
            <circle cx="670" cy="70" r="5" />
          </g>
        </svg>
      </motion.div>
      {label ? <span className="v4-living-motif-label">{label}</span> : null}
    </div>
  );
}

export function SystemGlyph({ name }: { name: GlyphName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="v4-system-glyph">
      {name === "context" ? (
        <>
          <path {...common} d="M8 14h32M8 24h23M8 34h15" />
          <circle {...common} cx="36" cy="24" r="4" />
        </>
      ) : null}
      {name === "branch" ? (
        <>
          <path {...common} d="M8 24h11c8 0 7-12 16-12h5M19 24h21M19 24c8 0 7 12 16 12h5" />
          <circle {...common} cx="8" cy="24" r="2.5" />
        </>
      ) : null}
      {name === "judgment" ? (
        <>
          <path {...common} d="M24 7 40 16v12L24 41 8 28V16Z" />
          <path {...common} d="m17 24 5 5 10-11" />
        </>
      ) : null}
      {name === "receipt" ? (
        <>
          <path {...common} d="M13 7h22v34l-5-3-6 3-6-3-5 3Z" />
          <path {...common} d="M18 16h12M18 23h12M18 30h7" />
        </>
      ) : null}
      {name === "inspect" ? (
        <>
          <circle {...common} cx="21" cy="21" r="11" />
          <path {...common} d="m29 29 11 11M16 21h10M21 16v10" />
        </>
      ) : null}
    </svg>
  );
}

export function ContinuityPlayhead({ label = "continuity" }: { label?: string }) {
  const fillRef = useRef<HTMLSpanElement>(null);
  const railFillRef = useRef<HTMLSpanElement>(null);
  const railNodeRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        const progress = available > 0 ? Math.min(1, window.scrollY / available) : 0;
        fillRef.current?.style.setProperty("transform", `scaleX(${progress})`);
        railFillRef.current?.style.setProperty("transform", `scaleY(${progress})`);
        railNodeRef.current?.style.setProperty("top", `${progress * 100}%`);
        if (valueRef.current) valueRef.current.textContent = `${Math.round(progress * 100)}`.padStart(2, "0");
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div className="v4-playhead" aria-label="Page progress">
        <span className="v4-playhead-label">{label}</span>
        <span className="v4-playhead-track" aria-hidden="true">
          <span ref={fillRef} />
        </span>
        <strong ref={valueRef}>00</strong>
      </div>
      <div className="v4-continuity-spine" aria-hidden="true">
        <span className="v4-continuity-spine-fill" ref={railFillRef} />
        <span className="v4-continuity-spine-node" ref={railNodeRef} />
      </div>
    </>
  );
}

export function SectionSignal({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="v4-section-signal">
      <span>{index}</span>
      <i aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}

interface EvidenceSpecimenProps {
  src: string;
  alt: string;
  label: string;
  caption: string;
  priority?: boolean;
  className?: string;
}

export function EvidenceSpecimen({
  src,
  alt,
  label,
  caption,
  priority = false,
  className = "",
}: EvidenceSpecimenProps) {
  const [inspecting, setInspecting] = useState(false);
  const reduceMotion = useReducedMotion();
  const apertureX = useMotionValue(55);
  const apertureY = useMotionValue(42);
  const springX = useSpring(apertureX, { stiffness: 180, damping: 25, mass: 0.55 });
  const springY = useSpring(apertureY, { stiffness: 180, damping: 25, mass: 0.55 });
  const backgroundPosition = useMotionTemplate`${springX}% ${springY}%`;
  const apertureLeft = useMotionTemplate`${springX}%`;
  const apertureTop = useMotionTemplate`${springY}%`;

  const moveAperture = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    apertureX.set(Math.max(14, Math.min(86, ((event.clientX - bounds.left) / bounds.width) * 100)));
    apertureY.set(Math.max(18, Math.min(82, ((event.clientY - bounds.top) / bounds.height) * 100)));
  };

  return (
    <figure className={`v4-specimen ${inspecting ? "is-inspecting" : ""} ${className}`}>
      <div className="v4-specimen-media" onPointerMove={moveAperture}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1000px) 62vw, 100vw" priority={priority} />
        <motion.span
          className="v4-specimen-aperture"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition,
            left: apertureLeft,
            top: apertureTop,
          }}
        />
        <button
          type="button"
          className="v4-specimen-toggle"
          aria-pressed={inspecting}
          onClick={(event) => {
            event.preventDefault();
            setInspecting((current) => !current);
          }}
        >
          <SystemGlyph name="inspect" />
          <span>{inspecting ? "release" : "inspect"}</span>
        </button>
      </div>
      <figcaption>
        <span>{label}</span>
        <p>{caption}</p>
      </figcaption>
    </figure>
  );
}

export function CausalFlow({
  steps,
}: {
  steps: Array<{ glyph: GlyphName; label: string; detail: string; tone?: "heat" | "cold" }>;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="v4-causal-flow" role="list" aria-label="System flow">
      {steps.map((step, index) => (
        <motion.div
          className={`v4-flow-step ${step.tone ? `is-${step.tone}` : ""}`}
          role="listitem"
          key={step.label}
          initial={reduceMotion ? false : { opacity: 0.55, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          whileHover={reduceMotion ? undefined : { y: -7 }}
          transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.7, delay: index * 0.035 }}
        >
          <span className="v4-flow-index">0{index + 1}</span>
          <SystemGlyph name={step.glyph} />
          <strong>{step.label}</strong>
          <p>{step.detail}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function TextLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className = "v4-text-link";
  if (external) {
    const opensNewWindow = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={className}
        target={opensNewWindow ? "_blank" : undefined}
        rel={opensNewWindow ? "noreferrer" : undefined}
      >
        {children} <span aria-hidden="true">↗</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children} <span aria-hidden="true">→</span>
    </Link>
  );
}
