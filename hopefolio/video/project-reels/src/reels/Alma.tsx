import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ACCEL, HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS, beatAfter, beatPulse } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Score, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';

/**
 * ALMA — "The request path stays narrow."
 * A therapist's save travels one wire. Consequence (documents, reminders,
 * vendor audit, backfills, eligibility) piles onto it until it sags and the
 * request crawls. On the drop every load lifts into its own durable lane,
 * each lane exits through an audit gate, and a flag proves the rollout can be
 * reversed. Only verified numbers: 72% adoption, 999 commits, 2.7 years.
 */
const g = GRIDS.alma;
const D = Math.round(g.drop);
const B = Math.round(g.button);
const COLD = '72,199,255';
const PATH_Y = 400;
const X0 = 120;
const X1 = 1800;

const LOADS = [
  { label: 'Document render', phi: true },
  { label: 'Reminder emails', phi: true },
  { label: 'Vendor audit token', phi: false },
  { label: 'Backfill', phi: false },
  { label: 'Eligibility + cadence', phi: true },
];
// each load lands on a beat of the build, left to right
const LAND = LOADS.map((_, i) => beatAfter(g, 120, i));
const LANE_Y = (i: number) => 560 + i * 92;

const Phi: React.FC<{ w: number }> = ({ w }) => (
  <span style={{ display: 'inline-block', width: w, height: 13, borderRadius: 3, background: 'rgba(242,239,228,0.22)', verticalAlign: 'middle' }} />
);

