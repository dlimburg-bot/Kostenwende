# Kostenwende – Website-Growth-System
## Bestandsbericht, Zielarchitektur und Umsetzungsplan (Phase 0, nur lesend)

Stand: 16.10.2026 · Projekt: `dlimburg-bot/Kostenwende` · Live: https://dlimburg-bot.github.io/Kostenwende/

Kennzeichnung: **[gemessen]** = in dieser Analyse oder in dieser Arbeitssitzung nachweislich festgestellt ·
**[Plattform]** = dokumentierte Eigenschaft des Anbieters · **[Annahme]** = begründete Vermutung ·
**[offen]** = noch zu prüfen.

Am Projekt wurde nichts verändert: keine Projektdatei, kein Commit, kein Push, keine Installation, kein externer Abruf
in dieser Phase. Alle Entwürfe liegen nur im Arbeitsordner. Getestet wurde an einer Kopie.

---

## Anpassung des Auftrags an Kostenwende

Der Auftrag wurde für newworkkompass.info formuliert und gilt laut Ihrer Klarstellung für Kostenwende.
Zwei Ziele habe ich sinngemäß übertragen. **Bitte bestätigen:**

| Ziel im Auftrag | Übertragung auf Kostenwende |
|---|---|
| Marke „Human Update Methode“ differenzieren | Marke **„Kostenwende“** als persönlicher, regionaler Wechselservice, abgegrenzt vom Vergleichsportal |
| Besucher → Newsletter-Abonnenten oder qualifizierte Kontakte | Besucher → **Termin, Rückruf, Foto-Check, Partner-Anfrage**. Einen Newsletter gibt es nicht; mögliche spätere Entsprechung: Erinnerung vor Vertragsende (Opt-in) |

---

## A · Bestandsaufnahme

### A1 Projekt und Git [gemessen]
| Punkt | Befund |
|---|---|
| Lokaler Pfad | `/home/claude/kostenwende` (Cloud-Arbeitsumgebung, nicht Ihr Computer) |
| Git | Branch `main`, sauber (keine offenen Änderungen), 7 Commits, Remote `github.com/dlimburg-bot/kostenwende` |
| Projektregeln | keine `CLAUDE.md`, kein `.claude/`, kein `package.json`, kein CI (`.github/`) |
| Dateien | `index.html` (190 KB), `404.html`, Icons, `manifest.webmanifest`, `robots.txt`, `sitemap.xml` (1 URL), `vorschau.jpg`, Porträt |
| Secrets im Repo | keine gefunden. Der Status-Schlüssel der Lead-Mails liegt nur in Make |

### A2 Technologie [gemessen]
- Eine HTML-Datei mit eingebettetem CSS/JS und Bildern (Base64), kein Framework, kein Build-Schritt.
- 2 Ansichten (Sparen, Partner) + Rechtliches als **Hash-Ansichten unter einer URL**.
- Strukturierte Daten: ProfessionalService/Organization, Person, OfferCatalog, FAQPage – gültig.
- CSP per `<meta>` mit `'unsafe-inline'` (wegen eingebettetem CSS/JS).
- Externe Ziele im Code: wa.me, calendly.com, hook.eu1.make.com, cloud.umami.is (inaktiv).

### A3 Hosting und Abhängigkeiten
| Bestandteil | Lokal bearbeitbar? | Abhängigkeit | Evidenz |
|---|---|---|---|
| Inhalte, Design, Code der Website | **ja** (Repo) | – | [gemessen] |
| Auslieferung | nein | GitHub Pages, ausgeliefert aus Branch `gh-pages` | [gemessen: nach Push von `gh-pages` live]; Pages-Einstellungen für mich nicht einsehbar [offen] |
| HTTP-Header, Weiterleitungen | nein | GitHub Pages erlaubt keine eigenen Header | [Plattform] |
| Pages-Einstellungen, Domain, DNS | nein | nur Sie im GitHub-Konto bzw. beim Domain-Anbieter | [gemessen: kein API-Token in dieser Umgebung] |
| Push ins Repo | ja | Claude-GitHub-App mit Schreibrecht | [gemessen: Pushes erfolgreich] |
| Lead-Formular | Ziel-URL ja, Ablauf nein | Make (Gratis: 2/2 Szenarien belegt, 1.000 Operationen/Monat) | [gemessen] |
| Terminbuchung | Link ja | Calendly Gratis: nur **1** aktive Terminart | [gemessen] |
| Webanalyse | Code ja | Umami vorbereitet, **keine Website-ID → keine Messung** | [gemessen] |
| Search Console, Unternehmensprofil | nein | Ihr Google-Konto | ob vorhanden: [offen] |

