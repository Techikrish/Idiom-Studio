import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const CANDIDATES = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

export function findChrome() {
  for (const candidate of CANDIDATES) {
    try {
      fs.accessSync(candidate, fs.constants.X_OK);
      return candidate;
    } catch {
      // continue
    }
  }
  return null;
}

export function screenshot(htmlPath, pngPath, options = {}) {
  const chrome = options.chrome ?? findChrome();
  if (!chrome) {
    throw new Error('No Chrome/Chromium found. Set CHROME_PATH or use preview.html directly.');
  }
  const width = options.width ?? 1500;
  const height = options.height ?? 1430;
  const absoluteHtml = path.resolve(htmlPath);
  const absolutePng = path.resolve(pngPath);
  fs.mkdirSync(path.dirname(absolutePng), { recursive: true });
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-sandbox',
    '--force-device-scale-factor=1',
    `--window-size=${width},${height}`,
    `--screenshot=${absolutePng}`,
    `file://${absoluteHtml}`,
  ];
  const result = spawnSync(chrome, args, { encoding: 'utf8', timeout: 60000 });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`Chrome failed (${result.status}): ${(result.stderr || '').split('\n').slice(-4).join(' ')}`);
  }
  if (!fs.existsSync(absolutePng)) {
    throw new Error('Chrome did not write a screenshot.');
  }
  return absolutePng;
}
