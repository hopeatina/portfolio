import { random } from 'remotion';
import { noise2D } from '@remotion/noise';
import { monotone } from './spline';

/**
 * The shared 3D engine for every project film (ported from the OrgX reel):
 * one keyed orbit camera per film, and an exact per-plane perspective
 * transform computed in JS (affine when the plane is nearly flat to the lens,
 * a true homography only when it is close and oblique). World units are px:
 * x right, y DOWN, z toward the viewer.
 */
export type Vec3 = { x: number; y: number; z: number };
export type Cam = { x: number; y: number; z: number; yaw: number; pitch: number; roll: number; f: number };

export const FOCAL = 1000;
const W2 = 960;
const H2 = 540;
export const DEG = Math.PI / 180;
export const X: Vec3 = { x: 1, y: 0, z: 0 };
export const Y: Vec3 = { x: 0, y: 1, z: 0 };
export const Z: Vec3 = { x: 0, y: 0, z: 1 };
export const v3 = (x: number, y: number, z: number): Vec3 => ({ x, y, z });
export const vadd = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
export const vscale = (a: Vec3, k: number): Vec3 => ({ x: a.x * k, y: a.y * k, z: a.z * k });
export const vlerp = (a: Vec3, b: Vec3, t: number): Vec3 => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t });

type Basis = { cy: number; sy: number; cp: number; sp: number; cr: number; sr: number };
const basis = (cam: Cam): Basis => ({
  cy: Math.cos(-cam.yaw),
  sy: Math.sin(-cam.yaw),
  cp: Math.cos(-cam.pitch),
  sp: Math.sin(-cam.pitch),
  cr: Math.cos(cam.roll),
  sr: Math.sin(cam.roll),
});
const rot = (b: Basis, x: number, y: number, z: number) => {
  const x1 = x * b.cy + z * b.sy;
  const z1 = -x * b.sy + z * b.cy;
  const y2 = y * b.cp - z1 * b.sp;
  const z2 = y * b.sp + z1 * b.cp;
  return { X: x1 * b.cr - y2 * b.sr, Y: x1 * b.sr + y2 * b.cr, Z: -z2 };
};

export const project = (cam: Cam, p: Vec3) => {
  const q = rot(basis(cam), p.x - cam.x, p.y - cam.y, p.z - cam.z);
  const s = cam.f / Math.max(1e-3, q.Z);
  return { sx: W2 + q.X * s, sy: H2 + q.Y * s, s, d: q.Z };
};

export type Placed = { transform: string; s: number; d: number; facing: number; sx: number; sy: number; back: boolean };

/** Exact perspective for a w×h element at (0,0), transform-origin 0 0; c = centre, U/V = local +x/+y in world. */
export const placePlane = (cam: Cam, c: Vec3, U0: Vec3, V: Vec3, w: number, h: number, near = 30): Placed | null => {
  const b = basis(cam);
  const N = { x: U0.y * V.z - U0.z * V.y, y: U0.z * V.x - U0.x * V.z, z: U0.x * V.y - U0.y * V.x };
  const toEye = { x: cam.x - c.x, y: cam.y - c.y, z: cam.z - c.z };
  const el = Math.hypot(toEye.x, toEye.y, toEye.z) || 1;
  const cosN = (N.x * toEye.x + N.y * toEye.y + N.z * toEye.z) / el;
  const back = cosN < 0;
  const U = back ? { x: -U0.x, y: -U0.y, z: -U0.z } : U0;
  const P0 = { x: c.x - (U.x * w + V.x * h) / 2, y: c.y - (U.y * w + V.y * h) / 2, z: c.z - (U.z * w + V.z * h) / 2 };
  const X0 = rot(b, P0.x - cam.x, P0.y - cam.y, P0.z - cam.z);
  const A = rot(b, U.x, U.y, U.z);
  const B = rot(b, V.x, V.y, V.z);
  const z10 = X0.Z + A.Z * w;
  const z01 = X0.Z + B.Z * h;
  if (Math.min(X0.Z, z10, z01, z10 + B.Z * h) < near) return null;
  const f = cam.f;
  const scr = (u: number, v: number) => {
    const Zc = X0.Z + A.Z * u + B.Z * v;
    return [W2 + (f * (X0.X + A.X * u + B.X * v)) / Zc, H2 + (f * (X0.Y + A.Y * u + B.Y * v)) / Zc];
  };
  const q = [scr(0, 0), scr(w, 0), scr(0, h), scr(w, h)];
  const bx0 = Math.min(q[0][0], q[1][0], q[2][0], q[3][0]);
  const bx1 = Math.max(q[0][0], q[1][0], q[2][0], q[3][0]);
  const by0 = Math.min(q[0][1], q[1][1], q[2][1], q[3][1]);
  const by1 = Math.max(q[0][1], q[1][1], q[2][1], q[3][1]);
  if (bx1 < -400 || bx0 > 2320 || by1 < -400 || by0 > 1480) return null;
  const L = scr(0, h / 2);
  const Rr = scr(w, h / 2);
  const Tp = scr(w / 2, 0);
  const Bm = scr(w / 2, h);
  const C = scr(w / 2, h / 2);
  const ax = (Rr[0] - L[0]) / w;
  const ay = (Rr[1] - L[1]) / w;
  const bx = (Bm[0] - Tp[0]) / h;
  const by = (Bm[1] - Tp[1]) / h;
  const d0 = X0.Z;
  const g = A.Z / d0;
  const hh = B.Z / d0;
  let transform: string;
  if (Math.abs(g) * w + Math.abs(hh) * h < 0.035) {
    const tx = C[0] - (ax * w) / 2 - (bx * h) / 2;
    const ty = C[1] - (ay * w) / 2 - (by * h) / 2;
    transform = `matrix(${ax},${ay},${bx},${by},${tx},${ty})`;
  } else {
    const a = (f * A.X + W2 * A.Z) / d0;
    const bb = (f * B.X + W2 * B.Z) / d0;
    const cc = (f * X0.X + W2 * d0) / d0;
    const dd = (f * A.Y + H2 * A.Z) / d0;
    const e = (f * B.Y + H2 * B.Z) / d0;
    const ff = (f * X0.Y + H2 * d0) / d0;
    transform = `matrix3d(${a},${dd},0,${g},${bb},${e},0,${hh},0,0,1,0,${cc},${ff},0,1)`;
  }
  return { transform, s: Math.min(Math.hypot(ax, ay), Math.hypot(bx, by)), d: X0.Z + (A.Z * w + B.Z * h) / 2, facing: Math.abs(cosN), sx: C[0], sy: C[1], back };
};

