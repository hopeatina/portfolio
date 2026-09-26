import React from 'react';
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { Cam, Key, Vec3, X, Y, Z, edit, project, v3, vlerp } from '../lib/space';
import { Blur, Box, DofCtx, Fog, Plane, polyline } from '../lib/World';
import { Bokeh, Glow, Grade, Letterbox } from '../lib/Env';
import { BrandEnd } from '../lib/BrandEnd';
import cues from '../data/cues_neuromosaic.json';

/**
 * NEUROMOSAIC v3: "A paper, shattered into an architecture."
 * A research desk at night, a lamp raking across a real page. The build is all
 * snare: every snare hard-cuts to a new macro angle as a phrase lights and
 * then breaks free of the paper as a tile. The tiles gather above the desk
 * and the camera makes the film's only orbit as they lock into a sphere,
 * which becomes Neuromosaic's own mark. On the drop the sphere implodes into
 * one vector; the camera dollies along it into generated code, a version,
 * and a recorded run, which threads back to the exact tiles. Run values are
 * illustrative and labelled. The page keeps the holes.
 */
const g = GRIDS.neuromosaic;
const C = cues.cue;
const D = C.drop;
const VIO = '#8b5cf6';
const BLUE = '#3b82f6';
const MAG = '#e879f9';
const SANS = 'system-ui, -apple-system, Helvetica Neue, sans-serif';
const FOG: Fog = { near: 3000, far: 9000 };
const FORM = 368;

const PW = 1100;
const PH = 1400;
const PAGE = v3(0, -2, 0); // lying flat on the desk (top edge far)
const PHRASES = [
  ['3.1', 'We stack ', '12 layers', ' of encoder blocks'],
  ['3.1', 'with a hidden size of ', '768', '.'],
  ['3.2', 'Multi-head attention over ', '12 heads', '.'],
  ['3.3', 'The feed-forward block uses ', 'SwiGLU', ','],
  ['3.4', 'with ', 'pre-norm', ' residual connections'],
  ['5.1', 'and ', 'GELU', ' elsewhere in training.'],
];
const TILES = [
  { k: 'layers', v: '12', kind: 'range', lo: 2, hi: 48, n: 12 },
  { k: 'hidden', v: '768', kind: 'range', lo: 128, hi: 4096, n: 768 },
  { k: 'heads', v: '12', kind: 'range', lo: 1, hi: 32, n: 12 },
  { k: 'ffn', v: 'SwiGLU', kind: 'chip' },
  { k: 'norm', v: 'pre-norm', kind: 'chip' },
  { k: 'act', v: 'GELU', kind: 'chip' },
];
const CODE = ['class Block(nn.Module):', '    def __init__(self, d=768, h=12):', '        self.attn = MultiHead(d, h)', '        self.ffn = SwiGLU(d)', '        self.norm = PreNorm(d)', 'model = Stack(Block, n=12)'];
const lineY = (i: number) => 330 + i * 170;
// the highlighted word's centre on the page (serif at 40px ≈ 19px a character)
const hlX = (i: number) => 90 + 52 + PHRASES[i][1].length * 19 + PHRASES[i][2].length * 11;
const phraseWorld = (i: number): Vec3 => v3(PAGE.x - PW / 2 + hlX(i), -4, PAGE.z - PH / 2 + lineY(i) + 30);

// the sphere: a fibonacci shell of tiles (the six named ones sit on its equator facing us)
const M = v3(0, -1150, -300);
const R = 640;
const NT = 42;
const shell = new Array(NT).fill(0).map((_, k) => {
  const y = 1 - (2 * (k + 0.5)) / NT;
  const r = Math.sqrt(1 - y * y);
  const th = k * 2.39996;
  return { n: v3(r * Math.cos(th), -y, r * Math.sin(th)) };
});
const named = [0, 1, 2, 3, 4, 5].map((i) => ({ n: v3(Math.sin(-0.9 + i * 0.36), 0.12 * (i % 2 ? 1 : -1), Math.cos(-0.9 + i * 0.36)) }));
const cross = (a: Vec3, b: Vec3) => v3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
const norm = (a: Vec3) => {
  const l = Math.hypot(a.x, a.y, a.z) || 1;
  return v3(a.x / l, a.y / l, a.z / l);
};
const frameOn = (n: Vec3, spin: number) => {
  // rotate the sphere about the vertical axis by `spin`
  const c = Math.cos(spin);
  const s = Math.sin(spin);
  const nn = v3(n.x * c + n.z * s, n.y, -n.x * s + n.z * c);
  const U = norm(cross(nn, v3(0, -1, 0)));
  const V = cross(nn, U);
  return { p: v3(M.x + nn.x * R, M.y + nn.y * R, M.z + nn.z * R), U: Math.hypot(U.x, U.y, U.z) < 0.01 ? X : U, V };
};
const spinAt = (f: number) => (f - C.gather) * 0.012;
const CELL = 104;
const cellPos = (k: number) => v3(-2300 + k * (CELL + 10), -1150, -300);
const NCELL = 6 + NT;
const CODE_C = v3(cellPos(NCELL).x + 950, -1250, -400);
const RUN_C = v3(CODE_C.x + 1400, -1250, -400);

