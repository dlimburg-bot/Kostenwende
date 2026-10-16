# Kostenwende – Projektregeln für Claude Code

> Zentrale, verbindliche Projektdatei. Gilt für alle Skills und Subagents.
> Bei Widerspruch gilt: diese Datei > Skill > Einzelanweisung im Chat (außer Dennis entscheidet ausdrücklich anders).

## 1 · Worum es geht

Kostenwende ist die Website von Dennis Limburg, selbstständiger Vertriebspartner der TELESON Vertriebs GmbH
(Strom/Gas-Tarifwechsel, Region Villingen-Schwenningen, Rottweil, Schwarzwald-Baar). Zwei Zielgruppen:
**Sparen** (Haushalte, Betriebe) und **Partner werden** (nebenberufliche Vertriebspartner).

Live: https://dlimburg-bot.github.io/Kostenwende/ · Repo: github.com/dlimburg-bot/Kostenwende

## 2 · Geschäftsziele (gelten für JEDE Empfehlung)

| ID | Ziel | Messgröße (Quelle) |
|---|---|---|
| G1 | Lokale Sichtbarkeit in Suchmaschinen | Impressionen/Klicks für Regions-Suchbegriffe (Search Console), Maps-Aufrufe (Unternehmensprofil) |
| G2 | Fachliche Autorität und Vertrauen | Jede Zahl mit Quelle; echte Bewertungen; Rückfragen „ist das seriös?“ im Gespräch |
| G3 | Marke „Kostenwende“ differenzieren: persönlicher, regionaler Wechselservice statt Vergleichsportal | Markensuchen (Search Console), Wiedererkennung im Gespräch |
| G4 | Besucher → qualifizierte Kontakte (Termin, Rückruf, Foto-Check, Partner-Anfrage) | Leads/Monat (Make-Datenspeicher), Termine (Calendly), Lead-Rate (Webanalyse) |
| G5 | Ladezeit, Bedienbarkeit, Barrierefreiheit, Stabilität | Lighthouse-Grenzwerte (Abschnitt 6), Testsuite grün, 0 JS-Fehler |

Gewichtung für die Priorisierung: G4 = 3 · G1 = 2 · G2 = 2 · G5 = 2 · G3 = 1.

## 3 · Nicht verhandelbar (harte Grenzen, blockieren jede Empfehlung)

1. **Wahrheit:** keine erfundenen Kundenstimmen, Bewertungen, Personen, Zahlen oder Siegel. Jede Zahl braucht Quelle und Stand.
   Unbelegte Zahl = nicht veröffentlichen.
2. **Recht:** UWG §§ 5, 7 (keine Irreführung, keine unerwünschte Werbung), BDD-Verhaltensstandards, TELESON-Vorgaben,
   DSGVO (Datensparsamkeit; Abrechnungen nie über Dritte), EU AI Act Art. 50 (KI-Einsatz offen benennen),
   Pflichtangaben (Impressum, Datenschutz). Keine künstliche Verknappung, kein „Bestpreis/garantiert/Testsieger“.
3. **Sicherheit:** keine Secrets ins Repo, in Logs oder in Antworten. Der Make-Webhook ist absichtlich öffentlich (Formular-Ziel);
   der Status-Schlüssel der Lead-Mails liegt nur in Make und gehört nie ins Repo.
4. **Barrierefreiheit:** WCAG 2.2 AA ist Untergrenze, kein Ziel.
5. **Freigaben:** Live-Deployment, externe Dienste, neue MCP-Verbindungen, Analytics, Kosten, Paketinstallationen,
   Änderungen an Make/Calendly → nur mit ausdrücklicher Zustimmung von Dennis.

## 4 · Konfliktregel zwischen Fachbereichen

Widersprechen sich Empfehlungen, gilt diese Reihenfolge:
**Recht/Wahrheit → Barrierefreiheit & Stabilität → Conversion (G4) → Sichtbarkeit (G1) → Marke (G3) → Ästhetik.**
Typische Auflösungen:
- SEO will mehr Text, UX will kürzer → Inhalt auf eigene Unterseite oder in Aufklapper, nie Keyword-Füllung.
- CRO will Dringlichkeit, Recht verbietet Druck → belegte Fakten (Preise, CO₂-Pfad) statt Countdown.
- Performance will weniger JS, CRO will Interaktion → Interaktion behalten, wenn Lighthouse-Grenzwerte halten.
Jeder Konflikt wird im Findings-Register mit `conflicts_with` und der angewandten Regel dokumentiert.

