import { faker } from '@faker-js/faker/locale/pt_BR';
import { test } from '@playwright/test';
import { CadastroDentistaPfPage } from '../pages/cadastroDentistaPf.page';

const somenteNumeros = (valor: string) => valor.replace(/\D/g, '');

test('preencher todos os campos do cadastro de dentista PF', async ({ page }) => {
  const cadastro = new CadastroDentistaPfPage(page);

  await page.goto('/');

  await cadastro.formFormularioContato.waitFor({ state: 'visible' });

  const cpf = somenteNumeros(faker.string.numeric(11));
  const nome = faker.person.fullName();
  const email = faker.internet.email({ firstName: nome.split(' ')[0] }).toLowerCase();

  await cadastro.inputTokenCaptcha.fill('token-fake-para-testes');
  await cadastro.inputCpf.fill(cpf);
  await cadastro.inputNome.fill(nome);
  await cadastro.selectSexo.selectOption({ index: 1 });
  await cadastro.inputEmail.fill(email);
  await cadastro.inputCro.fill(somenteNumeros(faker.string.numeric(6)));
  await cadastro.selectUfCro.selectOption('SP');
  await cadastro.inputDddTelefone.fill('11');
  await cadastro.inputTelefone.fill(somenteNumeros(faker.phone.number('#########')));
  await cadastro.inputDddWhatsapp.fill('11');
  await cadastro.inputWhatsapp.fill(somenteNumeros(faker.phone.number('#########')));

  await cadastro.inputCep.fill('01311000');
  await cadastro.inputRua.fill(faker.location.street());
  await cadastro.inputNumero.fill(String(faker.number.int({ min: 1, max: 9999 })));
  await cadastro.inputBairro.fill(faker.location.county());
  await cadastro.selectUf.selectOption('SP');
  await cadastro.inputCidade.fill('São Paulo');
  await cadastro.inputPontoReferencia.fill('Próximo ao metrô');
  await cadastro.inputDddTelefoneConsultorio.fill('11');
  await cadastro.inputTelefoneConsultorio.fill(somenteNumeros(faker.phone.number('#########')));

  await cadastro.checkboxClinicaGeral.check();
  await cadastro.checkboxPeriodontia.check();
  await cadastro.checkboxEndodontia.check();
  await cadastro.checkboxProtese.check();
  await cadastro.checkboxCirurgia.check();
  await cadastro.checkboxOrtodontia.check();
  await cadastro.checkboxOdontopediatria.check();
  await cadastro.checkboxDtmAtm.check();
  await cadastro.checkboxRadiologia.check();
  await cadastro.checkboxEstomatologista.check();
  await cadastro.checkboxOutros.check();
  await cadastro.inputDescricaoOutro.fill('Harmonização orofacial');

  await cadastro.checkboxUrgencia24Horas.check();
  await cadastro.checkboxUrgenciaDiurna.check();
  await cadastro.checkboxUrgenciaNoturna.check();
  await cadastro.checkboxUrgenciaNoturnaSobreAviso.check();
});
