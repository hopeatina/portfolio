import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  /** The seal's ink. Letters are carved out of it in the page's carbon. */
  tone?: string;
  carve?: string;
  title?: string;
}

/**
 * The seal. A maker's chop, cut by hand: a square of ink with the corner
 * notched so it can only sit one way, and the letters H and A carved out of
 * it sharing a single bar. The bar is the handoff. It is pressed once onto
 * every receipt on the site, and nowhere else.
 */
export default function Logo({ className = "", size = 28, tone = "currentColor", carve = "var(--v4-carbon, #080806)", title }: LogoProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      style={{ display: "block", flex: "none" }}
    >
      {title ? <title>{title}</title> : null}
      <path d="M6 3h36a3 3 0 0 1 3 3v28.5L34.5 45H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z" fill={tone} />
      <g fill="none" stroke={carve} strokeWidth="3.4" strokeLinecap="butt" strokeLinejoin="miter">
        <path d="M12 12v25M20 12v25" />
        <path d="M28 37l6.2-25 6.2 25" />
        <path d="M12 26h25.3" />
      </g>
    </svg>
  );
}
