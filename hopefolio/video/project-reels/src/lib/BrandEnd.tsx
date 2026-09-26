import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { HOUSE, RESOLVE, prog } from './ease';
import { rec } from './theme';
import { resolveText } from './decode';
import type { Grid } from './grid';

/**
 * Each film ends on its own brand, not a shared template: the brand's ground,
 * its mark (passed in as `logo`), one line in its voice, and the credit that
 * makes it Hope's (built by Hope, scored with Hope's own track).
 */
export const BrandEnd: React.FC<{
  g: Grid;
  from: number;
  bg: string;
  fg?: string;
  muted?: string;
  accent: string;
  logo: React.ReactNode;
  line: string;
  kicker?: string;
  font?: string;
  wipe?: 'up' | 'iris' | 'left';
  children?: React.ReactNode;
}> = ({ g, from, bg, fg = '#fff', muted = 'rgba(255,255,255,0.62)', accent, logo, line, kicker, font = 'system-ui, -apple-system, Helvetica Neue, sans-serif', wipe = 'up', children }) => {
  const f = useCurrentFrame();
  if (f < from) return null;
  const t = HOUSE(prog(f, from, from + 18));
  const logoT = HOUSE(prog(f, from + 8, from + 30));
  const lineT = RESOLVE(prog(f, from + 22, from + 50));
  const credT = HOUSE(prog(f, g.button + 4, g.button + 26));
  const clip = wipe === 'iris' ? `circle(${t * 120}% at 50% 50%)` : wipe === 'left' ? `inset(0 ${(1 - t) * 100}% 0 0)` : `inset(${(1 - t) * 100}% 0 0 0)`;
  return (
    <AbsoluteFill style={{ background: bg, clipPath: clip, zIndex: 950000 }}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 34 }}>
        <div style={{ opacity: logoT, transform: `translateY(${(1 - logoT) * 24}px) scale(${0.96 + 0.04 * logoT})` }}>{logo}</div>
        {kicker ? <div style={{ ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.22em', color: accent, opacity: logoT }}>{kicker}</div> : null}
        <div style={{ fontFamily: font, fontSize: 40, fontWeight: 500, color: muted, whiteSpace: 'pre', letterSpacing: '-0.01em' }}>{resolveText(''.padEnd(line.length, ' '), line, lineT, `be${line.length}`, f)}</div>
        {children}
      </AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 84, display: 'flex', justifyContent: 'center', gap: 30, ...rec(1, 0, 500), fontSize: 18, letterSpacing: '0.16em', color: muted, opacity: credT }}>
        <span style={{ color: fg }}>BUILT BY HOPE ATINA</span>
        <span style={{ color: accent }}>●</span>
        <span>SCORE: “{g.track.toUpperCase()}” BY HOPE ATINA</span>
      </div>
    </AbsoluteFill>
  );
};
