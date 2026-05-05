import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../../support/world";

Given("escolher a acomodação Apartamento", async function (this: CustomWorld) {
  await this.pages.acomodacaoPage.acomodacaoApartamento();
});
