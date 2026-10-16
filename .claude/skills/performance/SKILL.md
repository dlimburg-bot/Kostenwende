---
name: performance
description: Ladezeit und technische Stabilität für Kostenwende – Core Web Vitals (LCP, INP, CLS), Seitengewicht, Bilder, JavaScript, Caching auf GitHub Pages, Sicherheit per CSP. Verwenden bei Performance, Ladezeit, Lighthouse, Web Vitals, ruckelt, langsam, CSP.
---

# Performance & Stabilität (Ziel G5)

## Grenzwerte (Labor, mobil, Median aus 3 Lighthouse-Läufen)
| Messgröße | Grenzwert | Stand 2026-10-16 [gemessen] |
|---|---|---|
| Performance-Score | ≥ 95 | 98–99 |
| LCP | ≤ 2,0 s | 1,6–1,7 s |
| TBT (Ersatz für INP im Labor) | ≤ 150 ms | 0–60 ms (Ausreißer 480 ms nicht reproduzierbar) |
| CLS | ≤ 0,02 | 0–0,004 |
| HTML-Gewicht | ≤ 220 KB unkomprimiert | 190 KB |
| JS-Fehler | 0 | 0 |

Felddaten (CrUX, echte Nutzer) liegen nicht vor **[offen]**; bei geringem Traffic gibt es sie evtl. nie.
Option nach Freigabe: Web-Vitals als Umami-Ereignis senden (cookielos).

## Plattform-Grenzen GitHub Pages
- Keine eigenen HTTP-Header → CSP nur per `<meta>`; `frame-ancestors` per Meta wirkungslos.
- Caching-Header vom Anbieter vorgegeben (kurz) → Dateinamen mit Inhalts-Hash für Bilder/Skripte, sobald ausgelagert.
- HTTPS ist aktiv; HSTS nicht steuerbar.

## Prüfungen und Hebel (in dieser Reihenfolge)
1. Messen: `npm run lh` (3 Läufe, Median), CLS-Quellen mit Layout-Shift-Trace (`npm test` → `perf.spec`).
2. Bilder: feste `width/height`, `loading="lazy"` außerhalb des ersten Bildschirms, WebP/AVIF, Größe passend zur Darstellung.
3. Kritischer Pfad: nichts Blockierendes im `<head>` außer kritischem CSS.
4. JavaScript: keine Dauer-Timer, Animationen nur `transform/opacity`, IntersectionObserver statt Scroll-Events.
5. Sicherheit: CSP ohne `'unsafe-inline'` anstreben (erst nach Auslagerung von CSS/JS; Konflikt mit Effort → ICE-R).

## Regressionen verhindern
Jede Änderung: Lighthouse-Median vorher/nachher im Commit-Text. Abweichung > 3 Punkte oder CLS > 0,02 → nicht ausliefern,
Ursache suchen (Rauschen erst nach 3 Wiederholungen annehmen).

## Ergebnis
Befunde mit Präfix `PERF-` nach Schema `website-audit`.
