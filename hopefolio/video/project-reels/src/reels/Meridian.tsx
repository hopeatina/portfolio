import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';
import { Cam, Key, X, Y, Z, keyedCamera, spinAbout, v3 } from '../lib/space';
import { Blur, Fog, Plane } from '../lib/World';
import cues from '../data/cues_meridian.json';

/**
 * MERIDIAN v2: "The score is not the reason."
 * Frame 0: one number, 84, huge on a trading desk at night, and a cursor
 * already drifting toward BUY. The number is the hero. On every downbeat the
 * camera leans closer; on the kick a question types itself: why? On the drop
 * the numeral physically slices into its ingredients (each slice's height is
 * its weight), the stack pulls apart, and the camera walks down it while each
 * piece of evidence resolves on a snare. The concern that was hiding under
 * the score rises last, in red. Then the structured plan, and the honest
 * ending: live execution disabled. Demo values, labelled (the case study's
 * own rule). Rewatch: 24 + 21 + 26 + 9 + 12 − 8 = 84; the plan's values are
 * the ones on Meridian's real signal preview.
 */
const g = GRIDS.meridian;
const C = cues.cue;
const TEAL = '#3ee6b4';
const FOG: Fog = { near: 2600, far: 8000 };
const STACK = [
  { k: 'Regime', v: 24, ev: 'Range-bound regime, 3 sessions' },
  { k: 'Positioning', v: 21, ev: 'Crowded shorts into support' },
  { k: 'Orderflow', v: 26, ev: 'Liquidity swept below 2280' },
  { k: 'Calendar', v: 9, ev: 'No tier-1 data before entry' },
  { k: 'History', v: 12, ev: '7 of 10 similar setups resolved up' },
];
const CONCERN = { k: 'Concern', v: -8, ev: 'Dollar strength into the close' };
const NUM = v3(0, -520, 0); // the numeral's centre
const NW = 1300;
const NH = 1000;
const G0 = 148; // glyph top inside the box (px, measured on frame 0)
const G1 = 754; // glyph baseline
const TOTAL = STACK.reduce((a, s) => a + s.v, 0);
const sliceY = STACK.map((_, i) => G0 + ((G1 - G0) * STACK.slice(0, i).reduce((a, s) => a + s.v, 0)) / TOTAL);
const sliceH = STACK.map((s) => ((G1 - G0) * s.v) / TOTAL);
const STACK_GAP = 250;
const splitY = (i: number) => -560 + (i - 2) * STACK_GAP;
const PLAN = v3(1750, -520, -120);

const KEYS: Key[] = [
  [0, 0, -570, 0, 1250, 0, 0, 0], // 84, square on
  [C.downs[1], 40, -570, 0, 1120, -3, 0, 0],
  [C.downs[2], 60, -570, 0, 1000, 3, 0, 0],
  [C.downs[3], 80, -560, 0, 900, -2, 0, 0],
  [C.hover, 260, -420, 0, 820, 4, 2, 0],
  [C.drop, 200, -480, 0, 950, 2, 1, 0],
  [C.split + 22, 250, -560, 0, 2300, 24, 4, 0], // the stack, three-quarter
  [C.evidence[0] + 14, 450, splitY(0), 0, 1200, 22, 3, 0], // walk down it
  [C.evidence[1] + 8, 450, splitY(1), 0, 1200, 20, 2, 0],
  [C.evidence[2] + 8, 450, splitY(2), 0, 1200, 18, 1, 0],
  [C.evidence[3] + 8, 450, splitY(3), 0, 1200, 16, 0, 0],
  [C.evidence[4] + 8, 450, splitY(4), 0, 1250, 14, -1, 0],
  [C.evidence[5] + 10, 450, splitY(5), 0, 1350, 12, -2, 0], // the concern
  [C.plan + 16, PLAN.x, PLAN.y, PLAN.z, 1150, -4, 0, 0], // the plan
  [C.stamp + 14, PLAN.x, PLAN.y, PLAN.z, 1100, -4, 0, 0],
  [C.pullback + 24, 700, -500, -200, 3000, 8, 3, 0], // all of it
  [900, 700, -500, -200, 3150, 8, 3, 0],
];
const CAM = keyedCamera(KEYS, [
  { frames: C.downs, tau: 5, punch: 0.035, px: 5 },
  { frames: [C.split], tau: 6, punch: 0.05, px: 12 },
  { frames: C.evidence, tau: 4, punch: 0.012, px: 3 },
  { frames: [C.stamp], tau: 4, punch: 0.03, px: 8 },
]);

