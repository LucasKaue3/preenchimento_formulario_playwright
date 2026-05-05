import { Page, Locator } from "@playwright/test";

export class DependentesPage {
  constructor(private page: Page) {}

    get btnEuEDependentes(): Locator {
    return this.page.locator("button.option", {
        has: this.page.locator(".titulo-item-container p", { hasText: /^Eu e dependentes$/i }),
    });
    }
    get inputDependente(): Locator { return this.page.locator("#input-titular"); }
    get linkAdicionarDependente(): Locator { return this.page.locator("a.add-dep"); }
    get btnVerOpcoes(): Locator { return this.page.locator("#btn-ver-opcoes"); }



  async opcaoComDependentes(idade: string) {
    await this.btnEuEDependentes.click();
    await this.inputDependente.fill(idade);
    await this.btnVerOpcoes.click();
    await this.page.waitForTimeout(10_000);

  }
}
