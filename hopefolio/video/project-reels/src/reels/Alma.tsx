import React from 'react';
import { AbsoluteFill, random, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';
import { Cam, X, Z, edit, v3 } from '../lib/space';
import { Box, DofCtx, Plane } from '../lib/World';
import { Dust, Glow, Letterbox } from '../lib/Env';
import { BrandEnd } from '../lib/BrandEnd';
import { at, handheld, pulse, sub } from '../lib/score';
import hitsJson from '../data/hits_alma.json';

/**
 * ALMA v4: "Two clinicians, a thousand notes."
 *
 * Told the way Hope tells it. Insurance needs therapy notes to be auditable;
 * the goal was a thousand audits a month, and the people doing it were two
 * clinical reviewers reading a Metabase table one row at a time. One card,
 * then the impossible drone rise: a field of a thousand notes to the horizon
 * with two desk lamps at its edge. Hope ran a two-day prototype sprint with
 * the clinical lead: the AI reads first, clinicians judge. On the drop a mint
 * scan line crosses the field; nine in ten cards go quiet, the rest stand up
 * for a human (from directly above, the flagged cards spell CARE for a moment).
 * Then the person on the other side: a therapist's compliance hub, where a
 * strike tracks toward a violation (the stick) and a coaching tip fixes the
 * next note (the carrot). Underneath, the two-way workflow survives the partner
 * going quiet: signed, idempotent webhooks; polling takes over; an alert fires;
 * nothing is lost. 72% of eligible clinicians adopted it.
 *
 * Camera psychology: overwhelm rises (the higher we go, the smaller the people);
 * the table is handheld and close (reading, reading); the scan is a slow,
 * stately aerial; the therapist is eye level and still (dignity).
 * Note content is illustrative; no names, no patient data.
 */
const g = GRIDS.alma;
const M = g.markers as Record<string, number>;
const H = { hat: at(hitsJson.hat as [number, number][]), snare: at(hitsJson.snare as [number, number][]), kick: at(hitsJson.kick as [number, number][]), note: hitsJson.note as number[] };
const DASH = Math.round(M.dash);
const SPRINT = Math.round(M.sprint);
const D = Math.round(M.drop);
const FLAG = Math.round(M.flagged);
const HUB = Math.round(M.hub);
const WIRE = Math.round(M.wire);
const OUTC = Math.round(M.outcome);
const END = Math.round(M.end);
const beats = g.beats;

const MINT = '#00e5a0';
const GREEN = '#03291c';
const AMBER = '#ffb46b';
const RED = '#ff6b52';
const CREAM = '#efe9dc';
const SANS = 'system-ui, -apple-system, "Helvetica Neue", sans-serif';

// ── the field: 40 × 25 = 1,000 notes
const COLS = 40;
const ROWS = 25;
const CW = 180;
const CH = 120;
const PX = 210;
const PZ = 150;
const FW = COLS * PX;
const FD = ROWS * PZ;
const cellX = (c: number) => (c - (COLS - 1) / 2) * PX;
const cellZ = (r: number) => (r - (ROWS - 1) / 2) * PZ;
// the flagged cards spell CARE from directly above (5×7 glyphs)
const GLYPH: Record<string, string[]> = {
  C: ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
};
const FLAGGED = new Set<string>();
'CARE'.split('').forEach((ch, li) => {
  GLYPH[ch].forEach((row, r) => row.split('').forEach((px, c) => px === '#' && FLAGGED.add(`${7 + li * 7 + c},${8 + r}`)));
});
const FAILED = new Set<string>();
for (let i = 0; i < 14; i++) FAILED.add(`${Math.floor(random(`fx${i}`) * COLS)},${Math.floor(random(`fy${i}`) * ROWS)}`);
// camouflage: ordinary flags scattered everywhere, so CARE only resolves from directly above
for (let i = 0; i < 70; i++) FLAGGED.add(`${Math.floor(random(`gx${i}`) * COLS)},${Math.floor(random(`gy${i}`) * ROWS)}`);
const NEEDS = FLAGGED.size + FAILED.size;
const HERO = { c: 20, r: 20 };

// the scan crosses the field near → far on the drop
const scanRow = (f: number) => mix(ROWS + 1, -2, prog(f, D, D + 70));
const cardState = (c: number, r: number, f: number) => {
  if (f < D || r < scanRow(f)) return 'pending';
  const k = `${c},${r}`;
  return FAILED.has(k) ? 'fail' : FLAGGED.has(k) ? 'flag' : 'pass';
};

const Shield: React.FC<{ size: number; color: string; check?: number; stroke?: number }> = ({ size, color, check = 1, stroke = 8 }) => (
  <svg width={size} height={size * 1.3} viewBox="-6 -6 132 172">
    <path d="M60 0 L120 30 L120 80 C120 120 90 150 60 160 C30 150 0 120 0 80 L0 30 Z" fill="none" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
    <path d="M32 82 L54 104 L92 60" fill="none" stroke={color} strokeWidth={stroke * 1.4} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${check} 1`} />
  </svg>
);

const Field: React.FC<{ f: number }> = ({ f }) => {
  const sr = scanRow(f);
  const settled = f >= D + 76;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {new Array(COLS * ROWS).fill(0).map((_, i) => {
        const c = i % COLS;
        const r = Math.floor(i / COLS);
        const st = cardState(c, r, f);
        const hero = c === HERO.c && r === HERO.r;
        const flipT = st === 'pending' ? 0 : clamp((r - sr) / 1.6);
        const bg = st === 'pending' ? (hero && f < DASH ? '#fffaf0' : CREAM) : st === 'pass' ? mix(1, 0, flipT) > 0.5 ? CREAM : '#0c3326' : st === 'flag' ? AMBER : RED;
        const stand = (st === 'flag' || st === 'fail') && settled ? 1 : 0;
        return (
          <div key={i} style={{ position: 'absolute', left: c * PX + (PX - CW) / 2, top: r * PZ + (PZ - CH) / 2, width: CW, height: CH, borderRadius: 8, background: bg, boxShadow: stand ? `0 0 40px ${st === 'fail' ? RED : AMBER}` : '0 3px 0 rgba(0,0,0,0.25)', padding: '14px 16px', opacity: st === 'pass' ? mix(1, 0.75, flipT) : 1 }}>
            {st === 'pending' || flipT < 0.5 ? (
              <>
                <div style={{ height: 9, width: '55%', borderRadius: 4, background: 'rgba(40,40,30,0.45)' }} />
                <div style={{ height: 6, width: '90%', borderRadius: 3, background: 'rgba(40,40,30,0.2)', marginTop: 12 }} />
                <div style={{ height: 6, width: '80%', borderRadius: 3, background: 'rgba(40,40,30,0.2)', marginTop: 8 }} />
                <div style={{ height: 6, width: '66%', borderRadius: 3, background: 'rgba(40,40,30,0.2)', marginTop: 8 }} />
              </>
            ) : st === 'pass' ? (
              <svg width={40} height={40} viewBox="0 0 40 40" style={{ position: 'absolute', right: 14, bottom: 12 }}>
                <path d="M8 21 L17 30 L33 12" stroke={MINT} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
              </svg>
            ) : (
              <div style={{ fontFamily: SANS, fontSize: 64, fontWeight: 800, color: '#2a1406', lineHeight: '90px', textAlign: 'center' }}>{st === 'fail' ? '×' : '!'}</div>
            )}
          </div>
        );
      })}
      {/* the scan line */}
      {f >= D && f < D + 74 ? <div style={{ position: 'absolute', left: -200, right: -200, top: sr * PZ - 6, height: 12, background: MINT, boxShadow: `0 0 60px 20px ${MINT}, 0 0 200px 80px rgba(0,229,160,0.35)` }} /> : null}
    </div>
  );
};

const LampDesk: React.FC<{ cam: Cam; x: number; f: number }> = ({ cam, x, f }) => {
  const z = FD / 2 + 520;
  const calm = f >= OUTC;
  return (
    <>
      <Plane cam={cam} c={v3(x, -2, z)} U={X} V={Z} w={1400} h={1400} z={-150000}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, rgba(255,210,140,${calm ? 0.55 : 0.4}) 0%, rgba(255,190,120,0.12) 40%, transparent 70%)` }} />
      </Plane>
      <Box cam={cam} c={v3(x, -80, z)} size={[420, 20, 240]} color="#4a3524" edge="rgba(0,0,0,0.3)" top={<div style={{ position: 'absolute', inset: 0, background: '#6b4b31' }} />} />
      <Box cam={cam} c={v3(x - 150, -260, z - 80)} size={[16, 340, 16]} color="#2a2a2a" />
      <Plane cam={cam} c={v3(x - 120, -440, z - 80)} w={120} h={70}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '60px 60px 10px 10px', background: '#2a2a2a', boxShadow: '0 30px 60px 10px rgba(255,210,140,0.7)' }} />
      </Plane>
      {/* the reviewer: a chair back and a silhouette */}
      <Plane cam={cam} c={v3(x + 40, -200, z + 170)} w={170} h={300}>
        <svg width={170} height={300} viewBox="0 0 170 300">
          <circle cx={85} cy={60} r={42} fill="#1b1310" />
          <path d="M10 300 C10 150 40 110 85 110 C130 110 160 150 160 300 Z" fill="#1b1310" />
        </svg>
      </Plane>
    </>
  );
};

