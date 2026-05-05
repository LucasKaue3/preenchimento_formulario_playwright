import { Page, Locator } from "@playwright/test";

export class CoberturasPage {
  constructor(private page: Page) {}

    get btnCoberturaConsultas(): Locator { return this.page.getByRole("button", { name: /Consultas,\s*Exames,\s*Internação e Parto/i }); }


  async coberturaCompleta() {
    await this.btnCoberturaConsultas.click();
  }
}