/** one horizontal slice of the numeral (the slices together are the number) */
const Slice: React.FC<{ y0: number; h: number; shade: number; glow: number }> = ({ y0, h, shade, glow }) => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: 0, top: -y0, width: NW, height: NH, fontFamily: T.serif, fontSize: 1000, lineHeight: 1, textAlign: 'center', color: T.mineral, filter: `brightness(${shade})`, textShadow: glow > 0 ? `0 0 ${60 * glow}px rgba(62,230,180,${0.6 * glow})` : 'none' }}>84</div>
  </div>
);

const Ingredient: React.FC<{ k: string; v: number; ev: string; t: number; f: number }> = ({ k, v, ev, t, f }) => {
  const neg = v < 0;
  const col = neg ? T.heat : TEAL;
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: 'rgba(8,12,12,0.94)', boxShadow: `inset 0 0 0 2px ${neg ? 'rgba(255,87,56,0.7)' : 'rgba(62,230,180,0.45)'}`, padding: '20px 26px', display: 'flex', alignItems: 'center', gap: 26 }}>
      <div style={{ fontFamily: T.serif, fontSize: 88, lineHeight: 1, color: col, width: 150 }}>{neg ? `−${-v}` : `+${v}`}</div>
      <div>
        <div style={{ ...rec(1, 0, 700), fontSize: 20, letterSpacing: '0.16em', color: col }}>{k.toUpperCase()}</div>
        <div style={{ ...rec(0, 0.3, 480), fontSize: 32, color: T.mineral, marginTop: 6, whiteSpace: 'pre' }}>{resolveText(''.padEnd(ev.length, ' '), ev, t, `m${k}`, f)}</div>
      </div>
    </div>
  );
};

