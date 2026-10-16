# Durchgang 2 – Gestaltung, Verkaufslogik, Abnahme (Goldstandard 4.0)

Stand: 2026-10-16 · Wiederherstellungspunkt: Git-Tag `vor-durchgang-2` · **Nicht veröffentlicht** (Live-Seite unverändert)

---

## 1 · Gestalterische Richtung

| Konzept | Idee | Eigenständigkeit | Vertrauen | Conversion | Umsetzbarkeit | Ergebnis |
|---|---|---|---|---|---|---|
| **A · Die lesbare Rechnung** | Kosten lesbar machen wie eine gut gesetzte Abrechnung | 5 | 5 | 5 | 5 | **gewählt** |
| B · Schwarzwald-Kontor | Regional, Holz/Tanne, Slab-Serif | 3 | 4 | 4 | 3 | verworfen: Folklore-Risiko, Foto-Abhängigkeit |
| C · Zählerstand | Messinstrument, Mono, dunkel | 4 | 3 | 4 | 4 | verworfen: technisch-kalt, schwächt G2 |

**Begründung:** Das Kernversprechen („Ich rechne Ihre Abrechnung nach“) wird selbst zum Gestaltungsmittel: Rechner als Beleg mit Perforation und doppeltem Summenstrich, Kennzahlen als Positionen, Ablauf als Zeitleiste, Vertrauen als Prüfprotokoll. Keine generischen KI-Muster (Verläufe, Glas, Icon-Kacheln, Dauer-Animationen).

## 2 · Wichtigste Designänderungen

| Bereich | Vorher | Nachher |
|---|---|---|
| Farbsystem | Grün auf Weiß, Farbe ohne Bedeutung | Papier/Tinte/Tanne; **Farbe = Bedeutung**: `--save` Ersparnis, `--cost` Kosten; Hell + Dunkel |
| Typografie | nur Systemschrift | Newsreader (OFL, 1 Schnitt + Kursiv, 42 KB) für Überschriften und große Zahlen |
| Formen | 16 Radien, 11 Schatten (deklariert) | gerendert: Radiusstufen 4/6/8 px (+1 px Balken), 1 Papier-Schatten + Fokus-/Markierungsschatten |
| Ornamentik | 13 Deko-Icons | 0 – ersetzt durch Abschnittsnummern 01…08 wie in einem Dokument |
| Rechner | dunkle Ergebnis-Box | heller Beleg: Positionen, Summenstrich, Ersparnis doppelt unterstrichen |
| FAQ (Desktop) | Kartenstapel | redaktionelle Liste, 2-spaltig, Überschrift bleibt stehen |
| Partner-Nachweise | Bildwand (~250 px) | Randnotiz neben Zeitleiste, Vorschau max. 150 px (Desktop) |

## 3 · Verkaufslogik / Conversion (G4)

- Ersparnis als **Marktwert** gekennzeichnet (K1): „Abstand zum günstigsten Tarif laut Verivox; mein TELESON-Angebot kann abweichen“.
- Beispielpreis-Hinweis verschwindet, sobald eigene Preise eingegeben sind (K2) – Ehrlichkeit als Verkaufsargument.
- Ein Primärziel je Ansicht (Termin bzw. Kennenlernen), Sekundärwege (Foto, Rückruf, WhatsApp) direkt am Beleg.
- Nachweise strategisch: Sparen → beim Ansprechpartner („geprüft und belegt“); Partner → bei der Einarbeitung („gelernt, nicht Learning by Doing“).
- Keine Verknappung, kein Countdown, kein „Bestpreis“ (UWG § 5).

## 4 · Erhaltene Kernfunktionen [gemessen]

Rechner (deutsches Zahlenformat), Calendly Tarif-Check, Rückruf-Formular → Make (im Test gegen Mock), Foto-Check/WhatsApp, Ansichtswechsel Sparen ↔ Partner, Provisionsrechner, Selbst-Check, Dunkelmodus, Nachweis-Großansicht mit Tastatur/Escape, JSON-LD.

