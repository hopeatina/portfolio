import React from 'react';
import { AbsoluteFill, random, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Vignette } from '../lib/Frame';
import { Cam, Key, Vec3, Y, keyedCamera, project, v3, vlerp } from '../lib/space';
import { Blur, Fog, Plane, polyline } from '../lib/World';
import cues from '../data/cues_neuromosaic.json';

/**
 * NEUROMOSAIC v2: "A paper, shattered into an architecture."
 * Frame 0: a research paper in raking light, one phrase already glowing.
 * The build is all snare: on one snare a phrase lights, on the next it
 * shatters off the page into a tile (continuous choices become ranges,
 * categorical ones chips) with a spray of shards, and the tiles orbit into
 * a mosaic. On the drop the mosaic encodes into one vector and the camera
 * flies along it into generated code, a version, and a recorded run; the
 * result threads back to the exact tiles that produced it. Run values are
 * illustrative and labelled. Rewatch: the page keeps the holes the phrases
 * left; the first six cells of the vector are the six tiles, in paper order.
 */
const g = GRIDS.neuromosaic;
const C = cues.cue;
const D = C.drop;
const VIO = '#8f6bff';
const BLUE = '#48c7ff';
const FOG: Fog = { near: 2600, far: 8000 };

const PAGE = v3(0, -400, 0);
const PW = 1100;
const PH = 1400;
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
const lineY = (i: number) => 330 + i * 170; // page px
const phraseWorld = (i: number): Vec3 => v3(PAGE.x - PW / 2 + 560, PAGE.y - PH / 2 + lineY(i) + 20, 6);
const M = v3(1350, -420, -520);
const R = 640;
const orbitAt = (i: number, f: number) => {
  const a = (i * Math.PI * 2) / 6 + f * 0.011;
  return { p: v3(M.x + R * Math.sin(a), M.y + (i % 2 ? -150 : 150), M.z + R * Math.cos(a)), U: v3(Math.cos(a), 0, -Math.sin(a)) };
};
const SHARDS = new Array(30).fill(0).map((_, k) => ({
  src: k % 6,
  th: random(`th${k}`) * Math.PI * 2,
  ph: (random(`ph${k}`) - 0.5) * 2.2,
  r: 380 + random(`r${k}`) * 420,
  sp: 0.006 + random(`sp${k}`) * 0.01,
  hue: random(`h${k}`),
  val: ((random(`v${k}`) - 0.5) * 2).toFixed(2),
}));
const CELL = 104;
const cellPos = (k: number) => v3(260 + k * (CELL + 8), -300, 0);
const NCELL = 6 + SHARDS.length;
const CODE_C = v3(cellPos(NCELL).x + 900, -420, -120);
const RUN_C = v3(CODE_C.x + 1350, -420, -120);

const KEYS: Key[] = [
  [0, phraseWorld(0).x, phraseWorld(0).y, 0, 430, 0, 0, 0], // the phrase, macro
  [C.lift[0] - 6, phraseWorld(0).x, phraseWorld(0).y, 0, 470, 0, 0, 0],
  [C.lift[1], 300, -520, 0, 1300, 10, 3, 0],
  [C.lift[3], 600, -450, -200, 1900, 20, 5, 0],
  [C.lift[5], 900, -420, -300, 2300, 26, 8, 0],
  [C.gather + 50, 1200, -420, -450, 2100, 18, 10, 0],
  [D, 1300, -420, -500, 1900, 12, 9, 0],
  [D + 26, cellPos(0).x, -300, 0, 640, 64, 6, 0], // down to the vector's first cell
  [C.code[0] + 6, cellPos(NCELL - 6).x, -300, 0, 700, 58, 5, 0], // flying along it
  [C.code[2], CODE_C.x, CODE_C.y, CODE_C.z, 1100, 8, 2, 0], // the code
  [C.version + 10, CODE_C.x, CODE_C.y, CODE_C.z, 1060, 6, 2, 0],
  [C.run + 6, RUN_C.x, RUN_C.y, RUN_C.z, 1150, -6, 2, 0], // the run
  [C.attach - 4, RUN_C.x - 200, RUN_C.y, RUN_C.z, 1500, -4, 3, 0],
  [C.attach + 26, (cellPos(0).x + RUN_C.x) / 2, -380, -100, 5000, 6, 9, 0], // all of it, threaded
  [900, (cellPos(0).x + RUN_C.x) / 2, -380, -100, 5300, 6, 9, 0],
];
const CAM = keyedCamera(KEYS, [
  { frames: C.lift, tau: 4, punch: 0.02, px: 5 },
  { frames: [D], tau: 6, punch: 0.05, px: 11 },
  { frames: [C.version, C.run, C.attach], tau: 4, punch: 0.015, px: 3 },
]);