const World: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const split = TRAVEL(prog(f, C.split, C.split + 30));
  const cursor = HOUSE(prog(f, 20, C.hover));
  const planT = HOUSE(prog(f, C.plan - 6, C.plan + 16));
  const stampT = settle(prog(f, C.stamp - 4, C.stamp + 6), 1.4);
  const concernT = TRAVEL(prog(f, C.evidence[5] - 20, C.evidence[5] + 6));
  const sumT = HOUSE(prog(f, C.plan, C.plan + 20));
  return (
    <>
      {/* the desk + the room */}
      <Plane cam={cam} c={v3(0, 80, -800)} U={X} V={Z} w={9000} h={5000} z={-400000}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #020405, #07100e 60%, #0a1512)' }} />
      </Plane>
      {[
        { src: 'img/signal-preview.png', c: v3(-1900, -760, -1900), yaw: 0.35 },
        { src: 'img/public-landing.png', c: v3(2600, -760, -2600), yaw: -0.45 },
      ].map((m) => (
        <Plane key={m.src} cam={cam} c={m.c} U={spinAbout(X, Y, m.yaw)} V={Y} w={1800} h={1143} fog={FOG} z={-200000}>
          <Img src={staticFile(m.src)} style={{ width: 1800, height: 1143, opacity: 0.22, borderRadius: 16, boxShadow: '0 0 80px rgba(62,230,180,0.18)' }} />
        </Plane>
      ))}
      {/* the numeral, as its slices (extruded) */}
      {STACK.map((s, i) => {
        const y0 = sliceY[i];
        const h = sliceH[i];
        const homeY = NUM.y - NH / 2 + y0 + h / 2;
        const y = mix(homeY, splitY(i), split);
        const x = mix(0, -260, split) + Math.sin(i * 1.7) * 40 * split;
        const zz = Math.cos(i * 2.3) * 120 * split;
        const U = spinAbout(X, Y, (i % 2 ? 1 : -1) * 0.12 * split);
        const lit = f >= C.evidence[i] ? 1 : 0;
        return [3, 2, 1, 0].map((k) => (
          <Plane key={`${i}${k}`} cam={cam} c={v3(x, y, zz - k * 9)} U={U} V={Y} w={NW} h={h + 1} fog={FOG} z={k === 0 ? 5 : -k}>
            <Slice y0={y0} h={h} shade={k === 0 ? 1 : 0.28 - k * 0.05} glow={k === 0 ? lit * Math.exp(-(f - C.evidence[i]) / 20) : 0} />
          </Plane>
        ));
      })}
      {/* each slice's ingredient, and its evidence */}
      {STACK.map((s, i) => {
        const on = HOUSE(prog(f, C.split + 14 + i * 3, C.split + 30 + i * 3));
        const t = RESOLVE(prog(f, C.evidence[i], C.evidence[i] + 18));
        return (
          <Plane key={s.k} cam={cam} c={v3(920, splitY(i), 60)} w={980} h={170} fog={FOG} opacity={on} z={20}>
            <Ingredient k={s.k} v={s.v} ev={s.ev} t={t} f={f} />
          </Plane>
        );
      })}
      {/* the concern: hiding under the score */}
      <Plane cam={cam} c={v3(920, mix(900, splitY(5), concernT), 60)} w={980} h={170} fog={FOG} opacity={clamp(concernT * 2)} z={20}>
        <Ingredient k={CONCERN.k} v={CONCERN.v} ev={CONCERN.ev} t={RESOLVE(prog(f, C.evidence[5], C.evidence[5] + 18))} f={f} />
      </Plane>
      <Plane cam={cam} c={v3(-260, splitY(5), 0)} w={1100} h={80} opacity={sumT}>
        <div style={{ ...rec(1, 0, 600), fontSize: 40, color: T.mineral2, textAlign: 'center', whiteSpace: 'nowrap' }}>
          24 + 21 + 26 + 9 + 12 <span style={{ color: T.heat }}>− 8</span> = <span style={{ color: TEAL }}>84</span>
        </div>
      </Plane>
      {/* BUY, and the cursor drifting toward it */}
      {f < C.split + 20 ? (
        <>
          <Plane cam={cam} c={v3(740, -330, 120)} w={260} h={96} opacity={1 - HOUSE(prog(f, C.split, C.split + 16))}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: f >= C.drop ? 'rgba(242,239,228,0.12)' : T.signal, color: T.carbon, display: 'flex', alignItems: 'center', justifyContent: 'center', ...rec(1, 0, 800), fontSize: 38 }}>BUY</div>
          </Plane>
          <Plane cam={cam} c={v3(mix(1080, 800, cursor), mix(-60, -310, cursor), 122)} w={44} h={44} opacity={1 - HOUSE(prog(f, C.drop, C.drop + 10))}>
            <svg width={44} height={44} viewBox="0 0 24 24">
              <path d="M3 2l7 19 3-8 8-3z" fill="#fff" stroke="#000" strokeWidth={1} />
            </svg>
          </Plane>
        </>
      ) : null}
      {/* the plan: explicit before any consequential step */}
      <Plane cam={cam} c={PLAN} w={760} h={560} fog={FOG} opacity={planT}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 18, background: 'rgba(11,15,15,0.97)', boxShadow: 'inset 0 0 0 2px rgba(242,239,228,0.14)', padding: '30px 36px' }}>
          <div style={{ ...rec(1, 0, 650), fontSize: 20, letterSpacing: '0.16em', color: T.mineral3, marginBottom: 18 }}>GC · LONG · TRADE PLAN · STRUCTURED</div>
          {[
            ['Entry', 'Limit @ 2285'],
            ['Stop', '2271'],
            ['Target', '2310'],
            ['Size', '$4,200'],
          ].map(([k, v], i) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', ...rec(1, 0, 500), fontSize: 36, padding: '10px 0', color: T.mineral, borderBottom: '1px solid rgba(242,239,228,0.08)', opacity: HOUSE(prog(f, C.plan + i * 5, C.plan + 12 + i * 5)) }}>
              <span style={{ color: T.mineral3 }}>{k}</span>
              <span>{v}</span>
            </div>
          ))}
          {stampT > 0.01 ? (
            <div style={{ marginTop: 26, padding: '16px 18px', border: `4px solid ${T.heat}`, color: T.heat, ...rec(1, 0, 800), fontSize: 28, letterSpacing: '0.12em', textAlign: 'center', transform: `rotate(-4deg) scale(${stampT})` }}>LIVE EXECUTION: DISABLED</div>
          ) : null}
        </div>
      </Plane>
    </>
  );
};

