import { Easing, interpolate } from 'remotion';

/** Film house ease (brand pack motion.filmHouseEase). ~90% of all moves. */
export const HOUSE = Easing.bezier(0.22, 1, 0.36, 1);
/** UI resolve ease (brand pack motion.uiEase) — data settles on this. */
export const RESOLVE = Easing.bezier(0.16, 1, 0.3, 1);
/** Accelerating ease for moves that exit through camera (fly-throughs). */
export const ACCEL = Easing.bezier(0.6, 0, 0.9, 0.35);
/** Symmetric move for camera travel between two held states. */
export const TRAVEL = Easing.bezier(0.65, 0, 0.25, 1);

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** Tween between frames f0..f1 from a to b, clamped, on the given ease. */
export const tw = (
  f: number,
  f0: number,
  f1: number,
  a = 0,
  b = 1,
  ease: (t: number) => number = HOUSE
): number =>
  interpolate(f, [f0, f1], [a, b], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Linear progress 0..1 across f0..f1, clamped. */
export const prog = (f: number, f0: number, f1: number) =>
  clamp((f - f0) / Math.max(1e-6, f1 - f0));

/**
 * Commit-with-weight: a 1-frame-ish anticipation dip, fast attack, and a
 * <=3% overshoot that settles. Only for non-data objects (data never
 * overshoots its true value).
 */
export const settle = (t: number, overshoot = 0.9): number => {
  const x = clamp(t);
  const s = overshoot;
  const u = x - 1;
  return 1 + (s + 1) * u * u * u + s * u * u;
};

/** Stepped time: quantize a frame to every n frames (animating "on n's"). */
export const onN = (f: number, n: number) => Math.floor(f / n) * n;
