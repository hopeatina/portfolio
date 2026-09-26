import React from 'react';
import { AbsoluteFill, random, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { Cam, X, Z, edit, v3 } from '../lib/space';
import { Blur, Box, DofCtx, Plane } from '../lib/World';
import { Glow, Grade, Letterbox } from '../lib/Env';
import { Laptop, screenFrame } from '../lib/Laptop';
import { BrandEnd } from '../lib/BrandEnd';
import { ANTIC, at, handheld, pulse, sub } from '../lib/score';
import hitsJson from '../data/hits_perfpulse.json';

/**
 * PERF PULSE v4: "Out of memory."
 *
 * The problem, shown instead of named. Frame 0 is the moment every developer
 * knows: mid-screen-share, macOS says "Your system has run out of application
 * memory" and the call freezes. Rewind nine minutes. One continuous move goes
 * through the lid into the memory itself: an 18 GB glass column where every
 * app is a block, and one block (ChatGPT / Codex, the real runaway pattern
 * from Perf Pulse's own incident list) grows on every beat. Crash Guard draws
 * the forecast: at this rate the column is full at 14:39, the freeze we just
 * saw. In the silence before the drop its warning arrives, nine minutes early.
 * The real dashboard; Stop safely re-checks the process identity; the block
 * dissolves and the column drops. The same move in reverse back out through
 * the lid: 14:39:07, the same second, still on the call.
 *
 * Camera psychology: the problem is handheld on a long lens, off-centre; the
 * mechanism is symmetrical and slow (the viewer is being taught); the fix is
 * a steady push; the ending is still. Subliminal: six real macOS daemons in
 * the system block light their initials for 8 frames: B-E-F-O-R-E.
 */
const g = GRIDS.perfpulse;
const M = g.markers as Record<string, number>;
const H = { snare: at(hitsJson.snare as [number, number][]), hat: at(hitsJson.hat as [number, number][]), note: hitsJson.note as number[] };
const FRZ = Math.round(M.freeze);
const RW = Math.round(M.rewind);
const IN = Math.round(M.inside);
const NOTE = Math.round(M.notify);
const D = Math.round(M.drop);
const STOP = Math.round(M.stop);
const OUT = Math.round(M.out);
const END = Math.round(M.end);
const THRU = IN + 72; // the lid is passed
const DASH_OUT = STOP + 26; // back to the column
const DESK2 = OUT + 20; // back through the lid

const RED = '#dc2626';
const RED_D = '#b91c1c';
const BLUE = '#2f7cf6';
const GREEN = '#34c759';
const AMBER = '#f5a524';
const SANS = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", system-ui, sans-serif';
const beats = g.beats;

// ── the numbers (consistent with Crash Guard's real incident: +738 MB/min, "about 9 min")
const CEIL = 18;
const SYSTEM = [
  { n: 'bird', gb: 0.3 },
  { n: 'extensionkitservice', gb: 0.4 },
  { n: 'fileproviderd', gb: 0.3 },
  { n: 'opendirectoryd', gb: 0.2 },
  { n: 'rapportd', gb: 0.2 },
  { n: 'endpointsecurityd', gb: 0.4 },
];
const APPS = [
  { n: 'WindowServer', gb: 0.6, c: '#39414f' },
  { n: 'Google Chrome', gb: 1.5, c: '#3b4a63' },
  { n: 'Slack', gb: 0.4, c: '#4a3a57' },
  { n: 'Call', gb: 0.5, c: '#2f5a4f' },
  { n: 'Cursor', gb: 0.9, c: '#3e4652' },
  { n: 'Claude', gb: 1.2, c: '#5a4336' },
];
const OTHERS = SYSTEM.reduce((a, s) => a + s.gb, 0) + APPS.reduce((a, s) => a + s.gb, 0); // 6.7
/** the runaway: grows on the beats while we watch, then dissolves after Stop safely */
const codexGB = (f: number, future = false) => {
  if (future) return mix(10.6, 11.3, prog(f, 0, 44)); // the frozen future
  const grow = beats.filter((b) => b >= THRU && b <= NOTE).reduce((a, b) => a + 0.19 * HOUSE(prog(f, b, b + 8)), 0);
  const base = 3.2 + grow; // → ~4.9 at the warning
  const gone = HOUSE(prog(f, DASH_OUT + 4, DASH_OUT + 34));
  return base * (1 - gone);
};
const usedGB = (f: number) => OTHERS + codexGB(f);
const availGB = (f: number) => Math.max(0, CEIL - usedGB(f));
const riskAt = (f: number) => Math.round(mix(40, 12, HOUSE(prog(f, STOP + 4, STOP + 40))));

const T0 = 14 * 3600 + 39 * 60 + 7;
const TW = 14 * 3600 + 30 * 60;
const clockAt = (f: number) => {
  let s: number;
  if (f < FRZ) s = mix(T0 - 9, T0, prog(f, 0, FRZ));
  else if (f < RW) s = T0;
  else if (f < IN) s = mix(T0, TW, HOUSE(prog(f, RW, IN - 6)));
  else if (f < DASH_OUT + 20) s = TW + (f - IN) / 8;
  else s = mix(TW + (DASH_OUT + 20 - IN) / 8, T0, HOUSE(prog(f, DASH_OUT + 20, OUT + 44)));
  s = Math.round(s);
  return `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

const PulseMark: React.FC<{ size: number; bg?: string }> = ({ size, bg = BLUE }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.24, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width={size * 0.66} height={size * 0.44} viewBox="0 0 46 30">
      <path d="M2 16 H12 L17 4 L24 26 L30 12 L34 16 H44" stroke="#fff" strokeWidth={4} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  </div>
);

const Beachball: React.FC<{ f: number; size: number }> = ({ f, size }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', position: 'relative', boxShadow: '0 6px 30px rgba(0,0,0,0.5)' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'conic-gradient(#ff3b5c 0 60deg, #ff9500 60deg 120deg, #ffd60a 120deg 180deg, #34c759 180deg 240deg, #0a84ff 240deg 300deg, #bf5af2 300deg 360deg)', transform: `rotate(${f * 14}deg)` }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 36% 26%, rgba(255,255,255,0.8), rgba(255,255,255,0.15) 22%, transparent 46%)' }} />
  </div>
);

/** macOS's real out-of-memory window: the moment the viewer recognises. */
const MemoryDialog: React.FC<{ f: number; k: number }> = ({ f, k }) => {
  const rows = [
    ['ChatGPT', `${codexGB(f, true).toFixed(1)} GB`],
    ['Claude', ''],
    ['Cursor', ''],
    ['Google Chrome', ''],
    ['Call', ''],
    ['Slack', ''],
  ];
  return (
    <div style={{ width: 620 * k, borderRadius: 14 * k, background: 'rgba(236,236,236,0.97)', boxShadow: '0 30px 90px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.25)', color: '#1d1d1f', fontFamily: SANS, overflow: 'hidden' }}>
      <div style={{ height: 30 * k, display: 'flex', alignItems: 'center', gap: 8 * k, padding: `0 ${12 * k}px`, background: 'linear-gradient(#e8e8e8, #dcdcdc)', borderBottom: '1px solid #c5c5c5' }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <span key={c} style={{ width: 12 * k, height: 12 * k, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ flex: 1, textAlign: 'center', fontSize: 13 * k, fontWeight: 600, color: '#4a4a4a', marginRight: 52 * k }}>Force Quit Applications</span>
      </div>
      <div style={{ padding: `${18 * k}px ${22 * k}px`, display: 'flex', gap: 16 * k }}>
        <svg width={54 * k} height={54 * k} viewBox="0 0 54 54" style={{ flexShrink: 0 }}>
          <path d="M27 4 L51 48 H3 Z" fill="#ffcc00" stroke="#c79a00" strokeWidth={2} strokeLinejoin="round" />
          <rect x={25} y={18} width={4} height={17} rx={2} fill="#1d1d1f" />
          <circle cx={27} cy={41} r={2.6} fill="#1d1d1f" />
        </svg>
        <div>
          <div style={{ fontSize: 17 * k, fontWeight: 700, lineHeight: 1.25 }}>Your system has run out of application memory.</div>
          <div style={{ fontSize: 13.5 * k, marginTop: 6 * k, color: '#3a3a3c', lineHeight: 1.35 }}>To avoid problems with your computer, quit any applications you are not using.</div>
        </div>
      </div>
      <div style={{ margin: `0 ${22 * k}px`, border: '1px solid #c8c8c8', borderRadius: 6 * k, background: '#fff' }}>
        {rows.map(([n, v], i) => (
          <div key={n} style={{ height: 30 * k, display: 'flex', alignItems: 'center', padding: `0 ${10 * k}px`, fontSize: 14 * k, background: i === 0 ? '#0a64d8' : i % 2 ? '#f4f5f5' : '#fff', color: i === 0 ? '#fff' : '#1d1d1f' }}>
            <span style={{ fontWeight: i === 0 ? 600 : 400 }}>{n}</span>
            <span style={{ marginLeft: 8 * k, color: i === 0 ? '#ffd7d7' : '#d70015', fontWeight: 600 }}>(Paused)</span>
            <span style={{ marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: `${14 * k}px ${22 * k}px` }}>
        <span style={{ padding: `${5 * k}px ${18 * k}px`, borderRadius: 6 * k, background: '#0a64d8', color: '#fff', fontSize: 14 * k, fontWeight: 600 }}>Force Quit</span>
      </div>
    </div>
  );
};

/** The call app: a screen share of the Q3 plan with Dana on camera. `frozen` = the future. */
const CallUI: React.FC<{ f: number; w: number; h: number; frozen?: boolean; k?: number }> = ({ f, w, h, frozen = false, k = 1 }) => {
  const t = frozen ? Math.min(f, FRZ - 1) : f;
  const bars = [0.46, 0.62, 0.55, 0.78, 0.86];
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h, background: '#101217', fontFamily: SANS, color: '#eef1f6', overflow: 'hidden' }}>
      <div style={{ height: 44 * k, display: 'flex', alignItems: 'center', gap: 12 * k, padding: `0 ${18 * k}px`, background: '#1a1d24', fontSize: 17 * k }}>
        <span style={{ fontWeight: 700 }}>Q3 planning</span>
        <span style={{ padding: `${3 * k}px ${10 * k}px`, borderRadius: 999, background: 'rgba(52,199,89,0.18)', color: GREEN, fontWeight: 600, fontSize: 14 * k }}>● You are sharing your screen</span>
        <span style={{ marginLeft: 'auto', ...rec(1, 0, 600), fontSize: 16 * k, fontVariantNumeric: 'tabular-nums', color: '#aab2c0' }}>{clockAt(f)}</span>
      </div>
      <div style={{ position: 'absolute', left: 14 * k, right: 14 * k, top: 56 * k, bottom: 72 * k, display: 'flex', gap: 12 * k }}>
        {/* your shared slide */}
        <div style={{ flex: 2.2, borderRadius: 12 * k, background: '#f6f4ee', color: '#16181d', padding: 30 * k, position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontSize: 14 * k, color: '#8a8a8a', fontWeight: 600, letterSpacing: '0.08em' }}>Q3 PLAN · 3 / 7</div>
          <div style={{ fontSize: 38 * k, fontWeight: 750, letterSpacing: '-0.02em', marginTop: 8 * k }}>Where the quarter goes</div>
          <div style={{ position: 'absolute', left: 30 * k, right: 30 * k, bottom: 30 * k, height: '52%', display: 'flex', alignItems: 'flex-end', gap: 26 * k }}>
            {bars.map((b, i) => (
              <div key={i} style={{ flex: 1, height: `${b * 100}%`, borderRadius: 6 * k, background: i === 4 ? RED : '#2a2f3a' }} />
            ))}
          </div>
          {frozen ? <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.12)' }} /> : null}
        </div>
        {/* Dana */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 * k }}>
          <div style={{ flex: 1.3, borderRadius: 12 * k, background: 'linear-gradient(160deg, #2d3a52, #1a2231)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%,-50%)', width: 110 * k, height: 110 * k, borderRadius: '50%', background: '#c47a53', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 * k, fontWeight: 700 }}>D</div>
            <div style={{ position: 'absolute', left: '50%', top: '76%', transform: 'translateX(-50%)', display: 'flex', gap: 4 * k, alignItems: 'center', height: 30 * k }}>
              {new Array(9).fill(0).map((_, i) => (
                <span key={i} style={{ width: 5 * k, borderRadius: 3 * k, background: '#8fd3ff', height: (6 + 22 * Math.abs(Math.sin(t / 5 + i * 1.3))) * k }} />
              ))}
            </div>
            <div style={{ position: 'absolute', left: 10 * k, bottom: 10 * k, fontSize: 13 * k, padding: `${3 * k}px ${8 * k}px`, borderRadius: 6 * k, background: 'rgba(0,0,0,0.45)' }}>Dana</div>
            {frozen ? <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(90deg, rgba(40,52,72,0.9) 50%, rgba(60,76,100,0.9) 50%), linear-gradient(rgba(40,52,72,0.5) 50%, rgba(80,96,120,0.5) 50%)', backgroundSize: `${36 * k}px ${36 * k}px`, mixBlendMode: 'hard-light', opacity: 0.8 }} /> : null}
          </div>
          <div style={{ flex: 1, borderRadius: 12 * k, background: '#1f2530', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 * k, fontWeight: 700, color: '#9aa4b5' }}>You</div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14 * k, display: 'flex', justifyContent: 'center', gap: 12 * k }}>
        {['#343a46', '#343a46', GREEN, RED].map((c, i) => (
          <span key={i} style={{ width: i === 3 ? 76 * k : 42 * k, height: 42 * k, borderRadius: 21 * k, background: c, opacity: i === 2 ? 0.85 : 1 }} />
        ))}
      </div>
      {frozen ? (
        <>
          <div style={{ position: 'absolute', left: '36%', top: '44%', transform: 'translate(-50%,-50%)' }}>
            <Beachball f={f} size={70 * k} />
          </div>
          <div style={{ position: 'absolute', right: 26 * k, bottom: 80 * k, transform: `translateY(${(1 - settle(prog(f, FRZ + 22, FRZ + 32))) * 30 * k}px)`, opacity: prog(f, FRZ + 22, FRZ + 26), padding: `${10 * k}px ${14 * k}px`, borderRadius: 14 * k, background: '#2b3140', fontSize: 16 * k, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <b>Dana</b> · you froze?
          </div>
        </>
      ) : null}
    </div>
  );
};

// ── the desk + laptop for the two passes through the lid
const SW = 940;
const SH = 600;
const HINGE = v3(0, -22, -380);
const SF = screenFrame(HINGE, SW, SH, 0.24);

const Desk: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => (
  <>
    <Plane cam={cam} c={v3(0, -1500, -2600)} w={11000} h={8000} z={-300000}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #120b0c, #1c0f10 60%, #0d0708)' }}>
        <div style={{ position: 'absolute', left: 1500, right: 1500, top: 3900, height: 40, background: '#ff2d2d', boxShadow: '0 0 60px 20px rgba(255,40,40,0.9), 0 0 400px 160px rgba(220,38,38,0.45)' }} />
        <div style={{ position: 'absolute', left: 6800, top: 1200, width: 2600, height: 2400, background: 'linear-gradient(180deg, #081226, #13254a)', boxShadow: 'inset 0 0 0 50px #0b0607' }}>
          {new Array(60).fill(0).map((_, i) => (
            <div key={i} style={{ position: 'absolute', left: 60 + random(`px${i}`) * 2480, top: 900 + random(`py${i}`) * 1400, width: 8 + random(`ps${i}`) * 20, height: 8 + random(`ps${i}`) * 20, borderRadius: '50%', background: random(`pc${i}`) > 0.6 ? '#9ec5ff' : '#ffd9a8', opacity: 0.4 + 0.5 * random(`pa${i}`), filter: 'blur(3px)' }} />
          ))}
        </div>
      </div>
    </Plane>
    <Box cam={cam} c={v3(0, 60, -200)} size={[4400, 120, 1800]} color="#161113" edge="rgba(0,0,0,0.4)" z={-200000} top={<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, #1a1214, #2a1517 70%, #3a1719)' }} />} />
    <Box cam={cam} c={v3(-1500, -14, 60)} size={[900, 28, 320]} color="#26262b" z={-100000} top={<div style={{ position: 'absolute', inset: 14, background: '#34343a', backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.5) 2px, transparent 2px), linear-gradient(rgba(0,0,0,0.5) 2px, transparent 2px)', backgroundSize: '58px 58px' }} />} />
    <Plane cam={cam} c={v3(1250, -110, -80)} w={160} h={220} z={4000}>
      <svg width={160} height={220} viewBox="0 0 160 220">
        <rect x={20} y={40} width={100} height={170} rx={14} fill="#2b2b30" />
        <path d="M120 80 C155 80 155 150 120 150" stroke="#2b2b30" strokeWidth={14} fill="none" />
      </svg>
    </Plane>
    <Laptop cam={cam} hinge={HINGE} w={SW} h={SH} angle={0.24} screen={<CallUI f={f} w={SW} h={SH} k={0.7} />} glow="rgba(120,150,220,0.35)" />
  </>
);

// ── inside: the memory column (the mechanism, taught)
const COL_W = 1000;
const COL_H = 1150;
const GBPX = (COL_H - 120) / CEIL; // px per GB
const COL_C = v3(0, -COL_H / 2 - 40, 0);

const Column: React.FC<{ f: number }> = ({ f }) => {
  const codex = codexGB(f);
  const safe = f >= DASH_OUT + 20;
  const hatP = pulse(H.hat.filter((h) => h >= THRU && h < NOTE), f, 5);
  const initials = sub(f, 318, 8);
  let y = COL_H; // stack from the bottom
  const block = (key: string, gb: number, child: React.ReactNode, style: React.CSSProperties) => {
    const hpx = gb * GBPX;
    y -= hpx;
    return (
      <div key={key} style={{ position: 'absolute', left: 30, right: 30, top: y, height: Math.max(0, hpx - 4), borderRadius: 8, overflow: 'hidden', ...style }}>
        {child}
      </div>
    );
  };
  const sys = block(
    'sys',
    SYSTEM.reduce((a, s) => a + s.gb, 0),
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '8px 16px' }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#c9ced8' }}>macOS</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', marginTop: 6 }}>
        {SYSTEM.map((s) => (
          <span key={s.n} style={{ ...rec(1, 0, 500), fontSize: 17, color: 'rgba(210,215,225,0.55)' }}>
            <span style={{ color: initials ? '#fff' : undefined, textShadow: initials ? '0 0 12px #fff' : undefined, fontWeight: initials ? 800 : undefined }}>{s.n[0]}</span>
            {s.n.slice(1)}
          </span>
        ))}
      </div>
    </div>,
    { background: '#2a2e36' }
  );
  const apps = APPS.map((a) =>
    block(
      a.n,
      a.gb,
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: a.gb > 0.8 ? 24 : 19, fontWeight: 650, color: '#eef1f6' }}>
        {a.n}
        <span style={{ marginLeft: 'auto', ...rec(1, 0, 500), fontSize: a.gb > 0.8 ? 21 : 17, color: 'rgba(238,241,246,0.6)' }}>{a.gb.toFixed(1)} GB</span>
      </div>,
      { background: a.c }
    )
  );
  const cx = codex > 0.05
    ? block(
        'codex',
        codex,
        <div style={{ position: 'absolute', inset: 0, padding: '14px 18px', background: `linear-gradient(180deg, ${RED}, ${RED_D})`, boxShadow: `inset 0 0 ${30 + 40 * hatP}px rgba(255,255,255,${0.1 + 0.25 * hatP})` }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontSize: 34, fontWeight: 800, color: '#fff' }}>ChatGPT / Codex</span>
            <span style={{ marginLeft: 'auto', ...rec(1, 0, 700), fontSize: 34, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{codex.toFixed(1)} GB</span>
          </div>
          <div style={{ ...rec(1, 0, 600), fontSize: 22, color: 'rgba(255,255,255,0.85)', marginTop: 6 }}>+738 MB / min · still growing</div>
        </div>,
        { opacity: clamp(codex / 0.6) }
      )
    : null;
  const topY = y;
  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily: SANS }}>
      {/* the glass */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 26, background: 'linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.07))', border: '3px solid rgba(255,220,220,0.28)' }} />
      {/* GB ticks */}
      {new Array(10).fill(0).map((_, i) => (
        <div key={i} style={{ position: 'absolute', left: -96, top: COL_H - i * 2 * GBPX - 12, width: 80, textAlign: 'right', ...rec(1, 0, 500), fontSize: 20, color: 'rgba(255,220,220,0.4)' }}>
          {i * 2}
        </div>
      ))}
      {sys}
      {apps}
      {cx}
      {/* the ceiling: everything this Mac can hold */}
      <div style={{ position: 'absolute', left: -20, right: -20, top: COL_H - CEIL * GBPX, borderTop: `4px dashed ${safe ? GREEN : RED}` }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: COL_H - CEIL * GBPX - 64, textAlign: 'center', fontSize: 30, fontWeight: 750, color: '#fff' }}>
        18 GB <span style={{ fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>· all the memory this Mac has</span>
      </div>
      {/* free room, labelled: the room Crash Guard protects */}
      <div style={{ position: 'absolute', left: 30, right: 30, top: COL_H - CEIL * GBPX + 10, height: Math.max(0, topY - (COL_H - CEIL * GBPX) - 16), borderRadius: 8, border: `2px dashed ${safe ? 'rgba(52,199,89,0.5)' : 'rgba(255,255,255,0.18)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', ...rec(1, 0, 600), fontSize: 30, color: safe ? GREEN : 'rgba(255,255,255,0.55)' }}>
        {availGB(f).toFixed(1)} GB free
      </div>
    </div>
  );
};

