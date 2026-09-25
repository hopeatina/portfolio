import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { ACCEL, HOUSE, RESOLVE, TRAVEL, clamp, mix, onN, prog, settle } from '../lib/ease';
import { GRIDS, beatAfter, beatPulse } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Score, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';

/**
 * PERF PULSE — "The minute before."
 * Memory pressure climbs on every beat of the build, disk headroom shrinks,
 * the machine starts dropping frames (the picture itself stutters onto 2s,
 * 3s, 4s), the beachball appears. On the drop Crash Guard warns *before*
 * the freeze: the real notification copy, the real dashboard, an
 * identity-checked stop, and the pressure drains. Then the one-line install.
 */
const g = GRIDS.perfpulse;
const D = Math.round(g.drop);
const B = Math.round(g.button);
const PROCS = [
  ['ChatGPT / Codex', 6.9],
  ['Google Chrome', 3.1],
  ['VS Code Helper', 2.8],
  ['node', 0.5],
  ['com.docker.vmnetd', 2.1],
] as const;

const color = (p: number) => (p < 0.6 ? T.signal : p < 0.82 ? T.ochre : T.heat);

const Ring: React.FC<{ p: number; size: number; label: string }> = ({ p, size, label }) => {
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(242,239,228,0.1)" strokeWidth={18} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color(p)} strokeWidth={18} fill="none" strokeLinecap="round" strokeDasharray={`${c * p} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...rec(1, 0, 700), fontSize: size * 0.22, color: T.mineral, fontVariantNumeric: 'tabular-nums' }}>{Math.round(p * 100)}</div>
        <div style={{ ...rec(1, 0, 450), fontSize: 18, letterSpacing: '0.16em', color: T.mineral3 }}>{label}</div>
      </div>
    </div>
  );
};

const Beachball: React.FC<{ a: number; size: number }> = ({ a, size }) => (
  <svg width={size} height={size} viewBox="-10 -10 20 20" style={{ transform: `rotate(${a}deg)` }}>
    {['#ff5738', '#d9a62e', '#b7f34a', '#48c7ff', '#8f6bff', '#ff4fa3'].map((c, i) => (
      <path key={c} d={`M0 0 L${10 * Math.cos((i * Math.PI) / 3)} ${10 * Math.sin((i * Math.PI) / 3)} A10 10 0 0 1 ${10 * Math.cos(((i + 1) * Math.PI) / 3)} ${10 * Math.sin(((i + 1) * Math.PI) / 3)} Z`} fill={c} />
    ))}
  </svg>
);

