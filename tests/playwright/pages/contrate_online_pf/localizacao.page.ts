import { Page, Locator } from "@playwright/test";

export class LocalizacaoPage {
  constructor(private page: Page) {}

    get btnOkSemLocalizacao(): Locator { return this.page.getByRole("button", { name: /^ok$/i }); }
    get btnBuscarCidade(): Locator { return this.page.locator("#manual-button"); }
    get selectCidade(): Locator { return this.page.locator("app-searchable-select"); }
    get inputBuscarCidade(): Locator { return this.selectCidade.locator('input.select-input[placeholder="Buscar cidade"]'); }
    get listaCidades(): Locator { return this.selectCidade.locator(".options-container"); }
    get opcoesCidade(): Locator { return this.listaCidades.locator("a.option"); }
    get btnContinuar(): Locator { return this.page.locator("button.button.continuar"); }



  async selecionarCidade(cidade: string) {
    
    await this.page.waitForLoadState('networkidle');
    await this.btnOkSemLocalizacao.click();  

    await this.btnBuscarCidade.waitFor({ state: "visible" });
    await this.btnBuscarCidade.click();

    await this.inputBuscarCidade.waitFor({ state: "visible" });
    await this.inputBuscarCidade.click();

    await this.listaCidades.waitFor({ state: "visible" });

    await this.inputBuscarCidade.type(cidade, { delay: 60 });

    await this.opcoesCidade
      .filter({ hasText: cidade })
      .first()
      .click();

    await this.btnContinuar.click();
  }
}
