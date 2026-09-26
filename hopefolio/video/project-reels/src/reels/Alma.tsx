import React from 'react';
import { AbsoluteFill, random, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';
import { Cam, Key, Vec3, X, Y, Z, edit, project, v3, vlerp, vscale } from '../lib/space';
import { Blur, Box, DofCtx, Fog, Plane, polyline } from '../lib/World';
import { Bokeh, Dip, Glow, Grade, Letterbox } from '../lib/Env';
import { BrandEnd } from '../lib/BrandEnd';
import cues from '../data/cues_alma.json';

/**
 * ALMA v3: "Saved."
 * Surface: a therapist's office at dusk, ten minutes between clients. In the
 * world where everything rides on Save, each kick appends another consequence
 * to the request, the spinner drags, the mug's steam stops, the clock reaches
 * 10:59, and someone knocks. Smash to black: In Alma, Save only saves.
 * Click: Saved, instantly; the steam moves again. Reality: the camera drops
 * through the desk into the green underworld where the same five jobs run as
 * durable lanes, stamped by Alma's shield at the audit gates (one retries),
 * behind a switch that can be thrown back. Crane up: the door is open, it's
 * 11:00, the lid closes. Only verified numbers: 72%, 999, 2.7 years.
 */
const g = GRIDS.alma;
const C = cues.cue;
const D = C.drop;
const MINT = '#00e5a0';
const GREEN = '#03291c';
const AMBER = '#ffb46b';
const SANS = 'system-ui, -apple-system, Helvetica Neue, sans-serif';

const JOBS = [
  { label: 'Render document', phi: true },
  { label: 'Send reminders', phi: true },
  { label: 'Vendor audit token', phi: false },
  { label: 'Backfill history', phi: false },
  { label: 'Eligibility + cadence', phi: true },
];

// ── the office (desk top at y = 0; the laptop hinges at the back of its base)
const SW = 940;
const SH = 600;
const HINGE = v3(0, -22, -380);
const lidAngle = (f: number) => mix(0.24, -Math.PI / 2, HOUSE(prog(f, C.lid - 18, C.lid + 4)));
const screenFrame = (f: number) => {
  const th = lidAngle(f);
  const V = v3(0, Math.cos(th), Math.sin(th));
  const top = v3(HINGE.x, HINGE.y - SH * Math.cos(th), HINGE.z - SH * Math.sin(th));
  return { V, center: vlerp(top, HINGE, 0.5), at: (u: number, v: number): Vec3 => v3(top.x - SW / 2 + u, top.y + v * V.y, top.z + v * V.z) };
};
const MUG = v3(760, -130, -60);
const DOOR = v3(1750, -1500, -2980);

// ── the underworld (reality), below the desk
const UY = 2600;
const LANE_Z = (i: number) => -300 - i * 300;
const LANE_X0 = -1300;
const GATE_X = 700;
const GATE_AT = [C.stamps[0], C.stamps[1], C.retry, C.stamps[2], C.stamps[3]];
const SWITCH = v3(-1750, UY - 90, -500);
const FOG: Fog = { near: 2200, far: 7600 };

const btn = screenFrame(0).at(810, 540);
const listAt = screenFrame(0).at(330, 320);
const clockAt = screenFrame(0).at(820, 52);
const EDIT = edit([
  { name: 'save', from: 0, keys: [[0, btn.x - 60, btn.y, btn.z, 1500, -4, 3, 0, 85], [48, btn.x - 20, btn.y, btn.z, 1380, -2, 3, 0, 85]] },
  { name: 'office', from: C.loads[0], keys: [[C.loads[0], 0, -230, -260, 3600, -6, 5, 0, 50], [C.loads[1], 0, -230, -260, 3350, -3, 5, 0, 50]], kicks: [{ frames: [C.loads[0]], tau: 5, punch: 0.02, px: 5 }] },
  { name: 'list', from: C.loads[1], keys: [[C.loads[1], listAt.x, listAt.y, listAt.z, 1700, 6, 2, 0, 85], [C.loads[2], listAt.x, listAt.y, listAt.z, 1560, 4, 2, 0, 85]] },
  { name: 'mug', from: C.loads[2], keys: [[C.loads[2], MUG.x, MUG.y - 30, MUG.z, 1500, -14, 4, 0, 85], [C.loads[3], MUG.x, MUG.y - 30, MUG.z, 1300, -10, 4, 0, 85]], hand: { px: 5, roll: 0.3 } },
  { name: 'clock', from: C.loads[3], keys: [[C.loads[3], clockAt.x, clockAt.y, clockAt.z, 1100, 0, 1, 0, 85], [C.loads[4], clockAt.x, clockAt.y, clockAt.z, 980, 0, 1, 0, 85]] },
  { name: 'waiting', from: C.loads[4], keys: [[C.loads[4], 300, -300, -600, 4200, -14, 4, 0, 50], [C.knock, 700, -500, -900, 4000, -20, 3, 0, 50]], kicks: [{ frames: [C.loads[4]], tau: 5, punch: 0.02, px: 5 }] },
  { name: 'door', from: C.knock, keys: [[C.knock, DOOR.x, 1900, DOOR.z, 1800, -8, 4, 0, 35], [C.black, DOOR.x, 1950, DOOR.z, 1600, -6, 4, 0, 35]], hand: { px: 10, roll: 0.8, hz: 0.9 }, kicks: [{ frames: [C.knock, C.knock + 11, C.knock + 21], tau: 3, punch: 0.01, px: 8 }] },
  { name: 'saved', from: D, keys: [[D, btn.x - 20, btn.y, btn.z, 1500, -2, 3, 0, 85], [C.crane, btn.x - 20, btn.y, btn.z, 1650, -2, 3, 0, 85]] },
  {
    name: 'crane',
    from: C.crane,
    keys: [
      [C.crane, 0, -200, -300, 2600, 0, 8, 0, 35],
      [C.crane + 20, 0, 900, -500, 2600, 0, 40, 0, 35],
      [C.fall[4] + 10, -400, UY - 300, -900, 3400, 22, 26, 0, 28],
    ],
  },
  { name: 'lanes', from: C.fall[4] + 10, keys: [[C.fall[4] + 10, -400, UY - 300, -900, 3400, 22, 26, 0, 28], [C.stamps[1], 200, UY - 200, -900, 3000, 34, 20, 0, 28], [C.retry, 500, UY - 200, -1000, 2800, 40, 18, 0, 28]], hand: { px: 3 } },
  { name: 'switch', from: C.flagOff - 12, keys: [[C.flagOff - 12, SWITCH.x, SWITCH.y - 40, SWITCH.z, 1500, 12, 8, 0, 50], [C.up, SWITCH.x, SWITCH.y - 40, SWITCH.z, 1350, 8, 8, 0, 50]], kicks: [{ frames: [C.flagOff, C.flagOn], tau: 4, punch: 0.02, px: 6 }] },
  {
    name: 'up',
    from: C.up,
    keys: [
      [C.up, -400, UY - 300, -900, 3200, 0, 30, 0, 28],
      [C.up + 22, 0, 600, -500, 2800, 0, 40, 0, 35],
      [C.lid - 10, 600, -500, -700, 4600, -12, 5, 0, 50],
      [C.end, 500, -400, -600, 4400, -10, 5, 0, 50],
    ],
  },
]);

const Redact: React.FC<{ w: number; h?: number }> = ({ w, h = 14 }) => <span style={{ display: 'inline-block', width: w, height: h, borderRadius: 4, background: 'rgba(242,239,228,0.2)', verticalAlign: 'middle' }} />;

const Shield: React.FC<{ size: number; color: string; check?: number }> = ({ size, color, check = 1 }) => (
  <svg width={size} height={size * 1.3} viewBox="-6 -6 132 172">
    <path d="M60 0 L120 30 L120 80 C120 120 90 150 60 160 C30 150 0 120 0 80 L0 30 Z" fill="none" stroke={color} strokeWidth={8} strokeLinejoin="round" />
    <path d="M32 82 L54 104 L92 60" fill="none" stroke={color} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${check} 1`} />
  </svg>
);

/** What the therapist sees: the Alma note. Before the drop, in the world where everything rides on Save. */
const Screen: React.FC<{ f: number }> = ({ f }) => {
  const saving = f >= C.click + 2 && f < D;
  const saved = f >= D;
  const pressed = (f >= C.click && f < C.click + 5) || (f >= D - 3 && f < D + 2);
  const n = C.loads.filter((l) => f >= l).length;
  const drag = n / JOBS.length;
  const minute = saved ? (f > C.up + 30 ? 11 * 60 : 10 * 60 + 59) : f < C.loads[3] ? 10 * 60 + 52 + Math.floor((f / C.loads[3]) * 5) : 10 * 60 + 58 + (f >= C.clock[1] ? 1 : 0);
  const clock = `${Math.floor(minute / 60)}:${String(minute % 60).padStart(2, '0')}`;
  const spin = (f * (14 - 11 * drag)) % 360;
  const sT = settle(prog(f, D, D + 10), 1.2);
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0c1411', fontFamily: SANS, color: '#eef3f0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 30px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#0a100e' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: '#fff', letterSpacing: '-0.02em' }}>Al</div>
          <span style={{ fontSize: 20, fontWeight: 600 }}>Reassessment · Week 6</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ ...rec(1, 0, 600), fontSize: 30, color: minute >= 10 * 60 + 58 && !saved ? '#ff8a6b' : '#eef3f0', fontVariantNumeric: 'tabular-nums' }}>{clock}</div>
          <div style={{ fontSize: 13, color: 'rgba(238,243,240,0.55)' }}>next client 11:00</div>
        </div>
      </div>
      <div style={{ padding: '22px 30px', fontSize: 18, color: 'rgba(238,243,240,0.7)', lineHeight: 2 }}>
        <div>
          Client <Redact w={110} /> <Redact w={70} />
        </div>
        <div>
          Progress <Redact w={90} /> <Redact w={140} /> <Redact w={40} />
        </div>
      </div>
      {!saved && n > 0 ? (
        <div style={{ position: 'absolute', left: 30, right: 30, top: 200 }}>
          <div style={{ ...rec(1, 0, 600), fontSize: 13, letterSpacing: '0.16em', color: '#ff8a6b', marginBottom: 8 }}>ALSO RUNNING INSIDE THIS REQUEST</div>
          {JOBS.slice(0, n).map((j, i) => {
            const a = settle(prog(f, C.loads[i], C.loads[i] + 8), 1.0);
            return (
              <div key={j.label} style={{ display: 'flex', alignItems: 'center', gap: 12, height: 44, borderBottom: '1px solid rgba(255,255,255,0.06)', transform: `translateX(${(1 - clamp(a)) * -40}px)`, opacity: clamp(a * 2), fontSize: 22 }}>
                <span style={{ width: 16, height: 16, borderRadius: 8, border: '2px solid rgba(255,138,107,0.8)', borderTopColor: 'transparent', transform: `rotate(${(f * 9 + i * 50) % 360}deg)` }} />
                {j.label}
                {j.phi ? <span style={{ ...rec(1, 0, 600), fontSize: 11, padding: '2px 6px', borderRadius: 4, background: 'rgba(255,87,56,0.18)', color: '#ff8a6b' }}>PHI</span> : null}
              </div>
            );
          })}
        </div>
      ) : null}
      {saved ? (
        <div style={{ position: 'absolute', left: 30, right: 30, top: 214, opacity: HOUSE(prog(f, D + 6, D + 20)) }}>
          <div style={{ ...rec(1, 0, 600), fontSize: 13, letterSpacing: '0.16em', color: MINT }}>5 BACKGROUND STAGES QUEUED · AUDITED · REVERSIBLE</div>
          <div style={{ marginTop: 10, fontSize: 22, color: 'rgba(238,243,240,0.7)' }}>Nothing else runs inside Save.</div>
        </div>
      ) : null}
      <div
        style={{
          position: 'absolute',
          right: 30,
          bottom: 30,
          height: 64,
          minWidth: 190,
          padding: '0 26px',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          background: saved ? MINT : pressed ? '#0e5a41' : '#127a58',
          color: saved ? '#032017' : '#fff',
          fontSize: 26,
          fontWeight: 650,
          transform: `scale(${pressed ? 0.94 : saved ? mix(0.9, 1, sT) : 1})`,
          boxShadow: saved ? `0 0 40px rgba(0,229,160,${0.5 * Math.exp(-(f - D) / 20)})` : 'none',
        }}
      >
        {saving ? (
          <>
            <span style={{ width: 22, height: 22, borderRadius: 11, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', transform: `rotate(${spin}deg)` }} />
            Saving{'.'.repeat(1 + (Math.floor(f / 20) % 3))}
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

/** The office wall: plaster, a blue-hour window with the city, the door (light under it; open at the end). */
const Wall: React.FC<{ f: number }> = ({ f }) => {
  const open = HOUSE(prog(f, C.up + 30, C.lid - 10));
  const knock = f >= C.knock && f < C.knock + 30 ? Math.exp(-((f - C.knock) % 11) / 3) : 0;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #3a2a1e 0%, #5a4230 45%, #33251a 100%)' }}>
      <div style={{ position: 'absolute', left: 5600, top: 1200, width: 3200, height: 4200, background: 'radial-gradient(ellipse, rgba(255,190,120,0.35), transparent 65%)' }} />
      <div style={{ position: 'absolute', left: 3400, top: 2100, width: 2000, height: 3000, background: 'linear-gradient(180deg, #1b2a4a 0%, #3c4f7a 55%, #b9866a 100%)', boxShadow: 'inset 0 0 0 60px #2a1d14' }}>
        {new Array(70).fill(0).map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: 80 + random(`wx${i}`) * 1840, top: 1700 + random(`wy${i}`) * 1100, width: 10 + random(`ws${i}`) * 22, height: 10 + random(`ws${i}`) * 22, borderRadius: '50%', background: random(`wc${i}`) > 0.7 ? '#ffd9a0' : '#fff2d8', opacity: 0.5 + 0.5 * random(`wa${i}`), filter: 'blur(3px)' }} />
        ))}
        <div style={{ position: 'absolute', left: 970, top: 0, width: 60, bottom: 0, background: '#2a1d14' }} />
        <div style={{ position: 'absolute', top: 1450, left: 0, right: 0, height: 60, background: '#2a1d14' }} />
      </div>
      <div style={{ position: 'absolute', left: 7100, top: 2250, width: 1300, height: 6000, background: '#4a3322', boxShadow: 'inset 0 0 0 40px #3a281a' }}>
        <div style={{ position: 'absolute', left: 1080, top: 3200, width: 90, height: 90, borderRadius: 45, background: '#c9a46a' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, rgba(255,200,130,${0.85 * open}), rgba(255,200,130,${0.4 * open}))`, transformOrigin: '0% 50%', transform: `scaleX(${open})` }} />
      </div>
      <div style={{ position: 'absolute', left: 7100, top: 8180, width: 1300, height: 70, background: `rgba(255,205,140,${0.55 + 0.4 * knock})`, boxShadow: `0 0 120px rgba(255,190,120,${0.6 + 0.4 * knock})` }}>
        {/* someone is waiting: two shadows in the light under the door */}
        {f >= C.knock - 20 && f < C.up ? [380, 760].map((x) => <div key={x} style={{ position: 'absolute', left: x, top: 0, width: 180, height: 70, background: 'rgba(20,12,6,0.85)', filter: 'blur(14px)', opacity: HOUSE(prog(f, C.knock - 20, C.knock - 4)) }} />) : null}
      </div>
    </div>
  );
};

