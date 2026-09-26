import React from 'react';
import { AbsoluteFill, random, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { BrandEnd } from '../lib/BrandEnd';
import { at, handheld, pulse, sub } from '../lib/score';
import hitsJson from '../data/hits_meridian.json';

/**
 * MERIDIAN v4: "The part the score was hiding."
 *
 * One setup, played twice. First on the usual desk: a signal says 84, a gold BUY
 * button waits, the long lens pushes in (FOMO), the click, and everything stops.
 * Next morning at 8:30, CPI prints and the candle runs through the stop. "Why
 * did I take this?" The score has nothing to say. Rewind: the same signal, in
 * Meridian's real signal preview. Click the 84 and conviction comes apart into
 * its evidence, each ingredient landing on a note of the build; the last row is
 * the concern the headline hid (calendar −8: CPI tomorrow). The only rack focus
 * in the film. On the drop the plan changes: an event gate, half the risk, wait
 * for the print. The same candle passes and costs nothing, and the reason is on
 * the record for the review. Honest ending: a research prototype, demo values,
 * live execution disabled.
 *
 * Brand: Meridian's real identity: near-black, the serif display, the gold M
 * ring, the green 84, the amber STRUCTURED chip. Camera: FOMO is a long-lens
 * push with a Dutch tilt; the replay is a locked courtroom frame; the concern is
 * the only rack focus. Subliminal: the ticker tape briefly carries WHY.
 * All values are illustrative (demo), not a trading record.
 */
const g = GRIDS.meridian;
const M = g.markers as Record<string, number>;
const H = { hat: at(hitsJson.hat as [number, number][]), snare: at(hitsJson.snare as [number, number][]), note: hitsJson.note as number[] };
const BUY = Math.round(M.buy);
const CPI = Math.round(M.cpi);
const WHY = Math.round(M.why);
const RE = Math.round(M.replay);
const STACK = Math.round(M.stack);
const CONCERN = Math.round(M.concern);
const D = Math.round(M.drop);
const CPI2 = Math.round(M.cpi2);
const REC = Math.round(M.record);
const HONEST = Math.round(M.honest);
const END = Math.round(M.end);

const INK = '#e9e9ef';
const DIM = 'rgba(233,233,239,0.55)';
const CARD = '#15161c';
const BORDER = 'rgba(255,255,255,0.1)';
const GREENV = '#5fd08a';
const GOLD = '#d4a24c';
const AMBER = '#e2a33a';
const REDC = '#e5534b';
const SANS = '"DM Sans", "Helvetica Neue", system-ui, sans-serif';
const SERIF = T.serif;

const MRing: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx={50} cy={50} r={45} fill="none" stroke={GOLD} strokeWidth={4} />
    <path d="M28 68 L28 34 L50 58 L72 34 L72 68" fill="none" stroke={GOLD} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const INGREDIENTS = [
  { k: 'REGIME', v: 24, d: 'Range-bound for 3 sessions' },
  { k: 'POSITIONING', v: 21, d: 'Crowded shorts into support' },
  { k: 'ORDERFLOW', v: 26, d: 'Absorption at 2280' },
  { k: 'HISTORY', v: 21, d: '7 of 10 similar setups resolved up' },
];
const CONCERN_ROW = { k: 'CALENDAR', v: -8, d: 'CPI prints tomorrow, 08:30' };

// ── a deterministic price series; `shock` = the CPI candle
const candles = (n: number, seed: string) =>
  new Array(n).fill(0).map((_, i) => {
    const drift = Math.sin(i / 5) * 3 + i * 0.25;
    const o = 2284 + drift + (random(`${seed}o${i}`) - 0.5) * 4;
    const c = o + (random(`${seed}c${i}`) - 0.45) * 5;
    return { o, c, h: Math.max(o, c) + random(`${seed}h${i}`) * 2.5, l: Math.min(o, c) - random(`${seed}l${i}`) * 2.5 };
  });
const SERIES = candles(34, 'mer');

const Chart: React.FC<{ f: number; from: number; shockAt: number; position: 'long' | 'none'; w: number; h: number; stop?: number }> = ({ f, from, shockAt, position, w, h, stop = 2271 }) => {
  const shown = Math.min(SERIES.length, 22 + Math.floor(Math.max(0, f - from) / 3));
  const shock = HOUSE(prog(f, shockAt, shockAt + 14));
  const lo = 2248;
  const hi = 2300;
  const y = (p: number) => h - ((p - lo) / (hi - lo)) * h;
  const cw = w / (SERIES.length + 3);
  const last = SERIES[shown - 1];
  const shockLow = mix(last.c, 2252, shock);
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      {[2260, 2271, 2285, 2300].map((p) => (
        <g key={p}>
          <line x1={0} x2={w} y1={y(p)} y2={y(p)} stroke={p === stop ? REDC : 'rgba(255,255,255,0.06)'} strokeDasharray={p === stop ? '8 8' : undefined} strokeWidth={p === stop ? 2 : 1} />
          {p === stop ? <text x={w - 6} y={y(p) - 8} textAnchor="end" fill={REDC} fontSize={20} fontFamily="Recursive">stop 2271</text> : null}
          {p === 2285 && position === 'long' ? <text x={w - 6} y={y(p) - 8} textAnchor="end" fill={GREENV} fontSize={20} fontFamily="Recursive">entry 2285</text> : null}
        </g>
      ))}
      {SERIES.slice(0, shown).map((k, i) => (
        <g key={i}>
          <line x1={i * cw + cw / 2} x2={i * cw + cw / 2} y1={y(k.h)} y2={y(k.l)} stroke={k.c >= k.o ? GREENV : REDC} strokeWidth={2} />
          <rect x={i * cw + cw * 0.18} width={cw * 0.64} y={y(Math.max(k.o, k.c))} height={Math.max(2, Math.abs(y(k.o) - y(k.c)))} fill={k.c >= k.o ? GREENV : REDC} />
        </g>
      ))}
      {shock > 0 ? (
        <g>
          <line x1={shown * cw + cw / 2} x2={shown * cw + cw / 2} y1={y(last.c + 1)} y2={y(shockLow - 2)} stroke={REDC} strokeWidth={3} />
          <rect x={shown * cw + cw * 0.12} width={cw * 0.76} y={y(last.c)} height={Math.max(2, y(shockLow) - y(last.c))} fill={REDC} />
          <text x={shown * cw + cw * 1.3} y={y(shockLow) + 6} fill={REDC} fontSize={26} fontWeight={700} fontFamily={SANS} opacity={prog(shock, 0.6, 1)}>
            CPI 08:30
          </text>
        </g>
      ) : null}
    </svg>
  );
};

