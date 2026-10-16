# Markensystem v4 · „Nachtstrom“ (gültig ab 2026-10-16, ersetzt v3 „Wendepunkt“)

Grundlage: Master-Prompt Cinematic 5.0 (`master-prompt-cinematic.md`), Stilreferenz von Dennis (Kino-Landingpage „Kettle & Deck“).
Wiederherstellung v3: Git-Tag `vor-durchgang-4`.

## Leitidee
Ein Kino-Vorspann über den Moment, in dem die Energiekosten kippen. Die Szene zeigt die Wende-Kurve als Glühfaden im Dunkeln:
Preis steigt, kippt, fällt – am Wendepunkt am hellsten. Darunter steht ein ehrliches Werkzeug, das rechnet.

## Bildwelt
- `docs/szene/*.webp`: gerenderte Lichtgrafiken aus `scripts/render-szenen.py` (numpy). Keine Fotos, keine KI-Bilder, keine Stockbilder.
- `docs/dennis-limburg-warm.webp`: echtes Porträt, warm gegradet (Duoton 62 % + Original 38 %).
- [offen] Echte Fotos von Dennis (Abendlicht, Abrechnung, Region) würden die Szene weiter tragen.

## Farbe
| Rolle | Tageslicht | Nacht | Regel |
|---|---|---|---|
| Bühne `--deep` | #0C0A08 | #070605 | Hero, Kapitel, Brücke, Fuß – immer Nacht |
| Text auf Bühne `--deep-fg` / `--deep-muted` | #EFE8DC / #A9A091 | gleich | Kontrast ≥ 7 : 1 / ≥ 4,5 : 1 |
| Glut `--accent` | #F4B740 | #F4B740 | nur Ergebnis (Ersparnis), Marke, Kapitel-Punkt, Ergebnis-CTA |
| Fläche `--bg` / `--surface` | #F4EFE7 / #FBF8F2 | #0C0A08 / #15120E | Arbeitsbereiche folgen dem Modus |
| Handlung `--brand` | Tinte #17130E | Creme #EFE8DC | Pille in Gegenfarbe zur Fläche |

## Typografie
Archivo (OFL, 300–700, 32 KB, `font-display: optional`). Szenensätze 300, Laufweite −0,045 em; Zahlen 300; Labels 500; keine Versalien, keine Kursive.

## Form
Radien 16 (Panels/Karten) · 10 (Felder/Chips) · 4 (Kleinteile). **Pillen nur für Handlungen** (Buttons, Umschalter). Haarlinien statt Kästen. Ein Schatten: Rechner-Panel.

## Komposition
Szene 100 svh mit zentriertem Satz, Nutzenzeile, Pille, Textlink, Kapitelanzeige. Danach linksbündige Arbeitsbereiche.
Kapitel: 1 · Der Preis (Szene + Rechner) → 2 · Die Kosten (Nahaufnahme Wendepunkt + Zahlen) → 3 · Die Wende (Ablauf).

## Bewegung
Nur transform (Szene skaliert 1,05 → 1 in 1,4 s; Satz gestaffelt 14 px in 0,8 s). Kein Opacity-Fade im Hero (LCP, Kontrast). `prefers-reduced-motion` = statisch.
