---
name: website-audit
description: Ganzheitliches Audit der Kostenwende-Website. Orchestriert SEO, Content, UX/CRO, Performance und QA, führt alle Befunde in einem Register zusammen, priorisiert nach ICE-R und löst Widersprüche. Verwenden bei „Audit“, „was verbessern“, „Growth-Plan“, „Prioritäten“.
---

# Website-Audit (Orchestrator)

Ziel: **ein** priorisiertes, widerspruchsfreies Maßnahmen-Register statt fünf getrennter Listen.
Gilt zusammen mit `CLAUDE.md` (Ziele G1–G5, harte Grenzen, Konfliktregel).

## Ablauf

1. **Ausgangslage messen, nicht vermuten**
   - `git status` lesen; Nutzeränderungen nicht anfassen.
   - `npm run check && npm test && npm run lh` → Ergebnisse nach `.qa/runs/<datum>/`.
   - Vorhandene Felddaten nur nutzen, wenn freigegeben und verfügbar (Search Console, Umami). Sonst als **[offen]** markieren.
2. **Fachprüfungen** – je Bereich den passenden Skill lesen und dessen Checkliste abarbeiten:
   `seo-local`, `content-trust`, `ux-cro`, `performance`. Nur Bereiche laden, die der Auftrag betrifft.
3. **Befunde ins Register** `.qa/findings.json` (Schema unten). Ein Befund = ein Problem + eine Maßnahme.
4. **Zusammenführen**
   - Duplikate zusammenlegen (gleiche Ursache, verschiedene Symptome → ein Befund, mehrere `areas`).
   - Widersprüche suchen: Jede Maßnahme gegen die anderen prüfen. Bei Konflikt Regel aus `CLAUDE.md §4` anwenden,
     Ergebnis in `conflicts_with` + `resolution` eintragen.
   - Harte Grenzen (`CLAUDE.md §3`) prüfen → verletzende Maßnahmen auf `status: "blockiert"`.
5. **Priorisieren** mit ICE-R (unten). Sortieren nach Score, harte Abhängigkeiten (`depends_on`) beachten.
6. **Unabhängig gegenprüfen lassen:** Top-10 an Agent `claims-reviewer` (Aussagen/Recht) und
   Messbehauptungen an Agent `qa-verifier`. Abweichungen übernehmen, nicht wegdiskutieren.
7. **Bericht** nach Vorlage `qa-release` → `.qa/reports/<datum>-audit.md`.

## ICE-R – einheitliches Priorisierungsmodell

| Faktor | Skala | Bedeutung |
|---|---|---|
| **I**mpact | 1–5 | Wirkung auf das Hauptziel; × Zielgewicht aus `CLAUDE.md §2` (G4=3, G1/G2/G5=2, G3=1) |
| **C**onfidence | 1,0 / 0,7 / 0,4 | gemessen / belegt durch Quelle oder Best Practice / Annahme |
| **E**ffort | 1 / 2 / 4 / 8 | ≤ 1 h / ½ Tag / 1 Tag / mehrere Tage |
| **R**isiko | 1 / 1,5 / 3 | gering / mittel (Regression, Markenwirkung) / hoch (Recht, Datenverlust, Ausfall) |

**Score = (Impact × Zielgewicht × Confidence) ÷ (Effort × Risiko)**

Regeln:
- Verletzung einer harten Grenze → `blockiert`, unabhängig vom Score.
- Confidence 0,4 und Effort ≥ 4 → zuerst Messung/Prototyp als eigene Maßnahme anlegen.
- Bei wenig Traffic (< 1.000 Besuche/Monat) keine A/B-Tests planen; stattdessen Vorher/Nachher über 4 Wochen + qualitative Prüfung.

## Schema `.qa/findings.json`

```json
{
  "id": "SEO-003",
  "title": "Partner-Inhalte haben keine eigene URL",
  "areas": ["seo", "ux"],
  "goal": "G1",
  "evidence": { "type": "gemessen", "detail": "sitemap.xml enthält 1 URL; #partner ist Hash-Ansicht", "source": ".qa/runs/2026-10-16/check.json" },
  "action": "Partner-Ansicht als /partner/ mit eigenem Title, Description, Canonical",
  "acceptance": ["/partner/ liefert 200", "eigener <title>", "in sitemap.xml", "Regressionstests grün"],
  "ice_r": { "impact": 4, "weight": 2, "confidence": 0.7, "effort": 4, "risk": 1.5, "score": 0.93 },
  "depends_on": ["OPS-001"],
  "conflicts_with": [],
  "resolution": null,
  "status": "offen"
}
```
Status-Werte: `offen` · `geplant` · `in_arbeit` · `umgesetzt` · `verifiziert` · `blockiert` · `verworfen`.

## Ausgabe an Dennis

Tabelle Top-10 (Maßnahme, Ziel, Score, Aufwand, Risiko, Evidenz-Typ), darunter offene Prüfungen und benötigte Freigaben.
Keine Maßnahme ohne Akzeptanzkriterium.
