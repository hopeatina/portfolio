import React from 'react';
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, mix, prog } from './ease';
import { T, rec } from './theme';
import { resolveText } from './decode';
import type { Grid } from './grid';

export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => {
  const f = Math.floor(useCurrentFrame());
  return (
    <AbsoluteFill style={{ backgroundImage: `url(${staticFile(`img/grain_${f % 6}.png`)})`, backgroundPosition: `${Math.floor(random(`gx${f}`) * 512)}px ${Math.floor(random(`gy${f}`) * 512)}px`, backgroundSize: '512px 512px', mixBlendMode: 'overlay', opacity, pointerEvents: 'none' }} />
  );
};
export const Vignette: React.FC<{ s?: number }> = ({ s = 0.55 }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse 75% 70% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,${s}) 100%)`, pointerEvents: 'none' }} />
);
export const Flash: React.FC<{ a: number; color?: string }> = ({ a, color = '255,255,255' }) =>
  a < 0.003 ? null : <AbsoluteFill style={{ background: `rgba(${color},${a})`, mixBlendMode: 'plus-lighter', pointerEvents: 'none' }} />;

/**
 * The portfolio signature that closes every reel: the project in Newsreader,
 * one line of what it is, and the credit that makes it Hope's — built by Hope,
 * scored by Hope (every soundtrack is one of his own tracks).
 */
export const EndCard: React.FC<{ g: Grid; index: string; title: string; line: string; accent: string; from: number; dark?: boolean }> = ({ g, index, title, line, accent, from }) => {
  const f = useCurrentFrame();
  if (f < from) return null;
  const t = HOUSE(prog(f, from, from + 22));
  const lineT = RESOLVE(prog(f, from + 10, from + 40));
  const credT = HOUSE(prog(f, g.button + 6, g.button + 30));
  const rule = HOUSE(prog(f, from + 4, from + 34));
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', left: 160, top: 360, ...rec(1, 0, 500), fontSize: 22, letterSpacing: '0.2em', color: accent, opacity: t }}>{index}</div>
      <div style={{ position: 'absolute', left: 160, top: 400, fontFamily: T.serif, fontSize: 168, lineHeight: 0.95, letterSpacing: '-0.02em', color: T.mineral, clipPath: `inset(0 ${(1 - t) * 100}% -20% 0)` }}>{title}</div>
      <div style={{ position: 'absolute', left: 160, top: 610, width: 1500 * rule, height: 2, background: accent }} />
      <div style={{ position: 'absolute', left: 160, top: 648, ...rec(0.2, 0.3, 420), fontSize: 38, color: T.mineral2, whiteSpace: 'pre' }}>{resolveText(''.padEnd(line.length, ' '), line, lineT, `ec${title}`, f)}</div>
      <div style={{ position: 'absolute', left: 160, bottom: 120, display: 'flex', gap: 36, ...rec(1, 0, 450), fontSize: 20, letterSpacing: '0.14em', color: T.mineral3, opacity: credT }}>
        <span>BUILT BY HOPE ATINA</span>
        <span style={{ color: accent }}>●</span>
        <span>SCORE: “{g.track.toUpperCase()}” BY HOPE ATINA</span>
      </div>
    </AbsoluteFill>
  );
};

export const Score: React.FC<{ proj: string }> = ({ proj }) => <Audio src={staticFile(`audio/${proj}.wav`)} />;
