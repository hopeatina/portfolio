import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Vignette } from '../lib/Frame';
import { Cam, Key, keyedCamera, v3, vlerp } from '../lib/space';
import { Blur, Box, Fog, Plane } from '../lib/World';
import cues from '../data/cues_openclaw.json';

/**
 * ORGX × OPENCLAW v2: "The lobster that forgot."
 * A diorama, one camera. Frame 0: OpenClaw's pixel lobster (the canonical
 * sprite, extruded into voxels) wakes in its terminal cave: "Who do I work
 * for?" Every downbeat is a new morning and a new session with no context,
 * and the day counter flips faster. On the drop OrgX's island rises across
 * the water and a bridge (/orgx/mcp, one local bridge) builds plank by plank
 * on the hats; the goal, the constraint and the decision cross it. Day 5 the
 * lobster wakes and knows. The Wi-Fi dies mid-task: events stack in the
 * SQLite outbox and replay across the bridge on reconnect. The camera pulls
 * back: the diorama is one card inside the real OrgX Live dashboard.
 * Illustrative inventory (labelled). Rewatch: the terminal's session number
 * never resets after the bridge; the outbox holds exactly the events that
 * replay; the lobster's bubble shrinks each day until Day 5.
 */
const g = GRIDS.openclaw;
const C = cues.cue;
const D = C.drop;
const RED = '#ff4f40';
const LIME = T.signal;
const FOG: Fog = { near: 2200, far: 7000 };

// OpenClaw's canonical pixel lobster (docs/assets/pixel-lobster.svg, via BrandLogo.tsx)
const BODY = 'M5 3h6v1H5zM4 4h8v1H4zM3 5h10v3H3zM4 8h8v1H4zM5 9h6v1H5zm0 3h6v1H5zm1 1h4v1H6z';
const CLAWS = 'M1 6h2v1H1zm1-1h1v1H2zm0 2h1v1H2zm11-1h2v1h-2zm0-1h1v1h-1zm0 2h1v1h-1z';
const OUTLINE = 'M1 5h1v3H1zm1-1h1v1H2zm0 4h1v1H2zm1-5h1v1H3zm0 6h1v1H3zm1-7h1v1H4zm0 8h1v1H4zm1-8h6v1H5zm6 0h1v1h-1zm1 1h1v1h-1zm0 6h1v1h-1zm1-5h1v1h-1zm0 4h1v1h-1zm1-3h1v3h-1zM5 11h6v1H5zm-1 1h1v1H4zm7 0h1v1h-1zm-8 1h1v1H3zm9 0h1v1h-1zM5 14h6v1H5z';
const SPRITE = 272;

const Sprite: React.FC<{ shade: number; blink: boolean; claw: number; face: boolean }> = ({ shade, blink, claw, face }) => (
  <svg width={SPRITE} height={SPRITE} viewBox="0 0 16 16" shapeRendering="crispEdges" style={{ filter: `brightness(${shade})` }}>
    <path fill="#3a0a0d" d={OUTLINE} />
    <path fill={RED} d={BODY} />
    <g transform={`translate(0 ${-claw})`}>
      <path fill="#ff775f" d={CLAWS} />
    </g>
    {face ? (
      blink ? (
        <path fill="#081016" d="M6 5h1v0.4H6zm3 0h1v0.4H9z" />
      ) : (
        <>
          <path fill="#081016" d="M6 5h1v1H6zm3 0h1v1H9z" />
          <path fill="#f5fbff" d="M6 4h1v1H6zm3 0h1v1H9z" />
        </>
      )
    ) : null}
  </svg>
);

const dayIndex = (f: number) => C.days.filter((d) => f >= d).length + (f >= C.day5 ? 1 : 0); // 0..5
const dayStart = (f: number) => {
  const all = [...C.days, C.day5];
  let s = 0;
  for (const d of all) if (f >= d) s = d;
  return s;
};
const BUBBLES = ['Who do I work for?', 'Wait… who do I work for?', 'Where was I?', '?', 'On it: the Q4 launch page.'];
const ITEMS = [
  ['GOAL', 'Ship the Q4 launch page'],
  ['CONSTRAINT', 'No spend without approval'],
  ['DECISION', 'Keep the pricing test'],
];
const A = v3(600, -12, -160); // bridge end on OpenClaw's island
const B = v3(1840, -12, -520); // bridge end on OrgX's island
const ORGX = v3(2320, 0, -640);

