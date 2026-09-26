import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { HOUSE, RESOLVE, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS } from '../lib/grid';
import { rec } from '../lib/theme';
import { Flash, Grain, Vignette } from '../lib/Frame';
import { resolveText } from '../lib/decode';
import { BrandEnd } from '../lib/BrandEnd';
import { at, pulse, sub } from '../lib/score';
import hitsJson from '../data/hits_brainbuffet.json';

/**
 * BRAINBUFFET v4: "From a question to a course."
 *
 * v3's buffet metaphor ate the product. v4 keeps the smiling host and one line
 * of it ("an answer is a snack"), then gives the film to the real design: the
 * create flow from the source (topic, expertise, subtopics, expertise quiz,
 * course preview, chapter, notes), each sub-part lifted out of the dark-plum
 * app on its beat with the one outcome it gives the learner beside it. On the
 * drop the course preview arrives; its outline becomes the LearningMountain,
 * the glowing path from BrainBuffet's own source, and the camera climbs it one
 * lit point per hat. Outcome: a question to a course plan in under five minutes.
 *
 * Brand: BrainBuffet's real theme (#1B1823 / #272334 / #30293e, #8F39FF, #C99FFF,
 * #f6eeff), the landing's lavender and purple-gradient headline, the purple
 * night mountain. Subliminal: chapters 1–3 of the outline light their initials:
 * Y-O-U.
 */
const g = GRIDS.brainbuffet;
const M = g.markers as Record<string, number>;
const H = { hat: at(hitsJson.hat as [number, number][]), snare: at(hitsJson.snare as [number, number][]), note: hitsJson.note as number[] };
const LAND = Math.round(M.landing);
const C1 = Math.round(M.c1);
const C2 = Math.round(M.c2);
const C3 = Math.round(M.c3);
const D = Math.round(M.drop);
const MTN = Math.round(M.mountain);
const STUDY = Math.round(M.study);
const NOTES = Math.round(M.notes);
const OUT = Math.round(M.outcome);
const END = Math.round(M.end);
const beats = g.beats;

const BG = '#1B1823';
const CARD = '#272334';
const CTRL = '#30293e';
const VIOLET = '#8F39FF';
const LILAC = '#C99FFF';
const INK = '#f6eeff';
const DIMI = 'rgba(246,238,255,0.6)';
const SANS = '"Hind", "Poppins", system-ui, -apple-system, sans-serif';

const Logo: React.FC<{ size: number }> = ({ size }) => <Img src={staticFile('img/bb-logo.png')} style={{ width: size, height: size }} />;

