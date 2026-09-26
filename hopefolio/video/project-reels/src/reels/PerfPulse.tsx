import React from 'react';
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';
import { Cam, X, Z, edit, v3 } from '../lib/space';
import { Blur, Box, DofCtx, Fog, Plane } from '../lib/World';
import { Bokeh, Glow, Grade, Letterbox, hold } from '../lib/Env';
import { Laptop, screenFrame } from '../lib/Laptop';
import { BrandEnd } from '../lib/BrandEnd';
import cues from '../data/cues_perfpulse.json';

/**
 * PERF PULSE v3: "The minute before."
 * Frame 0 is the future: a video call frozen mid-sentence, the beachball over
 * it, the brand's red pulse line flat, 14:39:07 not responding. Rewind. This
 * time, at a red-lit desk at night, the call looks fine (surface) while we
 * push through the screen into the machine (reality): a city of processes
 * under a rising memory tide, the leaker growing, the picture dropping frames.
 * Cut back to the screen just as Crash Guard's real warning lands, nine
 * minutes early; the real dashboard; Stop safely on the snare. Below, the
 * leaker sinks and the tide drains. Above, at 14:39:07 (the same second), the
 * call is still smooth and the pulse line beats.
 */
const g = GRIDS.perfpulse;
const C = cues.cue;
const D = C.drop;
const RED = '#dc2626';
const RED_D = '#b91c1c';
const BLUE = '#2f7cf6';
const SANS = 'system-ui, -apple-system, Helvetica Neue, sans-serif';
const FOG: Fog = { near: 1800, far: 6000 };

// ── the machine: tower height = resident memory, a tide of pressure
type Proc = { name: string; x: number; z: number; gib: number[] };
const NAMED: Proc[] = [
  { name: 'ChatGPT / Codex', x: -600, z: -1500, gib: [6.9, 7.4, 7.9, 8.4, 8.9, 9.9] },
  { name: 'Google Chrome', x: 420, z: -1100, gib: [2.6, 2.7, 2.8, 2.9, 3.0, 3.1] },
  { name: 'VS Code Helper', x: -150, z: -700, gib: [2.2, 2.3, 2.5, 2.6, 2.7, 2.8] },
  { name: 'Call', x: 700, z: -1900, gib: [1.1, 1.1, 1.2, 1.2, 1.2, 1.2] },
];
const ANON = new Array(30)
  .fill(0)
  .map((_, i) => ({ x: ((i % 6) - 2.5) * 560 + (random(`ax${i}`) - 0.5) * 160, z: -500 - Math.floor(i / 6) * 560 - random(`az${i}`) * 200, gib: 0.3 + random(`ag${i}`) * 1.5 }))
  .filter((b) => NAMED.every((n) => Math.hypot(n.x - b.x, n.z - b.z) > 360));
const step = (f: number) => C.grow.reduce((a, gf) => a + HOUSE(prog(f, gf, gf + 10)), 0) + (f >= C.freeze ? 1 : 0); // 0..5
const gibAt = (p: Proc, f: number) => {
  const s = Math.min(5, step(f));
  const i = Math.min(4, Math.floor(s));
  return mix(p.gib[i], p.gib[i + 1], s - i);
};
const LEVEL_MAX = 360;
const levelAt = (f: number) => mix(40 + (step(f) / 5) * (LEVEL_MAX - 40), 50, HOUSE(prog(f, C.stop + 6, C.stop + 40)));
const sinkAt = (f: number) => HOUSE(prog(f, C.stop + 6, C.calm));