const FieldWorld: React.FC<{ f: number; cam: Cam }> = ({ f, cam }) => (
  <>
    <Plane cam={cam} c={v3(0, -3000, -9000)} w={40000} h={12000} z={-500000}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, #020d09 0%, #06261b 55%, #0b3a29 75%, #041a12 100%)` }} />
    </Plane>
    <Plane cam={cam} c={v3(0, 4, 0)} U={X} V={Z} w={FW + 12000} h={FD + 12000} z={-400000}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, #0a2e21 20%, #03150f 70%)' }} />
    </Plane>
    <Plane cam={cam} c={v3(0, 0, 0)} U={X} V={Z} w={FW} h={FD} z={-300000}>
      <Field f={f} />
    </Plane>
    <LampDesk cam={cam} x={-700} f={f} />
    <LampDesk cam={cam} x={700} f={f} />
  </>
);

// ── the Metabase table: reading them one by one
const TableScene: React.FC<{ f: number }> = ({ f }) => {
  const scroll = (f - DASH) * 4.2;
  const hh = handheld(f, 6, 0.35, 2);
  const rows = new Array(40).fill(0).map((_, i) => {
    const n = 963 - Math.floor(scroll / 44) - i;
    return { id: 48213 - n * 7, type: ['Progress note', 'Treatment plan', 'Progress note', 'Reassessment', 'Progress note'][i % 5], clin: `Clinician ${String.fromCharCode(65 + ((i * 7) % 26))}.`, date: `Oct ${1 + ((i * 3) % 28)}` };
  });
  return (
    <AbsoluteFill style={{ background: '#e9eef3' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `translate(${hh.x}px, ${hh.y}px) rotate(${hh.r}deg) scale(${mix(1.12, 1.24, prog(f, DASH, SPRINT))})`, transformOrigin: '60% 40%', fontFamily: '"Lato", "Helvetica Neue", sans-serif', color: '#4c5773' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 250, background: '#fff', borderRight: '1px solid #eeecec', padding: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#509ee3' }}>▦ Metabase</div>
          {['Home', 'Collections', 'Clinical QA', 'Audits'].map((t, i) => (
            <div key={t} style={{ fontSize: 17, marginTop: 22, fontWeight: i === 3 ? 800 : 500, color: i === 3 ? '#509ee3' : '#4c5773' }}>{t}</div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 280, right: 40, top: 30 }}>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#2e353b' }}>Notes pending audit</div>
          <div style={{ fontSize: 17, marginTop: 6 }}>Clinical QA · October · <b style={{ color: '#ed6e6e' }}>{963 - Math.floor(scroll / 440)} rows</b> · audited this month: 37</div>
          <div style={{ marginTop: 18, borderRadius: 8, background: '#fff', border: '1px solid #eeecec', height: 860, overflow: 'hidden', position: 'relative' }}>
            <div style={{ display: 'flex', height: 50, alignItems: 'center', padding: '0 20px', fontSize: 15, fontWeight: 900, color: '#509ee3', borderBottom: '1px solid #eeecec', background: '#fafbfc', position: 'relative', zIndex: 2 }}>
              {['Note ID', 'Type', 'Clinician', 'Date', 'Status'].map((h, i) => (
                <span key={h} style={{ width: [160, 280, 280, 180, 300][i] }}>{h}</span>
              ))}
            </div>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 50 - (scroll % 44) }}>
              {rows.map((r, i) => (
                <div key={i} style={{ display: 'flex', height: 44, alignItems: 'center', padding: '0 20px', fontSize: 16, borderBottom: '1px solid #f3f3f3' }}>
                  <span style={{ width: 160, color: '#509ee3' }}>{r.id}</span>
                  <span style={{ width: 280 }}>{r.type}</span>
                  <span style={{ width: 280 }}>{r.clin}</span>
                  <span style={{ width: 180 }}>{r.date}</span>
                  <span style={{ width: 300, color: '#ed6e6e', fontWeight: 700 }}>Needs review</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse 70% 70% at 55% 45%, transparent 50%, rgba(3,21,15,0.75))' }} />
    </AbsoluteFill>
  );
};

// ── the sprint: two days, one prototype
const Sprint: React.FC<{ f: number }> = ({ f }) => {
  const t1 = HOUSE(prog(f, SPRINT, SPRINT + 12));
  const t2 = HOUSE(prog(f, SPRINT + 16, SPRINT + 28));
  const t3 = HOUSE(prog(f, SPRINT + 32, SPRINT + 50));
  const node = (label: string, sub2: string, x: number, col: string, t: number) => (
    <div style={{ position: 'absolute', left: x, top: 640, width: 330, padding: '20px 22px', borderRadius: 18, border: `2px solid ${col}`, background: 'rgba(3,21,15,0.8)', opacity: t, transform: `translateY(${(1 - t) * 20}px)` }}>
      <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 750, color: '#fff' }}>{label}</div>
      <div style={{ ...rec(1, 0, 500), fontSize: 18, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{sub2}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, #0a4a33, ${GREEN} 70%)` }}>
      <div style={{ position: 'absolute', left: 160, top: 200, fontFamily: SANS, fontSize: 150, fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1 }}>
        <div style={{ clipPath: `inset(-10% ${(1 - t1) * 100}% -20% 0)` }}>Two days.</div>
        <div style={{ clipPath: `inset(-10% ${(1 - t2) * 100}% -20% 0)`, color: MINT }}>One prototype.</div>
      </div>
      <div style={{ position: 'absolute', right: 160, top: 240, ...rec(1, 0, 600), fontSize: 32, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', opacity: t2, textAlign: 'right' }}>
        SAT WITH THE CLINICAL LEAD
        <br />
        TO SEE WHAT THE WORK REALLY WAS
      </div>
      {node('A note', 'progress note · treatment plan', 160, 'rgba(255,255,255,0.4)', t3)}
      {node('AI reads first', 'checks every note', 620, MINT, HOUSE(prog(f, SPRINT + 38, SPRINT + 54)))}
      {node('A clinician judges', 'only what was flagged', 1080, AMBER, HOUSE(prog(f, SPRINT + 44, SPRINT + 60)))}
      {[490, 950].map((x, i) => (
        <div key={x} style={{ position: 'absolute', left: x, top: 695, width: 130 * HOUSE(prog(f, SPRINT + 40 + i * 6, SPRINT + 54 + i * 6)), height: 4, background: MINT }} />
      ))}
    </AbsoluteFill>
  );
};

// ── macro on one flagged card: what the first pass actually checks
const FlagCard: React.FC<{ f: number; from: number }> = ({ f, from }) => {
  const checks = [
    ['Goal', '“Feel less anxious”', 'Not measurable', AMBER],
    ['Objective', 'no target date', 'Missing', AMBER],
    ['Reassessment', 'due Oct 14', 'On time', MINT],
    ['Signature', 'signed', 'Present', MINT],
  ];
  const t = settle(prog(f, from, from + 10), 0.8);
  return (
    <AbsoluteFill style={{ background: 'rgba(3,21,15,0.82)', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: 1100, borderRadius: 26, background: CREAM, color: '#1f1a12', padding: '40px 50px', transform: `scale(${mix(0.9, 1, t)}) rotate(${mix(-3, -1, t)}deg)`, boxShadow: `0 0 0 6px ${AMBER}, 0 40px 120px rgba(0,0,0,0.6)`, fontFamily: SANS }}>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ fontSize: 40, fontWeight: 800 }}>Treatment plan</span>
          <span style={{ marginLeft: 'auto', ...rec(1, 0, 600), fontSize: 20, color: '#7a6f5f' }}>ILLUSTRATIVE · NO PATIENT DATA</span>
        </div>
        {checks.map(([a, b, c, col], i) => {
          const on = f >= from + 12 + i * 8;
          return (
            <div key={a} style={{ display: 'flex', alignItems: 'center', height: 76, borderTop: '1px solid rgba(0,0,0,0.1)', marginTop: i ? 0 : 20, fontSize: 30 }}>
              <span style={{ width: 280, fontWeight: 700 }}>{a}</span>
              <span style={{ flex: 1, color: '#4a4236' }}>{b}</span>
              <span style={{ padding: '8px 18px', borderRadius: 12, fontSize: 24, fontWeight: 750, background: on ? (col === MINT ? '#0c3326' : '#3a2206') : 'transparent', color: on ? col : 'transparent', transform: `scale(${on ? settle(prog(f, from + 12 + i * 8, from + 20 + i * 8), 1) : 0.6})` }}>{c}</span>
            </div>
          );
        })}
        <div style={{ marginTop: 18, ...rec(1, 0, 650), fontSize: 22, color: '#8a5a12' }}>→ flagged for a clinician</div>
      </div>
    </AbsoluteFill>
  );
};

// ── the therapist's compliance hub: the carrot and the stick
const Hub: React.FC<{ f: number }> = ({ f }) => {
  const s = f - HUB;
  const tipT = HOUSE(prog(s, 18, 34));
  const newNote = s >= 54;
  const checksOn = [70, 78, 86].map((k) => s >= k);
  const passed = s >= 96;
  const streak = passed ? 3 : 2;
  const strikeFade = HOUSE(prog(s, 100, 124));
  const card: React.CSSProperties = { borderRadius: 24, background: '#0d1f18', border: '1px solid rgba(0,229,160,0.18)', padding: '30px 34px' };
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 40% 30%, #0e3a2a, #03150f 75%)`, fontFamily: SANS, color: '#eaf5f0' }}>
     <AbsoluteFill style={{ transform: `scale(${mix(1.06, 1.14, prog(s, 0, 130))})`, transformOrigin: '50% 40%' }}>
      <div style={{ position: 'absolute', left: 120, top: 90, display: 'flex', alignItems: 'center', gap: 18 }}>
        <Shield size={44} color={MINT} stroke={10} />
        <span style={{ fontSize: 34, fontWeight: 750 }}>Compliance hub</span>
        <span style={{ ...rec(1, 0, 550), fontSize: 20, color: 'rgba(234,245,240,0.55)', marginLeft: 14 }}>YOUR NOTES · OCTOBER</span>
      </div>
      {/* the stick */}
      <div style={{ position: 'absolute', left: 120, top: 200, width: 760, ...card }}>
        <div style={{ ...rec(1, 0, 650), fontSize: 18, letterSpacing: '0.14em', color: 'rgba(234,245,240,0.55)' }}>STRIKES TOWARD A VIOLATION</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1, height: 90, borderRadius: 16, background: i === 0 ? `rgba(255,107,82,${mix(0.9, 0.12, strikeFade)})` : 'rgba(255,255,255,0.06)', border: `2px solid ${i === 0 ? RED : 'rgba(255,255,255,0.12)'}`, opacity: i === 0 ? mix(1, 0.55, strikeFade) : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 750 }}>
              {i === 0 ? '1' : ''}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 24, marginTop: 20, color: '#ffc2b6' }}>Oct 3 · Treatment plan: goal isn’t measurable</div>
        <div style={{ fontSize: 20, marginTop: 8, color: 'rgba(234,245,240,0.6)' }}>{passed ? 'Clears after 3 clean notes · 3 of 3 ✓' : `Clears after 3 clean notes · ${streak} of 3`}</div>
      </div>
      {/* the carrot */}
      <div style={{ position: 'absolute', left: 940, top: 200, width: 860, ...card, border: `2px solid ${MINT}`, opacity: tipT, transform: `translateY(${(1 - tipT) * 24}px)` }}>
        <div style={{ ...rec(1, 0, 650), fontSize: 18, letterSpacing: '0.14em', color: MINT }}>COACHING TIP</div>
        <div style={{ fontSize: 30, fontWeight: 700, marginTop: 14 }}>Make the goal something you can measure.</div>
        <div style={{ fontSize: 24, marginTop: 18, color: 'rgba(234,245,240,0.5)', textDecoration: 'line-through' }}>“Feel less anxious”</div>
        <div style={{ fontSize: 26, marginTop: 8, color: '#bff5df' }}>“Panic episodes from 4 a week to 1 by December”</div>
      </div>
      {/* the next note */}
      <div style={{ position: 'absolute', left: 120, top: 600, width: 1680, ...card, opacity: HOUSE(prog(s, 54, 64)), transform: `translateY(${(1 - HOUSE(prog(s, 54, 64))) * 30}px)`, border: `2px solid ${passed ? MINT : 'rgba(255,255,255,0.14)'}`, display: newNote ? 'flex' : 'none', alignItems: 'center', gap: 50 }}>
        <div>
          <div style={{ ...rec(1, 0, 600), fontSize: 18, letterSpacing: '0.14em', color: 'rgba(234,245,240,0.55)' }}>NEXT NOTE · OCT 17</div>
          <div style={{ fontSize: 30, fontWeight: 750, marginTop: 8 }}>Treatment plan</div>
        </div>
        {['Goal measurable', 'Target date', 'Signed'].map((c, i) => (
          <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, color: checksOn[i] ? '#bff5df' : 'rgba(234,245,240,0.3)' }}>
            <span style={{ width: 38, height: 38, borderRadius: 19, border: `2px solid ${checksOn[i] ? MINT : 'rgba(255,255,255,0.2)'}`, background: checksOn[i] ? MINT : 'transparent', color: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, transform: `scale(${checksOn[i] ? settle(prog(s, 70 + i * 8, 78 + i * 8), 1.2) : 1})` }}>{checksOn[i] ? '✓' : ''}</span>
            {c}
          </div>
        ))}
        <div style={{ marginLeft: 'auto', padding: '12px 26px', borderRadius: 14, background: passed ? MINT : 'transparent', color: GREEN, fontSize: 28, fontWeight: 800, transform: `scale(${passed ? settle(prog(s, 96, 104), 1.2) : 0.8})`, opacity: passed ? 1 : 0 }}>Passed</div>
      </div>
     </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── the wire: two-way, and it survives the partner going quiet
