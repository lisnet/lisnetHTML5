/* 
 * Here comes the text of your license
 * Each line should be prefixed with  * 
 */
/* 
 Created on : Nov 1, 2016, 5:57:18 PM
 Author     : eros
Desc: Module/Value destinado a guardar todos as confs statticas do sistema
 */


angular.module("lisnet").value("configLisNet",{
   baseUrl: 'http://localhost:8080/lisnet' ,
   defaultDB: 'fleming',
//   defaultDB: 'labclim'
//defaultDB:'einstein'
//defaultDB:'union'
//defaultDB:'hpp',
statesPesquisa:['configuraperfilusuario | Editar / Configurar Usuário','controle_notificacoes | Controle de Notificações','widgets | Home Painel de Widgets do Usuário, Inicio , Inĩcio, Começo, Casa','sair | Sair do Sistema quit exit :q'],
stateArray : [{MOD_ST_CODIGO:'00006',state:{
                url: "/configura_convenios/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
                parent: 'lisnet',
                data: {pageTitle: 'Convênios'}
   }},
    {MOD_ST_CODIGO:'00013',state:{
        url: "/configura_materiais/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Materiais'}
    }},
{MOD_ST_CODIGO:'00015',state:{
        url: "/configura_setores/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '200', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Setores'}
    }},
{MOD_ST_CODIGO:'00016',state:{
        url: "/configura_antibioticos/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '250', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Antibioticos'}
    }},
{MOD_ST_CODIGO:'00017',state:{
        url: "/configura_bacteriasfungosevirus/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: { limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Bacterias Fungos e Virus'}
    }},
{MOD_ST_CODIGO:'00018',state:{
        url: "/configura_cid/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '500', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'CID'}
    }},
{MOD_ST_CODIGO:'00021',state:{
        url: "/configura_feriado/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Feriado'}
    }},
{MOD_ST_CODIGO:'00022',state:{
        url: "/configura_frasesparalaudo/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: { limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Frases para Laudo'}
    }},
  {MOD_ST_CODIGO:'00023',state:{
        url: "/configura_metodo/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '500', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Método'}
    }},
{MOD_ST_CODIGO:'00024',state:{
        url: "/configura_motivo/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: { limit: '500', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Motivo'}
    }},
{MOD_ST_CODIGO:'00025',state:{
        url: "/configura_observacao/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '30', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Observação'}
    }},
{MOD_ST_CODIGO:'00027',state:{
        url: "/configura_parasitas/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Parasitas'}
    }},
{MOD_ST_CODIGO:'00031',state:{
        url: "/configura_recipiente/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Recipiente'}
    }},
{MOD_ST_CODIGO:'00044',state:{
        url: "/configura_solicitantes/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Solicitantes'}
    }},
{MOD_ST_CODIGO:'00046',state:{
        url: "/configura_profissoes/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Profissões'}
    }},
{MOD_ST_CODIGO:'00053',state:{
        url: "/configura_unidadesdemedida/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Unidade de Medida'}
    }},
{MOD_ST_CODIGO:'00054',state:{
        url: "/configura_mapadeantibioticos/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Mapa de Antibióticos'}
    }},
{MOD_ST_CODIGO:'00057',state:{
        url: "/configura_laboratoriodeapoio/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Laboratório de Apoio'}
    }},
{MOD_ST_CODIGO:'00058',state:{
        url: "/configura_coletores/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Coletores'}
    }},
{MOD_ST_CODIGO:'00059',state:{
        url: "/configura_localdeentrega/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: { limit: '300', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Local de Entrega'}
    }},
{MOD_ST_CODIGO:'00060',state:{
        url: "/configura_textoparalaudos/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: { limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Texto para Laudos'}
    }},
{MOD_ST_CODIGO:'00073',state:{
        url: "/configura_mapaamostra/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: { limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Mapa Amostra'}
    }},
{MOD_ST_CODIGO:'00088',state:{
        url: "/configura_grupo/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Grupo'}
    }},
{MOD_ST_CODIGO:'00090',state:{
        url: "/configura_examedepara/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Exame Depara'}
    }},
{MOD_ST_CODIGO:'00098',state:{
        url: "/configura_grupodetriagem/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: { limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Grupo de Triagem'}
    }},
{MOD_ST_CODIGO:'00101',state:{
        url: "/configura_localdepara/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Local depara'}
    }},
{MOD_ST_CODIGO:'00131',state:{
        url: "/configura_examedepararetorno/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Exame de para Retorno'}
    }},
{MOD_ST_CODIGO:'00133',state:{
        url: "/configura_materialdepara/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Material Depara'}
    }},
{MOD_ST_CODIGO:'00138',state:{
        url: "/configura_materialdecoleta_dasa/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Material de Coleta(DASA)'}
    }},
{MOD_ST_CODIGO:'00139',state:{
        url: "/configura_recipientedecoleta_dasa/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Recipiente de Coleta(DASA)'}
    }},
{MOD_ST_CODIGO:'00159',state:{
        url: "/configura_cadastrodecarros/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: { limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Cadastro de Carros'}
    }},
{MOD_ST_CODIGO:'00161',state:{
        url: "/configura_procedimentodecoleta/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Procedimento de Coleta'}
    }},
{MOD_ST_CODIGO:'00179',state:{
        url: "/configura_bandejamento/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Bandejamento'}
    }},
{MOD_ST_CODIGO:'00184',state:{
        url: "/configura_flyer/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Flyer'}
    }},
{MOD_ST_CODIGO:'00185',state:{
        url: "/configura_cadastrosparasoroteca/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '50', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Cadastros para Soroteca'}
    }},
{MOD_ST_CODIGO:'00187',state:{
        url: "/configura_cadastrodesistemas/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Cadastro de Sistemas'}
    }},
{MOD_ST_CODIGO:'00190',state:{
        url: "/configura_grupodeantibioticos/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Grupo de Antibioticos'}
    }},
{MOD_ST_CODIGO:'00194',state:{
        url: "/configura_laudopadrao/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Laudo Padrao'}
    }},
{MOD_ST_CODIGO:'00199',state:{
        url: "/configura_usuarioxconvenio/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '220', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Usuário x Convênio'}
    }},
{MOD_ST_CODIGO:'00229',state:{
        url: "/configura_periododefechamento/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Periodo de Fechamento'}
    }},
{MOD_ST_CODIGO:'00251',state:{
        url: "/configura_fraselaudo/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Frase Laudo'}
    }},
{MOD_ST_CODIGO:'00273',state:{
        url: "/consulta/laudo/:userDTO",
        templateUrl: "views/tmtelas/consulta_laudos.html",
        parent: 'lisnet',
        params: {limit: '500'},
        data: {pageTitle: 'Consulta de Laudos'}, resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load(telaComplexa());
            }
        }
    }},
{MOD_ST_CODIGO:'00263',state:{
                url: "/faturamento_estatisticafaturamento",
                templateUrl: "views/tmtelas/estatistica_faturamento.html",
                parent: 'lisnet',
                controller: 'estatisticaFaturamento',
                params: {limit:'0'},
                data: {pageTitle: 'Estatística Faturamento'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaComplexa());
                    }
                }
     }},
    {MOD_ST_CODIGO:'00273',state:{
        url: "/consulta/laudo/:userDTO",
        templateUrl: "views/tmtelas/consulta_laudos.html",
        parent: 'lisnet',
        params: {limit: '500'},
        data: {pageTitle: 'Consulta de Laudos'}, resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load(telaComplexa());
            }
        }
    }},
{MOD_ST_CODIGO:'00049',state:{
                url: "/sobre",
                templateUrl: "views/tmtelas/ajuda.html",
                parent: 'lisnet',
                params: {},
                data: {pageTitle: 'Sobre'}
            }},
{MOD_ST_CODIGO:'00220',state:{
            url: "/cadastro_pacientes",
            templateUrl: "views/tmtelas/cadastro_paciente/cadastro_paciente.html",
            params: {limit: '500'},
            parent: 'lisnet',
            data: {pageTitle: 'Cadastro de Paciente'}, resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(telaComplexa());
                }
            }
                },states:[{MOD_ST_CODIGO:'00220.busca_paciente',state: {
                            url: 'busca_paciente',
                            templateUrl: 'views/tmtelas/cadastro_paciente/cadastro_paciente_busca_paciente.html',
                            data: {pageTitle: 'Busca Paciente', state: '00220.busca_paciente'}
                        }} ,
                    {MOD_ST_CODIGO:'00220.constroe_paciente', state: {
                            url: 'constroe_paciente',
                            templateUrl: 'views/tmtelas/cadastro_paciente/cadastro_paciente_constroe_paciente.html',
                            data: {pageTitle: 'Constroe Paciente', state: '00220.constroe_paciente'}
                        }},
                    {MOD_ST_CODIGO:'00220.constroe_paciente_contato',state: {
                            url: 'constroe_paciente_contato',
                            templateUrl: 'views/tmtelas/cadastro_paciente/cadastro_paciente_constroe_paciente_contato.html',
                            data: {pageTitle: 'Contato', state: '00220.constroe_paciente_contato'}
                        }},
                    {MOD_ST_CODIGO:'00220.constroe_requisicao', state:{
                            url: 'constroe_requisicao',
                            templateUrl: 'views/tmtelas/cadastro_paciente/cadastro_paciente_constroe_requisicao.html',
                            data: {pageTitle: 'Constroe Requisição', state: '00220.constroe_requisicao'}
                        }},
                    {MOD_ST_CODIGO:'00220.dados_complementares',state: {
                            url: 'dados_complementares',
                            templateUrl: 'views/tmtelas/cadastro_paciente/cadastro_paciente_constroe_requisicao_dados_complementares.html',
                            data: {pageTitle: 'Dados Complementares', state: '00220.dados_complementares'}
                        }},
                    {MOD_ST_CODIGO:'00220.inclue_exames',state: {
                            url: 'inclue_exames',
                            templateUrl: 'views/tmtelas/cadastro_paciente/cadastro_paciente_constroe_requisicao_exames.html',
                            data: {pageTitle: 'Incluir Exames', state: '00220.inclue_exames'}
                        }}]
    }]
});


    
    
