import { defineConfig, devices } from '@playwright/test';

const URL_CADASTRO_DENTISTA_PF =
  'https://www.hapvida.com.br/pls/webhap/webnewdentalprestador.pr_Novo_Dentista?pOrgAmb=2&pFisJur=1';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  use: {
    baseURL: URL_CADASTRO_DENTISTA_PF,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        headless: false
      }
    }
  ]
});
