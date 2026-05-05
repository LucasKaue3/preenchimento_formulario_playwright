import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../../support/world";

Given("que eu abro a página de orçamento da Hapvida", async function (this: CustomWorld) {
  await this.pages.cadastroPage.siteContrateHapvida();
});

Then("realizo um cadastro inicial", async function (this: CustomWorld) {
  await this.pages.cadastroPage.cadastro();
});
 
Then("continuo com o cadastro informando todos dados necessários", async function (this: CustomWorld) {
  await this.pages.cadastroPage.continuarCadastro();
});

