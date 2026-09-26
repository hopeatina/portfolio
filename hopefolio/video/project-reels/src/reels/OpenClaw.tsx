import React from 'react';
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { monotone } from '../lib/spline';
import { BrandEnd } from '../lib/BrandEnd';
import cues from '../data/cues_openclaw.json';

/**
 * ORGX × OPENCLAW v4: "The lobster that forgot" — then walks into the product.
 * v4: Days 1–4 accelerate (4, 2, 2 beats) so the joke tightens; after Day 5 the
 * camera dives into the lobster's terminal and the pixels resolve into the real
 * OpenClaw control UI. The lobster narrates a tour of the real screens (Overview,
 * Sessions, OrgX Live agents, Activity, Next Up vs In Progress), the Wi-Fi dies
 * inside the UI (the real "Live degraded" toast; the outbox counts on the hats),
 * replays, and we pull back out through the terminal to the island.
 * (v3 notes follow.)
 * A 2D pixel diorama with an orthographic camera snapped to whole pixels:
 * a different camera grammar from every other film. Days 1–4 are the SAME
 * locked-off frame, hard-cut on each downbeat (the joke is the repetition):
 * sunrise, the lobster pops up, its terminal starts a session with no
 * context, "Who do I work for?", shorter every morning. On the drop the
 * camera moves for the first time: a pan across the water to OrgX's island,
 * which was there all along (a lime glow on the horizon every morning), and
 * a bridge builds plank by plank on the hats. Day 5, same frame: it knows.
 * A storm kills the Wi-Fi; the SQLite outbox piles up and replays across the
 * bridge when the sun comes back. Pull back: the diorama is one card inside
 * OpenClaw's own control UI. OpenClaw stays OpenClaw.
 */
const g = GRIDS.openclaw;
const ACCEL2 = (t: number) => t * t * t;
const C = cues.cue;
const D = C.drop;
const RED = '#ff4f40';
const LIME = '#b7f34a';
const SEA = 150; // sea level (logical px)
const LOB = { x: 108, y: 132 }; // the lobster's feet
const HUT = { x: 150, y: 96 };
const ORGX_X = 600;
const BR0 = 196;
const BR1 = 548;

// OpenClaw's canonical pixel lobster (docs/assets/pixel-lobster.svg, via BrandLogo.tsx)
const BODY = 'M5 3h6v1H5zM4 4h8v1H4zM3 5h10v3H3zM4 8h8v1H4zM5 9h6v1H5zm0 3h6v1H5zm1 1h4v1H6z';
const CLAWS = 'M1 6h2v1H1zm1-1h1v1H2zm0 2h1v1H2zm11-1h2v1h-2zm0-1h1v1h-1zm0 2h1v1h-1z';
const OUTLINE = 'M1 5h1v3H1zm1-1h1v1H2zm0 4h1v1H2zm1-5h1v1H3zm0 6h1v1H3zm1-7h1v1H4zm0 8h1v1H4zm1-8h6v1H5zm6 0h1v1h-1zm1 1h1v1h-1zm0 6h1v1h-1zm1-5h1v1h-1zm0 4h1v1h-1zm1-3h1v3h-1zM5 11h6v1H5zm-1 1h1v1H4zm7 0h1v1h-1zm-8 1h1v1H3zm9 0h1v1h-1zM5 14h6v1H5z';

const Lobster: React.FC<{ blink: boolean; claw: number }> = ({ blink, claw }) => (
  <>
    <path fill="#3a0a0d" d={OUTLINE} />
    <path fill={RED} d={BODY} />
    <g transform={`translate(0 ${-claw})`}>
      <path fill="#ff775f" d={CLAWS} />
    </g>
    {blink ? (
      <path fill="#081016" d="M6 5h1v0.4H6zm3 0h1v0.4H9z" />
    ) : (
      <>
        <path fill="#081016" d="M6 5h1v1H6zm3 0h1v1H9z" />
        <path fill="#f5fbff" d="M6 4h1v1H6zm3 0h1v1H9z" />
      </>
    )}
  </>
);

