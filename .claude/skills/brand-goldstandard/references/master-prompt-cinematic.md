# KOSTENWENDE — MASTER PROMPT CINEMATIC 5.0
Stilreferenz: Kurzvideo „Claude Code Built This Website From ONE …“ (@Krixano, Demo „Kettle & Deck – Cut, never torn.“), vorgelegt von Dennis am 16.10.2026.
Baut auf Goldstandard 4.0 auf (alle Wahrheits-, Rechts-, A11y- und Freigaberegeln gelten unverändert).

---

## AUFTRAG
Überführe Kostenwende in eine **kinematografische Markenerfahrung**: Die Website soll sich anfühlen wie der Vorspann eines Films über einen einzigen Moment, den Moment, in dem die Energiekosten kippen. Ruhig, dunkel, warm, präzise. Wenige Worte, großer Raum, eine Geschichte in Kapiteln. Darunter bleibt ein ehrliches Werkzeug, das rechnet.

## STILANALYSE DER REFERENZ (was den Look ausmacht)
| Merkmal der Referenz | Wirkung | Übertragung auf Kostenwende |
|---|---|---|
| Vollbild-Szene, Low-Key-Licht, warme Schatten, geringe Schärfentiefe | Kino statt Website | Vollbild-Hero mit **Licht-Szene**: die Wende-Kurve als glühender Faden im Dunkeln, Spiegelung, Filmkorn |
| Ein kurzer Satz, zentriert, leichte Schrift, Satzzeichen am Ende („Cut, never torn.“) | Selbstbewusst, leise | H1 zentriert, Schriftschnitt 300, ein Satz mit Punkt; darunter **eine** Zeile Nutzen |
| Minimale Navigation: Wortmarke mit Punkt, 2 kleine Links, kleine helle Pille rechts | Luxus durch Weglassen | Wortmarke · „Sparen“ · „Partner“ · Pille „Tarif-Check“ – transparent über der Szene |
| Kapitelanzeige „• • • The split“ | Geschichte statt Abschnitte | Kapitelanzeige: „Kapitel 1 · Der Preis“ … „Kapitel 3 · Die Wende“ |
| Kaum UI-Elemente, keine Karten im ersten Bild | Fokus | Erster Bildschirm: nur Szene, Satz, Zeile, Kapitelanzeige, eine Pille |
| Langsame Überblendungen beim Scrollen | Erzählrhythmus | Kapitel blenden per Scroll ein (nur opacity/transform, ≤ 0,8 s), `prefers-reduced-motion` = statisch |

## UNVERHANDELBAR (Wahrheit vor Stil)
1. **Keine Stockfotos, keine KI-generierten Fotos von Menschen, Orten oder Produkten.** Bildwelt = (a) gerenderte Lichtszenen, die erkennbar Grafik sind und eine Information tragen (Wende-Kurve = Preisverlauf), (b) echte Fotos von Dennis, farblich angeglichen. Rendering-Herkunft im Code dokumentieren.
2. Jede Zahl in den Kapiteln mit Quelle und Stand sichtbar (Claims-Register).
3. Kein Video-Autoplay mit Ton, keine Intro-Sequenz, keine künstliche Ladezeit. Szene ist ein Standbild (WebP), Bewegung nur als leichte Parallaxe/Überblendung.
4. Kontraste WCAG 2.2 AA auch auf Bildern (Abdunklungsverlauf unter Text). Mobil ≤ 8 Bildschirme, LCP ≤ 2,0 s, CLS ≤ 0,02.
5. Rechner, Calendly, Formular, WhatsApp, Partner-Rechner bleiben funktional unverändert.

## GESTALTUNGSSYSTEM „NACHTSTROM“
- **Farbe:** warmes Schwarz `#0C0A08`, Fläche `#15120E`, Haarlinie `#2A251E`, Text `#EFE8DC`, gedämpft `#A39A8B`, **Glut** `#F4B740` (Markengold, nur Handlung + Ergebnis), Kosten `#E07B4F`. Heller Modus „Tageslicht“: Papier warm `#F4EFE7`, Tinte `#17130E` – Hero bleibt immer Nacht.
- **Typografie:** eine Familie, Archivo 300–700. Szenensätze 300, Laufweite −0,03 em; Zahlen 300 groß, tabellarisch; Labels 500 klein, Satzschreibung. Keine Versalien-Sperrung, keine Kursive.
- **Form:** Pillen nur für Handlungen (Buttons). Panels mit Haarlinie und 12 px Radius, keine Schatten außer Szenen-Tiefe.
- **Komposition:** zentrierte Szenenkapitel wechseln mit linksbündigen Arbeitsbereichen (Rechner, Ablauf, Kontakt). Viel Schwarz, wenig Elemente.
- **Bewegung:** Hero-Einblendung gestaffelt (Satz → Zeile → Kapitel), Kapitel per Scroll, Kurve „zieht sich“ beim Erscheinen; alles ≤ 0,8 s, `cubic-bezier(.2,.7,.2,1)`.

## DRAMATURGIE (Sparen)
1. **Szene** – „Weniger zahlen für Strom und Gas.“ / Persönlicher Tarif-Check für Villingen-Schwenningen und Rottweil. / Pille „Ersparnis berechnen“ · Kapitel 1–3
2. **Kapitel 1 · Der Preis** – 22 % stecken in der Grundversorgung (BNetzA).
3. **Kapitel 2 · Die Kosten** – 1.315 € Mehrkosten/Jahr, 5,4 Mrd. € zu viel (Verivox).
4. **Kapitel 3 · Die Wende** – Nachrechnen: der Rechner (Arbeitsbereich, hell auf dunkel).
5. Ablauf · Vertrauen/Person · FAQ · Brücke Partner · Kontakt – ruhig, linksbündig, Haarlinien.
Partner-Ansicht: gleiche Szene, Satz „Verdienen Sie mit, wenn andere sparen.“, Kapitel „Das Modell · Was realistisch ist · Ihr Start“.

## TORE
Goldstandard-Tore 0–12 + zusätzlich: (a) Szene ohne Text lesbar als „Licht, das kippt“, (b) erster Bildschirm max. 5 Elemente, (c) Design-Lint mit Cinematic-Profil 0 Verstöße, (d) Screenshot-Abnahme 1440/768/390 vor Veröffentlichung, (e) Veröffentlichung nur nach Freigabe von Dennis.

## OFFEN – nur Dennis kann liefern
Echte Fotos heben den Stil am stärksten: Dennis am Küchentisch mit einer Abrechnung (warmes Abendlicht), Hände + Zählerkasten, Villingen/Rottweil in der Dämmerung. Hochkant + quer, eigene Rechte.
