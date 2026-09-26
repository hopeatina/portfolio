import React from 'react';
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';
import { Cam, Key, X, Y, edit, spinAbout, v3, vlerp } from '../lib/space';
import { Blur, Box, DofCtx, Fog, Plane } from '../lib/World';
import { Bokeh, Glow, Grade, Letterbox } from '../lib/Env';
import { BrandEnd } from '../lib/BrandEnd';
import cues from '../data/cues_meridian.json';

/**
 * MERIDIAN v3: "The score is not the reason."
 * A navy trading desk at night, three monitors, the city in gold. Surface: the
 * conviction score on the real signal card, 84, and a cursor creeping toward
 * BUY. The pressure is edited like a thriller: tele inserts on the snares, a
 * Dutch tilt, the digit filling the frame, "why?" typed beside it. Drop: the
 * 84 lifts out of the screen into the room and explodes into its ingredients
 * (each slice's height is its weight). Reality: the camera walks the stack as
 * each piece of evidence resolves; the concern the score was hiding rises last,
 * in red (24 + 21 + 26 + 9 + 12 − 8 = 84). The plan lands on the second
 * monitor with the real preview values, then the honest stamp: live execution
 * disabled. Demo values, labelled.
 */
const g = GRIDS.meridian;
const C = cues.cue;
const GOLD = '#e6b85c';
const NAVY = '#1e3a5f';
const BLUE = '#1e40af';
const SERIF = 'Newsreader, Georgia, serif';
const SANS = 'system-ui, -apple-system, Helvetica Neue, sans-serif';
const FOG: Fog = { near: 3200, far: 11000 };
const STACK = [
  { k: 'Regime', v: 24, ev: 'Range-bound regime, 3 sessions' },
  { k: 'Positioning', v: 21, ev: 'Crowded shorts into support' },
  { k: 'Orderflow', v: 26, ev: 'Liquidity swept below 2280' },
  { k: 'Calendar', v: 9, ev: 'No tier-1 data before entry' },
  { k: 'History', v: 12, ev: '7 of 10 similar setups resolved up' },
];
const CONCERN = { k: 'Concern', v: -8, ev: 'Dollar strength into the close' };
const NW = 1300;
const NH = 1000;
const G0 = 148;
const G1 = 754;
const TOTAL = STACK.reduce((a, s) => a + s.v, 0);
const sliceY = STACK.map((_, i) => G0 + ((G1 - G0) * STACK.slice(0, i).reduce((a, s) => a + s.v, 0)) / TOTAL);
const sliceH = STACK.map((s) => ((G1 - G0) * s.v) / TOTAL);

// the desk: main monitor centre, and where the 84 sits on it
const MON = v3(0, -760, -700);
const SW = 1600;
const SH = 900;
const onScreen = (px: number, py: number) => v3(MON.x - SW / 2 + px, MON.y - SH / 2 + py, MON.z + 2);
const NUM_ON = onScreen(470, 500);
const NUM_S = 0.46;
const BUY = onScreen(1330, 790);
const BASE = v3(-200, -950, -120); // the exploded stack, floating in front of the monitors
const splitY = (i: number) => BASE.y + (i - 2) * 250;
const RMON = v3(1780, -740, -420);
const RU = spinAbout(X, Y, -0.45);
const LMON = v3(-1780, -740, -420);
const LU = spinAbout(X, Y, 0.45);

