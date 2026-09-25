import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { HOUSE, RESOLVE, TRAVEL, clamp, mix, prog, settle } from '../lib/ease';
import { GRIDS, beatAfter, beatPulse } from '../lib/grid';
import { T, rec } from '../lib/theme';
import { EndCard, Flash, Grain, Score, Vignette } from '../lib/Frame';

/**
 * BRAINBUFFET — "A buffet, not a search box."
 * A tray slides down the counter and the learner builds a plate one choice per
 * beat, in the product's real order: topic, what you already know, subtopics,
 * a short expertise quiz. On the drop the plate becomes a course: an outline
 * with outcomes, then the real study surface with progress and notes attached.
 */
const g = GRIDS.brainbuffet;
const D = Math.round(g.drop);
const B = Math.round(g.button);
const VIOLET = '#9b7bff';
const STEPS = [
  { k: 'TOPIC', v: 'Building wealth with passive income', dish: '#d9a62e' },
  { k: 'YOU KNOW', v: 'A little. Skip the basics.', dish: '#48c7ff' },
  { k: 'SUBTOPICS', v: 'Affiliate marketing · Picking products', dish: '#b7f34a' },
  { k: 'QUIZ', v: '3 questions to find your edge', dish: '#ff5738' },
];
const CHAPTERS = ['Understanding affiliate marketing', 'Selecting the right products and platforms', 'Chapter quiz, with feedback', 'Your notes, attached to the lesson'];

const Dish: React.FC<{ c: string; size: number }> = ({ c, size }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 100 62">
    <ellipse cx={50} cy={40} rx={48} ry={18} fill="#f2efe4" opacity={0.95} />
    <ellipse cx={50} cy={37} rx={36} ry={12} fill={c} />
    <ellipse cx={42} cy={33} rx={12} ry={4} fill="rgba(255,255,255,0.35)" />
  </svg>
);

export const BrainBuffet: React.FC = () => {
  const f = useCurrentFrame();
  const picks = STEPS.map((_, i) => beatAfter(g, 60, i * 2));
  const trayX = mix(-200, 1100, TRAVEL(prog(f, 20, D - 20)));
  const toCourse = TRAVEL(prog(f, D, D + 30));
  const study = TRAVEL(prog(f, beatAfter(g, D, 5), beatAfter(g, D, 5) + 28));
  const endFrom = B - 72;
  const out = HOUSE(prog(f, endFrom - 10, endFrom + 10));
  const kick = beatPulse(g, f, 6, D, B);
  return (
    <AbsoluteFill style={{ background: T.carbon, overflow: 'hidden' }}>
      <AbsoluteFill style={{ opacity: 1 - out, filter: `blur(${5 * study}px) brightness(${1 - 0.55 * study})` }}>
        <div style={{ position: 'absolute', left: 140, top: 120, ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.2em', color: VIOLET }}>BRAINBUFFET · PERSONAL LEARNING PATHWAYS</div>
        <div style={{ position: 'absolute', left: 140, top: 160, fontFamily: T.serif, fontStyle: 'italic', fontSize: 80, lineHeight: 1.05, width: 1500, color: T.mineral }}>
          {f < D ? 'An answer is a snack. A subject is a meal.' : 'Your choices, plated into a course.'}
        </div>
        {/* the counter */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 720, height: 14, background: 'rgba(242,239,228,0.12)', opacity: 1 - toCourse }} />
        {STEPS.map((s, i) => {
          const x = 160 + i * 420;
          const taken = f >= picks[i];
          const up = settle(prog(f, picks[i], picks[i] + 12), 0.9);
          const label = HOUSE(prog(f, picks[i] - 10, picks[i]));
          return (
            <div key={s.k} style={{ position: 'absolute', left: x, top: 560, opacity: 1 - toCourse }}>
              <div style={{ transform: `translate(${taken ? (trayX + 60 + i * 70 - x) * up : 0}px, ${taken ? 170 * up : 0}px) scale(${taken ? mix(1, 0.62, up) : 1})` }}>
                <Dish c={s.dish} size={300} />
              </div>
              <div style={{ position: 'absolute', left: 0, top: -150, width: 380, opacity: label }}>
                <div style={{ ...rec(1, 0, 600), fontSize: 18, letterSpacing: '0.16em', color: s.dish }}>{`0${i + 1} ${s.k}`}</div>
                <div style={{ ...rec(0, 0.5, 480), fontSize: 34, color: T.mineral, marginTop: 6, lineHeight: 1.15 }}>{s.v}</div>
              </div>
            </div>
          );
        })}
        {/* the tray */}
        <div style={{ position: 'absolute', left: trayX, top: 820, width: 700, height: 90, borderRadius: 14, background: VIOLET, opacity: (1 - toCourse) * 0.9, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} />
        {/* the plate becomes a course */}
        {toCourse > 0.01 ? (
          <div style={{ position: 'absolute', left: 140, top: 380, width: 1640, opacity: toCourse }}>
            <div style={{ ...rec(1, 0, 600), fontSize: 20, letterSpacing: '0.16em', color: T.mineral3 }}>COURSE PREVIEW · INSPECT THE PLAN BEFORE YOU START</div>
            {CHAPTERS.map((c, i) => {
              const a = HOUSE(prog(f, D + 10 + i * 8, D + 26 + i * 8));
              return (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '20px 0', borderBottom: `1px solid ${T.mineral4}`, transform: `translateX(${(1 - a) * 80}px)`, opacity: a, transformOrigin: 'left' }}>
                  <span style={{ fontFamily: T.serif, fontSize: 50, color: STEPS[i].dish, width: 70 }}>{i + 1}</span>
                  <span style={{ ...rec(0, 0.4, 460), fontSize: 38, color: T.mineral, transform: `scale(${1 + 0.02 * kick})` }}>{c}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </AbsoluteFill>
      {study > 0.01 ? (
        <div style={{ position: 'absolute', left: 960, top: 560, width: 1320, transform: `translate(-50%, -50%) translateY(${(1 - study) * 460}px) scale(${mix(0.92, 1, study)})`, opacity: study * (1 - out) }}>
          <Img src={staticFile('img/desktop-study.png')} style={{ width: 1320, display: 'block' }} />
          <div style={{ position: 'absolute', left: 0, top: -60, ...rec(1, 0, 600), fontSize: 22, letterSpacing: '0.14em', color: VIOLET }}>THE STUDY SURFACE · LESSON, PROGRESS, AND NOTES IN ONE PLACE</div>
        </div>
      ) : null}
      <Flash a={f >= D ? 0.12 * Math.exp(-(f - D) / 6) : 0} color="155,123,255" />
      <EndCard g={g} index="05 / LEARNING PRODUCT" title="BrainBuffet" line="Each answer makes the next choice more useful." accent={VIOLET} from={endFrom} />
      <Vignette />
      <Grain />
      <Score proj="brainbuffet" />
    </AbsoluteFill>
  );
};
export const bbUnused = [RESOLVE, clamp];