## 5 · Tatsächlich durchgeführte Tests

| Prüfung | Ergebnis |
|---|---|
| `npm run check` | 0 Fehler, 0 Hinweise |
| Playwright (3 Projekte: mobil hell/dunkel, desktop) | **66 bestanden**, 3 übersprungen (mobil-only auf Desktop) |
| axe WCAG 2.2 AA (Sparen, Partner, Recht) | 0 Verstöße |
| Querscrollen 320–1280 px (7 Breiten) | keines |
| Seitenlänge mobil | Sparen 7,68 · Partner 7,70 Bildschirme (Grenze 8) |
| Visuelle Regression | Baseline nach Sichtprüfung neu gesetzt, 3/3 grün |
| Lighthouse mobil (Median 3) | Perf 100 · A11y 100 · BP 100 · SEO 100 · **LCP 1,5–1,7 s** · CLS 0,000 |
| Lighthouse desktop | 100/100/100/100 · LCP 0,38 s · CLS 0,000 |
| Browser-Abnahme 1440/768/390 + Dunkel | 2 Runden, 0 JS-Fehler |

**Messkorrektur (QA-005):** Der lokale Testserver lieferte unkomprimiert (207 KB statt 90 KB gzip). Erste Messung daher LCP 2,25 s ✗. Neuer abhängigkeitsfreier Server `scripts/serve.mjs` mit gzip wie GitHub Pages → 1,5 s. Laborwert, keine Felddaten.

## 6 · Selbstkritik (1–5)

| Dimension | Note | Begründung |
|---|---|---|
| Geschäftsverständnis | 5 | Zwei Zielgruppen, eine Logik „nachrechnen statt versprechen“ |
| Eigenständigkeit | 4 | Klar wiedererkennbar; echtes Foto-/Ortsmaterial fehlt noch |
| Design-System-Konsistenz | 4 | Tokens + 3 Radien; Alt-CSS ist überlagert, nicht entfernt (Aufräumen = eigener Schritt) |
| Conversion-Logik | 4 | Klar geführt; ohne Felddaten unbelegt [Annahme] |
| Energiefachliche Korrektheit | 4 | Alle Zahlen mit Quelle; Beispielpreis 42 ct / 14 € ohne Quelle [offen] |
| Motion | 4 | Nur bedeutungstragend, `prefers-reduced-motion` respektiert |
| Barrierefreiheit | 5 | axe 0, Fokus, Tastatur, WCAG 2.4.11 |
| Performance | 5 | Lighthouse 100, CLS 0 |
| Mobile | 5 | 320 px ohne Überlauf, ≤ 8 Bildschirme |
| Technik/Wartbarkeit | 4 | Kein Build, Tests versioniert; HTML 206 KB inline |

Keine Dimension < 4.

## 7 · Verbleibende Risiken

| Risiko | Art | Einschätzung |
|---|---|---|
| Beispielpreis 42 ct/kWh, 14 €/Monat ohne Quelle | Wahrheit/UWG | [offen] – Quelle nennen oder durch BDEW-Wert ersetzen |
| Webfont beim Erstbesuch evtl. nicht sichtbar (`optional`) | Marke | bewusst: Stabilität vor Ästhetik; ab 2. Aufruf aus Cache |
| Alt-CSS überlagert | Wartbarkeit | gering; Bereinigung separat mit Visual-Regression |
| Keine Felddaten | Messung | Search Console/Umami erst nach Freigabe |

## 8 · Offene Punkte – Ihre Freigabe nötig

1. **Veröffentlichen:** Push auf `main`, danach GitHub Pages auf „main /docs“ umstellen (Ihre Einstellung).
2. **Quelle Beispielpreis** 42 ct / 14 € bestätigen oder ersetzen.
3. **Umami / Search Console** aktivieren (Felddaten für G1/G4).
4. Rechtliche Prüfung (Impressum/Datenschutz, Provisionsdarstellung) durch Fachperson.
5. Eigene Domain (optional).