const Wire: React.FC<{ f: number }> = ({ f }) => {
  const s = f - WIRE;
  const quiet = s >= 26 && s < 66;
  const polling = s >= 34;
  const alertT = settle(prog(s, 30, 40), 1);
  const hats = H.hat.filter((h) => h >= WIRE && h < OUTC + 20);
  const A = { x: 460, y: 540 };
  const B = { x: 1460, y: 540 };
  const packets = [...hats, ...beats.filter((b) => b >= WIRE && b < OUTC + 20)].map((h, i) => ({ h, dir: i % 2 ? -1 : 1, poll: h - WIRE >= 34 && h - WIRE < 66 }));
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, #0b3627, #02110c 75%)`, fontFamily: SANS, color: '#eaf5f0' }}>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <line x1={A.x + 150} y1={A.y} x2={B.x - 150} y2={B.y} stroke={quiet ? RED : MINT} strokeWidth={6} strokeDasharray={quiet ? '60 30' : undefined} opacity={quiet ? 0.5 : 0.9} />
        {polling ? <path d={`M${A.x + 120} ${A.y + 90} C ${A.x + 400} ${A.y + 330}, ${B.x - 400} ${B.y + 330}, ${B.x - 120} ${B.y + 90}`} stroke={AMBER} strokeWidth={5} strokeDasharray="12 16" fill="none" strokeDashoffset={-f * 2} opacity={HOUSE(prog(s, 34, 44))} /> : null}
        {packets.map(({ h, dir, poll }, i) => {
          const u = (f - h) / 24;
          if (u < 0 || u > 1) return null;
          const t = dir > 0 ? u : 1 - u;
          let x = mix(A.x + 150, B.x - 150, t);
          let y = A.y;
          if (poll) {
            const q = t;
            x = (1 - q) ** 3 * (A.x + 120) + 3 * (1 - q) ** 2 * q * (A.x + 400) + 3 * (1 - q) * q * q * (B.x - 400) + q ** 3 * (B.x - 120);
            y = (1 - q) ** 3 * (A.y + 90) + 3 * (1 - q) ** 2 * q * (A.y + 330) + 3 * (1 - q) * q * q * (B.y + 330) + q ** 3 * (B.y + 90);
          }
          return <circle key={i} cx={x} cy={y} r={11} fill={poll ? AMBER : MINT} />;
        })}
      </svg>
      <div style={{ position: 'absolute', left: A.x - 150, top: A.y - 150, width: 300, height: 300, borderRadius: 40, background: '#0d1f18', border: `3px solid ${MINT}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <Shield size={80} color={MINT} />
        <div style={{ fontSize: 40, fontWeight: 800 }}>Alma</div>
      </div>
      <div style={{ position: 'absolute', left: B.x - 150, top: B.y - 150, width: 300, height: 300, borderRadius: 40, background: '#101a1f', border: `3px solid ${quiet ? RED : 'rgba(255,255,255,0.4)'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, textAlign: 'center' }}>
        <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.1 }}>Clinical-AI
          <br />
          partner</div>
        <div style={{ ...rec(1, 0, 600), fontSize: 18, color: quiet ? RED : 'rgba(255,255,255,0.5)' }}>{quiet ? 'webhooks quiet' : 'treatment-plan review'}</div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 250, display: 'flex', justifyContent: 'center', gap: 18 }}>
        {['OAuth', 'signed · idempotent webhooks', 'HIPAA reassessment ✓'].map((c, i) => (
          <span key={c} style={{ ...rec(1, 0, 600), fontSize: 22, padding: '10px 20px', borderRadius: 999, border: '1px solid rgba(0,229,160,0.4)', color: '#bff5df', opacity: HOUSE(prog(s, 2 + i * 5, 10 + i * 5)) }}>{c}</span>
        ))}
      </div>
      {polling ? <div style={{ position: 'absolute', left: 960 - 170, top: 790, width: 340, textAlign: 'center', ...rec(1, 0, 650), fontSize: 24, color: AMBER, opacity: HOUSE(prog(s, 36, 46)) }}>polling fallback</div> : null}
      {s >= 30 ? (
        <div style={{ position: 'absolute', right: 120, top: 120, padding: '18px 24px', borderRadius: 18, background: '#2a1512', border: `2px solid ${RED}`, transform: `scale(${alertT})`, transformOrigin: '100% 0', fontSize: 24 }}>
          <b style={{ color: RED }}>Degradation alert</b> → on-call
        </div>
      ) : null}
      <div style={{ position: 'absolute', left: 120, bottom: 150, ...rec(1, 0, 650), fontSize: 30, color: '#bff5df' }}>events lost: 0</div>
    </AbsoluteFill>
  );
};

