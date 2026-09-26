import React from 'react';
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, clamp, mix, onN, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';
import { Cam, Key, X, Z, keyedCamera, v3 } from '../lib/space';
import { Blur, Box, Fog, Plane } from '../lib/World';
import cues from '../data/cues_perfpulse.json';

/**
 * PERF PULSE v2: "The minute before."
 * Frame 0 is the future: the rainbow beachball in macro, 14:39:07, not
 * responding. The clock rewinds and the camera yanks back
 * into the machine: a city of processes (tower height = resident memory),
 * and memory pressure as a tide rising through its streets on every hat.
 * The leaker (ChatGPT / Codex) grows on each step; the picture itself starts
 * dropping frames; the beachball rises over the skyline. Just before the
 * freeze, Crash Guard's real notification slams in, the beachball stops, and
 * on the drop the camera flies through it into the real dashboard. "Stop
 * safely" lands on the snare, identity re-checked, the leaker sinks, the tide
 * drains green. Rewatch: the end clock reads 14:39:07 again, responsive; the
 * notification's "about 9 min" is the gap between the two clocks.
 */
const g = GRIDS.perfpulse;
const C = cues.cue;
const D = C.drop;
const FOG: Fog = { near: 1800, far: 6000 };
const BLUE = '#48c7ff';

type Proc = { name: string; x: number; z: number; gib: number[] };
// resident memory per step (values end where the real TUI / dashboard screenshots do)
const NAMED: Proc[] = [
  { name: 'ChatGPT / Codex', x: -600, z: -1500, gib: [6.9, 7.4, 7.9, 8.4, 8.9, 9.4, 9.9] },
  { name: 'Google Chrome', x: -470, z: -1050, gib: [2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.1] },
  { name: 'VS Code Helper', x: 430, z: -950, gib: [2.2, 2.3, 2.5, 2.6, 2.7, 2.8, 2.8] },
  { name: 'node', x: -280, z: -560, gib: [0.3, 0.35, 0.4, 0.42, 0.45, 0.5, 0.5] },
  { name: 'com.docker.vmnetd', x: 620, z: -1750, gib: [1.8, 1.9, 1.9, 2.0, 2.0, 2.1, 2.1] },
];
const ANON = new Array(34).fill(0).map((_, i) => {
  const gx = (i % 7) - 3;
  const gz = Math.floor(i / 7);
  return { x: gx * 520 + 260 + (random(`ax${i}`) - 0.5) * 120, z: -500 - gz * 520 - (random(`az${i}`) - 0.5) * 160, gib: 0.3 + random(`ag${i}`) * 1.6 };
}).filter((b) => NAMED.every((n) => Math.hypot(n.x - b.x, n.z - b.z) > 330) && !(Math.abs(b.x) < 420 && b.z < -760));
const PX_PER_GIB = 88;

const step = (f: number) => C.grow.reduce((a, gf) => a + HOUSE(prog(f, gf, gf + 10)), 0); // 0..6
const gibAt = (p: Proc, f: number) => {
  const s = step(f);
  const i = Math.min(5, Math.floor(s));
  return mix(p.gib[i], p.gib[i + 1], s - i);
};
const LEVEL_MAX = 330;
const levelAt = (f: number) => {
  const fill = f < C.landed ? 0 : (40 + (step(f) / 6) * (LEVEL_MAX - 40)) * HOUSE(prog(f, C.landed, C.landed + 30));
  return mix(fill, 60, HOUSE(prog(f, C.gone - 20, C.gone + 40)));
};
const pressureCol = (p: number) => (p < 0.45 ? T.signal : p < 0.75 ? T.ochre : T.heat);

/** the clock: frozen future → rewind 8 min → time-lapse to the warning → time-lapse to the same minute, responsive */
const clockAt = (f: number) => {
  const T0 = 14 * 3600 + 39 * 60 + 7;
  const TR = T0 - 800 + 13; // 14:25:40
  const TW = T0 - 540; // 14:30:07, the warning: "about 9 min"
  let s: number;
  if (f < C.rewind) s = T0;
  else if (f < C.landed) s = mix(T0, TR, HOUSE(prog(f, C.rewind, C.landed - 4)));
  else if (f < C.warn) s = mix(TR, TW, prog(f, C.landed, C.warn));
  else s = mix(TW, T0, prog(f, C.warn, C.end - 6));
  s = Math.round(s);
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
};

// beachball height (world y of its centre): future peak → sinks on the rewind → rises into the freeze → stops at the warning → sets
const ballY = (f: number) => {
  if (f < C.rewind) return -650;
  if (f < C.landed + 10) return mix(-650, 500, HOUSE(prog(f, C.rewind, C.landed + 10)));
  if (f < C.gone - 20) return mix(500, -260, HOUSE(prog(f, 330, C.warn)));
  return mix(-260, 600, HOUSE(prog(f, C.gone - 20, C.gone + 40)));
};

