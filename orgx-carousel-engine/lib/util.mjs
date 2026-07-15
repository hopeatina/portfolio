import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const paths = {
  root: ROOT,
  playbook: join(ROOT, 'playbook.json'),
  config: join(ROOT, 'config.json'),
  state: join(ROOT, 'state'),
  experiments: join(ROOT, 'state', 'experiments.jsonl'),
  queue: join(ROOT, 'state', 'queue.jsonl'),
  posted: join(ROOT, 'posted'),
  reports: join(ROOT, 'reports'),
  out: join(ROOT, 'out'),
};

export function readJson(file, fallback = null) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

export function writeJson(file, obj) {
  ensureDir(dirname(file));
  writeFileSync(file, JSON.stringify(obj, null, 2) + '\n');
}

export function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

export function nowIso() {
  return new Date().toISOString();
}

// YYYY-MM-DD in a given IANA timezone.
export function localDate(tz = 'America/Chicago', d = new Date()) {
  const p = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(d);
  const g = (t) => p.find((x) => x.type === t).value;
  return `${g('year')}-${g('month')}-${g('day')}`;
}

export function slug(s = '') {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}

const C = { dim: '\x1b[2m', b: '\x1b[1m', g: '\x1b[32m', y: '\x1b[33m', r: '\x1b[31m', c: '\x1b[36m', x: '\x1b[0m' };
export const log = {
  step: (m) => console.log(`${C.c}▸${C.x} ${m}`),
  ok: (m) => console.log(`${C.g}✓${C.x} ${m}`),
  warn: (m) => console.log(`${C.y}!${C.x} ${m}`),
  err: (m) => console.log(`${C.r}✗${C.x} ${m}`),
  info: (m) => console.log(`${C.dim}  ${m}${C.x}`),
};
