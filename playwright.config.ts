import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  use: {
    headless: true,
    baseURL: process.env.BASE_URL ?? 'https://seu-site-aqui.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});
