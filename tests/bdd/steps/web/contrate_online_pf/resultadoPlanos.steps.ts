import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../../support/world";

Then("escolho a primeira proposta clicando em Detalhes do Plano", async function (this: CustomWorld) {
  await this.pages.resultadoPlanosPage.selecionarPrimeiroPlano();
});

 