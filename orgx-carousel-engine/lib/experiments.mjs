// Append-only experiment log — the memory the learning loop reads from.
// One JSON object per line. Never rewritten in place (only appended / patched via rewrite on status change).
import { readFileSync, appendFileSync, writeFileSync, existsSync } from 'node:fs';
import { paths, ensureDir, nowIso } from './util.mjs';

export function readExperiments() {
  if (!existsSync(paths.experiments)) return [];
  return readFileSync(paths.experiments, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((l) => { try { return JSON.parse(l); } catch { return null; } })
    .filter(Boolean);
}

export function appendExperiment(exp) {
  ensureDir(paths.state);
  const rec = { logged_at: nowIso(), ...exp };
  appendFileSync(paths.experiments, JSON.stringify(rec) + '\n');
  return rec;
}

// Patch a record by id (rewrites the file — fine at this scale).
export function patchExperiment(id, patch) {
  const all = readExperiments();
  let found = false;
  const next = all.map((e) => {
    if (e.id === id) { found = true; return { ...e, ...patch, updated_at: nowIso() }; }
    return e;
  });
  if (found) writeFileSync(paths.experiments, next.map((e) => JSON.stringify(e)).join('\n') + '\n');
  return found;
}

export function findExperiment(id) {
  return readExperiments().find((e) => e.id === id) || null;
}