const macroOn = (i: number, from: number, to: number, roll: number, yaw: number): { name: string; from: number; keys: Key[]; hand: { px: number; roll: number } } => {
  const p = phraseWorld(i);
  return { name: `phrase${i}`, from, keys: [[from, p.x, p.y, p.z, 1150, yaw, 38, roll, 100], [to, p.x, p.y - 160, p.z, 1250, yaw * 0.7, 30, roll * 0.6, 100]], hand: { px: 3, roll: 0.2 } };
};
const EDIT = edit([
  macroOn(0, 0, C.glow[1], -6, -14),
  macroOn(1, C.glow[1], C.glow[2], 5, 18),
  macroOn(2, C.glow[2], C.glow[3], -4, -24),
  macroOn(3, C.glow[3], C.glow[4], 7, 10),
  macroOn(4, C.glow[4], C.glow[5], -5, -8),
  { name: 'rise', from: C.glow[5], keys: [[C.glow[5], 0, -300, -200, 2600, 0, 42, 0, 35], [C.gather, 0, -900, -300, 3200, 10, 20, 0, 35]] },
  { name: 'orbit', from: C.gather, keys: [[C.gather, M.x, M.y, M.z, 2700, 10, 12, 0, 35], [FORM, M.x, M.y, M.z, 2300, 70, 6, 0, 35], [D - 4, M.x, M.y, M.z, 2150, 88, 4, 0, 35]] },
  { name: 'vector', from: D, keys: [[D, M.x, M.y, M.z, 2150, 88, 4, 0, 35], [D + 22, cellPos(0).x, -1150, -300, 700, 64, 6, 0, 24], [C.code[0] + 6, cellPos(NCELL - 6).x, -1150, -300, 760, 58, 5, 0, 24]], kicks: [{ frames: [D], tau: 6, punch: 0.05, px: 12 }] },
  { name: 'code', from: C.code[0] + 6, keys: [[C.code[0] + 6, cellPos(NCELL - 6).x, -1150, -300, 760, 58, 5, 0, 24], [C.code[2], CODE_C.x, CODE_C.y, CODE_C.z, 1150, 6, 2, 0, 35], [C.version + 10, CODE_C.x, CODE_C.y, CODE_C.z, 1100, 4, 2, 0, 35]] },
  { name: 'run', from: C.run - 20, keys: [[C.run - 20, CODE_C.x + 500, CODE_C.y, CODE_C.z, 1300, 0, 2, 0, 35], [C.run + 6, RUN_C.x, RUN_C.y, RUN_C.z, 1200, -6, 2, 0, 35], [C.attach - 4, RUN_C.x - 200, RUN_C.y, RUN_C.z, 1450, -4, 3, 0, 35]] },
  { name: 'threads', from: C.attach, keys: [[C.attach, RUN_C.x - 200, RUN_C.y, RUN_C.z, 1450, -4, 3, 0, 35], [C.attach + 26, (cellPos(0).x + RUN_C.x) / 2, -1250, -300, 5600, 4, 10, 0, 35], [C.end, (cellPos(0).x + RUN_C.x) / 2, -1250, -300, 5800, 4, 10, 0, 35]] },
]);

