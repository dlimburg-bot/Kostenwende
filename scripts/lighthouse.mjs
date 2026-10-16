#!/usr/bin/env node
// Lighthouse mobil + desktop, je 3 Läufe, Median gegen die Grenzwerte aus CLAUDE.md §6.
// Erwartet einen laufenden Server (npm run serve) oder BASE_URL. Schreibt .qa/lighthouse.json.
import { execFileSync, spawn } from 'node:child_process';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

// Lighthouse braucht einen Chrome: den von Playwright verwalteten verwenden (kein Zusatz-Download).
process.env.CHROME_PATH ||= chromium.executablePath();

const URL = process.env.BASE_URL || 'http://localhost:8765/';

// Ohne BASE_URL: eigenen lokalen Server für docs/ starten (und am Ende beenden), falls keiner läuft
let server = null;
if (!process.env.BASE_URL) {
  const up = await fetch(URL).then((r) => r.ok).catch(() => false);
  if (!up) {
    server = spawn('node', ['scripts/serve.mjs'], { stdio: 'ignore' });
    for (let i = 0; i < 50 && !(await fetch(URL).then((r) => r.ok).catch(() => false)); i++) await new Promise((r) => setTimeout(r, 100));
  }
}
const LIMITS = { performance: 95, accessibility: 100, 'best-practices': 100, seo: 100, cls: 0.02, lcp: 2000 };
const median = (a) => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];
mkdirSync('.qa/runs', { recursive: true });

const result = {}; let ok = true;
for (const preset of ['mobile', 'desktop']) {
  const runs = [];
  for (let i = 0; i < 3; i++) {
    const out = `.qa/runs/lh-${preset}-${i}.json`;
    execFileSync('npx', ['lighthouse', URL, '--quiet', '--output=json', `--output-path=${out}`,
      '--chrome-flags=--headless=new --no-sandbox', ...(preset === 'desktop' ? ['--preset=desktop'] : [])], { stdio: 'ignore' });
    const r = JSON.parse(readFileSync(out, 'utf8'));
    runs.push({ ...Object.fromEntries(Object.entries(r.categories).map(([k, v]) => [k, Math.round(v.score * 100)])),
      cls: r.audits['cumulative-layout-shift'].numericValue, lcp: r.audits['largest-contentful-paint'].numericValue });
  }
  const m = Object.fromEntries(Object.keys(runs[0]).map((k) => [k, median(runs.map((x) => x[k]))]));
  const fails = [];
  for (const k of ['performance', 'accessibility', 'best-practices', 'seo']) if (m[k] < LIMITS[k]) fails.push(`${k} ${m[k]} < ${LIMITS[k]}`);
  if (m.cls > LIMITS.cls) fails.push(`CLS ${m.cls.toFixed(3)} > ${LIMITS.cls}`);
  if (preset === 'mobile' && m.lcp > LIMITS.lcp) fails.push(`LCP ${Math.round(m.lcp)} ms > ${LIMITS.lcp}`);
  result[preset] = { median: m, runs, fails }; if (fails.length) ok = false;
  console.log(`${preset}: Perf ${m.performance} · A11y ${m.accessibility} · BP ${m['best-practices']} · SEO ${m.seo} · LCP ${Math.round(m.lcp)} ms · CLS ${m.cls.toFixed(3)} ${fails.length ? '✗ ' + fails.join('; ') : '✓'}`);
}
writeFileSync('.qa/lighthouse.json', JSON.stringify({ time: new Date().toISOString(), url: URL, ...result }, null, 2));
server?.kill();
process.exit(ok ? 0 : 1);
