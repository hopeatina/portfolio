import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type GlyphName = "context" | "branch" | "judgment" | "receipt" | "inspect";

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
  const valueRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        const progress = available > 0 ? Math.min(1, window.scrollY / available) : 0;
        fillRef.current?.style.setProperty("transform", `scaleX(${progress})`);
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
    <div className="v4-playhead" aria-label="Page progress">
      <span className="v4-playhead-label">{label}</span>
      <span className="v4-playhead-track" aria-hidden="true">
        <span ref={fillRef} />
      </span>
      <strong ref={valueRef}>00</strong>
    </div>
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

  return (
    <figure className={`v4-specimen ${inspecting ? "is-inspecting" : ""} ${className}`}>
      <div className="v4-specimen-media">
        <Image src={src} alt={alt} fill sizes="(min-width: 1000px) 62vw, 100vw" priority={priority} />
        <span
          className="v4-specimen-aperture"
          aria-hidden="true"
          style={{ backgroundImage: `url(${src})` }}
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
  return (
    <div className="v4-causal-flow" role="list" aria-label="System flow">
      {steps.map((step, index) => (
        <div className={`v4-flow-step ${step.tone ? `is-${step.tone}` : ""}`} role="listitem" key={step.label}>
          <span className="v4-flow-index">0{index + 1}</span>
          <SystemGlyph name={step.glyph} />
          <strong>{step.label}</strong>
          <p>{step.detail}</p>
        </div>
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