/** Crash Guard's forecast: the trend, extrapolated to the ceiling — the freeze we already saw. */
const Forecast: React.FC<{ f: number }> = ({ f }) => {
  const W = 980;
  const Hh = 620;
  const px = (min: number) => 70 + ((min - 20) / 20) * (W - 110);
  const py = (gb: number) => Hh - 70 - (gb / CEIL) * (Hh - 210);
  const draw = HOUSE(prog(f, THRU + 30, THRU + 110));
  const proj = HOUSE(prog(f, THRU + 120, NOTE));
  const safe = f >= DASH_OUT + 20;
  const hist: string[] = [];
  for (let m = 20; m <= 30; m += 0.5) hist.push(`${px(m).toFixed(1)},${py(OTHERS + 3.2 - (30 - m) * 0.6 + Math.sin(m * 3) * 0.08).toFixed(1)}`);
  const n = Math.max(2, Math.round(hist.length * draw));
  const nowGB = usedGB(f);
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: 22, background: 'rgba(14,10,12,0.92)', border: '2px solid rgba(255,255,255,0.1)', fontFamily: SANS, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 34, top: 26, display: 'flex', alignItems: 'center', gap: 16 }}>
        <PulseMark size={46} />
        <div>
          <div style={{ fontSize: 26, fontWeight: 750, color: '#fff' }}>Crash Guard · memory forecast</div>
          <div style={{ ...rec(1, 0, 500), fontSize: 17, color: 'rgba(255,255,255,0.55)' }}>trend, not a snapshot</div>
        </div>
      </div>
      <svg width={W} height={Hh} style={{ position: 'absolute', inset: 0 }}>
        <line x1={50} x2={W - 20} y1={py(CEIL)} y2={py(CEIL)} stroke={RED} strokeWidth={3} strokeDasharray="10 8" />
        <text x={W - 24} y={py(CEIL) - 12} textAnchor="end" fill={RED} fontSize={20} fontFamily="Recursive" fontWeight={600}>18 GB ceiling</text>
        {[20, 25, 30, 35, 40].map((m) => (
          <text key={m} x={px(m)} y={Hh - 30} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={19} fontFamily="Recursive">{`14:${m}`}</text>
        ))}
        <polyline points={hist.slice(0, n).join(' ')} stroke={safe ? GREEN : '#fff'} strokeWidth={5} fill="none" strokeLinejoin="round" />
        {proj > 0.01 && !safe ? (
          <>
            <line x1={px(30)} y1={py(OTHERS + 3.2)} x2={mix(px(30), px(39), proj)} y2={mix(py(OTHERS + 3.2), py(CEIL), proj)} stroke={RED} strokeWidth={5} strokeDasharray="4 10" strokeLinecap="round" />
            <circle cx={px(39)} cy={py(CEIL)} r={14 * proj} fill={RED} />
            <text x={px(39)} y={py(CEIL) + 48} textAnchor="middle" fill="#fff" fontSize={26} fontWeight={800} opacity={prog(proj, 0.8, 1)} fontFamily={SANS}>14:39 · frozen</text>
          </>
        ) : null}
        {safe ? <line x1={px(30)} y1={py(nowGB)} x2={px(40)} y2={py(nowGB)} stroke={GREEN} strokeWidth={4} strokeDasharray="4 10" strokeLinecap="round" /> : null}
      </svg>
    </div>
  );
};

