# Kostenwende · Durchgang 1: Audit, Gestaltungskonzept, Testprotokoll

Stand 16.10.2026 · Basis: Repo `dlimburg-bot/Kostenwende`, lokaler Stand `be8a274` (nicht veröffentlicht)
Kennzeichnung: **[gemessen]** · **[Annahme]** · **[offen]**

---

## 1 · Kurzfazit

Technisch ist die Seite stabil und schnell (Lighthouse mobil 98–99 / 100 / 100 / 100, axe 0 Verstöße, CLS 0).
Die größten Schwächen liegen **nicht im Code**, sondern in zwei Feldern:

1. **Fachliche Klarheit des Angebots:** Der Rechner misst die Ersparnis am günstigsten Tarif des Gesamtmarkts,
   vermittelt werden aber nur Tarife aus dem TELESON-Portfolio. Mehrere TELESON-bezogene Aussagen sind nicht belegt.
2. **Gestalterische Eigenständigkeit:** Solide, aber austauschbar: viele gleichförmige Karten, generische Icons,
   12 verschiedene Eckenradien, Systemschrift ohne Charakter.

Durchgang 1 hat nur **Fehler behoben** (Darstellung, Barrierefreiheit, Layout-Sprung) und auf Ihren Wunsch die
**Qualifikationen** eingebunden. Inhalte und Design wurden sonst nicht umgebaut.

---

## 2 · Was tatsächlich getestet wurde

| Prüfung | Werkzeug | Ergebnis |
|---|---|---|
| Statische Prüfung (HTML, JSON-LD, JS-Syntax, Sprungziele, Bilder, Claims-Lint, Secrets, CTA-Konsistenz) | `npm run check` | 0 Fehler, 0 Hinweise [gemessen] |
| Funktion, Layout, Barrierefreiheit, Regression, Urkunden, visuell | Playwright 1.56, 3 Profile (Handy hell/dunkel, Desktop) | **66/66 bestanden**, 3 bewusst übersprungen (nur Handy relevant) [gemessen] |
| Barrierefreiheit WCAG 2.2 AA | axe-core in 3 Ansichten × 3 Profilen | 0 Verstöße [gemessen] |
| Leistung | Lighthouse 12, Median aus 3 Läufen | mobil 98–99 · 100 · 100 · 100, LCP 1,7–1,95 s; Desktop 100 × 4; CLS 0 [gemessen, Labor] |
| Layout-Sprünge | 80 Ladevorgänge mit Layout-Shift-Protokoll | 0,000 in 80/80 (vorher sporadisch bis 0,58) [gemessen] |
| Sichtprüfung | Chromium-Rendering, 16 Kombinationen (320/360/390/768/1440 px, hell/dunkel, 3 Ansichten, Großansicht) | 3 Darstellungsfehler gefunden und behoben [gemessen] |
| Zahlen und Quellen | Primärquellen geöffnet | 8 verifiziert, 3 übernommen, 0 unbelegt; `.qa/claims.json` [gemessen] |

**Nicht geprüft [offen]:** echte Geräte (iPhone/Safari, Android/Chrome), Firefox und Safari-Engine (nicht installiert),
Screenreader von Hand (VoiceOver/NVDA), Live-Seite nach Veröffentlichung (nicht veröffentlicht),
Lead-Strecke Website → Make aus dem echten Browser, Druckansicht.

---

## 3 · Priorisiertes Audit

