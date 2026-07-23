#!/usr/bin/env node
// Sanity check: list Buffer channels + whether TikTok is connected yet.
import { listChannels, hasToken } from '../lib/buffer.mjs';
import { paths, readJson, log } from '../lib/util.mjs';

const cfg = readJson(paths.config, {});
if (!hasToken()) {
  log.warn('BUFFER_ACCESS_TOKEN not set. Generate one at https://publish.buffer.com/settings/api');
  process.exit(0);
}
const channels = await listChannels(cfg.publish.bufferOrganizationId);
log.ok(`${channels.length} channel(s):`);
for (const c of channels) log.info(`${c.service.padEnd(10)} ${c.name}  ${c.isDisconnected ? '(disconnected)' : ''}`);
const tt = channels.find((c) => c.service === 'tiktok' && !c.isDisconnected);
console.log(tt ? '\n✓ TikTok is connected — ideas will target it.' : '\n! TikTok not connected yet. Ideas still queue (service is metadata), but no TikTok metrics until it is.');
