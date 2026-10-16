---
name: ux-cro
description: Nutzerführung und Conversion für Kostenwende – Customer Journey, Rechner, Formulare, Buttons, mobile Bedienung, Vertrauenssignale am Entscheidungspunkt. Verwenden bei Conversion, Anfragen, Leads, UX, Layout, Buttons, Formular, mobil.
---

# UX & Conversion (Ziel G4, unterstützt G5)

## Conversion-Pfade (Ist-Stand)
| Pfad | Ziel-Ereignis | Technik |
|---|---|---|
| Termin | Calendly-Buchung Tarif-Check | Link auf Calendly |
| Rückruf | Formular gesendet | Make-Webhook → Datenspeicher + Mail |
| Foto-Check | WhatsApp geöffnet | wa.me-Link (Abrechnung nie über Dritte) |
| Partner | WhatsApp-Anfrage | wa.me-Link, Selbst-Check davor |

Messung je Pfad über `track()`-Ereignisse (Umami, sobald freigegeben). Ohne Daten: **[Annahme]**.

## Prinzipien
1. **Eine Hauptaktion pro Bildschirm**, sekundäre Aktion optisch klar nachrangig.
2. **Gleiche Handlung = gleiche Beschriftung** (aktuell: „Termin wählen“, „Kennenlernen anfragen“).
3. **Beschriftung hält, was sie verspricht** (z. B. nicht „buchen“, wenn WhatsApp öffnet).
4. **Vertrauen am Entscheidungspunkt:** kostenlos · unverbindlich · kein Versorgungsausfall – direkt am Button.
5. **Kein Druck:** keine Countdowns, keine künstliche Verknappung, Pop-ups höchstens einmal pro Sitzung (CLAUDE.md §3/§4).
6. **Mobil zuerst:** Tippflächen ≥ 44 px, Formulare mit `autocomplete`/`inputmode`, untere Aktionsleiste ohne Inhalte zu verdecken.
7. **Länge:** Richtwert ≤ 8 Bildschirmhöhen mobil je Seite; Vertiefung in Aufklappern/Wischkarten oder Unterseiten.

## Prüfungen
| Prüfpunkt | Erwartung | Test |
|---|---|---|
| Pfade funktionieren | alle 4 Pfade erreichbar und korrekt verlinkt | `npm test` (functional) |
| Formular | Pflichtfelder, Fehlermeldung, Erfolgsmeldung, Honeypot, Mock-Versand | `npm test` (forms) |
| Bildschirmlänge | Sparen ≤ 8, Partner ≤ 8 Bildschirme bei 390×844 | `npm test` (layout) |
| Konsistenz | Button-Texte je Handlung identisch | `npm run check` (CTA-Liste) |
| Ablenkung | keine Dauer-Animation außer Fortschritt; `prefers-reduced-motion` respektiert | `npm test` |

## Experimente
Erst bei ausreichendem Traffic (Faustregel ≥ 1.000 Besuche/Monat je Variante). Davor: Vorher/Nachher über
4 Wochen, gleiche Wochentage, Ereignisse aus Umami, plus Rückmeldung aus Gesprächen.

## Ergebnis
Befunde mit Präfix `UX-` nach Schema `website-audit`.
