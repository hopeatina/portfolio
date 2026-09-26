import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';
import { monotone } from '../lib/spline';
import { Cam, Key, X, Y, Z, keyedCamera, project, v3, vscale } from '../lib/space';
import { Blur, Box, Fog, Plane, polyline } from '../lib/World';
import cues from '../data/cues_alma.json';

/**
 * ALMA v2: "The request path stays narrow."
 * One world, one camera. Frame 0: a therapist's cursor on Save (PHI redacted).
 * The saved note is the hero: it rides one rail, and on every hard kick of the
 * build a crate of consequence (document render, reminders, vendor audit,
 * backfill, eligibility) slams onto it; the rail bows, the note crawls, and
 * the word "Saving…" strains under the weight. Drop: the crates peel off into
 * durable lanes on the floor below, each passes an audit gate on a snare (one
 * fails, retries, passes), the note arrives: Saved. A feature flag flips off
 * and on (the rollback path is real). The camera cranes up: the lanes sit on
 * Alma's continuity map. Only verified numbers: 72%, 999, 2.7 years.
 * Rewatch: crate serials count up to #0999; the map is on the floor from the
 * first frame; the note's field bars are the same widths as the stats.
 */
const g = GRIDS.alma;
const C = cues.cue;
const COLD = '#48c7ff';
const D = C.drop;
const FLOOR = 600;
const FOG: Fog = { near: 1400, far: 6200 };

const LOADS = [
  { label: 'Document render', phi: true, id: '#0412' },
  { label: 'Reminder emails', phi: true, id: '#0587' },
  { label: 'Vendor audit token', phi: false, id: '#0733' },
  { label: 'Backfill', phi: false, id: '#0861' },
  { label: 'Eligibility + cadence', phi: true, id: '#0999' },
];
const LANE_Z = (i: number) => -560 - i * 280;
const LANE_X0 = 900;
const GATE_X = 2150;
// lane → gate frame (lane 2 is the vendor audit: it fails first, retries, passes)
const GATE_AT = [C.stamps[0], C.stamps[1], C.retry, C.stamps[2], C.stamps[3]];

// the note's position along the rail: a graph editor, like the camera
const NX = monotone([0, 22, 48, 146, 180, 279, 312, 414, 428, C.saved, 900], [0, 0, 250, 520, 580, 650, 670, 720, 860, 2350, 2420]);
const LANDED = (f: number) => LOADS.reduce((a, _, i) => a + HOUSE(prog(f, C.loads[i], C.loads[i] + 8)), 0);
const lift = (f: number) => HOUSE(prog(f, D, D + 20));
const sagAt = (f: number) => {
  if (f < D) return 190 * (LANDED(f) / LOADS.length);
  // released: the rail twangs back past straight and settles (a spring)
  const t = f - D;
  return 190 * Math.exp(-t / 7) * Math.cos(t * 0.42);
};
const railY = (f: number, x: number) => sagAt(f) * Math.exp(-(((x - NX(f)) / 520) ** 2));

const KEYS: Key[] = [
  // [frame, tx, ty, tz, dist, yaw, pitch, roll]
  [0, 122, -44, 0, 290, 0, 0, 0], // macro: the cursor on Save
  [C.click, 122, -44, 0, 280, 0, 0, 0],
  [40, 80, -150, 0, 700, 16, 4, 0], // pull back: the note on its rail
  [C.loads[0], 160, -250, 0, 880, 22, 5, 0],
  [C.loads[1], 480, -380, 0, 1000, 26, 6, -0.6],
  [C.loads[3], 640, -540, 0, 1180, 30, 6, -1],
  [C.stall, 680, -560, 0, 1060, 28, 5, -1.4], // the stall: lean in
  [D, 700, -540, 0, 1000, 27, 5, -1.6],
  [D + 36, 1300, 300, -650, 1750, 34, 22, 0], // crane down: the rail yard
  [C.saved, 1650, 330, -800, 1650, 40, 20, 0.4],
  [540, 1950, 390, -950, 1420, 48, 18, 0],
  [C.retry, 2020, 410, -1050, 1380, 50, 18, 0],
  [C.flagOff - 4, 790, 520, -300, 560, 16, 8, 0], // the switch, close
  [C.flagOn, 800, 520, -300, 540, 12, 8, 0],
  [C.crane, 1100, 440, -500, 1500, 10, 24, 0],
  [C.map + 10, 1480, 600, -1000, 3000, 0, 72, 0], // top-down: it's the map
  [900, 1480, 600, -1000, 3150, 0, 74, 0],
];
const CAM = keyedCamera(KEYS, [
  { frames: C.loads, tau: 5, punch: 0.035, px: 9 },
  { frames: [D], tau: 6, punch: 0.05, px: 12 },
  { frames: [...C.stamps, C.retry], tau: 4, punch: 0.012, px: 3 },
]);