### A4 Qualität heute [gemessen, Labor]
| Messung | Ergebnis |
|---|---|
| Lighthouse mobil | Performance 98–99 · Barrierefreiheit 100 · Best Practices 100 · SEO 100 |
| Lighthouse Desktop | 100 · 100 · 100 · 100 |
| LCP / CLS mobil | 1,6–1,7 s / 0–0,004 |
| Seitenlänge mobil | Sparen 7,5 · Partner 7,3 Bildschirme |
| Funktionstests | 21/21 bestanden; Selektoren des neuen Test-Entwurfs 14/14 vorhanden |
| Statische Prüfung (neues Skript) | 0 Fehler, 1 Hinweis: Termin-Button mit 3 Beschriftungen („Termin sichern“ im Desktop-Hinweis) |
| **Felddaten echter Nutzer** | **keine** [offen] |

### A5 Wichtigste strukturelle Risiken [gemessen]
1. **Tests existieren nur temporär** in meinem Arbeitsordner, nicht im Repo → gehen verloren, wenn die Arbeitsumgebung neu startet.
2. **Keine Messung**: weder Besucher noch Suchanfragen; Erfolg ist derzeit nicht nachweisbar.
3. **Nur eine indexierbare URL**: Partner- und Rechtsinhalte können nicht eigenständig gefunden werden.
4. **Kein Freigabe-Prozess**: Jeder Push geht sofort live.
5. **github.io-Adresse**: schwächeres Marken- und Vertrauenssignal [Annahme], keine Domain-Property in der Search Console [Plattform].

---

## B · Zielarchitektur und Begründung

Prinzip: **wenige, klar abgegrenzte Komponenten**, eine gemeinsame Wahrheit (`CLAUDE.md`) und ein gemeinsames Register (`.qa/findings.json`).

| Komponente | Anzahl | Warum genau so |
|---|---|---|
| `CLAUDE.md` | 1 | Ziele G1–G5, harte Grenzen, Konfliktregel, Definition of Done, Befehle: einmal definiert, überall gültig → keine widersprüchlichen Empfehlungen |
| Skills | 6 | 1 Orchestrator (`website-audit`) + 5 Fachgebiete. Accessibility ist bewusst kein eigener Skill: Sie ist harte Grenze (CLAUDE.md) und automatisiert in `qa-release` |
| Subagents | 2 | Nur dort, wo Unabhängigkeit den Unterschied macht: **Prüfen** (`qa-verifier`) und **Aussagen/Recht** (`claims-reviewer`). Beide nur lesend. Keine Agents fürs Umsetzen (unnötige Kosten und Kontextverlust) |
| Hooks | 2 | (1) **Push-Sperre** ohne aktuellen QA-Nachweis; (2) **Sofortprüfung** nach jeder Website-Änderung. Beide lokal, ohne Netzwerk, getestet |
| Berechtigungen | Deny/Ask-Liste | Force-Push, Hard-Reset, `rm -rf` verboten; Push, Installation, Web-Abruf nur mit Rückfrage |
| MCP | 0 neue | Kein Bedarf: Tests laufen über Playwright-Skripte. Bereits verbundene Make/Calendly-Konnektoren nur auf Ihre Anweisung (z. B. Lead-Ende-zu-Ende-Test) |

**Repo-Struktur-Entscheidung:** Website nach `docs/` verschieben und GitHub Pages auf „main /docs“ umstellen.
Vorteile: Konfiguration, Tests und Berichte werden **nicht** öffentlich ausgeliefert; kein separater Deploy-Branch;
kein Force-Push nötig. Die Umstellung in den Pages-Einstellungen machen Sie (1 Minute).

---

## C · Verzeichnisstruktur (Vorschlag)

