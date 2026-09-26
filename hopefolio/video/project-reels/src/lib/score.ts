/**
 * v4 score sync: the picture keys to sub-elements of the composed track, not just
 * the drop. hits_<proj>.json holds measured kick / snare / hat onsets and
 * harmonic note onsets (HPSS) in film frames; grid_<proj>.json holds the
 * composed beat grid and named markers.
 */
import { Easing } from 'remotion';
export type Hits = { kick: [number, number][]; snare: [number, number][]; hat: [number, number][]; note: number[]; energy: number[] };
export const at = (l: ([number, number] | number)[]) => l.map((h) => (Array.isArray(h) ? h[0] : h));
/** 1 → 0 exponential after the most recent hit at or before f */
export const pulse = (frames: number[], f: number, tau = 6) => {
  let p = 0;
  for (const h of frames) if (f >= h) p = Math.max(p, Math.exp(-(f - h) / tau));
  return p;
};
/** how many hits have happened by frame f (between from and to) */
export const count = (frames: number[], f: number, from = -1e9, to = 1e9) => frames.filter((h) => h <= f && h >= from && h <= to).length;
/** hits in a window, as a list */
export const within = (frames: number[], from: number, to: number) => frames.filter((h) => h >= from && h < to);
/** Anticipate → move → settle: a tiny pull back before a committed move. */
export const ANTIC = Easing.bezier(0.45, -0.18, 0.2, 1);
/** Cinematic travel: slow out, fast middle, long settle. */
export const CINE = Easing.bezier(0.7, 0, 0.16, 1);
/** Deterministic handheld in screen space (px, deg) */
export const handheld = (f: number, px: number, deg = 0, seed = 1) => ({
  x: px * (Math.sin(f / 23 + seed) * 0.6 + Math.sin(f / 9.7 + seed * 2) * 0.3 + Math.sin(f / 4.1 + seed * 3) * 0.1),
  y: px * (Math.sin(f / 19 + seed * 5) * 0.6 + Math.sin(f / 7.3 + seed) * 0.3 + Math.sin(f / 3.7 + seed * 7) * 0.1),
  r: deg * (Math.sin(f / 31 + seed) * 0.7 + Math.sin(f / 11 + seed * 3) * 0.3),
});
/** Subliminal: true for `len` frames from `from` (a 6–8 frame rewatch layer). */
export const sub = (f: number, from: number, len = 7) => f >= from && f < from + len;
