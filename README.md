# Projeto de Testes BDD + Playwright

Resumo rápido
- Estrutura BDD com Cucumber + Playwright para testes web e API.
- Scripts de execução e geração de relatórios já configurados em [package.json](package.json).
- Configuração do Cucumber em [tests/bdd/support/cucumber.js](tests/bdd/support/cucumber.js).
- Classe de contexto principal: [`CustomWorld`](tests/bdd/support/world.ts).

Pré-requisitos
- Node.js (recomenda-se versão LTS).
- Instalar dependências: npm install

Instalação
```sh
npm install
```

Scripts principais (definidos em [package.json](package.json))
- npm run cucumber — executa a suíte usando o runner customizado ([tests/bdd/support/run-with-report.js](tests/bdd/support/run-with-report.js)).
- npm run cucumber:headless — execução headless (usa `HEADLESS=true`).
- npm run cucumber:headed — execução com navegador visível (usa `HEADLESS=false`).
- npm run api — executa apenas cenários marcados com @api.

Como executar
- Executar todos os cenários:
  - npm run cucumber
- Executar em headless:
  - npm run cucumber:headless
- Executar apenas cenários @api:
  - npm run api
- Variável de ambiente:
  - HEADLESS (true/false) pode ser usada para forçar modo headless/headed.

Arquitetura e pontos importantes
- World / contexto
  - [`CustomWorld`](tests/bdd/support/world.ts) — gerencia browser, contexto, página e cliente API. Veja inicializadores: `initApiOnly()` e `initWebAndApi()`.
  - Link: [tests/bdd/support/world.ts](tests/bdd/support/world.ts)

- Helpers
  - API: [`ApiHelper`](tests/bdd/support/helpers/api.helper.ts) — encapsula clientes de API (Auth, Usuarios, Produtos, Carrinhos).  
    Link: [`ApiHelper`](tests/bdd/support/helpers/api.helper.ts) / [tests/bdd/support/helpers/api.helper.ts](tests/bdd/support/helpers/api.helper.ts)
  - Pages: [`PagesHelper`](tests/bdd/support/helpers/pages.helper.ts) — instancia páginas Playwright (ex.: cadastro, localizacao, resultado).  
    Link: [`PagesHelper`](tests/bdd/support/helpers/pages.helper.ts) / [tests/bdd/support/helpers/pages.helper.ts](tests/bdd/support/helpers/pages.helper.ts)

- APIs (Playwright)
  - [tests/playwright/api/Auth.api.ts](tests/playwright/api/Auth.api.ts) — endpoints de autenticação (usado por `ApiHelper`).
  - [tests/playwright/api/Usuarios.api.ts](tests/playwright/api/Usuarios.api.ts)
  - [tests/playwright/api/Produtos.api.ts](tests/playwright/api/Produtos.api.ts)
  - [tests/playwright/api/Carrinhos.api.ts](tests/playwright/api/Carrinhos.api.ts)

- Páginas (Playwright)
  - Exemplos: [tests/playwright/pages/contrate_online_pf/cadastro.page.ts](tests/playwright/pages/contrate_online_pf/cadastro.page.ts) (usada pelos testes web).

- Steps e Hooks
  - Steps exemplo: [tests/bdd/steps/api/Usuarios.step.ts](tests/bdd/steps/api/Usuarios.step.ts)
  - Hooks: [tests/bdd/steps/shared/hooks.ts](tests/bdd/steps/shared/hooks.ts) — limpeza pós-cenário, inicialização dependendo da tag @api.

Configuração do Cucumber
- Arquivo de configuração: [tests/bdd/support/cucumber.js](tests/bdd/support/cucumber.js)
  - Gera `json:tests/bdd/support/reports/cucumber.json` por padrão.

Relatórios
- Processo:
  - O runner [tests/bdd/support/run-with-report.js](tests/bdd/support/run-with-report.js) executa os testes e usa [tests/bdd/support/generate-report.js](tests/bdd/support/generate-report.js) para gerar o HTML.
- Local dos relatórios:
  - JSON bruto: [tests/bdd/support/reports/cucumber.json](tests/bdd/support/reports/cucumber.json)
  - HTML gerado: [tests/bdd/support/reports/html](tests/bdd/support/reports/html) (ex.: arquivos como `...-fluxo-de-or-amento.html`).

Configuração do TypeScript / Playwright
- [tsconfig.json](tsconfig.json)
- [playwright.config.ts](playwright.config.ts)

Boas práticas ao adicionar testes
- Colocar features em: [tests/bdd/features](tests/bdd/features)
- Steps em: [tests/bdd/steps](tests/bdd/steps)
- Reutilizar helpers:
  - Use [`PagesHelper`](tests/bdd/support/helpers/pages.helper.ts) para acessar páginas.
  - Use [`ApiHelper`](tests/bdd/support/helpers/api.helper.ts) para chamadas API.