### Kritisch: Glaubwürdigkeit und Recht (vor jedem Umbau klären)
| # | Befund | Evidenz | Warum kritisch | Lösung / Entscheidung |
|---|---|---|---|---|
| K1 | Rechner-Ersparnis bezieht sich auf den **günstigsten Markttarif** (Verivox), vermittelbar sind nur **TELESON-Tarife** | Rechnerlogik `DATA.grund/ort` [gemessen] | Kann als Leistungsversprechen verstanden werden, das nicht einlösbar ist (UWG § 5) | **Frage 1** |
| K2 | „Ihre Kosten pro Jahr“ beruht auf **Beispielpreisen** (42 ct/kWh, 14 €/Monat), solange nichts eingegeben ist; Beispielpreise ohne Quelle | Rechner [gemessen] | Beispiel und Schätzung werden nicht unterschieden | Kennzeichnung „geschätzt mit Beispielpreis“; Beispielpreis belegen (z. B. Grundversorgungstarif VS). Fachliche Änderung → Freigabe |
| K3 | TELESON-Logo, Versorger-Namen (LichtBlick, Vattenfall …) und „geschult nach BDD-Verhaltensstandards“ **ohne Nachweis** | Seite [gemessen], Nachweise [offen] | Erfundene oder nicht freigegebene Partnerschaft/Schulung wäre irreführend | **Frage 2** |
| K4 | **Privatadresse** zusätzlich in den Google-Daten (JSON-LD) | JSON-LD [gemessen] | Impressum braucht die Anschrift, Google-Daten nicht; Privatsphäre | **Frage 3** |
| K5 | Datenschutzerklärung beschreibt Umami-Messung, die **nicht aktiv** ist; Rechtsprüfung fehlt | Code + Text [gemessen] | Text und Wirklichkeit weichen ab | Bei Aktivierung stimmig; externe Rechtsprüfung |

### Wichtig: Qualität und Wirkung
| # | Befund | Evidenz | Lösung |
|---|---|---|---|
| W1 | **Gestaltung austauschbar:** 18 Karten, 13 generische Icons, 12 Eckenradien, 6 Schattenvarianten | CSS-Zählung [gemessen] | Gestaltungskonzept (Abschnitt 4) |
| W2 | Desktop-Startbereich: linke Spalte endet früh, rechts der lange Rechner → Ungleichgewicht | Sichtprüfung [gemessen] | Neue Hero-Komposition (Konzept) |
| W3 | Bilder als Base64 eingebettet: HTML 199 KB (gzip 88 KB) | Messung [gemessen] | Bilder als Dateien → HTML ≈ 100 KB [Annahme], LCP-Gewinn |
| W4 | „In 3 Jahren bis zu 1.680 €“ und Ring „34 % sparbar“ zeigen die **Obergrenze** ohne Einordnung | Rechner [gemessen] | „bis zu“ am Ring, „bei gleichbleibendem Preisabstand“ |
| W5 | Partner: „Folgeprovision, solange Kunden bleiben“, Provisionssätze nur intern belegbar | Claims Z-10 [gemessen] | Von Ihnen halbjährlich bestätigen |
| W6 | Live-Stand ≠ lokaler Stand; Repo-Umbau (`docs/`) noch nicht veröffentlicht | Git [gemessen] | Freigabe Veröffentlichung |
| W7 | Keine Messung (Umami, Search Console) | Code [gemessen] | Ihre Konten nötig |
| W8 | Eine URL für drei Ansichten (Partner und Recht nicht separat auffindbar) | Sitemap [gemessen] | Eigene Unterseiten (nach Domain-Entscheidung) |

### Optional: Verfeinerung
| # | Befund | Lösung |
|---|---|---|
| O1 | Gas-Durchschnittspreis ist der älteste Wert (Frühjahr 2025) | Neuer Monitoringbericht (Nov. 2026) |
| O2 | „15 Jahre B2B-Vertriebserfahrung“ wäre ein starkes, ehrliches Vertrauenssignal | Nur nach Ihrer Bestätigung |
| O3 | CSP mit 'unsafe-inline' | Nach Auslagerung von CSS/JS |
| O4 | Eigene Domain, Ortsseiten mit echtem Inhalt | Nach Freigabe/Kosten |

### Funktioniert gut, bitte erhalten
Rechenweg des Rechners (Parser, Formel, Quellenzeile) · Formular mit Honeypot, Einwilligung, Make-Anbindung ·
Barrierefreiheit · Ladezeit · durchgängige Quellenangaben · keine erfundenen Bewertungen · klare Partner-Spielregeln.

### Nicht ohne fachliche Freigabe ändern
Tarifabstände und Rechenlogik · Provisionswerte · Aussagen zu TELESON, Versorgern, Schulungen · Rechtstexte.

---

## 4 · Gestaltungskonzept

### Markenwirkung
**„Der Kaufmann an Ihrer Seite“:** ruhig, präzise, regional, ehrlich. Nicht Vergleichsportal (laut, rabattig),
nicht Energiekonzern (anonym), sondern ein geprüfter Kaufmann, der Ihre Rechnung versteht und erklärt.
Die neuen Qualifikationen stützen genau diese Wirkung.

