/* 
 * 
 * https://www.golden-layout.com
 */

/* 
 Created on : Jan 9, 2017, 12:17:42 PM
 Author     : eros
 */


function cadastroPaciente($scope, sairDoSistemaService, notificacaoProvider, buscaAPIService, $stateParams, $localStorage) {

    var self = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
    if (!$scope.userDTO.cadastroPaciente) {
        $scope.userDTO.cadastroPaciente = {};
    }
    $scope.paramsStateConfig = $stateParams;
    $scope.userDTO.cadastroPaciente.ultimoCampo = '';

    $scope.trocarVisualizacao = function (tipoDebusca) {
        console.log('tipoDebusca = ' + tipoDebusca);
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
                console.log('ultimo campo: '+$scope.userDTO.cadastroPaciente.ultimoCampo);
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
    };


    $scope.filtrar = function ( ) {

        console.log('ultimoCampo = ' + $scope.userDTO.cadastroPaciente.ultimoCampo);
        self.modalLoading = notificacaoProvider.modalLoading('filtrando', 'filtrando', $scope);
        self.activated = true;

        $timeout(function () {
            /*
             * Debloqueio p nova excucao
             */
            runFiltrar = true;
            if (runFiltrar) {
                runFiltrar = false;
                var _startFilter = $filter('date')($scope.date.startDate._d, 'dd-MM-yyyy');
                var _endFilter = $filter('date')($scope.date.endDate._d, 'dd-MM-yyyy');

                var args = '';
                var uniStCodigo = $scope.userDTO.cadastroPaciente.unidadeId.substring(0, 3);
                var libetaPesquisa = false;
                switch ($scope.userDTO.cadastroPaciente.ultimoCampo) {
                    case 'REQ_ST_CODIGO':
                        console.log('Inside de Case ' + $scope.userDTO.cadastroPaciente.ultimoCampo);
                        if ($scope.userDTO.cadastroPaciente.requisicao) {
                            libetaPesquisa = true;
                            args = "?campoDePesquisa=REQ_ST_CODIGO&valor=" + $scope.userDTO.cadastroPaciente.requisicao + "&unidade=" + uniStCodigo;
                        }
                        break;
                    case 'PAC_ST_PRONTUARIO':
                        console.log('Inside de Case ' + $scope.userDTO.cadastroPaciente.ultimoCampo);
                        if ($scope.userDTO.cadastroPaciente.prontuario) {
                            libetaPesquisa = true;
                            args = "?campoDePesquisa=PAC_ST_PRONTUARIO&valor=" + $scope.userDTO.cadastroPaciente.prontuario + "&unidade=" + uniStCodigo;
                        }
                        break;
                    case 'PAC_IN_CODSUS':
                        console.log('Inside de Case ' + $scope.userDTO.cadastroPaciente.ultimoCampo);
                        if ($scope.userDTO.cadastroPaciente.sus) {
                            libetaPesquisa = true;
                            args = "?campoDePesquisa=PAC_IN_CODSUS&valor=" + $scope.userDTO.cadastroPaciente.sus + "&unidade=" + uniStCodigo;
                        }
                        break;
                    case 'PAC_ST_NOME':
                        console.log('Inside de Case ' + $scope.userDTO.cadastroPaciente.ultimoCampo);
                        if ($scope.userDTO.cadastroPaciente.nome) {
                            libetaPesquisa = true;
                            args = "?campoDePesquisa=PAC_ST_NOME&valor=" + $scope.userDTO.cadastroPaciente.nome.toUpperCase() + "&unidade=" + uniStCodigo;
                        }

                        break;
                    case 'datas':
                        console.log('Inside de Case ' + $scope.userDTO.cadastroPaciente.ultimoCampo);
                        libetaPesquisa = true;
                        args = "?campoDePesquisa=datas&dtInicio=" + _startFilter + "&dtFim=" + _endFilter + "&unidade=" + uniStCodigo;
                        break;
                    default :
                        console.log('Inside de Case Default');
                        libetaPesquisa = true;
                        args = "?campoDePesquisa=datas&dtInicio=" + _startFilter + "&dtFim=" + _endFilter + "&unidade=" + uniStCodigo;

                }
                console.log('args = ' + args);
                if (libetaPesquisa) {
                    buscaAPIService.buscaRequisicoes(args, $scope.paramsStateConfig.limit, $scope.userDTO.configLisNet)
                            .then(function successCallback(response) {
                                $scope.userDTO.cadastroPaciente.requisicoes = response.data;
                                console.log("Quantidade total de registros : " + $scope.userDTO.cadastroPaciente.requisicoes.length);
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

    };
}


angular.module('lisnet')
        .controller('cadastroPaciente', cadastroPaciente);