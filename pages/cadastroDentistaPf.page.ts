import { Locator, Page } from '@playwright/test';

export class CadastroDentistaPfPage {
  constructor(private readonly page: Page) {}

  // Página de Cadastro Dentista - Pessoa Física
  get formFormularioContato(): Locator { return this.page.locator('.ultimas_noticias #formularioContato'); }
  get inputTokenCaptcha(): Locator { return this.page.locator('.ultimas_noticias #pTokenCaptcha'); }

  // Dados Pessoais
  get inputCpf(): Locator { return this.page.locator('.ultimas_noticias #cpf'); }
  get labelErroCpf(): Locator { return this.page.locator('.ultimas_noticias #cpfLabel'); }
  get inputNome(): Locator { return this.page.locator('.ultimas_noticias #nome'); }
  get selectSexo(): Locator { return this.page.locator('.ultimas_noticias #sexo'); }
  get inputEmail(): Locator { return this.page.locator('.ultimas_noticias #email'); }
  get inputCro(): Locator { return this.page.locator('.ultimas_noticias #cro'); }
  get selectUfCro(): Locator { return this.page.locator('.ultimas_noticias #ufcro'); }
  get inputDddTelefone(): Locator { return this.page.locator('.ultimas_noticias #ddd'); }
  get inputTelefone(): Locator { return this.page.locator('.ultimas_noticias #telefone'); }
  get inputDddWhatsapp(): Locator { return this.page.locator('.ultimas_noticias #dddF'); }
  get inputWhatsapp(): Locator { return this.page.locator('.ultimas_noticias #telefoneF'); }

  // Endereço do Consultório
  get inputCep(): Locator { return this.page.locator('.ultimas_noticias #cep'); }
  get inputRua(): Locator { return this.page.locator('.ultimas_noticias #rua'); }
  get inputNumero(): Locator { return this.page.locator('.ultimas_noticias #numero'); }
  get inputBairro(): Locator { return this.page.locator('.ultimas_noticias #bairro'); }
  get selectUf(): Locator { return this.page.locator('.ultimas_noticias #uf'); }
  get inputCidade(): Locator { return this.page.locator('.ultimas_noticias #cidade'); }
  get inputPontoReferencia(): Locator { return this.page.locator('.ultimas_noticias #pontoref'); }
  get inputDddTelefoneConsultorio(): Locator { return this.page.locator('.ultimas_noticias #dddCons'); }
  get inputTelefoneConsultorio(): Locator { return this.page.locator('.ultimas_noticias #telefoneCons'); }

  // Especialidades
  get labelPlanoEspecialidades(): Locator { return this.page.locator('.ultimas_noticias #plano').nth(0); }
  get spanErroEspecialidades(): Locator { return this.page.locator('.ultimas_noticias #erro').nth(0); }
  get checkboxClinicaGeral(): Locator { return this.page.locator('.ultimas_noticias #clinicaGeral'); }
  get checkboxPeriodontia(): Locator { return this.page.locator('.ultimas_noticias #periodontia'); }
  get checkboxEndodontia(): Locator { return this.page.locator('.ultimas_noticias #endodontia'); }
  get checkboxProtese(): Locator { return this.page.locator('.ultimas_noticias #protese'); }
  get checkboxCirurgia(): Locator { return this.page.locator('.ultimas_noticias #cirugia'); }
  get checkboxOrtodontia(): Locator { return this.page.locator('.ultimas_noticias #ortondontia'); }
  get checkboxOdontopediatria(): Locator { return this.page.locator('.ultimas_noticias #OdontoPeditria'); }
  get checkboxDtmAtm(): Locator { return this.page.locator('.ultimas_noticias #dtmatm'); }
  get checkboxRadiologia(): Locator { return this.page.locator('.ultimas_noticias #Radiologia'); }
  get checkboxEstomatologista(): Locator { return this.page.locator('.ultimas_noticias #Estomatologista'); }
  get checkboxOutros(): Locator { return this.page.locator('.ultimas_noticias #outros'); }
  get inputDescricaoOutro(): Locator { return this.page.locator('.ultimas_noticias #dsoutro'); }

  // Especialidade / Urgência
  get labelPlanoUrgencia(): Locator { return this.page.locator('.ultimas_noticias #plano_urgencia'); }
  get spanErroUrgencia(): Locator { return this.page.locator('.ultimas_noticias #erro').nth(1); }
  get checkboxUrgencia24Horas(): Locator { return this.page.locator('.ultimas_noticias #urg24horas'); }
  get checkboxUrgenciaDiurna(): Locator { return this.page.locator('.ultimas_noticias #urgdiurna'); }
  get checkboxUrgenciaNoturna(): Locator { return this.page.locator('.ultimas_noticias #urgnoturna'); }
  get checkboxUrgenciaNoturnaSobreAviso(): Locator { return this.page.locator('.ultimas_noticias #urgnoturnasobreaviso'); }

  // Confirmação
  get labelAncora(): Locator { return this.page.locator('.ultimas_noticias #Ancora'); }
  get labelPlanoConfirmacaoCadastro(): Locator { return this.page.locator('.ultimas_noticias #plano').nth(1); }
}
