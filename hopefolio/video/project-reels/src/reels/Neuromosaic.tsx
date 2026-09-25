import React from 'react';
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from 'remotion';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS, beatAfter, beatPulse } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Score, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';

/**
 * NEUROMOSAIC — "A paper, shattered into an architecture."
 * A paper scatters its architecture across sections. Each highlighted phrase
 * flies off the page on a beat and lands as a tile: continuous parameters as
 * ranges, categorical choices as chips. On the drop the mosaic encodes into
 * one vector, decodes into generated code, gets a version, runs, and the
 * result attaches back to the exact tiles that produced it.
 */
const g = GRIDS.neuromosaic;
const D = Math.round(g.drop);
const B = Math.round(g.button);
const VIO = '#8f6bff';
const BLUE = '#48c7ff';
const PAPER = [
  ['3.1', 'We stack ', '12 layers', ' of encoder blocks with'],
  ['3.1', 'a hidden size of ', '768', ' and'],
  ['3.2', 'multi-head attention over ', '12 heads', '.'],
  ['3.3', 'The feed-forward block uses ', 'SwiGLU', ','],
  ['3.4', 'with ', 'pre-norm', ' residual connections'],
  ['5.1', 'and ', 'GELU', ' elsewhere in training.'],
];
const TILES = [
  { k: 'layers', v: '12', kind: 'range', lo: 2, hi: 48, x: 1040, y: 360 },
  { k: 'hidden', v: '768', kind: 'range', lo: 128, hi: 4096, x: 1400, y: 360 },
  { k: 'heads', v: '12', kind: 'range', lo: 1, hi: 32, x: 1040, y: 520 },
  { k: 'ffn', v: 'SwiGLU', kind: 'chip', x: 1400, y: 520 },
  { k: 'norm', v: 'pre-norm', kind: 'chip', x: 1040, y: 680 },
  { k: 'act', v: 'GELU', kind: 'chip', x: 1400, y: 680 },
];
const CODE = ['class Block(nn.Module):', '    def __init__(self, d=768, h=12):', '        self.attn = MultiHead(d, h)', '        self.ffn = SwiGLU(d)', '        self.norm = PreNorm(d)', 'model = Stack(Block, n=12)'];

