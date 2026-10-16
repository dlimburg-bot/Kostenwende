#!/usr/bin/env node
// Statische Prüfung ohne Abhängigkeiten (nur Node-Bordmittel). Aufruf:
//   node scripts/check.mjs            → alle HTML-Dateien in docs/ + sitemap/robots
//   node scripts/check.mjs --quick f  → nur Datei f (für den PostToolUse-Hook)
// Exit 1 bei Fehlern. Ausgabe: eine Zeile je Befund, maschinenlesbar mit --json.
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd(), SITE = join(ROOT, 'docs');
const args = process.argv.slice(2), quick = args.includes('--quick'), asJson = args.includes('--json');
const files = quick ? [join(ROOT, args[args.indexOf('--quick') + 1])]
  : (function walk(d) { return readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : []; }); })(SITE);

const errors = [], warns = [];
const err = (f, m) => errors.push(`${relative(ROOT, f)}: ${m}`);
const warn = (f, m) => warns.push(`${relative(ROOT, f)}: ${m}`);

// Claims-Lint (CLAUDE.md §3, content-trust)
const BLOCK = [/garantiert/i, /bestpreis/i, /günstigste[rn]?\b/i, /testsieger/i, /nur heute/i, /letzte chance/i, /100\s?% sicher/i];
const REVIEW = [/bis zu \d/i, /sparen sie/i];
// Secret-Muster (der Make-Webhook ist absichtlich öffentlich und daher erlaubt)
const SECRET = [/sk-[a-z0-9]{20,}/i, /ghp_[a-z0-9]{20,}/i, /AKIA[0-9A-Z]{16}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/, /[?&]t=[a-f0-9]{16,}/i];

for (const f of files) {
  if (!f.endsWith('.html')) continue;
  const html = readFileSync(f, 'utf8');
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');
  const is404 = f.endsWith('404.html');

  // SEO-Basis
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (!title) err(f, 'kein <title>'); else if (title.length > 65) warn(f, `<title> ${title.length} Zeichen (> 65)`);
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!is404) { if (!desc) err(f, 'keine Meta-Description'); else if (desc.length > 160) warn(f, `Description ${desc.length} Zeichen (> 160)`); }
  if (!is404 && !/<link rel="canonical" href="https:\/\/[^"]+"/.test(html)) err(f, 'kein absoluter Canonical');
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(f, `${h1} × <h1> (erwartet 1)`);
  if (!/<html lang="de"/.test(html)) err(f, 'lang="de" fehlt');

  // JSON-LD gültig
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { err(f, `JSON-LD ungültig: ${e.message}`); }
  }
  // Inline-JS syntaktisch gültig
  for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    try { new vm.Script(m[1]); } catch (e) { err(f, `JS-Syntaxfehler: ${e.message}`); }
  }
  // Interne Sprungziele vorhanden
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/href="#([^"]+)"/g)) if (!ids.has(m[1])) err(f, `Sprungziel #${m[1]} fehlt`);
  // Bilder
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\balt="/.test(tag)) err(f, 'Bild ohne alt-Attribut');
    if (!/\bwidth="\d+"/.test(tag) || !/\bheight="\d+"/.test(tag)) err(f, 'Bild ohne feste Maße (CLS-Risiko)');
  }
  // Claims-Lint
  for (const r of BLOCK) if (r.test(text)) err(f, `verbotene Formulierung: ${r}`);
  for (const r of REVIEW) if (r.test(text)) warn(f, `prüfen (Beleg/Rechenbasis?): ${r}`);
  // Secrets
  for (const r of SECRET) if (r.test(html)) err(f, `möglicher Secret-Treffer: ${r}`);
  // CTA-Konsistenz: gleiche data-link-Ziele → gleiche Beschriftung (Ausnahme: Ergebnis-Box mit Nutzenformulierung)
  const ctas = {};
  for (const m of html.matchAll(/<a[^>]*data-link="([^"]+)"[^>]*>([^<]+)</g)) (ctas[m[1]] ||= new Set()).add(m[2].trim());
  for (const [k, v] of Object.entries(ctas)) if (v.size > 2) warn(f, `CTA "${k}" mit ${v.size} Beschriftungen: ${[...v].join(' | ')}`);
  // Gewicht
  const kb = Buffer.byteLength(html) / 1024;
  if (kb > 220) warn(f, `HTML ${kb.toFixed(0)} KB (> 220 KB)`);
}

// Sitemap & robots (nur Vollprüfung)
if (!quick) {
  const sm = join(SITE, 'sitemap.xml');
  if (!existsSync(sm)) err(sm, 'sitemap.xml fehlt');
  else for (const m of readFileSync(sm, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) if (m[1].includes('#')) err(sm, `Hash-URL in Sitemap: ${m[1]}`);
  if (!existsSync(join(SITE, 'robots.txt'))) err(join(SITE, 'robots.txt'), 'robots.txt fehlt');
}

const out = { time: new Date().toISOString(), files: files.length, errors, warns };
if (!quick) { mkdirSync(join(ROOT, '.qa'), { recursive: true }); writeFileSync(join(ROOT, '.qa', 'check.json'), JSON.stringify(out, null, 2)); }
if (asJson) console.log(JSON.stringify(out, null, 2));
else {
  for (const e of errors) console.log('FEHLER  ' + e);
  for (const w of warns) console.log('HINWEIS ' + w);
  console.log(`${files.length} Datei(en): ${errors.length} Fehler, ${warns.length} Hinweise`);
}
process.exit(errors.length ? 1 : 0);