const PageBody: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ position: 'absolute', inset: 0, background: '#efe9da', padding: '90px 90px', fontFamily: 'Newsreader, Georgia, serif', color: '#2a2630', overflow: 'hidden' }}>
    <div style={{ ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.16em', color: '#7d7686' }}>3 · MODEL ARCHITECTURE</div>
    {PHRASES.map(([sec, pre, hi, post], i) => {
      const glow = HOUSE(prog(f, C.glow[i] - 3, C.glow[i] + 4));
      const gone = f >= C.lift[i];
      return (
        <div key={i} style={{ position: 'absolute', left: 90, top: lineY(i), right: 90 }}>
          <div style={{ height: 14, width: '92%', background: 'rgba(42,38,48,0.12)', borderRadius: 3, marginBottom: 22, marginTop: -58 }} />
          <div style={{ height: 14, width: '78%', background: 'rgba(42,38,48,0.12)', borderRadius: 3, marginBottom: 28 }} />
          <div style={{ fontSize: 40, whiteSpace: 'nowrap' }}>
            <span style={{ ...rec(1, 0, 500), fontSize: 18, color: '#9a93a4', marginRight: 14 }}>§{sec}</span>
            {pre}
            <span style={{ padding: '2px 8px', borderRadius: 6, background: gone ? 'transparent' : `rgba(139,92,246,${0.12 + 0.55 * glow})`, outline: gone ? '2px dashed rgba(139,92,246,0.6)' : 'none', color: gone ? 'transparent' : '#1c1530', boxShadow: gone ? 'none' : `0 0 ${34 * glow}px rgba(139,92,246,${0.9 * glow})` }}>{hi}</span>
            {post}
          </div>
        </div>
      );
    })}
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(200deg, rgba(255,210,150,0.35), transparent 40%, rgba(0,0,0,0.45) 100%)' }} />
  </div>
);

/** A lens on a tilted page: sharp where we focus (the phrase being read), falling off around it. */
const Page: React.FC<{ f: number }> = ({ f }) => {
  const i = Math.max(0, C.glow.filter((gl) => f >= gl - 2).length - 1);
  const cx = hlX(i);
  const cy = lineY(i) + 30;
  const mask = `radial-gradient(ellipse 380px 170px at ${cx}px ${cy}px, transparent 30%, black 75%)`;
  return (
    <>
      <PageBody f={f} />
      <div style={{ position: 'absolute', inset: 0, filter: 'blur(7px)', WebkitMaskImage: mask, maskImage: mask }}>
        <PageBody f={f} />
      </div>
    </>
  );
};

const Tile: React.FC<{ i: number; cell: number }> = ({ i, cell }) => {
  const t = TILES[i];
  const grad = `linear-gradient(135deg, ${VIO}, ${BLUE})`;
  if (cell > 0.5) return <div style={{ position: 'absolute', inset: 0, borderRadius: 10, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center', ...rec(1, 0, 700), fontSize: t.v.length > 4 ? 18 : 30, color: '#0b0716' }}>{t.v}</div>;
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: 'rgba(18,14,34,0.92)', boxShadow: `inset 0 0 0 2px ${VIO}, 0 0 40px rgba(139,92,246,0.45)`, padding: '14px 20px', fontFamily: SANS }}>
      <div style={{ ...rec(1, 0, 700), fontSize: 16, letterSpacing: '0.16em', color: '#93c5fd' }}>{t.k.toUpperCase()}</div>
      {t.kind === 'range' ? (
        <>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginTop: 2 }}>{t.v}</div>
          <div style={{ position: 'relative', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.15)', marginTop: 8 }}>
            <div style={{ position: 'absolute', left: `${(Math.log((t.n ?? 1) / (t.lo ?? 1)) / Math.log((t.hi ?? 2) / (t.lo ?? 1))) * 100}%`, top: -5, width: 16, height: 16, borderRadius: 8, background: '#93c5fd', transform: 'translateX(-50%)' }} />
          </div>
        </>
      ) : (
        <div style={{ display: 'inline-block', marginTop: 10, padding: '8px 16px', borderRadius: 20, background: grad, ...rec(1, 0, 700), fontSize: 26, color: '#0b0716' }}>{t.v}</div>
      )}
    </div>
  );
};