const KEYS: Key[] = [
  [0, 0, -650, -3200, 980, 0, 0, 0], // the future: the beachball, macro
  [C.rewind, 0, -650, -3200, 900, 0, 0, 0],
  [C.landed, 0, -180, -700, 1500, 0, 11, 0], // yanked back into the machine
  [150, -420, -200, -1100, 1000, -26, 6, -1],
  [250, 220, -190, -1250, 900, 22, 5, 1],
  [330, -60, -230, -1150, 1050, -8, 7, 0],
  [C.freeze, 0, -300, -1300, 1400, 0, 5, 0],
  [C.warn, 0, -520, -900, 980, 0, 1, 0], // the notification, square on
  [D - 6, 0, -520, -900, 760, 0, 1, 0],
  [C.dash, 0, -900, -2600, 1650, 0, 0, 0], // through it: the dashboard
  [540, 60, -880, -2600, 1450, 3, 0, 0],
  [C.stop - 6, 102, -620, -2600, 1050, 5, 0, 0], // push to "Stop safely"
  [C.stop + 12, 102, -620, -2600, 980, 5, 0, 0],
  [C.gone, 0, -250, -1300, 2300, -6, 24, 0], // pull back over the city
  [C.end + 20, 0, -200, -1300, 2550, -8, 28, 0],
  [900, 0, -200, -1300, 2650, -8, 29, 0],
];
const CAM = keyedCamera(KEYS, [
  { frames: [C.landed], tau: 6, punch: 0.04, px: 10 },
  { frames: C.grow, tau: 5, punch: 0.02, px: 5 },
  { frames: [C.warn], tau: 4, punch: 0.03, px: 14 },
  { frames: [D], tau: 6, punch: 0.05, px: 10 },
  { frames: [C.stop], tau: 4, punch: 0.015, px: 4 },
]);

/** the picture drops frames before the freeze: on 2s, 3s, 5s, then it holds */
const worldFrame = (f: number) => {
  if (f < C.stutter[0]) return f;
  if (f < C.stutter[1]) return onN(f, 2);
  if (f < C.stutter[2]) return onN(f, 3);
  if (f < C.stutter[3]) return onN(f, 5);
  if (f < C.warn) return Math.min(onN(f, 8), C.freeze);
  return f;
};

