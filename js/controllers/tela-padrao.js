/* 
 Created on : Nov 29, 2016, 2:10:26 PM
 Author     : eros
 */

function telaPadrao($scope,$state ,buscaAPIService, $stateParams, $localStorage, sairDoSistemaService, notificacaoProvider, $window, gerenciaRelatorioService, $filter, $timeout, $uibModal, DTOptionsBuilder, $interval, shareuser) {
//{tabela:_tabelaNome,modulo:[{"MOD_ST_CODIGO": "00021",... }],conteudo:};
    var tP = this;

    $scope.userDTO = sairDoSistemaService.validarLogin();
    
    var modStCodigo = $stateParams.modStCodigo;
    var moduloPadrao;
    
    if ($scope.userDTO.telaPadrao && $scope.userDTO.telaPadrao.length > 0) {

        if ($scope.userDTO.telaPadrao.filter(encontraModulo).length > 0) {
            moduloPadrao = $scope.userDTO.telaPadrao.filter(encontraModulo);
        } else {
            moduloPadrao =   montaModulo(modStCodigo);
        }

    } else {
        $scope.userDTO.telaPadrao = [];
        moduloPadrao =  montaModulo(modStCodigo);
    }
    if(!moduloPadrao.modulo){
        buscaAPIService.buscaModuloTelaPadrao($scope.userDTO.configLisNet,modStCodigo)
                .then(function successCallback(response){
                    moduloPadrao.modulo = response.data;
                      console.log(JSON.stringify(moduloPadrao.modulo,null,2));
                      if(moduloPadrao.modulo ){
                            for(var x = 0 ; x <  moduloPadrao.modulo.length ; x ++){
                                console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>');
                                console.log(moduloPadrao.modulo[x]);
                            }
                        }
                },function errorCallback(response){
                    notificacaoProvider.sweetWarning("erro", response.statusText);
                });
    }
    moduloPadrao.state = $state.current;
    $scope.moduloPadrao = moduloPadrao;
    console.log('moduloPadrao = '+JSON.stringify(moduloPadrao,null,2));
    
    

    

    function  encontraModulo(e) {
        return e.modStCodigo === modStCodigo;
    };
    function montaModulo(_modStCodigo) {
        mp = {modStCodigo: _modStCodigo};
        $scope.userDTO.telaPadrao.push(mp);
        return mp;
    };

};

angular.module('lisnet')
        .controller('telaPadrao', telaPadrao);


