import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { BASE } from "../../bdd/support/config/env";
import { CommonApi } from "./Common.api";
import { v4 as uuidv4 } from "uuid";

export class UsuariosApi {
  private payload: Record<string, string> = {};
  private response?: APIResponse;
  private userIdCriado?: string;
  private common = new CommonApi();

  constructor(private request: APIRequestContext) {}

  private gerarDadosCadastro() {
    const id = uuidv4().replace(/-/g, "");

    return {
      nome: `usuario-${id.slice(0, 8)}`,
      email: `qa.${id.slice(8, 20)}@qa.com`,
      password: `Qa@${id.slice(20, 28)}`,
    };
  }

  requestCriarUsuarioComSucesso() {
    const dados = this.gerarDadosCadastro();

    this.payload = {
      nome: dados.nome,
      email: dados.email,
      password: dados.password,
      administrador: "true"
    };
  }

  requestCriarUsuarioComEmailInvalido() {
    this.payload = {
      nome: "Fulano da Silva",
      email: "email-invalido",
      password: "teste123",
      administrador: "true"
    };
  }

  requestCriarUsuarioComAdministradorInvalido() {
    const dados = this.gerarDadosCadastro();

    this.payload = {
      nome: dados.nome,
      email: dados.email,
      password: dados.password,
      administrador: "talvez"
    };
  }

  requestCriarUsuarioSemCampoObrigatorioEmail() {
    this.payload = {
      nome: "Fulano da Silva",
      password: "teste123",
      administrador: "true"
    };
  }

  getEmailCriado() {
    return this.payload.email;
  }

  getPasswordCriada() {
    return this.payload.password;
  }

  async postCriarUsuario() {
    this.response = await this.request.post(`${BASE.api}/usuarios`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: this.payload
    });

    if (this.response.status() === 201) {
      const body = await this.response.json();
      this.userIdCriado = body._id;
    }

    return this.response;
  }

  async deleteUsuarioCriado() {
    if (!this.userIdCriado) {
      return undefined;
    }

    const response = await this.request.delete(`${BASE.api}/usuarios/${this.userIdCriado}`, {
      headers: {
        Accept: "application/json"
      }
    });

    this.userIdCriado = undefined;
    return response;
  }

  validarStatusEsperado(status: string) {
    this.common.validarStatusCode(this.response, status);
  }

  async validarCamposEssenciaisDeSucesso() {
    expect(this.response, "É necessário executar postCriarUsuario antes das validações").toBeTruthy();

    const body = await this.response!.json();
    expect(body.message).toBe("Cadastro realizado com sucesso");
    expect(body._id).toBeTruthy();
    expect(typeof body._id).toBe("string");

    this.userIdCriado = body._id;
  }

  async validarCoerenciaDosValoresEnviados() {
    expect(this.payload.nome).toBeTruthy();
    expect(this.payload.email).toContain("@");
    expect(this.payload.administrador).toBe("true");
  }

  async validarMensagemDeErro(campo: "email" | "administrador") {
    expect(this.response, "É necessário executar postCriarUsuario antes das validações").toBeTruthy();

    const body = await this.response!.json();

    if (campo === "email") {
      expect(body.email).toContain("email deve ser um email válido");
      return;
    }

    expect(body.administrador).toContain("administrador deve ser 'true' ou 'false'");
  }

  async validarMensagemCampoObrigatorioAusente(campo: "email") {
    expect(this.response, "É necessário executar postCriarUsuario antes das validações").toBeTruthy();

    const body = await this.response!.json();
    expect(body[campo]).toContain(`${campo} é obrigatório`);
  }
}
