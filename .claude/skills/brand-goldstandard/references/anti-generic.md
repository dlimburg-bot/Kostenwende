# Anti-Muster „generische KI-Website“ – messbar

Automatisch geprüft durch `scripts/design-lint.mjs` (gerenderte Seite, 1440/768/390 px, hell + dunkel, beide Ansichten).
Eine Technik ist nicht verboten, weil sie modern ist, sondern wenn sie **ohne Projektbezug** ein bekanntes Muster wiederholt.
Ausnahmen nur mit Begründung in `brand-system.md` und angepasstem Grenzwert.

| ID | Muster | Messung | Grenzwert v3 | Warum |
|---|---|---|---|---|
| AG-01 | Viele beliebige Rundungen | verschiedene Radien (ohne Kreise) | ≤ 3 | Formensprache wirkt zusammengewürfelt |
| AG-02 | Pillen-Buttons und Pillen-Chips | Radius ≥ 20 px bei Höhe < 80 px | 0 | Standard-Komponentenbibliothek |
| AG-03 | Systemschrift oder Modeschrift ohne Marke | Schriftfamilien mit Text | nur Archivo / Archivo Display | Typografie trägt die Marke |
| AG-04 | Überall Schatten | verschiedene box-shadow-Werte | ≤ 4 | „Schwebende Karten“-Optik |
| AG-05 | Willkürliche Farbverläufe, Licht-Blobs | gradient() auf Flächen | 0 (Diagramme ausgenommen) | Dekoration ohne Information |
| AG-06 | VERSALIEN-Labels mit Sperrung über jeder Überschrift | uppercase + letter-spacing > 0,5 px | 0 | häufigstes KI-Eyebrow-Muster |
| AG-07 | Kursives Akzentwort in der Headline | font-style italic in h1–h3 | 0 | häufigstes KI-Headline-Muster (Serif + Kursiv + Farbe) |
| AG-08 | Dauerbewegung | animation-iteration-count: infinite | 0 | täuscht Lebendigkeit vor, stört |
| AG-09 | Endlose identische Kartenraster | Abschnitte mit ≥ 3 gleich gebauten Karten | ≤ 2 | austauschbares Template |
| AG-10 | Häkchen-Vorteilsleisten | Listen, deren Einträge alle mit ✓ beginnen | 0 | Landingpage-Baukasten |
| AG-11 | Keine typografische Dramaturgie | h1 / h2 (Schriftgröße) | ≥ 1,2 | alles gleich laut = nichts wichtig |
| AG-12 | Zentrierte Standard-Hero (Headline + 2 Buttons mittig) | text-align h1 | links/asymmetrisch | SaaS-Landingpage-Klischee |

## Zusätzlich manuell bei der Browser-Abnahme prüfen (nicht automatisierbar)

- Bildsprache: echtes Foto von Dennis statt Stock/KI-Illustration; keine Icons als Dekoration.
- Texte: kein „Die Zukunft beginnt jetzt“, keine Superlative, kein „Bestpreis/garantiert/Testsieger“ (UWG).
- Dekor: jede Form muss etwas bedeuten (die Wende-Kurve = Preisverlauf, der dreht). Kreise/Blobs ohne Inhalt: nein.
- Abschnittskomposition: aufeinanderfolgende Abschnitte unterscheiden sich in Fläche (Weiß/Kühlgrau/Nachtblau/Gelb) **und** Aufbau.

## Gegenprobe

Der Lint ist nur glaubwürdig, wenn er generische Entwürfe erkennt. Nachweis 2026-10-16:
Durchgang-2-Design (Commit `30b34b6`) → Verstöße AG-01, -03, -04, -06, -07, -10. Design v3 → 0 Verstöße.
