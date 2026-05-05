import { Page } from "@playwright/test";
import { CadastroPage } from "../../../playwright/pages/contrate_online_pf/cadastro.page";
import { LocalizacaoPage } from "../../../playwright/pages/contrate_online_pf/localizacao.page";
import { CoberturasPage } from "../../../playwright/pages/contrate_online_pf/coberturas.page";
import { AcomodacaoPage } from "../../../playwright/pages/contrate_online_pf/acomodacao.page";
import { CoparticipacaoPage } from "../../../playwright/pages/contrate_online_pf/coparticipacao.page";
import { OdontoPage } from "../../../playwright/pages/contrate_online_pf/odonto.page";
import { DependentesPage } from "../../../playwright/pages/contrate_online_pf/dependentes.page";
import { ResultadoPlanosPage } from "../../../playwright/pages/contrate_online_pf/resultadoPlanos.page";
import { DeclaracaoSaudePage } from "../../../playwright/pages/contrate_online_pf/declaracaoSaude.page";



export class PagesHelper {
  public cadastroPage: CadastroPage;
  public localizacaoPage: LocalizacaoPage;
  public coberturasPage: CoberturasPage;
  public acomodacaoPage: AcomodacaoPage;
  public coparticipacaoPage: CoparticipacaoPage;
  public odontoPage: OdontoPage;
  public dependentesPage: DependentesPage;
  public resultadoPlanosPage: ResultadoPlanosPage;
  public declaracaoSaudePage: DeclaracaoSaudePage;

  constructor(page: Page) {
    this.cadastroPage = new CadastroPage(page);
    this.localizacaoPage = new LocalizacaoPage(page);
    this.coberturasPage = new CoberturasPage(page);
    this.acomodacaoPage = new AcomodacaoPage(page);
    this.coparticipacaoPage = new CoparticipacaoPage(page);
    this.odontoPage = new OdontoPage(page);
    this.dependentesPage = new DependentesPage(page);
    this.resultadoPlanosPage = new ResultadoPlanosPage(page);
    this.declaracaoSaudePage = new DeclaracaoSaudePage(page);
  }
}