/** The usual signal card: a number and a button. Nothing to question. */
const UsualCard: React.FC<{ f: number }> = ({ f }) => {
  const press = f >= BUY - 2 && f < BUY + 4;
  const filled = f >= BUY;
  return (
    <div style={{ width: 860, borderRadius: 26, background: '#101116', border: `1px solid ${BORDER}`, padding: '34px 40px', fontFamily: SANS, color: INK }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 40, fontWeight: 700 }}>GC</span>
        <span style={{ fontSize: 20, fontWeight: 700, padding: '5px 12px', borderRadius: 8, background: 'rgba(95,208,138,0.15)', color: GREENV }}>LONG</span>
        <span style={{ marginLeft: 'auto', ...rec(1, 0, 500), fontSize: 20, color: DIM }}>signal score</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: 20 }}>
        <span style={{ fontFamily: SERIF, fontSize: 260, lineHeight: 0.8, color: GREENV, fontVariantNumeric: 'tabular-nums' }}>84</span>
        <span style={{ marginLeft: 'auto', padding: '26px 64px', borderRadius: 18, background: filled ? '#2a2b31' : GOLD, color: filled ? GREENV : '#1b1405', fontSize: 52, fontWeight: 800, transform: `scale(${press ? 0.92 : 1})`, boxShadow: filled ? 'none' : `0 0 ${40 + 30 * Math.sin(f / 6)}px rgba(212,162,76,0.45)` }}>{filled ? 'Filled ✓' : 'BUY'}</span>
      </div>
      <div style={{ ...rec(1, 0, 500), fontSize: 20, color: DIM, marginTop: 24 }}>{filled ? '3 contracts @ 2285 · risk $4,200' : 'strong signal · 2m ago'}</div>
    </div>
  );
};