// ── camera for the field
const HX = cellX(HERO.c);
const HZ = cellZ(HERO.r);
const EDIT = edit([
  {
    name: 'rise',
    from: 0,
    keys: [
      [0, HX, 0, HZ, 420, 0, 86, 0, 50],
      [30, HX, 0, HZ, 700, 0, 86, 0, 50],
      [110, HX * 0.5, 0, HZ * 0.6, 6200, 8, 62, 0, 35],
      [DASH, 0, 0, 600, 7400, 14, 34, 0, 28],
    ],
    kicks: [{ frames: beats.filter((b) => b > 0 && b < DASH).map(Math.round), tau: 6, punch: 0.01, px: 2 }],
  },
  {
    name: 'scan',
    from: D,
    keys: [
      [D, 0, 0, 800, 6600, 16, 36, 0, 28],
      [FLAG + 8, 0, 0, 200, 7000, 6, 50, 0, 28],
    ],
  },
  { name: 'above', from: FLAG + 12, keys: [[FLAG + 12, 0, 0, 0, 8200, 0, 88, 0, 32], [FLAG + 26, 0, 0, 0, 7900, 0, 88, 0, 32]] },
  { name: 'outcome', from: OUTC, keys: [[OUTC, 0, -200, FD / 2 + 300, 3400, 0, 18, 0, 35], [END, 0, -200, FD / 2 + 300, 3900, -4, 16, 0, 35]] },
]);