const Inside: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const safe = f >= DASH_OUT + 20;
  return (
    <>
      <Plane cam={cam} c={v3(0, -900, -2600)} w={12000} h={7000} z={-400000}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${safe ? '#0f2a1c' : '#3a0d10'}, #0c0506 70%)` }} />
      </Plane>
      <Plane cam={cam} c={v3(0, 1, -600)} U={X} V={Z} w={9000} h={5000} z={-390000}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 20%, rgba(80,20,24,0.9), #0c0506 70%)', backgroundImage: 'linear-gradient(rgba(255,120,120,0.08) 2px, transparent 2px), linear-gradient(90deg, rgba(255,120,120,0.08) 2px, transparent 2px)', backgroundSize: '200px 200px' }} />
      </Plane>
      <Plane cam={cam} c={v3(-430, COL_C.y, 0)} w={COL_W} h={COL_H} noDof z={10}>
        <Column f={f} />
      </Plane>
      <Plane cam={cam} c={v3(620, -470, 120)} U={v3(Math.cos(0.3), 0, Math.sin(0.3))} w={980} h={620} noDof z={20}>
        <Forecast f={f} />
      </Plane>
    </>
  );
};

// ── the real Crash Guard dashboard, rebuilt at full fidelity so it reads at 1080p
const Dashboard: React.FC<{ f: number }> = ({ f }) => {
  const risk = riskAt(f);
  const resolved = f >= STOP + 10;
  const press = f >= STOP - 2 && f < STOP + 5;
  const hover = f >= STOP - 30;
  const idT = HOUSE(prog(f, STOP + 2, STOP + 12));
  const card: React.CSSProperties = { borderRadius: 14, background: '#1c1c1f', border: '1px solid rgba(255,255,255,0.08)' };
  return (
    <div style={{ width: 1274, height: 900, background: '#000', fontFamily: SANS, color: '#f2f2f4', position: 'relative' }}>
      <div style={{ height: 60, display: 'flex', alignItems: 'center', padding: '0 36px', gap: 14, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <PulseMark size={32} />
        <span style={{ fontSize: 17, fontWeight: 650 }}>Perf Pulse</span>
        <span style={{ width: 6, height: 6, borderRadius: 3, background: GREEN }} />
        <span style={{ margin: '0 auto', display: 'flex', gap: 22, padding: '6px 14px', borderRadius: 10, background: '#1c1c1f', fontSize: 13, color: '#9a9aa2' }}>
          <span style={{ color: GREEN }}>Live</span>
          <span>1D</span>
          <span>3D</span>
          <span>7D</span>
          <span>14D</span>
          <span>30D</span>
        </span>
      </div>
      <div style={{ margin: '24px 62px 0', ...card, height: 34, display: 'flex', alignItems: 'center', gap: 36, padding: '0 24px', fontSize: 13, color: '#9a9aa2' }}>
        <span>Overview</span>
        <span style={{ color: '#fff' }}>Crash Guard</span>
        <span>Processes</span>
        <span>Ports</span>
        <span>Speed Up</span>
      </div>
      <div style={{ margin: '30px 62px 0', ...card, borderTop: `3px solid ${resolved ? GREEN : AMBER}`, padding: '26px 26px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: resolved ? GREEN : AMBER }}>{resolved ? 'PROTECTED · MONITORING IN THIS SESSION' : 'WATCH CLOSELY · MONITORING IN THIS SESSION'}</div>
        <div style={{ fontSize: 26, fontWeight: 750, marginTop: 8 }}>Crash Guard</div>
        <div style={{ fontSize: 13.5, color: '#a5a5ad', marginTop: 8, width: 640, lineHeight: 1.5 }}>Monitors memory leaks and disk headroom before your Mac becomes unresponsive. Protection continues while Perf Pulse is running.</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          {[
            ['MEMORY RISK', `${risk}/100`, resolved ? GREEN : AMBER, resolved ? `low risk · ${availGB(f).toFixed(1)} GiB available` : `elevated risk · ${availGB(f).toFixed(1)} GiB available`],
            ['DISK HEADROOM', '27.2 GiB', GREEN, '94.1% used'],
            ['ALERT DELIVERY', 'On', '#fff', 'Dashboard stays in the background'],
          ].map(([a, b, c, d]) => (
            <div key={a} style={{ flex: 1, borderRadius: 12, background: '#2a2a2e', padding: '16px 16px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#8c8c94' }}>{a}</div>
              <div style={{ fontSize: 22, fontWeight: 750, color: c, marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>{b}</div>
              <div style={{ fontSize: 12, color: '#8c8c94', marginTop: 2 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ margin: '18px 62px 0', display: 'flex', gap: 18 }}>
        <div style={{ flex: 1.1, ...card, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Active incidents</span>
            <span style={{ marginLeft: 'auto', fontSize: 12, padding: '3px 10px', borderRadius: 8, background: '#2a2a2e', color: '#a5a5ad' }}>{resolved ? '0 active' : '1 active'}</span>
          </div>
          <div style={{ fontSize: 13, color: '#8c8c94', marginTop: 4 }}>The risks most likely to interrupt your current work.</div>
          <div style={{ marginTop: 14, borderRadius: 12, background: '#2a2a2e', borderLeft: `3px solid ${resolved ? GREEN : AMBER}`, padding: '14px 16px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>ChatGPT / Codex</span>
              <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 650, padding: '5px 12px', borderRadius: 8, border: `1.5px solid ${resolved ? GREEN : AMBER}`, color: resolved ? GREEN : AMBER, background: press ? 'rgba(245,165,36,0.25)' : hover && !resolved ? 'rgba(245,165,36,0.1)' : 'transparent', transform: `scale(${press ? 0.92 : 1})` }}>
                {resolved ? 'Stopped ✓' : 'Stop safely'}
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: '#9a9aa2', marginTop: 3 }}>{resolved ? '4.9 GiB freed · nothing else touched' : '4.9 GiB resident · +738 MB/min · known runaway pattern'}</div>
            {!resolved ? (
              <>
                <div style={{ fontSize: 13, color: '#d6d6db', marginTop: 10 }}>Growing steadily: +738 MB/min over 10 min</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: AMBER, marginTop: 6 }}>Projected to exhaust available memory in about 9 min</div>
              </>
            ) : null}
          </div>
          {idT > 0.01 ? (
            <div style={{ marginTop: 12, borderRadius: 12, background: '#0f1a12', border: `1px solid ${GREEN}55`, padding: '12px 16px', ...rec(1, 0, 550), fontSize: 13.5, color: '#cfe9d6', opacity: idT, transform: `translateY(${(1 - idT) * 10}px)`, lineHeight: 1.7 }}>
              <div style={{ color: GREEN, fontWeight: 700 }}>re-checked before signal</div>
              <div>PID 48213 ✓ · name ChatGPT ✓ · started 14:21:07 ✓</div>
              <div>protected services skipped · SIGTERM sent</div>
            </div>
          ) : null}
        </div>
        <div style={{ flex: 1, ...card, padding: 22 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Protection controls</div>
          <div style={{ fontSize: 13, color: '#8c8c94', marginTop: 4 }}>Choose exactly what Crash Guard watches and how it gets your attention.</div>
          {[
            ['Memory leak protection', 'Tracks per-app memory growth and system pressure.'],
            ['Disk headroom protection', 'Warns before builds, databases, or swap run out of space.'],
            ['Memory and workload notifications', 'Posts native macOS alerts for memory and developer-workload risks.'],
          ].map(([a, b]) => (
            <div key={a} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 650 }}>{a}</div>
                <div style={{ fontSize: 12, color: '#8c8c94', marginTop: 2 }}>{b}</div>
              </div>
              <span style={{ marginLeft: 'auto', width: 42, height: 26, borderRadius: 13, background: GREEN, position: 'relative' }}>
                <span style={{ position: 'absolute', right: 3, top: 3, width: 20, height: 20, borderRadius: 10, background: '#fff' }} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** macOS notification banner: the warning, nine minutes before the freeze. */
const Banner: React.FC<{ f: number }> = ({ f }) => {
  const t = settle(prog(f, NOTE - 4, NOTE + 8), 1);
  const cur = HOUSE(prog(f, NOTE + 6, D - 4));
  const click = f >= D - 3 && f < D + 3;
  return (
    <AbsoluteFill style={{ zIndex: 880000, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', right: 150, top: 150, width: 900, padding: '26px 30px', borderRadius: 30, background: 'rgba(44,46,52,0.94)', boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)', transform: `translateX(${(1 - clamp(t)) * 1100}px)`, display: 'flex', gap: 22, fontFamily: SANS, color: '#f2f2f4' }}>
        <PulseMark size={84} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex' }}>
            <span style={{ fontSize: 26, fontWeight: 750 }}>Perf Pulse · Crash Guard</span>
            <span style={{ marginLeft: 'auto', fontSize: 21, color: '#9a9aa2' }}>now</span>
          </div>
          <div style={{ fontSize: 27, lineHeight: 1.35, color: 'rgba(242,242,244,0.92)', marginTop: 8 }}>
            <b>ChatGPT / Codex</b> is projected to exhaust available memory in <b style={{ color: AMBER }}>about 9 min</b>.
          </div>
          <div style={{ marginTop: 16, display: 'inline-block', padding: '10px 22px', borderRadius: 12, background: click ? '#5a5d66' : '#43464e', fontSize: 23, fontWeight: 650 }}>Open dashboard</div>
        </div>
      </div>
      {/* the cursor, on the silence */}
      <svg width={46} height={60} viewBox="0 0 23 30" style={{ position: 'absolute', left: mix(1500, 480 + 150 + 22, cur), top: mix(900, 150 + 26 + 176, cur), transform: `scale(${click ? 0.85 : 1})`, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))', opacity: prog(f, NOTE + 4, NOTE + 8) }}>
        <path d="M1 1 L1 24 L7 18 L11 28 L15 26 L11 17 L19 17 Z" fill="#fff" stroke="#000" strokeWidth={1.5} strokeLinejoin="round" />
      </svg>
    </AbsoluteFill>
  );
};

// ── edit
const SC = SF.center;
const EDIT = edit([
  { name: 'desk', from: IN, keys: [[IN, 0, -300, -300, 3900, -10, 6, 0, 35], [IN + 30, 0, -300, -300, 3500, -6, 5, 0, 35], [THRU - 10, SC.x, SC.y, SC.z, 900, 0, 1, 0, 35], [THRU + 2, SC.x, SC.y, SC.z, 220, 0, 0, 0, 35]] },
  { name: 'inside', from: THRU + 3, keys: [[THRU + 3, 0, -560, 0, 4600, 0, -1, 0, 35], [THRU + 50, 60, -540, 0, 2800, -3, -1, 0, 35], [NOTE - 20, 110, -530, 0, 2520, -9, -1, 0, 35], [D, 115, -530, 0, 2460, -10, -1, 0, 35]], hand: { px: 1.2 }, kicks: [{ frames: beats.filter((b) => b >= THRU && b < NOTE).map(Math.round), tau: 5, punch: 0.012, px: 3 }] },
  { name: 'dash', from: D, keys: [[D, 0, 0, 0, 1000, 0, 0, 0, 35], [D + 1, 0, 0, 0, 1000, 0, 0, 0, 35]] },
  { name: 'after', from: DASH_OUT, keys: [[DASH_OUT, 110, -540, 0, 2400, 8, 0, 0, 35], [OUT, 110, -540, 0, 2700, 3, -1, 0, 35], [DESK2 - 1, -430, -700, 0, 700, 0, 0, 0, 35]], kicks: [{ frames: [DASH_OUT], tau: 6, punch: 0.03, px: 6 }] },
  { name: 'back', from: DESK2, keys: [[DESK2, SC.x, SC.y, SC.z, 260, 0, 0, 0, 35], [DESK2 + 26, SC.x, SC.y, SC.z, 1500, 0, 2, 0, 35], [END, 0, -300, -300, 3700, -8, 5, 0, 35]] },
]);

/** The brand pulse line along the bottom edge: flat at the freeze, strained while it grows, calm after. */
const PulseLine: React.FC<{ f: number; stress: number; flat: boolean; safe: boolean }> = ({ f, stress, flat, safe }) => {
  const pts: string[] = [];
  for (let x = 0; x <= 1920; x += 12) {
    const ph = (x / 1920) * 6 - f / 18;
    const beat = Math.max(0, Math.sin(ph * Math.PI)) ** 18;
    const y = flat ? 0 : -beat * (40 + 60 * stress) + Math.sin(x / 30 + f / 4) * 3 * stress;
    pts.push(`${x},${1030 + y}`);
  }
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, zIndex: 905000, pointerEvents: 'none' }}>
      <polyline points={pts.join(' ')} stroke={safe ? GREEN : RED} strokeWidth={3} fill="none" opacity={0.85} />
    </svg>
  );
};

/** One big idea per beat, masked in. */
const Title: React.FC<{ f: number; from: number; to: number; big: string; small?: string; x?: number; y?: number; size?: number; color?: string }> = ({ f, from, to, big, small, x = 120, y = 700, size = 120, color = '#fff' }) => {
  if (f < from - 2 || f > to + 12) return null;
  const tIn = HOUSE(prog(f, from, from + 14));
  const tOut = prog(f, to, to + 10);
  return (
    <div style={{ position: 'absolute', left: x, top: y, zIndex: 906000, opacity: 1 - tOut, fontFamily: SANS }}>
      <div style={{ fontSize: size, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1, color, clipPath: `inset(-10% ${(1 - tIn) * 100}% -20% 0)`, textShadow: '0 6px 40px rgba(0,0,0,0.6)' }}>{big}</div>
      {small ? <div style={{ ...rec(1, 0, 600), fontSize: size * 0.3, color: 'rgba(255,255,255,0.8)', marginTop: 18, opacity: HOUSE(prog(f, from + 8, from + 20)), textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>{small}</div> : null}
    </div>
  );
};

export const PerfPulse: React.FC = () => {
  const f = useCurrentFrame();
  const rewinding = f >= RW && f < IN;
  // the rewind plays the cold open backwards, fast
  const fo = rewinding ? Math.max(0, FRZ + 40 - (f - RW) * 2.2) : f;
  const open = f < IN;
  const dash = f >= D && f < DASH_OUT;
  const shot = open || dash ? null : EDIT.at(f);
  const cam = shot?.cam;
  const inside = shot && (shot.shot.name === 'inside' || shot.shot.name === 'after');
  const safe = f >= DASH_OUT + 20;
  const stress = clamp((codexGB(f) - 3) / 2.2);
  const kick = pulse([FRZ], f, 5);
  const hh = handheld(f, open ? 9 : 0, open ? 0.5 : 0, 3);
  // dashboard camera: full read → the incident → the button (target point in dashboard px + scale)
  const dA = CINE2(prog(f, D + 24, D + 90));
  const dB = HOUSE(prog(f, STOP - 44, STOP - 10));
  const dpx = mix(mix(637, 330, dA), 420, dB);
  const dpy = mix(mix(470, 600, dA), 610, dB);
  const dS = mix(mix(1.42, 2.35, dA), 2.7, dB);
  const dTilt = dash ? mix(10, 0, HOUSE(prog(f, D, D + 30))) : 0;
  const flashThru = pulse([THRU, DESK2], f, 5);
  const label = f < RW ? 'NOT RESPONDING' : rewinding ? 'REWIND · 9 MIN' : f < THRU ? 'ON A CALL · LOOKS FINE' : f < NOTE ? 'INSIDE · MEMORY' : f < DASH_OUT + 20 ? 'CRASH GUARD' : f < DESK2 ? 'INSIDE · MEMORY' : 'RESPONSIVE · STILL ON THE CALL';
  const labelCol = f < RW ? '#ff6b6b' : safe ? GREEN : 'rgba(255,255,255,0.7)';
  return (
    <AbsoluteFill style={{ background: '#0c0708', overflow: 'hidden' }}>
      {/* ── cold open (and its rewind): full-frame screen, long lens, handheld */}
      {open ? (
        <AbsoluteFill style={{ filter: rewinding ? 'saturate(1.5) hue-rotate(-12deg) contrast(1.1)' : undefined }}>
          <div style={{ position: 'absolute', left: 960 - 800, top: 540 - 500, width: 1600, height: 1000, transform: `translate(${hh.x + (random(`rj${Math.floor(f / 2)}`) - 0.5) * (rewinding ? 30 : 0)}px, ${hh.y}px) rotate(${hh.r - 1.2}deg) scale(${mix(0.98, 1.06, prog(fo, 0, FRZ)) * (1 + 0.035 * kick)})`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 0 200px rgba(120,150,220,0.25)' }}>
            <CallUI f={fo} w={1600} h={1000} frozen={fo >= FRZ} k={1.6} />
            {fo >= FRZ ? (
              <div style={{ position: 'absolute', left: 800 - 496, top: 120, transform: `scale(${settle(prog(fo, FRZ, FRZ + 8), 1.2)})`, transformOrigin: '50% 30%' }}>
                <MemoryDialog f={fo} k={1.6} />
              </div>
            ) : null}
          </div>
          {rewinding ? (
            <AbsoluteFill style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.09) 0 2px, transparent 2px 6px)', mixBlendMode: 'screen' }}>
              <div style={{ position: 'absolute', left: 120, bottom: 150, ...rec(1, 0, 700), fontSize: 90, color: '#fff' }}>◀◀ 9:00</div>
            </AbsoluteFill>
          ) : null}
          <AbsoluteFill style={{ background: `rgba(10,4,5,${0.55 * HOUSE(prog(f, FRZ + 18, FRZ + 30)) * (1 - prog(f, RW - 4, RW))})` }} />
          <Title f={f} from={FRZ + 20} to={RW - 6} big="Out of memory." small="It started nine minutes ago." y={640} size={150} />
        </AbsoluteFill>
      ) : null}

      {/* ── the oner through the lid, the memory itself, the way back out */}
      {shot && cam ? (
        <Blur ranges={[[THRU - 16, THRU + 14, 6], [DESK2 - 14, DESK2 + 12, 6]]}>
          <DofCtx.Provider value={{ focus: shot.focus, aperture: inside ? 0.25 : 0.7 }}>
            <AbsoluteFill style={{ isolation: 'isolate' }}>{inside ? <Inside f={f} cam={cam} /> : <Desk f={f} cam={cam} />}</AbsoluteFill>
          </DofCtx.Provider>
        </Blur>
      ) : null}
      {shot && !inside ? (
        <>
          <Glow x={960} y={1080} r={1100} color="rgba(220,38,38,0.45)" a={0.6} />
          <Grade tint={RED_D} a={0.16} />
        </>
      ) : null}
      {f >= THRU && f < NOTE + 14 ? (
        <>
          <Title f={f} from={THRU + 26} to={THRU + 96} big="18 GB. Every app takes a share." x={1000} y={110} size={60} />
          <Title f={f} from={THRU + 104} to={NOTE - 6} big="One never stops growing." small="+738 MB a minute. Full at 14:39." x={1000} y={110} size={60} />
        </>
      ) : null}
      {f >= DASH_OUT && f < DESK2 ? <Title f={f} from={DASH_OUT + 34} to={OUT + 8} big="Stopped safely." small="4.9 GB back. Nothing else touched." x={1000} y={110} size={76} color={GREEN} /> : null}
      {f >= DESK2 ? <Title f={f} from={DESK2 + 12} to={END - 2} big="14:39:07." small="Same second. Still talking." x={120} y={660} size={140} /> : null}

      {/* ── the warning, on the silence */}
      {f >= NOTE - 6 && f < D + 2 ? <Banner f={f} /> : null}

      {/* ── the real dashboard, pushed until it reads */}
      {dash ? (
        <AbsoluteFill style={{ background: '#000', perspective: 1600 }}>
          <div style={{ position: 'absolute', left: 960 - 637, top: 540 - 450, width: 1274, height: 900, transform: `translate(${(637 - dpx) * dS}px, ${(450 - dpy) * dS}px) scale(${dS}) rotateX(${dTilt}deg)`, transformOrigin: '50% 50%' }}>
            <Dashboard f={f} />
          </div>
          <AbsoluteFill style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 60%, rgba(0,0,0,0.6))' }} />
        </AbsoluteFill>
      ) : null}

      {/* HUD: the clock is the film's caption */}
      {f < END ? (
        <div style={{ position: 'absolute', right: 120, top: 930, display: 'flex', flexDirection: 'row-reverse', alignItems: 'baseline', gap: 22, zIndex: 910000, textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
          <span style={{ ...rec(1, 0, 650), fontSize: 44, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{clockAt(f)}</span>
          <span style={{ ...rec(1, 0, 650), fontSize: 19, letterSpacing: '0.18em', color: labelCol }}>{label}</span>
        </div>
      ) : null}
      {f < END ? <PulseLine f={f} stress={stress} flat={f >= FRZ && f < RW} safe={safe} /> : null}
      <Letterbox t={shot && !inside ? 1 : 0} />
      <Flash a={0.5 * flashThru} color="190,205,255" />
      <Flash a={f >= D ? 0.16 * Math.exp(-(f - D) / 5) : 0} color="47,124,246" />
      <Flash a={f >= FRZ ? 0.12 * Math.exp(-(f - FRZ) / 4) : 0} />
      <BrandEnd
        g={g}
        from={END}
        bg={`linear-gradient(135deg, ${RED_D}, ${RED})`}
        accent="#fff"
        muted="rgba(255,255,255,0.84)"
        kicker="RUST · LOCAL-FIRST · MACOS"
        wipe="left"
        logo={
          <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
            <PulseMark size={130} bg="rgba(255,255,255,0.16)" />
            <div style={{ fontFamily: SANS, fontSize: 170, fontWeight: 750, letterSpacing: '-0.03em', color: '#fff' }}>PerfPulse</div>
          </div>
        }
        line="A warning while there is still room to act."
      >
        <svg width={900} height={120} viewBox="0 0 900 120">
          <polyline points={new Array(76).fill(0).map((_, i) => { const x = i * 12; const ph = (x / 900) * 3 - (f - END) / 20; const b = Math.max(0, Math.sin(ph * Math.PI)) ** 16; return `${x},${70 - b * 55}`; }).join(' ')} stroke="#fff" strokeWidth={4} fill="none" opacity={0.85} />
        </svg>
      </BrandEnd>
      <Vignette s={0.5} />
      <Grain />
      <Audio src={staticFile('audio/perfpulse_mix.wav')} />
    </AbsoluteFill>
  );
};

/** dashboard push ease: anticipate, travel, long settle */
const CINE2 = (t: number) => ANTIC(clamp(t));