- Para cenários que só usam API, marque com @api (hooks já inicializam apenas API para essa tag).

Depuração rápida
- Verifique logs de falha nos HTMLs em [tests/bdd/support/reports/html](tests/bdd/support/reports/html).
- Mensagens de erro de páginas Playwright geralmente apontam para arquivos em [tests/playwright/pages](tests/playwright/pages) (ex.: caminho e linha no stacktrace do relatório).

Links úteis no repositório
- [package.json](package.json)
- [playwright.config.ts](playwright.config.ts)
- [tsconfig.json](tsconfig.json)
- [`CustomWorld`](tests/bdd/support/world.ts) — [tests/bdd/support/world.ts](tests/bdd/support/world.ts)
- [tests/bdd/support/cucumber.js](tests/bdd/support/cucumber.js)
- [tests/bdd/support/run-with-report.js](tests/bdd/support/run-with-report.js)
- [tests/bdd/support/generate-report.js](tests/bdd/support/generate-report.js)
- [tests/bdd/support/reports](tests/bdd/support/reports)
- [`ApiHelper`](tests/bdd/support/helpers/api.helper.ts) — [tests/bdd/support/helpers/api.helper.ts](tests/bdd/support/helpers/api.helper.ts)
- [`PagesHelper`](tests/bdd/support/helpers/pages.helper.ts) — [tests/bdd/support/helpers/pages.helper.ts](tests/bdd/support/helpers/pages.helper.ts)
- [tests/bdd/steps/shared/hooks.ts](tests/bdd/steps/shared/hooks.ts)
- [tests/bdd/steps/api/Usuarios.step.ts](tests/bdd/steps/api/Usuarios.step.ts)
- [tests/playwright/api/Auth.api.ts](tests/playwright/api/Auth.api.ts)
- [tests/playwright/pages/contrate_online_pf/cadastro.page.ts](tests/playwright/pages/contrate_online_pf/cadastro.page.ts)
- [tests/bdd/features](tests/bdd/features)

Observações finais
- O repositório já traz scripts e integração para relatórios. Para customizações (por exemplo ajustar timeout global), editar [tests/bdd/support/cucumber.js](tests/bdd/support/cucumber.js) ou os helpers/factories em [tests/bdd/support](tests/bdd/support).