const EDIT = edit([
  { name: 'monitor', from: 0, keys: [[0, MON.x, MON.y, MON.z, 4100, 5, 2, 0, 85], [C.snares[0], MON.x - 80, MON.y + 20, MON.z, 3500, 3, 2, 0, 85]] },
  { name: 'num', from: C.snares[0], keys: [[C.snares[0], NUM_ON.x, NUM_ON.y, MON.z, 2100, 2, 0, 0, 135], [C.snares[1], NUM_ON.x, NUM_ON.y, MON.z, 1900, 2, 0, 0, 135]] },
  { name: 'buy', from: C.snares[1], keys: [[C.snares[1], BUY.x - 100, BUY.y, MON.z, 1900, -6, 0, 0, 135], [C.snares[2], BUY.x - 60, BUY.y, MON.z, 1700, -6, 0, 0, 135]] },
  { name: 'wide', from: C.snares[2], keys: [[C.snares[2], 0, -620, -600, 4300, -10, 7, 0, 24], [C.snares[3], 0, -640, -620, 3900, -6, 6, 0, 24]], hand: { px: 4, roll: 0.3 } },
  { name: 'dutch', from: C.snares[3], keys: [[C.snares[3], NUM_ON.x + 160, NUM_ON.y, MON.z, 2300, 8, 1, 9, 85], [C.snares[4], NUM_ON.x + 200, NUM_ON.y, MON.z, 2000, 10, 1, 11, 85]] },
  { name: 'hover', from: C.snares[4], keys: [[C.snares[4], BUY.x - 40, BUY.y, MON.z, 1500, -8, 0, -7, 135], [C.snares[5], BUY.x - 20, BUY.y, MON.z, 1350, -8, 0, -8, 135]], hand: { px: 3, roll: 0.4 } },
  { name: 'digit', from: C.snares[5], keys: [[C.snares[5], NUM_ON.x + 60, NUM_ON.y - 60, MON.z, 1250, 0, 0, 0, 135], [C.drop, NUM_ON.x + 60, NUM_ON.y - 60, MON.z, 1050, 0, 0, 3, 135]] },
  { name: 'lift', from: C.drop, keys: [[C.drop, NUM_ON.x, NUM_ON.y, MON.z, 2200, 0, 0, 0, 50], [C.split + 16, BASE.x + 350, BASE.y + 40, BASE.z, 3600, 22, 6, 0, 35], [C.evidence[0] - 1, BASE.x + 400, BASE.y, BASE.z, 3300, 22, 6, 0, 35]], kicks: [{ frames: [C.split], tau: 6, punch: 0.05, px: 12 }] },
  {
    name: 'walk',
    from: C.evidence[0],
    keys: [
      [C.evidence[0], BASE.x + 600, splitY(0), BASE.z, 1700, 22, 4, 0, 35],
      [C.evidence[1] + 8, BASE.x + 600, splitY(1), BASE.z, 1700, 20, 3, 0, 35],
      [C.evidence[2] + 8, BASE.x + 600, splitY(2), BASE.z, 1700, 18, 2, 0, 35],
      [C.evidence[3] + 8, BASE.x + 600, splitY(3), BASE.z, 1700, 16, 1, 0, 35],
      [C.evidence[4] + 8, BASE.x + 600, splitY(4), BASE.z, 1750, 14, 0, 0, 35],
      [C.evidence[5] + 12, BASE.x + 600, splitY(5), BASE.z, 1850, 12, -1, 0, 35],
      [C.plan - 12, BASE.x + 300, BASE.y + 100, BASE.z, 3000, 10, 2, 0, 35],
    ],
    kicks: [{ frames: C.evidence, tau: 4, punch: 0.012, px: 3 }],
  },
  { name: 'plan', from: C.plan - 12, keys: [[C.plan - 12, RMON.x, RMON.y, RMON.z, 2400, -26, 1, 0, 50], [C.stamp + 14, RMON.x, RMON.y, RMON.z, 1900, -26, 1, 0, 50]], kicks: [{ frames: [C.stamp], tau: 4, punch: 0.03, px: 8 }] },
  { name: 'pull', from: C.pullback, keys: [[C.pullback, RMON.x, RMON.y, RMON.z, 1900, -26, 1, 0, 50], [C.end, 0, -700, -500, 4600, -6, 6, 0, 24]] },
]);

