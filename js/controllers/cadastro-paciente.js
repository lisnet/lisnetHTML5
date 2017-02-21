/* 
 * 
 * https://www.golden-layout.com
 */

/* 
 Created on : Jan 9, 2017, 12:17:42 PM
 Author     : eros
 */


/* global y */

function cadastroPaciente($scope, sairDoSistemaService, notificacaoProvider, buscaAPIService, $stateParams, $localStorage, $timeout, $filter,DTOptionsBuilder,helperService,$state) {

    var self = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
    
    if (!$scope.userDTO.cadastroPaciente) {
        $scope.inputPAC_ST_NOME = true;
        $scope.userDTO.cadastroPaciente = {showBuscaPaciente:true,showConstroePaciente:false,showConstroeRequisicao:false,ultimoCampo:'',pacienteDB:null,paciente:null,pacientes:{},requisicao:{exames:[]}};
    }else{
        $state.go($scope.userDTO.cadastroPaciente.ultimoStep);
    }

    $scope.paramsStateConfig = $stateParams;
    

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
        $state.go(step);
    };
    
    $scope.encontraPaciente = function (PAC_IN_CODIGO){
        var _pacs = $scope.userDTO.cadastroPaciente.pacientes;
        var _pac = _pacs.filter(function (p) {
                        return p.PAC_IN_CODIGO === PAC_IN_CODIGO;
                    })[0];
        $scope.userDTO.cadastroPaciente.pacienteDB = _pac;
        $scope.userDTO.cadastroPaciente.paciente = helperService.clonadorDeObj(_pac);
        console.log("pacienteDB = "+JSON.stringify(_pac,null,2));
        $scope.userDTO.cadastroPaciente.showBuscaPaciente = false;
        $scope.userDTO.cadastroPaciente.showConstroePaciente = true;
        $scope.userDTO.cadastroPaciente.ultimoStep = '.step_one';
        $state.go('.constroe_paciente');
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

};




angular.module('lisnet')
        .controller('cadastroPaciente', cadastroPaciente);