const dayIndex = (f: number) => C.days.filter((d) => f >= d).length + (f >= C.day5 ? 1 : 0); // 0..5
const dayStart = (f: number) => [...C.days, C.day5].reduce((s, d) => (f >= d ? d : s), 0);
const BUBBLES = ['Who do I work for?', 'Wait… who do I work for?', 'Where was I?', '?', 'On it: the Q4 launch page.'];
const ITEMS = [
  ['GOAL', 'Ship the Q4 launch page'],
  ['CONSTRAINT', 'No spend without approval'],
  ['DECISION', 'Keep the pricing test'],
];

// the camera: [frame, centre x, centre y, view width] per shot, hard cuts between shots
type CK = [number, number, number, number];
const SHOTS: { from: number; keys: CK[]; shake?: number }[] = [
  { from: 0, keys: [[0, LOB.x + 4, LOB.y - 26, 150], [C.days[0], LOB.x + 4, LOB.y - 26, 140]] },
  { from: C.days[0], keys: [[C.days[0], 192, 108, 384], [D, 192, 108, 384]] },
  { from: D, keys: [[D, 192, 108, 384], [D + 30, 400, 100, 560], [C.items[2] + 10, 372, 100, 624], [C.day5 - 1, 372, 100, 624]] },
  { from: C.day5, keys: [[C.day5, 192, 108, 384], [C.cut, 192, 108, 384]] },
  { from: C.cut, keys: [[C.cut, 300, 104, 520], [C.reconnect, 330, 104, 560]], shake: 1.5 },
  { from: C.reconnect, keys: [[C.reconnect, 372, 100, 624], [C.pullback, 372, 100, 640]] },
];
const SHOT_CAMS = SHOTS.map((s) => [1, 2, 3].map((i) => monotone(s.keys.map((k) => k[0]), s.keys.map((k) => k[i]))));
const camAt = (f: number) => {
  let i = 0;
  SHOTS.forEach((s, k) => {
    if (f >= s.from) i = k;
  });
  const [X, Y, W] = SHOT_CAMS[i].map((ch) => ch(f));
  const j = SHOTS[i].shake ? (random(`sh${Math.floor(f / 2)}`) - 0.5) * 2 * (SHOTS[i].shake ?? 0) : 0;
  return { x: Math.round(X - W / 2 + j), y: Math.round(Y - (W * 9) / 32 + j * 0.6), w: W, h: (W * 9) / 16 };
};