const Page: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ position: 'absolute', inset: 0, background: '#ece6d6', padding: '90px 90px', fontFamily: T.serif, color: '#2a2630', overflow: 'hidden' }}>
    <div style={{ ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.16em', color: '#7d7686' }}>3 · MODEL ARCHITECTURE</div>
    {PHRASES.map(([sec, pre, hi, post], i) => {
      const glow = HOUSE(prog(f, C.glow[i] - 3, C.glow[i] + 4));
      const gone = f >= C.lift[i];
      return (
        <div key={i} style={{ position: 'absolute', left: 90, top: lineY(i), right: 90 }}>
          <div style={{ height: 14, width: '92%', background: 'rgba(42,38,48,0.12)', borderRadius: 3, marginBottom: 22, marginTop: -58 }} />
          <div style={{ height: 14, width: '78%', background: 'rgba(42,38,48,0.12)', borderRadius: 3, marginBottom: 28 }} />
          <div style={{ fontSize: 38, whiteSpace: 'nowrap' }}>
            <span style={{ ...rec(1, 0, 500), fontSize: 18, color: '#9a93a4', marginRight: 14 }}>§{sec}</span>
            {pre}
            <span style={{ padding: '2px 8px', borderRadius: 6, background: gone ? 'transparent' : `rgba(143,107,255,${0.12 + 0.5 * glow})`, outline: gone ? '2px dashed rgba(143,107,255,0.6)' : 'none', color: gone ? 'transparent' : '#1c1530', boxShadow: gone ? 'none' : `0 0 ${30 * glow}px rgba(143,107,255,${0.8 * glow})` }}>{hi}</span>
            {post}
          </div>
        </div>
      );
    })}
    {/* raking light */}
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, rgba(255,255,255,0.35), rgba(0,0,0,0) 35%, rgba(0,0,0,0.45) 100%)' }} />
  </div>
);

const Tile: React.FC<{ i: number; cell: number; f: number }> = ({ i, cell, f }) => {
  const t = TILES[i];
  const grad = `linear-gradient(135deg, ${VIO}, ${BLUE})`;
  if (cell > 0.5)
    return (
      <div style={{ position: 'absolute', inset: 0, borderRadius: 10, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center', ...rec(1, 0, 700), fontSize: t.v.length > 4 ? 18 : 30, color: '#0b0716' }}>{t.v}</div>
    );
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: '#120e22', boxShadow: `inset 0 0 0 2px ${VIO}, 0 0 40px rgba(143,107,255,0.35)`, padding: '16px 20px' }}>
      <div style={{ ...rec(1, 0, 700), fontSize: 16, letterSpacing: '0.16em', color: BLUE }}>{t.k.toUpperCase()}</div>
      {t.kind === 'range' ? (
        <>
          <div style={{ ...rec(1, 0, 600), fontSize: 34, color: T.mineral, marginTop: 4 }}>{t.v}</div>
          <div style={{ position: 'relative', height: 6, borderRadius: 3, background: 'rgba(242,239,228,0.15)', marginTop: 10 }}>
            <div style={{ position: 'absolute', left: `${(Math.log((t.n ?? 1) / (t.lo ?? 1)) / Math.log((t.hi ?? 2) / (t.lo ?? 1))) * 100}%`, top: -5, width: 16, height: 16, borderRadius: 8, background: BLUE, transform: 'translateX(-50%)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', ...rec(1, 0, 500), fontSize: 13, color: T.mineral3, marginTop: 6 }}>
            <span>{t.lo}</span>
            <span>{t.hi}</span>
          </div>
        </>
      ) : (
        <div style={{ display: 'inline-block', marginTop: 12, padding: '8px 16px', borderRadius: 20, background: grad, ...rec(1, 0, 700), fontSize: 26, color: '#0b0716' }}>{t.v}</div>
      )}
    </div>
  );
};

