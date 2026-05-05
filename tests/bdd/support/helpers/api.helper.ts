import { APIRequestContext } from "@playwright/test";
import { AuthApi } from "../../../playwright/api/Auth.api";
import { UsuariosApi } from "../../../playwright/api/Usuarios.api";
import { ProdutosApi } from "../../../playwright/api/Produtos.api";
import { CarrinhosApi } from "../../../playwright/api/Carrinhos.api";

export class ApiHelper {
  public auth: AuthApi;
  public usuarios: UsuariosApi;
  public produtos: ProdutosApi;
  public carrinhos: CarrinhosApi;

  constructor(request: APIRequestContext, tokenProvider: () => string | undefined) {
    this.auth = new AuthApi(request);
    this.usuarios = new UsuariosApi(request);
    this.produtos = new ProdutosApi(request, tokenProvider);
    this.carrinhos = new CarrinhosApi(request, tokenProvider);
  }
}
