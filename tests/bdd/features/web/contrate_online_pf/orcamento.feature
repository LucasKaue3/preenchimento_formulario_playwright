Feature: Fluxo de Orçamento

  Como contratador do plato de saúde
  Quero realizar um orçamento
  Para comprar um plano de saúde

@orcamento_regressivo_contrate_online_pf
  Scenario Outline: Realizar um Orçamento com Sucesso
    Given que eu abro a página de orçamento da Hapvida
    Then realizo um cadastro inicial
    And escolho a cidade <cidade>
    And escolho a cobertura completa
    And escolher a acomodação Apartamento
    And escolher a coparticipação Com Coparticipação
    And escolher Adicionar plano Odontologico na pagina Odonto
    And adicionar um dependente no plano com idade de "30" anos
    And escolho a primeira proposta clicando em Detalhes do Plano
    And continuo com o cadastro informando todos dados necessários

    Examples:
      | cidade          |
      | "SAO LUIS - MA" |