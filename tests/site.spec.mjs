// Kern-Regressionstests (Entwurf). Übernimmt die bisher nur temporär vorhandenen Prüfungen
// (func/t9/ovf/audit8/len) in eine versionierte Suite. Formulare laufen gegen einen Mock – nie gegen Make.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const errorsOf = (page) => { const e = []; page.on('pageerror', (x) => e.push(x.message)); return e; };

test.describe('Funktion', () => {
  test('Rechner: deutsches Zahlenformat und Ergebnis', async ({ page }) => {
    const errs = errorsOf(page);
    await page.goto('./');
    await page.fill('#verbrauch', '3.500');
    await page.locator('#rechner summary').click();
    await page.fill('#arbeitspreis', '42,5');
    await expect(page.locator('#r-kosten')).toHaveText(/1\.656\s?€/);
    expect(errs).toEqual([]);
  });

  test('Rechner kennzeichnet Marktwert und Beispielpreis (K1/K2)', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('#r-kosten-l')).toHaveText('Geschätzte Kosten pro Jahr');
    await expect(page.locator('#r-src')).toContainText('Marktwert');
    await expect(page.locator('#r-src')).toContainText('laut Verivox');
    await expect(page.locator('#r-src')).toContainText('TELESON-Angebot kann abweichen');
    await expect(page.locator('#r-src')).toContainText('Beispielpreis');
    await page.locator('#rechner summary').click();
    await page.fill('#arbeitspreis', '38,5');
    await expect(page.locator('#r-kosten-l')).toHaveText('Ihre Kosten pro Jahr');
    await expect(page.locator('#r-src')).not.toContainText('Beispielpreis');
  });

  test('Termin-Button führt zu Calendly Tarif-Check', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('#lp-termin a')).toHaveAttribute('href', /calendly\.com\/d-limburg\/kostenwende-kostenloser-tarif-check/);
  });

  test('Rückruf-Formular: Pflichtfelder, Mock-Versand, Erfolgsmeldung', async ({ page }) => {
    let body = '';
    await page.route('https://hook.eu1.make.com/**', (r) => { body = r.request().postData() || ''; r.fulfill({ status: 200, body: '{"ok":true}' }); });
    await page.goto('./');
    await page.click('#lt-rueckruf');
    await page.click('#rr-submit');
    await expect(page.locator('#rr-name')).toHaveJSProperty('validity.valid', false);
    await page.fill('#rr-name', 'Test');
    await page.fill('#rr-tel', '0170 0000000');
    await page.check('#lp-rueckruf input[name="einwilligung"]');
    await page.click('#rr-submit');
    await expect(page.locator('#lp-rueckruf .form-status')).toContainText('Danke');
    expect(body).toContain('einwilligung');
  });

  test('Ansichtswechsel Sparen ↔ Partner ohne Fehler', async ({ page }) => {
    const errs = errorsOf(page);
    await page.goto('./');
    await page.click('.tabs a[data-go="partner"], .tabs [href="#partner"]');
    await expect(page.locator('#view-partner')).toBeVisible();
    await expect(page.locator('#mbar-cta')).toHaveText(/Kennenlernen anfragen|Ersparnis/);
    expect(errs).toEqual([]);
  });
});

test.describe('Layout', () => {
  for (const w of [320, 360, 390, 480, 768, 960, 1280]) {
    test(`kein Querscrollen bei ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto('./');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
  test('Seitenlänge mobil ≤ 8 Bildschirme', async ({ page }, info) => {
    test.skip(!info.project.name.startsWith('mobil'));
    for (const v of ['', '#partner']) {
      await page.goto('./' + v);
      const screens = await page.evaluate(() => document.documentElement.scrollHeight / innerHeight);
      expect(screens).toBeLessThanOrEqual(8);
    }
  });
});

test.describe('Barrierefreiheit', () => {
  for (const [name, hash] of [['Sparen', ''], ['Partner', '#partner'], ['Recht', '#impressum']]) {
    test(`axe: keine Verstöße (WCAG 2.2 AA) – ${name}`, async ({ page }) => {
      await page.goto('./' + hash);
      await page.waitForTimeout(300);
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(r.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
    });
  }
  test('Wischleisten am Handy per Tastatur erreichbar', async ({ page }, info) => {
    test.skip(!info.project.name.startsWith('mobil'));
    await page.goto('./');
    expect(await page.locator('#vertrauen .rail').getAttribute('tabindex')).toBe('0');
  });
});

test.describe('Nachweise (Urkunden)', () => {
  for (const [name, hash, sel] of [['Sparen', '', '#nachweise'], ['Partner', '#partner', '#nachweise-partner']]) {
    test(`${name}: 3 Vorschaubilder laden, Großansicht öffnet und schließt`, async ({ page }) => {
      const errs = errorsOf(page);
      await page.goto('./' + hash);
      const box = page.locator(sel);
      await box.scrollIntoViewIfNeeded();
      const imgs = box.locator('.nachweis img');
      await expect(imgs).toHaveCount(3);
      for (let i = 0; i < 3; i++) await expect.poll(() => imgs.nth(i).evaluate((im) => im.complete && im.naturalWidth > 0)).toBe(true);
      const first = box.locator('.nachweis').first();
      await first.click();
      const dlg = page.locator('#nachweis-dlg');
      await expect(dlg).toBeVisible();
      await expect.poll(() => page.locator('#nachweis-img').evaluate((im) => im.complete && im.naturalWidth >= 900)).toBe(true);
      await expect(page.locator('#nachweis-cap')).not.toBeEmpty();
      await page.keyboard.press('Escape');
      await expect(dlg).toBeHidden();
      await expect(first).toBeFocused();
      expect(errs).toEqual([]);
    });
  }
  test('Startbereich nennt die Qualifikation, nicht „Energieberater“', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('.advisor')).toContainText('Wirtschaftsfachwirt (IHK)');
    expect(await page.locator('body').innerText()).not.toMatch(/Energieberat(er|ung)/);
  });
});

test.describe('Ruhe statt Überladung (Regression)', () => {
  test('keine Dauer-Animationen, kein Live-Zähler, kein Laufband', async ({ page }) => {
    await page.goto('./');
    await page.waitForTimeout(1500);
    const infinite = await page.evaluate(() => [...document.querySelectorAll('*')]
      .filter((e) => getComputedStyle(e).animationIterationCount === 'infinite' && e.offsetParent !== null)
      .map((e) => e.className.toString()));
    expect(infinite).toEqual([]);
    await expect(page.locator('#ticker, .marquee')).toHaveCount(0);
  });
  test('Erinnerungs-Popup erscheint am Handy nie', async ({ page }, info) => {
    test.skip(!info.project.name.startsWith('mobil'));
    await page.goto('./');
    await page.fill('#verbrauch', '4000');
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(7000);
    await expect(page.locator('#nudge')).toBeHidden();
  });
});

test('visuell: erster Bildschirm @visual', async ({ page }) => {
  await page.goto('./');
  await expect(page).toHaveScreenshot('hero.png');
});

test('Live-Smoke @smoke', async ({ page }) => {
  const res = await page.goto('./');
  expect(res.status()).toBe(200);
  await expect(page).toHaveTitle(/Kostenwende/);
});
