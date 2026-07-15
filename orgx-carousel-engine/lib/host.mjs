// Turns committed slide PNGs into public URLs Buffer can ingest.
// Strategy "git-raw": raw.githubusercontent.com/<repo>/<branch>/<pathPrefix>/<dateDir>/<file>
export function resolveRepoBranch(cfg) {
  const repo = process.env.GITHUB_REPOSITORY || cfg.hosting.repo;
  const branch = process.env.GITHUB_REF_NAME || cfg.hosting.branch || 'main';
  return { repo, branch };
}

export function rawUrl(cfg, dateDir, file) {
  const { repo, branch } = resolveRepoBranch(cfg);
  const prefix = (cfg.hosting.pathPrefix || 'orgx-carousel-engine/posted').replace(/^\/|\/$/g, '');
  return `https://raw.githubusercontent.com/${repo}/${branch}/${prefix}/${dateDir}/${file}`;
}

// Given rendered file paths (basenames) -> public URLs.
export function hostedUrls(cfg, dateDir, files) {
  if (cfg.hosting.mode === 'local') return files.map((f) => `file://LOCAL/${dateDir}/${f}`);
  return files.map((f) => rawUrl(cfg, dateDir, f));
}
