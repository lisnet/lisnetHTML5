/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds
console.log('construing config , registrando state');
    $urlRouterProvider.otherwise("/login");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
//        debug: true
    });
 var menuJson =[
  {
    "PUS_IN_SEQUENCIA": 0,
    "PUS_IN_SEQUENCIAPAI": 0,
    "MOD_ST_CODIGO": "00001",
    "MOD_ST_DESCRICAO": "Menu Diario",
    "state": "menudiario",
    "stateN": "00001",
    "telas": [
      {
        "PUS_IN_SEQUENCIA": 1,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00227",
        "MOD_ST_DESCRICAO": "Orçamento",
        "state": "orcamento",
        "stateN": "00001.00227",
        "stateComposto": "00001.00227"
      },
      {
        "PUS_IN_SEQUENCIA": 2,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00223",
        "MOD_ST_DESCRICAO": "Conferência de Cadastro",
        "state": "conferenciadecadastro",
        "stateN": "00001.00223",
        "stateComposto": "00001.00223"
      },
      {
        "PUS_IN_SEQUENCIA": 3,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00222",
        "MOD_ST_DESCRICAO": "Soroteca Central",
        "state": "sorotecacentral",
        "stateN": "00001.00222",
        "stateComposto": "00001.00222"
      },
      {
        "PUS_IN_SEQUENCIA": 4,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00230",
        "MOD_ST_DESCRICAO": "Relatório de notificação",
        "state": "relatóriodenotificacao",
        "stateN": "00001.00230",
        "stateComposto": "00001.00230"
      },
      {
        "PUS_IN_SEQUENCIA": 5,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00228",
        "MOD_ST_DESCRICAO": "Relatorio de Pendências",
        "state": "relatoriodependencias",
        "stateN": "00001.00228",
        "stateComposto": "00001.00228"
      },
      {
        "PUS_IN_SEQUENCIA": 6,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00221",
        "MOD_ST_DESCRICAO": "Impressão Mapa de Trabalho",
        "state": "impressaomapadetrabalho",
        "stateN": "00001.00221",
        "stateComposto": "00001.00221"
      },
      {
        "PUS_IN_SEQUENCIA": 7,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00220",
        "MOD_ST_DESCRICAO": "Cadastro de Pacientes",
        "state": "cadastrodepacientes",
        "stateN": "00001.00220",
        "stateComposto": "00001.00220"
      },
      {
        "PUS_IN_SEQUENCIA": 8,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00035",
        "MOD_ST_DESCRICAO": "Recepção de Amostras",
        "state": "recepcaodeamostras",
        "stateN": "00001.00035",
        "stateComposto": "00001.00035"
      },
      {
        "PUS_IN_SEQUENCIA": 9,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00072",
        "MOD_ST_DESCRICAO": "Gerenciamento",
        "state": "gerenciamento",
        "stateN": "00001.00072",
        "stateComposto": "00001.00072"
      },
      {
        "PUS_IN_SEQUENCIA": 10,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00043",
        "MOD_ST_DESCRICAO": "Manutenção de Requisições",
        "state": "manutencaoderequisicoes",
        "stateN": "00001.00043",
        "stateComposto": "00001.00043"
      },
      {
        "PUS_IN_SEQUENCIA": 11,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00192",
        "MOD_ST_DESCRICAO": "Caixa",
        "state": "caixa",
        "stateN": "00001.00192",
        "stateComposto": "00001.00192"
      },
      {
        "PUS_IN_SEQUENCIA": 12,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00225",
        "MOD_ST_DESCRICAO": "Controle de Caixa",
        "state": "controledecaixa",
        "stateN": "00001.00225",
        "stateComposto": "00001.00225"
      },
      {
        "PUS_IN_SEQUENCIA": 13,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00226",
        "MOD_ST_DESCRICAO": "Fechamento de Caixa",
        "state": "fechamentodecaixa",
        "stateN": "00001.00226",
        "stateComposto": "00001.00226"
      },
      {
        "PUS_IN_SEQUENCIA": 14,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00074",
        "MOD_ST_DESCRICAO": "Relatorios",
        "state": "relatorios",
        "stateN": "00001.00074",
        "stateComposto": "00001.00074"
      },
      {
        "PUS_IN_SEQUENCIA": 15,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00132",
        "MOD_ST_DESCRICAO": "Estatística Demonstrativo de Faturamento",
        "state": "estatisticademonstrativodefaturamento",
        "stateN": "00001.00132",
        "stateComposto": "00001.00132"
      },
      {
        "PUS_IN_SEQUENCIA": 16,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00143",
        "MOD_ST_DESCRICAO": "Manual de Exames",
        "state": "manualdeexames",
        "stateN": "00001.00143",
        "stateComposto": "00001.00143"
      },
      {
        "PUS_IN_SEQUENCIA": 17,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00036",
        "MOD_ST_DESCRICAO": "Impressão do Mapa de Trabalho",
        "state": "impressaodomapadetrabalho",
        "stateN": "00001.00036",
        "stateComposto": "00001.00036"
      },
      {
        "PUS_IN_SEQUENCIA": 18,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00033",
        "MOD_ST_DESCRICAO": "Controle de Material Faltante e Novas Coletas",
        "state": "controledematerialfaltanteenovascoletas",
        "stateN": "00001.00033",
        "stateComposto": "00001.00033"
      },
      {
        "PUS_IN_SEQUENCIA": 19,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00080",
        "MOD_ST_DESCRICAO": "Consulta Laudos",
        "state": "consultalaudos",
        "stateN": "00001.00080",
        "stateComposto": "00001.00080"
      },
      {
        "PUS_IN_SEQUENCIA": 20,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00095",
        "MOD_ST_DESCRICAO": "Painel de Controle",
        "state": "paineldecontrole",
        "stateN": "00001.00095",
        "stateComposto": "00001.00095"
      },
      {
        "PUS_IN_SEQUENCIA": 21,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00096",
        "MOD_ST_DESCRICAO": "Painel de Controle por usuário",
        "state": "paineldecontroleporusuário",
        "stateN": "00001.00096",
        "stateComposto": "00001.00096"
      },
      {
        "PUS_IN_SEQUENCIA": 22,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00126",
        "MOD_ST_DESCRICAO": "Estatística Avançada",
        "state": "estatisticaavancada",
        "stateN": "00001.00126",
        "stateComposto": "00001.00126"
      },
      {
        "PUS_IN_SEQUENCIA": 23,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00106",
        "MOD_ST_DESCRICAO": "Painel de Controle Unidades",
        "state": "paineldecontroleunidades",
        "stateN": "00001.00106",
        "stateComposto": "00001.00106"
      },
      {
        "PUS_IN_SEQUENCIA": 24,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00154",
        "MOD_ST_DESCRICAO": "Produtividade Cadastro Por Hora",
        "state": "produtividadecadastroporhora",
        "stateN": "00001.00154",
        "stateComposto": "00001.00154"
      },
      {
        "PUS_IN_SEQUENCIA": 25,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00148",
        "MOD_ST_DESCRICAO": "Pesquisa Manual Exame",
        "state": "pesquisamanualexame",
        "stateN": "00001.00148",
        "stateComposto": "00001.00148"
      },
      {
        "PUS_IN_SEQUENCIA": 26,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00150",
        "MOD_ST_DESCRICAO": "Agendamento",
        "state": "agendamento",
        "stateN": "00001.00150",
        "stateComposto": "00001.00150"
      },
      {
        "PUS_IN_SEQUENCIA": 27,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00155",
        "MOD_ST_DESCRICAO": "Lotes para Triagem",
        "state": "lotesparatriagem",
        "stateN": "00001.00155",
        "stateComposto": "00001.00155"
      },
      {
        "PUS_IN_SEQUENCIA": 28,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00153",
        "MOD_ST_DESCRICAO": "Auditoria",
        "state": "auditoria",
        "stateN": "00001.00153",
        "stateComposto": "00001.00153"
      },
      {
        "PUS_IN_SEQUENCIA": 29,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00163",
        "MOD_ST_DESCRICAO": "Protocolar Amostras",
        "state": "protocolaramostras",
        "stateN": "00001.00163",
        "stateComposto": "00001.00163"
      },
      {
        "PUS_IN_SEQUENCIA": 30,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00162",
        "MOD_ST_DESCRICAO": "Monitoramentos de Carros",
        "state": "monitoramentosdecarros",
        "stateN": "00001.00162",
        "stateComposto": "00001.00162"
      },
      {
        "PUS_IN_SEQUENCIA": 31,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00160",
        "MOD_ST_DESCRICAO": "Liberação de Carros",
        "state": "liberacaodecarros",
        "stateN": "00001.00160",
        "stateComposto": "00001.00160"
      },
      {
        "PUS_IN_SEQUENCIA": 32,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00167",
        "MOD_ST_DESCRICAO": "Controle de Coleta",
        "state": "controledecoleta",
        "stateN": "00001.00167",
        "stateComposto": "00001.00167"
      },
      {
        "PUS_IN_SEQUENCIA": 33,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00169",
        "MOD_ST_DESCRICAO": "Gerenciamento de Imagem",
        "state": "gerenciamentodeimagem",
        "stateN": "00001.00169",
        "stateComposto": "00001.00169"
      },
      {
        "PUS_IN_SEQUENCIA": 34,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00178",
        "MOD_ST_DESCRICAO": "Gerenciamento Lote",
        "state": "gerenciamentolote",
        "stateN": "00001.00178",
        "stateComposto": "00001.00178"
      },
      {
        "PUS_IN_SEQUENCIA": 35,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00176",
        "MOD_ST_DESCRICAO": "Contador de Células",
        "state": "contadordecelulas",
        "stateN": "00001.00176",
        "stateComposto": "00001.00176"
      },
      {
        "PUS_IN_SEQUENCIA": 36,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00174",
        "MOD_ST_DESCRICAO": "Gera Requisição para Tomografia",
        "state": "gerarequisicaoparatomografia",
        "stateN": "00001.00174",
        "stateComposto": "00001.00174"
      },
      {
        "PUS_IN_SEQUENCIA": 37,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00002",
        "MOD_ST_DESCRICAO": "Agendamento de Exames",
        "state": "agendamentodeexames",
        "stateN": "00001.00002",
        "stateComposto": "00001.00002"
      },
      {
        "PUS_IN_SEQUENCIA": 38,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00039",
        "MOD_ST_DESCRICAO": "Emissão de Laudos",
        "state": "emissaodelaudos",
        "stateN": "00001.00039",
        "stateComposto": "00001.00039"
      },
      {
        "PUS_IN_SEQUENCIA": 39,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00051",
        "MOD_ST_DESCRICAO": "Estatistica Faturamento",
        "state": "estatisticafaturamento",
        "stateN": "00001.00051",
        "stateComposto": "00001.00051"
      },
      {
        "PUS_IN_SEQUENCIA": 40,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00063",
        "MOD_ST_DESCRICAO": "Gestão de Amostras",
        "state": "gestaodeamostras",
        "stateN": "00001.00063",
        "stateComposto": "00001.00063"
      },
      {
        "PUS_IN_SEQUENCIA": 41,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00075",
        "MOD_ST_DESCRICAO": "Conferência de Postos",
        "state": "conferenciadepostos",
        "stateN": "00001.00075",
        "stateComposto": "00001.00075"
      },
      {
        "PUS_IN_SEQUENCIA": 42,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00164",
        "MOD_ST_DESCRICAO": "Iniciar Rotina",
        "state": "iniciarrotina",
        "stateN": "00001.00164",
        "stateComposto": "00001.00164"
      },
      {
        "PUS_IN_SEQUENCIA": 43,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00171",
        "MOD_ST_DESCRICAO": "Soroteca Central",
        "state": "sorotecacentral",
        "stateN": "00001.00171",
        "stateComposto": "00001.00171"
      },
      {
        "PUS_IN_SEQUENCIA": 44,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00149",
        "MOD_ST_DESCRICAO": "Etiqueta Transporte",
        "state": "etiquetatransporte",
        "stateN": "00001.00149",
        "stateComposto": "00001.00149"
      },
      {
        "PUS_IN_SEQUENCIA": 45,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00157",
        "MOD_ST_DESCRICAO": "Atendimento",
        "state": "atendimento",
        "stateN": "00001.00157",
        "stateComposto": "00001.00157"
      },
      {
        "PUS_IN_SEQUENCIA": 46,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00021",
        "MOD_ST_DESCRICAO": "Feriado",
        "state": "feriado",
        "stateN": "00001.00021",
        "stateComposto": "00001.00021"
      },
      {
        "PUS_IN_SEQUENCIA": 47,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00117",
        "MOD_ST_DESCRICAO": "Orçamento de Exames",
        "state": "orcamentodeexames",
        "stateN": "00001.00117",
        "stateComposto": "00001.00117"
      },
      {
        "PUS_IN_SEQUENCIA": 48,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00029",
        "MOD_ST_DESCRICAO": "Questionário",
        "state": "questionário",
        "stateN": "00001.00029",
        "stateComposto": "00001.00029"
      },
      {
        "PUS_IN_SEQUENCIA": 49,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00179",
        "MOD_ST_DESCRICAO": "Bandejamento",
        "state": "bandejamento",
        "stateN": "00001.00179",
        "stateComposto": "00001.00179"
      },
      {
        "PUS_IN_SEQUENCIA": 50,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00180",
        "MOD_ST_DESCRICAO": "Relatorios de Tomografia",
        "state": "relatoriosdetomografia",
        "stateN": "00001.00180",
        "stateComposto": "00001.00180"
      },
      {
        "PUS_IN_SEQUENCIA": 51,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00181",
        "MOD_ST_DESCRICAO": "Comprovante de Entrega",
        "state": "comprovantedeentrega",
        "stateN": "00001.00181",
        "stateComposto": "00001.00181"
      },
      {
        "PUS_IN_SEQUENCIA": 52,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00182",
        "MOD_ST_DESCRICAO": "Container de Setores",
        "state": "containerdesetores",
        "stateN": "00001.00182",
        "stateComposto": "00001.00182"
      },
      {
        "PUS_IN_SEQUENCIA": 53,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00183",
        "MOD_ST_DESCRICAO": "Atraso de Resultados",
        "state": "atrasoderesultados",
        "stateN": "00001.00183",
        "stateComposto": "00001.00183"
      },
      {
        "PUS_IN_SEQUENCIA": 54,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00184",
        "MOD_ST_DESCRICAO": "Flyer",
        "state": "flyer",
        "stateN": "00001.00184",
        "stateComposto": "00001.00184"
      },
      {
        "PUS_IN_SEQUENCIA": 55,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00186",
        "MOD_ST_DESCRICAO": "Registro de Flyers",
        "state": "registrodeflyers",
        "stateN": "00001.00186",
        "stateComposto": "00001.00186"
      }
    ]
  },
  {
    "PUS_IN_SEQUENCIA": 56,
    "PUS_IN_SEQUENCIAPAI": 0,
    "MOD_ST_CODIGO": "00003",
    "MOD_ST_DESCRICAO": "Cadastros",
    "state": "cadastros",
    "stateN": "00003",
    "telas": [
      {
        "PUS_IN_SEQUENCIA": 58,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00196",
        "MOD_ST_DESCRICAO": "Planos",
        "state": "planos",
        "stateN": "00003.00196",
        "stateComposto": "00003.00196"
      },
      {
        "PUS_IN_SEQUENCIA": 59,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00195",
        "MOD_ST_DESCRICAO": "Tabela de equivalência",
        "state": "tabeladeequivalencia",
        "stateN": "00003.00195",
        "stateComposto": "00003.00195"
      },
      {
        "PUS_IN_SEQUENCIA": 60,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00194",
        "MOD_ST_DESCRICAO": "Laudo Padrão",
        "state": "laudopadrao",
        "stateN": "00003.00194",
        "stateComposto": "00003.00194"
      },
      {
        "PUS_IN_SEQUENCIA": 61,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00199",
        "MOD_ST_DESCRICAO": "Usuário x Convênio",
        "state": "usuárioxconvenio",
        "stateN": "00003.00199",
        "stateComposto": "00003.00199"
      },
      {
        "PUS_IN_SEQUENCIA": 62,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00064",
        "MOD_ST_DESCRICAO": "Exames Menu",
        "state": "examesmenu",
        "stateN": "00003.00064",
        "stateComposto": "00003.00064"
      },
      {
        "PUS_IN_SEQUENCIA": 63,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00097",
        "MOD_ST_DESCRICAO": "Mapa de Triagem",
        "state": "mapadetriagem",
        "stateN": "00003.00097",
        "stateComposto": "00003.00097"
      },
      {
        "PUS_IN_SEQUENCIA": 64,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00090",
        "MOD_ST_DESCRICAO": "Exame De Para",
        "state": "examedepara",
        "stateN": "00003.00090",
        "stateComposto": "00003.00090"
      },
      {
        "PUS_IN_SEQUENCIA": 65,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00013",
        "MOD_ST_DESCRICAO": "Material",
        "state": "material",
        "stateN": "00003.00013",
        "stateComposto": "00003.00013"
      },
      {
        "PUS_IN_SEQUENCIA": 66,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00017",
        "MOD_ST_DESCRICAO": "Bactérias Fungos e Vírus",
        "state": "bacteriasfungosevirus",
        "stateN": "00003.00017",
        "stateComposto": "00003.00017"
      },
      {
        "PUS_IN_SEQUENCIA": 67,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00022",
        "MOD_ST_DESCRICAO": "Frases para Laudo",
        "state": "frasesparalaudo",
        "stateN": "00003.00022",
        "stateComposto": "00003.00022"
      },
      {
        "PUS_IN_SEQUENCIA": 68,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00023",
        "MOD_ST_DESCRICAO": "Método",
        "state": "metodo",
        "stateN": "00003.00023",
        "stateComposto": "00003.00023"
      },
      {
        "PUS_IN_SEQUENCIA": 69,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00027",
        "MOD_ST_DESCRICAO": "Parasitas",
        "state": "parasitas",
        "stateN": "00003.00027",
        "stateComposto": "00003.00027"
      },
      {
        "PUS_IN_SEQUENCIA": 70,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00030",
        "MOD_ST_DESCRICAO": "Prazo",
        "state": "prazo",
        "stateN": "00003.00030",
        "stateComposto": "00003.00030"
      },
      {
        "PUS_IN_SEQUENCIA": 71,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00031",
        "MOD_ST_DESCRICAO": "Recipiente",
        "state": "recipiente",
        "stateN": "00003.00031",
        "stateComposto": "00003.00031"
      },
      {
        "PUS_IN_SEQUENCIA": 72,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00053",
        "MOD_ST_DESCRICAO": "Unidades de Medida",
        "state": "unidadesdemedida",
        "stateN": "00003.00053",
        "stateComposto": "00003.00053"
      },
      {
        "PUS_IN_SEQUENCIA": 73,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00055",
        "MOD_ST_DESCRICAO": "Sequência de Amostra",
        "state": "sequenciadeamostra",
        "stateN": "00003.00055",
        "stateComposto": "00003.00055"
      },
      {
        "PUS_IN_SEQUENCIA": 74,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00060",
        "MOD_ST_DESCRICAO": "Texto para Laudos",
        "state": "textoparalaudos",
        "stateN": "00003.00060",
        "stateComposto": "00003.00060"
      },
      {
        "PUS_IN_SEQUENCIA": 75,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00073",
        "MOD_ST_DESCRICAO": "Mapa Amostra",
        "state": "mapaamostra",
        "stateN": "00003.00073",
        "stateComposto": "00003.00073"
      },
      {
        "PUS_IN_SEQUENCIA": 76,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00011",
        "MOD_ST_DESCRICAO": "Formatação de Exames",
        "state": "formatacaodeexames",
        "stateN": "00003.00011",
        "stateComposto": "00003.00011"
      },
      {
        "PUS_IN_SEQUENCIA": 77,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00056",
        "MOD_ST_DESCRICAO": "Grupo de Exames",
        "state": "grupodeexames",
        "stateN": "00003.00056",
        "stateComposto": "00003.00056"
      },
      {
        "PUS_IN_SEQUENCIA": 78,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00098",
        "MOD_ST_DESCRICAO": "Grupo de Triagem",
        "state": "grupodetriagem",
        "stateN": "00003.00098",
        "stateComposto": "00003.00098"
      },
      {
        "PUS_IN_SEQUENCIA": 79,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00016",
        "MOD_ST_DESCRICAO": "Antibiótico",
        "state": "antibiótico",
        "stateN": "00003.00016",
        "stateComposto": "00003.00016"
      },
      {
        "PUS_IN_SEQUENCIA": 80,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00190",
        "MOD_ST_DESCRICAO": "Grupo de Antibióticos",
        "state": "grupodeantibióticos",
        "stateN": "00003.00190",
        "stateComposto": "00003.00190"
      },
      {
        "PUS_IN_SEQUENCIA": 81,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00054",
        "MOD_ST_DESCRICAO": "Mapa de Antibióticos",
        "state": "mapadeantibióticos",
        "stateN": "00003.00054",
        "stateComposto": "00003.00054"
      },
      {
        "PUS_IN_SEQUENCIA": 82,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00006",
        "MOD_ST_DESCRICAO": "Convênios",
        "state": "convenios",
        "stateN": "00003.00006",
        "stateComposto": "00003.00006"
      },
      {
        "PUS_IN_SEQUENCIA": 83,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00010",
        "MOD_ST_DESCRICAO": "Cadastro de Convênios",
        "state": "cadastrodeconvenios",
        "stateN": "00003.00010",
        "stateComposto": "00003.00010"
      },
      {
        "PUS_IN_SEQUENCIA": 84,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00103",
        "MOD_ST_DESCRICAO": "Convenio De/Para",
        "state": "conveniode/para",
        "stateN": "00003.00103",
        "stateComposto": "00003.00103"
      },
      {
        "PUS_IN_SEQUENCIA": 85,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00019",
        "MOD_ST_DESCRICAO": "Convenio Unidade",
        "state": "conveniounidade",
        "stateN": "00003.00019",
        "stateComposto": "00003.00019"
      },
      {
        "PUS_IN_SEQUENCIA": 86,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00042",
        "MOD_ST_DESCRICAO": "Tabela de Preços",
        "state": "tabeladeprecos",
        "stateN": "00003.00042",
        "stateComposto": "00003.00042"
      },
      {
        "PUS_IN_SEQUENCIA": 87,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00081",
        "MOD_ST_DESCRICAO": "Tabela de Preço Original",
        "state": "tabeladeprecooriginal",
        "stateN": "00003.00081",
        "stateComposto": "00003.00081"
      },
      {
        "PUS_IN_SEQUENCIA": 88,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00014",
        "MOD_ST_DESCRICAO": "Unidades",
        "state": "unidades",
        "stateN": "00003.00014",
        "stateComposto": "00003.00014"
      },
      {
        "PUS_IN_SEQUENCIA": 89,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00026",
        "MOD_ST_DESCRICAO": "Postos de Coleta",
        "state": "postosdecoleta",
        "stateN": "00003.00026",
        "stateComposto": "00003.00026"
      },
      {
        "PUS_IN_SEQUENCIA": 90,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00015",
        "MOD_ST_DESCRICAO": "Setores",
        "state": "setores",
        "stateN": "00003.00015",
        "stateComposto": "00003.00015"
      },
      {
        "PUS_IN_SEQUENCIA": 91,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00044",
        "MOD_ST_DESCRICAO": "Solicitantes",
        "state": "solicitantes",
        "stateN": "00003.00044",
        "stateComposto": "00003.00044"
      },
      {
        "PUS_IN_SEQUENCIA": 92,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00059",
        "MOD_ST_DESCRICAO": "Local de Entrega",
        "state": "localdeentrega",
        "stateN": "00003.00059",
        "stateComposto": "00003.00059"
      },
      {
        "PUS_IN_SEQUENCIA": 93,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00046",
        "MOD_ST_DESCRICAO": "Profissões",
        "state": "profissoes",
        "stateN": "00003.00046",
        "stateComposto": "00003.00046"
      },
      {
        "PUS_IN_SEQUENCIA": 94,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00052",
        "MOD_ST_DESCRICAO": "Mapa de Trabalho",
        "state": "mapadetrabalho",
        "stateN": "00003.00052",
        "stateComposto": "00003.00052"
      },
      {
        "PUS_IN_SEQUENCIA": 95,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00057",
        "MOD_ST_DESCRICAO": "Laboratório de Apoio",
        "state": "laboratóriodeapoio",
        "stateN": "00003.00057",
        "stateComposto": "00003.00057"
      },
      {
        "PUS_IN_SEQUENCIA": 96,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00058",
        "MOD_ST_DESCRICAO": "Coletores",
        "state": "coletores",
        "stateN": "00003.00058",
        "stateComposto": "00003.00058"
      },
      {
        "PUS_IN_SEQUENCIA": 97,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00018",
        "MOD_ST_DESCRICAO": "CID",
        "state": "cid",
        "stateN": "00003.00018",
        "stateComposto": "00003.00018"
      },
      {
        "PUS_IN_SEQUENCIA": 98,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00024",
        "MOD_ST_DESCRICAO": "Motivo",
        "state": "motivo",
        "stateN": "00003.00024",
        "stateComposto": "00003.00024"
      },
      {
        "PUS_IN_SEQUENCIA": 99,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00025",
        "MOD_ST_DESCRICAO": "Observação",
        "state": "observacao",
        "stateN": "00003.00025",
        "stateComposto": "00003.00025"
      },
      {
        "PUS_IN_SEQUENCIA": 100,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00028",
        "MOD_ST_DESCRICAO": "Status Amostras",
        "state": "statusamostras",
        "stateN": "00003.00028",
        "stateComposto": "00003.00028"
      },
      {
        "PUS_IN_SEQUENCIA": 101,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00088",
        "MOD_ST_DESCRICAO": "Grupo",
        "state": "grupo",
        "stateN": "00003.00088",
        "stateComposto": "00003.00088"
      },
      {
        "PUS_IN_SEQUENCIA": 102,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00101",
        "MOD_ST_DESCRICAO": "Local De/Para",
        "state": "localde/para",
        "stateN": "00003.00101",
        "stateComposto": "00003.00101"
      },
      {
        "PUS_IN_SEQUENCIA": 103,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00038",
        "MOD_ST_DESCRICAO": "Usuários",
        "state": "usuários",
        "stateN": "00003.00038",
        "stateComposto": "00003.00038"
      },
      {
        "PUS_IN_SEQUENCIA": 104,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00113",
        "MOD_ST_DESCRICAO": "Perfil de Usuários",
        "state": "perfildeusuários",
        "stateN": "00003.00113",
        "stateComposto": "00003.00113"
      },
      {
        "PUS_IN_SEQUENCIA": 105,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00131",
        "MOD_ST_DESCRICAO": "Exame De Para Retorno",
        "state": "examedepararetorno",
        "stateN": "00003.00131",
        "stateComposto": "00003.00131"
      },
      {
        "PUS_IN_SEQUENCIA": 106,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00133",
        "MOD_ST_DESCRICAO": "Material De/Para",
        "state": "materialde/para",
        "stateN": "00003.00133",
        "stateComposto": "00003.00133"
      },
      {
        "PUS_IN_SEQUENCIA": 107,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00134",
        "MOD_ST_DESCRICAO": "Recipiente De/Para",
        "state": "recipientede/para",
        "stateN": "00003.00134",
        "stateComposto": "00003.00134"
      },
      {
        "PUS_IN_SEQUENCIA": 108,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00135",
        "MOD_ST_DESCRICAO": "Câmara Fria",
        "state": "câmarafria",
        "stateN": "00003.00135",
        "stateComposto": "00003.00135"
      },
      {
        "PUS_IN_SEQUENCIA": 109,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00138",
        "MOD_ST_DESCRICAO": "Material de Coleta (DASA)",
        "state": "materialdecoleta(dasa)",
        "stateN": "00003.00138",
        "stateComposto": "00003.00138"
      },
      {
        "PUS_IN_SEQUENCIA": 110,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00139",
        "MOD_ST_DESCRICAO": "Recipiente de Coleta (DASA)",
        "state": "recipientedecoleta(dasa)",
        "stateN": "00003.00139",
        "stateComposto": "00003.00139"
      },
      {
        "PUS_IN_SEQUENCIA": 111,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00140",
        "MOD_ST_DESCRICAO": "Sementes",
        "state": "sementes",
        "stateN": "00003.00140",
        "stateComposto": "00003.00140"
      },
      {
        "PUS_IN_SEQUENCIA": 112,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00020",
        "MOD_ST_DESCRICAO": "Cor",
        "state": "cor",
        "stateN": "00003.00020",
        "stateComposto": "00003.00020"
      },
      {
        "PUS_IN_SEQUENCIA": 113,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00151",
        "MOD_ST_DESCRICAO": "Configurar Agenda",
        "state": "configuraragenda",
        "stateN": "00003.00151",
        "stateComposto": "00003.00151"
      },
      {
        "PUS_IN_SEQUENCIA": 114,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00152",
        "MOD_ST_DESCRICAO": "Locais de Agendamento",
        "state": "locaisdeagendamento",
        "stateN": "00003.00152",
        "stateComposto": "00003.00152"
      },
      {
        "PUS_IN_SEQUENCIA": 115,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00156",
        "MOD_ST_DESCRICAO": "Gerenciar Agendas",
        "state": "gerenciaragendas",
        "stateN": "00003.00156",
        "stateComposto": "00003.00156"
      },
      {
        "PUS_IN_SEQUENCIA": 116,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00159",
        "MOD_ST_DESCRICAO": "Cadastro de Carros",
        "state": "cadastrodecarros",
        "stateN": "00003.00159",
        "stateComposto": "00003.00159"
      },
      {
        "PUS_IN_SEQUENCIA": 117,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00161",
        "MOD_ST_DESCRICAO": "Procedimento de Coleta",
        "state": "procedimentodecoleta",
        "stateN": "00003.00161",
        "stateComposto": "00003.00161"
      },
      {
        "PUS_IN_SEQUENCIA": 118,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00173",
        "MOD_ST_DESCRICAO": "Configuração do Pianinho",
        "state": "configuracaodopianinho",
        "stateN": "00003.00173",
        "stateComposto": "00003.00173"
      },
      {
        "PUS_IN_SEQUENCIA": 119,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00108",
        "MOD_ST_DESCRICAO": "Usuário por posto",
        "state": "usuárioporposto",
        "stateN": "00003.00108",
        "stateComposto": "00003.00108"
      },
      {
        "PUS_IN_SEQUENCIA": 120,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00185",
        "MOD_ST_DESCRICAO": "Cadastros para Soroteca",
        "state": "cadastrosparasoroteca",
        "stateN": "00003.00185",
        "stateComposto": "00003.00185"
      },
      {
        "PUS_IN_SEQUENCIA": 121,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00187",
        "MOD_ST_DESCRICAO": "Cadastro de Sistemas",
        "state": "cadastrodesistemas",
        "stateN": "00003.00187",
        "stateComposto": "00003.00187"
      },
      {
        "PUS_IN_SEQUENCIA": 122,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00188",
        "MOD_ST_DESCRICAO": "Flyer De Para",
        "state": "flyerdepara",
        "stateN": "00003.00188",
        "stateComposto": "00003.00188"
      }
    ]
  },
  {
    "PUS_IN_SEQUENCIA": 123,
    "PUS_IN_SEQUENCIAPAI": 0,
    "MOD_ST_CODIGO": "00007",
    "MOD_ST_DESCRICAO": "Estatísticas",
    "state": "estatísticas",
    "stateN": "00007",
    "telas": [
      {
        "PUS_IN_SEQUENCIA": 124,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00128",
        "MOD_ST_DESCRICAO": "Estatísticas Faturamento",
        "state": "estatisticasfaturamento",
        "stateN": "00007.00128",
        "stateComposto": "00007.00128"
      },
      {
        "PUS_IN_SEQUENCIA": 125,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00062",
        "MOD_ST_DESCRICAO": "Estatística Geral",
        "state": "estatisticageral",
        "stateN": "00007.00062",
        "stateComposto": "00007.00062"
      },
      {
        "PUS_IN_SEQUENCIA": 126,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00082",
        "MOD_ST_DESCRICAO": "Estatística por Unidade/Posto/Exames",
        "state": "estatisticaporunidade/posto/exames",
        "stateN": "00007.00082",
        "stateComposto": "00007.00082"
      },
      {
        "PUS_IN_SEQUENCIA": 127,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00070",
        "MOD_ST_DESCRICAO": "Estatística por Convênios",
        "state": "estatisticaporconvenios",
        "stateN": "00007.00070",
        "stateComposto": "00007.00070"
      },
      {
        "PUS_IN_SEQUENCIA": 128,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00078",
        "MOD_ST_DESCRICAO": "Estatística por Requisição",
        "state": "estatisticaporrequisicao",
        "stateN": "00007.00078",
        "stateComposto": "00007.00078"
      },
      {
        "PUS_IN_SEQUENCIA": 129,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00071",
        "MOD_ST_DESCRICAO": "Estatística por Convênio/Unidade",
        "state": "estatisticaporconvenio/unidade",
        "stateN": "00007.00071",
        "stateComposto": "00007.00071"
      },
      {
        "PUS_IN_SEQUENCIA": 130,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00100",
        "MOD_ST_DESCRICAO": "Estatística por Unidade/Posto/Cod.AMB SUS",
        "state": "estatisticaporunidade/posto/cod.ambsus",
        "stateN": "00007.00100",
        "stateComposto": "00007.00100"
      },
      {
        "PUS_IN_SEQUENCIA": 131,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00083",
        "MOD_ST_DESCRICAO": "Estatística por Unidade/Posto/Setor",
        "state": "estatisticaporunidade/posto/setor",
        "stateN": "00007.00083",
        "stateComposto": "00007.00083"
      },
      {
        "PUS_IN_SEQUENCIA": 132,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00065",
        "MOD_ST_DESCRICAO": "Estatística por Unidade (Quota Exames/Regra Escalonamento)",
        "state": "estatisticaporunidade(quotaexames/regraescalonamento)",
        "stateN": "00007.00065",
        "stateComposto": "00007.00065"
      },
      {
        "PUS_IN_SEQUENCIA": 133,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00066",
        "MOD_ST_DESCRICAO": "Estatística por Unidade/Postos",
        "state": "estatisticaporunidade/postos",
        "stateN": "00007.00066",
        "stateComposto": "00007.00066"
      },
      {
        "PUS_IN_SEQUENCIA": 134,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00079",
        "MOD_ST_DESCRICAO": "Estatística por Unidade/Postos/Data",
        "state": "estatisticaporunidade/postos/data",
        "stateN": "00007.00079",
        "stateComposto": "00007.00079"
      },
      {
        "PUS_IN_SEQUENCIA": 135,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00089",
        "MOD_ST_DESCRICAO": "Estatística por Unidade/Posto/Grupo",
        "state": "estatisticaporunidade/posto/grupo",
        "stateN": "00007.00089",
        "stateComposto": "00007.00089"
      },
      {
        "PUS_IN_SEQUENCIA": 136,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00121",
        "MOD_ST_DESCRICAO": "Estatística por Unidade/Postos/Sexo",
        "state": "estatisticaporunidade/postos/sexo",
        "stateN": "00007.00121",
        "stateComposto": "00007.00121"
      },
      {
        "PUS_IN_SEQUENCIA": 137,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00067",
        "MOD_ST_DESCRICAO": "Estatística por Unidade/Convênios",
        "state": "estatisticaporunidade/convenios",
        "stateN": "00007.00067",
        "stateComposto": "00007.00067"
      },
      {
        "PUS_IN_SEQUENCIA": 138,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00069",
        "MOD_ST_DESCRICAO": "Estatística por Unidade/Postos/Convênios",
        "state": "estatisticaporunidade/postos/convenios",
        "stateN": "00007.00069",
        "stateComposto": "00007.00069"
      },
      {
        "PUS_IN_SEQUENCIA": 139,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00102",
        "MOD_ST_DESCRICAO": "Estatística por Unidade/Regra",
        "state": "estatisticaporunidade/regra",
        "stateN": "00007.00102",
        "stateComposto": "00007.00102"
      },
      {
        "PUS_IN_SEQUENCIA": 140,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00084",
        "MOD_ST_DESCRICAO": "Estatística por Unidade/Setor",
        "state": "estatisticaporunidade/setor",
        "stateN": "00007.00084",
        "stateComposto": "00007.00084"
      },
      {
        "PUS_IN_SEQUENCIA": 141,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00068",
        "MOD_ST_DESCRICAO": "Estatística por Unidade/Convênios Tab.Preço",
        "state": "estatisticaporunidade/conveniostab.preco",
        "stateN": "00007.00068",
        "stateComposto": "00007.00068"
      },
      {
        "PUS_IN_SEQUENCIA": 142,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00093",
        "MOD_ST_DESCRICAO": "Estatística por Prontuário",
        "state": "estatisticaporprontuário",
        "stateN": "00007.00093",
        "stateComposto": "00007.00093"
      },
      {
        "PUS_IN_SEQUENCIA": 143,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00104",
        "MOD_ST_DESCRICAO": "Estatística por Unidade/Posto/Regra",
        "state": "estatisticaporunidade/posto/regra",
        "stateN": "00007.00104",
        "stateComposto": "00007.00104"
      },
      {
        "PUS_IN_SEQUENCIA": 144,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00105",
        "MOD_ST_DESCRICAO": "Estatística por Unidade / Local Entrega",
        "state": "estatisticaporunidade/localentrega",
        "stateN": "00007.00105",
        "stateComposto": "00007.00105"
      },
      {
        "PUS_IN_SEQUENCIA": 145,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00086",
        "MOD_ST_DESCRICAO": "Estatística por Unidade Execução/Setor",
        "state": "estatisticaporunidadeexecucao/setor",
        "stateN": "00007.00086",
        "stateComposto": "00007.00086"
      },
      {
        "PUS_IN_SEQUENCIA": 146,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00099",
        "MOD_ST_DESCRICAO": "Estatística de Quantidade de Pacientes por Unidade/Posto",
        "state": "estatisticadequantidadedepacientesporunidade/posto",
        "stateN": "00007.00099",
        "stateComposto": "00007.00099"
      },
      {
        "PUS_IN_SEQUENCIA": 147,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00168",
        "MOD_ST_DESCRICAO": "Estatística de Exames Unidade Posto CRM Qt.Exames",
        "state": "estatisticadeexamesunidadepostocrmqt.exames",
        "stateN": "00007.00168",
        "stateComposto": "00007.00168"
      },
      {
        "PUS_IN_SEQUENCIA": 148,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00120",
        "MOD_ST_DESCRICAO": "Estatística de Exames por Unidade/Postos/Solicitantes",
        "state": "estatisticadeexamesporunidade/postos/solicitantes",
        "stateN": "00007.00120",
        "stateComposto": "00007.00120"
      },
      {
        "PUS_IN_SEQUENCIA": 149,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00129",
        "MOD_ST_DESCRICAO": "Estatísticas Técnica",
        "state": "estatisticastecnica",
        "stateN": "00007.00129",
        "stateComposto": "00007.00129"
      },
      {
        "PUS_IN_SEQUENCIA": 150,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00110",
        "MOD_ST_DESCRICAO": "Estatística de Exames Alterados por Unidade/Posto Detalhado",
        "state": "estatisticadeexamesalteradosporunidade/postodetalhado",
        "stateN": "00007.00110",
        "stateComposto": "00007.00110"
      },
      {
        "PUS_IN_SEQUENCIA": 151,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00115",
        "MOD_ST_DESCRICAO": "Estatística de Quantidade de Tubos por Unidade/Posto",
        "state": "estatisticadequantidadedetubosporunidade/posto",
        "stateN": "00007.00115",
        "stateComposto": "00007.00115"
      },
      {
        "PUS_IN_SEQUENCIA": 152,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00111",
        "MOD_ST_DESCRICAO": "Estatística de Produção de Exames por Unidade/Postos",
        "state": "estatisticadeproducaodeexamesporunidade/postos",
        "stateN": "00007.00111",
        "stateComposto": "00007.00111"
      },
      {
        "PUS_IN_SEQUENCIA": 153,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00137",
        "MOD_ST_DESCRICAO": "Relatório Específico Projetos Especiais",
        "state": "relatórioespecificoprojetosespeciais",
        "stateN": "00007.00137",
        "stateComposto": "00007.00137"
      },
      {
        "PUS_IN_SEQUENCIA": 154,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00124",
        "MOD_ST_DESCRICAO": "Estatística de Exames Nova Coleta",
        "state": "estatisticadeexamesnovacoleta",
        "stateN": "00007.00124",
        "stateComposto": "00007.00124"
      },
      {
        "PUS_IN_SEQUENCIA": 155,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00130",
        "MOD_ST_DESCRICAO": "Estatística de Exames Alterados por Unidade/Posto",
        "state": "estatisticadeexamesalteradosporunidade/posto",
        "stateN": "00007.00130",
        "stateComposto": "00007.00130"
      },
      {
        "PUS_IN_SEQUENCIA": 156,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00142",
        "MOD_ST_DESCRICAO": "Estatística de Exames Nova Coleta por Coletor",
        "state": "estatisticadeexamesnovacoletaporcoletor",
        "stateN": "00007.00142",
        "stateComposto": "00007.00142"
      },
      {
        "PUS_IN_SEQUENCIA": 157,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00158",
        "MOD_ST_DESCRICAO": "Estatistica de Remarcacoes",
        "state": "estatisticaderemarcacoes",
        "stateN": "00007.00158",
        "stateComposto": "00007.00158"
      },
      {
        "PUS_IN_SEQUENCIA": 158,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00109",
        "MOD_ST_DESCRICAO": "Estatística de Quant.Pacientes/Exames por Unidade/Posto/Data",
        "state": "estatisticadequant.pacientes/examesporunidade/posto/data",
        "stateN": "00007.00109",
        "stateComposto": "00007.00109"
      },
      {
        "PUS_IN_SEQUENCIA": 159,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00122",
        "MOD_ST_DESCRICAO": "Estatística de Tempo por Unidade/Posto/Paciente/Setor/Local",
        "state": "estatisticadetempoporunidade/posto/paciente/setor/local",
        "stateN": "00007.00122",
        "stateComposto": "00007.00122"
      },
      {
        "PUS_IN_SEQUENCIA": 160,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00118",
        "MOD_ST_DESCRICAO": "Estatística de Exames por Local de Coleta Semanal",
        "state": "estatisticadeexamesporlocaldecoletasemanal",
        "stateN": "00007.00118",
        "stateComposto": "00007.00118"
      },
      {
        "PUS_IN_SEQUENCIA": 161,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00116",
        "MOD_ST_DESCRICAO": "Estatística de Quantidade de Tubos por Unidade",
        "state": "estatisticadequantidadedetubosporunidade",
        "stateN": "00007.00116",
        "stateComposto": "00007.00116"
      },
      {
        "PUS_IN_SEQUENCIA": 162,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00085",
        "MOD_ST_DESCRICAO": "Estatística por Unidade Execução",
        "state": "estatisticaporunidadeexecucao",
        "stateN": "00007.00085",
        "stateComposto": "00007.00085"
      },
      {
        "PUS_IN_SEQUENCIA": 163,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00123",
        "MOD_ST_DESCRICAO": "Estatística de Pacientes por Faixa Etária",
        "state": "estatisticadepacientesporfaixaetária",
        "stateN": "00007.00123",
        "stateComposto": "00007.00123"
      },
      {
        "PUS_IN_SEQUENCIA": 164,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00125",
        "MOD_ST_DESCRICAO": "Estatística de Exames Unidade/Posto/Dia",
        "state": "estatisticadeexamesunidade/posto/dia",
        "stateN": "00007.00125",
        "stateComposto": "00007.00125"
      },
      {
        "PUS_IN_SEQUENCIA": 165,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00112",
        "MOD_ST_DESCRICAO": "Estatística de Produção de Exames por Unidade",
        "state": "estatisticadeproducaodeexamesporunidade",
        "stateN": "00007.00112",
        "stateComposto": "00007.00112"
      },
      {
        "PUS_IN_SEQUENCIA": 166,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00141",
        "MOD_ST_DESCRICAO": "Relatório Específico Projeto Doenças Notificação Compulsória",
        "state": "relatórioespecificoprojetodoencasnotificacaocompulsória",
        "stateN": "00007.00141",
        "stateComposto": "00007.00141"
      },
      {
        "PUS_IN_SEQUENCIA": 167,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00146",
        "MOD_ST_DESCRICAO": "Estatística de Produtividade por Usuário Etapas",
        "state": "estatisticadeprodutividadeporusuárioetapas",
        "stateN": "00007.00146",
        "stateComposto": "00007.00146"
      },
      {
        "PUS_IN_SEQUENCIA": 168,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00166",
        "MOD_ST_DESCRICAO": "Estatística de Exames Unidade Posto Quant.Paciente Qt.Exames",
        "state": "estatisticadeexamesunidadepostoquant.pacienteqt.exames",
        "stateN": "00007.00166",
        "stateComposto": "00007.00166"
      },
      {
        "PUS_IN_SEQUENCIA": 169,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00175",
        "MOD_ST_DESCRICAO": "Estatística Tomografia Laudos/Revisão por Usuário",
        "state": "estatisticatomografialaudos/revisaoporusuário",
        "stateN": "00007.00175",
        "stateComposto": "00007.00175"
      },
      {
        "PUS_IN_SEQUENCIA": 170,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00170",
        "MOD_ST_DESCRICAO": "Estatística Qt.Tubos, Pacientes,Exames por Unidade,Setor",
        "state": "estatisticaqt.tubos,pacientes,examesporunidade,setor",
        "stateN": "00007.00170",
        "stateComposto": "00007.00170"
      },
      {
        "PUS_IN_SEQUENCIA": 171,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00119",
        "MOD_ST_DESCRICAO": "Estatística de Produtividade",
        "state": "estatisticadeprodutividade",
        "stateN": "00007.00119",
        "stateComposto": "00007.00119"
      }
    ]
  },
  {
    "PUS_IN_SEQUENCIA": 172,
    "PUS_IN_SEQUENCIAPAI": 0,
    "MOD_ST_CODIGO": "00005",
    "MOD_ST_DESCRICAO": "Faturamento",
    "state": "faturamento",
    "stateN": "00005",
    "telas": [
      {
        "PUS_IN_SEQUENCIA": 177,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00114",
        "MOD_ST_DESCRICAO": "Estatística de Pendências",
        "state": "estatisticadependencias",
        "stateN": "00005.00114",
        "stateComposto": "00005.00114"
      },
      {
        "PUS_IN_SEQUENCIA": 178,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00045",
        "MOD_ST_DESCRICAO": "Pendências de Faturamento",
        "state": "pendenciasdefaturamento",
        "stateN": "00005.00045",
        "stateComposto": "00005.00045"
      },
      {
        "PUS_IN_SEQUENCIA": 179,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00040",
        "MOD_ST_DESCRICAO": "Emissão da Fatura",
        "state": "emissaodafatura",
        "stateN": "00005.00040",
        "stateComposto": "00005.00040"
      },
      {
        "PUS_IN_SEQUENCIA": 180,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00092",
        "MOD_ST_DESCRICAO": "Conferência de Requisições por Prontuário",
        "state": "conferenciaderequisicoesporprontuário",
        "stateN": "00005.00092",
        "stateComposto": "00005.00092"
      },
      {
        "PUS_IN_SEQUENCIA": 181,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00032",
        "MOD_ST_DESCRICAO": "Conferência de Requisições",
        "state": "conferenciaderequisicoes",
        "stateN": "00005.00032",
        "stateComposto": "00005.00032"
      },
      {
        "PUS_IN_SEQUENCIA": 183,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00107",
        "MOD_ST_DESCRICAO": "Consulta de Lotes",
        "state": "consultadelotes",
        "stateN": "00005.00107",
        "stateComposto": "00005.00107"
      },
      {
        "PUS_IN_SEQUENCIA": 184,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00094",
        "MOD_ST_DESCRICAO": "Calcula Exames Sem Preço",
        "state": "calculaexamessempreco",
        "stateN": "00005.00094",
        "stateComposto": "00005.00094"
      },
      {
        "PUS_IN_SEQUENCIA": 185,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00077",
        "MOD_ST_DESCRICAO": "Relatório de Exames Sem Preço",
        "state": "relatóriodeexamessempreco",
        "stateN": "00005.00077",
        "stateComposto": "00005.00077"
      },
      {
        "PUS_IN_SEQUENCIA": 186,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00144",
        "MOD_ST_DESCRICAO": "Controle de Faturamento Externo",
        "state": "controledefaturamentoexterno",
        "stateN": "00005.00144",
        "stateComposto": "00005.00144"
      },
      {
        "PUS_IN_SEQUENCIA": 187,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00177",
        "MOD_ST_DESCRICAO": "Relatorio de Fechamento de Caixa",
        "state": "relatoriodefechamentodecaixa",
        "stateN": "00005.00177",
        "stateComposto": "00005.00177"
      }
    ]
  },
  {
    "PUS_IN_SEQUENCIA": 188,
    "PUS_IN_SEQUENCIAPAI": 0,
    "MOD_ST_CODIGO": "00008",
    "MOD_ST_DESCRICAO": "Ferramentas",
    "state": "ferramentas",
    "stateN": "00008",
    "telas": [
      {
        "PUS_IN_SEQUENCIA": 189,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00172",
        "MOD_ST_DESCRICAO": "Executar Pesquisa no Banco de Dados",
        "state": "executarpesquisanobancodedados",
        "stateN": "00008.00172",
        "stateComposto": "00008.00172"
      },
      {
        "PUS_IN_SEQUENCIA": 190,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00076",
        "MOD_ST_DESCRICAO": "Executa Script",
        "state": "executascript",
        "stateN": "00008.00076",
        "stateComposto": "00008.00076"
      },
      {
        "PUS_IN_SEQUENCIA": 191,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00147",
        "MOD_ST_DESCRICAO": "Integração com a Central de Relacionamento",
        "state": "integracaocomacentralderelacionamento",
        "stateN": "00008.00147",
        "stateComposto": "00008.00147"
      },
      {
        "PUS_IN_SEQUENCIA": 192,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00145",
        "MOD_ST_DESCRICAO": "Exportação de Arquivo",
        "state": "exportacaodearquivo",
        "stateN": "00008.00145",
        "stateComposto": "00008.00145"
      },
      {
        "PUS_IN_SEQUENCIA": 193,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00136",
        "MOD_ST_DESCRICAO": "Integração do Faturamento com EMS",
        "state": "integracaodofaturamentocomems",
        "stateN": "00008.00136",
        "stateComposto": "00008.00136"
      }
    ]
  },
  {
    "PUS_IN_SEQUENCIA": 194,
    "PUS_IN_SEQUENCIAPAI": 0,
    "MOD_ST_CODIGO": "00047",
    "MOD_ST_DESCRICAO": "Ajuda",
    "state": "ajuda",
    "stateN": "00047",
    "telas": [
      {
        "PUS_IN_SEQUENCIA": 195,
        "PUS_IN_SEQUENCIAPAI": 1,
        "MOD_ST_CODIGO": "00049",
        "MOD_ST_DESCRICAO": "Sobre",
        "state": "sobre",
        "stateN": "00047.00049",
        "stateComposto": "00047.00049"
      },
      {
        "PUS_IN_SEQUENCIA": 196,
        "PUS_IN_SEQUENCIAPAI": 2,
        "MOD_ST_CODIGO": "00191",
        "MOD_ST_DESCRICAO": "Configurações de Tabelas",
        "state": "configuracoesdetabelas",
        "stateN": "00047.00191",
        "stateComposto": "00047.00191"
      }
    ]
  }
];
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
            ,resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                                        },
                                        {
                                            name: 'oitozero.ngSweetAlert',
                                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                                        },
                                        {
                                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                                        }
                                    ]);
                                }
                            }
        });
        
        for (var i = 0; i < menuJson.length; i++) {
        var _pai = menuJson[i];
        $stateProvider
                .state(_pai.stateN, {
                    abstract: true,
                    url: "/" + _pai.state,
                    templateUrl: "views/common/content.html"
                });
                if(_pai.telas){
                    for(var x = 0; x < _pai.telas.length ; x ++){
                        var _filho = _pai.telas[x];
                                $stateProvider.state(_filho.stateN, {
                            url: "/"+_filho.state,
                            templateUrl: "views/under_construction.html",
                            parent:_pai.stateN,
                            data: { pageTitle: '404'}
                        });
                    }
                }
    }
        