const Signal: React.FC<{ f: number }> = ({ f }) => {
  const lifted = f >= C.drop;
  const cursor = HOUSE(prog(f, 20, C.hover));
  const whyT = prog(f, C.why, C.why + 16);
  const pressed = false;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #0b1422, #0a1830)', fontFamily: SANS, color: '#eef2f8', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 40px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, fontWeight: 700, letterSpacing: '0.02em' }}>
          <span style={{ width: 16, height: 16, borderRadius: 8, background: GOLD }} /> MERIDIAN
        </div>
        <div style={{ ...rec(1, 0, 600), fontSize: 18, letterSpacing: '0.16em', color: 'rgba(238,242,248,0.5)' }}>DEMO VALUES · NOT A TRADING RECORD</div>
      </div>
      <div style={{ position: 'absolute', left: 60, top: 130, fontSize: 36, color: 'rgba(238,242,248,0.8)' }}>
        GC · <span style={{ color: '#34d399', fontWeight: 700 }}>LONG</span> · Liquidity Sweep Reversal
      </div>
      <div style={{ position: 'absolute', left: 60, top: 170, fontSize: 18, ...rec(1, 0, 600), letterSpacing: '0.14em', color: GOLD }}>CONVICTION</div>
      {!lifted ? (
        <div style={{ position: 'absolute', left: 470 - NW * NUM_S / 2, top: 500 - (NH * NUM_S) / 2, width: NW * NUM_S, height: NH * NUM_S, fontFamily: SERIF, fontSize: 1000 * NUM_S, lineHeight: 1, textAlign: 'center', color: '#f5f1e6' }}>84</div>
      ) : (
        <div style={{ position: 'absolute', left: 470 - 260, top: 290, width: 520, height: 420, borderRadius: 20, border: '4px dashed rgba(230,184,92,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', ...rec(1, 0, 600), fontSize: 26, color: GOLD, letterSpacing: '0.1em' }}>WHY 84?</div>
      )}
      {whyT > 0 && !lifted ? <div style={{ position: 'absolute', left: 780, top: 360, fontFamily: SERIF, fontStyle: 'italic', fontSize: 130, color: '#ff6b52' }}>{resolveText('    ', 'why?', whyT, 'why', f)}</div> : null}
      {/* a sparkline for texture */}
      <svg width={560} height={200} style={{ position: 'absolute', right: 60, top: 140 }}>
        <polyline points={new Array(40).fill(0).map((_, i) => `${i * 14},${120 - Math.sin(i / 4) * 40 - i * 1.5 + random(`sp${i}`) * 16}`).join(' ')} stroke={GOLD} strokeWidth={4} fill="none" />
      </svg>
      <div style={{ position: 'absolute', right: 60, bottom: 70, width: 300, height: 110, borderRadius: 18, background: lifted ? 'rgba(255,255,255,0.1)' : GOLD, color: lifted ? 'rgba(255,255,255,0.4)' : '#1b1405', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46, fontWeight: 800, transform: `scale(${pressed ? 0.95 : 1})` }}>BUY</div>
      {!lifted ? (
        <svg width={60} height={60} viewBox="0 0 24 24" style={{ position: 'absolute', left: mix(1600, 1390, cursor), top: mix(900, 800, cursor) }}>
          <path d="M3 2l7 19 3-8 8-3z" fill="#fff" stroke="#000" strokeWidth={1} />
        </svg>
      ) : null}
    </div>
  );
};

const PlanScreen: React.FC<{ f: number }> = ({ f }) => {
  const planT = HOUSE(prog(f, C.plan - 6, C.plan + 16));
  const stampT = settle(prog(f, C.stamp - 4, C.stamp + 6), 1.4);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#08101c' }}>
      <Img src={staticFile('img/public-landing.png')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 1 - planT }} />
      <div style={{ position: 'absolute', inset: 0, padding: '46px 56px', opacity: planT, fontFamily: SANS, color: '#eef2f8' }}>
        <div style={{ ...rec(1, 0, 650), fontSize: 22, letterSpacing: '0.16em', color: GOLD, marginBottom: 24 }}>GC · LONG · TRADE PLAN · STRUCTURED</div>
        {[
          ['Entry', 'Limit @ 2285'],
          ['Stop', '2271'],
          ['Target', '2310'],
          ['Size', '$4,200'],
        ].map(([k, v], i) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 50, padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', opacity: HOUSE(prog(f, C.plan + i * 5, C.plan + 12 + i * 5)) }}>
            <span style={{ color: 'rgba(238,242,248,0.55)' }}>{k}</span>
            <span style={{ fontWeight: 700 }}>{v}</span>
          </div>
        ))}
        {stampT > 0.01 ? <div style={{ marginTop: 34, padding: '18px 20px', border: '6px solid #ff5738', color: '#ff5738', ...rec(1, 0, 800), fontSize: 40, letterSpacing: '0.12em', textAlign: 'center', transform: `rotate(-4deg) scale(${stampT})` }}>LIVE EXECUTION: DISABLED</div> : null}
      </div>
    </div>
  );
};