/** The mug and its steam: the steam freezes while Save drags, and moves again once saved. */
const Mug: React.FC<{ f: number }> = ({ f }) => {
  const frozen = f >= C.loads[2] && f < D;
  const t = frozen ? C.loads[2] : f;
  return (
    <svg width={180} height={260} viewBox="0 0 180 260">
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M${60 + k * 28} 110 C${50 + k * 28 + 16 * Math.sin(t / 14 + k)} 80 ${74 + k * 28 - 14 * Math.sin(t / 11 + k)} 50 ${58 + k * 28 + 10 * Math.sin(t / 9 + k)} 10`} stroke={`rgba(255,240,220,${frozen ? 0.25 : 0.5})`} strokeWidth={6} fill="none" strokeLinecap="round" />
      ))}
      <rect x={30} y={120} width={110} height={130} rx={16} fill="#e9dfcf" />
      <path d="M140 150 C175 150 175 215 140 215" stroke="#e9dfcf" strokeWidth={14} fill="none" />
      <rect x={30} y={120} width={110} height={18} rx={8} fill="#6b4a2e" />
    </svg>
  );
};

const Lamp: React.FC = () => (
  <svg width={520} height={1120} viewBox="0 0 520 1120">
    <path d="M110 0 L410 0 L500 300 L20 300 Z" fill="#c8963e" />
    <path d="M40 300 L480 300" stroke="#ffe2a8" strokeWidth={10} />
    <rect x={245} y={300} width={30} height={740} fill="#a57a33" />
    <ellipse cx={260} cy={1080} rx={180} ry={40} fill="#8a6428" />
  </svg>
);

const Office: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const sf = screenFrame(f);
  return (
    <>
      <Plane cam={cam} c={v3(0, -1500, -3000)} w={12000} h={9000} z={-300000}>
        <Wall f={f} />
      </Plane>
      <Box cam={cam} c={v3(0, 60, -200)} size={[4200, 120, 1700]} color="#3a2616" edge="rgba(0,0,0,0.3)" z={-200000} top={<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #4a3020, #6a4630 45%, #4a3020)', backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0 3px, transparent 3px 60px)' }} />} />
      <Plane cam={cam} c={v3(-760, -2, -40)} U={v3(0.97, 0, -0.24)} V={v3(0.24, 0, 0.97)} w={260} h={260} z={2000}>
        <div style={{ position: 'absolute', inset: 0, background: '#f6e27a', padding: 24, fontFamily: SANS, fontSize: 30, color: '#3a3210', lineHeight: 1.25, boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
          11:00
          <br />
          next client
        </div>
      </Plane>
      <Box cam={cam} c={v3(0, -11, -90)} size={[SW + 20, 22, 600]} color="#b9bdc3" edge="rgba(0,0,0,0.25)" z={1000} top={<div style={{ position: 'absolute', inset: 30, borderRadius: 10, background: '#2b2e33' }} />} />
      <Plane cam={cam} c={sf.center} U={X} V={sf.V} w={SW} h={SH} oneSided z={5000}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 18, background: '#16181c', padding: 16 }}>
          <div style={{ position: 'absolute', inset: 16, borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ width: SW, height: SH, transform: `scale(${(SW - 32) / SW}, ${(SH - 32) / SH})`, transformOrigin: '0 0', position: 'relative' }}>
              <Screen f={f} />
            </div>
          </div>
        </div>
      </Plane>
      <Plane cam={cam} c={sf.center} U={vscale(X, -1)} V={sf.V} w={SW} h={SH} oneSided z={5000}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 18, background: 'linear-gradient(160deg, #cfd3d8, #a9aeb5)' }}>
          <div style={{ position: 'absolute', left: SW / 2 - 60, top: SH / 2 - 60, width: 120, height: 120, borderRadius: 26, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: SANS, fontWeight: 700, fontSize: 40 }}>Al</div>
        </div>
      </Plane>
      <Plane cam={cam} c={MUG} w={180} h={260} z={6000}>
        <Mug f={f} />
      </Plane>
      <Plane cam={cam} c={v3(1500, -560, -700)} w={520} h={1120} z={4000}>
        <Lamp />
      </Plane>
    </>
  );
};

type JobState = 'lane' | 'ok' | 'fail';
const Crate: React.FC<{ i: number; state: JobState }> = ({ i, state }) => {
  const j = JOBS[i];
  const col = state === 'ok' ? MINT : state === 'fail' ? '#ff6b52' : 'rgba(238,243,240,0.85)';
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '18px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: SANS }}>
      <div style={{ ...rec(1, 0, 600), fontSize: 16, letterSpacing: '0.14em', color: 'rgba(0,229,160,0.7)' }}>CELERY STAGE · DURABLE</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 34, fontWeight: 650, color: '#eef3f0' }}>
        {j.label}
        {j.phi ? <span style={{ ...rec(1, 0, 600), fontSize: 13, padding: '3px 7px', borderRadius: 4, background: 'rgba(255,87,56,0.2)', color: '#ff8a6b' }}>PHI</span> : null}
        <span style={{ marginLeft: 'auto', color: col, fontSize: state === 'fail' ? 18 : 38, ...(state === 'fail' ? rec(1, 0, 700) : {}) }}>{state === 'ok' ? '✓' : state === 'fail' ? 'RETRY 2/3' : ''}</span>
      </div>
    </div>
  );
};

const Underworld: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => {
  const flagOff = f >= C.flagOff && f < C.flagOn;
  let flowT = 0;
  for (let k = C.fall[4]; k <= f; k++) if (!(k >= C.flagOff && k < C.flagOn)) flowT++;
  const lanes = JOBS.map((_, i) => {
    const pts = [];
    for (let x = LANE_X0; x <= GATE_X + 900; x += 60) pts.push(project(cam, v3(x, UY, LANE_Z(i))));
    return pts.filter((p) => p.d > 40);
  });
  return (
    <>
      <Plane cam={cam} c={v3(0, UY + 2, -1000)} U={X} V={Z} w={9000} h={6000} z={-400000}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 55%, #0c4a34 0%, #062b1f 45%, #03150f 100%)', backgroundImage: 'linear-gradient(rgba(0,229,160,0.08) 3px, transparent 3px), linear-gradient(90deg, rgba(0,229,160,0.08) 3px, transparent 3px)', backgroundSize: '300px 300px' }} />
      </Plane>
      <Plane cam={cam} c={v3(0, UY - 1500, -4200)} w={14000} h={5000} z={-390000}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 70%, rgba(0,229,160,0.35), rgba(3,41,28,0.9) 50%, #03150f 80%)' }} />
      </Plane>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'visible' }}>
        <defs>
          <filter id="ug" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={6} />
          </filter>
        </defs>
        {lanes.map((pts, i) => (pts.length > 1 ? <path key={i} d={polyline(pts)} stroke={flagOff ? 'rgba(238,243,240,0.15)' : MINT} strokeWidth={4} strokeDasharray="14 12" fill="none" opacity={0.8} /> : null))}
        {!flagOff && f >= C.fall[4]
          ? JOBS.map((_, i) =>
              [0, 1, 2].map((k) => {
                const x = LANE_X0 + ((flowT * 11 + k * 700 + i * 233) % (GATE_X + 900 - LANE_X0));
                const p = project(cam, v3(x, UY - 8, LANE_Z(i)));
                return p.d > 40 ? <circle key={`${i}${k}`} cx={p.sx} cy={p.sy} r={Math.max(3, 12 * p.s)} fill={x > GATE_X ? MINT : '#eef3f0'} filter="url(#ug)" /> : null;
              })
            )
          : null}
      </svg>
      {JOBS.map((_, i) => {
        const fall = C.fall[i];
        if (f < fall - 16) return null;
        const drop = clamp(prog(f, fall - 16, fall) ** 2);
        const at = GATE_AT[i];
        let x: number;
        let state: JobState = 'lane';
        if (i === 2) {
          if (f < C.fail) x = mix(LANE_X0, GATE_X - 360, RESOLVE(prog(f, fall, C.fail)));
          else if (f < C.retry - 30) x = GATE_X - 360 - 160 * settle(prog(f, C.fail, C.fail + 12), 0.4);
          else x = mix(GATE_X - 520, GATE_X + 700, HOUSE(prog(f, C.retry - 30, C.retry + 50)));
          state = f >= C.retry ? 'ok' : f >= C.fail ? 'fail' : 'lane';
        } else {
          x = f < at ? mix(LANE_X0, GATE_X - 360, RESOLVE(prog(f, fall, at))) : mix(GATE_X - 360, GATE_X + 700, HOUSE(prog(f, at, at + 60)));
          state = f >= at ? 'ok' : 'lane';
        }
        const y = mix(UY - 1600, UY - 90, drop);
        const edge = state === 'ok' ? 'rgba(0,229,160,0.8)' : state === 'fail' ? 'rgba(255,107,82,0.9)' : 'rgba(238,243,240,0.25)';
        return <Box key={i} cam={cam} c={v3(x, y, LANE_Z(i))} size={[620, 180, 240]} color="#0e2b21" fog={FOG} face={<Crate i={i} state={state} />} edge={edge} />;
      })}
      {JOBS.map((_, i) => {
        const at = GATE_AT[i];
        const ok = f >= at;
        const bad = i === 2 && f >= C.fail && f < C.retry;
        const flash = ok ? Math.exp(-(f - at) / 8) : bad ? Math.exp(-(f - C.fail) / 6) : 0;
        const col = bad ? '#ff6b52' : ok ? MINT : 'rgba(238,243,240,0.35)';
        return (
          <Plane key={`g${i}`} cam={cam} c={v3(GATE_X, UY - 200, LANE_Z(i))} U={vscale(Z, -1)} V={Y} w={300} h={390} fog={FOG}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: `drop-shadow(0 0 ${30 * flash + 6}px ${col})` }}>
              <Shield size={280} color={col} check={ok ? HOUSE(prog(f, at, at + 8)) : 0} />
            </div>
          </Plane>
        );
      })}
      <Box cam={cam} c={v3(SWITCH.x, SWITCH.y + 30, SWITCH.z)} size={[520, 60, 320]} color="#0e2b21" fog={FOG} edge="rgba(0,229,160,0.4)" />
      <Plane cam={cam} c={v3(SWITCH.x, SWITCH.y - 130, SWITCH.z + 162)} w={520} h={260} fog={FOG}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 30, background: '#0a1d16', boxShadow: `inset 0 0 0 3px ${flagOff ? '#ff6b52' : MINT}`, padding: '26px 32px', fontFamily: SANS }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <div style={{ width: 150, height: 80, borderRadius: 40, background: flagOff ? 'rgba(238,243,240,0.16)' : MINT, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 8, left: flagOff ? 8 : 78, width: 64, height: 64, borderRadius: 32, background: '#03150f' }} />
            </div>
            <div>
              <div style={{ ...rec(1, 0, 650), fontSize: 30, color: '#eef3f0' }}>reassessments_v2</div>
              <div style={{ ...rec(1, 0, 650), fontSize: 20, marginTop: 6, color: flagOff ? '#ff6b52' : MINT }}>{flagOff ? 'OFF · ROLLBACK PATH' : 'ON · REVERSIBLE'}</div>
            </div>
          </div>
        </div>
      </Plane>
    </>
  );
};

export const Alma: React.FC = () => {
  const f = useCurrentFrame();
  const { cam, shot } = EDIT.at(f);
  const inOffice = !['lanes', 'switch'].includes(shot.name) && !(shot.name === 'crane' && f > C.crane + 24) && !(shot.name === 'up' && f < C.up + 14);
  const macro = ['save', 'list', 'clock', 'saved'].includes(shot.name);
  const FOCUS: Record<string, number> = { save: 1440, list: 1620, clock: 1040, saved: 1560, mug: 1400, door: 1600, switch: 1420, office: 3500, waiting: 4100, up: 4500 };
  const dof = { focus: FOCUS[shot.name] ?? 3500, aperture: macro ? 1.4 : shot.name === 'mug' ? 1.6 : ['lanes', 'switch', 'crane'].includes(shot.name) ? 0.25 : 0.7, max: 12 };
  const black = f >= C.black && f < D;
  const typed = 'In Alma, Save only saves.';
  const typeT = prog(f, C.type[0] - 4, C.type[3] + 2);
  const lbox = ['waiting', 'door', 'crane', 'lanes', 'up'].includes(shot.name) ? 1 : 0;
  const label = shot.name === 'lanes' || shot.name === 'switch' ? 'WHAT ACTUALLY RUNS · ALMA BACKEND · HIPAA' : f < D ? 'IF EVERYTHING RODE ON SAVE' : 'IN ALMA';
  const lamp = project(cam, v3(1500, -700, -700));
  return (
    <AbsoluteFill style={{ background: inOffice ? '#1a120c' : '#03150f', overflow: 'hidden' }}>
      <Blur
        ranges={[
          [C.crane + 4, C.fall[4] + 12, 6],
          [C.up, C.up + 26, 6],
        ]}
      >
        <DofCtx.Provider value={dof}>
          <AbsoluteFill style={{ isolation: 'isolate' }}>{inOffice ? <Office f={f} cam={cam} /> : <Underworld f={f} cam={cam} />}</AbsoluteFill>
        </DofCtx.Provider>
      </Blur>
      {inOffice ? (
        <>
          {lamp.d > 40 ? <Glow x={lamp.sx} y={lamp.sy} r={900} color="rgba(255,180,107,0.55)" a={0.7} /> : null}
          <Grade tint={AMBER} a={0.22} />
        </>
      ) : (
        <>
          <Bokeh n={26} seed="ab" colors={['rgba(0,229,160,0.5)', 'rgba(238,243,240,0.35)']} area={[0, 0, 1920, 700]} size={[10, 40]} f={f} a={0.35} />
          <Grade tint={MINT} a={0.12} />
        </>
      )}
      {!black && f < C.end ? (
        <div style={{ position: 'absolute', left: 120, top: 88, ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.2em', color: f < D ? AMBER : MINT, zIndex: 910000, opacity: f < 30 ? HOUSE(prog(f, 12, 30)) : 1 }}>{label}</div>
      ) : null}
      {black ? (
        <AbsoluteFill style={{ background: '#000', justifyContent: 'center', alignItems: 'center', zIndex: 920000 }}>
          <div style={{ fontFamily: SANS, fontSize: 84, fontWeight: 650, color: '#fff', letterSpacing: '-0.02em', whiteSpace: 'pre' }}>
            {typed.slice(0, Math.floor(typeT * typed.length))}
            <span style={{ color: MINT, opacity: Math.floor(f / 10) % 2 }}>▌</span>
          </div>
        </AbsoluteFill>
      ) : null}
      <Letterbox t={lbox} />
      <Flash a={f >= D ? 0.2 * Math.exp(-(f - D) / 5) : 0} color="0,229,160" />
      <BrandEnd
        g={g}
        from={C.end}
        bg={`radial-gradient(ellipse at 50% 40%, #0a4a33, ${GREEN} 70%)`}
        accent={MINT}
        kicker="HIPAA · PRODUCTION · 2.7 YEARS"
        logo={
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <Shield size={110} color={MINT} check={HOUSE(prog(f, C.end + 14, C.end + 30))} />
            <div style={{ fontFamily: SANS, fontSize: 190, fontWeight: 700, letterSpacing: '-0.04em', color: '#fff' }}>Alma</div>
          </div>
        }
        line="Clinical systems that had to earn adoption and survive inspection."
      >
        <div style={{ display: 'flex', gap: 70, marginTop: 10, opacity: RESOLVE(prog(f, C.end + 40, C.end + 70)) }}>
          {[
            ['72%', 'ADOPTION · SELF-REPORTED'],
            ['999', 'COMMITS'],
            ['2.7 yrs', 'HIPAA PRODUCTION'],
          ].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: SANS, fontSize: 56, fontWeight: 700, color: '#fff' }}>{resolveText(''.padEnd(n.length, ' '), n, RESOLVE(prog(f, C.end + 40, C.end + 70)), `al${l}`, f)}</div>
              <div style={{ ...rec(1, 0, 500), fontSize: 15, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </BrandEnd>
      <Dip f={f} at={C.black} len={2} />
      <Vignette s={0.55} />
      <Grain />
      <Audio src={staticFile('audio/alma_mix.wav')} />
    </AbsoluteFill>
  );
};