/** Meridian's real signal preview + the conviction stack that opens from the number. */
const MeridianCard: React.FC<{ f: number }> = ({ f }) => {
  const open = HOUSE(prog(f, STACK, STACK + 12));
  const rows = [...INGREDIENTS, CONCERN_ROW];
  const noteT = H.note.filter((n) => n >= STACK + 10 && n < CONCERN).slice(0, 4);
  const rowAt = (i: number) => (i < 4 ? noteT[i] ?? STACK + 16 + i * 18 : CONCERN - 6);
  const rack = HOUSE(prog(f, CONCERN, CONCERN + 14)) * (1 - HOUSE(prog(f, D + 40, D + 70)));
  const sum = rows.reduce((a, r, i) => a + (f >= rowAt(i) ? r.v : 0), 0);
  const plan = f >= D;
  const pT = settle(prog(f, D, D + 12), 1);
  const click = f >= STACK - 3 && f < STACK + 3;
  return (
    <div style={{ width: 1100, fontFamily: SANS, color: INK }}>
      <div style={{ borderRadius: 30, border: '1px solid rgba(255,255,255,0.18)', padding: 14, background: '#0d0e12' }}>
        <div style={{ borderRadius: 22, background: CARD, border: `1px solid ${BORDER}`, padding: '26px 30px' }}>
          <div style={{ ...rec(1, 0, 500), fontSize: 17, letterSpacing: '0.16em', color: DIM }}>SIGNAL PREVIEW</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
            <span style={{ fontSize: 38, fontWeight: 700 }}>GC</span>
            <span style={{ fontSize: 19, fontWeight: 700, padding: '5px 12px', borderRadius: 8, background: 'rgba(95,208,138,0.15)', color: GREENV }}>LONG</span>
            <span style={{ fontSize: 24, color: DIM }}>Liquidity Sweep Reversal</span>
            <span style={{ marginLeft: 'auto', fontSize: 20, color: DIM }}>2m ago</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 18 }}>
            <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.08)' }}>
              <div style={{ width: '84%', height: '100%', borderRadius: 4, background: GREENV }} />
            </div>
            <span style={{ fontFamily: SERIF, fontSize: 64, color: GREENV, lineHeight: 1, padding: '0 10px', borderRadius: 10, boxShadow: click ? `0 0 0 3px ${GOLD}` : f < STACK && f > RE + 8 ? `0 0 0 2px rgba(212,162,76,${0.4 + 0.3 * Math.sin(f / 5)})` : 'none' }}>84</span>
          </div>
          <div style={{ display: 'flex', gap: 60, marginTop: 20 }}>
            {[
              ['R : R', '1.8 : 1'],
              ['RISK', plan ? '$2,100' : '$4,200'],
              ['SIZE', plan ? '1 contract' : '3 contracts'],
              ['STRATEGY', 'Mean Reversion'],
            ].map(([a, b]) => (
              <div key={a}>
                <div style={{ ...rec(1, 0, 500), fontSize: 15, letterSpacing: '0.12em', color: DIM }}>{a}</div>
                <div style={{ fontSize: 25, marginTop: 4, color: plan && (a === 'RISK' || a === 'SIZE') ? AMBER : INK }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
        {/* the conviction stack, opened from the number */}
        <div style={{ overflow: 'hidden', maxHeight: open * 560, marginTop: open * 14 }}>
          <div style={{ borderRadius: 22, background: CARD, border: `1px solid ${BORDER}`, padding: '22px 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ ...rec(1, 0, 500), fontSize: 17, letterSpacing: '0.16em', color: DIM }}>CONVICTION STACK</span>
              <span style={{ marginLeft: 'auto', fontFamily: SERIF, fontSize: 40, color: GREENV, fontVariantNumeric: 'tabular-nums' }}>= {sum}</span>
            </div>
            {rows.map((r, i) => {
              const on = f >= rowAt(i);
              const t = settle(prog(f, rowAt(i), rowAt(i) + 10), 1);
              const concern = i === 4;
              const blur = concern ? 0 : rack * 6;
              return (
                <div key={r.k} style={{ display: 'flex', alignItems: 'center', height: 76, borderTop: '1px solid rgba(255,255,255,0.06)', opacity: on ? (concern ? 1 : mix(1, 0.4, rack)) : 0, transform: `translateX(${(1 - t) * 40}px) scale(${concern ? 1 + 0.06 * rack : 1})`, transformOrigin: '0 50%', filter: blur > 0.2 ? `blur(${blur}px)` : undefined, background: concern ? `rgba(226,163,58,${0.06 + 0.14 * rack})` : 'transparent', borderRadius: concern ? 12 : 0, padding: concern ? '0 12px' : 0 }}>
                  <span style={{ width: 110, fontFamily: SERIF, fontSize: 48, color: concern ? AMBER : GREENV, fontVariantNumeric: 'tabular-nums' }}>{r.v > 0 ? `+${r.v}` : `−${-r.v}`}</span>
                  <span style={{ width: 230, ...rec(1, 0, 650), fontSize: 19, letterSpacing: '0.12em', color: concern ? AMBER : DIM }}>{r.k}</span>
                  <span style={{ fontSize: 28, color: concern ? '#ffe2b0' : INK }}>{r.d}</span>
                  {concern ? <span style={{ marginLeft: 'auto', ...rec(1, 0, 700), fontSize: 16, letterSpacing: '0.14em', padding: '6px 12px', borderRadius: 8, border: `1px solid ${AMBER}`, color: AMBER }}>CONCERN</span> : null}
                </div>
              );
            })}
          </div>
        </div>
        {/* the plan changes on the drop */}
        {plan ? (
          <div style={{ marginTop: 14, borderRadius: 22, background: CARD, border: `1px solid ${AMBER}`, padding: '20px 30px', transform: `scale(${mix(0.96, 1, pT)})`, opacity: clamp(pT) }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ ...rec(1, 0, 500), fontSize: 17, letterSpacing: '0.16em', color: DIM }}>TRADE PLAN FIELDS</span>
              <span style={{ marginLeft: 'auto', ...rec(1, 0, 700), fontSize: 16, padding: '5px 12px', borderRadius: 8, background: 'rgba(226,163,58,0.15)', color: AMBER }}>STRUCTURED</span>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
              {[
                ['ENTRY', 'after CPI · limit 2285'],
                ['EVENT GATE', 'CPI 08:30 · wait'],
                ['RISK', '$4,200 → $2,100'],
              ].map(([a, b]) => (
                <div key={a} style={{ flex: 1, borderRadius: 14, border: `1px solid ${BORDER}`, padding: '12px 16px' }}>
                  <div style={{ ...rec(1, 0, 500), fontSize: 14, letterSpacing: '0.12em', color: DIM }}>{a}</div>
                  <div style={{ fontSize: 26, marginTop: 4, color: a === 'EVENT GATE' ? AMBER : INK }}>{b}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

/** The record: the decision node, linked back to its evidence. */
const Record: React.FC<{ f: number }> = ({ f }) => {
  const t = HOUSE(prog(f, REC, REC + 16));
  const links = ['REGIME +24', 'POSITIONING +21', 'ORDERFLOW +26', 'HISTORY +21', 'CALENDAR −8'];
  return (
    <div style={{ width: 1500, height: 560, position: 'relative', fontFamily: SANS, color: INK, opacity: t }}>
      <svg width={1500} height={560} style={{ position: 'absolute', inset: 0 }}>
        {links.map((l, i) => {
          const y = 60 + i * 110;
          const d = HOUSE(prog(f, REC + 8 + i * 5, REC + 22 + i * 5));
          return <path key={l} d={`M520 280 C 760 280, 820 ${y}, ${mix(520, 1060, d)} ${mix(280, y, d)}`} stroke={i === 4 ? AMBER : 'rgba(95,208,138,0.6)'} strokeWidth={i === 4 ? 4 : 2} fill="none" />;
        })}
      </svg>
      <div style={{ position: 'absolute', left: 0, top: 170, width: 520, borderRadius: 22, background: CARD, border: `2px solid ${GOLD}`, padding: '24px 28px' }}>
        <div style={{ ...rec(1, 0, 600), fontSize: 16, letterSpacing: '0.16em', color: GOLD }}>DECISION · JOURNAL</div>
        <div style={{ fontFamily: SERIF, fontSize: 44, marginTop: 8 }}>Waited for CPI.</div>
        <div style={{ fontSize: 24, color: DIM, marginTop: 8 }}>because: calendar −8 · half risk</div>
      </div>
      {links.map((l, i) => (
        <div key={l} style={{ position: 'absolute', left: 1070, top: 36 + i * 110, padding: '10px 18px', borderRadius: 12, background: CARD, border: `1px solid ${i === 4 ? AMBER : BORDER}`, ...rec(1, 0, 600), fontSize: 20, color: i === 4 ? AMBER : INK, opacity: HOUSE(prog(f, REC + 18 + i * 5, REC + 26 + i * 5)) }}>
          {l}
        </div>
      ))}
    </div>
  );
};

const Title: React.FC<{ f: number; from: number; to: number; big: string; small?: string; x?: number; y?: number; size?: number; color?: string; serif?: boolean }> = ({ f, from, to, big, small, x = 120, y = 800, size = 84, color = INK, serif = true }) => {
  if (f < from - 2 || f > to + 12) return null;
  const tIn = HOUSE(prog(f, from, from + 16));
  const tOut = prog(f, to, to + 10);
  return (
    <div style={{ position: 'absolute', left: x, top: y, zIndex: 906000, opacity: 1 - tOut }}>
      <div style={{ fontFamily: serif ? SERIF : SANS, fontSize: size, lineHeight: 1.04, color, clipPath: `inset(-10% ${(1 - tIn) * 100}% -30% 0)`, textShadow: '0 6px 40px rgba(0,0,0,0.8)', letterSpacing: '-0.015em' }}>{big}</div>
      {small ? <div style={{ ...rec(1, 0, 550), fontSize: Math.max(22, size * 0.3), color: DIM, marginTop: 14, opacity: HOUSE(prog(f, from + 8, from + 22)) }}>{small}</div> : null}
    </div>
  );
};

/** The ticker tape across the top of the usual desk (rewatch: WHY rides it for 7 frames). */
const Ticker: React.FC<{ f: number }> = ({ f }) => {
  const items = ['GC 2285.4 ▲', 'ES 5412.25 ▼', 'NQ 19,203 ▲', 'CL 71.34 ▼', 'ZN 110.2 ▲', 'SI 29.81 ▲', '6E 1.0842 ▼', 'RTY 2,061 ▲'];
  const why = sub(f, 150, 7);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 56, background: '#0b0c10', borderBottom: `1px solid ${BORDER}`, overflow: 'hidden', zIndex: 5 }}>
      <div style={{ position: 'absolute', left: -((f * 3) % 1400), top: 14, display: 'flex', gap: 60, whiteSpace: 'nowrap', ...rec(1, 0, 550), fontSize: 22, color: DIM }}>
        {[...items, ...items, ...items].map((s, i) => (
          <span key={i} style={{ color: why && i % 8 === 3 ? GOLD : s.endsWith('▲') ? 'rgba(95,208,138,0.8)' : 'rgba(229,83,75,0.8)' }}>{why && i % 8 === 3 ? 'WHY ?.??' : s}</span>
        ))}
      </div>
    </div>
  );
};

export const Meridian: React.FC = () => {
  const f = useCurrentFrame();
  const usual = f < RE;
  const hh = handheld(f, f < BUY ? 5 : 2, f < BUY ? 0.4 : 0, 4);
  // FOMO: long-lens push toward BUY with a creeping Dutch tilt
  const push = HOUSE(prog(f, 0, BUY));
  const uS = mix(1.0, 1.55, push);
  const uX = mix(0, -230, push);
  const uY = mix(0, -40, push);
  const dutch = mix(0, -3.5, push) * (f < BUY ? 1 : 0);
  const stopKick = pulse([BUY], f, 5);
  const shock = pulse([CPI + 6, CPI2 + 6], f, 6);
  const replayIn = settle(prog(f, RE, RE + 14), 0.7);
  // replay camera: locked courtroom frame, moved only between focus points in card space
  const k1 = HOUSE(prog(f, STACK, STACK + 30));
  const k2 = HOUSE(prog(f, CONCERN - 4, CONCERN + 20));
  const k3 = HOUSE(prog(f, D, D + 26));
  const fx = mix(mix(mix(550, 550, k1), 560, k2), 760, k3);
  const fy = mix(mix(mix(135, 430, k1), 700, k2), 560, k3);
  const rS = mix(mix(mix(1.45, 1.18, k1), 1.5, k2), 0.98, k3);
  const showRecord = f >= REC && f < END;
  const chartMode = f >= CPI && f < RE ? 'first' : f >= CPI2 && f < REC ? 'second' : null;
  return (
    <AbsoluteFill style={{ background: '#0a0b0f', overflow: 'hidden', fontFamily: SANS }}>
      {/* ── the usual desk */}
      {usual && f < CPI ? (
        <AbsoluteFill>
          <Ticker f={f} />
          <AbsoluteFill style={{ transform: `translate(${uX + hh.x}px, ${uY + hh.y}px) scale(${uS * (1 + 0.03 * stopKick)}) rotate(${dutch + hh.r}deg)`, transformOrigin: '62% 58%', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'absolute', left: 120, top: 200, opacity: 0.5 }}>
              <Chart f={f} from={0} shockAt={99999} position="none" w={700} h={300} />
            </div>
            <div style={{ position: 'absolute', right: 160, top: 360 }}>
              <UsualCard f={f} />
            </div>
          </AbsoluteFill>
          {/* the cursor creeps toward BUY */}
          <svg width={46} height={60} viewBox="0 0 23 30" style={{ position: 'absolute', left: mix(900, 1500, HOUSE(prog(f, 40, BUY - 4))), top: mix(900, 700, HOUSE(prog(f, 40, BUY - 4))), transform: `scale(${f >= BUY - 2 && f < BUY + 4 ? 0.85 : 1})`, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))', zIndex: 10 }}>
            <path d="M1 1 L1 24 L7 18 L11 28 L15 26 L11 17 L19 17 Z" fill="#fff" stroke="#000" strokeWidth={1.5} strokeLinejoin="round" />
          </svg>
          <Title f={f} from={40} to={BUY - 10} big="84. Strong signal." small="Most desks stop at the score." x={120} y={760} size={96} />
        </AbsoluteFill>
      ) : null}

      {/* ── the consequence, and the question the score can't answer */}
      {chartMode === 'first' ? (
        <AbsoluteFill>
          <div style={{ position: 'absolute', left: 120, top: 90, ...rec(1, 0, 650), fontSize: 26, letterSpacing: '0.16em', color: DIM }}>NEXT MORNING · 08:30 · CPI</div>
          <div style={{ position: 'absolute', left: 160, top: 180, transform: `translate(${(random(`sx${f}`) - 0.5) * 16 * shock}px, 0)` }}>
            <Chart f={f} from={CPI - 60} shockAt={CPI + 6} position="long" w={1600} h={560} />
          </div>
          <div style={{ position: 'absolute', right: 160, top: 84, fontFamily: SERIF, fontSize: 90, color: REDC, opacity: HOUSE(prog(f, CPI + 16, CPI + 26)), fontVariantNumeric: 'tabular-nums' }}>−$4,200</div>
          {f >= WHY ? (
            <AbsoluteFill style={{ background: `rgba(10,11,15,${0.85 * HOUSE(prog(f, WHY, WHY + 10))})`, justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', opacity: HOUSE(prog(f, WHY + 4, WHY + 16)) }}>
                <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 110, color: INK }}>“Why did I take this?”</div>
                <div style={{ marginTop: 40, display: 'inline-flex', alignItems: 'baseline', gap: 30, padding: '20px 40px', borderRadius: 20, border: `1px solid ${BORDER}` }}>
                  <span style={{ fontFamily: SERIF, fontSize: 120, color: GREENV, lineHeight: 1 }}>84</span>
                  <span style={{ ...rec(1, 0, 550), fontSize: 28, color: DIM }}>that’s all it says.</span>
                </div>
              </div>
            </AbsoluteFill>
          ) : null}
        </AbsoluteFill>
      ) : null}

      {/* ── the replay, in Meridian: locked, symmetrical */}
      {f >= RE && f < REC ? (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(212,162,76,0.10), transparent 60%)' }} />
          <div style={{ position: 'absolute', left: 120, top: 80, display: 'flex', alignItems: 'center', gap: 16, opacity: replayIn }}>
            <MRing size={48} />
            <span style={{ ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.2em', color: INK }}>MERIDIAN</span>
            <span style={{ ...rec(1, 0, 500), fontSize: 20, letterSpacing: '0.16em', color: DIM, marginLeft: 20 }}>◀◀ SAME SIGNAL · THE NIGHT BEFORE</span>
          </div>
          <div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: `translate(${960 - (410 + fx) * rS * mix(0.94, 1, replayIn)}px, ${540 - fy * rS * mix(0.94, 1, replayIn)}px) scale(${rS * mix(0.94, 1, replayIn)})`, opacity: clamp(replayIn * 1.4) }}>
            <div style={{ position: 'absolute', left: 410, top: 0 }}>
              <MeridianCard f={f} />
            </div>
          </div>
          {chartMode === 'second' ? (
            <div style={{ position: 'absolute', right: 60, top: 300, width: 580, height: 290, borderRadius: 20, background: '#0d0e12', border: `1px solid ${BORDER}`, padding: 20, opacity: HOUSE(prog(f, CPI2 - 10, CPI2)) }}>
              <div style={{ ...rec(1, 0, 600), fontSize: 16, letterSpacing: '0.14em', color: DIM }}>08:30 · CPI · NO POSITION YET</div>
              <div style={{ marginTop: 10 }}>
                <Chart f={f} from={CPI2 - 60} shockAt={CPI2 + 6} position="none" w={540} h={190} />
              </div>
              <div style={{ position: 'absolute', right: 22, top: 16, fontFamily: SERIF, fontSize: 40, color: GREENV, opacity: HOUSE(prog(f, CPI2 + 18, CPI2 + 28)) }}>$0 lost</div>
            </div>
          ) : null}
        </AbsoluteFill>
      ) : null}
      <Title f={f} from={CONCERN + 6} to={D - 4} big="The part the score was hiding." x={120} y={930} size={64} color="#ffe2b0" />
      <Title f={f} from={D + 12} to={CPI2 - 6} big="So the plan changes." small="Event gate. Half the risk. Wait for the print." x={120} y={900} size={58} />

      {/* ── the record: why, answerable later */}
      {showRecord ? (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(ellipse at 40% 50%, rgba(212,162,76,0.08), transparent 60%)' }}>
          <div style={{ transform: `scale(${mix(0.94, 1.02, HOUSE(prog(f, REC, END)))}) translateY(-60px)` }}>
            <Record f={f} />
          </div>
          <Title f={f} from={REC + 20} to={END - 2} big="Every decision, defensible." small="Before you take it, and after." x={120} y={820} size={84} />
          {f >= HONEST ? (
            <div style={{ position: 'absolute', right: 120, top: 90, ...rec(1, 0, 700), fontSize: 22, letterSpacing: '0.14em', color: REDC, padding: '10px 18px', border: `2px solid ${REDC}`, borderRadius: 10, transform: `rotate(-3deg) scale(${settle(prog(f, HONEST, HONEST + 8), 1.2)})` }}>
              RESEARCH PROTOTYPE · DEMO VALUES · LIVE EXECUTION DISABLED
            </div>
          ) : null}
        </AbsoluteFill>
      ) : null}

      <Flash a={0.3 * pulse([BUY], f, 3)} color="212,162,76" />
      <Flash a={0.2 * pulse([RE, D], f, 5)} color="212,162,76" />
      <Flash a={0.18 * shock} color="229,83,75" />
      <BrandEnd
        g={g}
        from={END}
        bg="radial-gradient(ellipse at 50% 35%, #1a1710, #0a0b0f 70%)"
        accent={GOLD}
        muted={DIM}
        kicker="DETECT · EXPLAIN · CONTROL · IMPROVE"
        font={SERIF}
        wipe="iris"
        logo={
          <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
            <MRing size={130} />
            <div style={{ fontFamily: SERIF, fontSize: 150, color: INK, letterSpacing: '0.02em' }}>Meridian</div>
          </div>
        }
        line="The Operating System for Conviction."
      />
      <Vignette s={0.55} />
      <Grain />
      <Audio src={staticFile('audio/meridian_mix.wav')} />
    </AbsoluteFill>
  );
};
