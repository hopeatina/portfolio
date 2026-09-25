import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS, beatAfter, beatPulse } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Score, Vignette } from '../lib/Frame';

/**
 * ORGX × OPENCLAW — "The lobster that forgot."
 * OpenClaw's pixel lobster wakes up every session with no idea who it works
 * for: Day 1, Day 2, Day 3, faster each downbeat, the same "?" every morning.
 * On the drop OrgX plugs in through one local bridge (/orgx/mcp) and hands it
 * the company: the goal, the constraints, the decisions. Next morning it wakes
 * up knowing. The wifi dies mid-task and nothing is lost: the SQLite outbox
 * holds it and replays. Then the real OrgX Live dashboard. OpenClaw stays OpenClaw.
 */
const g = GRIDS.openclaw;
const D = Math.round(g.drop);
const B = Math.round(g.button);
const RED = '#ff4f40';
const PX = 22; // one lobster pixel on screen

// OpenClaw's canonical pixel lobster (docs/assets/pixel-lobster.svg, via BrandLogo.tsx)
const BODY = 'M5 3h6v1H5zM4 4h8v1H4zM3 5h10v3H3zM4 8h8v1H4zM5 9h6v1H5zm0 3h6v1H5zm1 1h4v1H6z';
const CLAWS = 'M1 6h2v1H1zm1-1h1v1H2zm0 2h1v1H2zm11-1h2v1h-2zm0-1h1v1h-1zm0 2h1v1h-1z';
const OUTLINE = 'M1 5h1v3H1zm1-1h1v1H2zm0 4h1v1H2zm1-5h1v1H3zm0 6h1v1H3zm1-7h1v1H4zm0 8h1v1H4zm1-8h6v1H5zm6 0h1v1h-1zm1 1h1v1h-1zm0 6h1v1h-1zm1-5h1v1h-1zm0 4h1v1h-1zm1-3h1v3h-1zM5 11h6v1H5zm-1 1h1v1H4zm7 0h1v1h-1zm-8 1h1v1H3zm9 0h1v1h-1zM5 14h6v1H5z';

const Lobster: React.FC<{ x: number; y: number; bob: number; blink: boolean; clawOpen: number }> = ({ x, y, bob, blink, clawOpen }) => (
  <svg width={16 * PX} height={16 * PX} viewBox="0 0 16 16" shapeRendering="crispEdges" style={{ position: 'absolute', left: x - 8 * PX, top: y - 8 * PX - bob }}>
    <path fill="#3a0a0d" d={OUTLINE} />
    <path fill={RED} d={BODY} />
    <g transform={`translate(0 ${-clawOpen})`}><path fill="#ff775f" d={CLAWS} /></g>
    {blink ? <path fill="#081016" d="M6 5h1v0.4H6zm3 0h1v0.4H9z" /> : (
      <>
        <path fill="#081016" d="M6 5h1v1H6zm3 0h1v1H9z" />
        <path fill="#f5fbff" d="M6 4h1v1H6zm3 0h1v1H9z" />
      </>
    )}
  </svg>
);

const Bubble: React.FC<{ x: number; y: number; text: string; a: number; accent?: string }> = ({ x, y, text, a, accent = T.mineral }) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: `scale(${mix(0.6, 1, a)})`, transformOrigin: '0% 100%', opacity: a, padding: '16px 24px', background: T.mineral, color: T.carbon, ...rec(1, 0, 800), fontSize: 34, boxShadow: `6px 6px 0 ${accent === T.mineral ? '#3a0a0d' : accent}`, whiteSpace: 'nowrap' }}>
    {text}
  </div>
);

const ITEMS = [
  ['GOAL', 'Ship the Q4 launch page'],
  ['CONSTRAINT', 'No spend without approval'],
  ['DECISION', 'Keep the pricing test'],
];