/** A component lifted off the app with its outcome beside it: the film's grammar. */
const Callout: React.FC<{ f: number; from: number; to: number; outcome: string; kicker: string; children: React.ReactNode; side?: 'right' | 'left' }> = ({ f, from, to, outcome, kicker, children, side = 'right' }) => {
  if (f < from - 7 || f >= to) return null;
  const lift = settle(prog(f, from, from + 14), 0.9);
  const out = HOUSE(prog(f, to - 7, to)) - (1 - HOUSE(prog(f, from - 7, from + 1)));
  const textT = HOUSE(prog(f, from + 12, from + 26));
  const x = side === 'right' ? 110 : 1000;
  return (
    <AbsoluteFill style={{ transform: `translateX(${-out * 1920}px)` }}>
      <div style={{ position: 'absolute', left: x, top: 540, transform: `translateY(-50%) perspective(1600px) rotateY(${mix(side === 'right' ? 18 : -18, side === 'right' ? 5 : -5, lift)}deg) translateZ(${mix(-400, 0, lift)}px) scale(1.18)`, transformOrigin: '0 50%', opacity: clamp(0.4 + lift * 1.5), filter: `drop-shadow(0 ${mix(4, 40, lift)}px ${mix(10, 80, lift)}px rgba(0,0,0,0.6))` }}>{children}</div>
      <div style={{ position: 'absolute', [side === 'right' ? 'left' : 'right']: side === 'right' ? 1190 : 1010, top: 380, width: 660 }}>
        <div style={{ ...rec(1, 0, 650), fontSize: 22, letterSpacing: '0.18em', color: LILAC, opacity: textT }}>{kicker}</div>
        <div style={{ fontFamily: SANS, fontSize: 76, fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.025em', color: INK, marginTop: 14, clipPath: `inset(-10% ${(1 - textT) * 100}% -20% 0)` }}>{outcome}</div>
      </div>
    </AbsoluteFill>
  );
};

const Expertise: React.FC<{ f: number }> = ({ f }) => {
  const pick = f >= C1 + 20;
  return (
    <div style={{ width: 860, padding: 36, borderRadius: 24, background: CARD, fontFamily: SANS, color: INK }}>
      <div style={{ fontSize: 30, fontWeight: 600 }}>How much do you already know?</div>
      <div style={{ display: 'flex', gap: 18, marginTop: 26 }}>
        {[
          ['🌱', 'Beginner', 'Start from zero'],
          ['🌿', 'Some experience', 'Skip the basics'],
          ['🌳', 'Expert', 'Go deep'],
        ].map(([e, t, d], i) => {
          const sel = pick && i === 1;
          return (
            <div key={t} style={{ flex: 1, height: 224, borderRadius: 14, border: `${sel ? 3 : 2}px solid ${sel ? LILAC : '#5a4c7d'}`, background: sel ? '#5A4C7D' : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, transform: `scale(${sel ? settle(prog(f, C1 + 20, C1 + 28), 1.2) * 0.04 + 1 : 1})` }}>
              <span style={{ fontSize: 50 }}>{e}</span>
              <span style={{ fontSize: 26, fontWeight: 600 }}>{t}</span>
              <span style={{ fontSize: 19, color: DIMI }}>{d}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Subtopics: React.FC<{ f: number }> = ({ f }) => {
  const chips = ['Affiliate marketing', 'Digital products', 'Dividend investing', 'Content licensing', 'Rental income', 'Online courses'];
  const picks = [0, 1, 5];
  const hats = H.hat.filter((h) => h >= C2 + 8 && h < C3);
  return (
    <div style={{ width: 860, padding: 36, borderRadius: 24, background: CARD, fontFamily: SANS, color: INK }}>
      <div style={{ fontSize: 30, fontWeight: 600 }}>Pick what matters to you</div>
      <div style={{ fontSize: 20, color: DIMI, marginTop: 6 }}>Suggested from your topic and experience</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 24 }}>
        {chips.map((c, i) => {
          const k = picks.indexOf(i);
          const on = k >= 0 && f >= (hats[k] ?? C2 + 12 + k * 10);
          return (
            <span key={c} style={{ padding: '14px 24px', borderRadius: 999, fontSize: 24, fontWeight: 600, border: `2px solid ${on ? LILAC : '#5a4c7d'}`, background: on ? VIOLET : CTRL, color: on ? '#fff' : INK }}>
              {on ? '✓ ' : '+ '}
              {c}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const Quiz: React.FC<{ f: number }> = ({ f }) => {
  const pick = f >= C3 + 22;
  const opts = ['A share of revenue when a referred customer buys', 'A flat fee for every visit you send', 'A loan against future sales'];
  return (
    <div style={{ width: 860, padding: 36, borderRadius: 24, background: CARD, fontFamily: SANS, color: INK }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ ...rec(1, 0, 600), fontSize: 18, letterSpacing: '0.14em', color: LILAC }}>EXPERTISE QUIZ · 2 OF 3</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 40, height: 6, borderRadius: 3, background: i < 2 ? VIOLET : CTRL }} />
          ))}
        </span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 600, marginTop: 18 }}>What does an affiliate commission pay for?</div>
      {opts.map((o, i) => {
        const sel = pick && i === 0;
        return (
          <div key={o} style={{ marginTop: 14, padding: '18px 22px', borderRadius: 14, border: `2px solid ${sel ? LILAC : '#5a4c7d'}`, background: sel ? '#5A4C7D' : CTRL, fontSize: 23, display: 'flex', gap: 14 }}>
            <b style={{ color: LILAC }}>{'ABC'[i]}</b>
            {o}
            {sel ? <span style={{ marginLeft: 'auto', color: '#9dffc2' }}>✓</span> : null}
          </div>
        );
      })}
    </div>
  );
};

const OUTLINE = ['Your first niche', 'Offers your audience trusts', 'Understanding affiliate marketing', 'Picking the right products', 'Your first digital product', 'Measuring what works'];

const Preview: React.FC<{ f: number }> = ({ f }) => {
  const you = sub(f, D + 34, 7);
  return (
    <div style={{ width: 1240, borderRadius: 16, overflow: 'hidden', fontFamily: SANS, color: INK, boxShadow: '0 60px 160px rgba(80,20,160,0.5)' }}>
      <div style={{ height: 260, background: 'linear-gradient(135deg, #3b1d7a, #8F39FF 55%, #c99fff)', padding: '0 44px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ ...rec(1, 0, 600), fontSize: 18, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.8)' }}>YOUR COURSE · READY</div>
        <div style={{ fontSize: 58, fontWeight: 700, letterSpacing: '-0.02em' }}>Building Wealth with Passive Income</div>
        <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.85)' }}>⏱ 45 mins learning · 6 chapters · shaped by your answers</div>
      </div>
      <div style={{ background: CARD, padding: '30px 44px 40px', display: 'flex', gap: 50 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 26, fontWeight: 700 }}>You’ll be able to</div>
          {['Pick an affiliate niche that fits you', 'Ship one small digital product', 'Tell good offers from bad ones'].map((o, i) => (
            <div key={o} style={{ fontSize: 23, marginTop: 14, color: INK, opacity: HOUSE(prog(f, D + 8 + i * 6, D + 16 + i * 6)) }}>
              <span style={{ color: '#9dffc2' }}>✓</span> {o}
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 26, fontWeight: 700 }}>Chapter outline</div>
          {OUTLINE.map((o, i) => (
            <div key={o} style={{ fontSize: 22, marginTop: 10, color: DIMI, opacity: HOUSE(prog(f, D + 12 + i * 4, D + 20 + i * 4)) }}>
              <span style={{ color: LILAC, marginRight: 12 }}>{i + 1}</span>
              <span style={{ color: you && i < 3 ? '#fff' : undefined, fontWeight: you && i < 3 ? 800 : undefined, textShadow: you && i < 3 ? '0 0 12px #fff' : undefined }}>{o[0]}</span>
              {o.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** The LearningMountain (from BrainBuffet's source): a glowing path up a violet mountain; one lit point per hat. */
const Mountain: React.FC<{ f: number }> = ({ f }) => {
  const pts = [
    [260, 900],
    [520, 780],
    [760, 820],
    [980, 640],
    [1220, 560],
    [1460, 420],
    [1640, 250],
  ];
  const hats = H.hat.filter((h) => h >= MTN - 4 && h < STUDY);
  const lit = (i: number) => f >= (hats[i] ?? MTN + i * 9);
  const draw = HOUSE(prog(f, MTN, STUDY - 10));
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
  const cam = HOUSE(prog(f, MTN, STUDY));
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, #0b0718 0%, #1b0f3a 45%, #3b1d7a 75%, #7c3fd6 100%)', overflow: 'hidden' }}>
      <AbsoluteFill style={{ transform: `translate(${mix(200, -380, cam)}px, ${mix(180, -140, cam)}px) scale(${mix(1.25, 1.55, cam)})`, transformOrigin: '50% 60%' }}>
        {new Array(70).fill(0).map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: (i * 277) % 1920, top: (i * 131) % 420, width: 3, height: 3, borderRadius: 2, background: '#fff', opacity: 0.3 + 0.5 * Math.abs(Math.sin(i + f / 30)) }} />
        ))}
        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
          <path d="M-100 1080 L240 760 L520 640 L760 700 L1040 470 L1300 380 L1640 170 L1900 420 L2100 1080 Z" fill="#241246" />
          <path d="M-100 1080 L400 820 L700 900 L1100 700 L1500 820 L2100 1080 Z" fill="#170b30" opacity={0.9} />
          <path d={d} stroke={LILAC} strokeWidth={8} fill="none" strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={`${draw} 1`} style={{ filter: `drop-shadow(0 0 16px ${VIOLET})` }} />
          {pts.map((p, i) => (
            <g key={i}>
              <circle cx={p[0]} cy={p[1]} r={lit(i) ? 20 : 10} fill={lit(i) ? '#fff' : '#5a4c7d'} style={{ filter: lit(i) ? `drop-shadow(0 0 24px ${LILAC})` : undefined }} />
              {i > 0 && i < 7 ? (
                <text x={p[0] + 30} y={p[1] - 22} fill={lit(i) ? INK : 'rgba(246,238,255,0.35)'} fontSize={26} fontFamily="Recursive" fontWeight={600}>{`${i}. ${OUTLINE[i - 1]}`}</text>
              ) : null}
            </g>
          ))}
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** The chapter: progress track, lesson, video, quiz feedback, notes attached (rebuilt from the product). */
const Study: React.FC<{ f: number }> = ({ f }) => {
  const notesPhase = f >= NOTES;
  const noteT = settle(prog(f, NOTES + 6, NOTES + 18), 1);
  const quizT = HOUSE(prog(f, STUDY + 30, STUDY + 40));
  // camera: progress track first, then the notes sidebar
  const s = mix(mix(1.25, 1.9, HOUSE(prog(f, STUDY, STUDY + 20))), 1.8, HOUSE(prog(f, NOTES - 6, NOTES + 10)));
  const fx = mix(mix(760, 700, HOUSE(prog(f, STUDY, STUDY + 20))), 1560, HOUSE(prog(f, NOTES - 6, NOTES + 10)));
  const fy = mix(mix(400, 170, HOUSE(prog(f, STUDY, STUDY + 20))), 330, HOUSE(prog(f, NOTES - 6, NOTES + 10)));
  const segs = 12;
  const done = 5 + (f >= STUDY + 34 ? 1 : 0);
  return (
    <AbsoluteFill style={{ background: BG }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `translate(${960 - fx * s}px, ${540 - fy * s}px) scale(${s})`, fontFamily: SANS, color: INK }}>
        <div style={{ position: 'absolute', left: 60, top: 60, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo size={44} />
          <span style={{ fontSize: 26, fontWeight: 600, color: LILAC }}>BrainBuffet</span>
        </div>
        <div style={{ position: 'absolute', left: 460, top: 50, width: 900 }}>
          <div style={{ fontSize: 32, fontWeight: 600 }}>← Building Wealth with Passive Income</div>
          <div style={{ fontSize: 18, color: LILAC, marginTop: 8 }}>Chapter 4 · Affiliate Marketing</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            {new Array(segs).fill(0).map((_, i) => (
              <span key={i} style={{ flex: 1, height: 8, borderRadius: 4, background: i < done ? VIOLET : i === done ? LILAC : CTRL, boxShadow: i === done - 1 && f < STUDY + 44 ? `0 0 ${14 * pulse([STUDY + 34], f, 8)}px ${LILAC}` : 'none' }} />
            ))}
          </div>
          <div style={{ marginTop: 14, display: 'inline-block', ...rec(1, 0, 600), fontSize: 18, padding: '6px 14px', borderRadius: 999, background: 'rgba(157,255,194,0.12)', color: '#9dffc2', opacity: quizT }}>✓ chapter quiz · 3 / 3</div>
          <div style={{ marginTop: 20, borderRadius: 14, background: CARD, padding: '26px 30px' }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>Understanding Affiliate Marketing</div>
            <div style={{ fontSize: 19, lineHeight: 1.6, color: 'rgba(246,238,255,0.8)', marginTop: 12 }}>
              Affiliate marketing is a way of earning passive income by promoting other people’s products. When someone buys through your referral link, you earn a commission. It hinges on <b>selecting the right products</b>.
            </div>
          </div>
          <div style={{ marginTop: 16, height: 300, borderRadius: 14, background: 'linear-gradient(135deg, #0f3b33, #135e4d)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 30, top: 24, fontSize: 20, color: '#dff' }}>How to choose the right affiliate products for your audience</div>
            <div style={{ position: 'absolute', left: 40, bottom: 40, fontSize: 44, fontWeight: 800, color: '#fff', lineHeight: 1 }}>AFFILIATE
              <br />
              MARKETING</div>
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 90, height: 64, borderRadius: 16, background: '#ff0033', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 30 }}>▶</div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 1440, top: 56, width: 380 }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Notes</div>
          <div style={{ marginTop: 16, padding: '12px 0', borderRadius: 999, background: VIOLET, textAlign: 'center', fontSize: 20, fontWeight: 600, transform: `scale(${f >= NOTES && f < NOTES + 5 ? 0.94 : 1})` }}>Add Note +</div>
          {notesPhase ? (
            <div style={{ marginTop: 18, padding: '18px 20px', borderRadius: 14, background: '#fbe38e', color: '#2a2210', transform: `translateY(${(1 - noteT) * 30}px) rotate(${mix(-4, -1.5, noteT)}deg)`, opacity: clamp(noteT) }}>
              <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.25 }}>Pick products my audience already trusts.</div>
              <div style={{ ...rec(1, 0, 600), fontSize: 14, marginTop: 10, color: '#6a5a20' }}>ATTACHED · CH 4 · STEP 2</div>
            </div>
          ) : null}
        </div>
      </div>
      {/* the outcome for each read, on the snare */}
      {f < NOTES ? (
        <div style={{ position: 'absolute', left: 120, bottom: 110, fontFamily: SANS, fontSize: 64, fontWeight: 700, color: INK, textShadow: '0 6px 30px rgba(0,0,0,0.8)', clipPath: `inset(-10% ${(1 - HOUSE(prog(f, STUDY + 18, STUDY + 32))) * 100}% -20% 0)` }}>You always know where you are.</div>
      ) : (
        <div style={{ position: 'absolute', left: 120, bottom: 110, fontFamily: SANS, fontSize: 64, fontWeight: 700, color: INK, textShadow: '0 6px 30px rgba(0,0,0,0.8)', clipPath: `inset(-10% ${(1 - HOUSE(prog(f, NOTES + 14, NOTES + 28))) * 100}% -20% 0)` }}>Your notes come back with the lesson.</div>
      )}
    </AbsoluteFill>
  );
};

export const BrainBuffet: React.FC = () => {
  const f = useCurrentFrame();
  const hookType = Math.floor(clamp(prog(f, 6, 40)) * 32);
  const q = 'how do I build passive income?'.slice(0, hookType);
  const answerT = settle(prog(f, 46, 58), 0.8);
  const landT = HOUSE(prog(f, LAND, LAND + 16));
  const typed = 'how to build passive income'.slice(0, Math.floor(clamp(prog(f, LAND + 10, LAND + 40)) * 27));
  const go = f >= C1 - 8 && f < C1 - 2;
  const dropT = settle(prog(f, D, D + 16), 0.8);
  const kick = pulse(beats.filter((b) => b >= D && b < MTN).map(Math.round), f, 6);
  return (
    <AbsoluteFill style={{ background: BG, overflow: 'hidden', fontFamily: SANS }}>
      {/* ── the hook: one answer, one snack */}
      {f < LAND ? (
        <AbsoluteFill style={{ background: '#f4f2f7', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: 1100, transform: `scale(${mix(1.45, 1.3, HOUSE(prog(f, 0, 60)))}) translateY(-40px)` }}>
            <div style={{ height: 96, borderRadius: 48, background: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', padding: '0 40px', fontSize: 34, color: '#333' }}>
              🔍&nbsp;&nbsp;{q}
              <span style={{ width: 3, height: 40, background: '#333', marginLeft: 4, opacity: Math.floor(f / 15) % 2 }} />
            </div>
            <div style={{ marginTop: 26, borderRadius: 24, background: '#fff', padding: '30px 40px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', opacity: clamp(answerT), transform: `translateY(${(1 - answerT) * 30}px)` }}>
              <div style={{ fontSize: 30, color: '#222' }}>Earn money with little ongoing effort, e.g. affiliate links.</div>
              <div style={{ ...rec(1, 0, 600), fontSize: 18, letterSpacing: '0.14em', color: '#999', marginTop: 12 }}>ONE ANSWER</div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 120, bottom: 110, fontFamily: SANS, fontSize: 78, fontWeight: 700, color: '#1b1823', letterSpacing: '-0.03em', clipPath: `inset(-10% ${(1 - HOUSE(prog(f, 66, 82))) * 100}% -20% 0)` }}>An answer isn’t a subject.</div>
        </AbsoluteFill>
      ) : null}

      {/* ── the landing: the real hero, the topic typed in */}
      {f >= LAND && f < C1 ? (
        <AbsoluteFill style={{ background: 'linear-gradient(180deg, #fbf7ff, #efe4ff)', justifyContent: 'center', alignItems: 'center', opacity: landT }}>
          <div style={{ position: 'absolute', left: 80, top: 60, display: 'flex', alignItems: 'center', gap: 14 }}>
            <Logo size={56} />
            <span style={{ fontSize: 34, fontWeight: 600, color: '#8b50e8' }}>BrainBuffet</span>
          </div>
          <div style={{ textAlign: 'center', transform: `scale(${mix(0.95, 1.05, HOUSE(prog(f, LAND, C1)))})` }}>
            <div style={{ fontSize: 118, fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #8F39FF, #c99fff)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              Create your own
              <br />
              learning adventure
            </div>
            <div style={{ margin: '48px auto 0', width: 900, height: 96, borderRadius: 48, background: BG, display: 'flex', alignItems: 'center', padding: '0 12px 0 36px', fontSize: 32, color: INK }}>
              ✦&nbsp;&nbsp;{typed}
              <span style={{ marginLeft: 'auto', padding: '18px 36px', borderRadius: 40, background: VIOLET, fontSize: 28, fontWeight: 600, transform: `scale(${go ? 0.92 : 1})` }}>Let’s Go</span>
            </div>
          </div>
        </AbsoluteFill>
      ) : null}

      {/* ── the design, part by part, each with its outcome */}
      {f >= C1 - 2 && f < D ? (
        <AbsoluteFill style={{ background: `radial-gradient(ellipse at 30% 50%, #2c2240, ${BG} 70%)` }}>
          <div style={{ position: 'absolute', left: 80, top: 60, display: 'flex', alignItems: 'center', gap: 14 }}>
            <Logo size={48} />
            <span style={{ ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.16em', color: DIMI }}>CREATE A COURSE · {f < C2 ? '2' : f < C3 ? '3' : '4'} OF 4</span>
          </div>
          <Callout f={f} from={C1} to={C2} kicker="EXPERTISE" outcome="Skips what you already know.">
            <Expertise f={f} />
          </Callout>
          <Callout f={f} from={C2} to={C3} kicker="SUBTOPICS" outcome="You choose the path. Not a prompt.">
            <Subtopics f={f} />
          </Callout>
          <Callout f={f} from={C3} to={D + 2} kicker="EXPERTISE QUIZ" outcome="Finds where your knowledge stops.">
            <Quiz f={f} />
          </Callout>
        </AbsoluteFill>
      ) : null}

      {/* ── the drop: the course, and the mountain it becomes */}
      {f >= D && f < MTN + 8 ? (
        <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, #3b1d7a, ${BG} 70%)`, justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ transform: `scale(${mix(0.9, 1.3, dropT) * (1 + 0.01 * kick) * mix(1, 1.06, prog(f, D, MTN))}) translateY(${(1 - clamp(dropT)) * 80}px)`, opacity: clamp(dropT * 1.5) * (1 - prog(f, MTN, MTN + 8)) }}>
            <Preview f={f} />
          </div>
        </AbsoluteFill>
      ) : null}
      {f >= MTN && f < STUDY ? (
        <>
          <Mountain f={f} />
          <div style={{ position: 'absolute', left: 120, top: 110, fontFamily: SANS, fontSize: 70, fontWeight: 700, color: INK, lineHeight: 1.05, clipPath: `inset(-10% ${(1 - HOUSE(prog(f, MTN + 6, MTN + 20))) * 100}% -20% 0)` }}>
            A path you can see
            <br />
            before you start.
          </div>
        </>
      ) : null}
      {f >= STUDY && f < OUT ? <Study f={f} /> : null}

      {/* ── the outcome */}
      {f >= OUT && f < END ? (
        <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, #3b1d7a, ${BG} 70%)`, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 30 }}>
          <Logo size={140} />
          <div style={{ fontSize: 90, fontWeight: 700, color: INK, letterSpacing: '-0.03em', textAlign: 'center', lineHeight: 1.05 }}>
            <span style={{ clipPath: `inset(-10% ${(1 - HOUSE(prog(f, OUT + 4, OUT + 20))) * 100}% -20% 0)`, display: 'inline-block' }}>A question to a course</span>
            <br />
            <span style={{ clipPath: `inset(-10% ${(1 - HOUSE(prog(f, OUT + 14, OUT + 30))) * 100}% -20% 0)`, display: 'inline-block', color: LILAC }}>in under five minutes.</span>
          </div>
          <div style={{ ...rec(1, 0, 600), fontSize: 26, letterSpacing: '0.12em', color: DIMI, opacity: RESOLVE(prog(f, OUT + 30, OUT + 50)) }}>{resolveText(''.padEnd(40, ' '), '250+ COURSES · CREATION TIME −90%', RESOLVE(prog(f, OUT + 30, OUT + 56)), 'bbo', f)}</div>
        </AbsoluteFill>
      ) : null}

      <Flash a={0.25 * pulse([D], f, 6)} color="201,159,255" />
      <Flash a={0.12 * pulse([C1, C2, C3, STUDY, NOTES, OUT], f, 4)} color="143,57,255" />
      <BrandEnd
        g={g}
        from={END}
        bg="linear-gradient(180deg, #1b0f3a 0%, #3b1d7a 60%, #8F39FF 100%)"
        accent={LILAC}
        kicker="PERSONAL LEARNING PATHWAYS"
        font={SANS}
        wipe="up"
        logo={
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <Logo size={150} />
            <div style={{ fontFamily: SANS, fontSize: 150, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>BrainBuffet</div>
          </div>
        }
        line="Create your own learning adventure."
      />
      {f >= C1 ? <Vignette s={0.45} /> : null}
      <Grain />
      <Audio src={staticFile('audio/brainbuffet_mix.wav')} />
    </AbsoluteFill>
  );
};
