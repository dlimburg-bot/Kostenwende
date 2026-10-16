# Bewertungsraster Selbstkritik (Phase 9)

Interne Qualitätsindikatoren, keine Zertifizierung. Jede Note braucht eine **Beobachtung oder einen Messwert**.
Unter 4 → Schwäche benennen, Ursache, Korrektur, erneut messen.

| # | Dimension | 3 = solide | 4 = gut | 5 = Agenturniveau | Messgrundlage |
|---|---|---|---|---|---|
| 1 | Eigenständigkeit der Marke | erkennbar, aber austauschbar | eigene Signatur sichtbar | Signatur zieht sich von Logo bis Icon, ohne Logo erkennbar | Design-Lint 0; Screenshot ohne Logo |
| 2 | Art Direction | konsistent | bewusste Flächendramaturgie | jeder Abschnitt mit eigenem Aufbau und Grund | Abschnittsfolge vs. brand-system.md |
| 3 | Typografie & Hierarchie | lesbar | klare Skala | Display/Text mit Dramaturgie, keine Waisen in Headlines | AG-11; Zeilenumbrüche 390/768/1440 |
| 4 | Farbkonzept | Kontraste ok | Farben haben Bedeutung | Gelb nur für Handlung/Ergebnis, hell+dunkel gleichwertig | axe 0; Farbinventur |
| 5 | Layout & Komposition | kein Überlauf | präzise Ausrichtung | asymmetrische Spannung, ruhige Raster | Querscroll-Test; Screenshots |
| 6 | Motion | nicht störend | zielgerichtet | Bewegung erklärt Zustand (Rechner, Ansichtswechsel) | AG-08; reduced-motion |
| 7 | Fachliche Glaubwürdigkeit | Zahlen belegt | Quelle + Stand sichtbar | Rechner erklärt Annahmen, Marktwert gekennzeichnet | claims.json, Agent claims-reviewer |
| 8 | Vertriebslogik | CTA vorhanden | eine Primärhandlung je Ansicht | Entscheidungsreise vollständig, Erwartung nach Anfrage klar | Seitenfolge, Formularfelder |
| 9 | Mobile UX | bedienbar | Daumenzone, ≤ 8 Bildschirme | Rechner in 30 s bedienbar, Aktionsleiste verdeckt nichts | Längentest, WCAG 2.4.11 |
| 10 | Technische Zuverlässigkeit | Tests grün | Lighthouse-Grenzwerte | 0 JS-Fehler in allen 12 Lint-Varianten, Live-Smoke grün | npm run qa, smoke:live |
