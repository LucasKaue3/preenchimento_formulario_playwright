import { Page, Locator } from "@playwright/test";

export class ResultadoPlanosPage {
  constructor(private page: Page) {}

    get btnDetalhesPlano(): Locator { return this.page.getByRole("button", { name: /detalhes do plano/i }); }
    get btnSobrePlanoContinuar(): Locator { return this.page.locator("#sobre-plano-button-continuar"); }



  async selecionarPrimeiroPlano() {
    await this.page.waitForLoadState('networkidle');
    await this.btnDetalhesPlano.click();
    await this.page.waitForLoadState('networkidle');
    await this.btnSobrePlanoContinuar.click();
  }
}