export const Meridian: React.FC = () => {
  const f = useCurrentFrame();
  const cam = CAM.at(f);
  const endDim = HOUSE(prog(f, C.end - 10, C.end + 16));
  const whyT = prog(f, C.why, C.why + 18);
  const line = (a: number, b: number) => HOUSE(prog(f, a, a + 14)) * (1 - HOUSE(prog(f, b, b + 10)));
  const words: [string, number][] = [
    ['A confidence score can hide the decision.', line(30, C.why - 6)],
    ['Conviction, with its ingredients showing.', line(C.split + 30, C.plan - 8)],
  ];
  const TICKER = 'GC 2284.6 ▲   ES 5612.25 ▼   NQ 19840.5 ▲   CL 71.02 ▼   ZN 110.14 ▲   6E 1.0842 ▼   ';
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 35%, #07110f, #020304 75%)', overflow: 'hidden' }}>
      <Blur
        ranges={[
          [C.split - 2, C.split + 32, 10],
          [C.evidence[5] + 10, C.plan + 18, 8],
          [C.pullback, C.pullback + 26, 8],
        ]}
      >
        <AbsoluteFill style={{ filter: `brightness(${1 - 0.72 * endDim}) blur(${5 * endDim}px)` }}>
          <World f={f} cam={cam} />
        </AbsoluteFill>
      </Blur>
      <AbsoluteFill style={{ opacity: 1 - endDim }}>
        <div style={{ position: 'absolute', left: 120, top: 92, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.2em', color: TEAL }}>MERIDIAN · RESEARCH DESK · DEMO VALUES, NOT A TRADING RECORD</div>
        <div style={{ position: 'absolute', left: 120, top: 128, ...rec(1, 0, 600), fontSize: 30, color: T.mineral2, opacity: HOUSE(prog(f, 4, 18)) * (1 - HOUSE(prog(f, C.split, C.split + 10))) }}>
          GC · <span style={{ color: TEAL }}>LONG</span> · Liquidity Sweep Reversal
        </div>
        {whyT > 0 && f < C.split + 10 ? (
          <div style={{ position: 'absolute', right: 160, top: 300, fontFamily: T.serif, fontStyle: 'italic', fontSize: 150, color: T.heat, opacity: 1 - HOUSE(prog(f, C.split, C.split + 10)) }}>{resolveText('    ', 'why?', whyT, 'why', f)}</div>
        ) : null}
        {words.map(([w, o]) =>
          o > 0.002 ? (
            <div key={w} style={{ position: 'absolute', left: 120, bottom: 110, fontFamily: T.serif, fontStyle: 'italic', fontSize: 72, color: T.mineral, opacity: o, clipPath: `inset(0 ${(1 - o) * 100}% -20% 0)`, textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
              {w}
            </div>
          ) : null
        )}
        <div style={{ position: 'absolute', left: 0, bottom: 44, whiteSpace: 'nowrap', ...rec(1, 0, 500), fontSize: 24, color: 'rgba(242,239,228,0.3)', transform: `translateX(${-((f * (f < C.split ? 7 : 2)) % 1500)}px)` }}>{TICKER.repeat(6)}</div>
      </AbsoluteFill>
      <Flash a={f >= C.split ? 0.16 * Math.exp(-(f - C.split) / 5) : 0} color="62,230,180" />
      <Flash a={f >= C.stamp ? 0.06 * Math.exp(-(f - C.stamp) / 4) : 0} color="255,87,56" />
      <EndCard g={g} index="08 / DECISION INTERFACES" title="Meridian" line="Conviction is useful when its ingredients stay visible." accent={TEAL} from={C.end} />
      <Vignette s={0.6} />
      <Grain />
      <Audio src={staticFile('audio/meridian_mix.wav')} />
    </AbsoluteFill>
  );
};
