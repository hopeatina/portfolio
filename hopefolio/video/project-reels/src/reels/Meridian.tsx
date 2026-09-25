import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS, beatAfter, beatPulse } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Score, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';

/**
 * MERIDIAN — "The score is not the reason."
 * One number, 84, grows on every downbeat of the build while a cursor drifts
 * toward BUY: the pressure of a busy desk. On the drop the number cracks open
 * into its conviction stack (regime, positioning, orderflow, calendar,
 * history, and a concern), each bar tracing to its evidence. Then the plan
 * fields, and the honest ending: live execution is disabled in this branch.
 * Demo values, labelled as such (the case study's own rule).
 */
const g = GRIDS.meridian;
const D = Math.round(g.drop);
const B = Math.round(g.button);
const TEAL = '#3ee6b4';
const STACK = [
  { k: 'Regime', v: 24, ev: 'Range-bound regime, 3 sessions' },
  { k: 'Positioning', v: 21, ev: 'Crowded shorts into support' },
  { k: 'Orderflow', v: 26, ev: 'Liquidity swept below 2280' },
  { k: 'Calendar', v: 9, ev: 'No tier-1 data before entry' },
  { k: 'History', v: 12, ev: '7 of 10 similar setups resolved up' },
  { k: 'Concern', v: -8, ev: 'Dollar strength into the close' },
];
const TICKER = 'GC 2284.6 ▲  ES 5612.25 ▼  NQ 19840.5 ▲  CL 71.02 ▼  ZN 110.14 ▲  6E 1.0842 ▼  ';