const Redact: React.FC<{ w: number; h?: number }> = ({ w, h = 12 }) => (
  <span style={{ display: 'inline-block', width: w, height: h, borderRadius: 3, background: 'rgba(242,239,228,0.2)', verticalAlign: 'middle' }} />
);

/** The saved note: a real form state machine (idle → pressed → saving… → Saved). */
const Note: React.FC<{ f: number }> = ({ f }) => {
  const load = LANDED(f) / LOADS.length;
  const saving = f >= C.click + 3 && f < C.saved;
  const saved = f >= C.saved;
  const pressed = f >= C.click && f < C.click + 5;
  const strain = saving ? load * (1 - lift(f)) : 0;
  const dots = '.'.repeat(1 + Math.floor(strain * 5));
  const spin = (f * (12 - 9 * strain)) % 360;
  const sT = settle(prog(f, C.saved, C.saved + 10), 1.2);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0f1418', borderRadius: 16, boxShadow: `inset 0 0 0 1.5px rgba(72,199,255,${saved ? 0.75 : 0.25})`, padding: '22px 26px', ...rec(0.2, 0, 450), color: T.mineral }}>
      <div style={{ ...rec(1, 0, 600), fontSize: 13, letterSpacing: '0.16em', color: COLD }}>REASSESSMENT · WEEK 6</div>
      <div style={{ marginTop: 14, display: 'flex', gap: 10, alignItems: 'center', fontSize: 16, color: T.mineral2 }}>
        Client <Redact w={96} /> <Redact w={58} />
      </div>
      <div style={{ marginTop: 12, fontSize: 16, color: T.mineral2 }}>
        Progress note <Redact w={72} /> <Redact w={99} /> <Redact w={27} />
      </div>
      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
        <Redact w={150} h={10} />
        <Redact w={110} h={10} />
      </div>
      <div
        style={{
          position: 'absolute',
          right: 22,
          bottom: 20,
          minWidth: 132,
          height: 46,
          padding: '0 18px',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          background: saved ? T.signal : pressed ? '#2f8fbf' : COLD,
          color: T.carbon,
          transform: `scale(${pressed ? 0.94 : saved ? mix(0.9, 1, sT) : 1})`,
          ...rec(0.3, 0, saving ? 520 + 380 * strain : 650),
          fontSize: 19,
          letterSpacing: `${-0.02 * strain}em`,
          whiteSpace: 'nowrap',
        }}
      >
        {saving ? (
          <>
            <span style={{ width: 16, height: 16, borderRadius: 8, border: '2.5px solid rgba(8,8,6,0.3)', borderTopColor: T.carbon, transform: `rotate(${spin}deg)` }} />
            Saving{dots}
          </>
        ) : saved ? (
          'Saved ✓'
        ) : (
          'Save'
        )}
      </div>
    </div>
  );
};

type CrateState = 'ride' | 'lane' | 'ok' | 'fail';
const CrateFace: React.FC<{ i: number; state: CrateState }> = ({ i, state }) => {
  const l = LOADS[i];
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '14px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', ...rec(1, 0, 500), fontSize: 15, letterSpacing: '0.12em', color: T.mineral3 }}>
        <span>{state === 'ride' ? 'SYNC · ON REQUEST' : 'CELERY STAGE'}</span>
        <span>{l.id}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...rec(0.2, 0, 600), fontSize: 30, color: T.mineral }}>
        {l.label}
        {l.phi ? <span style={{ ...rec(1, 0, 600), fontSize: 11, padding: '3px 6px', borderRadius: 4, background: 'rgba(255,87,56,0.18)', color: T.heat }}>PHI</span> : null}
        {state === 'ok' ? <span style={{ marginLeft: 'auto', color: T.signal, fontSize: 30 }}>✓</span> : null}
        {state === 'fail' ? <span style={{ marginLeft: 'auto', ...rec(1, 0, 600), color: T.heat, fontSize: 15 }}>RETRY 2/3</span> : null}
      </div>
    </div>
  );
};