const Slice: React.FC<{ y0: number; shade: number; glow: number }> = ({ y0, shade, glow }) => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: 0, top: -y0, width: NW, height: NH, fontFamily: SERIF, fontSize: 1000, lineHeight: 1, textAlign: 'center', color: '#f5f1e6', filter: `brightness(${shade})`, textShadow: glow > 0 ? `0 0 ${60 * glow}px rgba(230,184,92,${0.8 * glow})` : 'none' }}>84</div>
  </div>
);

const Ingredient: React.FC<{ k: string; v: number; ev: string; t: number; f: number }> = ({ k, v, ev, t, f }) => {
  const neg = v < 0;
  const col = neg ? '#ff6b52' : GOLD;
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: 18, background: 'rgba(8,16,30,0.95)', boxShadow: `inset 0 0 0 2px ${neg ? 'rgba(255,107,82,0.8)' : 'rgba(230,184,92,0.5)'}, 0 20px 50px rgba(0,0,0,0.5)`, padding: '22px 30px', display: 'flex', alignItems: 'center', gap: 28, fontFamily: SANS }}>
      <div style={{ fontFamily: SERIF, fontSize: 96, lineHeight: 1, color: col, width: 160 }}>{neg ? `−${-v}` : `+${v}`}</div>
      <div>
        <div style={{ ...rec(1, 0, 700), fontSize: 22, letterSpacing: '0.16em', color: col }}>{k.toUpperCase()}</div>
        <div style={{ fontSize: 36, fontWeight: 600, color: '#eef2f8', marginTop: 6, whiteSpace: 'pre' }}>{resolveText(''.padEnd(ev.length, ' '), ev, t, `m${k}`, f)}</div>
      </div>
    </div>
  );
};

const Monitor: React.FC<{ cam: Cam; c: typeof MON; U?: typeof X; w: number; h: number; children: React.ReactNode; glow?: string }> = ({ cam, c, U = X, w, h, children, glow = 'rgba(59,110,220,0.35)' }) => (
  <>
    <Plane cam={cam} c={c} U={U} V={Y} w={w + 40} h={h + 40} fog={FOG} z={-1}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: '#05080e', boxShadow: `0 0 140px ${glow}` }} />
    </Plane>
    <Plane cam={cam} c={c} U={U} V={Y} w={w} h={h} fog={FOG} z={2}>
      {children}
    </Plane>
    <Box cam={cam} c={v3(c.x, c.y + h / 2 + 200, c.z - 60)} size={[80, 400, 60]} color="#10141c" fog={FOG} />
  </>
);