### Leitidee: „Die Rechnung, verständlich gemacht“
Die Gestaltung leiht sich ihre Sprache aus der **Jahresabrechnung**: Positionen mit Summenstrichen, tabellarische Ziffern,
Fußnoten als Quellenangaben, Randnotizen statt Icons. Das macht die Seite eigenständig und passt zum Thema:
Kostenwende macht Kosten lesbar.
*Verworfen:* (a) neues Farbschema in Blau/Petrol: Grün ist bereits eingeführt und schafft Wiedererkennung;
(b) Glas- und Verlaufseffekte: austauschbar, widersprechen der Ruhe; (c) Illustrationen oder KI-Bilder: nicht echt, kosten Vertrauen.

### Farbe: Grün als Anker, mit klaren Aufgaben
| Token | Rolle | Richtwert |
|---|---|---|
| Papier | Hintergrund | warmes Off-White (heute `#F5F6F0`) |
| Tinte | Text | Dunkelgrün-Schwarz (heute `#15241B`) |
| Tannengrün | Marke, Hauptaktion, dunkle Abschnitte | vertieftes Grün, regionaler Bezug Schwarzwald |
| Signalgrün | **nur** Ersparnis und positive Werte | heutiges `#9BC53D`, deutlich sparsamer |
| Bernstein | **nur** aktuelle Kosten | heute schon im Balken „Ihr Preis“ |
| Linie | Trennlinien, Summenstriche | dezent |
Regel: Farbe bedeutet etwas. Ersparnis immer grün, Kosten immer Bernstein, nie dekorativ. Kontrast AA in hell und dunkel.

### Typografie
- **Empfehlung:** Eine Serifenschrift nur für Überschriften und große Zahlen (z. B. *Fraunces* oder *Source Serif 4*,
  Lizenz OFL [Annahme: vor Einbau prüfen]), selbst gehostet, eine Datei ≤ 40 KB, Metrik-Ausgleich gegen Layout-Sprünge.
  Fließtext bleibt Systemschrift (keine Ladezeit).
- Alternative ohne Ladezeit: nur Systemschrift, Charakter über Satz und Ziffern (weniger eigenständig).
- Tabellenziffern für alle Beträge; Skala mit 8 Stufen; Zeilenlänge ≤ 70 Zeichen.

### Layout und Raster
12 Spalten Desktop (max. 1.160 px), 6 Tablet, 4 Handy; 8-px-Grundraster. Jeder Abschnitt bekommt eine eigene Form:
| Abschnitt | heute | Konzept |
|---|---|---|
| Start | Text + Rechner nebeneinander, links Leerraum | Rechner als „Beleg“ im Zentrum, Name, Qualifikation und Nutzen als Kopfzeile; ausgewogen |
| Kennzahlen | 4 Karten | eine Zahlenzeile mit Fußnoten-Quellen, wie eine Abrechnungsposition |
| Ablauf | 3 Karten | nummerierte Zeitleiste (Desktop horizontal, Handy vertikal) |
| Vergleich | Tabelle | redaktionelle Tabelle mit Summenstrich |
| Ansprechpartner | Porträt + Urkunden | Porträt, ein echtes Zitat von Ihnen, Urkunden-Leiste |
| FAQ | Akkordeon | zweispaltig auf Desktop, Akkordeon am Handy |
| Partner | Karten | eigene, etwas energischere Tonlage, gleiches System |

### Bildsprache
Nur echte, funktionale Bilder: Ihr Porträt, Ihre Urkunden, das CO₂-Diagramm, der Abrechnungs-Decoder.
Optional später: eigene Fotos aus der Region. Keine Stockfotos, keine KI-Bilder, keine fremden Logos ohne Freigabe.

### Komponentensystem
Button (primär, sekundär, Text) · Eingabefeld · Segmentschalter · Auswahl-Chip · Ergebnis-„Beleg“ · Quellen-Fußnote ·
Tabelle · Akkordeon · Zeitleiste · Urkunden-Kachel · Großansicht · Hinweisleiste.
Je **1 Schattenstufe**, **3 Radien** (4 / 8 / Pille), Linien statt Kästen.

