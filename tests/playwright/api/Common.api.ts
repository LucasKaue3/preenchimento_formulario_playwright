import { APIResponse } from "@playwright/test";

export class CommonApi {
  validarStatusCode(response: APIResponse | undefined, statusEsperado: string) {
    if (!response) {
      throw new Error("Resposta não encontrada. Execute a requisição antes da validação de status.");
    }

    const codigoEsperado = Number(statusEsperado);
    const codigoObtido = response.status();

    if (codigoEsperado !== codigoObtido) {
      throw new Error(`Código esperado ${codigoEsperado}, código obtido ${codigoObtido}`);
    }
  }
}