const World: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const enc = TRAVEL(prog(f, D - 2, D + 22));
  const codeT = (k: number) => clamp((f - C.code[k]) / 10);
  const verT = settle(prog(f, C.version - 4, C.version + 6), 1.2);
  const runT = RESOLVE(prog(f, C.run, C.run + 44));
  const attachT = HOUSE(prog(f, C.attach, C.attach + 24));
  const threads =
    attachT > 0
      ? TILES.map((_, i) => {
          const a = cellPos(i);
          const b = v3(RUN_C.x - 400, RUN_C.y + 200, RUN_C.z);
          const pts = [];
          for (let s = 0; s <= 24; s++) {
            const u = s / 24;
            if (u > attachT) break;
            const p = vlerp(a, b, u);
            pts.push(project(cam, v3(p.x, p.y - Math.sin(Math.PI * u) * (900 + i * 90), p.z)));
          }
          return pts.filter((q) => q.d > 40);
        })
      : [];
  return (
    <>
      {/* the page */}
      <Plane cam={cam} c={PAGE} w={PW} h={PH} fog={FOG} z={-100000}>
        <Page f={f} />
      </Plane>
      {/* shards: the mosaic's spray */}
      {SHARDS.map((s, k) => {
        const born = C.lift[s.src];
        if (f < born) return null;
        const out = HOUSE(prog(f, born, born + 24));
        const th = s.th + f * s.sp;
        const orbitP = v3(M.x + s.r * Math.cos(s.ph) * Math.sin(th), M.y + s.r * Math.sin(s.ph) * 0.8, M.z + s.r * Math.cos(s.ph) * Math.cos(th));
        const from = phraseWorld(s.src);
        let p = vlerp(from, orbitP, out);
        const cell = cellPos(6 + k);
        p = vlerp(p, cell, enc);
        const U = v3(Math.cos(th * (1 - enc)), 0, -Math.sin(th * (1 - enc)));
        const w = mix(90, CELL, enc);
        const h = mix(56, CELL, enc);
        const hue = s.hue < 0.5 ? VIO : BLUE;
        return (
          <Plane key={k} cam={cam} c={p} U={U} V={Y} w={w} h={h} fog={FOG} opacity={clamp(out * 3)}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 8, background: `linear-gradient(135deg, ${hue}, #1b1433)`, opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', ...rec(1, 0, 600), fontSize: 20, color: enc > 0.6 ? T.mineral : 'transparent' }}>{s.val}</div>
          </Plane>
        );
      })}
      {/* the six tiles */}
      {TILES.map((_, i) => {
        const born = C.lift[i];
        if (f < born - 1) return null;
        const out = TRAVEL(prog(f, born, born + 26));
        const o = orbitAt(i, f);
        const from = phraseWorld(i);
        let p = vlerp(from, o.p, out);
        p = v3(p.x, p.y - Math.sin(Math.PI * out) * 240, p.z + Math.sin(Math.PI * out) * 200);
        p = vlerp(p, cellPos(i), enc);
        const U = out < 1 && enc === 0 ? vlerp(v3(1, 0, 0), o.U, out) : vlerp(o.U, v3(1, 0, 0), enc);
        const w = mix(mix(220, 330, out), CELL, enc);
        const h = mix(mix(80, 150, out), CELL, enc);
        return (
          <Plane key={`t${i}`} cam={cam} c={p} U={U} V={Y} w={w} h={h} fog={FOG} z={10}>
            <Tile i={i} cell={enc} f={f} />
          </Plane>
        );
      })}
      {/* the vector's label */}
      {enc > 0.5 ? (
        <Plane cam={cam} c={v3(cellPos(0).x + 300, -300 - CELL, 0)} w={700} h={50} opacity={HOUSE(prog(f, D + 14, D + 30))}>
          <div style={{ ...rec(1, 0, 650), fontSize: 24, letterSpacing: '0.14em', color: BLUE }}>ENCODED · ONE VECTOR</div>
        </Plane>
      ) : null}
      {/* generated code, versioned */}
      <Plane cam={cam} c={CODE_C} w={1240} h={640} fog={FOG} opacity={HOUSE(prog(f, C.code[0] - 20, C.code[0]))}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 20, background: '#0c0a14', boxShadow: `inset 0 0 0 2px rgba(143,107,255,0.4)`, padding: '30px 38px', ...rec(1, 0, 450), fontSize: 30, lineHeight: 1.6, color: T.mineral }}>
          <div style={{ fontSize: 18, letterSpacing: '0.14em', color: T.mineral3, marginBottom: 16 }}>GENERATED · model.py</div>
          {CODE.map((l, k) => (
            <div key={k} style={{ whiteSpace: 'pre', color: k === 0 || k === 5 ? BLUE : T.mineral }}>{l.slice(0, Math.floor(codeT(k) * l.length))}</div>
          ))}
          {verT > 0.01 ? <div style={{ position: 'absolute', right: 34, top: 26, padding: '8px 16px', borderRadius: 10, border: `3px solid ${T.signal}`, color: T.signal, ...rec(1, 0, 800), fontSize: 22, letterSpacing: '0.12em', transform: `rotate(-3deg) scale(${verT})` }}>v3 · VERSIONED</div> : null}
        </div>
      </Plane>
      {/* the recorded run */}
      <Plane cam={cam} c={RUN_C} w={1140} h={640} fog={FOG} opacity={HOUSE(prog(f, C.run - 30, C.run - 6))}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 20, background: '#0c0a14', boxShadow: `inset 0 0 0 2px rgba(72,199,255,0.4)`, padding: '30px 38px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', ...rec(1, 0, 550), fontSize: 18, letterSpacing: '0.14em', color: T.mineral3 }}>
            <span>RUN r-017 · RECORDED</span>
            <span>ILLUSTRATIVE</span>
          </div>
          <svg width={1060} height={440} style={{ marginTop: 20 }}>
            <path
              d={new Array(60).fill(0).map((_, k) => { const u = k / 59; const x = 20 + u * 1020; const y = 40 + 360 * (1 - Math.exp(-u * 4)) * -1 + 360 + (random(`l${k}`) - 0.5) * 18 * (1 - u); return `${k ? 'L' : 'M'}${x} ${420 - (y - 40) * 0.9}`; }).join(' ')}
              stroke={BLUE}
              strokeWidth={5}
              fill="none"
              pathLength={1}
              strokeDasharray={`${runT} 1`}
            />
          </svg>
          {attachT > 0.5 ? <div style={{ position: 'absolute', left: 38, bottom: 30, ...rec(1, 0, 600), fontSize: 22, color: T.signal }}>✓ result attached to layers · hidden · heads · ffn · norm · act</div> : null}
        </div>
      </Plane>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, zIndex: 300000, pointerEvents: 'none' }}>
        {threads.map((pts, i) => (pts.length > 1 ? <path key={i} d={polyline(pts)} stroke={T.signal} strokeWidth={3} fill="none" opacity={0.85} /> : null))}
      </svg>
    </>
  );
};

