import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../../support/world";

Given("escolher a coparticipação Com Coparticipação", async function (this: CustomWorld) {
  await this.pages.coparticipacaoPage.comCoparticipacao();
});