const World: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const nx = NX(f);
  const sag = sagAt(f);
  const noteC = v3(nx, -130 + sag, 0);
  const flagOff = f >= C.flagOff && f < C.flagOn;
  const flowOn = f >= D + 30 && !flagOff;
  const railPts = [];
  for (let x = -600; x <= 2500; x += 40) railPts.push(project(cam, v3(x, railY(f, x), 0)));
  const railOk = railPts.filter((p) => p.d > 40);
  const railCol = f < D && sag / 190 > 0.55 ? T.heat : f >= D && f < D + 24 ? COLD : T.mineral;
  const lanes = LOADS.map((_, i) => {
    const on = HOUSE(prog(f, D + 4 + i * 3, D + 26 + i * 3));
    const pts = [];
    for (let x = LANE_X0; x <= LANE_X0 + (GATE_X + 600 - LANE_X0) * on; x += 50) pts.push(project(cam, v3(x, FLOOR, LANE_Z(i))));
    return pts.filter((p) => p.d > 40);
  });
  // later requests keep flowing (the stream pauses while the flag is off)
  let flowT = 0;
  for (let k = D + 30; k <= f; k++) if (!(k >= C.flagOff && k < C.flagOn)) flowT++;
  const mapT = HOUSE(prog(f, C.crane, C.map + 20));
  return (
    <>
      <Plane cam={cam} c={v3(1400, FLOOR + 1, -900)} U={X} V={Z} w={7200} h={4200} z={-400000}>
        <div style={{ position: 'absolute', inset: 0, background: '#07090a', backgroundImage: 'linear-gradient(rgba(242,239,228,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(242,239,228,0.05) 2px, transparent 2px)', backgroundSize: '240px 240px' }} />
      </Plane>
      <Plane cam={cam} c={v3(1500, FLOOR, -1000)} U={X} V={Z} w={3600} h={2025} z={-390000} opacity={0.1 + 0.9 * mapT}>
        <Img src={staticFile('img/alma-system-v4.svg')} style={{ width: 3600, height: 2025, mixBlendMode: 'screen' }} />
      </Plane>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'visible' }}>
        <defs>
          <filter id="aglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={7} />
          </filter>
        </defs>
        {lanes.map((pts, i) => (pts.length > 1 ? <path key={i} d={polyline(pts)} stroke={flagOff ? T.mineral4 : 'rgba(72,199,255,0.55)'} strokeWidth={3} strokeDasharray="10 12" fill="none" /> : null))}
        {lanes.map((pts, i) => {
          const u = prog(f, D + 6 + i * 3, D + 40 + i * 3);
          if (u <= 0 || u >= 1 || pts.length < 2) return null;
          const k = Math.floor(u * (pts.length - 1));
          const seg = pts.slice(Math.max(0, k - 6), k + 1);
          return <path key={`p${i}`} d={polyline(seg)} stroke={COLD} strokeWidth={9} fill="none" filter="url(#aglow)" opacity={1 - u} />;
        })}
        <path d={polyline(railOk)} stroke={railCol} strokeWidth={10} fill="none" opacity={0.35} filter="url(#aglow)" />
        <path d={polyline(railOk)} stroke={railCol} strokeWidth={4} fill="none" />
        {f > C.saved + 20
          ? new Array(6).fill(0).map((_, k) => {
              const x = -500 + ((((flowT * 38 + k * 520) % 3000) + 3000) % 3000);
              const p = project(cam, v3(x, railY(f, x) - 8, 0));
              return p.d > 40 ? <circle key={k} cx={p.sx} cy={p.sy} r={Math.max(2, 9 * p.s)} fill={COLD} opacity={flagOff ? 0.35 : 0.9} /> : null;
            })
          : null}
        {flowOn
          ? LOADS.map((_, i) =>
              new Array(3).fill(0).map((__, k) => {
                const x = LANE_X0 + ((flowT * 9 + k * 520 + i * 173) % (GATE_X + 500 - LANE_X0));
                const p = project(cam, v3(x, FLOOR - 10, LANE_Z(i)));
                return p.d > 40 ? <circle key={`${i}${k}`} cx={p.sx} cy={p.sy} r={Math.max(2, 10 * p.s)} fill={x > GATE_X ? T.signal : COLD} /> : null;
              })
            )
          : null}
      </svg>
      {new Array(10).fill(0).map((_, k) => {
        const x = -450 + k * 300;
        const top = railY(f, x);
        return (
          <Plane key={`s${k}`} cam={cam} c={v3(x, (top + FLOOR) / 2, 0)} w={8} h={FLOOR - top} z={-50000} opacity={1 - 0.8 * HOUSE(prog(f, C.retry, C.flagOff - 10)) * (1 - HOUSE(prog(f, C.flagOn, C.crane)))}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(242,239,228,0.14)' }} />
          </Plane>
        );
      })}
      <Plane cam={cam} c={v3(2440, -60, 0)} w={220} h={60}>
        <div style={{ ...rec(1, 0, 600), fontSize: 18, letterSpacing: '0.16em', color: f >= C.saved ? T.signal : T.mineral3 }}>CLINICIAN ●</div>
      </Plane>
      <Box cam={cam} c={noteC} size={[420, 260, 36]} color="#0c1013" face={<Note f={f} />} edge="rgba(72,199,255,0.35)" />
      {f < 44 ? (
        <Plane
          cam={cam}
          c={v3(nx + 150 + (f < C.click ? mix(40, 0, HOUSE(prog(f, 0, C.click))) : 0), noteC.y + 86 + (f < C.click ? mix(26, 0, HOUSE(prog(f, 0, C.click))) : 0), 24)}
          w={30}
          h={30}
          opacity={1 - prog(f, 30, 44)}
        >
          <svg width={30} height={30} viewBox="0 0 24 24">
            <path d="M3 2l7 19 3-8 8-3z" fill="#fff" stroke="#000" strokeWidth={1.2} />
          </svg>
        </Plane>
      ) : null}
      {LOADS.map((_, i) => {
        const land = C.loads[i];
        if (f < land - 14) return null;
        const drop = clamp(prog(f, land - 14, land) ** 2.2);
        const squash = f >= land ? 1 - 0.12 * Math.exp(-(f - land) / 3) * Math.cos((f - land) * 0.9) : 1;
        const stackY = noteC.y - 130 - 72 - i * 148 + (1 - squash) * 50;
        const ride = v3(nx + [0, 14, -18, 10, -6][i], mix(-2400, stackY, drop), [0, -4, 6, -2, 4][i]);
        const peel = TRAVEL(prog(f, C.peel[i], C.peel[i] + 22));
        const start = v3(LANE_X0, FLOOR - 74, LANE_Z(i));
        let c = ride;
        let state: CrateState = 'ride';
        if (peel > 0) {
          const arc = Math.sin(Math.PI * peel) * -260;
          c = v3(mix(ride.x, start.x, peel), mix(ride.y, start.y, peel) + arc, mix(ride.z, start.z, peel));
          state = 'lane';
        }
        const laneStart = C.peel[i] + 22;
        if (f >= laneStart) {
          let x: number;
          if (i === 2) {
            if (f < C.fail) x = mix(LANE_X0, GATE_X - 280, RESOLVE(prog(f, laneStart, C.fail)));
            else if (f < C.retry - 30) x = GATE_X - 280 - 140 * settle(prog(f, C.fail, C.fail + 12), 0.4);
            else x = mix(GATE_X - 420, GATE_X + 520, HOUSE(prog(f, C.retry - 30, C.retry + 50)));
            state = f >= C.retry ? 'ok' : f >= C.fail ? 'fail' : 'lane';
          } else {
            const at = GATE_AT[i];
            x = f < at ? mix(LANE_X0, GATE_X - 280, RESOLVE(prog(f, laneStart, at))) : mix(GATE_X - 280, GATE_X + 520, HOUSE(prog(f, at, at + 60)));
            state = f >= at ? 'ok' : 'lane';
          }
          c = v3(x, FLOOR - 74, LANE_Z(i));
        }
        const edge = state === 'ok' ? 'rgba(183,243,74,0.6)' : state === 'fail' ? 'rgba(255,87,56,0.8)' : 'rgba(242,239,228,0.2)';
        return <Box key={i} cam={cam} c={c} size={[460, 144, 220]} color="#161b1f" fog={FOG} face={<CrateFace i={i} state={state} />} edge={edge} />;
      })}
      {LOADS.map((_, i) => {
        const on = HOUSE(prog(f, D + 20 + i * 4, D + 40 + i * 4));
        const at = GATE_AT[i];
        const okFlash = f >= at ? Math.exp(-(f - at) / 8) : 0;
        const bad = i === 2 && f >= C.fail && f < C.retry;
        const badFlash = i === 2 && f >= C.fail ? Math.exp(-(f - C.fail) / 6) : 0;
        const col = bad ? T.heat : f >= at ? T.signal : T.mineral3;
        return (
          <Plane key={`g${i}`} cam={cam} c={v3(GATE_X, FLOOR - 130, LANE_Z(i))} U={vscale(Z, -1)} V={Y} w={276} h={260} fog={FOG} opacity={on}>
            <div style={{ position: 'absolute', inset: 0, border: `6px solid ${col}`, borderBottom: 'none', borderRadius: '18px 18px 0 0', boxShadow: `0 0 ${40 * (okFlash + badFlash)}px ${col}`, background: `rgba(${bad ? '255,87,56' : '183,243,74'},${0.18 * (okFlash + badFlash)})` }} />
            <div style={{ position: 'absolute', top: 14, width: '100%', textAlign: 'center', ...rec(1, 0, 700), fontSize: 18, letterSpacing: '0.18em', color: col }}>AUDIT</div>
          </Plane>
        );
      })}
      <Plane cam={cam} c={v3(LANE_X0 - 120, FLOOR - 70, -300)} w={430} h={96} opacity={HOUSE(prog(f, D + 30, D + 50))}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 48, background: '#0f1418', boxShadow: `inset 0 0 0 2px ${flagOff ? T.heat : T.mineral4}`, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px' }}>
          <div style={{ width: 84, height: 46, borderRadius: 23, background: flagOff ? 'rgba(242,239,228,0.16)' : T.signal, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 5, left: flagOff ? 5 : 43, width: 36, height: 36, borderRadius: 18, background: T.carbon }} />
          </div>
          <div style={{ ...rec(1, 0, 550), fontSize: 20, color: T.mineral, lineHeight: 1.25 }}>
            reassessments_v2
            <div style={{ fontSize: 15, color: flagOff ? T.heat : T.mineral3 }}>{flagOff ? 'OFF · ROLLBACK PATH' : 'ON · REVERSIBLE'}</div>
          </div>
        </div>
      </Plane>
    </>
  );
};

