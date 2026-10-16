# Markensystem v3 · „Wendepunkt“ (gültig ab 2026-10-16)

## Leitidee
Kostenwende ist der Punkt, an dem Ihre Energiekosten drehen. Signatur: **die Wende-Kurve** – ein Preisverlauf, der steigt,
kippt und fällt. Sie erscheint als Bildmarke (Logo, Favicon, App-Icons) und als Linie am Fuß der Hero-Flächen. Sonst nirgends.

## Persönlichkeit
Klar, regional, nachrechnend. Ein Mensch (Dennis) statt Portal. Seriös wie ein Versorger, direkt wie ein Handwerker.

## Farbe (Tokens in `docs/index.html :root`)
| Rolle | Hell | Dunkel | Regel |
|---|---|---|---|
| Nachtblau `--deep` / `--brand` | #14263F / #15294A | #12223A / Gelb | abgeleitet aus dem Porträt-Hintergrund; Hero, dunkle Abschnitte, Primärbuttons auf Weiß |
| Signalgelb `--accent` | #FFC629 | #FFC629 | **nur** Handlung (Buttons auf Dunkel), Ergebnis (Ersparnis), Bildmarke, Brückenband |
| Fläche `--bg` / `--surface-2` | #FFFFFF / #EEF2F6 | #0A1220 / #15223A | Weiß und Kühlgrau wechseln sich mit Nachtblau ab |
| Text `--fg` / `--muted` | #0F1B2D / #4A5668 | #EAF0F7 / #A3B0C2 | Kontrast ≥ 7 : 1 bzw. ≥ 4,5 : 1 |
| Kosten `--cost` | #B7410E | #FF8A4C | aktuelle/zu hohe Kosten |
| Panel-Rücksetzer `--p-*` | – | – | Rechner/Panels auf dunklen Flächen setzen Text- und Markenfarben zurück |

## Typografie
- **Archivo Display** (Archivo, wdth 112, wght 800, statisch instanziert, 15 KB): h1, h2, große Zahlen, Bildmarke. Laufweite −0,03 em.
- **Archivo** (wdth 100, wght 400–700, 32 KB): alles andere. `font-display: optional` + Preload → CLS 0.
- Skala: h1 clamp(2,5–4,25 rem) · h2 clamp(1,9–3,25 rem) · h3 1,19 rem · Lead 1,19 rem · Text 1,06 rem · Klein 0,875 rem.
- Keine Kursive, keine Versalien-Labels, Labels sind normale Sätze in `--muted`.

## Form & Raster
- Ein Radius: 4 px (`--radius`), 2 px für Innenelemente (`--radius-xs`). Kreise nur für Fotos.
- Schatten: nur das schwebende Rechner-Panel. Sonst Linien: 1 px Haarlinie, 4 px Oberkante (Ablauf), 2 px Rahmen (Kontakt).
- Container 1160 px, Abschnittsabstand 44 / 64 / 96 px (mobil/Tablet/Desktop).
- Abschnittsfolge Sparen: Nachtblau (Hero) → Nachtblau (Fakten) → Weiß (Ablauf) → Kühlgrau (Vertrauen) → Weiß (Person) → Kühlgrau (FAQ) → **Gelb** (Brücke) → Weiß (Kontakt) → Nachtblau (Fuß).

## Komponentenregeln
- Buttons: kantig 4 px, 52 px hoch; Primär auf Weiß = Nachtblau, auf Dunkel = Gelb; Sekundär = 2 px Rahmen.
- Reiter: Unterstreichung 3 px statt Pille.
- Ablauf: große Display-Ziffern über 4-px-Linie, keine Kreise.
- FAQ: Plus/Minus, Linienliste, Desktop 1/3 Überschrift + 2/3 Fragen.
- Listen: Strich statt Häkchen.

## Bewegung
- Nur transform/opacity; 0,15 / 0,25 / 0,6 s; Easing `cubic-bezier(.2,.7,.2,1)`.
- Erlaubt: gestaffelter Hero-Einstieg, Reveal beim Scrollen, Balken/Zahlen im Rechner, Ansichtswechsel.
- Verboten: Endlos-Animationen, Glanz-Sweeps, Hover-Hüpfen, Intro-Sequenzen. `prefers-reduced-motion` schaltet alles ab.

## Bildsprache
Echtes Porträt von Dennis, echte Urkunden (Geburtsdatum geschwärzt). Keine Stockfotos, keine KI-Bilder.
[offen] Ein Foto von Dennis im Kundengespräch/in der Region würde die Hero stärken – nur mit echtem Foto.
