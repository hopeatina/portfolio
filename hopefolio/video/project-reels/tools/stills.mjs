// Bundle once, render many stills: node tools/stills.mjs out/dir 0 20 45 ...
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

const [outDir, ...frames] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts'), webpackOverride: (c) => c });
const inputProps = process.env.QUALITY ? { quality: process.env.QUALITY } : {};
const composition = await selectComposition({ serveUrl, id: process.env.COMP || 'Alma', inputProps, chromiumOptions: { gl: 'angle' } });
for (const fr of frames.map(Number)) {
  const output = path.join(outDir, `f${String(fr).padStart(3, '0')}.png`);
  const t0 = Date.now();
  try {
    await renderStill({ serveUrl, composition, frame: fr, output, inputProps, chromiumOptions: { gl: 'angle' }, timeoutInMilliseconds: 90000 });
  } catch (e) {
    console.log(`frame ${fr} FAILED after ${Date.now() - t0}ms: ${String(e.message).slice(0, 200)}`);
    continue;
  }
  console.log(`frame ${fr} -> ${output} (${Date.now() - t0}ms)`);
}
