/* 
 Created on : Oct 24, 2016, 2:03:59 PM
 Author     : eros
 */



/* global x, i, y, z */



angular.module('lisnet').service('resumePerfilService', function ($state,runtimeStates) {


    this.resume = function (perfil) {

    console.log('resumePerfilService ....................................................................................................................................................................................');
//        var arrayStates = [];
//        for (x in $state.get()) {
//            var _s = $state.get()[x];
//            arrayStates.push(_s.name);
//        }
//        console.log("arrayStates = " + arrayStates);

        for (i in perfil) {
            var pai = perfil[i];
            if (pai.telas) {
                for (y in pai.telas) {
                    var filho = pai.telas[y];
                    if (filho.telas) {
                        filho.visualisar = true;
                        for (z in filho.telas) {
                            var neto = filho.telas[z];
//                            neto.visualisar = this.findState(neto.state, arrayStates);
                            var _n = this.findStateJSON(neto.MOD_ST_CODIGO);
                            if(_n){
                                neto.visualisar = true;
                                _n.state.params.breadcrumb = [ {label:'Home',go:'widgets'}, {label:pai.MOD_ST_DESCRICAO,go:null} ,{label:filho.MOD_ST_DESCRICAO,go:null} ,{label:neto.MOD_ST_DESCRICAO,go:neto.MOD_ST_CODIGO}];
                                runtimeStates.addState(_n.MOD_ST_CODIGO, _n.state);
                                if(_n.states){
                                    console.log('bastardos neto '+_n.states.length);
                                    for(i in _n.states){
                                        var _bastardo = _n.states[i];
                                        runtimeStates.addState(_bastardo.MOD_ST_CODIGO, _bastardo.state);
                                    }
                                }
                            }
                        }
                    } else {
//                        filho.visualisar = this.findState(filho.state, arrayStates);
                        var _f = this.findStateJSON(filho.MOD_ST_CODIGO);
                            if(_f){
                                filho.visualisar = true;
                                _f.state.params.breadcrumb = [ {label:'Home',go:'widgets'}, {label:pai.MOD_ST_DESCRICAO,go:null} ,{label:filho.MOD_ST_DESCRICAO,go:filho.MOD_ST_CODIGO} ];
                                runtimeStates.addState(_f.MOD_ST_CODIGO, _f.state);
                                if(_f.states){
                                    console.log('bastardos filho '+_f.states.length);
                                    for(y in _f.states){
                                        var _bastardo = _f.states[y];
                                        runtimeStates.addState(_bastardo.MOD_ST_CODIGO, _bastardo.state);
                                    }
                                }
                            }
                    }
                }
            } else {
                pai.visualisar = false;
            }
        }
        return perfil;
    };
   

    this.findState = function (stateName, array) {
        for (i in array) {
            if (array[i] === stateName) {
                return true;
            }
        }
        return false;
    };

this.findStateJSON = function (MOD_ST_CODIGO){
        return stateArray.filter(function (state){
            return state.MOD_ST_CODIGO ===  MOD_ST_CODIGO;
        })[0];
};


});


