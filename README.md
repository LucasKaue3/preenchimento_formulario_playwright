# Teste Playwright - Cadastro Dentista PF

## Como iniciar

1. Instale as dependências:

```bash
npm install
```

2. Instale os navegadores do Playwright:

```bash
npx playwright install
```

## Como rodar abrindo no Chrome

### PowerShell (Windows)

```powershell
$env:BASE_URL="https://seu-endereco-real"
npm run test:chrome
```

### CMD (Windows)

```cmd
set BASE_URL=https://seu-endereco-real
npm run test:chrome
```

### Bash (Linux/macOS/Git Bash)

```bash
BASE_URL="https://seu-endereco-real" npm run test:chrome
```

## Outros modos úteis

```bash
npm run test:headed
npm run test:ui
```