const skyAt = (f: number) => {
  const day = dayIndex(f);
  const since = f - dayStart(f);
  const storm = f >= C.cut && f < C.reconnect;
  if (storm) return ['#2c3240', '#4b5363'];
  if (day === 0) return ['#1b2a4a', '#ff9a5a'];
  if (day < 5 && f < D) {
    const t = clamp(since / 60);
    return [mix2('#27345c', '#6fb8ff', t), mix2('#ff9a5a', '#cfeaff', t)];
  }
  return ['#5aa8ff', '#d7f0ff'];
};
const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const mix2 = (a: string, b: string, t: number) => {
  const A = hex(a);
  const B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`;
};

const Scene: React.FC<{ f: number }> = ({ f }) => {
  const cam = camAt(f);
  const day = dayIndex(f);
  const since = f - dayStart(f);
  const [top, bot] = skyAt(f);
  const storm = f >= C.cut && f < C.reconnect;
  const sunY = day > 0 && f < D ? mix(SEA + 10, 40, HOUSE(clamp(since / 70))) : storm ? 200 : 34;
  const jump = day > 0 && since < 18 ? Math.round(Math.sin(Math.PI * clamp(since / 18)) * 10) : 0;
  const blink = Math.floor(f / 7) % 23 === 0 || (day > 0 && since > 4 && since < 8);
  const claw = f >= C.day5 ? (Math.floor(f / 10) % 2) * 0.6 : 0;
  const rise = HOUSE(prog(f, D - 2, D + 26));
  const offline = storm;
  const replayed = C.replay.filter((r) => f >= r).length;
  return (
    <svg width={1920} height={1080} viewBox={`${cam.x} ${cam.y} ${cam.w} ${cam.h}`} shapeRendering="crispEdges" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bot} />
        </linearGradient>
      </defs>
      <rect x={-200} y={-100} width={1200} height={SEA + 100} fill="url(#sky)" />
      {/* the sun: a new one every morning */}
      <g>
        {[14, 12, 10].map((r, k) => (
          <rect key={k} x={300 - r} y={sunY - r} width={r * 2} height={r * 2} fill={k === 0 ? '#ffd166' : k === 1 ? '#ffe08a' : '#fff1c1'} opacity={storm ? 0 : 1} />
        ))}
      </g>
      {/* a lime glow on the far horizon: OrgX was there all along */}
      <rect x={ORGX_X - 90} y={SEA - 8} width={180} height={8} fill={LIME} opacity={0.35 + 0.2 * Math.sin(f / 12)} />
      {/* clouds */}
      {[0, 1, 2, 3, 4].map((k) => {
        const x = ((k * 173 + f * (storm ? 1.2 : 0.25)) % 900) - 150;
        const y = 24 + k * 13;
        const c = storm ? '#1e222c' : '#ffffff';
        return (
          <g key={k} opacity={storm ? 0.95 : 0.85}>
            <rect x={x} y={y} width={46} height={8} fill={c} />
            <rect x={x + 8} y={y - 6} width={26} height={6} fill={c} />
          </g>
        );
      })}
      {/* the sea */}
      <rect x={-200} y={SEA} width={1200} height={120} fill={storm ? '#23364a' : '#1f6fb2'} />
      {new Array(60).fill(0).map((_, k) => {
        const x = ((k * 37 + f * 0.6) % 900) - 150;
        const y = SEA + 6 + (k % 6) * 9;
        return <rect key={k} x={x} y={y} width={10} height={2} fill={storm ? '#4a6580' : '#7cc4ff'} opacity={0.7} />;
      })}
      {/* OpenClaw's island + palm + the terminal hut */}
      <rect x={30} y={SEA - 12} width={170} height={16} fill="#e3c27a" />
      <rect x={42} y={SEA - 20} width={146} height={8} fill="#efd08e" />
      <rect x={60} y={SEA - 72} width={4} height={52} fill="#7a4b2a" />
      {[
        [44, -76, 22, 5],
        [62, -80, 24, 5],
        [50, -84, 26, 4],
      ].map(([x, y, w, h], k) => (
        <rect key={k} x={x} y={SEA + y} width={w} height={h} fill="#2f9e44" />
      ))}
      <rect x={HUT.x - 26} y={HUT.y} width={52} height={40} fill="#3b2a20" />
      <rect x={HUT.x - 30} y={HUT.y - 6} width={60} height={8} fill="#5a3e2b" />
      <rect x={HUT.x - 20} y={HUT.y + 6} width={40} height={24} fill="#0b0d0f" />
      {/* the lobster */}
      <g transform={`translate(${LOB.x - 16} ${LOB.y - 32 - jump}) scale(2)`}>
        <Lobster blink={blink} claw={claw} />
      </g>
      {/* inventory: what crossed the bridge */}
      {ITEMS.map((_, i) => {
        const at = C.items[i];
        if (f < at - 26) return null;
        const t = TRAVEL(prog(f, at - 26, at));
        const x = mix(BR1 - 20, 62 + i * 0, t);
        const y = mix(SEA - 12, SEA - 26 - i * 9, t) - Math.sin(Math.PI * t) * 26;
        return <rect key={i} x={x} y={y} width={16} height={8} fill={LIME} stroke="#1c2a0c" strokeWidth={1} />;
      })}
      {/* the bridge: one plank per hat */}
      {C.planks.map((pf, i) => {
        if (f < pf - 6) return null;
        const t = settle(prog(f, pf - 6, pf), 1.2);
        const x0 = mix(BR0, BR1, i / C.planks.length);
        const w = (BR1 - BR0) / C.planks.length - 2;
        const broken = offline && i === 3;
        return <rect key={i} x={x0} y={SEA - 6 - (1 - t) * 30} width={w} height={5} fill={offline ? '#6b6f78' : '#8a5a34'} opacity={broken ? 0.1 : clamp(t * 2)} />;
      })}
      {f >= C.planks[0] ? <rect x={BR0} y={SEA - 1} width={BR1 - BR0} height={2} fill={offline ? '#555' : LIME} opacity={HOUSE(prog(f, C.planks[6], C.planks[6] + 10))} /> : null}
      {/* OrgX's island, rising */}
      <g transform={`translate(0 ${Math.round((1 - rise) * 70)})`}>
        <rect x={ORGX_X - 70} y={SEA - 14} width={140} height={18} fill="#2b3a1a" />
        <rect x={ORGX_X - 60} y={SEA - 22} width={120} height={8} fill="#3d5222" />
        <rect x={ORGX_X - 34} y={SEA - 90} width={68} height={68} fill="#0b1208" />
        <image href={staticFile('img/orgx-logo.png')} x={ORGX_X - 30} y={SEA - 86} width={60} height={60} />
      </g>
      {/* the outbox: what the storm would have eaten */}
      {C.outbox.map((of, i) => {
        if (f < of - 5) return null;
        const drop = settle(prog(f, of - 5, of), 1.0);
        const r = C.replay[i];
        const fly = TRAVEL(prog(f, r - 10, r + 8));
        const x = mix(176, ORGX_X - 40 + i * 6, fly);
        const y = fly > 0 ? mix(SEA - 18 - i * 7, SEA - 30 - i * 4, fly) - Math.sin(Math.PI * fly) * 40 : mix(SEA - 60, SEA - 18 - i * 7, drop);
        return <rect key={i} x={x} y={y} width={14} height={7} fill={fly >= 1 ? LIME : '#e8a33a'} stroke="#2a1a05" strokeWidth={1} />;
      })}
      {/* the storm */}
      {storm
        ? new Array(80).fill(0).map((_, k) => {
            const x = ((k * 29 + f * 3) % 700) - 100;
            const y = ((k * 53 + f * 6) % 200) - 20;
            return <rect key={k} x={x} y={y} width={1} height={6} fill="#9fb3c8" opacity={0.6} />;
          })
        : null}
      {storm && f < C.cut + 6 ? <path d={`M${ORGX_X - 160} 0 l-10 40 l14 0 l-16 50`} stroke="#fff6c9" strokeWidth={3} fill="none" shapeRendering="geometricPrecision" /> : null}
      {replayed > 0 && f < C.pullback + 20 ? (
        <g opacity={0.55}>
          {['#ff5f5f', '#ffb14a', '#ffe35a', '#6ee06e', '#5ab0ff'].map((c, k) => (
            <path key={k} d={`M${BR0 - 10} ${SEA - 2} A ${(BR1 - BR0) / 2 + 10 - k * 3} ${120 - k * 3} 0 0 1 ${BR1 + 10} ${SEA - 2}`} stroke={c} strokeWidth={3} fill="none" pathLength={1} strokeDasharray={`${HOUSE(prog(f, C.reconnect, C.reconnect + 30))} 1`} shapeRendering="geometricPrecision" />
          ))}
        </g>
      ) : null}
    </svg>
  );
};

/** HTML overlays (crisp text) pinned to world positions of the pixel scene. */
const toScreen = (f: number, x: number, y: number) => {
  const cam = camAt(f);
  return { x: ((x - cam.x) / cam.w) * 1920, y: ((y - cam.y) / cam.h) * 1080, s: 1920 / cam.w };
};

const Overlays: React.FC<{ f: number }> = ({ f }) => {
  const day = dayIndex(f);
  const since = f - dayStart(f);
  const offline = f >= C.cut && f < C.reconnect;
  const queued = C.outbox.filter((o) => f >= o).length;
  const replayed = C.replay.filter((r) => f >= r).length;
  const hut = toScreen(f, HUT.x - 20, HUT.y + 6);
  const lob = toScreen(f, LOB.x + 14, LOB.y - 44);
  const bubbleT = day > 0 ? settle(prog(since, 8, 18), 1.1) * (day < 5 ? 1 - HOUSE(prog(since, 70, 80)) : 1 - HOUSE(prog(f, C.cut - 4, C.cut + 4))) : 1;
  const bubble = day === 0 ? BUBBLES[0] : BUBBLES[day - 1];
  const lines: [string, string][] =
    day < 5
      ? [
          [`session #${Math.max(1, day)}`, '#e6e6e6'],
          ['context: none', RED],
        ]
      : [
          ['session #5', '#e6e6e6'],
          ['context: OrgX · 3', LIME],
          [offline ? `offline · ${queued} queued` : f >= C.reconnect ? `replayed ${replayed}/5` : 'working…', offline ? '#e8a33a' : f >= C.reconnect ? LIME : '#e6e6e6'],
        ];
  const bridge = toScreen(f, (BR0 + BR1) / 2, SEA - 40);
  const outbox = toScreen(f, 183, SEA + 8);
  return (
    <>
      <div style={{ position: 'absolute', left: hut.x, top: hut.y, width: 40 * hut.s, height: 24 * hut.s, padding: 0.12 * 24 * hut.s, ...rec(1, 0, 600), fontSize: Math.max(9, 3.2 * hut.s), lineHeight: 1.25, overflow: 'hidden' }}>
        {lines.map(([t, c]) => (
          <div key={t} style={{ color: c, whiteSpace: 'nowrap' }}>
            {t}
          </div>
        ))}
      </div>
      {bubbleT > 0.02 ? (
        <div style={{ position: 'absolute', left: lob.x, top: lob.y - 60, transform: `scale(${mix(0.6, 1, clamp(bubbleT))})`, transformOrigin: '0% 100%', opacity: clamp(bubbleT * 2), padding: '16px 24px', background: day === 5 ? LIME : '#fffdf5', color: '#111', ...rec(1, 0, 800), fontSize: 36, boxShadow: `8px 8px 0 ${day === 5 ? '#2c4a10' : '#3a0a0d'}`, whiteSpace: 'nowrap' }}>{bubble}</div>
      ) : null}
      {f >= C.items[0] - 20 && f < C.pullback
        ? ITEMS.map(([k, v], i) => {
            const t = TRAVEL(prog(f, C.items[i] - 26, C.items[i]));
            if (f < C.items[i] - 26) return null;
            const p = toScreen(f, mix(BR1 - 20, 62, t), mix(SEA - 12, SEA - 26 - i * 9, t) - Math.sin(Math.PI * t) * 26);
            return (
              <div key={k} style={{ position: 'absolute', left: p.x + 16 * p.s * 0.5, top: p.y - 44, transform: 'translateX(-50%)', padding: '6px 12px', background: '#14200a', border: `3px solid ${LIME}`, ...rec(1, 0, 700), fontSize: 20, color: LIME, whiteSpace: 'nowrap', opacity: 1 - HOUSE(prog(f, C.items[i] + 14, C.items[i] + 30)) }}>
                {k} · <span style={{ color: '#fff' }}>{v}</span>
              </div>
            );
          })
        : null}
      {f >= C.planks[3] && f < C.pullback ? (
        <div style={{ position: 'absolute', left: bridge.x, top: bridge.y, transform: 'translate(-50%,-50%)', padding: '6px 14px', background: 'rgba(0,0,0,0.55)', ...rec(1, 0, 700), fontSize: 24, color: offline ? RED : LIME, whiteSpace: 'nowrap' }}>{offline ? '✕ wifi down · nothing lost' : '/orgx/mcp · one local bridge'}</div>
      ) : null}
      {f >= C.outbox[0] - 4 && f < C.reconnect + 40 ? (
        <div style={{ position: 'absolute', left: outbox.x, top: outbox.y, transform: 'translateX(-50%)', ...rec(1, 0, 700), fontSize: 20, letterSpacing: '0.12em', color: '#e8a33a', whiteSpace: 'nowrap' }}>OUTBOX · SQLITE · {queued}</div>
      ) : null}
    </>
  );
};