const World: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const camYaw = Math.atan2(cam.x - M.x, cam.z - M.z);
  const enc = TRAVEL(prog(f, D - 2, D + 20));
  const formT = HOUSE(prog(f, FORM - 20, FORM + 16));
  const codeT = (k: number) => clamp((f - C.code[k]) / 10);
  const verT = settle(prog(f, C.version - 4, C.version + 6), 1.2);
  const runT = RESOLVE(prog(f, C.run, C.run + 44));
  const attachT = HOUSE(prog(f, C.attach, C.attach + 24));
  const spin = spinAt(f);
  const threads =
    attachT > 0
      ? TILES.map((_, i) => {
          const a = cellPos(i);
          const b = v3(RUN_C.x - 420, RUN_C.y + 210, RUN_C.z);
          const pts = [];
          for (let s = 0; s <= 28; s++) {
            const u = s / 28;
            if (u > attachT) break;
            const p = vlerp(a, b, u);
            pts.push(project(cam, v3(p.x, p.y - Math.sin(Math.PI * u) * (1000 + i * 90), p.z)));
          }
          return pts.filter((q) => q.d > 40);
        })
      : [];
  return (
    <>
      {/* the room: the desk, the lamp's pool, and above it the mosaic's own light */}
      <Plane cam={cam} c={v3(0, -2000, -4200)} w={18000} h={9000} z={-400000}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, #2a1850 0%, #120a26 45%, #07050f 80%)' }} />
      </Plane>
      <Plane cam={cam} c={v3(0, -1150, -2600)} w={5200} h={5200} opacity={0.18 + 0.5 * formT * (1 - enc * 0.5)} z={-380000}>
        <Img src={staticFile('img/mosaic-study.png')} style={{ width: 5200, height: 5200, filter: 'blur(8px) saturate(1.3)' }} />
      </Plane>
      <Box cam={cam} c={v3(0, 60, -200)} size={[5200, 120, 3000]} color="#1e140f" z={-200000} top={<div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 42% 55%, #6b4a2c 0%, #3a2618 35%, #1a120c 75%)' }} />} />
      {[
        [-1400, -500, 700, 90],
        [1500, -300, 640, 150],
        [-1500, -500, 600, 60],
      ].map(([x, z, w, h], k) => (
        <Box key={k} cam={cam} c={v3(x, -h / 2, z)} size={[w, h, 880]} color="#e8e1d0" z={-150000} edge="rgba(0,0,0,0.2)" top={<div style={{ position: 'absolute', inset: 0, background: '#f1ebdc' }} />} />
      ))}
      <Plane cam={cam} c={PAGE} U={X} V={Z} w={PW} h={PH} z={-100000} noDof>
        <Page f={f} />
      </Plane>
      {/* shards → the sphere → cells of the vector */}
      {shell.map((s, k) => {
        const src = k % 6;
        const born = C.lift[src];
        if (f < born) return null;
        const out = HOUSE(prog(f, born, born + 30));
        const fr = frameOn(s.n, spin);
        const loose = v3(fr.p.x * 1.6 + (random(`lx${k}`) - 0.5) * 900, fr.p.y + (random(`ly${k}`) - 0.5) * 900, fr.p.z * 1.6);
        const lock = HOUSE(prog(f, C.gather, FORM));
        let p = vlerp(phraseWorld(src), vlerp(loose, fr.p, lock), out);
        p = vlerp(p, cellPos(6 + k), enc);
        const U = enc > 0 ? vlerp(fr.U, X, enc) : fr.U;
        const V = enc > 0 ? vlerp(fr.V, Y, enc) : fr.V;
        const hue = [VIO, BLUE, MAG][k % 3];
        return (
          <Plane key={k} cam={cam} c={p} U={U} V={V} w={mix(200, CELL, enc)} h={mix(150, CELL, enc)} fog={FOG} opacity={clamp(out * 3) * (1 - 0.65 * formT * (1 - enc))}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 14, background: `linear-gradient(${(k * 47) % 360}deg, ${hue}, #1b1433 70%, ${MAG})`, boxShadow: `inset 0 0 0 2px rgba(255,255,255,${0.15 + 0.25 * formT})`, display: 'flex', alignItems: 'center', justifyContent: 'center', ...rec(1, 0, 600), fontSize: 20, color: enc > 0.6 ? '#fff' : 'transparent' }}>{((random(`v${k}`) - 0.5) * 2).toFixed(2)}</div>
          </Plane>
        );
      })}
      {TILES.map((_, i) => {
        const born = C.lift[i];
        if (f < born - 1) return null;
        const out = TRAVEL(prog(f, born, born + 26));
        const fr = frameOn(named[i].n, camYaw);
        const lift = v3(phraseWorld(i).x, -700 - i * 40, phraseWorld(i).z);
        let p = out < 1 ? vlerp(phraseWorld(i), lift, out) : lift;
        p = vlerp(p, fr.p, HOUSE(prog(f, C.gather - 20, FORM)));
        p = vlerp(p, cellPos(i), enc);
        const standUp = HOUSE(prog(f, born, born + 16));
        const U0 = X;
        const V0 = vlerp(Z, Y, standUp);
        const onSphere = HOUSE(prog(f, C.gather - 20, FORM));
        let U = vlerp(U0, fr.U, onSphere);
        let V = vlerp(V0, fr.V, onSphere);
        if (enc > 0) {
          U = vlerp(U, X, enc);
          V = vlerp(V, Y, enc);
        }
        return (
          <Plane key={`t${i}`} cam={cam} c={p} U={U} V={V} w={mix(330, CELL, enc)} h={mix(150, CELL, enc)} fog={FOG} z={10}>
            <Tile i={i} cell={enc} />
          </Plane>
        );
      })}
      {/* the mark resolves inside the sphere */}
      {formT > 0 && enc < 1 ? (
        <Plane cam={cam} c={M} U={v3(Math.cos(camYaw), 0, -Math.sin(camYaw))} V={Y} w={1500} h={1500} opacity={formT * (1 - enc)} z={250000}>
          <Img src={staticFile('img/identity.png')} style={{ width: 1500, height: 1500, transform: `scale(${mix(0.85, 1, formT)})`, filter: 'drop-shadow(0 0 90px rgba(139,92,246,0.9))' }} />
        </Plane>
      ) : null}
      {enc > 0.5 ? (
        <Plane cam={cam} c={v3(cellPos(0).x + 320, -1150 - CELL, -300)} w={720} h={50} opacity={HOUSE(prog(f, D + 14, D + 30))}>
          <div style={{ ...rec(1, 0, 650), fontSize: 24, letterSpacing: '0.14em', color: '#93c5fd' }}>ENCODED · ONE VECTOR</div>
        </Plane>
      ) : null}
      <Plane cam={cam} c={CODE_C} w={1240} h={640} fog={FOG} opacity={HOUSE(prog(f, C.code[0] - 20, C.code[0]))}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 20, background: 'rgba(12,10,20,0.96)', boxShadow: `inset 0 0 0 2px rgba(139,92,246,0.5), 0 0 80px rgba(139,92,246,0.3)`, padding: '30px 38px', ...rec(1, 0, 450), fontSize: 30, lineHeight: 1.6, color: '#fff' }}>
          <div style={{ fontSize: 18, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>GENERATED · model.py</div>
          {CODE.map((l, k) => (
            <div key={k} style={{ whiteSpace: 'pre', color: k === 0 || k === 5 ? '#93c5fd' : '#fff' }}>{l.slice(0, Math.floor(codeT(k) * l.length))}</div>
          ))}
          {verT > 0.01 ? <div style={{ position: 'absolute', right: 34, top: 26, padding: '8px 16px', borderRadius: 10, border: '3px solid #a3e635', color: '#a3e635', ...rec(1, 0, 800), fontSize: 22, letterSpacing: '0.12em', transform: `rotate(-3deg) scale(${verT})` }}>v3 · VERSIONED</div> : null}
        </div>
      </Plane>
      <Plane cam={cam} c={RUN_C} w={1140} h={640} fog={FOG} opacity={HOUSE(prog(f, C.run - 30, C.run - 6))}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 20, background: 'rgba(12,10,20,0.96)', boxShadow: `inset 0 0 0 2px rgba(59,130,246,0.5)`, padding: '30px 38px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', ...rec(1, 0, 550), fontSize: 18, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.55)' }}>
            <span>RUN r-017 · RECORDED</span>
            <span>ILLUSTRATIVE</span>
          </div>
          <svg width={1060} height={440} style={{ marginTop: 20 }}>
            <path d={new Array(60).fill(0).map((_, k) => { const u = k / 59; return `${k ? 'L' : 'M'}${20 + u * 1020} ${60 + 330 * Math.exp(-u * 3.2) + (random(`l${k}`) - 0.5) * 16 * (1 - u)}`; }).join(' ')} stroke="#60a5fa" strokeWidth={5} fill="none" pathLength={1} strokeDasharray={`${runT} 1`} />
          </svg>
          {attachT > 0.5 ? <div style={{ position: 'absolute', left: 38, bottom: 30, ...rec(1, 0, 600), fontSize: 22, color: '#a3e635' }}>✓ result attached to layers · hidden · heads · ffn · norm · act</div> : null}
        </div>
      </Plane>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, zIndex: 300000, pointerEvents: 'none' }}>
        {threads.map((pts, i) => (pts.length > 1 ? <path key={i} d={polyline(pts)} stroke="#a3e635" strokeWidth={3} fill="none" opacity={0.9} /> : null))}
      </svg>
    </>
  );
};