```
kostenwende/
├─ CLAUDE.md                     Projektregeln, Ziele, Grenzen, DoD, Befehle
├─ docs/                         ← einzige öffentlich ausgelieferte Ebene (GitHub Pages)
│  ├─ index.html  404.html  manifest.webmanifest  robots.txt  sitemap.xml
│  └─ icons, Bilder
├─ tests/site.spec.mjs           Funktion · Layout · axe · visuell (@visual) · Live (@smoke)
├─ scripts/
│  ├─ check.mjs                  statische Prüfung ohne Abhängigkeiten (getestet)
│  ├─ lighthouse.mjs             3 Läufe, Median, Grenzwerte
│  └─ qa.mjs                     Gesamtlauf → .qa/last-pass.json
├─ .qa/
│  ├─ findings.json              gemeinsames Maßnahmen-Register (ICE-R)
│  ├─ claims.json                Zahlen mit Quelle, Stand, Prüfstatus
│  ├─ baseline/                  Referenz-Screenshots
│  └─ reports/                   Berichte (versioniert)
├─ .claude/
│  ├─ settings.json              Berechtigungen + 2 Hooks
│  ├─ hooks/guard-push.mjs       Push nur mit QA-Nachweis (getestet: 5/5 Fälle)
│  ├─ hooks/check-site.mjs       Prüfung nach Edit in docs/ (getestet: 3/3 Fälle)
│  ├─ skills/website-audit/      Orchestrator, ICE-R, Konflikte, Register
│  ├─ skills/seo-local/          technisches + lokales SEO
│  ├─ skills/content-trust/      Inhalte, Belege, Claims-Lint, Markenstimme
│  ├─ skills/ux-cro/             Pfade, Formulare, mobile Bedienung
│  ├─ skills/performance/        Web Vitals, Gewicht, CSP
│  ├─ skills/qa-release/         Akzeptanzkriterien, Regression, Bericht
│  ├─ agents/qa-verifier.md      unabhängige Testprüfung (lesend)
│  └─ agents/claims-reviewer.md  unabhängige Aussagen-/Rechtsprüfung (lesend)
├─ package.json  playwright.config.mjs  .gitignore
```

---

## D · Entwürfe

Alle Dateien liegen vollständig im Paket (gleiche Pfade wie oben):
`CLAUDE.md`, 6 × `SKILL.md`, 2 Agents, `settings.json`, 2 Hooks, `check.mjs`, `lighthouse.mjs`, `qa.mjs`,
`site.spec.mjs`, `playwright.config.mjs`, `package.json`, `.gitignore`.

### Einheitliches Priorisierungsmodell ICE-R (in `website-audit`)
**Score = (Impact 1–5 × Zielgewicht × Confidence) ÷ (Effort × Risiko)**
Zielgewichte: Kontakte G4 = 3 · Sichtbarkeit G1, Vertrauen G2, Technik G5 = 2 · Marke G3 = 1.
Confidence 1,0 gemessen / 0,7 belegt / 0,4 Annahme. Effort 1/2/4/8. Risiko 1/1,5/3.
Harte Grenzen (Recht, Wahrheit, Sicherheit, Barrierefreiheit) **blockieren unabhängig vom Score**.

### Konfliktvermeidung
Eine Reihenfolge für alle Fachbereiche: **Recht/Wahrheit → Barrierefreiheit & Stabilität → Kontakte → Sichtbarkeit → Marke → Ästhetik**.
Jeder Konflikt wird im Register mit `conflicts_with` und `resolution` dokumentiert.
Beispiel: SEO möchte mehr Text, UX eine kurze Seite → eigene Unterseite statt längerer Startseite.

### Erste Befunde mit ICE-R (Ausgangs-Register, Vorschlag)
| ID | Maßnahme | Ziel | Evidenz | I | C | E | R | Score |
|---|---|---|---|---|---|---|---|---|
| MEAS-001 | Messung aktivieren (Umami-ID, Search Console) | G4 | gemessen: inaktiv | 5 | 1,0 | 1 | 1 | **15,0** |
| SEO-003 | Google-Unternehmensprofil anlegen/pflegen | G1 | offen: unbekannt ob vorhanden | 5 | 0,7 | 1 | 1 | **7,0** |
| OPS-001 | Tests + QA-Prozess versionieren (Phase 0) | G5 | gemessen: nur temporär | 5 | 1,0 | 2 | 1 | **5,0** |
| CON-002 | Impressum/Datenschutz rechtlich prüfen lassen | G2 | gemessen: ungeprüft | 5 | 1,0 | 2 | 1 | **5,0** |
| CON-001 | Claims-Register: alle Zahlen mit Primärquelle prüfen | G2 | gemessen: kein Register | 4 | 1,0 | 2 | 1 | **4,0** |
| SEO-002 | Eigene Domain (Entscheidung + ca. 1 €/Monat) | G1/G3 | Annahme: Vertrauenssignal | 4 | 0,7 | 1 | 1,5 | **3,7** |
| SEC-002 | Spam-Schutz Lead-Webhook (Plausibilitätsfilter in Make) | G4 | Annahme: öffentlich erreichbar | 3 | 0,7 | 2 | 1 | **3,2** |
| UX-001 | Dritte Termin-Beschriftung angleichen | G4 | gemessen | 1 | 1,0 | 1 | 1 | **3,0** |
| SEO-001 | Eigene URLs: /partner/, /impressum/, /datenschutz/ | G1 | gemessen: 1 URL | 4 | 0,7 | 4 | 1,5 | **0,9** |
| SEC-001 | CSS/JS auslagern → CSP ohne 'unsafe-inline' | G5 | gemessen | 2 | 1,0 | 4 | 1,5 | **0,7** |