// ── v4: the lobster walks into the real interface
type Step = { from: number; to: number; img: string; W: number; H: number; keys: [number, number, number, number][]; ring: [number, number, number, number]; say: string; chip: string };
const STEPS: Step[] = [
  { from: C.dive, to: C.t2, img: 'oc-overview.png', W: 1440, H: 900, keys: [[C.dive, 720, 450, 1.34], [C.dive + 20, 720, 470, 1.4], [C.t2, 760, 640, 1.8]], ring: [285, 630, 1400, 710], say: 'OpenClaw stays OpenClaw.', chip: 'OPENCLAW · OVERVIEW' },
  { from: C.t2, to: C.t3, img: 'oc-sessions.png', W: 1440, H: 900, keys: [[C.t2, 860, 520, 2.3], [C.t3, 900, 540, 2.4]], ring: [285, 510, 1395, 572], say: 'My session: agent:orgx:main.', chip: 'OPENCLAW · SESSIONS' },
  { from: C.t3, to: C.t4, img: 'oc-live.png', W: 2880, H: 1800, keys: [[C.t3, 700, 800, 0.8], [C.t4, 420, 900, 1.0]], ring: [40, 150, 700, 1780], say: 'Named agents. What each one is doing.', chip: 'ORGX LIVE · INSIDE OPENCLAW' },
  { from: C.t4, to: C.t5, img: 'oc-activity.png', W: 2880, H: 1800, keys: [[C.t4, 1300, 800, 0.95], [C.t5, 1420, 950, 1.05]], ring: [760, 170, 2090, 1760], say: 'Every step, on the record.', chip: 'ORGX LIVE · ACTIVITY' },
  { from: C.t5, to: C.storm, img: 'oc-live.png', W: 2880, H: 1800, keys: [[C.t5, 2350, 700, 0.95], [C.storm, 2450, 760, 1.05]], ring: [2150, 150, 2850, 1780], say: 'Next Up stays separate from In Progress.', chip: 'ORGX LIVE · NEXT UP' },
  { from: C.storm, to: C.reconnect2, img: 'oc-mission.png', W: 2880, H: 1800, keys: [[C.storm, 1800, 420, 1.1], [C.reconnect2, 1900, 380, 1.2]], ring: [1700, 110, 2530, 310], say: 'Wi-Fi’s down. Queuing locally…', chip: 'ORGX LIVE · MISSION CONTROL' },
  { from: C.reconnect2, to: C.pull + 40, img: 'oc-mission.png', W: 2880, H: 1800, keys: [[C.reconnect2, 1440, 1000, 0.72], [C.pull + 40, 1440, 1000, 0.66]], ring: [330, 520, 2560, 1780], say: 'Back online. All 5 replayed. Nothing lost.', chip: 'ORGX LIVE · MISSION CONTROL' },
];
const stepCam = (st: Step, f: number) => {
  const ks = st.keys;
  let i = 0;
  while (i < ks.length - 2 && f >= ks[i + 1][0]) i++;
  const t = HOUSE(prog(f, ks[i][0], ks[i + 1][0]));
  return { x: mix(ks[i][1], ks[i + 1][1], t), y: mix(ks[i][2], ks[i + 1][2], t), s: mix(ks[i][3], ks[i + 1][3], t) };
};

