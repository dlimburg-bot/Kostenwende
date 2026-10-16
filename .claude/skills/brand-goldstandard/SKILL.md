---
name: brand-goldstandard
description: Master-Skill für Kostenwende nach „Master Prompt Goldstandard 4.0“. Führt Marken-, Design-, Vertriebs- und Engineering-Durchgänge in 12 Phasen mit messbaren Freigabe-Toren durch und verhindert generische KI-Gestaltung per Design-Lint. Verwenden bei „Redesign“, „Agentur-Niveau“, „Marke“, „Goldstandard“, „wirkt wie KI“, „Durchgang“, „Premium“.
---

# Brand-Goldstandard (Master-Skill)

Ein Durchgang = Geschäft verstehen → Marke entscheiden → System bauen → Vertrieb schärfen → fachlich prüfen →
umsetzen → **messen** → selbst kritisieren → im Browser abnehmen → berichten.
Gilt zusammen mit `CLAUDE.md` (Ziele G1–G5, harte Grenzen §3, Konfliktregel §4, Definition of Done §6).
Fachdetails holt dieser Skill aus den Spezial-Skills; er lädt sie **nur für die Phase, die sie braucht**.

**Grundsatz:** Behauptungen über Qualität zählen nur mit Messwert, Screenshot oder Testergebnis.
„Wirkt professioneller“ ist kein Ergebnis.

---

## Phasen, Ergebnisse, Tore

| # | Phase | Pflichtergebnis (Datei) | Tor – erst weiter, wenn … |
|---|---|---|---|
| 0 | Sicherung | Git-Tag `vor-<durchgang>`; `git status` gelesen | Tag existiert, keine fremden Änderungen überschrieben |
| 1 | Geschäft verstehen | `.qa/brand/<datum>-geschaeft.md` (7 Fragen, siehe unten) | jede Aussage `[gemessen]`/`[Annahme]`/`[offen]`; offene Geschäftsfragen gesammelt |
| 2 | Drei Konzepte | `.qa/brand/konzepte/{a,b,c}.html` + Screenshots 1440/390 + Bewertung | Konzepte unterscheiden sich in **Idee**, nicht nur Farbe; Wahl begründet |
| 3 | Anti-KI-Prüfung des Konzepts | Abgleich mit `references/anti-generic.md` | gewähltes Konzept verletzt keine Regel AG-01…AG-12 |
| 4 | Design-System | Tokens in `docs/index.html :root` + `references/brand-system.md` aktualisiert | jede Farbe/Größe/Radius/Bewegung kommt aus einem Token; Hell + Dunkel |
| 5 | Vertrieb & Conversion | Seitenreihenfolge + CTA-Hierarchie im Bericht | eine Primärhandlung je Ansicht; keine Dringlichkeit ohne Beleg |
| 6 | Energiefachlich | `.qa/claims.json` aktualisiert; Agent `claims-reviewer` | jede Zahl mit Quelle + Stand; keine erfundenen Konditionen |
| 7 | Motion | Bewegungsregeln in `brand-system.md` | nur transform/opacity, ≤ 0,6 s, `prefers-reduced-motion` greift, 0 Endlos-Animationen |
| 8 | Umsetzung | kleine Commits (was + warum + Messwert) | `npm run check` grün nach jedem Schritt |
| 9 | Selbstkritik | Raster aus `references/rubric.md` | jede Dimension ≥ 4 oder Schwäche + Ursache + Korrektur dokumentiert |
| 10 | Browser-Abnahme | Screenshots 1440/768/390, hell + dunkel, beide Ansichten | Top-3-Schwächen behoben und erneut fotografiert |
| 11 | Human in the Loop | Fragenliste (max. 3) | nur Geschäft, Daten, Recht, Veröffentlichung – nie Gestaltungsdetails |
| 12 | Abschluss | `.qa/reports/<datum>-<durchgang>.md` nach `references/report-template.md` | `npm run qa` grün (inkl. Design-Lint); Bericht an Dennis |

### Phase 1 – die 7 Fragen (für Kostenwende vorbelegt, bei jedem Durchgang prüfen)