var stateArray = [{MOD_ST_CODIGO:'00006',state:{
                url: "/configura_convenios/",
                templateUrl: "views/tmtelas/tela_padrao.html",
                params: {titulo: 'Convênios', pai: 'Configura', pagina: 'Convênios', modStCodigo: '00006', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
                parent: 'lisnet',
                data: {pageTitle: 'Convênios'}
   }},
    {MOD_ST_CODIGO:'00013',state:{
        url: "/configura_materiais/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Material', pai: 'Configura', pagina: 'Material', modStCodigo: '00013', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Materiais'}
    }},
{MOD_ST_CODIGO:'00015',state:{
        url: "/configura_setores/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Setores', pai: 'Configura', pagina: 'Setores', modStCodigo: '00015', limit: '200', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Setores'}
    }},
{MOD_ST_CODIGO:'00016',state:{
        url: "/configura_antibioticos/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Antibiótico', pai: 'Configura', pagina: 'Antibiótico', modStCodigo: '00016', limit: '250', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Antibioticos'}
    }},
{MOD_ST_CODIGO:'00017',state:{
        url: "/configura_bacteriasfungosevirus/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Bactéria,Fungo & Virús', pai: 'Configura', pagina: 'Bactéria,Fungo & Virús', modStCodigo: '00017', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Bacterias Fungos e Virus'}
    }},
{MOD_ST_CODIGO:'00018',state:{
        url: "/configura_cid/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'CID', pai: 'Configura', pagina: 'CID', modStCodigo: '00018', limit: '500', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'CID'}
    }},
{MOD_ST_CODIGO:'00021',state:{
        url: "/configura_feriado/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Feriado', pai: 'Configura', pagina: 'Feriado', modStCodigo: '00021', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Feriado'}
    }},
{MOD_ST_CODIGO:'00022',state:{
        url: "/configura_frasesparalaudo/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Frase para Laudo', pai: 'Configura', pagina: 'Frase para Laudo', modStCodigo: '00022', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Frases para Laudo'}
    }},
  {MOD_ST_CODIGO:'00023',state:{
        url: "/configura_metodo/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Método', pai: 'Configura', pagina: 'Método', modStCodigo: '00023', limit: '500', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Método'}
    }},
{MOD_ST_CODIGO:'00024',state:{
        url: "/configura_motivo/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Motivo', pai: 'Configura', pagina: 'Motivo', modStCodigo: '00024', limit: '500', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Motivo'}
    }},
{MOD_ST_CODIGO:'00025',state:{
        url: "/configura_observacao/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Observação', pai: 'Configura', pagina: 'Observação', modStCodigo: '00025', limit: '30', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Observação'}
    }},
{MOD_ST_CODIGO:'00027',state:{
        url: "/configura_parasitas/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Parasitas', pai: 'Configura', pagina: 'Parasitas', modStCodigo: '00027', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Parasitas'}
    }},
{MOD_ST_CODIGO:'00031',state:{
        url: "/configura_recipiente/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Recipiente', pai: 'Configura', pagina: 'Recipiente', modStCodigo: '00031', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Recipiente'}
    }},
{MOD_ST_CODIGO:'00044',state:{
        url: "/configura_solicitantes/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Solicitantes', pai: 'Configura', pagina: 'Solicitantes', modStCodigo: '00044', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Solicitantes'}
    }},
{MOD_ST_CODIGO:'00046',state:{
        url: "/configura_profissoes/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Profissões', pai: 'Configura', pagina: 'Profissões', modStCodigo: '00046', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Profissões'}
    }},
{MOD_ST_CODIGO:'00053',state:{
        url: "/configura_unidadesdemedida/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Unidade de Medida', pai: 'Configura', pagina: 'Unidade de Medida', modStCodigo: '00053', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Unidade de Medida'}
    }},
{MOD_ST_CODIGO:'00054',state:{
        url: "/configura_mapadeantibioticos/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Mapa de Antibióticos', pai: 'Configura', pagina: 'Mapa de Antibióticos', modStCodigo: '00054', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Mapa de Antibióticos'}
    }},
{MOD_ST_CODIGO:'00057',state:{
        url: "/configura_laboratoriodeapoio/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Laboratório de Apoio', pai: 'Configura', pagina: 'Laboratório de Apoio', modStCodigo: '00057', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Laboratório de Apoio'}
    }},
{MOD_ST_CODIGO:'00058',state:{
        url: "/configura_coletores/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Coletores', pai: 'Configura', pagina: 'Coletores', modStCodigo: '00058', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Coletores'}
    }},
{MOD_ST_CODIGO:'00059',state:{
        url: "/configura_localdeentrega/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Local de Entrega', pai: 'Configura', pagina: 'Local de Entrega', modStCodigo: '00059', limit: '300', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Local de Entrega'}
    }},
{MOD_ST_CODIGO:'00060',state:{
        url: "/configura_textoparalaudos/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Texto para Laudo', pai: 'Configura', pagina: 'Texto para Laudo', modStCodigo: '00060', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Texto para Laudos'}
    }},
{MOD_ST_CODIGO:'00073',state:{
        url: "/configura_mapaamostra/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Mapa de Amostra', pai: 'Configura', pagina: 'Mapa de Amostra', modStCodigo: '00073', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Mapa Amostra'}
    }},
{MOD_ST_CODIGO:'00088',state:{
        url: "/configura_grupo/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Grupo', pai: 'Configura', pagina: 'Grupo', modStCodigo: '00088', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Grupo'}
    }},
{MOD_ST_CODIGO:'00090',state:{
        url: "/configura_examedepara/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Exame Depara', pai: 'Configura', pagina: 'Exame Depara', modStCodigo: '00090', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Exame Depara'}
    }},
{MOD_ST_CODIGO:'00098',state:{
        url: "/configura_grupodetriagem/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Grupo de Triagem', pai: 'Configura', pagina: 'Grupo de Triagem', modStCodigo: '00098', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Grupo de Triagem'}
    }},
{MOD_ST_CODIGO:'00101',state:{
        url: "/configura_localdepara/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Local Depara', pai: 'Configura', pagina: 'Local Depara', modStCodigo: '00101', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Local depara'}
    }},
{MOD_ST_CODIGO:'00131',state:{
        url: "/configura_examedepararetorno/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Exame Depara Retorno', pai: 'Configura', pagina: 'Exame Depara Retorno', modStCodigo: '00131', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Exame de para Retorno'}
    }},
{MOD_ST_CODIGO:'00133',state:{
        url: "/configura_materialdepara/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Material Depara', pai: 'Configura', pagina: 'Material Depara', modStCodigo: '00133', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Material Depara'}
    }},
{MOD_ST_CODIGO:'00138',state:{
        url: "/configura_materialdecoleta_dasa/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Material de Coleta', pai: 'Configura', pagina: 'Material de Coleta', modStCodigo: '00138', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Material de Coleta(DASA)'}
    }},
{MOD_ST_CODIGO:'00139',state:{
        url: "/configura_recipientedecoleta_dasa/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Recipiente de Coleta', pai: 'Configura', pagina: 'Recipiente de Coleta', modStCodigo: '00139', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Recipiente de Coleta(DASA)'}
    }},
{MOD_ST_CODIGO:'00159',state:{
        url: "/configura_cadastrodecarros/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Cadastro de Carros', pai: 'Configura', pagina: 'Cadastro de Carros', modStCodigo: '00159', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Cadastro de Carros'}
    }},
{MOD_ST_CODIGO:'00161',state:{
        url: "/configura_procedimentodecoleta/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Procedimento de Coleta', pai: 'Configura', pagina: 'Procedimento de Coleta', modStCodigo: '00161', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Procedimento de Coleta'}
    }},
{MOD_ST_CODIGO:'00179',state:{
        url: "/configura_bandejamento/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Badejamento', pai: 'Configura', pagina: 'Badejamento', modStCodigo: '00179', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Bandejamento'}
    }},
{MOD_ST_CODIGO:'00184',state:{
        url: "/configura_flyer/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Flyer', pai: 'Configura', pagina: 'Flyer', modStCodigo: '00184', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Flyer'}
    }},
{MOD_ST_CODIGO:'00185',state:{
        url: "/configura_cadastrosparasoroteca/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Cadastro para Soroteca', pai: 'Configura', pagina: 'Cadastro para Soroteca', modStCodigo: '00185', limit: '50', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Cadastros para Soroteca'}
    }},
{MOD_ST_CODIGO:'00187',state:{
        url: "/configura_cadastrodesistemas/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Cadastro de Sistemas', pai: 'Configura', pagina: 'Cadastro de Sistemas', modStCodigo: '00187', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Cadastro de Sistemas'}
    }},
{MOD_ST_CODIGO:'00190',state:{
        url: "/configura_grupodeantibioticos/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Grupo de Antibióticos', pai: 'Configura', pagina: 'Grupo de Antibióticos', modStCodigo: '00190', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Grupo de Antibioticos'}
    }},
{MOD_ST_CODIGO:'00194',state:{
        url: "/configura_laudopadrao/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Laudo Padrão', pai: 'Configura', pagina: 'Laudo Padrão', modStCodigo: '00194', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Laudo Padrao'}
    }},
{MOD_ST_CODIGO:'00199',state:{
        url: "/configura_usuarioxconvenio/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Usuário x Convênio', pai: 'Configura', pagina: 'Usuário x Convênio', modStCodigo: '00199', limit: '220', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Usuário x Convênio'}
    }},
{MOD_ST_CODIGO:'00229',state:{
        url: "/configura_periododefechamento/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Período de Fechamento', pai: 'Configura', pagina: 'Período de Fechamento', modStCodigo: '00229', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Periodo de Fechamento'}
    }},
{MOD_ST_CODIGO:'00251',state:{
        url: "/configura_fraselaudo/",
        templateUrl: "views/tmtelas/tela_padrao.html",
        params: {titulo: 'Frase do Laudo', pai: 'Configura', pagina: 'Frase do Laudo', modStCodigo: '00251', limit: '100', btnFiltrar: true, btnCriar: true, btnTodos: true},
        parent: 'lisnet',
        data: {pageTitle: 'Frase Laudo'}
    }},
{MOD_ST_CODIGO:'00273',state:{
        url: "/consulta/laudo/:userDTO",
        templateUrl: "views/tmtelas/consulta_laudos.html",
        parent: 'lisnet',
        params: {titulo: 'Consulta de Laudos', pai: 'Consulta', filho: 'Laudos', pagina: 'Consulta de Laudos', limit: '500'},
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
                params: {titulo: 'Estatística Faturamento', pai: 'Estatística', pagina: 'Estatística Faturamento'},
                data: {pageTitle: 'Estatística Faturamento'}, resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(telaComplexa());
                    }
                }
     }},
 {MOD_ST_CODIGO:'00220',state:{
        url: "/cadastro_pacientes",
        templateUrl: "views/tmtelas/cadastro_paciente/cadastro_paciente.html",
        params: {titulo: 'Cadastro de Paciente', pai: 'Cadastro', pagina: 'Cadastro de Paciente', modStCodigo: '00220', limit: '500'},
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
    },
    {MOD_ST_CODIGO:'00273',state:{
        url: "/consulta/laudo/:userDTO",
        templateUrl: "views/tmtelas/consulta_laudos.html",
        parent: 'lisnet',
        params: {titulo: 'Consulta de Laudos', pai: 'Consulta', filho: 'Laudos', pagina: 'Consulta de Laudos', limit: '500'},
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
                params: {titulo: 'Sobre o LisNet e a Geslab', pai: 'Ajuda', pagina: 'Sobre o LisNet e a Geslab'},
                data: {pageTitle: 'Sobre'}

            }}];

    function telaPadraoLazyLoad() {
        return   [
            {
                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
            },
            {
                name: 'oitozero.ngSweetAlert',
                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
            },
            {
                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
            },
            {
                serie: true,
                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
            },
            {
                serie: true,
                name: 'datatables',
                files: ['js/plugins/dataTables/angular-datatables.min.js']
            },
            {
                serie: true,
                name: 'datatables.buttons',
                files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
            },
            {
                name: 'ui.switchery',
                files: ['css/plugins/switchery/switchery.css', 'js/plugins/switchery/switchery.js', 'js/plugins/switchery/ng-switchery.js']
            },
            {
                files: ['js/plugins/jasny/jasny-bootstrap.min.js']
            },
            {
                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
            }
        ];
    };

    function telaComplexa() {
        return   [
            {
                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
            },
            {
                name: 'oitozero.ngSweetAlert',
                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
            },
            {
                files: ['js/plugins/moment/moment.min.js']
            },
            {
                name: 'ui.knob',
                files: ['js/plugins/jsKnob/jquery.knob.js', 'js/plugins/jsKnob/angular-knob.js']
            },
            {
                files: ['css/plugins/ionRangeSlider/ion.rangeSlider.css', 'css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css', 'js/plugins/ionRangeSlider/ion.rangeSlider.min.js']
            },
            {
                insertBefore: '#loadBefore',
                name: 'localytics.directives',
                files: ['css/plugins/chosen/bootstrap-chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
            },
            {
                name: 'nouislider',
                files: ['css/plugins/nouslider/jquery.nouislider.css', 'js/plugins/nouslider/jquery.nouislider.min.js', 'js/plugins/nouslider/angular-nouislider.js']
            },
            {
                name: 'datePicker',
                files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/angular-datepicker.js']
            },
            {
                files: ['js/plugins/jasny/jasny-bootstrap.min.js']
            },
            {
                files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
            },
            {
                name: 'ui.switchery',
                files: ['css/plugins/switchery/switchery.css', 'js/plugins/switchery/switchery.js', 'js/plugins/switchery/ng-switchery.js']
            },
            {
                name: 'colorpicker.module',
                files: ['css/plugins/colorpicker/colorpicker.css', 'js/plugins/colorpicker/bootstrap-colorpicker-module.js']
            },
            {
                name: 'ngImgCrop',
                files: ['js/plugins/ngImgCrop/ng-img-crop.js', 'css/plugins/ngImgCrop/ng-img-crop.css']
            },
            {
                serie: true,
                files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
            },
            {
                name: 'daterangepicker',
                files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
            },
            {
                files: ['css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
            },
            {
                name: 'ui.select',
                files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
            },
            {
                files: ['css/plugins/touchspin/jquery.bootstrap-touchspin.min.css', 'js/plugins/touchspin/jquery.bootstrap-touchspin.min.js']
            },
            {
                name: 'ngTagsInput',
                files: ['js/plugins/ngTags//ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
            },
            {
                files: ['js/plugins/dualListbox/jquery.bootstrap-duallistbox.js', 'css/plugins/dualListbox/bootstrap-duallistbox.min.css']
            },
            {
                name: 'frapontillo.bootstrap-duallistbox',
                files: ['js/plugins/dualListbox/angular-bootstrap-duallistbox.js']
            },
            {
                serie: true,
                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
            },
            {
                serie: true,
                name: 'datatables',
                files: ['js/plugins/dataTables/angular-datatables.min.js']
            },
            {
                serie: true,
                name: 'datatables.buttons',
                files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
            },
            {
                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
            },
            {
                name: 'oitozero.ngSweetAlert',
                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
            },
            {
                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
            },
            {
                files: ['css/plugins/steps/jquery.steps.css']
            },
            {
                files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
            },
            {
                name: 'ui.footable',
                files: ['js/plugins/footable/angular-footable.js']
            }


        ];
    };