## 5 · Technische Fakten (gemessen, Stand 2026-10-16)

- Statische Seite, kein Framework, kein Build. Hosting: GitHub Pages (Projektseite unter /Kostenwende/).
- Website-Dateien liegen in `docs/`. Nur `docs/` wird ausgeliefert (GitHub Pages: Quelle „main /docs“ – Umstellung durch Dennis).
- Formulare → Make-Webhook (EU) → Datenspeicher + Outlook-Mail. Termin → Calendly (Gratis: 1 aktive Terminart).
  Partner-Kontakt und Foto-Check → WhatsApp.
- Analytics: Umami vorbereitet, **inaktiv** bis eine Website-ID eingetragen ist (cookielos).
- GitHub Pages erlaubt **keine eigenen HTTP-Header** → CSP nur per `<meta>`; keine Server-Weiterleitungen.
- Keine Felddaten (CrUX/Search Console) vorhanden. Laborwerte ≠ Nutzerrealität.

## 6 · Definition of Done (jede Änderung)

- `npm run qa` grün: statische Prüfung, Funktions-, Layout-, A11y- und visuelle Regressionstests.
- Lighthouse (mobil, Median aus 3 Läufen): Performance ≥ 95, Accessibility = 100, Best Practices = 100, SEO = 100,
  CLS ≤ 0,02, LCP ≤ 2,0 s (Labor).
- 0 JS-Fehler in der Konsole, kein Querscrollen von 320 bis 1280 px, keine abgeschnittenen Buttons.
- Jede neue Zahl: Quelle + Stand im Code-Kommentar und sichtbar auf der Seite.
- Bericht in `.qa/reports/` aktualisiert; Findings-Status gepflegt.

## 7 · Befehle

```bash
npm run check      # statische Prüfung (HTML, JSON-LD, JS-Syntax, Links, Secrets, Claims-Lint) – Sekunden
npm test           # Playwright: Funktion, Layout, A11y (axe), Formulare mit Mock-Endpunkt
npm run test:visual # Screenshot-Regression gegen .qa/baseline
npm run lh         # Lighthouse mobil+desktop, 3 Läufe, Median, gegen Grenzwerte
npm run qa         # alles + Bericht + Freigabe-Marker für den Push-Hook
npm run serve      # lokaler Server auf :8765 (docs/)
```

## 8 · Arbeitsweise

- Erst lesen, dann ändern. Bestehende Nutzeränderungen (git status) nie überschreiben.
- Kleine, einzeln prüfbare Commits. Commit-Text: was + warum + Messwert vorher/nachher.
- Unterscheide in jeder Aussage: **[gemessen]**, **[Annahme]**, **[offen]**.
- Ein Thema → ein Skill. Nicht alle Skills „zur Sicherheit“ laden.
- Nach Abschluss: kurzer Bericht für Dennis (Deutsch, Sie-Form, Tabellen, priorisierte nächste Schritte).

## 9 · Skills und Agents (Übersicht)

| Komponente | Zweck |
|---|---|
| Skill `website-audit` | Orchestriert Audits, führt Findings zusammen, priorisiert (ICE-R), löst Konflikte |
| Skill `seo-local` | Technisches + lokales SEO, strukturierte Daten, Seitenarchitektur |
| Skill `content-trust` | Inhalte, Belege, Markenstimme, Claims-Prüfung |
| Skill `ux-cro` | Nutzerführung, Conversion-Pfade, Formulare, mobile Bedienung |
| Skill `performance` | Ladezeit, Core Web Vitals, Bildgrößen, JS-Last |
| Skill `qa-release` | Akzeptanzkriterien, Regression, Freigabe, Abschlussbericht |
| Agent `qa-verifier` | Unabhängige Prüfung: führt Tests aus, bewertet gegen Akzeptanzkriterien (nur lesend) |
| Agent `claims-reviewer` | Unabhängige Prüfung von Aussagen, Quellen und Rechtsrisiken (nur lesend) |
