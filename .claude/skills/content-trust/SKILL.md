---
name: content-trust
description: Inhalte, Markenstimme und Belege für Kostenwende – Texte schreiben/überarbeiten, Zahlen und Quellen prüfen, Vertrauen aufbauen, Marke vom Vergleichsportal abgrenzen. Verwenden bei Texten, FAQ, Zahlen, Quellen, Claims, Bewertungen, Markenauftritt.
---

# Content & Vertrauen (Ziele G2, G3, unterstützt G1/G4)

## Markenkern
- **Positionierung:** „Ich prüfe, vergleiche und wechsle für Sie – persönlich, regional, kostenlos.“
  Abgrenzung zum Portal: Erledigung statt Selbstbedienung, fester Ansprechpartner, Erinnerung vor Laufzeitende.
- **Stimme:** Sie-Form, klar, ruhig, konkret. Kurze Sätze. Keine Superlative, kein Druck, kein Fachjargon ohne Erklärung.
- **Partner-Ansprache:** ehrlich zu Aufwand und Verdienst; „nicht für jeden“ ist gewollt (Qualifizierung).

## Belege-Regel (hart, siehe CLAUDE.md §3)
Jede Zahl braucht: Wert · Quelle · Stand (Monat/Jahr) · sichtbare Quellenangabe auf der Seite · Kommentar im Code.

| Status | Bedeutung | Darf live? |
|---|---|---|
| verifiziert | Primärquelle geöffnet, Wert + Stand stimmen | ja |
| übernommen | aus Sekundärquelle, Primärquelle nicht geprüft | nur mit „laut …“ und Prüfauftrag |
| unbelegt | keine Quelle | **nein** |

Register: `.qa/claims.json` mit `{text, wert, quelle, url, stand, status, geprüft_am}`.
Zahlen mit Ablaufdatum (Preise, Durchschnittswerte) halbjährlich neu prüfen; `qa-release` meldet überfällige Einträge.

## Claims-Lint (verbotene/kritische Formulierungen)
Blockieren: „garantiert“, „Bestpreis“, „günstigster“, „Testsieger“, „nur heute“, „letzte Chance“, „100 % sicher“,
erfundene Kundenzitate, Siegel ohne Nachweis.
Prüfen: „bis zu“ (nur mit Rechenbasis), „sparen Sie“ (nur mit „möglich/typisch“ und Quelle), Verdienstangaben (immer „Beispiel, keine Zusage“).

## Inhaltsformate mit Wirkung
- FAQ aus echten Fragen aus Gesprächen (Dennis liefert sie) – identisch im FAQPage-Schema.
- Erklärstücke mit regionalem Bezug (Grundversorger, Netzbetreiber, CO₂-Preis) statt allgemeiner Ratgeber-Texte.
- Partnerseite: Ablauf, Pflichten (Gewerbe), realistische Beispielrechnung, Spielregeln.

## Ergebnis
Befunde mit Präfix `CON-` nach Schema `website-audit`. Bei Zahlen immer Claims-Eintrag anlegen
und den Agent `claims-reviewer` gegenprüfen lassen.