export const Alma: React.FC = () => {
  const f = useCurrentFrame();
  // how much weight sits on the request path (0..1), released at the drop
  const landed = LOADS.reduce((a, _, i) => a + HOUSE(prog(f, LAND[i], LAND[i] + 10)), 0) / LOADS.length;
  const lift = HOUSE(prog(f, D, D + 26));
  const load = landed * (1 - lift);
  const sag = 260 * load;
  // the request pulse: fast when the path is clear, crawling when loaded
  const speed = mix(1, 0.08, load ** 0.7);
  let px = 0;
  for (let k = 0; k <= f; k++) {
    const l = LOADS.reduce((a, _, i) => a + HOUSE(prog(k, LAND[i], LAND[i] + 10)), 0) / LOADS.length * (1 - HOUSE(prog(k, D, D + 26)));
    px += mix(1, 0.08, l ** 0.7) * 38;
  }
  const pulseX = X0 + (px % (X1 - X0));
  const pathY = (x: number) => PATH_Y + sag * Math.sin(Math.PI * clamp((x - X0) / (X1 - X0)));
  const hook = HOUSE(prog(f, 8, 30));
  const stateText = f < LAND[2] ? 'responsive' : f < D ? (load > 0.75 ? 'waiting on everything' : 'slowing') : 'responsive';
  const flagOn = !(f >= beatAfter(g, D, 4) && f < beatAfter(g, D, 6));
  const flagFlip = [beatAfter(g, D, 4), beatAfter(g, D, 6)].some((b) => f >= b && f < b + 8);
  const statsT = RESOLVE(prog(f, beatAfter(g, D, 7), beatAfter(g, D, 7) + 30));
  const endFrom = B - 72;
  const sceneOut = HOUSE(prog(f, endFrom - 10, endFrom + 10));
  const kick = beatPulse(g, f, 5, D, B);
  return (
    <AbsoluteFill style={{ background: T.carbon, overflow: 'hidden' }}>
      <AbsoluteFill style={{ opacity: 1 - sceneOut, transform: `translateY(${-40 * sceneOut}px)` }}>
        {/* header */}
        <div style={{ position: 'absolute', left: X0, top: 150, ...rec(1, 0, 500), fontSize: 20, letterSpacing: '0.2em', color: `rgb(${COLD})`, opacity: hook }}>PROVIDER REQUEST · HIPAA</div>
        <div style={{ position: 'absolute', left: X0, top: 186, fontFamily: T.serif, fontStyle: 'italic', fontSize: 84, color: T.mineral, opacity: hook }}>
          {f < D ? 'A therapist presses Save.' : 'The request path stays narrow.'}
        </div>
        <div style={{ position: 'absolute', right: 1920 - X1, top: 164, textAlign: 'right', ...rec(1, 0, 450), fontSize: 26, color: load > 0.6 ? T.heat : T.mineral2, opacity: hook }}>
          {statsT > 0.01 ? '' : stateText.toUpperCase()}
        </div>
        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <filter id="glow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation={6} /></filter>
          </defs>
          {/* the wire */}
          <path d={`M${X0} ${PATH_Y} ${new Array(40).fill(0).map((_, i) => { const x = X0 + ((X1 - X0) * (i + 1)) / 40; return `L${x} ${pathY(x)}`; }).join(' ')}`} stroke={load > 0.6 ? T.heat : T.mineral} strokeWidth={5} fill="none" opacity={0.9} />
          <circle cx={X0} cy={PATH_Y} r={7} fill={T.mineral} />
          <circle cx={X1} cy={PATH_Y} r={7} fill={T.mineral} />
          {/* the request pulse */}
          <circle cx={pulseX} cy={pathY(pulseX)} r={16} fill={`rgb(${COLD})`} filter="url(#glow)" opacity={0.9} />
          <circle cx={pulseX} cy={pathY(pulseX)} r={7} fill="#fff" />
          {/* background lanes (Celery) appear at the drop */}
          {LOADS.map((l, i) => {
            const y = LANE_Y(i);
            const on = HOUSE(prog(f, D + i * 3, D + 22 + i * 3));
            const run = prog(f, D + 16 + i * 8, D + 16 + i * 8 + 120);
            const retry = i === 2 && f > D + 50 && f < D + 84;
            return (
              <g key={l.label} opacity={on}>
                <line x1={X0} y1={y} x2={X0 + (X1 - X0) * on} y2={y} stroke={T.mineral4} strokeWidth={2} strokeDasharray="4 8" />
                <rect x={X1 - 52} y={y - 26} width={52} height={52} rx={8} fill="none" stroke={run >= 1 ? T.signal : T.mineral3} strokeWidth={2} />
                {run >= 1 ? <path d={`M${X1 - 38} ${y} l9 9 l16 -18`} stroke={T.signal} strokeWidth={3} fill="none" strokeLinecap="round" /> : null}
                <circle cx={mix(X0, X1 - 60, retry ? 0.45 : RESOLVE(run))} cy={y} r={6} fill={retry ? T.heat : `rgb(${COLD})`} />
              </g>
            );
          })}
        </svg>
        {/* the loads: fall onto the wire in the build, lift into lanes on the drop */}
        {LOADS.map((l, i) => {
          const land = settle(prog(f, LAND[i] - 12, LAND[i] + 4), 0.8);
          const x = X0 + 90 + i * 320;
          const yOnPath = pathY(x + 130) - 78 - (i % 2) * 70;
          const yFall = mix(-120, yOnPath, land);
          const laneT = TRAVEL(prog(f, D + i * 3, D + 26 + i * 3));
          const y = mix(yFall, LANE_Y(i) - 29, laneT);
          const xx = mix(x, X0 + 30, laneT);
          if (f < LAND[i] - 12) return null;
          const retry = i === 2 && f > D + 50 && f < D + 84;
          return (
            <div key={l.label} style={{ position: 'absolute', left: xx, top: y, height: 58, padding: '0 22px', display: 'flex', alignItems: 'center', gap: 12, borderRadius: 12, background: T.carbon2, border: `1px solid ${laneT > 0.5 ? T.mineral4 : 'rgba(255,87,56,0.5)'}`, ...rec(1, 0, 450), fontSize: 26, color: T.mineral, whiteSpace: 'nowrap' }}>
              {l.label}
              {l.phi ? <Phi w={46} /> : null}
              {retry ? <span style={{ color: T.heat }}>· retry 2/3</span> : null}
            </div>
          );
        })}
        {/* lane labels */}
        <div style={{ position: 'absolute', left: X0, top: 505, ...rec(1, 0, 500), fontSize: 20, letterSpacing: '0.18em', color: T.mineral3, opacity: HOUSE(prog(f, D + 18, D + 36)) }}>BACKGROUND STAGES · CELERY · EXPLICIT FAILURE + RETRY</div>
        <div style={{ position: 'absolute', left: X1 - 170, top: 505, ...rec(1, 0, 500), fontSize: 20, letterSpacing: '0.18em', color: T.signal, opacity: HOUSE(prog(f, D + 60, D + 80)) }}>AUDIT GATE</div>
        {/* the reversible flag */}
        <div style={{ position: 'absolute', left: X0, top: 300, display: 'flex', alignItems: 'center', gap: 16, opacity: HOUSE(prog(f, D + 30, D + 50)) }}>
          <div style={{ width: 64, height: 34, borderRadius: 17, background: flagOn ? T.signal : 'rgba(242,239,228,0.18)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 4, left: flagOn ? 34 : 4, width: 26, height: 26, borderRadius: 13, background: T.carbon }} />
          </div>
          <span style={{ ...rec(1, 0, 450), fontSize: 20, color: T.mineral2 }}>reassessments_v2 {flagOn ? 'on' : 'off · rollback path'}</span>
        </div>
        {/* the result */}
        <div style={{ position: 'absolute', right: 1920 - X1, top: 292, opacity: statsT, display: 'flex', gap: 56 }}>
          {[
            ['72%', 'adoption · self-reported'],
            ['999', 'commits'],
            ['2.7 yrs', 'HIPAA production'],
          ].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: T.serif, fontSize: 64, color: T.mineral, lineHeight: 1 }}>{resolveText(''.padEnd(n.length, ' '), n, statsT, `al${l}`, f)}</div>
              <div style={{ ...rec(1, 0, 450), fontSize: 16, letterSpacing: '0.12em', color: T.mineral3, marginTop: 8 }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
      <Flash a={f >= D ? 0.1 * Math.exp(-(f - D) / 6) : 0} color={COLD} />
      <Flash a={flagFlip ? 0.05 : 0} />
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${1 + 0.004 * kick})` }} />
      <EndCard g={g} index="02 / PRODUCTION SYSTEMS" title="Alma" line="Clinical systems that had to earn adoption and survive inspection." accent={`rgb(${COLD})`} from={endFrom} />
      <Vignette />
      <Grain />
      <Score proj="alma" />
    </AbsoluteFill>
  );
};
export const almaUnused = [ACCEL];