//        .state('00001', {
//            abstract: true,
//            url: "/00001",
//            templateUrl: "views/common/content.html"
//        })
//        .state('00001.00227', {
//            url: "/00193",
//            templateUrl: "views/form_basic.html",
//            parent: "00001",
//            data: { pageTitle: '404', specialClass: 'gray-bg' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('00001.00223', {
//            url: "/00223",
//            templateUrl: "views/form_basic.html",
//            parent: "00001",
//            data: { pageTitle: '404', specialClass: 'gray-bg' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                        }
//                    ]);
//                }
//            }
//        });
        
//        .state('dashboards', {
//            abstract: true,
//            url: "/dashboards",
//            templateUrl: "views/common/content.html",
//        })
//        .state('dashboards.dashboard_1', {
//            url: "/dashboard_1",
//            templateUrl: "views/dashboard_1.html",
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        },
//                        {
//                            name: 'angles',
//                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
//                        },
//                        {
//                            name: 'angular-peity',
//                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
//                        },
//                            {
//                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
//                            },
//                            {
//                                name: 'oitozero.ngSweetAlert',
//                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
//                            }
//                    ]);
//                }
//            }
//        })
//        .state('dashboards.dashboard_2', {
//            url: "/dashboard_2",
//            templateUrl: "views/dashboard_2.html",
//            data: { pageTitle: 'Dashboard 2' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        },
//                        {
//                            serie: true,
//                            files: ['js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js', 'js/plugins/jvectormap/jquery-jvectormap-2.0.2.css']
//                        },
//                        {
//                            serie: true,
//                            files: ['js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js']
//                        },
//                        {
//                            name: 'ui.checkbox',
//                            files: ['js/bootstrap/angular-bootstrap-checkbox.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('dashboards.dashboard_3', {
//            url: "/dashboard_3",
//            templateUrl: "views/dashboard_3.html",
//            data: { pageTitle: 'Dashboard 3' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'angles',
//                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
//                        },
//                        {
//                            name: 'angular-peity',
//                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
//                        },
//                        {
//                            name: 'ui.checkbox',
//                            files: ['js/bootstrap/angular-bootstrap-checkbox.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('dashboards_top', {
//            abstract: true,
//            url: "/dashboards_top",
//            templateUrl: "views/common/content_top_navigation.html",
//        })
//        .state('dashboards_top.dashboard_4', {
//            url: "/dashboard_4",
//            templateUrl: "views/dashboard_4.html",
//            data: { pageTitle: 'Dashboard 4' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'angles',
//                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
//                        },
//                        {
//                            name: 'angular-peity',
//                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
//                        },
//                        {
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('dashboards.dashboard_4_1', {
//            url: "/dashboard_4_1",
//            templateUrl: "views/dashboard_4_1.html",
//            data: { pageTitle: 'Dashboard 4' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'angles',
//                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
//                        },
//                        {
//                            name: 'angular-peity',
//                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
//                        },
//                        {
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('dashboards.dashboard_5', {
//            url: "/dashboard_5",
//            templateUrl: "views/dashboard_5.html",
//            data: { pageTitle: 'Dashboard 5' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        },
//                        {
//                            files: ['js/plugins/sparkline/jquery.sparkline.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        
//        .state('layouts', {
//            url: "/layouts",
//            templateUrl: "views/layouts.html",
//            data: { pageTitle: 'Layouts' },
//        })
//        .state('charts', {
//            abstract: true,
//            url: "/charts",
//            templateUrl: "views/common/content.html",
//        })
//        .state('charts.flot_chart', {
//            url: "/flot_chart",
//            templateUrl: "views/graph_flot.html",
//            data: { pageTitle: 'Flot chart' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('charts.rickshaw_chart', {
//            url: "/rickshaw_chart",
//            templateUrl: "views/graph_rickshaw.html",
//            data: { pageTitle: 'Rickshaw chart' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            reconfig: true,
//                            serie: true,
//                            files: ['js/plugins/rickshaw/vendor/d3.v3.js','js/plugins/rickshaw/rickshaw.min.js']
//                        },
//                        {
//                            reconfig: true,
//                            name: 'angular-rickshaw',
//                            files: ['js/plugins/rickshaw/angular-rickshaw.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('charts.peity_chart', {
//            url: "/peity_chart",
//            templateUrl: "views/graph_peity.html",
//            data: { pageTitle: 'Peity graphs' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'angular-peity',
//                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('charts.sparkline_chart', {
//            url: "/sparkline_chart",
//            templateUrl: "views/graph_sparkline.html",
//            data: { pageTitle: 'Sparkline chart' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/sparkline/jquery.sparkline.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('charts.chartjs_chart', {
//            url: "/chartjs_chart",
//            templateUrl: "views/chartjs.html",
//            data: { pageTitle: 'Chart.js' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/chartJs/Chart.min.js']
//                        },
//                        {
//                            name: 'angles',
//                            files: ['js/plugins/chartJs/angles.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('charts.chartist_chart', {
//            url: "/chartist_chart",
//            templateUrl: "views/chartist.html",
//            data: { pageTitle: 'Chartist' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            name: 'angular-chartist',
//                            files: ['js/plugins/chartist/chartist.min.js', 'css/plugins/chartist/chartist.min.css', 'js/plugins/chartist/angular-chartist.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('charts.c3charts', {
//            url: "/c3charts",
//            templateUrl: "views/c3charts.html",
//            data: { pageTitle: 'c3charts' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            files: ['css/plugins/c3/c3.min.css', 'js/plugins/d3/d3.min.js', 'js/plugins/c3/c3.min.js']
//                        },
//                        {
//                            serie: true,
//                            name: 'gridshore.c3js.chart',
//                            files: ['js/plugins/c3/c3-angular.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('mailbox', {
//            abstract: true,
//            url: "/mailbox",
//            templateUrl: "views/common/content.html",
//        })
//        .state('mailbox.inbox', {
//            url: "/inbox",
//            templateUrl: "views/mailbox.html",
//            data: { pageTitle: 'Mail Inbox' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('mailbox.email_view', {
//            url: "/email_view",
//            templateUrl: "views/mail_detail.html",
//            data: { pageTitle: 'Mail detail' }
//        })
//        .state('mailbox.email_compose', {
//            url: "/email_compose",
//            templateUrl: "views/mail_compose.html",
//            data: { pageTitle: 'Mail compose' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js']
//                        },
//                        {
//                            name: 'summernote',
//                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js','js/plugins/summernote/angular-summernote.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('mailbox.email_template', {
//            url: "/email_template",
//            templateUrl: "views/email_template.html",
//            data: { pageTitle: 'Mail compose' }
//        })
//        .state('widgets', {
//            url: "/widgets",
//            templateUrl: "views/widgets.html",
//            data: { pageTitle: 'Widhets' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            name: 'angular-flot',
//                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
//                        },
//                        {
//                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                        },
//                        {
//                            serie: true,
//                            files: ['js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js', 'js/plugins/jvectormap/jquery-jvectormap-2.0.2.css']
//                        },
//                        {
//                            serie: true,
//                            files: ['js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js']
//                        },
//                        {
//                            name: 'ui.checkbox',
//                            files: ['js/bootstrap/angular-bootstrap-checkbox.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('metrics', {
//            url: "/metrics",
//            templateUrl: "views/metrics.html",
//            data: { pageTitle: 'Metrics' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/sparkline/jquery.sparkline.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('forms', {
//            abstract: true,
//            url: "/forms",
//            templateUrl: "views/common/content.html",
//        })
//        .state('forms.basic_form', {
//            url: "/basic_form",
//            templateUrl: "views/form_basic.html",
//            data: { pageTitle: 'Basic form' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('forms.advanced_plugins', {
//            url: "/advanced_plugins",
//            templateUrl: "views/form_advanced.html",
//            data: { pageTitle: 'Advanced form' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/moment/moment.min.js']
//                        },
//                        {
//                            name: 'ui.knob',
//                            files: ['js/plugins/jsKnob/jquery.knob.js','js/plugins/jsKnob/angular-knob.js']
//                        },
//                        {
//                            files: ['css/plugins/ionRangeSlider/ion.rangeSlider.css','css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css','js/plugins/ionRangeSlider/ion.rangeSlider.min.js']
//                        },
//                        {
//                            insertBefore: '#loadBefore',
//                            name: 'localytics.directives',
//                            files: ['css/plugins/chosen/bootstrap-chosen.css','js/plugins/chosen/chosen.jquery.js','js/plugins/chosen/chosen.js']
//                        },
//                        {
//                            name: 'nouislider',
//                            files: ['css/plugins/nouslider/jquery.nouislider.css','js/plugins/nouslider/jquery.nouislider.min.js','js/plugins/nouslider/angular-nouislider.js']
//                        },
//                        {
//                            name: 'datePicker',
//                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js']
//                        },
//                        {
//                            files: ['js/plugins/jasny/jasny-bootstrap.min.js']
//                        },
//                        {
//                            files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
//                        },
//                        {
//                            name: 'ui.switchery',
//                            files: ['css/plugins/switchery/switchery.css','js/plugins/switchery/switchery.js','js/plugins/switchery/ng-switchery.js']
//                        },
//                        {
//                            name: 'colorpicker.module',
//                            files: ['css/plugins/colorpicker/colorpicker.css','js/plugins/colorpicker/bootstrap-colorpicker-module.js']
//                        },
//                        {
//                            name: 'ngImgCrop',
//                            files: ['js/plugins/ngImgCrop/ng-img-crop.js','css/plugins/ngImgCrop/ng-img-crop.css']
//                        },
//                        {
//                            serie: true,
//                            files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
//                        },
//                        {
//                            name: 'daterangepicker',
//                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
//                        },
//                        {
//                            files: ['css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
//                        },
//                        {
//                            name: 'ui.select',
//                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
//                        },
//                        {
//                            files: ['css/plugins/touchspin/jquery.bootstrap-touchspin.min.css', 'js/plugins/touchspin/jquery.bootstrap-touchspin.min.js']
//                        },
//                        {
//                            name: 'ngTagsInput',
//                            files: ['js/plugins/ngTags//ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
//                        },
//                        {
//                            files: ['js/plugins/dualListbox/jquery.bootstrap-duallistbox.js','css/plugins/dualListbox/bootstrap-duallistbox.min.css']
//                        },
//                        {
//                            name: 'frapontillo.bootstrap-duallistbox',
//                            files: ['js/plugins/dualListbox/angular-bootstrap-duallistbox.js']
//                        }
//
//                    ]);
//                }
//            }
//        })
//        .state('forms.wizard', {
//            url: "/wizard",
//            templateUrl: "views/form_wizard.html",
//            controller: wizardCtrl,
//            data: { pageTitle: 'Wizard form' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/steps/jquery.steps.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('forms.wizard.step_one', {
//            url: '/step_one',
//            templateUrl: 'views/wizard/step_one.html',
//            data: { pageTitle: 'Wizard form' }
//        })
//        .state('forms.wizard.step_two', {
//            url: '/step_two',
//            templateUrl: 'views/wizard/step_two.html',
//            data: { pageTitle: 'Wizard form' }
//        })
//        .state('forms.wizard.step_three', {
//            url: '/step_three',
//            templateUrl: 'views/wizard/step_three.html',
//            data: { pageTitle: 'Wizard form' }
//        })
//        .state('forms.file_upload', {
//            url: "/file_upload",
//            templateUrl: "views/form_file_upload.html",
//            data: { pageTitle: 'File upload' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/dropzone/basic.css','css/plugins/dropzone/dropzone.css','js/plugins/dropzone/dropzone.js']
//                        },
//                        {
//                            files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css' ]
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('forms.text_editor', {
//            url: "/text_editor",
//            templateUrl: "views/form_editors.html",
//            data: { pageTitle: 'Text editor' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'summernote',
//                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js','js/plugins/summernote/angular-summernote.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('forms.autocomplete', {
//            url: "/autocomplete",
//            templateUrl: "views/autocomplete.html",
//            data: { pageTitle: 'Autocomplete' }
//
//        })
//        .state('forms.markdown', {
//            url: "/markdown",
//            templateUrl: "views/markdown.html",
//            data: { pageTitle: 'Markdown' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            files: ['js/plugins/bootstrap-markdown/bootstrap-markdown.js','js/plugins/bootstrap-markdown/markdown.js','css/plugins/bootstrap-markdown/bootstrap-markdown.min.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('app', {
//            abstract: true,
//            url: "/app",
//            templateUrl: "views/common/content.html",
//        })
//        .state('app.contacts', {
//            url: "/contacts",
//            templateUrl: "views/contacts.html",
//            data: { pageTitle: 'Contacts' }
//        })
//        .state('app.contacts_2', {
//            url: "/contacts_2",
//            templateUrl: "views/contacts_2.html",
//            data: { pageTitle: 'Contacts 2' }
//        })
//        .state('app.profile', {
//            url: "/profile",
//            templateUrl: "views/profile.html",
//            data: { pageTitle: 'Profile' }
//        })
//        .state('app.profile_2', {
//            url: "/profile_2",
//            templateUrl: "views/profile_2.html",
//            data: { pageTitle: 'Profile_2'},
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/sparkline/jquery.sparkline.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('app.projects', {
//            url: "/projects",
//            templateUrl: "views/projects.html",
//            data: { pageTitle: 'Projects' }
//        })
//        .state('app.project_detail', {
//            url: "/project_detail",
//            templateUrl: "views/project_detail.html",
//            data: { pageTitle: 'Project detail' }
//        })
//        .state('app.file_manager', {
//            url: "/file_manager",
//            templateUrl: "views/file_manager.html",
//            data: { pageTitle: 'File manager' }
//        })
//        .state('app.calendar', {
//            url: "/calendar",
//            templateUrl: "views/calendar.html",
//            data: { pageTitle: 'Calendar' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            insertBefore: '#loadBefore',
//                            files: ['css/plugins/fullcalendar/fullcalendar.css','js/plugins/fullcalendar/fullcalendar.min.js','js/plugins/fullcalendar/gcal.js']
//                        },
//                        {
//                            name: 'ui.calendar',
//                            files: ['js/plugins/fullcalendar/calendar.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('app.faq', {
//            url: "/faq",
//            templateUrl: "views/faq.html",
//            data: { pageTitle: 'FAQ' }
//        })
//        .state('app.timeline', {
//            url: "/timeline",
//            templateUrl: "views/timeline.html",
//            data: { pageTitle: 'Timeline' }
//        })
//        .state('app.pin_board', {
//            url: "/pin_board",
//            templateUrl: "views/pin_board.html",
//            data: { pageTitle: 'Pin board' }
//        })
//        .state('app.invoice', {
//            url: "/invoice",
//            templateUrl: "views/invoice.html",
//            data: { pageTitle: 'Invoice' }
//        })
//        .state('app.blog', {
//            url: "/blog",
//            templateUrl: "views/blog.html",
//            data: { pageTitle: 'Blog' }
//        })
//        .state('app.article', {
//            url: "/article",
//            templateUrl: "views/article.html",
//            data: { pageTitle: 'Article' }
//        })
//        .state('app.issue_tracker', {
//            url: "/issue_tracker",
//            templateUrl: "views/issue_tracker.html",
//            data: { pageTitle: 'Issue Tracker' }
//        })
//        .state('app.clients', {
//            url: "/clients",
//            templateUrl: "views/clients.html",
//            data: { pageTitle: 'Clients' }
//        })
//        .state('app.teams_board', {
//            url: "/teams_board",
//            templateUrl: "views/teams_board.html",
//            data: { pageTitle: 'Teams board' }
//        })
//        .state('app.social_feed', {
//            url: "/social_feed",
//            templateUrl: "views/social_feed.html",
//            data: { pageTitle: 'Social feed' }
//        })
//        .state('app.vote_list', {
//            url: "/vote_list",
//            templateUrl: "views/vote_list.html",
//            data: { pageTitle: 'Vote list' }
//        })
//        .state('pages', {
//            abstract: true,
//            url: "/pages",
//            templateUrl: "views/common/content.html"
//        })
//        .state('pages.search_results', {
//            url: "/search_results",
//            templateUrl: "views/search_results.html",
//            data: { pageTitle: 'Search results' }
//        })
//        .state('pages.empy_page', {
//            url: "/empy_page",
//            templateUrl: "views/empty_page.html",
//            data: { pageTitle: 'Empty page' }
//        })
//        .state('login', {
//            url: "/login",
//            templateUrl: "views/login.html",
//            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
//            ,resolve: {
//                                loadPlugin: function ($ocLazyLoad) {
//                                    return $ocLazyLoad.load([
//                                        {
//                                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
//                                        },
//                                        {
//                                            name: 'oitozero.ngSweetAlert',
//                                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
//                                        },
//                                        {
//                                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                                        }
//                                    ]);
//                                }
//                            }
//        })
//        .state('login_two_columns', {
//            url: "/login_two_columns",
//            templateUrl: "views/login_two_columns.html",
//            data: { pageTitle: 'Login two columns', specialClass: 'gray-bg' }
//        })
//        .state('register', {
//            url: "/register",
//            templateUrl: "views/register.html",
//            data: { pageTitle: 'Register', specialClass: 'gray-bg' }
//        })
//        .state('lockscreen', {
//            url: "/lockscreen",
//            templateUrl: "views/lockscreen.html",
//            data: { pageTitle: 'Lockscreen', specialClass: 'gray-bg' }
//        })
//        .state('forgot_password', {
//            url: "/forgot_password",
//            templateUrl: "views/forgot_password.html",
//            data: { pageTitle: 'Forgot password', specialClass: 'gray-bg' }
//        })
//        .state('errorOne', {
//            url: "/errorOne",
//            templateUrl: "views/errorOne.html",
//            data: { pageTitle: '404', specialClass: 'gray-bg' }
//        })
//        .state('errorTwo', {
//            url: "/errorTwo",
//            templateUrl: "views/errorTwo.html",
//            data: { pageTitle: '500', specialClass: 'gray-bg' }
//        })
//        .state('ui', {
//            abstract: true,
//            url: "/ui",
//            templateUrl: "views/common/content.html",
//        })
//        .state('ui.typography', {
//            url: "/typography",
//            templateUrl: "views/typography.html",
//            data: { pageTitle: 'Typography' }
//        })
//        .state('ui.icons', {
//            url: "/icons",
//            templateUrl: "views/icons.html",
//            data: { pageTitle: 'Icons' }
//        })
//        .state('ui.buttons', {
//            url: "/buttons",
//            templateUrl: "views/buttons.html",
//            data: { pageTitle: 'Buttons' }
//        })
//        .state('ui.tabs_panels', {
//            url: "/tabs_panels",
//            templateUrl: "views/tabs_panels.html",
//            data: { pageTitle: 'Panels' }
//        })
//        .state('ui.tabs', {
//            url: "/tabs",
//            templateUrl: "views/tabs.html",
//            data: { pageTitle: 'Tabs' }
//        })
//        .state('ui.notifications_tooltips', {
//            url: "/notifications_tooltips",
//            templateUrl: "views/notifications.html",
//            data: { pageTitle: 'Notifications and tooltips' }
//        })
//        .state('ui.helper_classes', {
//            url: "/helper_classes",
//            templateUrl: "views/helper_classes.html",
//            data: { pageTitle: 'Helper css classes' }
//        })
//        .state('ui.badges_labels', {
//            url: "/badges_labels",
//            templateUrl: "views/badges_labels.html",
//            data: { pageTitle: 'Badges and labels and progress' }
//        })
//        .state('ui.video', {
//            url: "/video",
//            templateUrl: "views/video.html",
//            data: { pageTitle: 'Responsible Video' }
//        })
//        .state('ui.draggable', {
//            url: "/draggable",
//            templateUrl: "views/draggable.html",
//            data: { pageTitle: 'Draggable panels' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'ui.sortable',
//                            files: ['js/plugins/ui-sortable/sortable.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('grid_optionss', {
//            url: "/grid_options",
//            templateUrl: "views/grid_options.html",
//            data: { pageTitle: 'Grid options' }
//        })
//        .state('miscellaneous', {
//            abstract: true,
//            url: "/miscellaneous",
//            templateUrl: "views/common/content.html",
//        })
//        .state('miscellaneous.google_maps', {
//            url: "/google_maps",
//            templateUrl: "views/google_maps.html",
//            data: { pageTitle: 'Google maps' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'ui.event',
//                            files: ['js/plugins/uievents/event.js']
//                        },
//                        {
//                            name: 'ui.map',
//                            files: ['js/plugins/uimaps/ui-map.js']
//                        },
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.datamaps', {
//            url: "/datamaps",
//            templateUrl: "views/datamaps.html",
//            data: { pageTitle: 'Datamaps' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/d3/d3.min.js','js/plugins/topojson/topojson.js','js/plugins/datamaps/datamaps.all.min.js']
//                        },
//                        {
//                            name: 'datamaps',
//                            files: ['js/plugins/angular-datamaps/angular-datamaps.min.js']
//                        },
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.socialbuttons', {
//            url: "/socialbuttons",
//            templateUrl: "views/socialbuttons.html",
//            data: { pageTitle: 'Social buttons' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/bootstrapSocial/bootstrap-social.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.code_editor', {
//            url: "/code_editor",
//            templateUrl: "views/code_editor.html",
//            data: { pageTitle: 'Code Editor' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            files: ['css/plugins/codemirror/codemirror.css','css/plugins/codemirror/ambiance.css','js/plugins/codemirror/codemirror.js','js/plugins/codemirror/mode/javascript/javascript.js']
//                        },
//                        {
//                            name: 'ui.codemirror',
//                            files: ['js/plugins/ui-codemirror/ui-codemirror.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.modal_window', {
//            url: "/modal_window",
//            templateUrl: "views/modal_window.html",
//            data: { pageTitle: 'Modal window' }
//        })
//        .state('miscellaneous.chat_view', {
//            url: "/chat_view",
//            templateUrl: "views/chat_view.html",
//            data: { pageTitle: 'Chat view' }
//        })
//        .state('miscellaneous.nestable_list', {
//            url: "/nestable_list",
//            templateUrl: "views/nestable_list.html",
//            data: { pageTitle: 'Nestable List' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'ui.tree',
//                            files: ['css/plugins/uiTree/angular-ui-tree.min.css','js/plugins/uiTree/angular-ui-tree.min.js']
//                        },
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.notify', {
//            url: "/notify",
//            templateUrl: "views/notify.html",
//            data: { pageTitle: 'Notifications for angularJS' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'cgNotify',
//                            files: ['css/plugins/angular-notify/angular-notify.min.css','js/plugins/angular-notify/angular-notify.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.timeline_2', {
//            url: "/timeline_2",
//            templateUrl: "views/timeline_2.html",
//            data: { pageTitle: 'Timeline version 2' }
//        })
//        .state('miscellaneous.forum_view', {
//            url: "/forum_view",
//            templateUrl: "views/forum_view.html",
//            data: { pageTitle: 'Forum - general view' }
//        })
//        .state('miscellaneous.forum_post_view', {
//            url: "/forum_post_view",
//            templateUrl: "views/forum_post_view.html",
//            data: { pageTitle: 'Forum - post view' }
//        })
//        .state('miscellaneous.diff', {
//            url: "/diff",
//            templateUrl: "views/diff.html",
//            data: { pageTitle: 'Text Diff' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/diff_match_patch/javascript/diff_match_patch.js']
//                        },
//                        {
//                            name: 'diff-match-patch',
//                            files: ['js/plugins/angular-diff-match-patch/angular-diff-match-patch.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.pdf_viewer', {
//            url: "/pdf_viewer",
//            templateUrl: "views/pdf_viewer.html",
//            data: { pageTitle: 'PDF viewer' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/pdfjs/pdf.js']
//                        },
//                        {
//                            name: 'pdf',
//                            files: ['js/plugins/pdfjs/angular-pdf.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.sweet_alert', {
//            url: "/sweet_alert",
//            templateUrl: "views/sweet_alert.html",
//            data: { pageTitle: 'Sweet alert' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
//                        },
//                        {
//                            name: 'oitozero.ngSweetAlert',
//                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.idle_timer', {
//            url: "/idle_timer",
//            templateUrl: "views/idle_timer.html",
//            data: { pageTitle: 'Idle timer' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'cgNotify',
//                            files: ['css/plugins/angular-notify/angular-notify.min.css','js/plugins/angular-notify/angular-notify.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.live_favicon', {
//            url: "/live_favicon",
//            templateUrl: "views/live_favicon.html",
//            data: { pageTitle: 'Live favicon' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/tinycon/tinycon.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.spinners', {
//            url: "/spinners",
//            templateUrl: "views/spinners.html",
//            data: { pageTitle: 'Spinners' }
//        })
//        .state('miscellaneous.validation', {
//            url: "/validation",
//            templateUrl: "views/validation.html",
//            data: { pageTitle: 'Validation' }
//        })
//        .state('miscellaneous.agile_board', {
//            url: "/agile_board",
//            templateUrl: "views/agile_board.html",
//            data: { pageTitle: 'Agile board' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'ui.sortable',
//                            files: ['js/plugins/ui-sortable/sortable.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.masonry', {
//            url: "/masonry",
//            templateUrl: "views/masonry.html",
//            data: { pageTitle: 'Masonry' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/masonry/masonry.pkgd.min.js']
//                        },
//                        {
//                            name: 'wu.masonry',
//                            files: ['js/plugins/masonry/angular-masonry.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.toastr', {
//            url: "/toastr",
//            templateUrl: "views/toastr.html",
//            data: { pageTitle: 'Toastr' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            insertBefore: '#loadBefore',
//                            name: 'toaster',
//                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.i18support', {
//            url: "/i18support",
//            templateUrl: "views/i18support.html",
//            data: { pageTitle: 'i18support' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            insertBefore: '#loadBefore',
//                            name: 'toaster',
//                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.truncate', {
//            url: "/truncate",
//            templateUrl: "views/truncate.html",
//            data: { pageTitle: 'Truncate' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/dotdotdot/jquery.dotdotdot.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.clipboard', {
//            url: "/clipboard",
//            templateUrl: "views/clipboard.html",
//            data: { pageTitle: 'Clipboard' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/ngclipboard/clipboard.min.js']
//                        },
//                        {
//                            name: 'ngclipboard',
//                            files: ['js/plugins/ngclipboard/ngclipboard.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.loading_buttons', {
//            url: "/loading_buttons",
//            templateUrl: "views/loading_buttons.html",
//            data: { pageTitle: 'Loading buttons' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            name: 'angular-ladda',
//                            files: ['js/plugins/ladda/spin.min.js', 'js/plugins/ladda/ladda.min.js', 'css/plugins/ladda/ladda-themeless.min.css','js/plugins/ladda/angular-ladda.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.tour', {
//            url: "/tour",
//            templateUrl: "views/tour.html",
//            data: { pageTitle: 'Tour' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            insertBefore: '#loadBefore',
//                            files: ['js/plugins/bootstrap-tour/bootstrap-tour.min.js', 'css/plugins/bootstrap-tour/bootstrap-tour.min.css']
//                        },
//                        {
//                            name: 'bm.bsTour',
//                            files: ['js/plugins/angular-bootstrap-tour/angular-bootstrap-tour.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('miscellaneous.tree_view', {
//            url: "/tree_view",
//            templateUrl: "views/tree_view.html",
//            data: { pageTitle: 'Tree view' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/jsTree/style.min.css','js/plugins/jsTree/jstree.min.js']
//                        },
//                        {
//                            name: 'ngJsTree',
//                            files: ['js/plugins/jsTree/ngJsTree.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('tables', {
//            abstract: true,
//            url: "/tables",
//            templateUrl: "views/common/content.html"
//        })
//        .state('tables.static_table', {
//            url: "/static_table",
//            templateUrl: "views/table_basic.html",
//            data: { pageTitle: 'Static table' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'angular-peity',
//                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
//                        },
//                        {
//                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('tables.data_tables', {
//            url: "/data_tables",
//            templateUrl: "views/table_data_tables.html",
//            data: { pageTitle: 'Data Tables' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            serie: true,
//                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
//                        },
//                        {
//                            serie: true,
//                            name: 'datatables',
//                            files: ['js/plugins/dataTables/angular-datatables.min.js']
//                        },
//                        {
//                            serie: true,
//                            name: 'datatables.buttons',
//                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('tables.foo_table', {
//            url: "/foo_table",
//            templateUrl: "views/foo_table.html",
//            data: { pageTitle: 'Foo Table' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
//                        },
//                        {
//                            name: 'ui.footable',
//                            files: ['js/plugins/footable/angular-footable.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('tables.nggrid', {
//            url: "/nggrid",
//            templateUrl: "views/nggrid.html",
//            data: { pageTitle: 'ng Grid' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            name: 'ngGrid',
//                            files: ['js/plugins/nggrid/ng-grid-2.0.3.min.js']
//                        },
//                        {
//                            insertBefore: '#loadBefore',
//                            files: ['js/plugins/nggrid/ng-grid.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('commerce', {
//            abstract: true,
//            url: "/commerce",
//            templateUrl: "views/common/content.html",
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
//                        },
//                        {
//                            name: 'ui.footable',
//                            files: ['js/plugins/footable/angular-footable.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('commerce.products_grid', {
//            url: "/products_grid",
//            templateUrl: "views/ecommerce_products_grid.html",
//            data: { pageTitle: 'E-commerce grid' }
//        })
//        .state('commerce.product_list', {
//            url: "/product_list",
//            templateUrl: "views/ecommerce_product_list.html",
//            data: { pageTitle: 'E-commerce product list' }
//        })
//        .state('commerce.orders', {
//            url: "/orders",
//            templateUrl: "views/ecommerce_orders.html",
//            data: { pageTitle: 'E-commerce orders' }
//        })
//        .state('commerce.product', {
//            url: "/product",
//            templateUrl: "views/ecommerce_product.html",
//            data: { pageTitle: 'Product edit' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js']
//                        },
//                        {
//                            name: 'summernote',
//                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js','js/plugins/summernote/angular-summernote.min.js']
//                        }
//                    ]);
//                }
//            }
//
//        })
//        .state('commerce.product_details', {
//            url: "/product_details",
//            templateUrl: "views/ecommerce_product_details.html",
//            data: { pageTitle: 'E-commerce Product detail' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/slick/slick.css','css/plugins/slick/slick-theme.css','js/plugins/slick/slick.min.js']
//                        },
//                        {
//                            name: 'slick',
//                            files: ['js/plugins/slick/angular-slick.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('commerce.payments', {
//            url: "/payments",
//            templateUrl: "views/ecommerce_payments.html",
//            data: { pageTitle: 'E-commerce payments' }
//        })
//        .state('commerce.cart', {
//            url: "/cart",
//            templateUrl: "views/ecommerce_cart.html",
//            data: { pageTitle: 'Shopping cart' }
//        })
//        .state('gallery', {
//            abstract: true,
//            url: "/gallery",
//            templateUrl: "views/common/content.html"
//        })
//        .state('gallery.basic_gallery', {
//            url: "/basic_gallery",
//            templateUrl: "views/basic_gallery.html",
//            data: { pageTitle: 'Lightbox Gallery' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/blueimp/jquery.blueimp-gallery.min.js','css/plugins/blueimp/css/blueimp-gallery.min.css']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('gallery.bootstrap_carousel', {
//            url: "/bootstrap_carousel",
//            templateUrl: "views/carousel.html",
//            data: { pageTitle: 'Bootstrap carousel' }
//        })
//        .state('gallery.slick_gallery', {
//            url: "/slick_gallery",
//            templateUrl: "views/slick.html",
//            data: { pageTitle: 'Slick carousel' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['css/plugins/slick/slick.css','css/plugins/slick/slick-theme.css','js/plugins/slick/slick.min.js']
//                        },
//                        {
//                            name: 'slick',
//                            files: ['js/plugins/slick/angular-slick.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('css_animations', {
//            url: "/css_animations",
//            templateUrl: "views/css_animation.html",
//            data: { pageTitle: 'CSS Animations' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            reconfig: true,
//                            serie: true,
//                            files: ['js/plugins/rickshaw/vendor/d3.v3.js','js/plugins/rickshaw/rickshaw.min.js']
//                        },
//                        {
//                            reconfig: true,
//                            name: 'angular-rickshaw',
//                            files: ['js/plugins/rickshaw/angular-rickshaw.js']
//                        }
//                    ]);
//                }
//            }
//
//        })
//        .state('landing', {
//            url: "/landing",
//            templateUrl: "views/landing.html",
//            data: { pageTitle: 'Landing page', specialClass: 'landing-page' },
//            resolve: {
//                loadPlugin: function ($ocLazyLoad) {
//                    return $ocLazyLoad.load([
//                        {
//                            files: ['js/plugins/wow/wow.min.js']
//                        }
//                    ]);
//                }
//            }
//        })
//        .state('outlook', {
//            url: "/outlook",
//            templateUrl: "views/outlook.html",
//            data: { pageTitle: 'Outlook view', specialClass: 'fixed-sidebar' }
//        })
//        .state('off_canvas', {
//            url: "/off_canvas",
//            templateUrl: "views/off_canvas.html",
//            data: { pageTitle: 'Off canvas menu', specialClass: 'canvas-menu' }
//        });

}
angular
    .module('lisnet')
    .config(config)
    .run(function($rootScope, $state) {
        console.log('rodando o run dentro do config ..');
        $rootScope.$state = $state;
//        $rootScope.$stateProvider = $stateProvider;
    });
