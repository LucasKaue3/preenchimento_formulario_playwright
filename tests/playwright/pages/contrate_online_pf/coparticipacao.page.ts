import { Page, Locator } from "@playwright/test";

export class CoparticipacaoPage {
  constructor(private page: Page) {}

    get btnComCoparticipacao(): Locator {
    return this.page
        .locator("button.item", { hasText: "Com Coparticipação" })
        .filter({ hasText: "Mensalidade mais barata" })
        .first();
    }

  async comCoparticipacao() {
    await this.btnComCoparticipacao.waitFor({ state: "visible" });
    await this.btnComCoparticipacao.click();
  }
}
