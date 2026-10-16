#!/usr/bin/env node
// PostToolUse-Hook (Edit|Write|MultiEdit): schnelle statische Prüfung, aber nur für Dateien der Website (docs/).
// Exit 2 meldet Befunde an Claude zurück, damit sie sofort korrigiert werden. Keine Netzwerkzugriffe.
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, relative } from 'node:path';

let input = {};
try { input = JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { process.exit(0); }
const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const file = input?.tool_input?.file_path;
if (!file) process.exit(0);
const rel = relative(root, file);
if (!rel.startsWith('docs/') || !/\.(html|webmanifest|xml|txt)$/.test(rel)) process.exit(0);

try {
  execFileSync('node', [join(root, 'scripts', 'check.mjs'), '--quick', rel], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], timeout: 25000 });
  process.exit(0);
} catch (e) {
  process.stderr.write(`Statische Prüfung für ${rel} fehlgeschlagen:\n${e.stdout || ''}${e.stderr || ''}`);
  process.exit(2);
}