const World: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const lift = TRAVEL(prog(f, C.drop, C.split));
  const split = TRAVEL(prog(f, C.split, C.split + 26));
  const concernT = TRAVEL(prog(f, C.evidence[5] - 20, C.evidence[5] + 6));
  const sumT = HOUSE(prog(f, C.plan - 30, C.plan - 10)) * (1 - HOUSE(prog(f, C.pullback, C.pullback + 10)));
  const numC = vlerp(v3(NUM_ON.x, NUM_ON.y, NUM_ON.z + 4), BASE, lift);
  const s = mix(NUM_S, 1, lift);
  return (
    <>
      {/* the city at night */}
      <Plane cam={cam} c={v3(0, -1800, -3200)} w={16000} h={7000} z={-500000}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, #050a14 0%, #0b1a33 55%, ${NAVY} 75%, #0a1426 100%)` }}>
          {new Array(140).fill(0).map((_, i) => {
            const x = random(`bx${i}`) * 16000;
            const w = 300 + random(`bw${i}`) * 700;
            const hgt = 1200 + random(`bh${i}`) * 2600;
            return (
              <div key={i} style={{ position: 'absolute', left: x, bottom: 1400, width: w, height: hgt, background: '#08111f', backgroundImage: `radial-gradient(circle, rgba(230,184,92,${0.35 + random(`bl${i}`) * 0.4}) 0 6px, transparent 7px)`, backgroundSize: `${60 + (i % 3) * 20}px ${80 + (i % 4) * 20}px` }} />
            );
          })}
        </div>
      </Plane>
      <Box cam={cam} c={v3(0, 60, -300)} size={[6200, 120, 2000]} color="#0a1322" z={-300000} top={<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #13223d, #0a1322 70%)' }} />} />
      <Monitor cam={cam} c={LMON} U={LU} w={1400} h={800}>
        <Img src={staticFile('img/signal-preview.png')} style={{ width: 1400, height: 800, objectFit: 'cover' }} />
      </Monitor>
      <Monitor cam={cam} c={MON} w={SW} h={SH} glow="rgba(230,184,92,0.25)">
        <Signal f={f} />
      </Monitor>
      <Monitor cam={cam} c={RMON} U={RU} w={1400} h={800}>
        <PlanScreen f={f} />
      </Monitor>
      {/* the 84, out of the screen and apart */}
      {f >= C.drop
        ? STACK.map((st, i) => {
            const y0 = sliceY[i];
            const h = sliceH[i];
            const home = v3(numC.x, numC.y + (-NH / 2 + y0 + h / 2) * s, numC.z);
            const apart = v3(BASE.x - 300 + Math.sin(i * 1.7) * 40, splitY(i), BASE.z + Math.cos(i * 2.3) * 120);
            const c = vlerp(home, apart, split);
            const lit = f >= C.evidence[i] ? Math.exp(-(f - C.evidence[i]) / 20) : 0;
            return [3, 2, 1, 0].map((k) => (
              <Plane key={`${i}${k}`} cam={cam} c={v3(c.x, c.y, c.z - k * 10)} U={spinAbout(X, Y, (i % 2 ? 1 : -1) * 0.14 * split)} V={Y} w={NW * s} h={(h + 1) * s} fog={FOG} z={k === 0 ? 5 : -k}>
                <div style={{ position: 'absolute', left: 0, top: 0, width: NW, height: h + 1, transform: `scale(${s})`, transformOrigin: '0 0' }}>
                  <Slice y0={y0} shade={k === 0 ? 1 : 0.3 - k * 0.06} glow={k === 0 ? lit : 0} />
                </div>
              </Plane>
            ));
          })
        : null}
      {STACK.map((st, i) => {
        const on = HOUSE(prog(f, C.split + 14 + i * 3, C.split + 30 + i * 3));
        const t = RESOLVE(prog(f, C.evidence[i], C.evidence[i] + 18));
        return (
          <Plane key={st.k} cam={cam} c={v3(BASE.x + 900, splitY(i), BASE.z + 60)} w={1060} h={180} fog={FOG} opacity={on * (1 - HOUSE(prog(f, C.plan - 12, C.plan)))} z={20}>
            <Ingredient k={st.k} v={st.v} ev={st.ev} t={t} f={f} />
          </Plane>
        );
      })}
      <Plane cam={cam} c={v3(BASE.x + 900, mix(900, splitY(5), concernT), BASE.z + 60)} w={1060} h={180} fog={FOG} opacity={clamp(concernT * 2) * (1 - HOUSE(prog(f, C.plan - 12, C.plan)))} z={20}>
        <Ingredient k={CONCERN.k} v={CONCERN.v} ev={CONCERN.ev} t={RESOLVE(prog(f, C.evidence[5], C.evidence[5] + 18))} f={f} />
      </Plane>
      <Plane cam={cam} c={v3(BASE.x + 700, splitY(5) + 200, BASE.z + 60)} w={1300} h={90} opacity={sumT}>
        <div style={{ fontFamily: SERIF, fontSize: 64, color: '#eef2f8', textAlign: 'center', whiteSpace: 'nowrap' }}>
          24 + 21 + 26 + 9 + 12 <span style={{ color: '#ff6b52' }}>− 8</span> = <span style={{ color: GOLD }}>84</span>
        </div>
      </Plane>
    </>
  );
};

