import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog } from '../lib/ease';
import { GRIDS, beatAfter, beatPulse } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Score, Vignette } from '../lib/Frame';

/**
 * CHAOS RIDERS — "Read the road. Find the line. Hold your nerve."
 * Opens on the concept art (labelled as concept art), then drops you onto a
 * red-dirt road where potholes arrive on the beat and the taxi corrects,
 * brakes, wobbles. On the drop the golden line reveals the route through the
 * field and the run goes into FLOW. Then the captured browser prototype,
 * labelled as the playable build: the case study's rule of keeping the visual
 * target and the playable build clearly identified.
 */
const g = GRIDS.chaosriders;
const D = Math.round(g.drop);
const B = Math.round(g.button);
const GOLD = '#ffb02e';
const HORIZON = 430;
const CX = 960;

// deterministic, distance-based pothole field (like the prototype's track functions)
const holeAt = (i: number) => ({ lane: Math.sin(i * 2.17) * 0.62, d: i * 140 });
const lineAt = (d: number) => -Math.sin(d * 0.0142 + 0.8) * 0.5; // the route around the field

export const ChaosRiders: React.FC = () => {
  const f = useCurrentFrame();
  const concept = 1 - HOUSE(prog(f, 96, 118));
  const speed = f < D ? 9 : 16;
  const dist = f < D ? f * 9 : D * 9 + (f - D) * 16;
  const flow = HOUSE(prog(f, D, D + 20));
  const proto = TRAVEL(prog(f, beatAfter(g, D, 12), beatAfter(g, D, 12) + 24));
  const endFrom = B - 72;
  const out = HOUSE(prog(f, endFrom - 10, endFrom + 10));
  const kick = beatPulse(g, f, 4);
  // the taxi steers toward the route; before FLOW it overcorrects on each beat
  const target = lineAt(dist + 300);
  const wobble = f < D ? 0.12 * Math.sin(f * 0.35) * (0.4 + kick) : 0.02 * Math.sin(f * 0.2);
  const carX = CX + (target + wobble) * 520;
  const roadPt = (lane: number, depth: number) => {
    // depth 0 (horizon) .. 1 (camera)
    const s = depth ** 2.2;
    return { x: CX + lane * 900 * s, y: HORIZON + (1080 - HORIZON) * s, s };
  };
  const stripes = new Array(22).fill(0).map((_, i) => ((i * 60 + dist) % 1320) / 1320);
  return (
    <AbsoluteFill style={{ background: '#1a0f08', overflow: 'hidden' }}>
      <AbsoluteFill style={{ opacity: 1 - out, filter: `blur(${5 * proto}px) brightness(${1 - 0.55 * proto})`, transform: `translateY(${kick * 4}px)` }}>
        {/* sky + dust */}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, #3a2414 0%, #8a5a2e ${(HORIZON / 1080) * 100}%, #6b3a1c ${(HORIZON / 1080) * 100}%, #3c1e0e 100%)` }} />
        <Img src={staticFile('img/bamenda-world.webp')} style={{ position: 'absolute', left: 0, top: HORIZON - 520, width: 1920, height: 520, objectFit: 'cover', objectPosition: '50% 30%', opacity: 0.55, filter: 'sepia(0.5) blur(2px)' }} />
        {/* road */}
        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
          <polygon points={`${CX - 20},${HORIZON} ${CX + 20},${HORIZON} ${CX + 1100},1080 ${CX - 1100},1080`} fill="#8a4a24" />
          {stripes.map((d, i) => {
            const a = roadPt(-1.2, d);
            const b = roadPt(1.2, d);
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(40,18,8,0.35)" strokeWidth={2 + 10 * a.s} />;
          })}
          {/* the golden line: the route through the field */}
          {flow > 0.01 ? (
            <path d={new Array(40).fill(0).map((_, i) => { const dd = i / 39; const p = roadPt(lineAt(dist + (1 - dd) * 1300), dd); return `${i ? 'L' : 'M'}${p.x} ${p.y}`; }).join(' ')} stroke={GOLD} strokeWidth={14} fill="none" opacity={flow} style={{ filter: `drop-shadow(0 0 18px ${GOLD})` }} />
          ) : null}
          {/* potholes */}
          {new Array(40).fill(0).map((_, i) => {
            const h = holeAt(i);
            const rel = h.d - dist;
            if (rel < 0 || rel > 1300) return null;
            const p = roadPt(h.lane, 1 - rel / 1300);
            return <ellipse key={i} cx={p.x} cy={p.y} rx={120 * p.s} ry={34 * p.s} fill="#2a1409" stroke="rgba(0,0,0,0.4)" strokeWidth={3 * p.s} />;
          })}
        </svg>
        {/* the taxi, from behind */}
        <div style={{ position: 'absolute', left: carX - 170, top: 800, width: 340, height: 170, transform: `rotate(${(target - lineAt(dist + 200) + wobble) * 18}deg)` }}>
          <div style={{ position: 'absolute', left: 30, top: 0, width: 280, height: 70, borderRadius: '30px 30px 6px 6px', background: '#e8c23a' }} />
          <div style={{ position: 'absolute', left: 60, top: 12, width: 220, height: 44, borderRadius: 14, background: '#2a2a26' }} />
          <div style={{ position: 'absolute', left: 0, top: 64, width: 340, height: 86, borderRadius: 14, background: '#f0cc3e' }} />
          <div style={{ position: 'absolute', left: 0, top: 96, width: 340, height: 18, background: '#1f5fa8' }} />
          <div style={{ position: 'absolute', left: 16, top: 72, width: 44, height: 20, borderRadius: 4, background: f < D && kick > 0.6 ? '#ff3b2f' : '#8a1f18', boxShadow: f < D && kick > 0.6 ? '0 0 30px #ff3b2f' : undefined }} />
          <div style={{ position: 'absolute', right: 16, top: 72, width: 44, height: 20, borderRadius: 4, background: f < D && kick > 0.6 ? '#ff3b2f' : '#8a1f18', boxShadow: f < D && kick > 0.6 ? '0 0 30px #ff3b2f' : undefined }} />
          <div style={{ position: 'absolute', left: 120, top: 118, width: 100, height: 22, background: '#f2efe4', ...rec(1, 0, 800), fontSize: 14, color: '#111', textAlign: 'center', lineHeight: '22px' }}>CR 237</div>
          <div style={{ position: 'absolute', left: 20, top: 146, width: 60, height: 26, borderRadius: 6, background: '#111' }} />
          <div style={{ position: 'absolute', right: 20, top: 146, width: 60, height: 26, borderRadius: 6, background: '#111' }} />
        </div>
        {/* speed lines in FLOW */}
        {flow > 0.01
          ? new Array(26).fill(0).map((_, i) => {
              const a = (i / 26) * Math.PI * 2;
              const r0 = 300 + ((f * 40 + i * 97) % 700);
              return <div key={i} style={{ position: 'absolute', left: CX + Math.cos(a) * r0, top: HORIZON + 80 + Math.sin(a) * r0 * 0.6, width: 120, height: 3, background: GOLD, opacity: 0.35 * flow, transform: `rotate(${(a * 180) / Math.PI}deg)` }} />;
            })
          : null}
        {/* HUD */}
        <div style={{ position: 'absolute', left: 140, top: 110, ...rec(1, 0, 800), fontSize: 24, letterSpacing: '0.18em', color: GOLD }}>{f < D ? 'STEER · BRAKE · STEADY' : 'FLOW'}</div>
        <div style={{ position: 'absolute', left: 140, top: 150, fontFamily: T.serif, fontStyle: 'italic', fontSize: 90, color: T.mineral, textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}>
          {f < 200 ? 'Read the road.' : f < D ? 'Find the line.' : 'Hold your nerve.'}
        </div>
        <div style={{ position: 'absolute', right: 140, top: 120, textAlign: 'right' }}>
          <div style={{ ...rec(1, 0, 800), fontSize: 110, color: T.mineral, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{Math.round(mix(38, 72, clamp((f - 100) / (D - 100))) + (f > D ? 10 * flow : 0))}</div>
          <div style={{ ...rec(1, 0, 500), fontSize: 18, letterSpacing: '0.18em', color: T.mineral3 }}>KM/H · {f < D ? 'CLEAN SECTORS 0' : `CLEAN SECTORS ${Math.min(3, 1 + Math.floor((f - D) / 60))}`}</div>
        </div>
      </AbsoluteFill>
      {/* the concept art hook */}
      {concept > 0.01 ? (
        <AbsoluteFill style={{ opacity: concept }}>
          <Img src={staticFile('img/world-market.webp')} style={{ width: 1920, height: 1080, objectFit: 'cover', transform: `scale(${1.04 + f * 0.0012}) translateX(${-f * 0.6}px)` }} />
          <div style={{ position: 'absolute', left: 140, bottom: 110, ...rec(1, 0, 700), fontSize: 20, letterSpacing: '0.2em', color: T.mineral, background: 'rgba(8,8,6,0.6)', padding: '8px 14px' }}>CONCEPT ART · THE VISUAL TARGET · YAOUNDÉ MARKET</div>
          <div style={{ position: 'absolute', left: 140, top: 150, fontFamily: T.serif, fontStyle: 'italic', fontSize: 90, color: T.mineral, textShadow: '0 4px 30px rgba(0,0,0,0.7)' }}>Read the road.</div>
        </AbsoluteFill>
      ) : null}
      {/* the playable build, labelled as such */}
      {proto > 0.01 ? (
        <div style={{ position: 'absolute', left: 960, top: 560, width: 1400, transform: `translate(-50%, -50%) translateY(${(1 - proto) * 480}px)`, opacity: proto * (1 - out), boxShadow: '0 40px 120px rgba(0,0,0,0.7)' }}>
          <Img src={staticFile('img/prototype-gameplay.png')} style={{ width: 1400, display: 'block' }} />
          <div style={{ position: 'absolute', left: 0, top: -54, ...rec(1, 0, 700), fontSize: 22, letterSpacing: '0.16em', color: GOLD }}>CAPTURED BROWSER PROTOTYPE · THREE.JS + REACT · PLAYABLE</div>
        </div>
      ) : null}
      <Flash a={f >= D ? 0.22 * Math.exp(-(f - D) / 7) : 0} color="255,176,46" />
      <EndCard g={g} index="07 / GAME WORLD" title="Chaos Riders" line="Cameroon's roads, under your thumb." accent={GOLD} from={endFrom} />
      <Vignette s={0.6} />
      <Grain opacity={0.08} />
      <Score proj="chaosriders" />
    </AbsoluteFill>
  );
};
export const crUnused = [RESOLVE, speedUnused];
function speedUnused() {}