/** Rotate unit vector U about unit axis Ax by angle a (U ⊥ Ax). */
export const spinAbout = (U: Vec3, Ax: Vec3, a: number): Vec3 => {
  const n = { x: Ax.y * U.z - Ax.z * U.y, y: Ax.z * U.x - Ax.x * U.z, z: Ax.x * U.y - Ax.y * U.x };
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: U.x * c + n.x * s, y: U.y * c + n.y * s, z: U.z * c + n.z * s };
};

export const orbit = (t: Vec3, d: number, yaw: number, pitch: number, roll: number, f = FOCAL): Cam => ({
  x: t.x + d * Math.sin(yaw) * Math.cos(pitch),
  y: t.y - d * Math.sin(pitch),
  z: t.z + d * Math.cos(yaw) * Math.cos(pitch),
  yaw,
  pitch,
  roll,
  f,
});

/** Focal length in px for a full-frame lens in mm (36 mm sensor across 1920 px): 18 mm ≈ the old FOCAL. */
export const mm = (lens: number) => (960 * lens) / 18;

/**
 * [frame, target x, y, z, distance, yaw°, pitch°, roll°, lens mm?] — every channel a monotone cubic
 * (a graph editor). The lens channel lets a shot push in on a 35 or pull a dolly-zoom on an 85.
 */
export type Key = [number, number, number, number, number, number, number, number, number?];
export type Shake = { frames: number[]; tau?: number; punch?: number; px?: number };
/** Handheld: slow noise drift in screen px and degrees of roll (an operator breathing). */
export type Hand = { px: number; roll?: number; hz?: number };

export const keyedCamera = (keys: Key[], shakes: Shake[] = [], hand?: Hand) => {
  const xs = keys.map((k) => k[0]);
  for (let i = 1; i < xs.length; i++) if (!(xs[i] > xs[i - 1])) throw new Error(`camera keys must be strictly increasing: key ${i} at frame ${xs[i]} follows ${xs[i - 1]}`);
  const ch = (i: number, m: (v: number) => number = (v) => v, dflt = 0) => monotone(xs, keys.map((k) => m(k[i] ?? dflt)));
  const TX = ch(1);
  const TY = ch(2);
  const TZ = ch(3);
  const LD = ch(4, Math.log);
  const YA = ch(5);
  const PI = ch(6);
  const RO = ch(7);
  const LENS = ch(8, (v) => v, 18);
  const kickAt = (f: number) => {
    let k = 0;
    let p = 0;
    let px = 0;
    for (const s of shakes)
      for (const kf of s.frames)
        if (f >= kf) {
          const e = Math.exp(-(f - kf) / (s.tau ?? 5));
          if (e > k) {
            k = e;
            p = s.punch ?? 0.04;
            px = s.px ?? 6;
          }
        }
    return { k, p, px };
  };
  const at = (f: number): Cam => {
    const focal = mm(LENS(f));
    let d = Math.exp(LD(f));
    const { k, p, px } = kickAt(f);
    d *= 1 - p * k;
    const fi = Math.floor(f);
    const u = (d / focal) * px * k;
    let hx = 0;
    let hy = 0;
    let hr = 0;
    if (hand) {
      const t = (f / 60) * (hand.hz ?? 0.6);
      const w = d / focal;
      hx = noise2D('hx', t, 0) * hand.px * w;
      hy = noise2D('hy', t, 3.1) * hand.px * 0.8 * w;
      hr = noise2D('hr', t, 7.7) * (hand.roll ?? 0.6);
    }
    const T = { x: TX(f) + (random(`kx${fi}`) - 0.5) * 2 * u + hx, y: TY(f) + (random(`ky${fi}`) - 0.5) * 1.4 * u + hy, z: TZ(f) };
    return orbit(T, d, YA(f) * DEG, PI(f) * DEG, (RO(f) + hr) * DEG, focal);
  };
  return { at, kickAt: (f: number) => kickAt(f).k, dist: (f: number) => Math.exp(LD(f)) };
};

/**
 * An edit: several shots, each its own camera (keys in film frames), hard cuts between them.
 * A shot runs from its `from` until the next shot's `from`.
 */
export type ShotDef = { name: string; from: number; keys: Key[]; kicks?: Shake[]; hand?: Hand };
export const edit = (shots: ShotDef[]) => {
  const cams = shots.map((s) => keyedCamera(s.keys, s.kicks, s.hand));
  const index = (f: number) => {
    let i = 0;
    for (let k = 0; k < shots.length; k++) if (f >= shots[k].from) i = k;
    return i;
  };
  return {
    shots,
    index,
    at: (f: number) => {
      const i = index(f);
      return { cam: cams[i].at(f), shot: shots[i], i, local: f - shots[i].from, focus: cams[i].dist(f) };
    },
  };
};
