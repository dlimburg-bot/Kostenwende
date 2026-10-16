#!/usr/bin/env node
// Design-Lint: misst die GERENDERTE Seite gegen die Anti-Muster aus
// .claude/skills/brand-goldstandard/references/anti-generic.md (Regeln AG-01 … AG-12).
// Läuft bei 1440 / 768 / 390 px, hell + dunkel, Ansichten Sparen + Partner. Exit 1 bei Verstoß.
// Schreibt .qa/design-lint.json. Keine Abhängigkeiten außer Playwright (bereits vorhanden).
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const URL = process.env.BASE_URL || 'http://localhost:8765/';
let server = null;
if (!(await fetch(URL).then((r) => r.ok).catch(() => false))) {
  server = spawn('node', ['scripts/serve.mjs'], { stdio: 'ignore' });
  for (let i = 0; i < 50 && !(await fetch(URL).then((r) => r.ok).catch(() => false)); i++) await new Promise((r) => setTimeout(r, 100));
}

// Grenzwerte = Markensystem v4 „Nachtstrom“ (references/brand-system.md, Master-Prompt Cinematic 5.0).
// Änderung nur zusammen mit dem Markensystem und Begründung im Bericht.
const RULES = {
  maxRadii: 3,            // AG-01 Radiusstufen (ohne Kreise ≥ 50 % und 0)
  maxPill: 0,             // AG-02 Pillen außerhalb von Handlungen (a/button) – v4: Pillen nur für Handlungen
  fonts: ['Archivo'],     // AG-03 nur Markenschrift
  maxShadows: 4,          // AG-04 verschiedene Schattenwerte
  maxGradients: 0,        // AG-05 Verlaufsflächen (Diagramme/Bilder ausgenommen)
  maxEyebrowCaps: 0,      // AG-06 VERSALIEN-Labels mit Sperrung
  maxItalicHead: 0,       // AG-07 kursive Akzente in Überschriften
  maxInfinite: 0,         // AG-08 Endlos-Animationen
  maxCardRuns: 2,         // AG-09 Abschnitte mit ≥ 3 gleich gebauten Karten in Folge
  maxCheckChips: 0,       // AG-10 Häkchen-Vorteilsleisten
  minH1H2: 1.2,           // AG-11 typografische Dramaturgie: h1 ≥ 1,2 × h2
  heroCentered: true,     // AG-12 v4: zentrierter Szenensatz über Vollbild-Szene ist Konzept (Referenz Dennis 16.10.2026)
};