const KEYS: Key[] = [
  [0, 40, -170, 0, 560, 0, 2, 0], // macro: the lobster and its question
  [C.days[0] + 20, 40, -170, 0, 620, 0, 2, 0],
  [C.days[1], 30, -180, 0, 820, -10, 5, 0],
  [C.days[2], 20, -190, 0, 1000, 9, 7, 0],
  [C.days[3], 0, -200, 0, 1180, -6, 9, 0],
  [D - 12, 0, -200, 0, 1300, 0, 11, 0],
  [D + 34, 1250, -120, -380, 1900, 24, 14, 0], // the other island, the bridge
  [C.items[2] + 8, 820, -100, -250, 1800, 16, 13, 0],
  [C.day5 + 6, 60, -170, 0, 900, 8, 6, 0], // Day 5: it knows
  [C.cut + 10, 220, -140, 0, 1150, 16, 9, 0],
  [C.outbox[4], 300, -120, 0, 1100, 18, 10, 0],
  [C.reconnect + 18, 1150, -80, -330, 2300, 22, 16, 0],
  [C.replay[4] + 20, 1150, -80, -330, 2150, 20, 15, 0],
  [C.pullback, 1150, -120, -380, 2300, 14, 13, 0],
  [C.pullback + 30, 1250, -700, -1600, 6200, 0, 6, 0], // one card in the real dashboard
  [900, 1250, -700, -1600, 6400, 0, 6, 0],
];
const CAM = keyedCamera(KEYS, [
  { frames: C.days, tau: 5, punch: 0.03, px: 6 },
  { frames: [D], tau: 6, punch: 0.05, px: 12 },
  { frames: C.planks, tau: 3, punch: 0.01, px: 3 },
  { frames: [C.cut], tau: 4, punch: 0.02, px: 14 },
]);

const Terminal: React.FC<{ f: number }> = ({ f }) => {
  const day = dayIndex(f);
  const since = f - dayStart(f);
  const offline = f >= C.cut && f < C.reconnect;
  const queued = C.outbox.filter((o) => f >= o).length;
  const replayed = C.replay.filter((r) => f >= r).length;
  const lines: [string, string][] =
    day === 0
      ? [['$ openclaw', T.mineral2]]
      : day < 5
        ? [
            ['$ openclaw', T.mineral2],
            [`› session #${day} started`, T.mineral],
            ['› context: (none)', RED],
            ['› who do I work for?', T.mineral3],
          ]
        : [
            ['$ openclaw', T.mineral2],
            ['› session #5 started', T.mineral],
            ['› context: OrgX · 3 items', LIME],
            ['› goal: Ship the Q4 launch page', T.mineral],
            offline ? [`› orgx offline · ${queued} queued to outbox`, T.ochre] : f >= C.reconnect ? [`› orgx online · replayed ${replayed}/5`, LIME] : ['› working…', T.mineral2],
          ];
  const shown = Math.min(lines.length, Math.floor(since / 5) + 1);
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: 22, background: '#0b0d0f', boxShadow: 'inset 0 0 0 2px rgba(242,239,228,0.12)', padding: '26px 34px', ...rec(1, 0, 450), fontSize: 30, lineHeight: 1.55 }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <span key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c }} />
        ))}
        <span style={{ marginLeft: 16, fontSize: 18, color: T.mineral3 }}>openclaw — ~/work</span>
      </div>
      {lines.slice(0, shown).map(([t, c], i) => (
        <div key={i} style={{ color: c, whiteSpace: 'nowrap' }}>
          {t}
          {i === shown - 1 && Math.floor(f / 18) % 2 === 0 ? <span style={{ color: T.mineral }}>▌</span> : null}
        </div>
      ))}
    </div>
  );
};