export const PerfPulse: React.FC = () => {
  const real = useCurrentFrame();
  // the machine struggling: as pressure rises the picture drops to 2s, 3s, then 4s
  const lag = real < 300 ? 1 : real < 400 ? 2 : real < D - 30 ? 3 : real < D ? 4 : 1;
  const f = real < D ? onN(real, lag) : real;
  // pressure steps up on each beat of the build, then drains after the stop
  const beatsIn = g.beats.filter((b) => b > 60 && b <= Math.min(f, D)).length;
  const buildBeats = g.beats.filter((b) => b > 60 && b <= D).length;
  const stopF = beatAfter(g, D, 6);
  const drain = HOUSE(prog(f, stopF, stopF + 50));
  const mem = mix(mix(0.58, 0.97, (beatsIn / buildBeats) ** 1.3), 0.46, drain);
  const disk = mix(mix(0.71, 0.93, clamp(f / D)), 0.9, drain);
  const ball = HOUSE(prog(f, D - 110, D - 90)) * (1 - HOUSE(prog(real, D, D + 8)));
  // the warning, the dashboard, the stop
  const note = settle(prog(real, D, D + 16), 0.9);
  const dash = TRAVEL(prog(real, beatAfter(g, D, 3), beatAfter(g, D, 3) + 26));
  const stopPress = real >= stopF && real < stopF + 10;
  const verified = real >= stopF;
  const install = RESOLVE(prog(real, beatAfter(g, D, 9), beatAfter(g, D, 9) + 30));
  const endFrom = B - 72;
  const out = HOUSE(prog(real, endFrom - 10, endFrom + 10));
  const kick = beatPulse(g, real, 5, D, B);
  const shake = real < D && mem > 0.85 ? (Math.sin(real * 7) * 2.5 * (mem - 0.85)) / 0.12 : 0;
  return (
    <AbsoluteFill style={{ background: T.carbon, overflow: 'hidden' }}>
      <AbsoluteFill style={{ opacity: 1 - out, transform: `translate(${shake}px, 0) scale(${1 + 0.006 * kick - 0.08 * dash})`, filter: `blur(${4 * dash}px) brightness(${1 - 0.55 * dash})` }}>
        <div style={{ position: 'absolute', left: 140, top: 130, ...rec(1, 0, 500), fontSize: 22, letterSpacing: '0.2em', color: T.mineral3 }}>THIS MAC · {real < D ? 'NOBODY IS WATCHING' : 'CRASH GUARD IS WATCHING'}</div>
        <div style={{ position: 'absolute', left: 140, top: 168, fontFamily: T.serif, fontStyle: 'italic', fontSize: 80, color: T.mineral, width: 900, lineHeight: 1.05 }}>
          {real < 240 ? 'Agents, builds, and apps eat memory.' : real < D ? 'Activity Monitor sits there, unopened.' : 'Warned while there is still room.'}
        </div>
        <div style={{ position: 'absolute', left: 150, top: 470, display: 'flex', gap: 60 }}>
          <Ring p={mem} size={300} label="MEMORY" />
          <Ring p={disk} size={300} label="DISK USED" />
        </div>
        {/* process table, the real names from the Perf Pulse TUI */}
        <div style={{ position: 'absolute', left: 1030, top: 470, width: 760 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', ...rec(1, 0, 500), fontSize: 18, letterSpacing: '0.14em', color: T.mineral3, paddingBottom: 12, borderBottom: `1px solid ${T.mineral4}` }}>
            <span>PROCESS</span><span>MEM</span>
          </div>
          {PROCS.map(([name, gb], i) => {
            const grow = i === 0 ? mix(mix(2.2, gb, clamp(f / D)), 1.1, drain) : gb;
            return (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', ...rec(1, 0, 450), fontSize: 30, padding: '12px 0', color: i === 0 && real < stopF ? color(mem) : T.mineral2, textDecoration: verified && i === 0 && real < stopF + 50 ? 'line-through' : undefined }}>
                <span>{name}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{grow.toFixed(1)} GiB</span>
              </div>
            );
          })}
        </div>
        {ball > 0.01 ? (
          <div style={{ position: 'absolute', left: 900, top: 380, opacity: ball }}>
            <Beachball a={f * 14} size={96} />
          </div>
        ) : null}
      </AbsoluteFill>
      {/* the real dashboard */}
      {dash > 0.01 ? (
        <div style={{ position: 'absolute', left: 960, top: 540, width: 1500, transform: `translate(-50%, -50%) translateY(${(1 - dash) * 500}px) scale(${mix(0.9, 1, dash)})`, opacity: dash * (1 - out), borderRadius: 18, overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.7)', border: `1px solid ${T.mineral4}` }}>
          <Img src={staticFile('img/perf-pulse-crash-guard.jpg')} style={{ width: 1500, display: 'block' }} />
        </div>
      ) : null}
      {dash > 0.5 ? (
        <div style={{ position: 'absolute', left: 960, top: 930, display: 'flex', alignItems: 'center', gap: 18, padding: '18px 30px', borderRadius: 14, background: 'rgba(8,8,6,0.92)', border: `1px solid ${verified ? T.signal : T.mineral4}`, ...rec(1, 0, 500), fontSize: 26, color: T.mineral, opacity: (1 - out) * HOUSE(prog(real, beatAfter(g, D, 5), beatAfter(g, D, 5) + 10)), transform: `translateX(-50%) scale(${stopPress ? 0.96 : 1})` }}>
          <span style={{ color: T.heat }}>■</span> Stop safely
          <span style={{ color: verified ? T.signal : T.mineral3 }}>{verified ? '· process identity re-checked · signal sent' : '· revalidating identity'}</span>
        </div>
      ) : null}
      {/* the notification: before the freeze, not after */}
      {real >= D && real < beatAfter(g, D, 4) + 10 ? (
        <div style={{ position: 'absolute', right: 60, top: 60, width: 640, padding: '22px 26px', borderRadius: 18, background: 'rgba(40,40,36,0.96)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', transform: `translateX(${(1 - note) * 720}px)`, opacity: 1 - HOUSE(prog(real, beatAfter(g, D, 3), beatAfter(g, D, 4))) }}>
          <div style={{ ...rec(0, 0.2, 700), fontSize: 24, color: T.mineral }}>Perf Pulse · Crash Guard</div>
          <div style={{ ...rec(0, 0.2, 420), fontSize: 22, color: T.mineral2, marginTop: 6 }}>ChatGPT / Codex is projected to exhaust available memory in about 8 min.</div>
        </div>
      ) : null}
      {install > 0.01 ? (
        <div style={{ position: 'absolute', left: 140, top: 84, ...rec(1, 0, 500), fontSize: 30, color: T.signal, opacity: 1 - out, whiteSpace: 'pre' }}>
          $ {resolveText(''.padEnd(45, ' '), 'brew install hopeatina/perf-pulse/perf-pulse', install, 'pp', real)}
          <span style={{ color: T.mineral3, fontSize: 20 }}>{install >= 1 ? '   public tap · pinned SHA-256 · Rust' : ''}</span>
        </div>
      ) : null}
      <Flash a={real >= D ? 0.14 * Math.exp(-(real - D) / 6) : 0} />
      <EndCard g={g} index="03 / DEVELOPER TOOLING" title="Perf Pulse" line="It watches for the moment before the machine goes down." accent={T.signal} from={endFrom} />
      <Vignette />
      <Grain />
      <Score proj="perfpulse" />
    </AbsoluteFill>
  );
};
export const ppUnused = [ACCEL];