const measure = () => {
  const vis = (e) => { const r = e.getBoundingClientRect(); const c = getComputedStyle(e); return r.width > 0 && r.height > 0 && c.visibility !== 'hidden' && c.display !== 'none' && !e.closest('[hidden],dialog:not([open])'); };
  const all = [...document.querySelectorAll('body *')].filter(vis);
  const radii = new Set(), shadows = new Set(), fonts = new Set(); const pills = [], grads = [], caps = [], ital = [], inf = [];
  for (const e of all) {
    const c = getComputedStyle(e), r = e.getBoundingClientRect();
    const rad = parseFloat(c.borderTopLeftRadius);
    const full = c.borderTopLeftRadius.includes('%') || rad >= Math.min(r.width, r.height) / 2 - 1;
    const circle = full && Math.abs(r.width - r.height) <= 2;
    const pill = full && !circle && r.height < 80 && r.height > 12; // Balken/Indikatoren ≤ 12 px sind keine Pillen-Komponenten
    if (rad > 0 && !full) radii.add(Math.round(rad));
    if (pill && !e.matches('a,button,a *,button *,.skip')) pills.push(e.className || e.tagName);
    if (c.boxShadow !== 'none' && !e.matches(':focus,:focus-visible')) shadows.add(c.boxShadow);
    if (e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) fonts.add(c.fontFamily.split(',')[0].replace(/"/g, '').trim());
    if (/gradient\(/.test(c.backgroundImage) && !e.closest('svg,.chart,.panel::before,.progress')) grads.push(e.className || e.tagName);
    if (c.textTransform === 'uppercase' && parseFloat(c.letterSpacing) > 0.5 && e.textContent.trim().length > 3) caps.push(e.textContent.trim().slice(0, 30));
    if (e.matches('h1,h2,h3,h1 *,h2 *,h3 *,.h1like,.h1like *') && c.fontStyle === 'italic') ital.push(e.textContent.trim().slice(0, 30));
    if (c.animationIterationCount === 'infinite' && c.animationName !== 'none') inf.push(e.className);
  }
  // AG-09: Abschnitte, deren Hauptinhalt ≥ 3 gleich gebaute .card-Geschwister sind
  let cardRuns = 0;
  for (const s of document.querySelectorAll('section')) { if (!vis(s)) continue;
    const groups = [...s.querySelectorAll('*')].filter((p) => [...p.children].filter((k) => k.classList.contains('card') && vis(k)).length >= 3);
    if (groups.some((g) => { const sig = [...g.children].filter((k) => k.classList.contains('card')).map((k) => [...k.children].map((x) => x.tagName).join()); return new Set(sig).size === 1; })) cardRuns++; }
  // AG-10: Listen, in denen jedes Element mit einem sichtbaren Häkchen beginnt
  const checkChips = [...document.querySelectorAll('ul')].filter(vis).filter((u) => u.children.length >= 3 && [...u.children].every((li) => {
    const svg = li.querySelector(':scope > svg'); const b = getComputedStyle(li, '::before').content;
    return (svg && vis(svg)) || /✓|✔/.test(b); })).length;
  const h1 = document.querySelector('.view:not([hidden]) h1, .view:not([hidden]) .h1like'); const h2 = document.querySelector('.view:not([hidden]) section:not(.hero) h2');
  const ratio = h1 && h2 ? parseFloat(getComputedStyle(h1).fontSize) / parseFloat(getComputedStyle(h2).fontSize) : 0;
  const heroCentered = h1 ? getComputedStyle(h1).textAlign === 'center' : false;
  return { radii: [...radii].sort((a, b) => a - b), pills, fonts: [...fonts], shadows: [...shadows], grads, caps, ital, inf, cardRuns, checkChips, ratio: +ratio.toFixed(2), heroCentered,
    overflow: document.documentElement.scrollWidth > innerWidth };
};

const browser = await chromium.launch();
const report = []; let fail = false;
for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) for (const scheme of ['light', 'dark']) for (const hash of ['', '#partner']) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, colorScheme: scheme });
  const errs = []; page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(URL + hash); await page.waitForTimeout(300);
  await page.addStyleTag({ content: '.js .rv{opacity:1!important;transform:none!important}' });
  const m = await page.evaluate(measure);
  const v = [];
  if (m.radii.length > RULES.maxRadii) v.push(`AG-01 Radien ${m.radii.join('/')} (max ${RULES.maxRadii})`);
  if (m.pills.length > RULES.maxPill) v.push(`AG-02 Pillen: ${[...new Set(m.pills)].slice(0, 4).join(', ')}`);
  const badFonts = m.fonts.filter((f) => !RULES.fonts.includes(f)); if (badFonts.length) v.push(`AG-03 Fremdschriften: ${badFonts.join(', ')}`);
  if (m.shadows.length > RULES.maxShadows) v.push(`AG-04 Schatten: ${m.shadows.length} Varianten (max ${RULES.maxShadows})`);
  if (m.grads.length > RULES.maxGradients) v.push(`AG-05 Verläufe: ${[...new Set(m.grads)].slice(0, 4).join(', ')}`);
  if (m.caps.length > RULES.maxEyebrowCaps) v.push(`AG-06 Versalien-Labels: ${m.caps.slice(0, 3).join(' | ')}`);
  if (m.ital.length > RULES.maxItalicHead) v.push(`AG-07 Kursiv in Überschrift: ${m.ital.slice(0, 2).join(' | ')}`);
  if (m.inf.length > RULES.maxInfinite) v.push(`AG-08 Endlos-Animation: ${m.inf.join(', ')}`);
  if (m.cardRuns > RULES.maxCardRuns) v.push(`AG-09 Kartenraster in ${m.cardRuns} Abschnitten (max ${RULES.maxCardRuns})`);
  if (m.checkChips > RULES.maxCheckChips) v.push(`AG-10 Häkchen-Leisten: ${m.checkChips}`);
  if (m.ratio && m.ratio < RULES.minH1H2) v.push(`AG-11 h1/h2 = ${m.ratio} (min ${RULES.minH1H2})`);
  if (m.heroCentered !== RULES.heroCentered) v.push('AG-12 zentrierte Hero');
  if (m.overflow) v.push('Querscrollen');
  if (errs.length) v.push(`JS-Fehler: ${errs[0]}`);
  const id = `${w}px ${scheme} ${hash || '#sparen'}`;
  report.push({ id, violations: v, measured: { radii: m.radii, fonts: m.fonts, shadows: m.shadows.length, ratio: m.ratio, cardRuns: m.cardRuns } });
  console.log(`${v.length ? '✗' : '✓'} ${id}${v.length ? '\n    ' + v.join('\n    ') : ''}`);
  if (v.length) fail = true;
  await page.close();
}
await browser.close(); server?.kill();
mkdirSync('.qa', { recursive: true });
writeFileSync('.qa/design-lint.json', JSON.stringify({ time: new Date().toISOString(), rules: RULES, report }, null, 2));
console.log(fail ? '\nDesign-Lint: Verstöße gefunden (siehe oben).' : '\nDesign-Lint: keine generischen Muster gemessen.');
process.exit(fail ? 1 : 0);
