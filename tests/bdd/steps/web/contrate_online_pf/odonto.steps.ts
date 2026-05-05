import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../../support/world";

Then("escolher Adicionar plano Odontologico na pagina Odonto", async function (this: CustomWorld) {
  await this.pages.odontoPage.planoOdonto();
});

 