/** frozen future → rewind → time-lapse to the warning → time-lapse to the same second, responsive */
const clockAt = (f: number) => {
  const T0 = 14 * 3600 + 39 * 60 + 7;
  const TR = T0 - 800 + 13;
  const TW = T0 - 540;
  let s: number;
  if (f < C.rewind) s = T0;
  else if (f < C.landed) s = mix(T0, TR, HOUSE(prog(f, C.rewind, C.landed - 4)));
  else if (f < C.warn) s = mix(TR, TW, prog(f, C.landed, C.warn));
  else s = mix(TW, T0, prog(f, C.warn, C.end - 8));
  s = Math.round(s);
  return `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

// ── the desk (desk top y = 0)
const SW = 940;
const SH = 600;
const HINGE = v3(0, -22, -380);
const SF = screenFrame(HINGE, SW, SH, 0.24);
const tile = SF.at(330, 300);
const menu = SF.at(860, 18);
const bannerAt = SF.at(700, 90);
const stopAt = SF.at(640, 470);

const EDIT = edit([
  { name: 'freeze', from: 0, keys: [[0, SF.center.x, SF.center.y + 20, SF.center.z, 2300, 0, 1, 0, 85], [C.rewind, SF.center.x, SF.center.y + 20, SF.center.z, 2150, 0, 1, 0, 85]], hand: { px: 4, roll: 0.3 } },
  { name: 'rewind', from: C.rewind, keys: [[C.rewind, SF.center.x, SF.center.y + 20, SF.center.z, 2150, 0, 1, 0, 85], [C.landed, 0, -300, -300, 3900, -10, 6, 0, 35]] },
  { name: 'desk', from: C.landed, keys: [[C.landed, 0, -300, -300, 3900, -10, 6, 0, 35], [C.inserts[0], 0, -300, -300, 3600, -6, 6, 0, 35]], hand: { px: 7, roll: 0.5 } },
  { name: 'call', from: C.inserts[0], keys: [[C.inserts[0], tile.x, tile.y, tile.z, 1500, 4, 1, 0, 85], [C.inserts[1], tile.x, tile.y, tile.z, 1380, 3, 1, 0, 85]], hand: { px: 3 } },
  { name: 'menubar', from: C.inserts[1], keys: [[C.inserts[1], menu.x - 60, menu.y + 60, menu.z, 1700, -4, 1, 0, 85], [C.through, menu.x - 60, menu.y + 60, menu.z, 1550, -4, 1, 0, 85]] },
  { name: 'through', from: C.through, keys: [[C.through, SF.center.x, SF.center.y, SF.center.z, 2600, 0, 2, 0, 35], [C.city - 1, SF.center.x, SF.center.y, SF.center.z, 380, 0, 0, 0, 35]] },
  {
    name: 'city',
    from: C.city,
    keys: [
      [C.city, 0, -300, -600, 1700, 0, 10, 0, 24],
      [300, -420, -220, -1100, 1150, -24, 6, -1, 24],
      [360, 150, -260, -1300, 1100, 18, 6, 1, 24],
      [C.freeze, 0, -330, -1300, 1500, 0, 5, 0, 24],
    ],
    hand: { px: 6, roll: 0.6 },
    kicks: [{ frames: C.grow, tau: 5, punch: 0.03, px: 8 }],
  },
  { name: 'warn', from: C.freeze, keys: [[C.freeze, bannerAt.x - 140, bannerAt.y + 60, bannerAt.z, 1900, 0, 1, 0, 50], [D, bannerAt.x - 60, bannerAt.y + 40, bannerAt.z, 1500, 0, 1, 0, 50]], kicks: [{ frames: [C.warn], tau: 4, punch: 0.03, px: 10 }] },
  { name: 'dash', from: D, keys: [[D, SF.center.x, SF.center.y, SF.center.z, 2100, 0, 1, 0, 50], [540, SF.center.x + 40, SF.center.y, SF.center.z, 1900, 0, 1, 0, 50], [C.stop - 6, stopAt.x, stopAt.y, stopAt.z, 1150, 0, 1, 0, 50]], kicks: [{ frames: [D], tau: 6, punch: 0.04, px: 8 }] },
  { name: 'drain', from: C.stop + 4, keys: [[C.stop + 4, -300, -250, -1300, 1900, -14, 16, 0, 24], [C.calm, 0, -200, -1300, 2600, -8, 24, 0, 24]] },
  { name: 'calm', from: C.calm, keys: [[C.calm, 0, -320, -300, 3300, -8, 5, 0, 35], [C.end, 0, -320, -300, 3500, -8, 5, 0, 35]] },
]);

const PulseMark: React.FC<{ size: number; bg?: string }> = ({ size, bg = BLUE }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.24, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width={size * 0.66} height={size * 0.44} viewBox="0 0 46 30">
      <path d="M2 16 H12 L17 4 L24 26 L30 12 L34 16 H44" stroke="#fff" strokeWidth={4} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  </div>
);

/** The pixel beachball: macOS's spinning wait cursor. */
const Beachball: React.FC<{ f: number; size: number }> = ({ f, size }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', position: 'relative', boxShadow: '0 6px 30px rgba(0,0,0,0.5)' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'conic-gradient(#ff3b5c 0 60deg, #ff9500 60deg 120deg, #ffd60a 120deg 180deg, #34c759 180deg 240deg, #0a84ff 240deg 300deg, #bf5af2 300deg 360deg)', transform: `rotate(${f * 12}deg)` }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 36% 26%, rgba(255,255,255,0.8), rgba(255,255,255,0.15) 22%, transparent 46%)' }} />
  </div>
);

/** The screen: a video call (surface), the warning, the real dashboard. */
const Screen: React.FC<{ f: number }> = ({ f }) => {
  const frozen = f < C.rewind;
  const rewinding = f >= C.rewind && f < C.landed;
  const choppy = f >= C.freeze && f < C.warn;
  const t = frozen ? 0 : choppy ? hold(f, 9) : f;
  const watching = f >= C.landed;
  const bannerT = settle(prog(f, C.warn - 3, C.warn + 7), 1.0);
  const dash = f >= D && f < C.calm - 4;
  const stopPress = f >= C.stop && f < C.stop + 6;
  const verified = f >= C.stop + 4;
  const pressure = clamp(0.2 + 0.75 * (step(f) / 5) - 0.7 * sinkAt(f));
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0d0f13', fontFamily: SANS, color: '#eef1f6', overflow: 'hidden' }}>
      {/* menubar */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: 'rgba(255,255,255,0.06)', fontSize: 20 }}>
        <span style={{ fontWeight: 650 }}>Call</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {watching ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <PulseMark size={28} />
              <span style={{ width: 80, height: 8, borderRadius: 3, background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
                <span style={{ display: 'block', width: `${pressure * 100}%`, height: '100%', background: pressure > 0.7 ? RED : pressure > 0.45 ? '#f59e0b' : '#22c55e' }} />
              </span>
            </span>
          ) : null}
          <span style={{ ...rec(1, 0, 600), fontVariantNumeric: 'tabular-nums' }}>{clockAt(f)}</span>
        </span>
      </div>
      {/* the call */}
      {!dash ? (
        <div style={{ position: 'absolute', left: 16, right: 16, top: 50, bottom: 70, display: 'flex', gap: 12 }}>
          <div style={{ flex: 2, borderRadius: 14, background: 'linear-gradient(160deg, #283348, #1a2231)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%,-50%)', width: 150, height: 150, borderRadius: 75, background: '#c47a53', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, fontWeight: 700, color: '#fff' }}>D</div>
            <div style={{ position: 'absolute', left: '50%', top: '72%', transform: 'translateX(-50%)', display: 'flex', gap: 5, alignItems: 'center', height: 40 }}>
              {new Array(9).fill(0).map((_, i) => (
                <span key={i} style={{ width: 7, borderRadius: 4, background: '#8fd3ff', height: 8 + 28 * Math.abs(Math.sin(t / 5 + i * 1.3)) * (frozen ? 0.3 : 1) }} />
              ))}
            </div>
            <div style={{ position: 'absolute', left: 14, bottom: 12, fontSize: 16, padding: '4px 10px', borderRadius: 8, background: 'rgba(0,0,0,0.45)' }}>Dana · speaking</div>
            {frozen || rewinding ? (
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(90deg, rgba(40,52,72,0.9) 50%, rgba(60,76,100,0.9) 50%), linear-gradient(rgba(40,52,72,0.5) 50%, rgba(80,96,120,0.5) 50%)', backgroundSize: '44px 44px', mixBlendMode: 'hard-light', opacity: 0.85 }} />
            ) : null}
            {frozen ? (
              <>
                <div style={{ position: 'absolute', left: '50%', top: '45%', transform: 'translate(-50%,-50%)' }}>
                  <Beachball f={f} size={110} />
                </div>
                <div style={{ position: 'absolute', right: 14, bottom: 14, fontSize: 17, fontWeight: 650, padding: '6px 12px', borderRadius: 8, background: 'rgba(220,38,38,0.9)' }}>Call not responding</div>
              </>
            ) : null}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ flex: 1, borderRadius: 14, background: '#f4f1ea', color: '#1b1b1b', padding: 16 }}>
              <div style={{ fontSize: 13, color: '#777' }}>You · presenting</div>
              <div style={{ fontSize: 26, fontWeight: 700, marginTop: 10 }}>Q3 plan</div>
              <div style={{ marginTop: 12, height: 10, width: '80%', background: '#ddd', borderRadius: 5 }} />
              <div style={{ marginTop: 8, height: 10, width: '60%', background: '#ddd', borderRadius: 5 }} />
            </div>
            <div style={{ flex: 1, borderRadius: 14, background: '#1f2735', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 700, color: '#9aa4b5' }}>You</div>
          </div>
        </div>
      ) : null}
      {!dash ? (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 16, display: 'flex', justifyContent: 'center', gap: 14 }}>
          {['#39404d', '#39404d', '#39404d', RED].map((c, i) => (
            <span key={i} style={{ width: i === 3 ? 90 : 44, height: 44, borderRadius: 22, background: c }} />
          ))}
        </div>
      ) : null}
      {/* the real dashboard */}
      {dash ? (
        <div style={{ position: 'absolute', left: 0, top: 36, width: SW, height: SH - 36, overflow: 'hidden' }}>
          <Img src={staticFile('img/perf-pulse-crash-guard.jpg')} style={{ width: SW, height: (SW * 717) / 1274 }} />
          {f >= C.stop - 20 ? (
            <div style={{ position: 'absolute', left: (651 / 1274) * SW - 4, top: (513 / 717) * ((SW * 717) / 1274) - 4, width: (80 / 1274) * SW + 8, height: (27 / 717) * ((SW * 717) / 1274) + 8, borderRadius: 8, border: `3px solid ${verified ? '#22c55e' : '#f59e0b'}`, boxShadow: `0 0 ${stopPress ? 30 : 14}px ${verified ? '#22c55e' : '#f59e0b'}`, transform: `scale(${stopPress ? 0.9 : 1})`, opacity: HOUSE(prog(f, C.stop - 20, C.stop - 8)) }} />
          ) : null}
          {verified ? <div style={{ position: 'absolute', left: 300, top: 420, padding: '8px 14px', borderRadius: 8, background: 'rgba(8,8,10,0.92)', ...rec(1, 0, 600), fontSize: 18, color: '#22c55e', opacity: HOUSE(prog(f, C.stop + 4, C.stop + 14)), whiteSpace: 'nowrap' }}>✓ process identity re-checked · signal sent</div> : null}
        </div>
      ) : null}
      {/* the warning: before the freeze, not after */}
      {f >= C.warn - 3 && f < D + 8 ? (
        <div style={{ position: 'absolute', right: 14, top: 48, width: 430, padding: '14px 16px', borderRadius: 16, background: 'rgba(42,44,50,0.97)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)', transform: `translateX(${(1 - clamp(bannerT)) * 470}px)`, display: 'flex', gap: 12 }}>
          <PulseMark size={44} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Perf Pulse · Crash Guard</div>
            <div style={{ fontSize: 15, color: 'rgba(238,241,246,0.8)', marginTop: 4, lineHeight: 1.3 }}>ChatGPT / Codex is projected to exhaust available memory in about 9 min.</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const Desk: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => (
  <>
    <Plane cam={cam} c={v3(0, -1500, -2600)} w={11000} h={8000} z={-300000}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #120b0c, #1c0f10 60%, #0d0708)' }}>
        {/* the red LED strip and its wash */}
        <div style={{ position: 'absolute', left: 1500, right: 1500, top: 3900, height: 40, background: '#ff2d2d', boxShadow: '0 0 60px 20px rgba(255,40,40,0.9), 0 0 400px 160px rgba(220,38,38,0.45)' }} />
        {/* a window: cool city against the red */}
        <div style={{ position: 'absolute', left: 6800, top: 1200, width: 2600, height: 2400, background: 'linear-gradient(180deg, #081226, #13254a)', boxShadow: 'inset 0 0 0 50px #0b0607' }}>
          {new Array(60).fill(0).map((_, i) => (
            <div key={i} style={{ position: 'absolute', left: 60 + random(`px${i}`) * 2480, top: 900 + random(`py${i}`) * 1400, width: 8 + random(`ps${i}`) * 20, height: 8 + random(`ps${i}`) * 20, borderRadius: '50%', background: random(`pc${i}`) > 0.6 ? '#9ec5ff' : '#ffd9a8', opacity: 0.4 + 0.5 * random(`pa${i}`), filter: 'blur(3px)' }} />
          ))}
        </div>
      </div>
    </Plane>
    <Box cam={cam} c={v3(0, 60, -200)} size={[4400, 120, 1800]} color="#161113" edge="rgba(0,0,0,0.4)" z={-200000} top={<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, #1a1214, #2a1517 70%, #3a1719)' }} />} />
    {/* keyboard + mug */}
    <Box cam={cam} c={v3(-1500, -14, 60)} size={[900, 28, 320]} color="#26262b" z={-100000} top={<div style={{ position: 'absolute', inset: 14, backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.5) 2px, transparent 2px), linear-gradient(rgba(0,0,0,0.5) 2px, transparent 2px)', backgroundSize: '58px 58px', background: '#34343a' }} />} />
    <Plane cam={cam} c={v3(1250, -110, -80)} w={160} h={220} z={4000}>
      <svg width={160} height={220} viewBox="0 0 160 220">
        <rect x={20} y={40} width={100} height={170} rx={14} fill="#2b2b30" />
        <path d="M120 80 C155 80 155 150 120 150" stroke="#2b2b30" strokeWidth={14} fill="none" />
      </svg>
    </Plane>
    <Laptop cam={cam} hinge={HINGE} w={SW} h={SH} angle={0.24} screen={<Screen f={f} />} glow="rgba(120,150,220,0.35)" />
  </>
);

const Tower: React.FC<{ cam: Cam; f: number; x: number; z: number; gib: number; name?: string; sink?: number }> = ({ cam, f, x, z, gib, name, sink = 0 }) => {
  const h = Math.max(40, gib * 90) * (1 - sink);
  if (h < 2) return null;
  const level = levelAt(f);
  const p = level / LEVEL_MAX;
  const wet = clamp(level / h);
  const leaker = name === 'ChatGPT / Codex';
  const col = f >= C.stop + 20 ? '#22c55e' : p < 0.55 ? '#f59e0b' : RED;
  const face = (
    <>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${wet * 100}%`, background: `${col}33`, borderTop: `4px solid ${col}` }} />
      {name ? (
        <div style={{ position: 'absolute', left: 16, top: 14, right: 12, fontFamily: SANS }}>
          <div style={{ fontSize: leaker ? 30 : 24, fontWeight: 700, color: leaker && f < C.stop ? '#ff6b6b' : '#f5f0f0', lineHeight: 1.1 }}>{name}</div>
          <div style={{ ...rec(1, 0, 600), fontSize: leaker ? 28 : 21, color: 'rgba(245,240,240,0.7)', marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>{gib.toFixed(1)} GiB</div>
        </div>
      ) : null}
    </>
  );
  return <Box cam={cam} c={v3(x, -h / 2, z)} size={[name ? 290 : 220, h, name ? 290 : 220]} color={name ? '#1f1416' : '#170f11'} fog={FOG} face={face} edge={leaker && f < C.stop ? 'rgba(255,60,60,0.6)' : 'rgba(255,200,200,0.14)'} />;
};

