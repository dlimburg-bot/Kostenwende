---
name: seo-local
description: Technisches und lokales SEO für Kostenwende – Indexierbarkeit, Seitenarchitektur, strukturierte Daten, lokale Suchbegriffe (Villingen-Schwenningen, Rottweil, Schwarzwald-Baar), Unternehmensprofil. Verwenden bei SEO, Google, Sichtbarkeit, Ranking, Schema, Sitemap.
---

# SEO lokal (Ziel G1, unterstützt G2/G3)

## Leitlinien
- Zielgruppe sucht lokal und problemorientiert („Strom wechseln Villingen-Schwenningen“, „Gasanbieter Rottweil“,
  „Energieberater Schwarzwald-Baar“, „nebenberuflich Energie Vertrieb“). Suchbegriffe nie raten:
  ohne Search-Console-Daten als **[Annahme]** kennzeichnen und nach Freischaltung prüfen.
- Eine Suchabsicht = eine URL. Keine Brückenseiten (Doorway Pages): Ortsseiten nur mit echtem, eigenem Inhalt
  (Netzbetreiber, Grundversorger, Anfahrt, örtliche Beispiele).
- Keine Keyword-Füllung, keine versteckten Texte. Konfliktregel `CLAUDE.md §4`.

## Checkliste (jede Seite)
| Prüfpunkt | Erwartung | Test |
|---|---|---|
| HTTP-Status | 200, 404-Seite liefert 404 | Live-Smoke-Test |
| `<title>` | eindeutig, ≤ 60 Zeichen, Ort + Nutzen | `npm run check` |
| Meta-Description | eindeutig, ≤ 155 Zeichen, Handlungsaufforderung ohne Übertreibung | `npm run check` |
| Canonical | absolute URL der Seite selbst | `npm run check` |
| Überschriften | genau eine H1, H2-Hierarchie ohne Sprünge | `npm run check` |
| Strukturierte Daten | gültiges JSON-LD; `ProfessionalService`, `Person`, `FAQPage` nur mit sichtbaren Inhalten | `npm run check` + Rich-Results-Test (manuell) |
| Sitemap/robots | alle indexierbaren URLs, keine Hash-URLs | `npm run check` |
| Interne Links | keine toten Links, sprechende Linktexte | `npm run check` |
| Bilder | `alt`, feste Maße, sinnvolle Dateinamen | `npm run check` |
| Open Graph | Titel, Beschreibung, Bild 1200×630 absolut | `npm run check` |

## Bekannte Ausgangslage [gemessen 2026-10-16]
- Nur **eine** URL indexierbar; „Partner“ und „Recht“ sind Hash-Ansichten → kein eigenes Ranking möglich.
- Adresse auf `github.io`-Unterpfad, keine eigene Domain → schwächeres Markensignal, keine Domain-Property in der Search Console.
- JSON-LD gültig (Organization/ProfessionalService, Person, OfferCatalog, FAQPage).
- Lighthouse-SEO 100 (Labor). Kein Indexierungsstatus bekannt **[offen]**.

## Maßnahmenmuster
- Seitenarchitektur: `/` (Sparen), `/partner/`, `/impressum/`, `/datenschutz/`; später Ortsseiten nur bei belegtem Bedarf.
- Unternehmensprofil (Google): Kategorie, Leistungen, Einzugsgebiet ohne Privatadresse anzeigen, echte Fotos, Beiträge. Nur Dennis kann es anlegen.
- Bewertungen: nur echte, nie incentiviert; Einbindung erst bei ≥ 3 echten Bewertungen.

## Ergebnis
Befunde im Format `website-audit` → `.qa/findings.json` mit Präfix `SEO-`.
