import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { BASE } from "../../bdd/support/config/env";

export class ProdutosApi {
  private response?: APIResponse;
  private payload?: { nome: string; preco: number; descricao: string; quantidade: number };
  private idProdutoCriado?: string;

  constructor(private request: APIRequestContext, private authTokenProvider: () => string | undefined) {}

  prepararProdutoValido() {
    const id = uuidv4().replace(/-/g, "").slice(0, 10);

    this.payload = {
      nome: `produto-${id}`,
      preco: 100,
      descricao: `descricao-${id}`,
      quantidade: 10
    };
  }

  prepararProdutoComPrecoInvalido(preco: number) {
    const id = uuidv4().replace(/-/g, "").slice(0, 10);

    this.payload = {
      nome: `produto-${id}`,
      preco,
      descricao: `descricao-${id}`,
      quantidade: 10
    };
  }

  async postProduto() {
    const token = this.authTokenProvider();

    if (!token) {
      throw new Error("Token de autenticação não encontrado para cadastro de produto.");
    }

    if (!this.payload) {
      throw new Error("Payload de produto não preparado.");
    }

    this.response = await this.request.post(`${BASE.api}/produtos`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
      data: this.payload
    });

    if (this.response.status() === 201) {
      const body = await this.response.json();
      this.idProdutoCriado = body._id as string;
    }

    return this.response;
  }

  async validarContratoProdutoCriado() {
    expect(this.response).toBeTruthy();
    const body = await this.response!.json();

    expect(body.message).toBe("Cadastro realizado com sucesso");
    expect(typeof body._id).toBe("string");
    expect(body._id.length).toBeGreaterThan(0);

    expect(this.payload).toBeTruthy();
    expect(typeof this.payload!.nome).toBe("string");
    expect(typeof this.payload!.preco).toBe("number");
    expect(Number.isInteger(this.payload!.preco)).toBeTruthy();
    expect(this.payload!.preco).toBeGreaterThan(0);
    expect(typeof this.payload!.descricao).toBe("string");
    expect(typeof this.payload!.quantidade).toBe("number");
    expect(Number.isInteger(this.payload!.quantidade)).toBeTruthy();
    expect(this.payload!.quantidade).toBeGreaterThan(0);
  }

  async validarErroPrecoInvalido() {
    expect(this.response).toBeTruthy();
    const body = await this.response!.json();

    expect(body.preco).toContain("preco deve ser um número positivo");
  }

  getResponse() {
    return this.response;
  }

  getProdutoId() {
    return this.idProdutoCriado;
  }

  async deleteProdutoCriado() {
    if (!this.idProdutoCriado) {
      return undefined;
    }

    const token = this.authTokenProvider();

    if (!token) {
      return undefined;
    }

    const response = await this.request.delete(`${BASE.api}/produtos/${this.idProdutoCriado}`, {
      headers: {
        Accept: "application/json",
        Authorization: token
      }
    });

    this.idProdutoCriado = undefined;
    return response;
  }
}
