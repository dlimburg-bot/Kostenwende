# Durchgang 3 – Markensystem „Wendepunkt“ + Master-Skill (2026-10-16)

Wiederherstellungspunkt: Tag `vor-durchgang-3` · Ablauf nach Skill `brand-goldstandard` · Freigabe Dennis: „Ja, alles aktivieren“ (16.10.2026)

## 1 · Gestalterische Richtung
| Konzept | Eigenständigkeit | Glaubwürdigkeit | Wiedererkennbarkeit | Umsetzbarkeit | Ergebnis |
|---|---|---|---|---|---|
| A · Lesbare Rechnung (D2) | 2 | 4 | 3 | 5 | verworfen: Design-Lint 6 Regelverstöße, typischer KI-Look |
| B · Schwarzwald-Kontor | 3 | 3 | 3 | 3 | verworfen: Folklore, fehlende Fotos |
| **C · Wendepunkt** | 5 | 5 | 5 | 5 | **umgesetzt** |

Nachtblau stammt aus dem echten Porträt, Gelb ist ausschließlich Handlung und Ergebnis. Die Wende-Kurve (steigt, kippt, fällt) erzählt das Produkt und trägt Logo, Favicon, App-Icons und die Hero-Linie.

## 2 · Wichtigste Designänderungen
| Bereich | Vorher (D2) | Nachher (v3) |
|---|---|---|
| Schrift | Newsreader-Serif + Kursivakzent | Archivo Display 800 / Archivo 400–700 (OFL, 47 KB) |
| Farbe | Papier-Creme, Tannengrün | Weiß · Kühlgrau · Nachtblau · Signalgelb |
| Marke | Wortmarke | Bildmarke Wende-Kurve + Favicon + 4 App-Icons |
| Hero | Papierfläche | Nachtblau, Rechner als weißes Werkzeug, Kurve als Preislinie |
| Labels | VERSALIEN, nummeriert, mit Linie | normaler Satz in Grau |
| Navigation | Pillen-Schalter | Unterstreichungs-Reiter |
| Ablauf | Kreise mit Ziffern | große Display-Ziffern auf 4-px-Linie |
| Listen/Karten | Häkchen, Kartenraster | Strich-Marken, Linienlisten |
| Brücke zu Partner | dunkles Band | signalgelbes Handlungsband |
| Radien / Schatten | 4 Radien, 5 Schatten | 3 Radiusstufen (2/4 + Kreise), 1 Panel-Schatten |

## 3 · Conversion
- Primär-CTA auf Nachtblau gelb, auf Weiß nachtblau – eine Handlungsfarbe, sofort auffindbar.
- Rechner-Ergebnis als nachtblaue Ergebnisfläche, Ersparnis in Gelb, als Marktwert gekennzeichnet.
- **Beispielpreis jetzt belegt:** Grundversorgung SVS „SVSstrom allgemein“ 39,91 ct/kWh + 14,98 €/Monat (1.576,61 €/Jahr bei 3.500 kWh), Quelle im Rechner sichtbar.
- Mobil: doppelte Vorteilszeile entfernt (steht am Rechner), Schrittliste kompakt → Sparen 7,92 und Partner 7,82 Bildschirme.

## 4 · Erhaltene Kernfunktionen [gemessen]
Rechner, Calendly, Rückruf → Make (Mock), WhatsApp, Ansichtswechsel, Provisionsrechner, Selbst-Check, Nachweis-Dialog, Dunkelmodus, JSON-LD: 66/66 Tests.

## 5 · Tatsächlich durchgeführte Tests
| Prüfung | Ergebnis |
|---|---|
| npm run check | 0 Fehler |
| Playwright (3 Projekte) | 66 bestanden, 3 übersprungen (nur mobil) |
| axe WCAG 2.2 AA | 0 Verstöße (Sparen, Partner, Recht; hell + dunkel) |
| **Design-Lint** (12 Regeln × 12 Varianten) | **0 Verstöße**; Gegenprobe D2: 6 Regeln verletzt |
| Lighthouse mobil | 100/100/100/100 · LCP 1,70 s · CLS 0 |
| Lighthouse desktop | 100/100/100/100 · LCP 0,40 s · CLS 0 |
| Browser-Abnahme | 1440/768/390, hell + dunkel, beide Ansichten; Top 3 behoben: KPI-Überlauf Partner-Panel, Kartenraster Regeln/KI-Paket, Mobil-Länge 8,42 → 7,92 |

## 6 · Selbstkritik (rubric.md)
Eigenständigkeit 5 · Art Direction 4 (Hero-Foto nur als Kreis, kein Szenenfoto) · Typografie 5 · Farbe 5 · Layout 4 (Desktop-Hero links unten Leerraum, durch Sticky-Text gemildert) · Motion 4 · Glaubwürdigkeit 4 (Gas-Beispiel ohne Quelle) · Vertriebslogik 4 (keine Felddaten) · Mobile 5 · Technik 5.

## 7 · Risiken
| Risiko | Einschätzung |
|---|---|
| Gas-Beispielpreis ohne Quelle | [offen], gekennzeichnet als Beispiel |
| SVS-Preis aus Vergleichsportalen statt Preisblatt | 2 unabhängige Quellen stimmen überein; Preisblatt bei nächster Prüfung |
| Keine Felddaten | Umami/Search Console brauchen Ihre Zugänge |

## 8 · Offene Punkte – Dennis
1. Umami: kostenloses Konto anlegen → Website-ID senden (Eintrag in 1 Minute).
2. Search Console: Eigentümernachweis per HTML-Tag → Code senden.
3. Ein echtes Foto von Ihnen im Kundengespräch oder vor Ort würde die Hero weiter stärken (optional).