export const Neuromosaic: React.FC = () => {
  const f = useCurrentFrame();
  const cam = CAM.at(f);
  const endDim = HOUSE(prog(f, C.end - 10, C.end + 16));
  const line = (a: number, b: number) => HOUSE(prog(f, a, a + 14)) * (1 - HOUSE(prog(f, b, b + 10)));
  const words: [string, number][] = [
    ['A paper hides its architecture.', line(10, C.lift[2])],
    ['Neuromosaic takes it apart.', line(C.lift[2] + 6, D - 8)],
    ['Then builds it, runs it, and remembers why.', line(C.run - 10, C.end - 16)],
  ];
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 40%, #0e0a1c, #040308 75%)', overflow: 'hidden' }}>
      <Blur
        ranges={[
          [C.lift[0], C.lift[1] + 10, 6],
          [D - 2, D + 28, 10],
          [C.code[0] + 6, C.code[2] + 4, 8],
          [C.attach + 2, C.attach + 28, 8],
        ]}
      >
        <AbsoluteFill style={{ filter: `brightness(${1 - 0.72 * endDim}) blur(${5 * endDim}px)` }}>
          <World f={f} cam={cam} />
        </AbsoluteFill>
      </Blur>
      <AbsoluteFill style={{ opacity: 1 - endDim }}>
        <div style={{ position: 'absolute', left: 120, top: 92, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.2em', color: VIO }}>NEUROMOSAIC · RESEARCH INFRASTRUCTURE</div>
        {words.map(([w, o]) =>
          o > 0.002 ? (
            <div key={w} style={{ position: 'absolute', left: 120, bottom: 100, fontFamily: T.serif, fontStyle: 'italic', fontSize: 76, color: T.mineral, opacity: o, clipPath: `inset(0 ${(1 - o) * 100}% -20% 0)`, textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
              {w}
            </div>
          ) : null
        )}
      </AbsoluteFill>
      <Flash a={f >= D ? 0.15 * Math.exp(-(f - D) / 5) : 0} color="143,107,255" />
      <EndCard g={g} index="06 / RESEARCH INFRASTRUCTURE" title="Neuromosaic" line="Research knowledge, kept intact on its way into code." accent={VIO} from={C.end} />
      <Vignette s={0.6} />
      <Grain />
      <Audio src={staticFile('audio/neuromosaic_mix.wav')} />
    </AbsoluteFill>
  );
};
