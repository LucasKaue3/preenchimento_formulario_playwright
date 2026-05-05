import { fakerPT_BR as faker } from "@faker-js/faker";
import { generate } from "gerador-validador-cpf";

export class MassaDados {
  static nomeCompleto(): string {
    return faker.person.fullName();
  }

  static email(): string {
    return faker.internet.email().toLowerCase();
  }

  static celular(): string {
    return `119${faker.string.numeric(8)}`;
  }

  static cpf(): string {
    return generate();
  }

  static cpfSemMascara(): string {
    return generate().replace(/\D/g, "");
  }

  static dataNascimento(): string {
    return "01/01/1990";
  }

  static cep(): string {
    return "06420-130";
  }

  static numeroEndereco(): string {
    return faker.location.buildingNumber();
  }

  static numeroDocumento(): string {
    return faker.string.numeric(9);
  }
}