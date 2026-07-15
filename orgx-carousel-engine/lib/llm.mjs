// OPTIONAL: author a fresh carousel concept via the Anthropic API when the seed bank is
// exhausted or config.llm.enabled. No-ops (returns null) when ANTHROPIC_API_KEY is absent.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './util.mjs';

export function llmAvailable() {
  return !!process.env.ANTHROPIC_API_KEY;
}

function brief() {
  try { return readFileSync(join(ROOT, 'assets', 'brief.md'), 'utf8'); } catch { return ''; }
}

// Returns a concept object shaped like the seed-bank concepts, or null on any failure.
export async function authorFreshConcept(pb, { pillar, model = 'claude-opus-4-8' } = {}) {
  if (!llmAvailable()) return null;
  const p = (pb.pillars || []).find((x) => x.key === pillar) || (pb.pillars || [])[0];
  const formulas = (pb.hook_formulas || []).slice(0, 12)
    .map((f) => `- ${f.name}: ${f.template}`).join('\n');
  const recentHooks = (pb.concepts || []).filter((c) => c.uses > 0).slice(-8)
    .map((c) => c.slides?.[0]?.headline).filter(Boolean).join(' | ');

  const sys = `You are Hope, founder of OrgX, writing a TikTok photo carousel in your own voice.\n\n${brief()}`;
  const user = `Write ONE fresh carousel concept for the "${p.name}" pillar (${p.desc || ''}).
Default accent: ${p.accent}. Hook formulas you can draw on:
${formulas}

Avoid repeating these recent hooks: ${recentHooks || '(none yet)'}.

Return ONLY minified JSON matching:
{"id":"kebab-slug","pillar":"${p.key}","hook_type":"...","title":"...","slides":[{"role":"hook|tension|turn|proof|cta","kicker":"","headline":"<=14 words, **accent** key words","subtext":"","accent":"lime|teal|amber|iris|danger"}],"caption":"full Hope-voice, ends rough","cta":"","hashtags":["#..."],"hypothesis":"what this tests","topic_tags":["..."]}
6-9 slides. No fabricated metrics.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model, max_tokens: 2000, system: sys,
        messages: [{ role: 'user', content: user }],
      }),
    });
    const json = await res.json();
    const text = (json.content || []).map((b) => b.text || '').join('');
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start < 0 || end < 0) return null;
    const concept = JSON.parse(text.slice(start, end + 1));
    concept.status = 'ready';
    concept.uses = 0;
    concept.last_used = null;
    concept.origin = 'llm-authored';
    return concept;
  } catch {
    return null;
  }
}
