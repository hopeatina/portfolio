import alma from '../data/grid_alma.json';
import perfpulse from '../data/grid_perfpulse.json';
import openclaw from '../data/grid_openclaw.json';
import brainbuffet from '../data/grid_brainbuffet.json';
import neuromosaic from '../data/grid_neuromosaic.json';
import chaosriders from '../data/grid_chaosriders.json';
import meridian from '../data/grid_meridian.json';

export type Grid = { track: string; bpm: number; beatF: number; beats: number[]; downbeats: number[]; drop: number; button: number };
export const GRIDS: Record<string, Grid> = { alma, perfpulse, openclaw, brainbuffet, neuromosaic, chaosriders, meridian } as Record<string, Grid>;
export const FPS = 60;
export const DUR = 900;
/** nth beat at or after frame f */
export const beatAfter = (g: Grid, f: number, n = 0) => {
  const i = g.beats.findIndex((b) => b >= f - 0.5);
  return Math.round(g.beats[Math.min(g.beats.length - 1, Math.max(0, i) + n)]);
};
/** pulse 1→0 decaying after each beat (for breathing on the grid) */
export const beatPulse = (g: Grid, f: number, tau = 6, from = 0, to = 1e9) => {
  let p = 0;
  for (const b of g.beats) if (b >= from && b <= to && f >= b) p = Math.max(p, Math.exp(-(f - b) / tau));
  return p;
};
