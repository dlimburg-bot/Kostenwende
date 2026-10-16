---
name: qa-release
description: Qualitätssicherung und Freigabe für Kostenwende – Akzeptanzkriterien, automatisierte Tests, Regression, Barrierefreiheit, Live-Kontrolle nach dem Deployment, Abschlussbericht. Verwenden vor jedem Push/Deployment, bei „testen“, „prüfen“, „Bericht“, „freigeben“.
---

# QA & Release (Ziel G5, Absicherung aller Ziele)

## Freigabe-Ablauf
1. `git status` sauber oder nur eigene, beabsichtigte Änderungen.
2. `npm run qa` → schreibt `.qa/last-pass.json` mit Commit-Hash und Zeitstempel, wenn alles grün ist.
3. Agent `qa-verifier` prüft unabhängig: Testergebnisse, Akzeptanzkriterien der umgesetzten Findings, Screenshots.
4. **Dennis gibt das Live-Deployment frei** (CLAUDE.md §3.5). Erst dann `git push`.
   Der Push-Hook blockiert, wenn `.qa/last-pass.json` nicht zum aktuellen Commit passt.
5. Live-Kontrolle (`npm run smoke:live`): Seite lädt, Titel stimmt, Versionsmarke = Commit, 404 funktioniert.
6. Bericht schreiben, Findings auf `verifiziert` setzen.

## Testebenen
| Ebene | Inhalt | Werkzeug | Dauer |
|---|---|---|---|
| Statisch | HTML-Validität, JSON-LD, JS-Syntax, interne Links, Secrets, Claims-Lint, CTA-Konsistenz | `scripts/check.mjs` (+ html-validate) | < 5 s |
| Funktion | Rechner (Parser, Ergebnis, Gas/Strom, Zielgruppen), Ansichtswechsel, Aufklapper, Wischleisten, Formulare mit Mock | Playwright | ~1 min |
| Layout | 320/360/390/480/768/960/1280 px: kein Querscrollen, keine abgeschnittenen Buttons, Seitenlänge | Playwright | ~1 min |
| Barrierefreiheit | axe-core hell+dunkel, Tastaturbedienung, Fokus sichtbar, `prefers-reduced-motion` | @axe-core/playwright | ~1 min |
| Visuell | Screenshot-Vergleich je Abschnitt mobil+desktop, Toleranz 0,2 % | Playwright `toHaveScreenshot` | ~1 min |
| Leistung | Lighthouse mobil+desktop, Median aus 3 | lighthouse CLI | ~3 min |
| Live | Smoke-Test der veröffentlichten Seite | Playwright gegen Live-URL | < 30 s |
| Lead-Strecke | Ende-zu-Ende über Make (nur mit Freigabe, Testdaten danach löschen) | Make-Verbindung | manuell ausgelöst |

## Akzeptanzkriterien (Vorlage je Maßnahme)
- **Gegeben** … **Wenn** … **Dann** … (prüfbar, mit Messwert oder Testname)
- Nicht-Regression: alle bestehenden Tests grün, Lighthouse innerhalb der Grenzwerte (`performance`).

## Abschlussbericht `.qa/reports/<datum>.md`
1. Was geändert wurde (Commits) und warum (Finding-IDs, Ziele)
2. Messwerte vorher/nachher (Tabelle), getrennt nach **[gemessen]** / **[Annahme]** / **[offen]**
3. Testergebnis je Ebene (bestanden/gesamt)
4. Bekannte Restrisiken und überfällige Claims
5. Nächste Schritte, priorisiert (ICE-R)