const Tower: React.FC<{ cam: Cam; f: number; x: number; z: number; gib: number; name?: string; sink?: number }> = ({ cam, f, x, z, gib, name, sink = 0 }) => {
  const h = Math.max(40, gib * PX_PER_GIB) * (1 - sink);
  if (h < 2) return null;
  const level = levelAt(f);
  const p = level / LEVEL_MAX;
  const wet = clamp(level / h);
  const leaker = name === 'ChatGPT / Codex';
  const col = pressureCol(p);
  const face = (
    <>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${wet * 100}%`, background: `${col}22`, borderTop: `3px solid ${col}` }} />
      {name ? (
        <div style={{ position: 'absolute', left: 14, top: 12, right: 10 }}>
          <div style={{ ...rec(0.3, 0, 650), fontSize: leaker ? 26 : 21, color: leaker && f > C.grow[2] && f < C.stop ? T.heat : T.mineral, lineHeight: 1.1 }}>{name}</div>
          <div style={{ ...rec(1, 0, 500), fontSize: leaker ? 24 : 19, color: T.mineral2, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{gib.toFixed(1)} GiB</div>
        </div>
      ) : null}
    </>
  );
  return <Box cam={cam} c={v3(x, -h / 2, z)} size={[name ? 250 : 200, h, name ? 250 : 200]} color={name ? '#141a1e' : '#0e1215'} fog={FOG} face={face} edge={leaker && f < C.stop ? 'rgba(255,87,56,0.45)' : 'rgba(242,239,228,0.16)'} />;
};

const Beachball: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 0 80px rgba(255,255,255,0.12)' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'conic-gradient(#ff3b5c 0 60deg, #ff9500 60deg 120deg, #ffd60a 120deg 180deg, #34c759 180deg 240deg, #0a84ff 240deg 300deg, #bf5af2 300deg 360deg)', transform: `rotate(${f * 9}deg)` }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 36% 26%, rgba(255,255,255,0.8), rgba(255,255,255,0.15) 22%, rgba(255,255,255,0) 46%), radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)' }} />
  </div>
);

const World: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const level = levelAt(f);
  const p = level / LEVEL_MAX;
  const col = pressureCol(p);
  const by = ballY(f);
  const warnT = settle(prog(f, C.warn - 4, C.warn + 6), 1.0);
  const dashOn = HOUSE(prog(f, D - 8, D + 10));
  const sink = HOUSE(prog(f, C.stop + 10, C.gone));
  const stopPress = f >= C.stop && f < C.stop + 6;
  const verified = f >= C.stop + 4;
  return (
    <>
      {/* ground + water */}
      <Plane cam={cam} c={v3(0, 1, -1600)} U={X} V={Z} w={9000} h={7000} z={-400000}>
        <div style={{ position: 'absolute', inset: 0, background: '#060708', backgroundImage: 'linear-gradient(rgba(242,239,228,0.045) 2px, transparent 2px), linear-gradient(90deg, rgba(242,239,228,0.045) 2px, transparent 2px)', backgroundSize: '260px 260px' }} />
      </Plane>
      {level > 2 ? (
        <Plane cam={cam} c={v3(0, -level, -1600)} U={X} V={Z} w={9000} h={7000} z={-390000}>
          <div style={{ position: 'absolute', inset: 0, background: `${col}14`, backgroundImage: `linear-gradient(${col}30 2px, transparent 2px)`, backgroundSize: '100% 180px', backgroundPosition: `0 ${(f * 3) % 180}px` }} />
        </Plane>
      ) : null}
      {/* the beachball: the future, rising */}
      {by < 380 ? (
        <Plane cam={cam} c={v3(0, by, -3200)} w={700} h={700} z={-300000}>
          <Beachball f={f} />
        </Plane>
      ) : null}
      {/* the city */}
      {ANON.map((b, i) => (
        <Tower key={i} cam={cam} f={f} x={b.x} z={b.z} gib={b.gib * (1 + 0.06 * step(f))} />
      ))}
      {NAMED.map((n, i) => (
        <Tower key={n.name} cam={cam} f={f} x={n.x} z={n.z} gib={gibAt(n, f)} name={n.name} sink={i === 0 ? sink : 0} />
      ))}
      {/* the dashboard: the real Crash Guard surface, lit on the drop */}
      <Plane cam={cam} c={v3(0, -900, -2600)} w={2400} h={1350} opacity={dashOn} z={-200000}>
        <Img src={staticFile('img/perf-pulse-crash-guard.jpg')} style={{ width: 2400, height: 1350, display: 'block', borderRadius: 20, boxShadow: `0 0 120px rgba(183,243,74,${0.25 * dashOn})` }} />
        {/* "Stop safely": pressed on the snare */}
        {f >= C.stop - 20 ? (
          <div
            style={{
              position: 'absolute',
              left: 1222,
              top: 962,
              width: 159,
              height: 59,
              borderRadius: 10,
              border: `4px solid ${verified ? T.signal : T.ochre}`,
              boxShadow: `0 0 ${stopPress ? 50 : 24}px ${verified ? T.signal : T.ochre}`,
              transform: `scale(${stopPress ? 0.92 : 1})`,
              opacity: HOUSE(prog(f, C.stop - 20, C.stop - 8)),
            }}
          />
        ) : null}
        {verified ? (
          <div style={{ position: 'absolute', left: 900, top: 1036, padding: '8px 14px', borderRadius: 8, background: 'rgba(8,8,6,0.9)', ...rec(1, 0, 600), fontSize: 20, color: T.signal, opacity: HOUSE(prog(f, C.stop + 4, C.stop + 16)), whiteSpace: 'nowrap' }}>
            ✓ process identity re-checked · signal sent
          </div>
        ) : null}
      </Plane>
      {/* the notification: before the freeze, not after */}
      {f >= C.warn - 4 ? (
        <Plane cam={cam} c={v3(0, -520 - 260 * (1 - warnT), -900)} w={820} h={150} opacity={clamp(warnT * 3)}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 26, background: 'rgba(38,38,34,0.97)', boxShadow: '0 30px 80px rgba(0,0,0,0.7), inset 0 0 0 1.5px rgba(242,239,228,0.14)', display: 'flex', alignItems: 'center', gap: 22, padding: '0 28px' }}>
            <div style={{ width: 70, height: 70, borderRadius: 16, background: '#0c0f0a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width={46} height={30} viewBox="0 0 46 30">
                <path d="M2 16 H12 L17 4 L24 26 L30 12 L34 16 H44" stroke={T.signal} strokeWidth={4} fill="none" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div style={{ ...rec(0, 0, 700), fontSize: 25, color: T.mineral }}>Perf Pulse · Crash Guard</div>
              <div style={{ ...rec(0, 0, 420), fontSize: 22, color: T.mineral2, marginTop: 5, lineHeight: 1.25 }}>ChatGPT / Codex is projected to exhaust available memory in about 9 min.</div>
            </div>
          </div>
        </Plane>
      ) : null}
    </>
  );
};

export const PerfPulse: React.FC = () => {
  const f = useCurrentFrame();
  const fw = worldFrame(f);
  const cam = CAM.at(fw);
  const level = levelAt(fw);
  const p = level / LEVEL_MAX;
  const endDim = HOUSE(prog(f, C.end - 10, C.end + 16));
  const hook = f < C.rewind;
  const responsive = f >= C.gone;
  const line = (a: number, b: number) => HOUSE(prog(f, a, a + 14)) * (1 - HOUSE(prog(f, b, b + 10)));
  const words: [string, number][] = [
    ['Agents, builds and apps eat memory.', line(80, C.stutter[0] - 10)],
    ['Nothing warns you.', line(C.stutter[0], C.warn - 4)],
    ['Warned while there is still room.', line(C.dash + 6, C.gone - 6)],
  ];
  const install = RESOLVE(prog(f, C.install, C.install + 40));
  const shake = f >= C.stutter[0] && f < C.warn ? (random(`sh${Math.floor(fw)}`) - 0.5) * 6 : 0;
  return (
    <AbsoluteFill style={{ background: '#040506', overflow: 'hidden' }}>
      <Blur
        ranges={[
          [C.rewind, C.landed + 6, 10],
          [D - 10, C.dash + 8, 10],
          [C.stop + 14, C.gone + 20, 8],
        ]}
      >
        <AbsoluteFill style={{ filter: `brightness(${1 - 0.75 * endDim}) blur(${5 * endDim}px)`, transform: `translateX(${shake}px)` }}>
          <World f={fw} cam={cam} />
        </AbsoluteFill>
      </Blur>
      <AbsoluteFill style={{ opacity: 1 - endDim }}>
        {/* the clock: the whole film's caption */}
        <div style={{ position: 'absolute', left: 120, top: 92, display: 'flex', alignItems: 'baseline', gap: 22 }}>
          <span style={{ ...rec(1, 0, 600), fontSize: 44, color: T.mineral, fontVariantNumeric: 'tabular-nums' }}>{clockAt(fw)}</span>
          <span style={{ ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.18em', color: hook ? T.heat : responsive ? T.signal : f < C.landed ? T.ochre : T.mineral3 }}>
            {hook ? 'NOT RESPONDING' : f < C.landed ? '◀◀ REWIND' : responsive ? 'RESPONSIVE' : f >= C.warn ? 'CRASH GUARD IS WATCHING' : 'THIS MAC'}
          </span>
        </div>
        {/* memory pressure */}
        {!hook ? (
          <div style={{ position: 'absolute', right: 120, top: 100, width: 380 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', ...rec(1, 0, 550), fontSize: 17, letterSpacing: '0.14em', color: T.mineral3 }}>
              <span>MEMORY PRESSURE</span>
              <span style={{ color: pressureCol(p), fontVariantNumeric: 'tabular-nums' }}>{Math.round(18 + 80 * p)}%</span>
            </div>
            <div style={{ marginTop: 10, height: 8, borderRadius: 4, background: 'rgba(242,239,228,0.1)' }}>
              <div style={{ width: `${18 + 80 * p}%`, height: '100%', borderRadius: 4, background: pressureCol(p) }} />
            </div>
          </div>
        ) : null}
        {words.map(([w, o]) =>
          o > 0.002 ? (
            <div key={w} style={{ position: 'absolute', left: 120, bottom: 104, fontFamily: T.serif, fontStyle: 'italic', fontSize: 76, color: T.mineral, opacity: o, clipPath: `inset(0 ${(1 - o) * 100}% -20% 0)` }}>
              {w}
            </div>
          ) : null
        )}
        {install > 0.01 ? (
          <div style={{ position: 'absolute', left: 120, bottom: 110, ...rec(1, 0, 500), fontSize: 34, color: T.signal, whiteSpace: 'pre' }}>
            $ {resolveText(''.padEnd(45, ' '), 'brew install hopeatina/perf-pulse/perf-pulse', install, 'pp', f)}
            <span style={{ color: T.mineral3, fontSize: 20 }}>{install >= 1 ? '   public tap · pinned SHA-256 · Rust' : ''}</span>
          </div>
        ) : null}
      </AbsoluteFill>
      <Flash a={f >= C.warn ? 0.06 * Math.exp(-(f - C.warn) / 4) : 0} />
      <Flash a={f >= D ? 0.16 * Math.exp(-(f - D) / 5) : 0} color="183,243,74" />
      <EndCard g={g} index="03 / DEVELOPER TOOLING" title="Perf Pulse" line="A warning while there is still room to act." accent={T.signal} from={C.end} />
      <Vignette s={0.62} />
      <Grain />
      <Audio src={staticFile('audio/perfpulse_mix.wav')} />
    </AbsoluteFill>
  );
};
