#!/usr/bin/env node
// Gesamtlauf: check → test → test:visual → lh. Nur wenn alles grün ist, entsteht .qa/last-pass.json
// (Commit-Hash + Zeit). Diesen Nachweis verlangt der Push-Hook. Der Nachweis ersetzt NICHT die Freigabe durch Dennis.
import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const steps = [['Statische Prüfung', 'npm run check'], ['Tests', 'npm test'], ['Visuelle Regression', 'npm run test:visual'], ['Lighthouse', 'npm run lh']];
const results = [];
for (const [name, cmd] of steps) {
  const t = Date.now();
  try { execSync(cmd, { stdio: 'inherit' }); results.push({ name, ok: true, s: (Date.now() - t) / 1000 }); }
  catch { results.push({ name, ok: false, s: (Date.now() - t) / 1000 }); break; }
}
mkdirSync('.qa', { recursive: true });
const ok = results.length === steps.length && results.every((r) => r.ok);
console.log('\nQA-Ergebnis:'); for (const r of results) console.log(`  ${r.ok ? '✓' : '✗'} ${r.name} (${r.s.toFixed(0)} s)`);
if (ok) {
  const dirty = execSync('git status --porcelain').toString().trim();
  if (dirty) { console.log('Hinweis: nicht committete Änderungen – Nachweis wird nicht ausgestellt.'); process.exit(1); }
  writeFileSync('.qa/last-pass.json', JSON.stringify({ commit: execSync('git rev-parse HEAD').toString().trim(), time: new Date().toISOString(), results }, null, 2));
  console.log('QA bestanden → .qa/last-pass.json. Für das Live-Deployment ist die Freigabe von Dennis nötig.');
}
process.exit(ok ? 0 : 1);
