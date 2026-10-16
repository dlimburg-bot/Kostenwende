// Playwright-Konfiguration: lokaler Server auf docs/, Handy + Desktop, hell + dunkel.
import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8765/';
const local = !process.env.BASE_URL;

export default defineConfig({
  testDir: 'tests',
  outputDir: '.qa/test-results',
  snapshotPathTemplate: '.qa/baseline/{testFilePath}/{arg}-{projectName}{ext}',
  timeout: 30_000,
  fullyParallel: true,
  reporter: [['list'], ['json', { outputFile: '.qa/playwright.json' }]],
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: 'disabled' } },
  use: { baseURL: BASE_URL, trace: 'retain-on-failure' },
  webServer: local ? { command: 'node scripts/serve.mjs', url: BASE_URL, reuseExistingServer: true } : undefined,
  projects: [
    { name: 'mobil-hell', use: { ...devices['Pixel 7'], colorScheme: 'light' } },
    { name: 'mobil-dunkel', use: { ...devices['Pixel 7'], colorScheme: 'dark' } },
    { name: 'desktop-hell', use: { viewport: { width: 1280, height: 800 }, colorScheme: 'light' } },
  ],
});
