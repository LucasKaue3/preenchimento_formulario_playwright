import { expect, Page, Locator } from "@playwright/test";
import path from "path";
import { MassaDados } from "../../../bdd/support/utils/massaDados";

export class CadastroPage {
  constructor(private page: Page) {}

  private readonly pastaArquivos = path.resolve("tests/bdd/support/files/Documentos");

  private readonly celularCadastro = MassaDados.celular();

  // Pagina de Cadastro Inicial
  get inputNomeCompleto(): Locator { return this.page.locator("#nome"); }
  get inputEmail(): Locator { return this.page.locator("#id-email"); }
  get inputCelular(): Locator { return this.page.locator("#telefone"); }
  get btnSimularPlano(): Locator { return this.page.getByRole("button", { name: /simular plano/i }); }
  get btnOkSemLocalizacao(): Locator { return this.page.getByRole("button", { name: /^ok$/i }); }
  get btnBuscarCidade(): Locator { return this.page.locator("#manual-button"); }

  // Pagina de Continuação do Cadastro
  get inputDataNascimento(): Locator { return this.page.locator("#id-birth-date"); }
  get inputCpf(): Locator { return this.page.locator("#id-cpf"); }
  get inputNomeDaMae(): Locator { return this.page.locator("#mother-name"); }
  get inputConfirmarTelefone(): Locator { return this.page.locator("#id-confirm-phone"); }
  get inputCep(): Locator { return this.page.locator("#id-postal-code"); }
  get inputNumeroEndereco(): Locator { return this.page.locator("#id-address-number"); }
  get inputNumeroDocumento(): Locator { return this.page.locator("#id-doc-number"); }

  get selectEstadoCivil(): Locator { return this.page.locator("#id-civil-status"); }
  get selectSexo(): Locator { return this.page.locator("#id-gender"); }
  get selectDocumentacao(): Locator { return this.page.locator("#id-documentation"); }
  get selectOrgaoEmissor(): Locator { return this.page.locator("#id-issuer"); }
  get selectUfEmissao(): Locator { return this.page.locator("#id-state-issuer"); }

  opcaoSelect(nome: string): Locator {
    return this.page.locator("mat-option, .mat-mdc-option").filter({ hasText: nome }).first();
  }

  get checkboxAceite1(): Locator { return this.page.locator("#mat-mdc-checkbox-1-input"); }
  get checkboxAceite2(): Locator { return this.page.locator("#mat-mdc-checkbox-2-input"); }
  get checkboxAceite3(): Locator { return this.page.locator("#mat-mdc-checkbox-3-input"); }

  // Inputs file
  get inputArquivoComprovanteResidencia(): Locator { return this.page.locator("#id-input-proof-address-file-titular"); }
  get inputArquivoFrenteRg(): Locator { return this.page.locator("#id-input-frente-rg-file-titular"); }
  get inputArquivoVersoRg(): Locator { return this.page.locator("#id-input-verso-rg-file-titular"); }

  // Labels / botões visíveis de upload
  get btnUploadComprovanteResidencia(): Locator { return this.page.locator("#label-proof-address-file-titular"); }
  get btnUploadFrenteRg(): Locator { return this.page.locator("#label-frente-rg-file-titular"); }
  get btnUploadVersoRg(): Locator { return this.page.locator("#label-verso-rg-file-titular"); }

  private async prepararCampo(campo: Locator) {
    await campo.waitFor({ state: "visible", timeout: 15000 });
    await campo.scrollIntoViewIfNeeded();
    await expect(campo).toBeEnabled({ timeout: 15000 });
    await campo.focus();
  }

  private async preencherCampo(campo: Locator, valor: string) {
    await this.prepararCampo(campo);
    await campo.fill(valor);
    await campo.blur();
  }

  private async clicarCampo(campo: Locator) {
    await this.prepararCampo(campo);
    await campo.click();
  }

  private async selecionarOpcaoSelect(select: Locator, nomeOpcao: string) {
    await this.clicarCampo(select);

    const opcao = this.opcaoSelect(nomeOpcao);

    await opcao.waitFor({ state: "visible", timeout: 15000 });
    await opcao.scrollIntoViewIfNeeded();
    await opcao.click();
  }

  private async marcarCheckbox(checkbox: Locator) {
    await checkbox.waitFor({ state: "visible", timeout: 15000 });
    await checkbox.scrollIntoViewIfNeeded();
    await expect(checkbox).toBeEnabled({ timeout: 15000 });

    if (!(await checkbox.isChecked())) {
      await checkbox.focus();
      await checkbox.check();
    }
  }

  async siteContrateHapvida() {
    await this.page.goto("https://contrate-online-hml.hapvidalabs.net/?theme=UNIFIED", {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
  }

  async cadastro() {
    await this.inputNomeCompleto.pressSequentially(MassaDados.nomeCompleto(), { delay: 100 });
    await this.inputEmail.pressSequentially(MassaDados.email(), { delay: 100 });
    await this.inputCelular.pressSequentially(this.celularCadastro, { delay: 100 });

    await this.clicarCampo(this.btnSimularPlano);
  }

  async selecionarArquivo(botao: Locator, caminhoArquivo: string) {
    await this.prepararCampo(botao);

    const [fileChooser] = await Promise.all([
      this.page.waitForEvent("filechooser"),
      botao.click(),
    ]);

    await fileChooser.setFiles(caminhoArquivo);
  }

  async continuarCadastro() {
    await this.preencherCampo(this.inputDataNascimento, MassaDados.dataNascimento());
    await this.preencherCampo(this.inputCpf, MassaDados.cpfSemMascara());
    await this.preencherCampo(this.inputNomeDaMae, MassaDados.nomeCompleto());

    await this.selecionarOpcaoSelect(this.selectEstadoCivil, "Solteiro");
    await this.selecionarOpcaoSelect(this.selectSexo, "Masculino");

    await this.preencherCampo(this.inputConfirmarTelefone, this.celularCadastro);

    await this.prepararCampo(this.inputCep);
    await this.inputCep.clear();
    await this.inputCep.pressSequentially(MassaDados.cep(), { delay: 150 });
    await this.inputCep.blur();

    await this.page.waitForTimeout(1000);

    await this.preencherCampo(this.inputNumeroEndereco, MassaDados.numeroEndereco());

    await this.selecionarOpcaoSelect(
      this.selectDocumentacao,
      "Registro Geral com CPF"
    );

    await this.selecionarOpcaoSelect(
      this.selectOrgaoEmissor,
      "SSP - Secretaria de Segurança Pública"
    );

    await this.preencherCampo(this.inputNumeroDocumento, MassaDados.numeroDocumento());

    await this.selecionarOpcaoSelect(this.selectUfEmissao, "São Paulo/SP");

    await this.marcarCheckbox(this.checkboxAceite1);
    await this.marcarCheckbox(this.checkboxAceite2);
    await this.marcarCheckbox(this.checkboxAceite3);

    await this.selecionarArquivo(
      this.btnUploadComprovanteResidencia,
      path.join(this.pastaArquivos, "COMPROVANTE-RESIDENCIA.jpg")
    );

    await this.selecionarArquivo(
      this.btnUploadFrenteRg,
      path.join(this.pastaArquivos, "RG-FRENTE.png")
    );

    await this.selecionarArquivo(
      this.btnUploadVersoRg,
      path.join(this.pastaArquivos, "RG-VERSO.jpg")
    );
  }
}