export const Neuromosaic: React.FC = () => {
  const f = useCurrentFrame();
  const { cam, shot, focus } = EDIT.at(f);
  const onDesk = shot.name.startsWith('phrase');
  const dof = { focus, aperture: onDesk ? 1.6 : shot.name === 'orbit' ? 0.5 : 0.35 };
  const line = (a: number, b: number) => HOUSE(prog(f, a, a + 14)) * (1 - HOUSE(prog(f, b, b + 10)));
  const words: [string, number][] = [
    ['A paper hides its architecture.', line(10, C.glow[3])],
    ['Neuromosaic takes it apart.', line(C.glow[3] + 6, FORM - 10)],
    ['Then builds it, runs it, and remembers why.', line(C.run - 10, C.end - 16)],
  ];
  const lamp = project(cam, v3(-1800, -1400, -900));
  return (
    <AbsoluteFill style={{ background: '#07050f', overflow: 'hidden' }}>
      <Blur ranges={[[C.glow[5], C.gather, 6], [D - 2, D + 24, 8], [C.attach + 2, C.attach + 28, 6]]}>
        <DofCtx.Provider value={dof}>
          <AbsoluteFill style={{ isolation: 'isolate' }}>
            <World f={f} cam={cam} />
          </AbsoluteFill>
        </DofCtx.Provider>
      </Blur>
      {onDesk || shot.name === 'rise' ? <Glow x={lamp.d > 40 ? lamp.sx : 200} y={lamp.d > 40 ? lamp.sy : 100} r={1200} color="rgba(255,190,120,0.6)" a={0.75} /> : null}
      {!onDesk ? <Bokeh n={24} seed="nm" colors={['rgba(139,92,246,0.6)', 'rgba(59,130,246,0.5)', 'rgba(232,121,249,0.5)']} area={[0, 0, 1920, 1080]} size={[8, 30]} f={f} a={0.3} /> : null}
      <Grade tint={VIO} a={onDesk ? 0.08 : 0.16} />
      <Letterbox t={shot.name === 'orbit' ? 1 : 0} />
      {f < C.end ? <div style={{ position: 'absolute', left: 120, top: 88, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.2em', color: '#c4b5fd', zIndex: 910000 }}>neuromosaic · research infrastructure</div> : null}
      {words.map(([w, o]) =>
        o > 0.002 ? (
          <div key={w} style={{ position: 'absolute', left: 120, bottom: 100, fontFamily: 'Newsreader, Georgia, serif', fontStyle: 'italic', fontSize: 76, color: '#fff', opacity: o, clipPath: `inset(0 ${(1 - o) * 100}% -20% 0)`, textShadow: '0 4px 30px rgba(0,0,0,0.8)', zIndex: 910000 }}>
            {w}
          </div>
        ) : null
      )}
      <Flash a={f >= D ? 0.2 * Math.exp(-(f - D) / 5) : 0} color="139,92,246" />
      <Flash a={f >= FORM ? 0.08 * Math.exp(-(f - FORM) / 6) : 0} color="232,121,249" />
      <BrandEnd
        g={g}
        from={C.end}
        bg="radial-gradient(ellipse at 50% 45%, #1d1240, #07050f 70%)"
        accent="#c4b5fd"
        kicker="RESEARCH INFRASTRUCTURE"
        wipe="iris"
        logo={<Img src={staticFile('img/identity.png')} style={{ width: 560, height: 560, transform: `rotate(${(f - C.end) * 0.15}deg)` }} />}
        line="Research knowledge, kept intact on its way into code."
      />
      <Vignette s={0.55} />
      <Grain />
      <Audio src={staticFile('audio/neuromosaic_mix.wav')} />
    </AbsoluteFill>
  );
};
