import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";

Given("que crio um usuário administrador válido", async function (this: CustomWorld) {
  this.api.usuarios.requestCriarUsuarioComSucesso();
  const response = await this.api.usuarios.postCriarUsuario();
  const body = await response.json();
  this.attach(JSON.stringify(body, null, 2), "application/json");

  this.api.usuarios.validarStatusEsperado("201");
});

Given("que preparo login com credenciais válidas do usuário criado", async function (this: CustomWorld) {
  const email = this.api.usuarios.getEmailCriado();
  const password = this.api.usuarios.getPasswordCriada();

  if (!email || !password) {
    throw new Error("Credenciais do usuário não encontradas.");
  }

  this.api.auth.prepararLogin(email, password);
});

Given("que preparo login com senha incorreta", async function (this: CustomWorld) {
  const email = this.api.usuarios.getEmailCriado();

  if (!email) {
    throw new Error("Email do usuário não encontrado.");
  }

  this.api.auth.prepararLogin(email, "SenhaIncorreta123");
});

When("envio o POST para login", async function (this: CustomWorld) {
  const response = await this.api.auth.postLogin();
  const body = await response.json();
  this.attach(JSON.stringify(body, null, 2), "application/json");
});

Then("devo receber status de login {string}", function (this: CustomWorld, status: string) {
  const response = this.api.auth.getResponse();
  expect(response).toBeTruthy();
  expect(response!.status()).toBe(Number(status));
});

Then("devo capturar o token de autorização", async function (this: CustomWorld) {
  const token = await this.api.auth.obterTokenSeExistir();
  expect(token).toBeTruthy();
  this.authToken = token;
});

Then("devo validar erro de senha incorreta", async function (this: CustomWorld) {
  const body = await this.api.auth.obterBody();
  expect(body.message).toContain("Email e/ou senha inválidos");
});

Given("que preparo payload de produto válido", function (this: CustomWorld) {
  this.api.produtos.prepararProdutoValido();
});

Given("que preparo payload de produto com preço inválido", function (this: CustomWorld) {
  this.api.produtos.prepararProdutoComPrecoInvalido(-1);
});

When("envio o POST para criar produto", async function (this: CustomWorld) {
  const response = await this.api.produtos.postProduto();
  const body = await response.json();
  this.attach(JSON.stringify(body, null, 2), "application/json");
});

Then("devo receber status de produto {string}", function (this: CustomWorld, status: string) {
  const response = this.api.produtos.getResponse();
  expect(response).toBeTruthy();
  expect(response!.status()).toBe(Number(status));
});

Then("devo validar contrato do produto criado", async function (this: CustomWorld) {
  await this.api.produtos.validarContratoProdutoCriado();
});

Then("devo validar erro de preço inválido", async function (this: CustomWorld) {
  await this.api.produtos.validarErroPrecoInvalido();
});

Given("que preparo carrinho com o produto criado e quantidade válida", function (this: CustomWorld) {
  const idProduto = this.api.produtos.getProdutoId();

  if (!idProduto) {
    throw new Error("Produto criado não encontrado.");
  }

  this.api.carrinhos.prepararCarrinho(idProduto, 1);
});

Given("que preparo carrinho com quantidade inválida", function (this: CustomWorld) {
  const idProduto = this.api.produtos.getProdutoId();

  if (!idProduto) {
    throw new Error("Produto criado não encontrado.");
  }

  this.api.carrinhos.prepararCarrinho(idProduto, 0);
});

When("envio o POST para criar carrinho", async function (this: CustomWorld) {
  const response = await this.api.carrinhos.postCarrinho();
  const body = await response.json();
  this.attach(JSON.stringify(body, null, 2), "application/json");
});

Then("devo receber status de carrinho {string}", function (this: CustomWorld, status: string) {
  const response = this.api.carrinhos.getResponse();
  expect(response).toBeTruthy();
  expect(response!.status()).toBe(Number(status));
});

Then("devo validar idProduto e quantidade do carrinho", async function (this: CustomWorld) {
  await this.api.carrinhos.validarCarrinhoCriadoComSucesso();
});

Then("devo validar erro de quantidade inválida", async function (this: CustomWorld) {
  await this.api.carrinhos.validarErroQuantidadeInvalida();
});