Abhängigkeiten: SEO-001 nach SEO-002 (sonst zweimal neu indexieren); SEC-001 zusammen mit SEO-001 (gleicher Umbau).

---

## E · Teststrategie (passend zur Umgebung)

Vorhanden [gemessen]: Node 22, Playwright 1.56 mit Chromium (global), Lighthouse 12.2.1 (nur im Arbeitsordner).
Neu im Projekt (Installation braucht Ihre Freigabe, alles kostenlos): `@playwright/test 1.56.0`, `@axe-core/playwright 4.10.2`, `lighthouse 12.2.1`.

| Befehl | Prüft | Dauer | Wann |
|---|---|---|---|
| `npm run check` | HTML-Grundregeln, JSON-LD, JS-Syntax, Sprungziele, Bilder, Claims-Lint, Secrets, CTA-Konsistenz, Sitemap | < 5 s | automatisch nach jeder Änderung (Hook) |
| `npm test` | Rechner, Formular (Mock, nie Make), Ansichtswechsel, Querscrollen 320–1280 px, Seitenlänge, axe WCAG 2.2 AA in 3 Profilen | ~1–2 min | vor jedem Commit |
| `npm run test:visual` | Screenshot-Regression (Toleranz 0,2 %) | ~1 min | vor Freigabe |
| `npm run lh` | Lighthouse mobil+desktop, Median aus 3 | ~3 min | vor Freigabe |
| `npm run qa` | alles oben → `.qa/last-pass.json` | ~6 min | Pflicht vor Push (Hook) |
| `npm run smoke:live` | Live-Seite: Status 200, Titel | < 30 s | nach Deployment (Freigabe nötig: externer Zugriff) |

**Akzeptanzkriterien (Definition of Done):** alle Tests grün · Lighthouse mobil Perf ≥ 95, A11y/BP/SEO = 100, CLS ≤ 0,02, LCP ≤ 2,0 s · 0 JS-Fehler · Seitenlänge mobil ≤ 8 Bildschirme · jede Zahl mit Quelle · Bericht aktualisiert.

**Regression:** Die bisherigen Einzelskripte (Funktion, Kontrast, Querscrollen, Seitenlänge, Ruckeln) werden in `tests/` überführt.
Eine Basislinie (Screenshots + Lighthouse) wird **vor** jeder Änderung festgehalten.

**Bereits getestet an einer Kopie [gemessen]:** `check.mjs` (0 Fehler am Ist-Stand; erkennt eingeschleuste Verstöße), beide Hooks (8/8 Fälle korrekt), alle Test-Selektoren (14/14), Rechner-Sollwert und Formular über Test-Endpunkt.
**Nicht getestet [offen]:** `@playwright/test`-Lauf, axe und `lighthouse.mjs` im Projekt (erfordern die Installation), die Hook- und Berechtigungs-Syntax in `settings.json` (vor Einrichtung gegen die aktuelle Claude-Code-Dokumentation prüfen, danach Live-Test in Claude Code).

---

## F · Umsetzungsplan

