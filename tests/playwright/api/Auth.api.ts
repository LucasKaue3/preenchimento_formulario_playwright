import { APIRequestContext, APIResponse } from "@playwright/test";
import { BASE } from "../../bdd/support/config/env";

export class AuthApi {
  private response?: APIResponse;
  private payload?: { email: string; password: string };

  constructor(private request: APIRequestContext) {}

  prepararLogin(email: string, password: string) {
    this.payload = { email, password };
  }

  async postLogin() {
    if (!this.payload) {
      throw new Error("Payload de login não preparado.");
    }

    this.response = await this.request.post(`${BASE.api}/login`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: this.payload
    });

    return this.response;
  }

  getResponse() {
    return this.response;
  }

  async obterTokenSeExistir() {
    if (!this.response) {
      throw new Error("Resposta não encontrada. Execute o login antes de capturar o token.");
    }

    const body = await this.response.json();
    return body.authorization as string | undefined;
  }

  async obterBody() {
    if (!this.response) {
      throw new Error("Resposta não encontrada. Execute o login antes de validar.");
    }

    return this.response.json();
  }
}
