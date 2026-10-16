# Durchgang 4 – Cinematic „Nachtstrom“ (2026-10-16)

Auftrag Dennis: Stil der Referenz (Kino-Landingpage „Kettle & Deck“) übernehmen, Master-Prompt erstellen und ausführen.
Master-Prompt: `.claude/skills/brand-goldstandard/references/master-prompt-cinematic.md` · Wiederherstellung: Tag `vor-durchgang-4`.

## Übertragung der Referenz
| Referenz | Kostenwende |
|---|---|
| Vollbild-Foto, Low-Key, warm | gerenderte Lichtszene: Wende-Kurve als Glühfaden mit Spiegelung, Filmkorn (`scripts/render-szenen.py`) – kein Stock, keine KI-Bilder |
| zentrierter leichter Satz | „Weniger zahlen für Strom und Gas.“ in Archivo 300 |
| Mini-Navigation + helle Pille | transparente Kopfzeile, Wortmarke, 2 Reiter, Pille „Ersparnis berechnen“ |
| Kapitelanzeige „• • • The split“ | „• • • Kapitel 1 · Der Preis“ → 2 · Die Kosten → 3 · Die Wende |
| warme Dunkelheit | warmes Schwarz #0C0A08, Creme #EFE8DC, Glut-Gold #F4B740 |

## Tests [gemessen]
| Prüfung | Ergebnis |
|---|---|
| Funktion/Layout/A11y (Playwright, 3 Projekte) | 66 bestanden, 3 übersprungen |
| axe WCAG 2.2 AA | 0 Verstöße (Korrekturen: Hero-Animation nur transform, Flächen-Tokens auf dunklen Flächen, Kopf deckend auf Rechtsseiten) |
| Design-Lint (Cinematic-Profil, 12 Varianten) | 0 Verstöße |
| Lighthouse mobil | 100/100/100/100 · LCP 1,36 s · CLS 0 |
| Lighthouse desktop | 100/100/100/100 · LCP 0,38 s · CLS 0 |
| Seitenlänge mobil | Sparen 7,93 · Partner 7,86 Bildschirme |

## Offen
1. Echte Fotos von Dennis (Abendlicht, Abrechnung, Region) – stärkster Hebel für den Kino-Stil.
2. Umami-Website-ID, Search-Console-Code.
3. Gas-Beispielpreis ohne Quelle (gekennzeichnet).