### Interaktion
Bewegung nur als Rückmeldung (150–250 ms), keine Dauer-Animationen (bereits umgesetzt), Zahlen zählen einmal hoch,
`prefers-reduced-motion` wird respektiert, sichtbarer Fokus überall.

### Responsives Verhalten
Handy zuerst; untere Aktionsleiste bleibt; Wischkarten nur für Vertiefendes; Tablet mit eigenen Regeln (2 × 2);
Desktop zweispaltig nur dort, wo es Inhalte ordnet.

### Überprüfbare Abnahmekriterien für Durchgang 2
| Kriterium | Grenzwert | Heute |
|---|---|---|
| Schriftgrößen | ≤ 8 | 10 |
| Eckenradien | ≤ 3 | 12 |
| Schattenvarianten | ≤ 1 | 6 |
| Karten-Komponenten je Ansicht | ≤ 6 | 18 (gesamt) |
| Dekorative Icons | 0 | 13 |
| axe-Verstöße / Lighthouse A11y | 0 / 100 | 0 / 100 |
| Lighthouse mobil Performance | ≥ 95 | 98–99 |
| LCP / CLS (Labor, mobil) | ≤ 2,0 s / ≤ 0,02 | 1,7–1,95 s / 0 |
| Schrift-Ladegewicht | ≤ 40 KB | 0 |
| Seitenlänge Handy | ≤ 8 Bildschirme | 7,5 / 7,3 |
| Rechner-Regressionstests | unverändert grün | grün |

---

## 5 · Selbstbewertung (interne Kriterien, kein Branchenranking)

| Dimension | Note | Begründung / nächster Schritt |
|---|---|---|
| 1 Eigenständigkeit der Marke | 2 | Template-Wirkung durch Karten/Icons → Konzept, Durchgang 2 |
| 2 Typografie & Hierarchie | 3 | Skala konsolidiert, aber ohne Charakter → Überschriftenschrift |
| 3 Layouts | 3 | Gleichförmige Abschnitte, Desktop-Start unausgewogen → Konzept |
| 4 Verständlichkeit | 4 | Klar, kurze Sätze, Quellen |
| 5 Fachliche Korrektheit | 3 | K1/K2 offen, K3 unbelegt → Ihre Antworten nötig |
| 6 Nutzerführung & Conversion | 4 | Klare Pfade, einheitliche Buttons, Belege am Entscheidungspunkt |
| 7 Mobile Darstellung | 4 | Gut; echte Geräte noch nicht geprüft |
| 8 Barrierefreiheit | 4 | axe 0, Lighthouse 100; Screenreader-Handtest fehlt |
| 9 Performance & Robustheit | 4 | Schnell; Base64-Bilder blähen HTML auf |
| 10 Wartbarkeit & Konsistenz | 3 | Eine 199-KB-Datei mit Inline-CSS/JS; Tests + Regeln jetzt vorhanden |

Alle Dimensionen unter 4 brauchen entweder den Gestaltungsumbau (Durchgang 2) oder Ihre fachlichen Antworten,
deshalb wurden sie in Durchgang 1 bewusst nicht „schnell“ verändert.

---

## 6 · Änderungen in Durchgang 1 (lokal, nicht veröffentlicht)

| Commit | Inhalt |
|---|---|
| `df3917e`, `314ae94` | Phase 0: `docs/`-Struktur, Projektregeln, Skills, Agents, Hooks, Testsuite, Register |
| `2b8d0c2` | Sporadischer Layout-Sprung (CLS bis 0,58) beseitigt |
| `c485e00` | 3 Darstellungsfehler Tablet/Handy |
| `be8a274` | Qualifikationen als Urkunden (ohne Geburtsdatum), „Energieberater“ korrigiert, JSON-LD präzisiert, Fokus nicht mehr von der Handy-Leiste verdeckt |

## 7 · Ihre Freigaben

1. Antworten auf die **3 Fachfragen** (K1, K3, K4).
2. **Veröffentlichung** des lokalen Stands: Push und Umstellung von GitHub Pages auf „main /docs“.
3. **Durchgang 2** (Gestaltungsumbau nach Abschnitt 4) starten.
