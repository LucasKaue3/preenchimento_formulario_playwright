import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { BASE } from "../../bdd/support/config/env";

export class CarrinhosApi {
  private response?: APIResponse;
  private payload?: { produtos: Array<{ idProduto: string; quantidade: number }> };

  constructor(private request: APIRequestContext, private authTokenProvider: () => string | undefined) {}

  prepararCarrinho(idProduto: string, quantidade: number) {
    this.payload = {
      produtos: [{ idProduto, quantidade }]
    };
  }

  async postCarrinho() {
    const token = this.authTokenProvider();

    if (!token) {
      throw new Error("Token de autenticação não encontrado para cadastro de carrinho.");
    }

    if (!this.payload) {
      throw new Error("Payload de carrinho não preparado.");
    }

    this.response = await this.request.post(`${BASE.api}/carrinhos`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
      data: this.payload
    });

    return this.response;
  }

  async validarCarrinhoCriadoComSucesso() {
    expect(this.response).toBeTruthy();
    const body = await this.response!.json();

    expect(body.message).toBe("Cadastro realizado com sucesso");
    expect(typeof body._id).toBe("string");

    expect(this.payload).toBeTruthy();
    expect(this.payload!.produtos[0].idProduto.length).toBeGreaterThan(0);
    expect(this.payload!.produtos[0].quantidade).toBeGreaterThan(0);
  }

  async validarErroQuantidadeInvalida() {
    expect(this.response).toBeTruthy();
    const body = await this.response!.json();

    const camposPossiveis = [
      body.quantidade,
      body.produtos,
      body.message
    ].filter(Boolean);

    expect(camposPossiveis.length).toBeGreaterThan(0);

    const textoConsolidado = JSON.stringify(camposPossiveis).toLowerCase();

    const ehErroDeQuantidadeExplicito =
      textoConsolidado.includes("quantidade") && /maior|igual|inválida|invalida/.test(textoConsolidado);

    const ehErroDeProdutoObrigatorio =
      textoConsolidado.includes("produtos") && /obrigatório|obrigatorio/.test(textoConsolidado);

    expect(
      ehErroDeQuantidadeExplicito || ehErroDeProdutoObrigatorio,
      `Mensagem de erro inesperada para quantidade inválida. Body recebido: ${JSON.stringify(body)}`
    ).toBeTruthy();
  }

  getResponse() {
    return this.response;
  }

  async cancelarCompra() {
    const token = this.authTokenProvider();

    if (!token) {
      return undefined;
    }

    const response = await this.request.delete(`${BASE.api}/carrinhos/cancelar-compra`, {
      headers: {
        Accept: "application/json",
        Authorization: token
      }
    });

    return response;
  }
}