1. Kundenproblem: zu hohe Strom-/Gaskosten aus Trägheit (Grundversorgung, nie gewechselt). → Quelle: Bundesnetzagentur-Monitoring.
2. Leistung: **Vermittlung und Wechselservice** für Strom/Gas über TELESON. **Keine** Gebäudeenergieberatung, kein „Energieberater“ (Test sichert das ab).
3. Zielgruppen: Haushalte, Betriebe (Region VS/Rottweil/Schwarzwald-Baar) · nebenberufliche Vertriebspartner.
4. Vertrauen: echte Person + Foto, IHK-Nachweise, Quellen an jeder Zahl, korrekte TELESON-Rolle (selbstständiger Vertriebspartner).
5. Primärhandlung: Sparen → Termin (Calendly) / Rechner; Partner → Kennenlernen.
6. Geschäftskritisch: Rechner, Calendly-Link, Formular → Make, WhatsApp, Ansichtswechsel, Provisionsrechner, JSON-LD.
7. Belege: `.qa/claims.json`. Alles ohne Quelle ist `[offen]` und wird nicht veröffentlicht.

### Phase 2 – Konzeptsteckbrief (je Konzept)

Markenpersönlichkeit · Leitidee (ein Satz) · Farbwelt · Typografie · Layoutprinzip · Bildsprache · Zahlen/Daten ·
Motion · Vertrauenswirkung · Eignung. Bewertung 1–5: Eigenständigkeit, Glaubwürdigkeit, Wiedererkennbarkeit, Umsetzbarkeit.
Prototypen als einzelne HTML-Dateien mit **echten Inhalten** (Hero + Rechner-Ausschnitt), nie Platzhalter.
Konzepte, die nur Farbvarianten sind, zählen als **ein** Konzept.

## Werkzeuge

```bash
npm run design   # Design-Lint der gerenderten Seite (AG-01…AG-12), 1440/768/390 × hell/dunkel × Sparen/Partner
npm run qa       # check → test → visual → design → lighthouse → Freigabe-Marker
npm run serve    # lokaler Server mit gzip (wie GitHub Pages)
```

Spezial-Skills je Phase: Phase 5 → `ux-cro` · Phase 6 → `content-trust` · Phase 8 Performance → `performance` ·
SEO-Auswirkungen → `seo-local` · Phase 12 → `qa-release`. Unabhängige Prüfung: Agents `claims-reviewer`, `qa-verifier`.

## Harte Regeln dieses Skills

- **Design-Lint ist ein Tor, kein Hinweis.** Ein Verstoß blockiert Commit-Freigabe und Veröffentlichung.
  Grenzwerte ändern nur zusammen mit `references/brand-system.md` und einer Begründung im Bericht.
- Kein neues Framework, keine Build-Kette, keine externen Schriften/CDNs (DSGVO, CSP). Schriften selbst hosten (OFL).
- Keine erfundenen Zahlen, Bewertungen, Siegel, Partner, Konditionen (CLAUDE.md §3.1).
- Veröffentlichung nur mit Freigabe von Dennis (CLAUDE.md §3.5). „Alles aktivieren“ im Chat gilt als Freigabe für den genannten Durchgang.
- Bei Widerspruch: Recht/Wahrheit → A11y/Stabilität → Conversion → Sichtbarkeit → Marke → Ästhetik.

## Referenzen

- `references/anti-generic.md` – die 12 messbaren Anti-Muster mit Begründung und erlaubten Ausnahmen
- `references/brand-system.md` – gültiges Markensystem v4 „Nachtstrom“ (Tokens, Typo, Raster, Motion, Komponentenregeln)
- `references/master-prompt-cinematic.md` – Master-Prompt Cinematic 5.0 (Stilreferenz von Dennis, Übertragung, Tore)
- `scripts/render-szenen.py` – erzeugt die Szenen-Grafiken reproduzierbar (`python3 scripts/render-szenen.py docs/szene`)
- `references/rubric.md` – Bewertungsraster 1–5 je Dimension mit konkreten Ankern
- `references/report-template.md` – Abschlussbericht für Dennis
