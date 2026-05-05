import { Page, Locator } from "@playwright/test";

export class OdontoPage {
  constructor(private page: Page) {}

    get btnAdicionarPlanoOdonto(): Locator {
    return this.page.locator("button.item", {
        has: this.page.locator(".titulo-item-container p", { hasText: /^Adicionar plano odontológico$/i }),
    });
    }

  async planoOdonto() {
    await this.btnAdicionarPlanoOdonto.click();
  }
}
