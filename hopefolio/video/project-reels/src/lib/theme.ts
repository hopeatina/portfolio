import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

// Hope's portfolio identity (hopefolio v4 "material"): Newsreader for the
// editorial voice, Recursive for labels (its MONO/CASL axes are the
// engineer-to-human signature), carbon ground, mineral ink.
loadFont({ family: 'Newsreader', url: staticFile('fonts/newsreader/newsreader-latin-opsz-normal.woff2'), weight: '200 800', format: 'woff2' });
loadFont({ family: 'Newsreader', url: staticFile('fonts/newsreader/newsreader-latin-opsz-italic.woff2'), weight: '200 800', style: 'italic', format: 'woff2' });
loadFont({ family: 'Recursive', url: staticFile('fonts/recursive/recursive-latin-full-normal.woff2'), weight: '300 1000', format: 'woff2' });

export const T = {
  carbon: '#080806',
  carbon2: '#11110e',
  mineral: '#f2efe4',
  mineral2: 'rgba(242,239,228,0.66)',
  mineral3: 'rgba(242,239,228,0.4)',
  mineral4: 'rgba(242,239,228,0.14)',
  signal: '#b7f34a',
  heat: '#ff5738',
  cold: '#48c7ff',
  ochre: '#d9a62e',
  serif: 'Newsreader',
  mono: 'Recursive',
};
/** Recursive axes: mono 0..1 (MONO), casual 0..1 (CASL). */
export const rec = (mono = 1, casual = 0, weight = 450): React.CSSProperties => ({
  fontFamily: T.mono,
  fontWeight: weight,
  fontVariationSettings: `'MONO' ${mono}, 'CASL' ${casual}`,
});
import type React from 'react';
