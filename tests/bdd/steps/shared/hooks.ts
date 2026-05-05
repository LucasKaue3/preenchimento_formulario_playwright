import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/world";

setDefaultTimeout(60_000);

Before({ tags: "@api" }, async function (this: CustomWorld) {
  await this.initApiOnly();
});

Before({ tags: "not @api" }, async function (this: CustomWorld) {
  await this.initWebAndApi();
});

After(async function (this: CustomWorld, scenario) {
  const isUsuariosScenario = scenario.pickle.tags.some((tag) => tag.name === "@usuarios");

  if (isUsuariosScenario) {
    const cancelResponse = await this.api.carrinhos.cancelarCompra();

    if (cancelResponse) {
      const body = await cancelResponse.json();
      this.attach(JSON.stringify(body, null, 2), "application/json");
    }

    const deleteProdutoResponse = await this.api.produtos.deleteProdutoCriado();

    if (deleteProdutoResponse) {
      const body = await deleteProdutoResponse.json();
      this.attach(JSON.stringify(body, null, 2), "application/json");
    }

    const deleteUsuarioResponse = await this.api.usuarios.deleteUsuarioCriado();

    if (deleteUsuarioResponse) {
      const body = await deleteUsuarioResponse.json();
      this.attach(JSON.stringify(body, null, 2), "application/json");
    }
  }

  await this.cleanup();
});