const Tour: React.FC<{ f: number }> = ({ f }) => {
  const st = STEPS.find((q) => f >= q.from && f < q.to) ?? STEPS[STEPS.length - 1];
  const cam = stepCam(st, f);
  const since = f - st.from;
  const pix = st === STEPS[0] ? Math.max(1, Math.round(mix(24, 1, prog(f, C.dive, C.dive + 14)))) : 1;
  const ringT = HOUSE(prog(since, 6, 16));
  const storm = f >= C.storm && f < C.reconnect2;
  const queued = C.queue.filter((q) => f >= q).length;
  const replayed = C.replay2.filter((r) => f >= r).length;
  const hop = Math.exp(-((f % 12) / 3)) * 10;
  const bubbleT = settle(prog(since, 4, 14), 1.1);
  const [x0, y0, x1, y1] = st.ring;
  return (
    <AbsoluteFill style={{ background: '#0b0c0f', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: st.W, height: st.H, transformOrigin: '0 0', transform: `translate(${960 - cam.x * cam.s}px, ${540 - cam.y * cam.s}px) scale(${cam.s})`, filter: storm ? `grayscale(0.7) brightness(0.7)` : undefined }}>
        {pix > 1 ? (
          <Img src={staticFile(`img/${st.img}`)} style={{ position: 'absolute', left: 0, top: 0, width: st.W / pix, height: st.H / pix, transformOrigin: '0 0', transform: `scale(${pix})`, imageRendering: 'pixelated' }} />
        ) : (
          <Img src={staticFile(`img/${st.img}`)} style={{ position: 'absolute', left: 0, top: 0, width: st.W, height: st.H }} />
        )}
        {ringT > 0.01 ? <div style={{ position: 'absolute', left: x0 - 10, top: y0 - 10, width: x1 - x0 + 20, height: y1 - y0 + 20, border: `${6 / cam.s}px solid ${storm ? '#e8a33a' : LIME}`, boxShadow: `0 0 ${30 / cam.s}px ${storm ? '#e8a33a' : LIME}`, opacity: ringT, clipPath: `inset(0 ${(1 - ringT) * 100}% 0 0)` }} /> : null}
      </div>
      {storm ? <AbsoluteFill style={{ background: 'repeating-linear-gradient(100deg, rgba(160,190,230,0.10) 0 2px, transparent 2px 40px)', backgroundPosition: `${f * 9}px ${f * 22}px` }} /> : null}
      {/* the lobster, narrating */}
      <div style={{ position: 'absolute', left: 90, bottom: 80, display: 'flex', alignItems: 'flex-end', gap: 26, zIndex: 5 }}>
        <svg width={128} height={128} viewBox="0 0 16 16" shapeRendering="crispEdges" style={{ transform: `translateY(${-hop}px)` }}>
          <Lobster blink={f % 70 < 4} claw={Math.floor(f / 10) % 2 ? 0.6 : 0} />
        </svg>
        <div style={{ marginBottom: 70, transform: `scale(${mix(0.6, 1, clamp(bubbleT))})`, transformOrigin: '0% 100%', opacity: clamp(bubbleT * 2), padding: '18px 26px', background: storm ? '#e8a33a' : LIME, color: '#111', ...rec(1, 0, 800), fontSize: 38, boxShadow: `8px 8px 0 ${storm ? '#4a2c08' : '#2c4a10'}`, whiteSpace: 'nowrap' }}>
          {st.say}
          {storm ? <span style={{ marginLeft: 16 }}>outbox: {queued}</span> : null}
          {f >= C.reconnect2 ? <span style={{ marginLeft: 16 }}>{replayed}/5</span> : null}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 90, top: 70, ...rec(1, 0, 800), fontSize: 26, letterSpacing: '0.14em', color: '#fff', padding: '10px 16px', background: 'rgba(0,0,0,0.6)', boxShadow: `4px 4px 0 ${RED}` }}>{st.chip}</div>
      <div style={{ position: 'absolute', right: 90, top: 78, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)' }}>REAL SCREENS · ORGX PLUGIN IN OPENCLAW</div>
    </AbsoluteFill>
  );
};