const World: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const day = dayIndex(f);
  const since = f - dayStart(f);
  const jump = day > 0 && since < 18 ? Math.sin(Math.PI * clamp(since / 18)) * 60 : 0;
  const blink = Math.floor(f / 7) % 23 === 0 || (day > 0 && since > 4 && since < 8);
  const claw = f >= C.day5 ? (Math.floor(f / 10) % 2) * 0.6 : 0;
  const bubbleT = day > 0 ? settle(prog(since, 10, 20), 1.1) * (day < 5 ? 1 - HOUSE(prog(since, 70, 82)) : 1 - HOUSE(prog(f, C.cut - 6, C.cut + 4))) : f < 12 ? 1 : 0;
  const bubble = day === 0 ? BUBBLES[0] : BUBBLES[day - 1];
  const islandUp = HOUSE(prog(f, D - 2, D + 28));
  const offline = f >= C.cut && f < C.reconnect;
  const dash = HOUSE(prog(f, C.pullback + 4, C.pullback + 30));
  const plankAt = (i: number) => vlerp(A, B, (i + 0.5) / C.planks.length);
  return (
    <>
      {/* the real OrgX Live dashboard, behind everything: revealed on the pull-back */}
      <Plane cam={cam} c={v3(1250, -700, -4200)} w={5760} h={3600} opacity={dash} z={-400000}>
        <Img src={staticFile('img/full-dashboard.png')} style={{ width: 5760, height: 3600, filter: 'brightness(1)' }} />
      </Plane>
      {/* the water between the islands */}
      <Plane cam={cam} c={v3(1100, 40, -500)} U={v3(1, 0, 0)} V={v3(0, 0, 1)} w={6000} h={3400} z={-390000}>
        <div style={{ position: 'absolute', inset: 0, background: '#061016', backgroundImage: 'linear-gradient(rgba(72,199,255,0.07) 3px, transparent 3px)', backgroundSize: '100% 120px', backgroundPosition: `0 ${(f * 1.5) % 120}px` }} />
      </Plane>
      {/* OpenClaw's island + its cave */}
      <Box cam={cam} c={v3(0, 70, 0)} size={[1150, 140, 900]} color="#1d1512" fog={FOG} top={<div style={{ position: 'absolute', inset: 0, background: '#2a1e18', backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.25) 2px, transparent 2px), linear-gradient(rgba(0,0,0,0.25) 2px, transparent 2px)', backgroundSize: '50px 50px' }} />} />
      <Plane cam={cam} c={v3(-40, -330, -380)} w={900} h={540} fog={FOG}>
        <Terminal f={f} />
      </Plane>
      {/* the lobster: the canonical sprite, extruded into voxels */}
      {[3, 2, 1, 0].map((k) => (
        <Plane key={k} cam={cam} c={v3(40, -SPRITE / 2 + 12 - jump, 90 - k * 7)} w={SPRITE} h={SPRITE} z={k === 0 ? 5 : -k}>
          <Sprite shade={k === 0 ? 1 : 0.5 - k * 0.08} blink={blink} claw={claw} face={k === 0} />
        </Plane>
      ))}
      {bubbleT > 0.01 ? (
        <Plane cam={cam} c={v3(360, -330 - jump * 0.5, 110)} w={560} h={92} opacity={clamp(bubbleT * 2)} z={10}>
          <div style={{ position: 'absolute', left: 0, bottom: 0, transform: `scale(${mix(0.6, 1, clamp(bubbleT))})`, transformOrigin: '0% 100%', padding: '18px 26px', background: day === 5 ? LIME : T.mineral, color: T.carbon, ...rec(1, 0, 800), fontSize: 32, boxShadow: `7px 7px 0 ${day === 5 ? '#29401a' : '#3a0a0d'}`, whiteSpace: 'nowrap' }}>
            {bubble}
          </div>
        </Plane>
      ) : null}
      {/* the inventory: what crossed the bridge (illustrative) */}
      {ITEMS.map(([k, v], i) => {
        const at = C.items[i];
        if (f < at - 26) return null;
        const t = TRAVEL(prog(f, at - 26, at));
        const home = v3(-450, -30 - i * 108, 320);
        const p = t < 1 ? vlerp(vlerp(B, A, t), home, clamp((t - 0.7) / 0.3)) : home;
        const lift = Math.sin(Math.PI * t) * -140;
        return (
          <Plane key={k} cam={cam} c={v3(p.x, p.y - 60 + lift, p.z)} w={400} h={104} fog={FOG} z={8}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 14, background: '#10160b', boxShadow: `inset 0 0 0 2px ${LIME}`, padding: '14px 20px' }}>
              <div style={{ ...rec(1, 0, 700), fontSize: 16, letterSpacing: '0.16em', color: LIME }}>{k}</div>
              <div style={{ ...rec(0.2, 0, 600), fontSize: 25, color: T.mineral, marginTop: 6, whiteSpace: 'nowrap' }}>{v}</div>
            </div>
          </Plane>
        );
      })}
      {/* OrgX's island */}
      <Box cam={cam} c={v3(ORGX.x, 70 + 900 * (1 - islandUp), ORGX.z)} size={[900, 140, 780]} color="#10140b" fog={FOG} edge="rgba(183,243,74,0.5)" top={<div style={{ position: 'absolute', inset: 0, background: '#141b0e', boxShadow: `inset 0 0 0 3px ${LIME}` }} />} />
      <Plane cam={cam} c={v3(ORGX.x, -300 + 900 * (1 - islandUp), ORGX.z - 200)} w={460} h={460} fog={FOG} opacity={islandUp}>
        <Img src={staticFile('img/orgx-logo.png')} style={{ width: 460, height: 460 }} />
      </Plane>
      {/* the bridge: one plank per hat */}
      {C.planks.map((pf, i) => {
        if (f < pf - 8) return null;
        const t = settle(prog(f, pf - 8, pf), 1.2);
        const p = plankAt(i);
        const broken = offline && i === 3;
        return (
          <Box key={i} cam={cam} c={v3(p.x, p.y - 300 * (1 - t), p.z)} size={[170, 22, 200]} color={offline ? '#2a2a26' : '#3a4a22'} fog={FOG} opacity={broken ? 0.15 : clamp(t * 2)} edge={offline ? 'rgba(242,239,228,0.12)' : 'rgba(183,243,74,0.55)'} />
        );
      })}
      {f >= C.planks[3] ? (
        <Plane cam={cam} c={v3((A.x + B.x) / 2, -150, (A.z + B.z) / 2)} w={420} h={60} fog={FOG} opacity={HOUSE(prog(f, C.planks[3], C.planks[3] + 12))}>
          <div style={{ ...rec(1, 0, 650), fontSize: 26, color: offline ? RED : LIME, textAlign: 'center', whiteSpace: 'nowrap' }}>{offline ? '✕ offline' : '/orgx/mcp · local bridge'}</div>
        </Plane>
      ) : null}
      {/* the outbox: SQLite holds what the outage would have lost */}
      {C.outbox.map((of, i) => {
        if (f < of - 6) return null;
        const drop = settle(prog(f, of - 6, of), 1.0);
        const r = C.replay[i];
        const fly = TRAVEL(prog(f, r - 12, r + 6));
        const home = v3(420, -26 - i * 44, 260);
        const p = fly > 0 ? vlerp(home, v3(ORGX.x - 150, -30 - i * 20, ORGX.z + 150), fly) : v3(home.x, home.y - 200 * (1 - drop), home.z);
        const arc = Math.sin(Math.PI * fly) * -260;
        return <Box key={i} cam={cam} c={v3(p.x, p.y + arc, p.z)} size={[150, 38, 110]} color={fly >= 1 ? '#1b2410' : '#2b230f'} fog={FOG} edge={fly >= 1 ? 'rgba(183,243,74,0.7)' : 'rgba(217,166,46,0.7)'} opacity={1 - 0.6 * clamp((f - r - 20) / 20)} />;
      })}
      {f >= C.outbox[0] - 4 ? (
        <Plane cam={cam} c={v3(420, 40, 380)} U={v3(1, 0, 0)} V={v3(0, 0, 1)} w={320} h={60} fog={FOG}>
          <div style={{ ...rec(1, 0, 650), fontSize: 22, letterSpacing: '0.14em', color: T.ochre, textAlign: 'center' }}>OUTBOX · SQLITE</div>
        </Plane>
      ) : null}
    </>
  );
};