export const Neuromosaic: React.FC = () => {
  const f = useCurrentFrame();
  const fly = TILES.map((_, i) => beatAfter(g, 70, i));
  const enc = TRAVEL(prog(f, D, D + 24));
  const vec = HOUSE(prog(f, D + 10, D + 30));
  const code = prog(f, beatAfter(g, D, 2), beatAfter(g, D, 4));
  const run = RESOLVE(prog(f, beatAfter(g, D, 4), beatAfter(g, D, 6)));
  const attach = HOUSE(prog(f, beatAfter(g, D, 6), beatAfter(g, D, 6) + 16));
  const endFrom = B - 72;
  const out = HOUSE(prog(f, endFrom - 10, endFrom + 10));
  const kick = beatPulse(g, f, 7);
  return (
    <AbsoluteFill style={{ background: '#07060c', overflow: 'hidden' }}>
      <Img src={staticFile('img/mosaic-study.png')} style={{ position: 'absolute', left: 0, top: -420, width: 1920, opacity: 0.18 + 0.12 * enc, transform: `rotate(${f * 0.02}deg) scale(${1.1 + 0.02 * kick})` }} />
      <AbsoluteFill style={{ opacity: 1 - out }}>
        <div style={{ position: 'absolute', left: 140, top: 120, ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.2em', color: VIO }}>NEUROMOSAIC · RESEARCH WORKBENCH · RESEARCH PROTOTYPE</div>
        <div style={{ position: 'absolute', left: 140, top: 160, fontFamily: T.serif, fontStyle: 'italic', fontSize: 76, lineHeight: 1.05, width: 1600, color: T.mineral }}>
          {f < D ? 'A paper scatters its architecture across sections.' : 'Named, bounded, encoded, run, remembered.'}
        </div>
        {/* the paper */}
        <div style={{ position: 'absolute', left: 140, top: 330, width: 780, padding: '34px 40px', background: '#f2efe4', color: '#1a1814', fontFamily: T.serif, fontSize: 30, lineHeight: 1.5, opacity: 1 - enc, transform: `translateX(${-enc * 200}px) rotate(${-1.5 + enc * -6}deg)` }}>
          {PAPER.map(([sec, a, hl, b], i) => {
            const gone = f >= fly[i];
            return (
              <div key={i}>
                <span style={{ ...rec(1, 0, 500), fontSize: 16, color: '#8a877e', marginRight: 12 }}>§{sec}</span>
                {a}
                <span style={{ background: gone ? 'transparent' : 'rgba(143,107,255,0.28)', color: gone ? 'rgba(26,24,20,0.2)' : '#1a1814', padding: '0 4px' }}>{hl}</span>
                {b}
              </div>
            );
          })}
        </div>
        {/* tiles: each phrase lands as a named, bounded choice */}
        {TILES.map((t, i) => {
          if (f < fly[i]) return null;
          const land = settle(prog(f, fly[i], fly[i] + 16), 1.1);
          const sx = 400 + (random(`nx${i}`) - 0.5) * 300;
          const sy = 420 + i * 60;
          const vx = 560 + i * 140;
          const vy = 860;
          const x = mix(mix(sx, t.x, land), vx, enc);
          const y = mix(mix(sy, t.y, land), vy, enc);
          const w = mix(330, 120, enc);
          const col = i % 2 ? BLUE : VIO;
          const lit = attach > 0 ? 0.5 + 0.5 * Math.sin(Math.PI * attach) : 0;
          return (
            <div key={t.k} style={{ position: 'absolute', left: x, top: y, width: w, height: mix(130, 60, enc), borderRadius: t.kind === 'chip' ? 65 : 12, border: `2px solid ${col}`, background: `rgba(${i % 2 ? '72,199,255' : '143,107,255'},${0.12 + 0.3 * lit})`, padding: enc < 0.5 ? '16px 22px' : 0, overflow: 'hidden', boxShadow: lit ? `0 0 ${40 * lit}px ${col}` : undefined }}>
              {enc < 0.5 ? (
                <>
                  <div style={{ ...rec(1, 0, 500), fontSize: 18, letterSpacing: '0.14em', color: col }}>{t.k.toUpperCase()} · {t.kind === 'range' ? `${t.lo}..${t.hi}` : 'categorical'}</div>
                  <div style={{ ...rec(1, 0, 700), fontSize: 44, color: T.mineral, marginTop: 6 }}>{t.v}</div>
                </>
              ) : null}
            </div>
          );
        })}
        {vec > 0.01 ? <div style={{ position: 'absolute', left: 560, top: 800, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.14em', color: T.mineral3, opacity: vec * (1 - attach) }}>ENCODED · ONE VECTOR, DECODABLE AGAIN</div> : null}
        {/* generated code, versioned */}
        {code > 0 ? (
          <div style={{ position: 'absolute', left: 1040, top: 340, width: 760, padding: 28, background: 'rgba(8,8,6,0.9)', border: `1px solid ${T.mineral4}`, borderRadius: 12, ...rec(1, 0, 450), fontSize: 26, lineHeight: 1.55, color: T.mineral }}>
            <div style={{ ...rec(1, 0, 600), fontSize: 18, letterSpacing: '0.14em', color: BLUE, marginBottom: 10 }}>GENERATED · VERSIONED · ILLUSTRATIVE RUN · {run >= 1 ? 'RUN COMPLETE' : run > 0 ? 'RUNNING' : 'QUEUED'}</div>
            {CODE.map((l, i) => {
              const t = clamp(code * CODE.length - i);
              return <div key={i} style={{ whiteSpace: 'pre', color: i === CODE.length - 1 ? T.signal : T.mineral }}>{resolveText(''.padEnd(l.length, ' '), l, t, `nc${i}`, f)}</div>;
            })}
            {run > 0 ? (
              <svg width={700} height={120} style={{ marginTop: 16 }}>
                <path d={new Array(60).fill(0).map((_, i) => `${i ? 'L' : 'M'}${(i / 59) * 700 * run} ${20 + 90 * Math.exp(-i / 14) + 4 * Math.sin(i * 1.7)}`).join(' ')} stroke={T.signal} strokeWidth={3} fill="none" />
                <text x={0} y={116} fill="rgba(242,239,228,0.4)" fontFamily="Recursive" fontSize={16}>loss · recorded with the spec and code version that produced it</text>
              </svg>
            ) : null}
          </div>
        ) : null}
      </AbsoluteFill>
      <Flash a={f >= D ? 0.14 * Math.exp(-(f - D) / 6) : 0} color="143,107,255" />
      <EndCard g={g} index="06 / RESEARCH INFRASTRUCTURE" title="Neuromosaic" line="Research knowledge, kept intact on its way into code." accent={VIO} from={endFrom} />
      <Vignette />
      <Grain />
      <Score proj="neuromosaic" />
    </AbsoluteFill>
  );
};
