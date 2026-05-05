import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../../support/world";

Then("adicionar um dependente no plano com idade de {string} anos", async function (this: CustomWorld, idade: string) {
  await this.pages.dependentesPage.opcaoComDependentes(idade);
});
