import React from 'react';
import { AbsoluteFill, random } from 'remotion';
import { clamp } from './ease';

/**
 * Screen-space atmosphere and edit grammar shared by the films: light, haze,
 * bokeh, dust, letterbox, grade, and the transitions (whip, flash, dip).
 * World-space sets live in each film; these sit over or under them.
 */

/** A soft pool of light (a lamp, a window, a monitor) in screen space. */
export const Glow: React.FC<{ x: number; y: number; r: number; color: string; a?: number; blend?: React.CSSProperties['mixBlendMode'] }> = ({ x, y, r, color, a = 0.5, blend = 'screen' }) => (
  <div style={{ position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, opacity: a, mixBlendMode: blend, pointerEvents: 'none' }} />
);

/** Out-of-focus lights (city, monitors, fairy lights): discs that drift a little with the camera. */
export const Bokeh: React.FC<{ n: number; seed: string; colors: string[]; area: [number, number, number, number]; size: [number, number]; drift?: number; f: number; a?: number }> = ({ n, seed, colors, area, size, drift = 0, f, a = 0.6 }) => (
  <AbsoluteFill style={{ pointerEvents: 'none' }}>
    {new Array(n).fill(0).map((_, i) => {
      const r = size[0] + random(`${seed}r${i}`) * (size[1] - size[0]);
      const x = area[0] + random(`${seed}x${i}`) * (area[2] - area[0]) + drift * Math.sin(f / 90 + i);
      const y = area[1] + random(`${seed}y${i}`) * (area[3] - area[1]);
      const c = colors[i % colors.length];
      const tw = 0.7 + 0.3 * Math.sin(f / (20 + (i % 7) * 6) + i);
      return <div key={i} style={{ position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: `radial-gradient(circle, ${c} 0%, ${c} 55%, transparent 72%)`, opacity: a * tw * (0.5 + random(`${seed}a${i}`) * 0.5), mixBlendMode: 'screen' }} />;
    })}
  </AbsoluteFill>
);

/** Motes in a light beam: slow, deterministic, lit only where the beam is. */
export const Dust: React.FC<{ n: number; seed: string; f: number; color?: string; speed?: number; area?: [number, number, number, number]; a?: number }> = ({ n, seed, f, color = 'rgba(255,230,190,0.9)', speed = 1, area = [0, 0, 1920, 1080], a = 0.5 }) => (
  <AbsoluteFill style={{ pointerEvents: 'none' }}>
    {new Array(n).fill(0).map((_, i) => {
      const w = area[2] - area[0];
      const h = area[3] - area[1];
      const x = area[0] + ((random(`${seed}dx${i}`) * w + f * speed * (0.3 + random(`${seed}dv${i}`))) % w);
      const y = area[1] + ((random(`${seed}dy${i}`) * h + Math.sin(f / 40 + i) * 12 - f * speed * 0.2 + h * 10) % h);
      const s = 1.5 + random(`${seed}ds${i}`) * 3;
      return <div key={i} style={{ position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%', background: color, opacity: a * (0.4 + 0.6 * random(`${seed}da${i}`)), boxShadow: `0 0 ${s * 3}px ${color}` }} />;
    })}
  </AbsoluteFill>
);

/** Anamorphic bars (0..1). Scope for the cinematic shots, gone for UI reads. */
export const Letterbox: React.FC<{ t: number; ratio?: number }> = ({ t, ratio = 2.39 }) => {
  const bar = clamp(t) * ((1080 - 1920 / ratio) / 2);
  if (bar < 0.5) return null;
  return (
    <>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: bar, background: '#000', zIndex: 900000 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: bar, background: '#000', zIndex: 900000 }} />
    </>
  );
};

/** A colour grade as a blend layer (soft-light tint) + a lift of the blacks. */
export const Grade: React.FC<{ tint: string; a?: number; lift?: string }> = ({ tint, a = 0.35, lift }) => (
  <>
    <AbsoluteFill style={{ background: tint, mixBlendMode: 'soft-light', opacity: a, pointerEvents: 'none' }} />
    {lift ? <AbsoluteFill style={{ background: lift, mixBlendMode: 'lighten', pointerEvents: 'none' }} /> : null}
  </>
);

/** Whip pan: a directional smear that peaks on the cut frame and hides it. */
export const Whip: React.FC<{ f: number; at: number; dir?: 1 | -1; len?: number; color?: string }> = ({ f, at, dir = 1, len = 7, color = 'rgba(255,255,255,0.10)' }) => {
  const u = (f - at) / len;
  if (u < -1 || u > 1) return null;
  const k = 1 - Math.abs(u);
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', backdropFilter: `blur(${(28 * k).toFixed(1)}px)`, WebkitBackdropFilter: `blur(${(28 * k).toFixed(1)}px)`, background: `repeating-linear-gradient(${dir > 0 ? 0 : 180}deg, ${color} 0 2px, transparent 2px 9px)`, opacity: k, zIndex: 800000 }} />
  );
};

/** Dip: to black (or a colour) around a cut. */
export const Dip: React.FC<{ f: number; at: number; len?: number; color?: string; hold?: number }> = ({ f, at, len = 6, color = '#000', hold = 0 }) => {
  const u = f < at ? (f - (at - len)) / len : f < at + hold ? 1 : 1 - (f - at - hold) / len;
  if (u <= 0) return null;
  return <AbsoluteFill style={{ background: color, opacity: clamp(u), zIndex: 850000, pointerEvents: 'none' }} />;
};

/** Pixel stutter: quantize a frame to hold on n's (a machine dropping frames). */
export const hold = (f: number, n: number) => Math.floor(f / n) * n;

/** Speed ramp: remap film time so [a, b) plays at `rate` (slow motion) and catches up after. */
export const ramp = (f: number, a: number, b: number, rate: number) => (f < a ? f : f < b ? a + (f - a) * rate : a + (b - a) * rate + (f - b));