const Title: React.FC<{ f: number; from: number; to: number; big: string; small?: string; x?: number; y?: number; size?: number; color?: string; align?: 'left' | 'right' }> = ({ f, from, to, big, small, x = 120, y = 760, size = 96, color = '#fff', align = 'left' }) => {
  if (f < from - 2 || f > to + 12) return null;
  const tIn = HOUSE(prog(f, from, from + 14));
  const tOut = prog(f, to, to + 10);
  return (
    <div style={{ position: 'absolute', [align]: x, top: y, zIndex: 906000, opacity: 1 - tOut, fontFamily: SANS, textAlign: align }}>
      <div style={{ fontSize: size, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.02, color, clipPath: `inset(-10% ${align === 'left' ? (1 - tIn) * 100 : 0}% -20% ${align === 'right' ? (1 - tIn) * 100 : 0}%)`, textShadow: '0 6px 40px rgba(0,0,0,0.7)' }}>{big}</div>
      {small ? <div style={{ ...rec(1, 0, 600), fontSize: Math.max(22, size * 0.28), color: 'rgba(255,255,255,0.82)', marginTop: 16, opacity: HOUSE(prog(f, from + 8, from + 20)), textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}>{small}</div> : null}
    </div>
  );
};

export const Alma: React.FC = () => {
  const f = useCurrentFrame();
  const fieldShot = f < DASH || (f >= D && f < FLAG + 26) || f >= OUTC;
  const { cam, focus } = EDIT.at(f);
  const audited = f < D ? 37 : Math.round(mix(37, 1000 - NEEDS, HOUSE(prog(f, D, D + 74))));
  const flash = pulse([D, SPRINT, HUB, WIRE], f, 5);
  const kick = pulse(H.kick.filter((k) => k < DASH), f, 6);
  return (
    <AbsoluteFill style={{ background: '#03150f', overflow: 'hidden' }}>
      {fieldShot ? (
        <DofCtx.Provider value={{ focus, aperture: f < 40 ? 1.0 : 0.3 }}>
          <AbsoluteFill style={{ isolation: 'isolate', transform: `scale(${1 + 0.006 * kick})` }}>
            <FieldWorld f={f} cam={cam} />
          </AbsoluteFill>
          <Dust n={40} seed="al" f={f} color="rgba(255,225,180,0.8)" a={0.3} />
          <Glow x={960} y={1100} r={900} color="rgba(255,200,140,0.25)" a={0.5} />
        </DofCtx.Provider>
      ) : null}
      {f >= DASH && f < SPRINT ? <TableScene f={f} /> : null}
      {f >= SPRINT && f < D ? <Sprint f={f} /> : null}
      {f >= FLAG + 26 && f < HUB ? <FlagCard f={f} from={FLAG + 26} /> : null}
      {f >= HUB && f < WIRE ? <Hub f={f} /> : null}
      {f >= WIRE && f < OUTC ? <Wire f={f} /> : null}

      {/* the counter: the whole problem in one line */}
      {fieldShot && f < END ? (
        <div style={{ position: 'absolute', right: 120, top: 90, textAlign: 'right', zIndex: 906000, fontFamily: SANS, textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          <div style={{ ...rec(1, 0, 650), fontSize: 20, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.65)' }}>{f < D ? 'AUDITED THIS MONTH' : f < OUTC ? 'READ BY THE FIRST PASS' : 'NEED A CLINICIAN'}</div>
          <div style={{ fontSize: 88, fontWeight: 800, color: f < D ? '#fff' : MINT, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.03em' }}>
            {f < OUTC ? audited.toLocaleString('en-US') : NEEDS}
            <span style={{ fontSize: 44, color: 'rgba(255,255,255,0.5)' }}> / 1,000</span>
          </div>
        </div>
      ) : null}
      <Title f={f} from={70} to={DASH - 6} big="1,000 notes a month to audit." small="Two clinical reviewers." size={92} />
      <Title f={f} from={DASH + 20} to={SPRINT - 4} big="Read one by one." small="From a Metabase table." size={92} x={120} y={820} color="#fff" />
      <Title f={f} from={D + 18} to={FLAG + 8} big="The AI reads first." small="Most go quiet. The rest wait for a human." size={84} y={800} />
      <Title f={f} from={HUB + 110} to={WIRE - 4} big="Coached, not punished." small="Strikes track toward a violation. Tips fix the next note." size={72} y={840} />
      <Title f={f} from={WIRE + 50} to={OUTC - 2} big="Built for the day the partner goes quiet." size={64} y={880} />
      <Title f={f} from={OUTC + 4} to={END - 2} big="72% of eligible clinicians." small="And the clinical lead stopped drowning in audits." size={100} y={760} color="#fff" />

      {/* the macro card before the rise: one note */}
      {f < 40 ? (
        <div style={{ position: 'absolute', left: 120, bottom: 110, ...rec(1, 0, 600), fontSize: 26, color: 'rgba(255,255,255,0.8)', opacity: 1 - prog(f, 30, 40), zIndex: 906000 }}>
          {resolveText(''.padEnd(32, ' '), 'Progress note · audit pending', HOUSE(prog(f, 4, 24)), 'alm', f)}
        </div>
      ) : null}
      {/* subliminal: from directly above, CARE — held to the rewatch */}
      {sub(f, FLAG + 12, 14) ? <div style={{ position: 'absolute', left: 0, right: 0, bottom: 60, textAlign: 'center', ...rec(1, 0, 600), fontSize: 16, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', zIndex: 906000 }}>START WITH THE PERSON</div> : null}
      <Letterbox t={fieldShot && f < END ? 1 : 0} />
      <Flash a={0.22 * flash} color="0,229,160" />
      <BrandEnd
        g={g}
        from={END}
        bg={`radial-gradient(ellipse at 50% 40%, #0a4a33, ${GREEN} 70%)`}
        accent={MINT}
        kicker="HIPAA · PRODUCTION · 2.7 YEARS"
        logo={
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <Shield size={110} color={MINT} check={HOUSE(prog(f, END + 14, END + 30))} />
            <div style={{ fontFamily: SANS, fontSize: 190, fontWeight: 700, letterSpacing: '-0.04em', color: '#fff' }}>Alma</div>
          </div>
        }
        line="Clinical systems that had to earn adoption and survive inspection."
      >
        <div style={{ display: 'flex', gap: 70, marginTop: 10, opacity: RESOLVE(prog(f, END + 40, END + 70)) }}>
          {[
            ['72%', 'ELIGIBLE CLINICIANS · SELF-REPORTED'],
            ['2 days', 'TO THE PROTOTYPE'],
            ['2.7 yrs', 'HIPAA PRODUCTION'],
          ].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: SANS, fontSize: 56, fontWeight: 700, color: '#fff' }}>{resolveText(''.padEnd(n.length, ' '), n, RESOLVE(prog(f, END + 40, END + 70)), `al${l}`, f)}</div>
              <div style={{ ...rec(1, 0, 500), fontSize: 15, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </BrandEnd>
      <Vignette s={0.55} />
      <Grain />
      <Audio src={staticFile('audio/alma_mix.wav')} />
    </AbsoluteFill>
  );
};