export const Meridian: React.FC = () => {
  const f = useCurrentFrame();
  const downs = g.downbeats.filter((d) => d > 20 && d < D).length;
  const grown = g.downbeats.filter((d) => d > 20 && d <= f && d < D).length;
  const crack = HOUSE(prog(f, D, D + 18));
  const numScale = mix(1, 1.9, (grown / Math.max(1, downs)) ** 1.2) * (1 - 0.4 * crack);
  const cursor = TRAVEL(prog(f, 120, D - 10));
  const plan = HOUSE(prog(f, beatAfter(g, D, 4), beatAfter(g, D, 4) + 16));
  const stamp = settle(prog(f, beatAfter(g, D, 7), beatAfter(g, D, 7) + 10), 1.4);
  const endFrom = B - 72;
  const out = HOUSE(prog(f, endFrom - 10, endFrom + 10));
  const kick = beatPulse(g, f, 5);
  const total = STACK.reduce((a, s) => a + Math.max(0, s.v), 0);
  return (
    <AbsoluteFill style={{ background: '#05070a', overflow: 'hidden' }}>
      <AbsoluteFill style={{ opacity: 1 - out }}>
        <div style={{ position: 'absolute', left: 140, top: 120, ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.2em', color: TEAL }}>MERIDIAN · RESEARCH DESK · DEMO VALUES, NOT A TRADING RECORD</div>
        <div style={{ position: 'absolute', left: 140, top: 160, fontFamily: T.serif, fontStyle: 'italic', fontSize: 76, lineHeight: 1.05, width: 1600, color: T.mineral }}>
          {f < D ? 'A confidence score can hide the decision.' : 'Conviction, with its ingredients showing.'}
        </div>
        {/* the signal card */}
        <div style={{ position: 'absolute', left: 140, top: 360, ...rec(1, 0, 600), fontSize: 30, color: T.mineral2 }}>
          GC · <span style={{ color: TEAL }}>LONG</span> · Liquidity Sweep Reversal
        </div>
        <div style={{ position: 'absolute', left: 140, top: 420, transformOrigin: '0% 0%', transform: `scale(${numScale * (1 + 0.03 * kick * (f < D ? 1 : 0))})`, fontFamily: T.serif, fontSize: 280, lineHeight: 0.9, color: T.mineral, opacity: 1 - crack }}>
          84
        </div>
        {f < D ? (
          <>
            <div style={{ position: 'absolute', left: mix(1500, 1210, cursor), top: mix(900, 620, cursor), padding: '22px 44px', borderRadius: 14, background: T.signal, color: T.carbon, ...rec(1, 0, 800), fontSize: 34, opacity: HOUSE(prog(f, 90, 110)) }}>BUY</div>
            <svg width={40} height={40} style={{ position: 'absolute', left: mix(1780, 1330, cursor), top: mix(1000, 660, cursor) }} viewBox="0 0 24 24"><path d="M3 2l7 19 3-8 8-3z" fill="#fff" stroke="#000" strokeWidth={1} /></svg>
            <div style={{ position: 'absolute', left: 1000, top: 430, ...rec(0, 0.6, 500), fontSize: 44, color: T.heat, opacity: HOUSE(prog(f, 300, 330)) }}>{resolveText('    ', 'why?', prog(f, 300, 330), 'why', f)}</div>
          </>
        ) : null}
        {/* the conviction stack */}
        {crack > 0.01 ? (
          <div style={{ position: 'absolute', left: 140, top: 390, width: 1640 }}>
            <div style={{ display: 'flex', height: 80, gap: 4 }}>
              {STACK.filter((s) => s.v > 0).map((s, i) => {
                const a = RESOLVE(prog(f, D + 4 + i * 4, D + 20 + i * 4));
                return (
                  <div key={s.k} style={{ width: `${(s.v / total) * 100 * a}%`, background: `rgba(62,230,180,${0.25 + i * 0.12})`, display: 'flex', alignItems: 'center', paddingLeft: 12, ...rec(1, 0, 700), fontSize: 24, color: T.carbon, overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    +{s.v}
                  </div>
                );
              })}
            </div>
            {STACK.map((s, i) => {
              const a = HOUSE(prog(f, beatAfter(g, D, 1) + i * 5, beatAfter(g, D, 1) + i * 5 + 14));
              const neg = s.v < 0;
              return (
                <div key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 18, maxWidth: 1060 - 0 * plan, opacity: a * (1 - 0.35 * plan), transform: `translateX(${(1 - a) * 60}px)` }}>
                  <span style={{ width: 20, height: 20, borderRadius: 10, background: neg ? T.heat : TEAL }} />
                  <span style={{ ...rec(1, 0, 600), fontSize: 28, color: T.mineral, width: 230 }}>{s.k}</span>
                  <span style={{ ...rec(1, 0, 700), fontSize: 28, color: neg ? T.heat : TEAL, width: 90 }}>{neg ? s.v : `+${s.v}`}</span>
                  <span style={{ width: 80 * a, height: 2, background: T.mineral4 }} />
                  <span style={{ ...rec(0, 0.3, 440), fontSize: 28, color: T.mineral2 }}>{s.ev}</span>
                </div>
              );
            })}
          </div>
        ) : null}
        {/* plan fields: explicit before any consequential step */}
        {plan > 0.01 ? (
          <div style={{ position: 'absolute', right: 140, top: 390, width: 520, padding: 28, borderRadius: 14, background: 'rgba(17,17,14,0.95)', border: `1px solid ${T.mineral4}`, opacity: plan, transform: `translateY(${(1 - plan) * 40}px)` }}>
            <div style={{ ...rec(1, 0, 600), fontSize: 18, letterSpacing: '0.16em', color: T.mineral3, marginBottom: 14 }}>TRADE PLAN · STRUCTURED</div>
            {[['Entry', 'Limit @ 2289'], ['Stop', '2271'], ['Target', '2310'], ['Size', '$4,200']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', ...rec(1, 0, 500), fontSize: 30, padding: '8px 0', color: T.mineral }}>
                <span style={{ color: T.mineral3 }}>{k}</span><span>{v}</span>
              </div>
            ))}
            {stamp > 0.01 ? (
              <div style={{ marginTop: 20, padding: '14px 18px', border: `3px solid ${T.heat}`, color: T.heat, ...rec(1, 0, 800), fontSize: 24, letterSpacing: '0.12em', textAlign: 'center', transform: `rotate(-4deg) scale(${stamp})` }}>
                LIVE EXECUTION: DISABLED
              </div>
            ) : null}
          </div>
        ) : null}
        {/* ticker */}
        <div style={{ position: 'absolute', left: 0, bottom: 60, whiteSpace: 'nowrap', ...rec(1, 0, 500), fontSize: 26, color: T.mineral3, transform: `translateX(${-((f * (f < D ? 6 : 2)) % 1400)}px)` }}>{TICKER.repeat(6)}</div>
      </AbsoluteFill>
      <Flash a={f >= D ? 0.16 * Math.exp(-(f - D) / 6) : 0} color="62,230,180" />
      <EndCard g={g} index="08 / DECISION INTERFACES" title="Meridian" line="Conviction is useful when its ingredients stay visible." accent={TEAL} from={endFrom} />
      <Vignette />
      <Grain />
      <Score proj="meridian" />
    </AbsoluteFill>
  );
};
export const mUnused = [Img, staticFile, clamp];
