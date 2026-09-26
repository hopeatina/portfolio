// Capture real gameplay from the deployed Chaos Riders micro-demo via CDP screencast.
// node tools/capture_chaos.mjs out/cap/chaos
import { chromium } from '/Users/hopeatina/Code/chaos-riders-launch/node_modules/playwright/index.mjs';
import fs from 'fs';
const out = process.argv[2] || 'out/cap/chaos'; fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: process.env.HEADED ? false : true, args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1.2 });
await page.goto('https://chaos-riders-launch.vercel.app/', { waitUntil: 'load', timeout: 90000 });
await page.evaluate(() => document.getElementById('drive').scrollIntoView()); await page.waitForTimeout(2500);
await page.click('#drive .crx-game-poster');
await page.waitForSelector('#drive .crx-game-shell .aspect-video', { timeout: 30000, state: 'attached' });
await page.waitForTimeout(1500);


await page.waitForTimeout(6000);
const btn = page.getByText(/start your run/i); await page.evaluate(() => { const s = [...document.querySelectorAll('#drive span,#drive button')].find(e => /start your run/i.test(e.textContent)); (s.closest('button') || s).click(); }); await page.waitForTimeout(1500);
await page.evaluate(() => document.querySelector('#drive .crx-game-shell .aspect-video').scrollIntoView({ block: 'center' }));
await page.waitForTimeout(500);
const box = await page.evaluate(() => { const r = document.querySelector('#drive .crx-game-shell .aspect-video').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
console.log('box', box);
const cdp = await page.context().newCDPSession(page);
let n = 0; const t0 = Date.now(); const stamps = [];
cdp.on('Page.screencastFrame', async (f) => {
  const name = `${out}/${String(n).padStart(5, '0')}.jpg`; fs.writeFileSync(name, Buffer.from(f.data, 'base64'));
  stamps.push([n, (Date.now() - t0) / 1000]); n++;
  await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
});
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 1920, maxHeight: 1080, everyNthFrame: 1 });
// drive: small steering corrections, hold line
const keys = [['ArrowLeft', 350], ['ArrowRight', 500], ['ArrowLeft', 250], ['ArrowRight', 300]];
const end = Date.now() + 24000; let k = 0;
while (Date.now() < end) {
  const [key, ms] = keys[k++ % keys.length];
  if (k % 5 === 0) { await page.keyboard.press('Space'); }
  await page.keyboard.down(key); await page.waitForTimeout(ms); await page.keyboard.up(key);
  await page.waitForTimeout(700);
}
await cdp.send('Page.stopScreencast');
fs.writeFileSync(`${out}/stamps.json`, JSON.stringify({ box, stamps }));
console.log('frames', n, 'fps', n / 24);
await browser.close();