export const Meridian: React.FC = () => {
  const f = useCurrentFrame();
  const { cam, shot, focus } = EDIT.at(f);
  const tele = ['num', 'buy', 'hover', 'digit', 'monitor', 'dutch'].includes(shot.name);
  const dof = { focus, aperture: tele ? 1.0 : 0.35 };
  const words: [string, number][] = [
    ['A confidence score can hide the decision.', HOUSE(prog(f, 190, 204)) * (1 - HOUSE(prog(f, C.snares[3] - 8, C.snares[3])))],
    ['Conviction, with its ingredients showing.', HOUSE(prog(f, C.split + 30, C.split + 44)) * (1 - HOUSE(prog(f, C.plan - 14, C.plan - 4)))],
  ];
  return (
    <AbsoluteFill style={{ background: '#050a14', overflow: 'hidden' }}>
      <Blur ranges={[[C.drop, C.split + 26, 8], [C.plan - 14, C.plan + 8, 6], [C.pullback, C.end, 6]]}>
        <DofCtx.Provider value={dof}>
          <AbsoluteFill style={{ isolation: 'isolate' }}>
            <World f={f} cam={cam} />
          </AbsoluteFill>
        </DofCtx.Provider>
      </Blur>
      <Bokeh n={30} seed="md" colors={['rgba(230,184,92,0.55)', 'rgba(120,160,255,0.35)']} area={[0, 0, 1920, 620]} size={[8, 28]} f={f} a={0.3} />
      <Glow x={960} y={560} r={1100} color="rgba(59,110,220,0.3)" a={0.5} />
      <Grade tint={BLUE} a={0.14} />
      <Letterbox t={['wide', 'dutch', 'lift', 'walk'].includes(shot.name) ? 1 : 0} />
      {f < C.end ? <div style={{ position: 'absolute', left: 120, top: 88, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.2em', color: GOLD, zIndex: 910000 }}>MERIDIAN · RESEARCH DESK · DEMO VALUES</div> : null}
      {words.map(([w, o]) =>
        o > 0.002 ? (
          <div key={w} style={{ position: 'absolute', left: 120, bottom: 110, fontFamily: SERIF, fontSize: 76, color: '#fff', opacity: o, clipPath: `inset(0 ${(1 - o) * 100}% -20% 0)`, textShadow: '0 4px 30px rgba(0,0,0,0.8)', zIndex: 910000 }}>
            {w}
          </div>
        ) : null
      )}
      <Flash a={f >= C.split ? 0.16 * Math.exp(-(f - C.split) / 5) : 0} color="230,184,92" />
      <Flash a={f >= C.stamp ? 0.08 * Math.exp(-(f - C.stamp) / 4) : 0} color="255,87,56" />
      <BrandEnd
        g={g}
        from={C.end}
        bg={`linear-gradient(135deg, ${NAVY}, ${BLUE})`}
        accent={GOLD}
        kicker="THE OPERATING SYSTEM FOR CONVICTION"
        wipe="left"
        font={SERIF}
        logo={<div style={{ fontFamily: SANS, fontSize: 170, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>Meridian</div>}
        line="Conviction is useful when its ingredients stay visible."
      />
      <Vignette s={0.55} />
      <Grain />
      <Audio src={staticFile('audio/meridian_mix.wav')} />
    </AbsoluteFill>
  );
};