export const OpenClaw: React.FC = () => {
  const f = useCurrentFrame();
  const day = dayIndex(f);
  const since = f - dayStart(f);
  const pull = HOUSE(prog(f, C.pullback, C.pullback + 26));
  const diveT = ACCEL2(prog(f, C.dive - 20, C.dive));
  const backT = HOUSE(prog(f, C.pull, C.end));
  const touring = f >= C.dive && f < C.pull;
  const term = toScreen(Math.min(f, C.dive - 1), HUT.x, HUT.y + 18);
  const flip = day > 0 ? HOUSE(prog(since, 0, 8)) : 1;
  const storm = f >= C.cut && f < C.reconnect;
  return (
    <AbsoluteFill style={{ background: '#0e1014', overflow: 'hidden' }}>
      {/* OpenClaw's own control UI: the diorama is one card inside it */}
      {pull > 0 ? <Img src={staticFile('img/oc-overview.png')} style={{ position: 'absolute', inset: 0, width: 1920, height: 1200, opacity: pull }} /> : null}
      {!touring ? (
        <AbsoluteFill style={{ transformOrigin: `${term.x}px ${term.y}px`, transform: `scale(${f < C.pull ? mix(1, 14, diveT) : mix(14, 1, backT)})`, overflow: 'hidden' }}>
          <Scene f={f < C.pull ? f : C.day5 + 30} />
          <Overlays f={f < C.pull ? f : C.day5 + 30} />
        </AbsoluteFill>
      ) : null}
      {touring ? <Tour f={f} /> : null}
      {f >= C.pull && f < C.end ? (
        <div style={{ position: 'absolute', left: 90, bottom: 90, ...rec(1, 0, 800), fontSize: 44, color: '#fff', textShadow: '4px 4px 0 #14200a', opacity: HOUSE(prog(f, C.pull + 14, C.pull + 24)) }}>Same lobster. Now it knows the company.</div>
      ) : null}
      {/* day counter: the joke's punctuation */}
      {f < C.dive ? (
        <div style={{ position: 'absolute', left: 90, top: 70, ...rec(1, 0, 900), fontSize: 92, color: day === 5 ? LIME : '#fff', textShadow: `6px 6px 0 ${day === 5 ? '#2c4a10' : '#3a0a0d'}`, clipPath: `inset(0 ${(1 - flip) * 100}% -20% 0)` }}>
          DAY {Math.max(1, day)}
          {day === 5 ? <span style={{ fontSize: 40, marginLeft: 20, color: '#fff' }}>it remembers.</span> : null}
        </div>
      ) : null}
      {f >= D + 30 && f < C.day5 ? <div style={{ position: 'absolute', right: 90, top: 86, ...rec(1, 0, 800), fontSize: 30, color: '#fff', textShadow: '4px 4px 0 #14200a' }}>OrgX hands it the company.</div> : null}
      <Flash a={f >= D ? 0.16 * Math.exp(-(f - D) / 5) : 0} color="183,243,74" />
      <Flash a={0.5 * Math.max(f >= C.dive ? Math.exp(-(f - C.dive) / 4) : 0, f >= C.pull ? Math.exp(-(f - C.pull) / 4) : 0)} color="183,243,74" />
      <Flash a={f >= C.storm && f < C.storm + 20 ? 0.4 * Math.exp(-(f - C.storm) / 3) : 0} />
      {storm ? <AbsoluteFill style={{ background: 'rgba(10,14,24,0.25)' }} /> : null}
      <BrandEnd
        g={g}
        from={C.end}
        bg="radial-gradient(ellipse at 50% 45%, #1a1d24, #0b0c0f 70%)"
        accent={RED}
        kicker="OPENCLAW STAYS OPENCLAW"
        wipe="iris"
        logo={
          <div style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
            <svg width={200} height={200} viewBox="0 0 16 16" shapeRendering="crispEdges">
              <Lobster blink={false} claw={Math.floor(f / 12) % 2 ? 0.6 : 0} />
            </svg>
            <span style={{ ...rec(1, 0, 700), fontSize: 80, color: '#27d3e8' }}>×</span>
            <Img src={staticFile('img/orgx-logo.png')} style={{ width: 200, height: 200 }} />
          </div>
        }
        line="The company's memory, carried into the host."
      />
      <Vignette s={0.45} />
      <Grain opacity={0.04} />
      <Audio src={staticFile('audio/openclaw_mix.wav')} />
    </AbsoluteFill>
  );
};