export const OpenClaw: React.FC = () => {
  const f = useCurrentFrame();
  const cam = CAM.at(f);
  const day = dayIndex(f);
  const since = f - dayStart(f);
  const endDim = HOUSE(prog(f, C.end - 10, C.end + 16));
  const dawn = day > 0 ? Math.exp(-since / 40) : 0;
  const flip = day > 0 ? HOUSE(prog(since, 0, 10)) : HOUSE(prog(f, 4, 20));
  const wifi = f >= C.day5 && f < C.pullback;
  const offline = f >= C.cut && f < C.reconnect;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 90% 70% at 30% 20%, rgba(255,140,60,${0.22 * dawn}), rgba(0,0,0,0) 70%), #05070a`, overflow: 'hidden' }}>
      <Blur
        ranges={[
          [D - 4, D + 36, 10],
          [C.items[2] + 8, C.day5 + 8, 8],
          [C.reconnect - 2, C.reconnect + 20, 8],
          [C.pullback, C.pullback + 32, 10],
        ]}
      >
        <AbsoluteFill style={{ filter: `brightness(${1 - 0.72 * endDim}) blur(${5 * endDim}px)` }}>
          <World f={f} cam={cam} />
        </AbsoluteFill>
      </Blur>
      <AbsoluteFill style={{ opacity: 1 - endDim }}>
        <div style={{ position: 'absolute', left: 120, top: 88, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.2em', color: RED }}>ORGX × OPENCLAW · CONTINUITY PLUGIN</div>
        <div style={{ position: 'absolute', left: 120, top: 124, fontFamily: T.serif, fontSize: 104, lineHeight: 1, color: day === 5 ? LIME : T.mineral, clipPath: `inset(0 ${(1 - flip) * 100}% -20% 0)` }}>
          {day === 0 ? 'Day 1' : `Day ${day}`}
          {day === 5 ? <span style={{ fontStyle: 'italic', fontSize: 64, color: T.mineral2 }}> · it remembers.</span> : null}
        </div>
        {wifi ? (
          <div style={{ position: 'absolute', right: 120, top: 96, display: 'flex', alignItems: 'center', gap: 14, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.14em', color: offline ? RED : LIME }}>
            <svg width={34} height={26} viewBox="0 0 24 18">
              <path d="M1 6a16 16 0 0 1 22 0M4.5 9.5a11 11 0 0 1 15 0M8 13a6 6 0 0 1 8 0" stroke={offline ? 'rgba(255,79,64,0.35)' : LIME} strokeWidth={2.2} fill="none" strokeLinecap="round" />
              <circle cx={12} cy={16} r={1.6} fill={offline ? RED : LIME} />
              {offline ? <path d="M3 1l18 16" stroke={RED} strokeWidth={2.4} strokeLinecap="round" /> : null}
            </svg>
            {offline ? 'OFFLINE · NOTHING LOST' : 'ONLINE'}
          </div>
        ) : null}
        {f >= D + 30 && f < C.day5 ? (
          <div style={{ position: 'absolute', left: 120, bottom: 104, fontFamily: T.serif, fontStyle: 'italic', fontSize: 70, color: T.mineral, opacity: HOUSE(prog(f, D + 30, D + 44)) }}>OrgX hands it the company.</div>
        ) : null}
        {f >= C.pullback + 26 ? (
          <div style={{ position: 'absolute', left: 120, bottom: 104, fontFamily: T.serif, fontStyle: 'italic', fontSize: 70, color: T.mineral, opacity: HOUSE(prog(f, C.pullback + 26, C.pullback + 40)) }}>OpenClaw stays OpenClaw.</div>
        ) : null}
        <div style={{ position: 'absolute', right: 120, bottom: 60, ...rec(1, 0, 450), fontSize: 15, letterSpacing: '0.14em', color: T.mineral3, opacity: HOUSE(prog(f, C.items[0], C.items[0] + 14)) }}>INVENTORY ILLUSTRATIVE</div>
      </AbsoluteFill>
      <Flash a={f >= D ? 0.14 * Math.exp(-(f - D) / 5) : 0} color="183,243,74" />
      <Flash a={f >= C.day5 ? 0.06 * Math.exp(-(f - C.day5) / 6) : 0} color="255,170,90" />
      <EndCard g={g} index="04 / CONTINUITY PLUGIN" title="OrgX × OpenClaw" line="The company's memory, carried into the host." accent={RED} from={C.end} />
      <Vignette s={0.6} />
      <Grain />
      <Audio src={staticFile('audio/openclaw_mix.wav')} />
    </AbsoluteFill>
  );
};
