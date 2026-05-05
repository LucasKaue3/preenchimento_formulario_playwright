import { Page, Locator } from "@playwright/test";

export class DeclaracaoSaudePage {
  constructor(private page: Page) {}

    get inputPeso(): Locator { return this.page.locator("#weight_titular"); }
    get inputAltura(): Locator { return this.page.locator("#height_titular"); }
    get btnPassoSeguinte(): Locator { return this.page.locator("button.btn-forward-valid", { hasText: "Passo seguinte" }); }
    get btnConfirmar(): Locator { return this.page.locator("button.btn-confirmar", { hasText: "Confirmar" }); }

  async camposDeclaracaoSaude() {
    await this.inputPeso.fill("86");
    await this.inputAltura.fill("180");
    await this.btnPassoSeguinte.click();
  }
}
