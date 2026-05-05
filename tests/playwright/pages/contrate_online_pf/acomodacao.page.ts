import { Page, Locator } from "@playwright/test";

export class AcomodacaoPage {
  constructor(private page: Page) {}

    get btnAcomodacaoApartamento(): Locator { return this.page.getByRole("button", { name: /Apartamento/i });}

  async acomodacaoApartamento() {
    await this.btnAcomodacaoApartamento.click();
  }
}
