/* 
 * 
 * https://www.golden-layout.com
 */

/* 
 Created on : Jan 9, 2017, 12:17:42 PM
 Author     : eros
 */


/* global y */

function cadastroPaciente($scope, sairDoSistemaService, notificacaoProvider, buscaAPIService, $stateParams, $localStorage, $timeout, $filter,DTOptionsBuilder,helperService,$state,$rootScope,$timeout) {

    var self = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
    
    if (!$scope.userDTO.cadastroPaciente) {
        $scope.inputPAC_ST_NOME = true;
        $scope.userDTO.cadastroPaciente = {showBuscaPaciente:true,ultimoStep:'cadastrodepacientes',showConstroePaciente:false,showConstroeRequisicao:false,ultimoCampo:'',
            ufs: [ "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"]
            ,pacienteDB:null,paciente:null,pacientes:{},requisicao:{exames:[],solicitantes:[]}};
    }else{
        console.log('redirecionando p : '+$scope.userDTO.cadastroPaciente.ultimoStep);
        $timeout(function (){$state.go($scope.userDTO.cadastroPaciente.ultimoStep);},2000);
    }
    
    $scope.userDTO.cadastroPaciente.config = {
                PAC_IN_CODIGO:{disable:true,min:4,max:15,visible:true,required:false,label:'Código Interno',position:0},
                PAC_ST_NOME:{disable:false,min:5,max:70,visible:true,required:true,label:'Nome',position:1},
                PAC_DT_NASCIMENTO:{disable:false,min:5,max:20,visible:true,required:false,label:'Data de Nascimento',position:2},
                PAC_IN_IDADE:{disable:false,min:5,max:20,visible:true,required:false,label:'Idade',position:3},
                PAC_ST_SEXO:{disable:false,min:5,max:20,visible:true,required:true,label:'fa fa-venus-mars',position:4},
                PAC_ST_ESTADOCIVIL:{disable:false,min:5,max:20,visible:true,required:false,label:'Estado Civil',position:5},
                PAC_ST_RG:{disable:false,min:8,max:12,visible:true,required:false,label:'R.G',position:6},
                PAC_ST_CPF:{disable:false,min:11,max:14,visible:true,required:false,label:'CPF',position:7},
                PAC_IN_CODSUS:{disable:false,min:10,max:15,visible:true,required:false,label:'S.U.S',position:8},
                PAC_ST_PRONTUARIO:{disable:false,min:4,max:15,visible:true,required:false,label:'Prontuário',position:9},
                PAC_ST_COR:{disable:false,min:1,max:2,visible:true,required:false,label:'Cor',position:10},
                PAC_ST_RESP:{disable:false,min:8,max:50,visible:true,required:false,label:'Responsável',position:11},
                PAC_ST_NOMEMAE:{disable:false,min:8,max:70,visible:true,required:false,label:'Nome da Mãe',position:12},
                PAC_ST_CEP:{disable:false,min:8,max:9,visible:true,required:false,label:'CEP',position:13},
                PAC_ST_ENDERECO:{disable:false,min:8,max:70,visible:true,required:false,label:'Endereço',position:14},
                PAC_ST_NUMERO:{disable:false,min:0,max:5,visible:true,required:false,label:'Numero',position:15},
                PAC_ST_COMPLEMENTO:{disable:false,min:0,max:50,visible:true,required:false,label:'Complemento',position:16},
                PAC_ST_BAIRRO:{disable:false,min:0,max:50,visible:true,required:false,label:'Bairro',position:17},
                PAC_ST_CIDADE:{disable:false,min:0,max:50,visible:true,required:false,label:'Cidade',position:18},
                PAC_ST_ESTADO:{disable:false,min:0,max:2,visible:true,required:false,label:'UF',position:19},
                PAC_ST_TELEFONE:{disable:false,min:0,max:20,visible:true,required:false,label:'Telefone',position:20},
                PAC_ST_CELULAR:{disable:false,min:0,max:20,visible:true,required:false,label:'Celular',position:21},
                PAC_ST_EMAIL:{disable:false,min:0,max:50,visible:true,required:false,label:'Email',position:22},
                PAC_BL_OBSERVACAO:{disable:false,min:0,max:50,visible:true,required:false,label:'Observação',position:23},
                REQ_IN_CODIGO:{disable:false,min:0,max:50,visible:true,required:false,label:'Solicitação',position:24},
                REQ_DT_CADASTRO:{disable:true,min:0,max:50,visible:true,required:true,label:'Data',position:25},
                REQ_ST_MATRICULA:{disable:false,min:0,max:30,visible:true,required:false,label:'N. Cart.',position:26},
                REQ_ST_SENHA:{disable:false,min:0,max:20,visible:true,required:false,label:'Senha',position:27},
                REQ_DT_VALIDADESENHA:{disable:true,min:0,max:20,visible:true,required:false,label:'Validade',position:28},
                REQ_ST_AUTORIZACAO:{disable:false,min:0,max:20,visible:true,required:false,label:'Autorização',position:29},
                UNI_ST_CODIGO:{disable:false,min:3,max:3,visible:true,required:true,label:'Local',position:30},
                ORI_ST_CODIGO:{disable:false,min:3,max:3,visible:true,required:true,label:'Posto',position:31},
                CON_ST_CODIGO:{disable:false,min:3,max:3,visible:true,required:false,label:'Convênio',position:32},
                REG_ST_CODIGO:{disable:false,min:3,max:3,visible:true,required:false,label:'Plano',position:33},
                LOC_ST_CODIGO:{disable:false,min:3,max:3,visible:true,required:false,label:'Entrega',position:34},
                CID_ST_CODIGO:{disable:false,min:3,max:3,visible:true,required:false,label:'C.I.D',position:35},
                REQ_ST_DUM:{disable:false,min:0,max:20,visible:true,required:false,label:'DUM',position:36},
                REQ_CH_GESTANTE:{disable:false,min:0,max:1,visible:true,required:false,label:'Gestante',position:37},
                REQ_CH_RN:{disable:false,min:0,max:1,visible:true,required:false,label:'R.N.',position:38},
                REQ_ST_PESO:{disable:false,min:0,max:5,visible:true,required:false,label:'Peso',position:39},
                REQ_ST_ALTURA:{disable:false,min:0,max:5,visible:true,required:false,label:'Altura',position:40},
                COL_ST_CODIGO:{disable:false,min:0,max:20,visible:true,required:false,label:'Coletor',position:41},
                REQ_DT_COLETA:{disable:false,min:0,max:20,visible:true,required:false,label:'Data & Hora',position:42},
                REQ_ST_QUARTO:{disable:false,min:0,max:10,visible:true,required:false,label:'Quarto',position:43},
                REQ_ST_LEITO:{disable:false,min:0,max:10,visible:true,required:false,label:'Leito',position:44},
                REQ_BL_OBSERVACAO:{disable:false,min:0,max:4000,visible:true,required:false,label:'Observação',position:45},
                SOL_ST_CODIGO:{disable:false,min:0,max:3,visible:true,required:false,label:'Solicitante',position:46}
            };

    $scope.paramsStateConfig = $stateParams;
    
    self.submit = function (isValid) {
        console.log("h");
        if (isValid) {
//            $scope.userDTO.configuraPerfil.isValid =isValid;
            self.message = "Submitted " ;
        } else {
            self.message = "There are still invalid fields below";
        }
    };

    $scope.trocarVisualizacao = function (tipoDebusca, valor) {
//        console.log('tipoDebusca = ' + tipoDebusca);
        switch (tipoDebusca) {
            case 'PAC_DT_NASCIMENTO':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_DT_NASCIMENTO';
                break;
            case 'REQ_ST_CODIGO':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'REQ_ST_CODIGO';
                break;
            case 'PAC_ST_PRONTUARIO':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_ST_PRONTUARIO';
                break;
            case 'PAC_IN_CODSUS':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_IN_CODSUS';
                break;
            case 'PAC_ST_NOME':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_ST_NOME';
                break;
            case 'PAC_ST_CPF':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_ST_CPF';
                break;
            case 'PAC_ST_RG':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_ST_RG';
                break;
            case 'REQ_ST_CODIGOALT':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'REQ_ST_CODIGOALT';
                break;
            default :
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_DT_NASCIMENTO';
        }
        $scope.userDTO.cadastroPaciente.valorCampo = valor;
        console.log('ultimo campo: ' + $scope.userDTO.cadastroPaciente.ultimoCampo + '   valor: ' + $scope.userDTO.cadastroPaciente.valor);
    };

    $scope.filtrar = function ( ) {
        console.log('ultimoCampo = ' + $scope.userDTO.cadastroPaciente.ultimoCampo);
        if ($scope.userDTO.cadastroPaciente.ultimoCampo && $scope.userDTO.cadastroPaciente.valorCampo) {
            self.modalLoading = notificacaoProvider.modalLoading('filtrando', 'filtrando', $scope);
            self.activated = true;
            $timeout(function () {
                
                runFiltrar = true;
                if (runFiltrar) {
                    runFiltrar = false;

                    var args = '';

//            var uniStCodigo = $scope.userDTO.unidade.UNI_ST_CODIGO;
                    var libetaPesquisa = false;
                    args = "?campoDePesquisa=" + $scope.userDTO.cadastroPaciente.ultimoCampo + "&valor=" + $scope.userDTO.cadastroPaciente.valorCampo.toUpperCase();
                    console.log('args = ' + args);
                    if (libetaPesquisa || true) {
                        console.log('$scope.paramsStateConfig.limit : ' + $scope.paramsStateConfig.limit);
                        buscaAPIService.buscaRequisicoes(args, $scope.paramsStateConfig.limit, $scope.userDTO.configLisNet)
                                .then(function successCallback(response) {
                                    $scope.userDTO.cadastroPaciente.requisicoes = response.data;
                                    console.log("Quantidade total de registros : " + $scope.userDTO.cadastroPaciente.requisicoes.length);
                                    constroeListaPacientes($scope.userDTO.cadastroPaciente.requisicoes);
                                    $localStorage.userDTO = $scope.userDTO;
                                    $timeout(function () {
                                        self.modalLoading.dismiss('cancel');
                                    }, 1000);
                                },
                                        function errorCallback(response) {
                                            console.log(response.statusText);
                                            $timeout(function () {
                                                self.modalLoading.dismiss('cancel');
                                            }, 1000);
                                        });
                    } else {
                        $timeout(function () {
                            self.modalLoading.dismiss('cancel');
                        }, 200);
                    }

                } else {
                    console.log('Espera porra.......');
                    $timeout(function () {
                        self.modalLoading = notificacaoProvider.modalLoading('Aguarde', 'Em execução', $scope);
                    }, 300);
                }
            }, 250);
        } else {

        }
    };
    
    $scope.goToStep = function (step){
        $scope.userDTO.cadastroPaciente.ultimoStep = step;
        $scope.userDTO.cadastroPaciente.showBuscaPaciente =true;
        $state.go(step);
        $scope.inputPAC_ST_NOME = true;
    };
    
    $scope.encontraPaciente = function (PAC_IN_CODIGO){
        var _pacs = $scope.userDTO.cadastroPaciente.pacientes;
        var _pac = _pacs.filter(function (p) {
                        return p.PAC_IN_CODIGO === PAC_IN_CODIGO;
                    })[0];
        $scope.userDTO.cadastroPaciente.pacienteDB = _pac;
        $scope.userDTO.cadastroPaciente.paciente = helperService.clonadorDeObj(_pac);
//        console.log("pacienteDB = "+JSON.stringify(_pac,null,2));
        $scope.userDTO.cadastroPaciente.showBuscaPaciente = false;
        $scope.userDTO.cadastroPaciente.showConstroePaciente = true;
        $scope.userDTO.cadastroPaciente.ultimoStep = 'cadastrodepacientes.constroe_paciente';
        $state.go('cadastrodepacientes.constroe_paciente');
        $timeout(function (){$scope.inputPAC_ST_NOMEBUSCA = true;},1000);
        
    };

    $scope.constroeEndereco = function (p) {
//            console.log(JSON.stringify(p));
        var endereco;
        if (p.PAC_ST_CIDADE) {
            endereco = endereco + p.PAC_ST_CIDADE + ' - ';
        }
        if (p.PAC_ST_ESTADO) {
            endereco = endereco + p.PAC_ST_ESTADO + ' - ';
        }
        if (p.PAC_ST_ENDERECO) {
            endereco = endereco + p.PAC_ST_ENDERECO + ' | ';
        }
        if (p.PAC_ST_CEP) {
            endereco = endereco + p.PAC_ST_CEP + ' - ';
        }
        if (endereco && endereco.length > 1) {
            return   endereco.substring(endereco.length - 1, endereco.length);
        } else {
            return null;
        }

    };

    function  constroeListaPacientes(requisicoes) {
          if (typeof requisicoes === 'object' && requisicoes.length > 0) {
              $scope.userDTO.cadastroPaciente.pacientes = [];
              var _pacs = [];
              for (y  in requisicoes) {
                  var req = requisicoes[y];
  //                console.log('req : '+JSON.stringify(req,null,2));
                  if (_pacs.length === 0) {
                      _pacs.push(constroePaciente(req));
                  } else if (_pacs.length >= 0) {
                      var pac_in_codigo = req.PAC_IN_CODIGO;
                      var _pac = _pacs.filter(function (p) {
                          return p.PAC_IN_CODIGO === pac_in_codigo;
                      })[0];
                      if (_pac) {
                          _pac.requisicoes.push(constroeRequisicao(req));
                      } else {
                          _pacs.push(constroePaciente(req));
                      }
                  }
              }
              $scope.userDTO.cadastroPaciente.pacientes = _pacs;
          } else {
              $scope.userDTO.cadastroPaciente.pacientes = [];
          }
      };

    function constroePaciente(req) {
          return {PAC_IN_CODIGO: req.PAC_IN_CODIGO,
              PAC_ST_NOME: req.PAC_ST_NOME,
              PAC_ST_SEXO: req.PAC_ST_SEXO,
              PAC_ST_PRONTUARIO: req.PAC_ST_PRONTUARIO,
              PAC_IN_CODSUS: req.PAC_IN_CODSUS,
              PAC_ST_CPF: req.PAC_ST_CPF,
              PAC_ST_ESTADO: req.PAC_ST_ESTADO,
              PAC_ST_BAIRRO: req.PAC_ST_BAIRRO,
              PAC_ST_CIDADE: req.PAC_ST_CIDADE,
              PAC_ST_ENDERECO: req.PAC_ST_ENDERECO,
              PAC_ST_CEP: req.PAC_ST_CEP,
              requisicoes: [constroeRequisicao(req)]};
      };

    function constroeRequisicao(req) {
        return  {REQ_ST_CODIGO: req.REQ_ST_CODIGO,
            REQ_DT_CADASTRO: req.REQ_DT_CADASTRO,
            UNI_ST_CODIGO: req.UNI_ST_CODIGO,
            SOL_ST_CODIGO: req.SOL_ST_CODIGO,
            LEG_ST_CODIGO: req.LEG_ST_CODIGO,
            REQ_ST_CODIGOALT: req.REQ_ST_CODIGOALT};
    };

$rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                $timeout(function () {
                    if ($state.current.name.includes("cadastrodepacientes")) {
                        console.log("$state.current.name: " + $state.current.name);
                        $scope.userDTO.cadastroPaciente.ultimoStep = $state.current.name;
                    }
                }, 400);
            });

$scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withOption('stateSave', false)
            .withOption('lengthMenu', [8, 20, 40, 100, 150, 200])
            //        .withLanguage([{url:"//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese.json"}])
            .withLanguage({
                "sProcessing": "A processar...",
                "sLengthMenu": "Mostrar _MENU_ registos",
                "sZeroRecords": "Não foram encontrados resultados",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
                "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                "sInfoPostFix": "",
                "sSearch": "Procurar:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "Primeiro",
                    "sPrevious": "Anterior",
                    "sNext": "Seguinte",
                    "sLast": "Último"
                }})
            .withButtons([
                {extend: 'copy'},
//            {extend: 'csv'},
//            {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile'},
                {extend: 'print',
                    customize: function (win) {
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                    }
                }
            ]);

};




angular.module('lisnet')
        .controller('cadastroPaciente', cadastroPaciente);