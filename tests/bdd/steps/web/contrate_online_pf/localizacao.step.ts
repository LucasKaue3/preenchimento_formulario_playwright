import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../../support/world";

Then("escolho a cidade {string}", async function (this: CustomWorld, cidade: string) {
  await this.pages.localizacaoPage.selecionarCidade(cidade);
});

 