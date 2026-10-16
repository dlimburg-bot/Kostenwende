#!/usr/bin/env node
// Lokaler Server für docs/ – produktionsnah wie GitHub Pages: gzip für Text-Ressourcen.
// Ohne Kompression misst Lighthouse ~2,3× mehr HTML-Bytes als live und verfälscht LCP/FCP.
// Keine Abhängigkeiten (nur Node-Bordmittel).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { extname, join, normalize, resolve } from 'node:path';

const ROOT = resolve('docs');
const PORT = Number(process.env.PORT || 8765);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
const TEXT = /^(text\/|application\/(json|manifest\+json|xml)|image\/svg)/;

createServer(async (req, res) => {
  try {
    let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([/\\])+/, '');
    let file = join(ROOT, p);
    if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    if ((await stat(file).catch(() => null))?.isDirectory()) file = join(file, 'index.html');
    let body = await readFile(file);
    const type = TYPES[extname(file)] || 'application/octet-stream';
    const headers = { 'Content-Type': type, 'Cache-Control': 'max-age=600' };
    if (TEXT.test(type) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) { body = gzipSync(body, { level: 6 }); headers['Content-Encoding'] = 'gzip'; headers.Vary = 'Accept-Encoding'; }
    res.writeHead(200, headers).end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('404'); }
}).listen(PORT, () => console.log(`docs/ auf http://localhost:${PORT}/ (gzip wie GitHub Pages)`));
