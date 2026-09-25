// node tools/stills_multi.mjs outdir Comp:f,f,f Comp:f,f ...  (one bundle, many comps)
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';
const [outDir, ...specs] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const inputProps = process.env.QUALITY ? { quality: process.env.QUALITY } : {};
for (const spec of specs) {
  const [id, frames] = spec.split(':');
  const composition = await selectComposition({ serveUrl, id, inputProps, chromiumOptions: { gl: 'angle' } });
  for (const fr of frames.split(',').map(Number)) {
    const output = path.join(outDir, `${id}_${String(fr).padStart(3, '0')}.png`);
    try { await renderStill({ serveUrl, composition, frame: fr, output, inputProps, chromiumOptions: { gl: 'angle' }, timeoutInMilliseconds: 90000 }); }
    catch (e) { console.log(`${id} ${fr} FAILED ${String(e.message).slice(0, 200)}`); }
  }
}
console.log('done');
