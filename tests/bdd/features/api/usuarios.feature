@api @usuarios
Feature: Jornada de API na ServeRest
  Como pessoa de QA
  Quero validar o fluxo principal de usuários, login, produtos e carrinhos
  Para ter confiança nos cenários de sucesso e de erro

  Scenario: Fazer login com sucesso usando um usuário recém-criado
    Given que crio um usuário administrador válido
    And que preparo login com credenciais válidas do usuário criado
    When envio o POST para login
    Then devo receber status de login "200"
    And devo capturar o token de autorização

  Scenario: Receber erro ao tentar login com senha incorreta
    Given que crio um usuário administrador válido
    And que preparo login com senha incorreta
    When envio o POST para login
    Then devo receber status de login "401"
    And devo validar erro de senha incorreta

  Scenario: Criar produto com sucesso e validar retorno
    Given que crio um usuário administrador válido
    And que preparo login com credenciais válidas do usuário criado
    When envio o POST para login
    Then devo receber status de login "200"
    And devo capturar o token de autorização
    Given que preparo payload de produto válido
    When envio o POST para criar produto
    Then devo receber status de produto "201"
    And devo validar contrato do produto criado

  Scenario: Não permitir criar produto com preço inválido
    Given que crio um usuário administrador válido
    And que preparo login com credenciais válidas do usuário criado
    When envio o POST para login
    Then devo receber status de login "200"
    And devo capturar o token de autorização
    Given que preparo payload de produto com preço inválido
    When envio o POST para criar produto
    Then devo receber status de produto "400"
    And devo validar erro de preço inválido

  Scenario: Criar carrinho com sucesso usando o produto criado
    Given que crio um usuário administrador válido
    And que preparo login com credenciais válidas do usuário criado
    When envio o POST para login
    Then devo receber status de login "200"
    And devo capturar o token de autorização
    Given que preparo payload de produto válido
    When envio o POST para criar produto
    Then devo receber status de produto "201"
    Given que preparo carrinho com o produto criado e quantidade válida
    When envio o POST para criar carrinho
    Then devo receber status de carrinho "201"
    And devo validar idProduto e quantidade do carrinho

  Scenario: Bloquear carrinho com quantidade menor ou igual a zero
    Given que crio um usuário administrador válido
    And que preparo login com credenciais válidas do usuário criado
    When envio o POST para login
    Then devo receber status de login "200"
    And devo capturar o token de autorização
    Given que preparo payload de produto válido
    When envio o POST para criar produto
    Then devo receber status de produto "201"
    Given que preparo carrinho com quantidade inválida
    When envio o POST para criar carrinho
    Then devo receber status de carrinho "400"
    And devo validar erro de quantidade inválida
