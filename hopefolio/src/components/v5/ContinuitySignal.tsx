import { useEffect, useRef } from "react";
import Router from "next/router";

/**
 * ContinuitySignal — the one living thread.
 *
 * A single persistent 3D canvas mounted once in _app.tsx, above the router,
 * so the signal survives route changes. One chartreuse yarn in a volume of
 * ashen fibers, filmed by a perspective camera driven by scroll. The six
 * topologies (weave, handoff, aperture, branch, memory, resolve) are
 * keyframes of one continuous line — never separate decals.
 *
 * Every movement is a pure function of scroll and pointer. Ambient breath is
 * amplitude-budgeted and disabled entirely under prefers-reduced-motion.
 */

const N = 150;
const XSPAN = 700;
const SIGNAL = "#b7f34a";
const SIGNAL_DEEP = "#69902a";
const SIGNAL_HI = "#e2ffa1";

type V3 = [number, number, number];

export default function ContinuitySignal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let vw = 0;
    let vh = 0;
    let dpr = 1;
    let raf = 0;
    let disposed = false;
    let dirty = true;
    let lastAmbient = 0;
    let ambientT = 0;
    let pSmooth = 0;

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const smooth = (t: number) => t * t * (3 - 2 * t);
    const bumpAt = (p: number, c: number, w: number) => {
      const d = Math.abs(p - c) / w;
      return d >= 1 ? 0 : (1 - d * d) * (1 - d * d);
    };

    function mulberry32(a: number) {
      return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const rnd = mulberry32(20260715);

    // ---------- six topologies: [y, z] over u ----------
    const shapes: Array<(u: number) => [number, number]> = [
      (u) => [Math.sin(u * Math.PI * 6.5) * 190 * (1 - 0.65 * u), Math.sin(u * Math.PI * 5 + 0.9) * 120 * (1 - 0.5 * u)],
      (u) => {
        const y = u < 0.34 ? 105 : u > 0.62 ? -105 : lerp(105, -105, smooth((u - 0.34) / 0.28));
        return [y, Math.sin(u * Math.PI * 2 + 0.5) * 34];
      },
      (u) => [Math.sin(u * Math.PI) * 195, Math.sin(u * Math.PI * 2.4 + 1.2) * 44],
      (u) => {
        const y = u < 0.5 ? -10 : -10 + ((u - 0.5) / 0.5) * ((u - 0.5) / 0.5) * 195;
        return [y, u < 0.5 ? 0 : ((u - 0.5) / 0.5) * -90];
      },
      (u) => {
        const k = bumpAt(u, 0.62, 0.13);
        return [-Math.sin(u * Math.PI) * 32 + Math.sin((u - 0.62) * 34) * 76 * k, Math.cos((u - 0.62) * 34) * 52 * k];
      },
      (u) => [-54 + u * 96 - Math.sin(u * Math.PI) * 11, Math.sin(u * Math.PI + 0.4) * 24],
    ];
    const US: number[] = [];
    for (let i = 0; i < N; i++) US.push(i / (N - 1));

    // ---------- camera keyframes (site-tempered zoom range) ----------
    const CAMKF = [
      { p: 0.0, pos: [0, 130, 980] as V3, tgt: [0, 0, 0] as V3, fov: 55, roll: 0, track: 0.25 },
      { p: 0.1, pos: [-150, 85, 760] as V3, tgt: [-60, 0, 0] as V3, fov: 50, roll: 0, track: 0.4 },
      { p: 0.185, pos: [-300, 45, 560] as V3, tgt: [-200, -8, 0] as V3, fov: 42, roll: -0.01, track: 0.5 },
      { p: 0.26, pos: [-360, 35, 680] as V3, tgt: [-200, -8, 0] as V3, fov: 55, roll: -0.006, track: 0.45 },
      { p: 0.34, pos: [-130, 65, 620] as V3, tgt: [-40, 0, 0] as V3, fov: 48, roll: 0, track: 0.45 },
      { p: 0.42, pos: [0, -160, 470] as V3, tgt: [0, 90, 0] as V3, fov: 39, roll: 0.008, track: 0.25 },
      { p: 0.52, pos: [130, 25, 640] as V3, tgt: [120, 0, 0] as V3, fov: 48, roll: 0, track: 0.45 },
      { p: 0.6, pos: [320, 65, 560] as V3, tgt: [250, 10, 0] as V3, fov: 44, roll: 0.012, track: 0.55 },
      { p: 0.7, pos: [300, -30, 470] as V3, tgt: [235, 5, 0] as V3, fov: 40, roll: 0, track: 0.45 },
      { p: 0.78, pos: [265, -20, 380] as V3, tgt: [190, 5, 0] as V3, fov: 36, roll: -0.008, track: 0.4 },
      { p: 0.88, pos: [130, 160, 720] as V3, tgt: [70, 0, 0] as V3, fov: 48, roll: 0, track: 0.45 },
      { p: 1.0, pos: [10, 280, 940] as V3, tgt: [40, -10, 0] as V3, fov: 53, roll: 0, track: 0.55 },
    ];
    function camKF(p: number) {
      let a = CAMKF[0];
      let b = CAMKF[CAMKF.length - 1];
      for (let i = 0; i < CAMKF.length - 1; i++) {
        if (p >= CAMKF[i].p && p <= CAMKF[i + 1].p) {
          a = CAMKF[i];
          b = CAMKF[i + 1];
          break;
        }
      }
      const t = b.p === a.p ? 0 : smooth((p - a.p) / (b.p - a.p));
      const v3 = (ka: V3, kb: V3): V3 => [lerp(ka[0], kb[0], t), lerp(ka[1], kb[1], t), lerp(ka[2], kb[2], t)];
      return { pos: v3(a.pos, b.pos), tgt: v3(a.tgt, b.tgt), fov: lerp(a.fov, b.fov, t), roll: lerp(a.roll, b.roll, t), track: lerp(a.track, b.track, t) };
    }

    // ---------- pointer look ----------
    const look = { yaw: 0, pitch: 0, tyaw: 0, tpitch: 0 };
    const onPointer = (e: PointerEvent) => {
      look.tyaw = (e.clientX / Math.max(1, vw) - 0.5) * 0.09;
      look.tpitch = (e.clientY / Math.max(1, vh) - 0.5) * 0.06;
      schedule();
    };

    // ---------- seeded material (quieter than the concept demo) ----------
    const companions = Array.from({ length: 10 }, (_, c) => ({
      oy: (c % 2 ? -1 : 1) * (18 + rnd() * 105),
      oz: (rnd() - 0.5) * 240,
      wobA: 3 + rnd() * 10,
      wobF: 1.4 + rnd() * 3.0,
      wobP: rnd() * 6.28,
      swayP: rnd() * 6.28,
      swayA: 2 + rnd() * 3.5,
      alpha: 0.04 + rnd() * 0.08,
      w: 1.3,
    }));
    const bundles = [
      [-85, -120],
      [60, 90],
      [-140, 150],
    ].map((def) => ({
      oy: def[0],
      oz: def[1],
      wobA: 7 + rnd() * 11,
      wobF: 1.2 + rnd() * 2.2,
      wobP: rnd() * 6.28,
      swayP: rnd() * 6.28,
      swayA: 3 + rnd() * 4,
      strands: Array.from({ length: 6 + Math.floor(rnd() * 3) }, (_, s) => ({
        dy: (s - 3.5) * 3.4 + (rnd() - 0.5) * 1.8,
        dz: (rnd() - 0.5) * 8,
        alpha: 0.07 + rnd() * 0.09,
        w: 1.4,
      })),
    }));
    const hairs = Array.from({ length: 200 }, () => ({
      u: rnd(),
      side: rnd() < 0.5 ? -1 : 1,
      len: 5 + rnd() * 8,
      lean: (rnd() - 0.5) * 1.1,
      alpha: 0.1 + rnd() * 0.18,
      light: rnd() < 0.45,
    }));
    const motes = Array.from({ length: 70 }, () => ({
      x: (rnd() - 0.5) * 1500,
      y: (rnd() - 0.5) * 520,
      z: (rnd() - 0.5) * 420 + 40,
      r: 0.7 + rnd() * 1.1,
      alpha: 0.03 + rnd() * 0.07,
      dp: rnd() * 6.28,
      ds: 3 + rnd() * 6,
    }));
    const TWIST_F = 0.55;

    // ---------- camera ----------
    const cam = { pos: [0, 0, 900] as V3, right: [1, 0, 0] as V3, up: [0, 1, 0] as V3, fwd: [0, 0, -1] as V3, f: 500, roll: 0, focusDist: 600 };
    const vsub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    const vnorm = (a: V3): V3 => {
      const l = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]) || 1;
      return [a[0] / l, a[1] / l, a[2] / l];
    };
    const vcross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const vdot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

    function setCamera(pos: V3, tgt: V3, fovDeg: number, roll: number) {
      let rel = vsub(pos, tgt);
      const cy = Math.cos(look.yaw);
      const sy = Math.sin(look.yaw);
      rel = [rel[0] * cy + rel[2] * sy, rel[1], -rel[0] * sy + rel[2] * cy];
      const cp = Math.cos(look.pitch);
      const sp = Math.sin(look.pitch);
      rel = [rel[0], rel[1] * cp - rel[2] * sp, rel[1] * sp + rel[2] * cp];
      const p2: V3 = [tgt[0] + rel[0], tgt[1] + rel[1], tgt[2] + rel[2]];
      cam.pos = p2;
      cam.fwd = vnorm(vsub(tgt, p2));
      cam.right = vnorm(vcross(cam.fwd, [0, 1, 0]));
      cam.up = vcross(cam.right, cam.fwd);
      cam.f = vh / 2 / Math.tan((fovDeg * Math.PI) / 360);
      cam.roll = roll;
      const d = vsub(tgt, p2);
      cam.focusDist = Math.sqrt(vdot(d, d));
    }

    interface P2 {
      x: number;
      y: number;
      d: number;
      s: number;
      wBase?: number;
    }
    function proj(p: V3): P2 | null {
      const d = vsub(p, cam.pos);
      const z = vdot(d, cam.fwd);
      if (z < 40) return null;
      const x = vdot(d, cam.right);
      const y = vdot(d, cam.up);
      const s = cam.f / z;
      let sx = x * s;
      let sy = -y * s;
      if (cam.roll) {
        const cr = Math.cos(cam.roll);
        const sr = Math.sin(cam.roll);
        const rx = sx * cr - sy * sr;
        const ry = sx * sr + sy * cr;
        sx = rx;
        sy = ry;
      }
      return { x: vw / 2 + sx, y: vh / 2 + sy, d: z, s };
    }
    const fogOf = (d: number) => clamp(1.45 - d / 1500, 0.16, 1);
    const dofOf = (d: number) => clamp(Math.abs(d - cam.focusDist) / 340 - 0.18, 0, 1);

    // ---------- geometry ----------
    function centerline(p: number): V3[] {
      const seg = clamp(p, 0, 1) * 5;
      const i = Math.min(4, Math.floor(seg));
      const t = seg - i;
      const pts: V3[] = new Array(N);
      for (let k = 0; k < N; k++) {
        const u = US[k];
        const a = shapes[i](u);
        const b = shapes[i + 1](u);
        pts[k] = [-XSPAN + 2 * XSPAN * u, lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
      }
      return pts;
    }
    interface Frame {
      t: V3;
      n: V3;
      b: V3;
    }
    function frames(pts: V3[]): Frame[] {
      const out: Frame[] = new Array(pts.length);
      for (let i = 0; i < pts.length; i++) {
        const a = pts[Math.max(0, i - 1)];
        const b = pts[Math.min(pts.length - 1, i + 1)];
        const tx = vnorm(vsub(b, a));
        let nrm = vnorm(vcross(tx, [0, 0, 1]));
        if (!isFinite(nrm[0])) nrm = [0, 1, 0];
        out[i] = { t: tx, n: nrm, b: vcross(tx, nrm) };
      }
      return out;
    }
    function offset3(pts: V3[], fr: Frame[], oy: number, oz: number, wobA: number, wobF: number, wobP: number, swayA: number, swayP: number): V3[] {
      const out: V3[] = new Array(pts.length);
      for (let i = 0; i < pts.length; i++) {
        const u = US[i];
        const wob = Math.sin(u * Math.PI * wobF + wobP) * wobA;
        const sway = swayA ? Math.sin(ambientT * 0.45 + swayP + u * 2.6) * swayA : 0;
        const o = oy + wob + sway;
        out[i] = [pts[i][0] + fr[i].n[0] * o + fr[i].b[0] * oz, pts[i][1] + fr[i].n[1] * o + fr[i].b[1] * oz, pts[i][2] + fr[i].n[2] * o + fr[i].b[2] * oz];
      }
      return out;
    }
    const project = (pts: V3[]) => pts.map(proj);
    function meanDepth(sp: Array<P2 | null>) {
      let s = 0;
      let n = 0;
      for (let i = 0; i < sp.length; i += 20) {
        const q = sp[i];
        if (q) {
          s += q.d;
          n++;
        }
      }
      return n ? s / n : 1e9;
    }
    function strokeProjected(sp: Array<P2 | null>, from: number, to: number) {
      if (!ctx) return;
      ctx.beginPath();
      let started = false;
      for (let i = from; i <= to; i++) {
        const q = sp[i];
        if (!q) {
          started = false;
          continue;
        }
        if (!started) {
          ctx.moveTo(q.x, q.y);
          started = true;
        } else ctx.lineTo(q.x, q.y);
      }
      ctx.stroke();
    }

    function drawStrand(sp: Array<P2 | null>, colorRGB: string, alpha: number, wWorld: number) {
      if (!ctx) return;
      const d = meanDepth(sp);
      let q0: P2 | null = null;
      for (let i = 0; i < sp.length; i++) {
        if (sp[i]) {
          q0 = sp[i];
          break;
        }
      }
      if (!q0) return;
      const w = Math.max(0.4, wWorld * q0.s * 2.2);
      const fog = fogOf(d);
      const df = dofOf(d);
      ctx.lineCap = "round";
      if (df > 0.25) {
        ctx.strokeStyle = `rgba(${colorRGB},${(alpha * fog * 0.4).toFixed(3)})`;
        ctx.lineWidth = w * (1 + df * 2.6);
        strokeProjected(sp, 0, sp.length - 1);
      }
      ctx.strokeStyle = `rgba(${colorRGB},${(alpha * fog * (1 - df * 0.5)).toFixed(3)})`;
      ctx.lineWidth = w * (1 + df * 0.6);
      strokeProjected(sp, 0, sp.length - 1);
    }

    function ribbonFill(sp: Array<P2 | null>, from: number, to: number, widthMul: number, yOff: number, fillStyle: string, alphaMul: number) {
      if (!ctx) return;
      let runStart = -1;
      for (let i = from; i <= to + 1; i++) {
        const end = i > to || !sp[i];
        if (!end && runStart < 0) runStart = i;
        if (end && runStart >= 0) {
          const r0 = runStart;
          const r1 = i - 1;
          runStart = -1;
          if (r1 - r0 < 1) continue;
          const L: Array<[number, number]> = [];
          const R: Array<[number, number]> = [];
          for (let j = r0; j <= r1; j++) {
            const q = sp[j] as P2;
            const q2 = (sp[Math.min(r1, j + 1)] || q) as P2;
            const q0 = (sp[Math.max(r0, j - 1)] || q) as P2;
            const dx = q2.x - q0.x;
            const dy = q2.y - q0.y;
            const l = Math.sqrt(dx * dx + dy * dy) || 1;
            const nx = -dy / l;
            const ny = dx / l;
            const w = Math.max(0.8, (q.wBase || 2) * widthMul) / 2;
            L.push([q.x + nx * w, q.y + ny * w + yOff * ((q.wBase || 2) / 5)]);
            R.push([q.x - nx * w, q.y - ny * w + yOff * ((q.wBase || 2) / 5)]);
          }
          ctx.globalAlpha = alphaMul;
          ctx.fillStyle = fillStyle;
          ctx.beginPath();
          ctx.moveTo(L[0][0], L[0][1]);
          for (let a = 1; a < L.length; a++) ctx.lineTo(L[a][0], L[a][1]);
          for (let b = R.length - 1; b >= 0; b--) ctx.lineTo(R[b][0], R[b][1]);
          ctx.closePath();
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    }

    interface YarnOpts {
      color: string;
      deep: string;
      highlight: string;
      width: number;
      alpha?: number;
      fuzz?: boolean;
      glow?: boolean;
    }
    function drawYarn3D(sp: Array<P2 | null>, from: number, to: number, opts: YarnOpts) {
      if (!ctx || to <= from + 1) return;
      const a = opts.alpha == null ? 1 : opts.alpha;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = from; i <= to; i++) {
        const q = sp[i];
        if (q) q.wBase = Math.max(0.8, opts.width * q.s * 2.2) * (1 + dofOf(q.d) * 0.5);
      }
      const qm = sp[Math.floor((from + to) / 2)] || sp[from];
      const aa = a * (qm ? fogOf(qm.d) * (1 - dofOf(qm.d) * 0.3) : 1);

      ribbonFill(sp, from, to, 1.9, 3.4, "rgba(0,0,0,1)", 0.2 * aa);
      ribbonFill(sp, from, to, 1.36, 0, opts.deep, aa);
      ribbonFill(sp, from, to, 1.0, 0, opts.color, aa);

      ctx.lineWidth = 1.1;
      for (let ply = 0; ply < 2; ply++) {
        ctx.strokeStyle = ply === 0 ? opts.highlight : opts.deep;
        ctx.globalAlpha = a * (ply === 0 ? 0.75 : 0.5);
        ctx.beginPath();
        let started = false;
        for (let i = from; i <= to; i++) {
          const q = sp[i];
          if (!q) {
            started = false;
            continue;
          }
          const q2 = sp[Math.min(to, i + 1)] || q;
          const dx = q2.x - q.x;
          const dy = q2.y - q.y;
          const l = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = -dy / l;
          const ny = dx / l;
          const w2 = Math.max(0.8, opts.width * q.s * 2.2);
          const tw = Math.sin(i * TWIST_F + ply * Math.PI) * w2 * 0.36;
          const x = q.x + nx * tw;
          const y = q.y + ny * tw;
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      if (opts.fuzz) {
        for (let f = 0; f < hairs.length; f++) {
          const hr = hairs[f];
          const idx = Math.round(hr.u * (N - 1));
          if (idx < from || idx > to) continue;
          const q3 = sp[idx];
          if (!q3) continue;
          const q4 = sp[Math.min(to, idx + 1)] || q3;
          const dx2 = q4.x - q3.x;
          const dy2 = q4.y - q3.y;
          const l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) || 1;
          const nx2 = -dy2 / l2;
          const ny2 = dx2 / l2;
          const w3 = Math.max(0.8, opts.width * q3.s * 2.2);
          const bx = q3.x + nx2 * hr.side * w3 * 0.5;
          const by = q3.y + ny2 * hr.side * w3 * 0.5;
          const hx = nx2 * hr.side + (dx2 / l2) * hr.lean;
          const hy = ny2 * hr.side + (dy2 / l2) * hr.lean;
          const hl = hr.len * q3.s * 2.0;
          ctx.strokeStyle = hr.light ? opts.highlight : opts.color;
          ctx.globalAlpha = a * hr.alpha * fogOf(q3.d);
          ctx.lineWidth = Math.max(0.5, 0.55 * q3.s * 2.2);
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(bx + hx * hl, by + hy * hl);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      if (opts.glow) {
        ctx.globalCompositeOperation = "lighter";
        const qg = sp[Math.floor((from + to) / 2)];
        const wg = qg ? Math.max(1, opts.width * qg.s * 2.2) : 4;
        ctx.strokeStyle = opts.color;
        ctx.globalAlpha = 0.03 * a;
        ctx.lineWidth = wg * 5.2;
        strokeProjected(sp, from, to);
        ctx.globalAlpha = 0.045 * a;
        ctx.lineWidth = wg * 3.2;
        strokeProjected(sp, from, to);
        ctx.globalAlpha = 0.06 * a;
        ctx.lineWidth = wg * 1.9;
        strokeProjected(sp, from, to);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }
    }

    // ---------- render ----------
    let lastP = -9;
    function frame(now?: number) {
      raf = 0;
      if (disposed || !ctx) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;

      // the thread never snaps: route changes and jumps ease into place
      if (reduceMotion) pSmooth = p;
      else pSmooth += (p - pSmooth) * 0.16;
      const easing = Math.abs(p - pSmooth) > 0.0015;

      look.yaw += (look.tyaw - look.yaw) * 0.14;
      look.pitch += (look.tpitch - look.pitch) * 0.14;
      const lookMoving = Math.abs(look.tyaw - look.yaw) > 0.0015 || Math.abs(look.tpitch - look.pitch) > 0.0015;

      if (!reduceMotion) ambientT = (now || performance.now()) / 1000;
      if (!dirty && Math.abs(pSmooth - lastP) < 0.0004 && !lookMoving && !easing && reduceMotion) return;
      lastP = pSmooth;
      dirty = false;

      const pv = pSmooth;
      const pts = centerline(pv);
      const fr = frames(pts);

      const nodeF = clamp(pv, 0, 1) * (N - 1);
      const ni = Math.floor(nodeF);
      const nt = nodeF - ni;
      const npt = pts[ni];
      const npt2 = pts[Math.min(N - 1, ni + 1)];
      const node: V3 = [lerp(npt[0], npt2[0], nt), lerp(npt[1], npt2[1], nt), lerp(npt[2], npt2[2], nt)];
      const pulse = reduceMotion ? 0 : Math.sin(ambientT * 1.1) * 0.08;

      const k = camKF(pv);
      const orb = bumpAt(pv, 0.78, 0.09) * 0.45;
      const tgt: V3 = [lerp(k.tgt[0], node[0], k.track), lerp(k.tgt[1], node[1], k.track * 0.8), lerp(k.tgt[2], node[2], k.track * 0.6)];
      let pos: V3 = [...k.pos];
      if (orb > 0.001) {
        const rel = vsub(pos, tgt);
        const co = Math.cos(orb);
        const so = Math.sin(orb);
        pos = [tgt[0] + rel[0] * co + rel[2] * so, pos[1], tgt[2] - rel[0] * so + rel[2] * co];
      }
      setCamera(pos, tgt, k.fov, k.roll);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);

      const items: Array<{ d: number; fn: () => void }> = [];
      for (const cm of companions) {
        const sp = project(offset3(pts, fr, cm.oy, cm.oz, cm.wobA, cm.wobF, cm.wobP, cm.swayA, cm.swayP));
        items.push({ d: meanDepth(sp), fn: () => drawStrand(sp, "226,222,208", cm.alpha, cm.w) });
      }
      for (const bd of bundles) {
        let spMid: Array<P2 | null> = [];
        const fns: Array<() => void> = [];
        bd.strands.forEach((st, s2) => {
          const sp3 = project(offset3(pts, fr, bd.oy + st.dy, bd.oz + st.dz, bd.wobA, bd.wobF, bd.wobP, bd.swayA, bd.swayP));
          if (s2 === Math.floor(bd.strands.length / 2)) spMid = sp3;
          fns.push(() => drawStrand(sp3, "232,228,214", st.alpha, st.w));
        });
        items.push({ d: meanDepth(spMid), fn: () => fns.forEach((f) => f()) });
      }
      for (const mo of motes) {
        const drift = reduceMotion ? 0 : 1;
        const wp: V3 = [
          mo.x + Math.sin(ambientT / mo.ds + mo.dp) * 14 * drift,
          mo.y + Math.cos(ambientT / mo.ds + mo.dp * 1.7) * 9 * drift,
          mo.z + Math.sin(ambientT / (mo.ds * 1.3) + mo.dp * 0.6) * 10 * drift,
        ];
        const q6 = proj(wp);
        if (!q6) continue;
        items.push({
          d: q6.d,
          fn: () => {
            if (!ctx) return;
            const df = dofOf(q6.d);
            ctx.fillStyle = `rgba(226,230,210,${(mo.alpha * fogOf(q6.d) * (1 - df * 0.4)).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(q6.x, q6.y, Math.max(0.4, mo.r * q6.s * 2.2 * (1 + df * 2.2)), 0, Math.PI * 2);
            ctx.fill();
          },
        });
      }

      const spC = project(pts);
      const qNode = proj(node);
      items.push({
        d: qNode ? qNode.d : meanDepth(spC),
        fn: () => {
          if (!ctx) return;
          // handoff registration: heat/cold split then converge
          const hw = bumpAt(pv, 0.22, 0.13);
          if (hw > 0.004) {
            const regSplit = clamp((0.34 - pv) / 0.18, 0, 1);
            const off = 9 + regSplit * 22;
            const spH = project(offset3(pts, fr, -off, 0, 0, 1, 0, 0, 0));
            const spCo = project(offset3(pts, fr, off, 0, 0, 1, 0, 0, 0));
            drawYarn3D(spH, 0, N - 1, { color: "rgba(214,154,69,1)", deep: "rgba(140,94,38,1)", highlight: "rgba(238,196,132,1)", width: 3.0, alpha: 0.55 * hw });
            drawYarn3D(spCo, 0, N - 1, { color: "rgba(127,138,134,1)", deep: "rgba(78,88,84,1)", highlight: "rgba(186,196,192,1)", width: 3.0, alpha: 0.55 * hw });
          }
          // resolve: the two temperatures rejoin
          const rw = bumpAt(pv, 0.93, 0.09);
          if (rw > 0.004) {
            const rejoin = clamp((0.985 - pv) / 0.055, 0, 1);
            const roff = 3 + rejoin * 15;
            const spRh = project(offset3(pts, fr, -roff, 0, 0, 1, 0, 0, 0));
            const spRc = project(offset3(pts, fr, roff, 0, 0, 1, 0, 0, 0));
            drawYarn3D(spRh, 0, N - 1, { color: "rgba(214,154,69,1)", deep: "rgba(140,94,38,1)", highlight: "rgba(238,196,132,1)", width: 2.6, alpha: 0.45 * rw * (0.25 + 0.75 * rejoin) });
            drawYarn3D(spRc, 0, N - 1, { color: "rgba(127,138,134,1)", deep: "rgba(78,88,84,1)", highlight: "rgba(186,196,192,1)", width: 2.6, alpha: 0.45 * rw * (0.25 + 0.75 * rejoin) });
          }
          // route ahead (unlit) + travelled (lit)
          drawYarn3D(spC, Math.max(0, ni - 1), N - 1, { color: "rgba(122,138,84,1)", deep: "rgba(70,82,48,1)", highlight: "rgba(150,166,110,1)", width: 2.6, alpha: 0.22 });
          drawYarn3D(spC, 0, Math.max(1, ni), { color: SIGNAL, deep: SIGNAL_DEEP, highlight: SIGNAL_HI, width: 4.6, alpha: 0.92, fuzz: true, glow: true });

          if (qNode) {
            const nr = 6 * qNode.s * 2.2 * (1 + pulse);
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            const g2 = ctx.createRadialGradient(qNode.x, qNode.y, 0, qNode.x, qNode.y, nr * 6);
            g2.addColorStop(0, "rgba(183,243,74,0.42)");
            g2.addColorStop(1, "rgba(183,243,74,0)");
            ctx.fillStyle = g2;
            ctx.beginPath();
            ctx.arc(qNode.x, qNode.y, nr * 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "#dcff8f";
            ctx.beginPath();
            ctx.arc(qNode.x, qNode.y, nr, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "rgba(183,243,74,0.6)";
            ctx.lineWidth = Math.max(1, nr * 0.26);
            ctx.beginPath();
            ctx.arc(qNode.x, qNode.y, nr * 2, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        },
      });

      items.sort((a, b) => b.d - a.d);
      for (const it of items) it.fn();

      if (lookMoving || easing) schedule();
    }

    function schedule() {
      if (!raf && !disposed) raf = requestAnimationFrame(frame);
    }
    function resize() {
      vw = window.innerWidth || 1440;
      vh = window.innerHeight || 900;
      dpr = Math.min(window.devicePixelRatio || 1, vw > 1600 ? 1.5 : 2);
      canvas!.width = Math.round(vw * dpr);
      canvas!.height = Math.round(vh * dpr);
      dirty = true;
      schedule();
    }
    const onRoute = () => {
      dirty = true;
      schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    Router.events.on("routeChangeComplete", onRoute);

    let tickId = 0;
    if (!reduceMotion) {
      const tick = (now: number) => {
        if (disposed) return;
        if (document.visibilityState === "visible" && now - lastAmbient > 33) {
          lastAmbient = now;
          dirty = true;
          schedule();
        }
        tickId = requestAnimationFrame(tick);
      };
      tickId = requestAnimationFrame(tick);
    }

    resize();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      if (tickId) cancelAnimationFrame(tickId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      Router.events.off("routeChangeComplete", onRoute);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