export const OpenClaw: React.FC = () => {
  const f = useCurrentFrame();
  // amnesia loop: a new "day" on each downbeat before the drop
  const days = g.downbeats.filter((d) => d > 20 && d < D - 10);
  const dayIdx = days.filter((d) => f >= d).length; // 0.. before first wake
  const dayStart = dayIdx > 0 ? days[dayIdx - 1] : 0;
  const since = f - dayStart;
  const beat = beatPulse(g, f, 6);
  const bob = 10 * beat;
  const blink = Math.floor(f / 7) % 23 === 0;
  // after the drop: context arrives
  const plug = HOUSE(prog(f, D - 6, D + 10));
  const pack = settle(prog(f, D + 10, D + 30), 0.9);
  const morning = beatAfter(g, D, 4);
  const woke = f >= morning;
  const netDown = f >= beatAfter(g, D, 7) && f < beatAfter(g, D, 9);
  const replay = HOUSE(prog(f, beatAfter(g, D, 9), beatAfter(g, D, 9) + 24));
  const queued = f >= beatAfter(g, D, 7) ? Math.min(4, Math.floor((f - beatAfter(g, D, 7)) / 12) + 1) : 0;
  const real = TRAVEL(prog(f, beatAfter(g, D, 11), beatAfter(g, D, 11) + 28));
  const endFrom = B - 72;
  const out = HOUSE(prog(f, endFrom - 10, endFrom + 10));
  const LX = 620;
  const LY = 610;
  // wipe between days
  const wipe = dayIdx > 0 && since < 8 ? 1 - since / 8 : 0;
  return (
    <AbsoluteFill style={{ background: '#0b0907', overflow: 'hidden' }}>
      <AbsoluteFill style={{ opacity: 1 - out, filter: `blur(${5 * real}px) brightness(${1 - 0.6 * real})` }}>
        {/* pixel floor */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: LY + 8 * PX - 20, height: 400, backgroundImage: `linear-gradient(90deg, rgba(242,239,228,0.06) 2px, transparent 2px), linear-gradient(0deg, rgba(242,239,228,0.06) 2px, transparent 2px)`, backgroundSize: `${PX * 2}px ${PX * 2}px` }} />
        <div style={{ position: 'absolute', left: 140, top: 120, ...rec(1, 0, 800), fontSize: 26, letterSpacing: '0.16em', color: RED }}>
          {f < D ? `OPENCLAW · DAY ${Math.max(1, dayIdx)}` : woke ? 'OPENCLAW · NEXT MORNING' : 'OPENCLAW + ORGX'}
        </div>
        <div style={{ position: 'absolute', left: 140, top: 160, fontFamily: T.serif, fontStyle: 'italic', fontSize: 74, color: T.mineral, width: 1300, lineHeight: 1.05 }}>
          {f < D ? 'A capable agent. It wakes up without the company in its head.' : netDown ? 'The live stream drops. The work does not.' : 'One local bridge. The company comes along.'}
        </div>
        <Lobster x={LX} y={LY} bob={bob} blink={blink} clawOpen={beat > 0.5 ? 0.6 : 0} />
        {/* every morning, the same question */}
        {f < D && dayIdx > 0 ? <Bubble x={LX + 150} y={LY - 250} text={['who do i work for?', 'wait, what was the goal?', 'did we decide that?', 'hi! who are you?', '???'][(dayIdx - 1) % 5]} a={HOUSE(prog(since, 3, 12))} /> : null}
        {/* the bridge */}
        {plug > 0.01 ? (
          <>
            <div style={{ position: 'absolute', left: LX + 190, top: LY - 10, width: (1780 - LX - 190) * plug, height: 10, background: T.signal, boxShadow: `0 0 20px ${T.signal}` }} />
            <div style={{ position: 'absolute', right: 140, top: LY - 64, ...rec(1, 0, 800), fontSize: 30, color: T.signal, opacity: plug }}>/orgx/mcp</div>
            <div style={{ position: 'absolute', right: 140, top: LY + 20, ...rec(1, 0, 500), fontSize: 20, color: T.mineral3, opacity: plug }}>ORGX · THE COMPANY</div>
          </>
        ) : null}
        {/* the inventory: what the company knows */}
        {pack > 0.01 ? (
          <div style={{ position: 'absolute', left: 1040, top: 330, width: 700, border: `4px solid ${T.mineral}`, background: '#14110e', padding: 18, transform: `scale(${pack})`, transformOrigin: '0% 100%', boxShadow: `8px 8px 0 ${RED}` }}>
            <div style={{ ...rec(1, 0, 800), fontSize: 22, letterSpacing: '0.14em', color: T.mineral3, marginBottom: 10 }}>INVENTORY · SURVIVES THE SESSION</div>
            {ITEMS.map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', gap: 16, ...rec(1, 0, 600), fontSize: 26, padding: '6px 0', opacity: HOUSE(prog(f, D + 18 + i * 8, D + 28 + i * 8)) }}>
                <span style={{ color: T.signal, width: 190 }}>{k}</span>
                <span style={{ color: T.mineral }}>{v}</span>
              </div>
            ))}
          </div>
        ) : null}
        {woke && !netDown && replay < 0.01 ? <Bubble x={LX + 150} y={LY - 250} text="morning. picking up the launch page." a={HOUSE(prog(f, morning, morning + 10))} accent={T.signal} /> : null}
        {/* offline: the outbox fills, then replays */}
        {queued > 0 ? (
          <div style={{ position: 'absolute', left: LX - 180, top: LY + 210, display: 'flex', gap: 12, alignItems: 'center', opacity: 1 - replay }}>
            <span style={{ ...rec(1, 0, 700), fontSize: 22, color: netDown ? T.heat : T.signal }}>{netDown ? 'OFFLINE · SQLITE OUTBOX' : 'RECONNECTED · REPLAYING'}</span>
            {new Array(queued).fill(0).map((_, i) => (
              <div key={i} style={{ width: 40, height: 40, background: T.mineral, boxShadow: `4px 4px 0 ${RED}`, transform: `translateX(${replay * 900}px)` }} />
            ))}
          </div>
        ) : null}
      </AbsoluteFill>
      {/* the real thing */}
      {real > 0.01 ? (
        <div style={{ position: 'absolute', left: 960, top: 560, width: 1560, transform: `translate(-50%, -50%) translateY(${(1 - real) * 520}px)`, opacity: real * (1 - out), borderRadius: 14, overflow: 'hidden', border: `1px solid ${T.mineral4}`, boxShadow: '0 40px 120px rgba(0,0,0,0.7)' }}>
          <Img src={staticFile('img/full-dashboard.png')} style={{ width: 1560, display: 'block' }} />
        </div>
      ) : null}
      {real > 0.5 ? (
        <div style={{ position: 'absolute', left: 180, top: 70, ...rec(1, 0, 700), fontSize: 24, letterSpacing: '0.14em', color: T.signal, opacity: HOUSE(prog(f, beatAfter(g, D, 12), beatAfter(g, D, 12) + 12)) * (1 - out) }}>
          ORGX LIVE, INSIDE THE OPENCLAW LOOP · OPENCLAW STAYS OPENCLAW
        </div>
      ) : null}
      <Flash a={wipe * 0.9} color="11,9,7" />
      <Flash a={f >= D ? 0.16 * Math.exp(-(f - D) / 6) : 0} color="183,243,74" />
      <EndCard g={g} index="04 / CONTINUITY PLUGIN" title="OrgX × OpenClaw" line="The company's memory, carried into the host." accent={RED} from={endFrom} />
      <Vignette s={0.5} />
      <Grain />
      <Score proj="openclaw" />
    </AbsoluteFill>
  );
};
export const ocUnused = [RESOLVE, clamp];
