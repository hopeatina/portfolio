import { random } from 'remotion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Typewriter-resolve (data resolves, never fades): characters left of the
 * head show the target, a 3-char scramble rides the head, the old text
 * remains to its right. `t` 0..1.
 */
export const resolveText = (from: string, to: string, t: number, seed: string, frame: number): string => {
  if (t <= 0) return from;
  if (t >= 1) return to;
  const n = Math.max(from.length, to.length);
  const target = to.padEnd(n, ' '); // a shorter target erases the old tail as the scan passes
  const head = t * (n + 3);
  let out = '';
  for (let i = 0; i < n; i++) {
    if (i < head - 3) out += target[i];
    else if (i < head) {
      const ch = target[i];
      out += ch === ' ' ? ' ' : GLYPHS[Math.floor(random(`${seed}${i}${Math.floor(frame / 2)}`) * GLYPHS.length)];
    } else out += from[i] ?? ' ';
  }
  return out.replace(/\s+$/, '');
};

/** Same scan as resolveText, split so the untouched old tail can be styled. */
export const resolveParts = (from: string, to: string, t: number, seed: string, frame: number) => {
  if (t <= 0) return { head: '', tail: from };
  if (t >= 1) return { head: to, tail: '' };
  const n = Math.max(from.length, to.length);
  const target = to.padEnd(n, ' ');
  const h = t * (n + 3);
  let head = '';
  let tail = '';
  for (let i = 0; i < n; i++) {
    if (i < h - 3) head += target[i];
    else if (i < h) {
      const ch = target[i];
      head += ch === ' ' ? ' ' : GLYPHS[Math.floor(random(`${seed}${i}${Math.floor(frame / 2)}`) * GLYPHS.length)];
    } else tail += from[i] ?? '';
  }
  return { head, tail };
};