const City: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const level = levelAt(f);
  const p = level / LEVEL_MAX;
  const col = f >= C.stop + 20 ? '#22c55e' : p < 0.55 ? '#f59e0b' : RED;
  const sink = sinkAt(f);
  return (
    <>
      <Plane cam={cam} c={v3(0, 1, -1600)} U={X} V={Z} w={9000} h={7000} z={-400000}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, #3a0d10, #150708 70%)', backgroundImage: 'linear-gradient(rgba(255,80,80,0.07) 2px, transparent 2px), linear-gradient(90deg, rgba(255,80,80,0.07) 2px, transparent 2px)', backgroundSize: '280px 280px' }} />
      </Plane>
      <Plane cam={cam} c={v3(0, -1400, -5200)} w={16000} h={4000} z={-390000}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 90%, ${col}55, transparent 60%)` }} />
      </Plane>
      <Plane cam={cam} c={v3(0, -level, -1600)} U={X} V={Z} w={9000} h={7000} z={-380000}>
        <div style={{ position: 'absolute', inset: 0, background: `${col}1c`, backgroundImage: `linear-gradient(${col}40 2px, transparent 2px)`, backgroundSize: '100% 180px', backgroundPosition: `0 ${(f * 3) % 180}px` }} />
      </Plane>
      {ANON.map((b, i) => (
        <Tower key={i} cam={cam} f={f} x={b.x} z={b.z} gib={b.gib * (1 + 0.06 * step(f))} />
      ))}
      {NAMED.map((n, i) => (
        <Tower key={n.name} cam={cam} f={f} x={n.x} z={n.z} gib={gibAt(n, f)} name={n.name} sink={i === 0 ? sink : 0} />
      ))}
    </>
  );
};

/** The brand's pulse line along the bottom of the frame: flat at the freeze, beating once it's safe. */
const PulseLine: React.FC<{ f: number; stress: number; flat: boolean }> = ({ f, stress, flat }) => {
  const pts: string[] = [];
  for (let x = 0; x <= 1920; x += 12) {
    const ph = (x / 1920) * 6 - f / 18;
    const beat = Math.max(0, Math.sin(ph * Math.PI)) ** 18;
    const y = flat ? 0 : -beat * (40 + 60 * stress) + Math.sin(x / 30 + f / 4) * 3 * stress;
    pts.push(`${x},${1010 + y}`);
  }
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, zIndex: 905000, pointerEvents: 'none' }}>
      <polyline points={pts.join(' ')} stroke={flat ? RED : stress > 0.6 ? RED : '#22c55e'} strokeWidth={3} fill="none" opacity={0.9} />
    </svg>
  );
};

export const PerfPulse: React.FC = () => {
  const f = useCurrentFrame();
  const { shot, focus } = EDIT.at(f);
  const inCity = shot.name === 'city' || shot.name === 'drain';
  const fw = inCity && f >= C.stutter[0] && f < C.freeze ? (f < C.stutter[1] ? hold(f, 2) : f < C.stutter[2] ? hold(f, 3) : f < C.stutter[3] ? hold(f, 5) : hold(f, 8)) : f;
  const cam = EDIT.at(fw).cam;
  const stress = clamp(step(f) / 5 - sinkAt(f));
  const macro = ['freeze', 'call', 'menubar', 'warn', 'dash'].includes(shot.name);
  const dof = { focus, aperture: macro ? 1.2 : inCity ? 0.2 : 0.7 };
  const rewinding = f >= C.rewind && f < C.landed;
  const throughT = shot.name === 'through' ? prog(f, C.through, C.city) : 0;
  const install = RESOLVE(prog(f, C.install, C.install + 40));
  return (
    <AbsoluteFill style={{ background: inCity ? '#150708' : '#0c0708', overflow: 'hidden' }}>
      <Blur
        ranges={[
          [C.rewind, C.landed, 6],
          [C.through + 8, C.city + 4, 6],
          [C.stop + 4, C.stop + 24, 6],
        ]}
      >
        <DofCtx.Provider value={dof}>
          <AbsoluteFill style={{ isolation: 'isolate', filter: rewinding ? 'hue-rotate(-20deg) saturate(1.4)' : undefined }}>{inCity ? <City f={fw} cam={cam} /> : <Desk f={fw} cam={cam} />}</AbsoluteFill>
        </DofCtx.Provider>
      </Blur>
      {!inCity ? (
        <>
          <Glow x={960} y={1080} r={1100} color="rgba(220,38,38,0.45)" a={0.6} />
          <Grade tint={RED_D} a={0.18} />
        </>
      ) : (
        <Bokeh n={20} seed="pp" colors={['rgba(255,80,80,0.5)', 'rgba(255,200,160,0.3)']} area={[0, 0, 1920, 500]} size={[10, 34]} f={f} a={0.35} />
      )}
      {/* the push through the screen: its glow fills the frame on the way in */}
      {throughT > 0.6 ? <AbsoluteFill style={{ background: '#0d0f13', opacity: (throughT - 0.6) / 0.4, zIndex: 700000 }} /> : null}
      {rewinding ? (
        <AbsoluteFill style={{ zIndex: 910000, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 6px)', mixBlendMode: 'screen' }}>
          <div style={{ position: 'absolute', left: 120, bottom: 140, ...rec(1, 0, 700), fontSize: 64, color: '#fff' }}>◀◀</div>
        </AbsoluteFill>
      ) : null}
      {/* the clock: the whole film's caption */}
      {f < C.end ? (
        <div style={{ position: 'absolute', left: 120, top: 84, display: 'flex', alignItems: 'baseline', gap: 22, zIndex: 910000 }}>
          <span style={{ ...rec(1, 0, 650), fontSize: 46, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{clockAt(f)}</span>
          <span style={{ ...rec(1, 0, 650), fontSize: 20, letterSpacing: '0.18em', color: f < C.rewind ? '#ff6b6b' : f >= C.calm ? '#22c55e' : inCity ? '#ffb3b3' : 'rgba(255,255,255,0.6)' }}>
            {f < C.rewind ? 'NOT RESPONDING' : rewinding ? 'REWIND' : f >= C.calm ? 'RESPONSIVE · STILL ON THE CALL' : inCity ? 'INSIDE THE MACHINE' : f >= C.warn ? 'CRASH GUARD IS WATCHING' : 'ON A CALL · LOOKS FINE'}
          </span>
        </div>
      ) : null}
      {install > 0.01 && f < C.end ? (
        <div style={{ position: 'absolute', left: 120, bottom: 110, ...rec(1, 0, 550), fontSize: 34, color: '#fff', whiteSpace: 'pre', zIndex: 910000 }}>
          $ {resolveText(''.padEnd(45, ' '), 'brew install hopeatina/perf-pulse/perf-pulse', install, 'pp', f)}
        </div>
      ) : null}
      {f < C.end ? <PulseLine f={f} stress={stress} flat={f < C.rewind || (f >= C.freeze && f < C.warn)} /> : null}
      <Letterbox t={inCity ? 1 : 0} />
      <Flash a={f >= D ? 0.14 * Math.exp(-(f - D) / 5) : 0} color="47,124,246" />
      <Flash a={f >= C.warn ? 0.06 * Math.exp(-(f - C.warn) / 4) : 0} />
      <BrandEnd
        g={g}
        from={C.end}
        bg={`linear-gradient(135deg, ${RED_D}, ${RED})`}
        accent="#fff"
        muted="rgba(255,255,255,0.8)"
        kicker="RUST · LOCAL-FIRST · MACOS"
        wipe="left"
        logo={
          <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
            <PulseMark size={130} bg="rgba(255,255,255,0.16)" />
            <div style={{ fontFamily: SANS, fontSize: 170, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>PerfPulse</div>
          </div>
        }
        line="A warning while there is still room to act."
      >
        <svg width={900} height={120} viewBox="0 0 900 120">
          <polyline points={new Array(76).fill(0).map((_, i) => { const x = i * 12; const ph = (x / 900) * 3 - (f - C.end) / 20; const b = Math.max(0, Math.sin(ph * Math.PI)) ** 16; return `${x},${70 - b * 55}`; }).join(' ')} stroke="#fff" strokeWidth={4} fill="none" opacity={0.85} />
        </svg>
      </BrandEnd>
      <Vignette s={0.55} />
      <Grain />
      <Audio src={staticFile('audio/perfpulse_mix.wav')} />
    </AbsoluteFill>
  );
};