```// filepath: README.md
# Projeto de Testes BDD + Playwright

Resumo rápido
- Estrutura BDD com Cucumber + Playwright para testes web e API.
- Scripts de execução e geração de relatórios já configurados em [package.json](package.json).
- Configuração do Cucumber em [tests/bdd/support/cucumber.js](tests/bdd/support/cucumber.js).
- Classe de contexto principal: [`CustomWorld`](tests/bdd/support/world.ts).

Pré-requisitos
- Node.js (recomenda-se versão LTS).
- Instalar dependências: npm install

Instalação
```sh
npm install
```

Scripts principais (definidos em [package.json](package.json))
- npm run cucumber — executa a suíte usando o runner customizado ([tests/bdd/support/run-with-report.js](tests/bdd/support/run-with-report.js)).
- npm run cucumber:headless — execução headless (usa `HEADLESS=true`).
- npm run cucumber:headed — execução com navegador visível (usa `HEADLESS=false`).
- npm run api — executa apenas cenários marcados com @api.

Como executar
- Executar todos os cenários:
  - npm run cucumber
- Executar em headless:
  - npm run cucumber:headless
- Executar apenas cenários @api:
  - npm run api
- Variável de ambiente:
  - HEADLESS (true/false) pode ser usada para forçar modo headless/headed.

Arquitetura e pontos importantes
- World / contexto
  - [`CustomWorld`](tests/bdd/support/world.ts) — gerencia browser, contexto, página e cliente API. Veja inicializadores: `initApiOnly()` e `initWebAndApi()`.
  - Link: [tests/bdd/support/world.ts](tests/bdd/support/world.ts)

- Helpers
  - API: [`ApiHelper`](tests/bdd/support/helpers/api.helper.ts) — encapsula clientes de API (Auth, Usuarios, Produtos, Carrinhos).  
    Link: [`ApiHelper`](tests/bdd/support/helpers/api.helper.ts) / [tests/bdd/support/helpers/api.helper.ts](tests/bdd/support/helpers/api.helper.ts)
  - Pages: [`PagesHelper`](tests/bdd/support/helpers/pages.helper.ts) — instancia páginas Playwright (ex.: cadastro, localizacao, resultado).  
    Link: [`PagesHelper`](tests/bdd/support/helpers/pages.helper.ts) / [tests/bdd/support/helpers/pages.helper.ts](tests/bdd/support/helpers/pages.helper.ts)

- APIs (Playwright)
  - [tests/playwright/api/Auth.api.ts](tests/playwright/api/Auth.api.ts) — endpoints de autenticação (usado por `ApiHelper`).
  - [tests/playwright/api/Usuarios.api.ts](tests/playwright/api/Usuarios.api.ts)
  - [tests/playwright/api/Produtos.api.ts](tests/playwright/api/Produtos.api.ts)
  - [tests/playwright/api/Carrinhos.api.ts](tests/playwright/api/Carrinhos.api.ts)

- Páginas (Playwright)
  - Exemplos: [tests/playwright/pages/contrate_online_pf/cadastro.page.ts](tests/playwright/pages/contrate_online_pf/cadastro.page.ts) (usada pelos testes web).

- Steps e Hooks
  - Steps exemplo: [tests/bdd/steps/api/Usuarios.step.ts](tests/bdd/steps/api/Usuarios.step.ts)
  - Hooks: [tests/bdd/steps/shared/hooks.ts](tests/bdd/steps/shared/hooks.ts) — limpeza pós-cenário, inicialização dependendo da tag @api.

Configuração do Cucumber
- Arquivo de configuração: [tests/bdd/support/cucumber.js](tests/bdd/support/cucumber.js)
  - Gera `json:tests/bdd/support/reports/cucumber.json` por padrão.

Relatórios
- Processo:
  - O runner [tests/bdd/support/run-with-report.js](tests/bdd/support/run-with-report.js) executa os testes e usa [tests/bdd/support/generate-report.js](tests/bdd/support/generate-report.js) para gerar o HTML.
- Local dos relatórios:
  - JSON bruto: [tests/bdd/support/reports/cucumber.json](tests/bdd/support/reports/cucumber.json)
  - HTML gerado: [tests/bdd/support/reports/html](tests/bdd/support/reports/html) (ex.: arquivos como `...-fluxo-de-or-amento.html`).

Configuração do TypeScript / Playwright
- [tsconfig.json](tsconfig.json)
- [playwright.config.ts](playwright.config.ts)

Boas práticas ao adicionar testes
- Colocar features em: [tests/bdd/features](tests/bdd/features)
- Steps em: [tests/bdd/steps](tests/bdd/steps)
- Reutilizar helpers:
  - Use [`PagesHelper`](tests/bdd/support/helpers/pages.helper.ts) para acessar páginas.
  - Use [`ApiHelper`](tests/bdd/support/helpers/api.helper.ts) para chamadas API.
- Para cenários que só usam API, marque com @api (hooks já inicializam apenas API para essa tag).

Depuração rápida
- Verifique logs de falha nos HTMLs em [tests/bdd/support/reports/html](tests/bdd/support/reports/html).
- Mensagens de erro de páginas Playwright geralmente apontam para arquivos em [tests/playwright/pages](tests/playwright/pages) (ex.: caminho e linha no stacktrace do relatório).

Links úteis no repositório
- [package.json](package.json)
- [playwright.config.ts](playwright.config.ts)
- [tsconfig.json](tsconfig.json)
- [`CustomWorld`](tests/bdd/support/world.ts) — [tests/bdd/support/world.ts](tests/bdd/support/world.ts)
- [tests/bdd/support/cucumber.js](tests/bdd/support/cucumber.js)
- [tests/bdd/support/run-with-report.js](tests/bdd/support/run-with-report.js)
- [tests/bdd/support/generate-report.js](tests/bdd/support/generate-report.js)
- [tests/bdd/support/reports](tests/bdd/support/reports)
- [`ApiHelper`](tests/bdd/support/helpers/api.helper.ts) — [tests/bdd/support/helpers/api.helper.ts](tests/bdd/support/helpers/api.helper.ts)
- [`PagesHelper`](tests/bdd/support/helpers/pages.helper.ts) — [tests/bdd/support/helpers/pages.helper.ts](tests/bdd/support/helpers/pages.helper.ts)
- [tests/bdd/steps/shared/hooks.ts](tests/bdd/steps/shared/hooks.ts)
- [tests/bdd/steps/api/Usuarios.step.ts](tests/bdd/steps/api/Usuarios.step.ts)
- [tests/playwright/api/Auth.api.ts](tests/playwright/api/Auth.api.ts)
- [tests/playwright/pages/contrate_online_pf/cadastro.page.ts](tests/playwright/pages/contrate_online_pf/cadastro.page.ts)
- [tests/bdd/features](tests/bdd/features)

Observações finais
- O repositório já traz scripts e integração para relatórios. Para customizações (por exemplo ajustar timeout global), editar [tests/bdd/support/cucumber.js](tests/bdd/support/cucumber.js) ou os helpers/factories em