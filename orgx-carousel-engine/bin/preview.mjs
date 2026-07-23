#!/usr/bin/env node
// Render a concept to PNGs locally — no posting, no state changes. For eyeballing.
// Usage: node bin/preview.mjs [--concept <id>] [--pillar <key>] [--out <dir>]
import { loadPlaybook, selectConcept } from '../lib/playbook.mjs';
import { conceptToCarousel, buildCaption } from '../lib/generate.mjs';
import { renderCarousel } from '../lib/render.mjs';
import { paths } from '../lib/util.mjs';
import { join } from 'node:path';

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : def;
}

const pb = loadPlaybook();
const id = arg('concept');
const pillar = arg('pillar');
let concept;
if (id) concept = pb.concepts.find((c) => c.id === id);
else if (pillar) concept = pb.concepts.find((c) => c.pillar === pillar);
if (!concept) concept = selectConcept(pb).concept;
if (!concept) { console.error('no concept found'); process.exit(1); }

const carousel = conceptToCarousel(pb, concept);
const caption = buildCaption(pb, concept);
const outDir = arg('out', join(paths.out, 'preview', concept.id));

console.log(`\n▸ concept: ${concept.id}  [${concept.pillar} / ${concept.hook_type}]  slides: ${carousel.slides.length}`);
console.log(`▸ hypothesis: ${concept.hypothesis}`);
const res = await renderCarousel(carousel, { outDir, scale: 2 });
console.log(`✓ rendered ${res.length} slides -> ${outDir}`);
console.log(`\n--- caption ---\n${caption.text}\n---------------`);