export const Alma: React.FC = () => {
  const f = useCurrentFrame();
  const cam = CAM.at(f);
  const endDim = HOUSE(prog(f, C.end - 12, C.end + 16));
  const statsT = RESOLVE(prog(f, C.map, C.map + 26));
  const line = (a: number, b: number) => HOUSE(prog(f, a, a + 14)) * (1 - HOUSE(prog(f, b, b + 10)));
  const words = f < C.loads[1] ? 'A therapist presses Save.' : f < D ? 'Then everything rides along.' : f < C.flagOff - 6 ? 'The request path stays narrow.' : 'And every change can be undone.';
  const lineOn = f < D ? line(30, D - 6) : f < C.flagOff - 6 ? line(C.saved + 8, C.flagOff - 16) : line(C.flagOff - 4, C.map - 6);
  return (
    <AbsoluteFill style={{ background: '#050607', overflow: 'hidden' }}>
      <Blur
        ranges={[
          [C.click + 8, 42, 6],
          [C.loads[0] - 3, C.loads[0] + 4, 6],
          [D - 2, D + 40, 10],
          [C.crane, C.map + 14, 8],
        ]}
      >
        <AbsoluteFill style={{ filter: `brightness(${1 - 0.72 * endDim}) blur(${5 * endDim}px)` }}>
          <World f={f} cam={cam} />
        </AbsoluteFill>
      </Blur>
      <AbsoluteFill style={{ opacity: 1 - endDim }}>
        <div style={{ position: 'absolute', left: 120, top: 96, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.2em', color: COLD, opacity: HOUSE(prog(f, 36, 54)) }}>ALMA · CLINICAL PRODUCTION · HIPAA</div>
        <div style={{ position: 'absolute', left: 120, ...(f < D ? { top: 138 } : { bottom: 110 }), fontFamily: T.serif, fontStyle: 'italic', fontSize: 78, color: T.mineral, opacity: lineOn, clipPath: `inset(0 ${(1 - lineOn) * 100}% -20% 0)` }}>{words}</div>
        {statsT > 0 ? (
          <div style={{ position: 'absolute', right: 120, top: 96, display: 'flex', gap: 60, opacity: statsT }}>
            {[
              ['72%', 'ADOPTION · SELF-REPORTED'],
              ['999', 'COMMITS'],
              ['2.7 YRS', 'HIPAA PRODUCTION'],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: T.serif, fontSize: 64, color: T.mineral, lineHeight: 1 }}>{resolveText(''.padEnd(n.length, ' '), n, statsT, `al${l}`, f)}</div>
                <div style={{ ...rec(1, 0, 500), fontSize: 15, letterSpacing: '0.12em', color: T.mineral3, marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>
        ) : null}
      </AbsoluteFill>
      <Flash a={f >= D ? 0.14 * Math.exp(-(f - D) / 5) : 0} color="72,199,255" />
      <Flash a={f >= C.saved ? 0.05 * Math.exp(-(f - C.saved) / 5) : 0} color="183,243,74" />
      <EndCard g={g} index="02 / PRODUCTION SYSTEMS" title="Alma" line="Clinical systems that had to earn adoption and survive inspection." accent={COLD} from={C.end} />
      <Vignette s={0.6} />
      <Grain />
      <Audio src={staticFile('audio/alma_mix.wav')} />
    </AbsoluteFill>
  );
};