| Phase | Inhalt | Aufwand | Risiko | Erfolgskriterium | Ihre Freigabe für |
|---|---|---|---|---|---|
| **0 · Fundament** | Repo-Umbau nach `docs/`, Konfiguration, Tests, Basislinie | ½–1 Tag | gering: kurze 404-Zeit beim Umschalten der Pages-Quelle; Gegenmittel: erst `docs/` committen, dann umschalten, prüfen, dann Altdateien entfernen | `npm run qa` grün; Live-Seite pixelgleich zur Basislinie | Projektänderungen, Paketinstallation, Push, Pages-Umstellung (durch Sie) |
| **1 · Messbarkeit** | Umami-ID, Search Console (URL-Präfix, Bestätigung per HTML-Datei), Ereignisse je Kontaktweg | 1–2 h + Ihre Konten | gering | Besuche und Ereignisse sichtbar; Property bestätigt | Analytics, externe Dienste |
| **2 · Vertrauen & Quick Wins** | Claims-Register mit Primärquellen, Rechtsprüfung, CTA-Angleichung, Spam-Filter Make | ½ Tag + extern | mittel (Recht) | 100 % der Zahlen „verifiziert“; Rechtsprüfung ohne offene Punkte | Web-Recherche, Make-Änderung |
| **3 · Domain** | Entscheidung, DPMA-Kurzcheck „Kostenwende“, Domain auf GitHub Pages | 1 h + Wartezeit DNS | mittel (Umzug) | HTTPS aktiv, alte Adresse leitet um [offen: bei github.io-Projektseiten prüfen] | Kosten, Domain-Kauf |
| **4 · SEO-Architektur** | eigene URLs, Sitemap mit 4 URLs, CSS/JS auslagern, strengere CSP | 1–2 Tage | mittel (Regression) → volle Testsuite | 4 URLs indexiert in 6 Wochen; Lighthouse unverändert | Live-Deployment |
| **5 · Lokale Autorität** | Unternehmensprofil, echte Bewertungen, FAQ aus echten Gesprächen, Ortsseiten nur mit eigenem Inhalt | laufend | gering | Impressionen für Regionsbegriffe ↑, erste echte Bewertungen | Inhalte |
| **6 · Kontinuität** | monatlicher Audit-Lauf, halbjährliche Zahlen-Prüfung, Bericht | 1 h/Monat | gering | Register gepflegt, keine überfälligen Zahlen | ggf. geplante Aufgabe |

**Messbare Ziele (erste 3 Monate, nach Phase 1)** [Annahme, ohne Ausgangsdaten]: Basiswerte im 1. Monat erheben,
danach Zielwerte festlegen. Vorgeschlagene Messgrößen: Leads/Monat (Make), Lead-Rate (Leads ÷ Besuche), Termine (Calendly),
Search-Console-Impressionen für Regionsbegriffe, Anteil verifizierter Zahlen, QA-Läufe ohne Regression.
A/B-Tests erst ab ausreichend Traffic (Faustregel ≥ 1.000 Besuche/Monat je Variante).

---

## G · Benötigte Zugänge und Messdaten

| Zugang / Daten | Wofür | Ziel | Kosten | Status |
|---|---|---|---|---|
| **Umami Cloud** (Website-ID) | Besuche, Kontaktwege, optional Web Vitals | G4, G5 | Gratis-Tarif [Annahme: Konditionen vor Anlage prüfen] | fehlt |
| **Google Search Console** | Indexierung, Suchbegriffe, Fehler | G1 | kostenlos | [offen] |
| **Google Unternehmensprofil** | Maps, Bewertungen | G1, G2 | kostenlos | [offen] |
| **GitHub Pages-Einstellungen** | Quelle „main /docs“, später Domain | G5 | kostenlos | nur Sie |
| **Domain** (z. B. kostenwende.de) | Marke, Search-Console-Domain-Property | G1, G3 | ca. 1 €/Monat [Annahme] | Entscheidung offen |
| **Make** (verbunden) | Lead-Ende-zu-Ende-Test, Spam-Filter | G4 | Gratis-Tarif voll ausgelastet (2/2 Szenarien) | vorhanden |
| **Calendly** (verbunden) | Termine messen | G4 | Gratis: 1 Terminart | vorhanden |
| **PageSpeed Insights / CrUX** | echte Ladezeiten | G5 | kostenlos | voraussichtlich zu wenig Traffic für Felddaten [Annahme] |
| **Rechtsprüfung** (Anwalt oder Händlerbund o. ä.) | Impressum, Datenschutz, Werbeaussagen | G2 | extern | fehlt |

---

## Freigaben, um die ich bitte

1. **Zielübertragung** (Abschnitt „Anpassung“) bestätigen.
2. **Phase 0 umsetzen:** Repo-Umbau nach `docs/`, Konfiguration und Tests anlegen, die 3 kostenlosen Entwicklerpakete installieren, committen und pushen. Danach stellen Sie die Pages-Quelle um; ich führe Sie mit einem Screenshot-Pfad durch.
3. **Lesender Abruf der Live-Seite** für Smoke-Tests nach jedem Deployment.
