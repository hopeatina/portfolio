#!/usr/bin/env node
// DAILY STEP 2 — queue the already-rendered bundle into Buffer as a review Idea (draft).
// Run AFTER the slide PNGs for the date are committed + pushed (so their raw URLs resolve).
//
// Usage: node bin/queue.mjs --date <YYYY-MM-DD>
import { join } from 'node:path';
import { createIdea, hasToken } from '../lib/buffer.mjs';
import { patchExperiment } from '../lib/experiments.mjs';
import { paths, readJson, localDate, log } from '../lib/util.mjs';

const val = (f) => { const i = process.argv.indexOf(`--${f}`); return i >= 0 ? process.argv[i + 1] : null; };
const cfg = readJson(paths.config, {});
const date = val('date') || localDate(cfg.cadence?.timezone || 'America/Chicago');

const bundle = readJson(join(paths.posted, date, 'bundle.json'));
if (!bundle) { log.err(`no bundle at posted/${date}/bundle.json — run generate.mjs first`); process.exit(1); }
const { experiment: exp, carousel, caption } = bundle;

const media = exp.image_urls.map((url, i) => ({ url, alt: carousel.slides[i]?.alt || exp.title }));

if (!hasToken()) {
  patchExperiment(exp.id, { status: 'pending-queue' });
  log.warn('BUFFER_ACCESS_TOKEN not set — nothing sent to Buffer.');
  log.info('Bundle is ready for review-queue. Set the token (or queue via the Buffer MCP create_idea) to push it.');
  log.info(`media urls:\n  ${media.map((m) => m.url).join('\n  ')}`);
  process.exit(0);
}

try {
  const { ideaId, typename } = await createIdea({
    organizationId: cfg.publish.bufferOrganizationId,
    title: exp.title,
    text: caption.text,
    media,
    services: cfg.publish.services || ['tiktok'],
  });
  patchExperiment(exp.id, { status: 'queued', buffer_idea_id: ideaId });
  log.ok(`queued Buffer idea ${ideaId} (${typename}) — review + publish it from Buffer.`);
} catch (e) {
  patchExperiment(exp.id, { status: 'error', error: String(e.message || e) });
  log.err(`Buffer queue failed: ${e.message || e}`);
  process.exit(1);
}
