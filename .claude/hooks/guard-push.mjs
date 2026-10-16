#!/usr/bin/env node
// PreToolUse-Hook (Bash): erlaubt `git push` nur, wenn `npm run qa` für genau diesen Commit bestanden hat.
// Exit 0 = erlauben, Exit 2 = blockieren (stderr geht als Begründung an Claude). Liest nur, schreibt nichts.
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';

let input = {};
try { input = JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { process.exit(0); }
const cmd = String(input?.tool_input?.command || '');
if (!/\bgit\s+push\b/.test(cmd)) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const block = (msg) => { process.stderr.write(`Push blockiert: ${msg}\n`); process.exit(2); };

const marker = join(root, '.qa', 'last-pass.json');
if (!existsSync(marker)) block('Kein QA-Nachweis. Erst `npm run qa` ausführen und Dennis um Freigabe bitten.');

let pass;
try { pass = JSON.parse(readFileSync(marker, 'utf8')); } catch { block('QA-Nachweis unlesbar.'); }
const head = execSync('git rev-parse HEAD', { cwd: root }).toString().trim();
if (pass.commit !== head) block(`QA-Nachweis gilt für ${String(pass.commit).slice(0, 7)}, aktueller Commit ist ${head.slice(0, 7)}. \`npm run qa\` erneut ausführen.`);
if (Date.now() - Date.parse(pass.time) > 2 * 60 * 60 * 1000) block('QA-Nachweis älter als 2 Stunden. `npm run qa` erneut ausführen.');
const dirty = execSync('git status --porcelain', { cwd: root }).toString().trim();
if (dirty) block('Nicht committete Änderungen vorhanden. Erst committen oder bewusst verwerfen (durch Dennis).');
process.exit(0);
