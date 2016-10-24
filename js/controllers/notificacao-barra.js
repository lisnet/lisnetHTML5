/* 
 Created on : Oct 19, 2016, 4:46:04 PM
 Author     : eros
 */


function notificacaoBarra($scope, $window, $localStorage,sairDoSistemaService){
    
    console.log('Inicializando notificacaoBarra');
    $scope.userDTO = $localStorage.userDTO;
    var qdtNotificacaoResumida = 10;
    $scope.notificacoesResumida = [];
    sairDoSistemaService.validarLogin();

    $scope.openRelatorio = function (status,codigo_rastreio){
        console.log('Inside openRelatorio codigo_rastreio = '+codigo_rastreio);
        if(status === 'B'){
            var url = $scope.userDTO.configLisNet.baseUrl +'/relatorio/download?codigo_rastreio=' +codigo_rastreio+'&dbname='+$scope.userDTO.configLisNet.defaultDB;
         $window.open(url, '_blank');
        }else{
            
        }
    };
    
    $scope.resumeNofificacao = function (){
    if($scope.userDTO && $scope.userDTO.notificacoes && $scope.userDTO.notificacoes.length < qdtNotificacaoResumida){
            $scope.notificacoesResumida = $scope.userDTO && $scope.userDTO.notificacoes;
    }else if($scope.userDTO && $scope.userDTO.notificacoes && $scope.userDTO.notificacoes.length > qdtNotificacaoResumida){
            $scope.notificacoesResumida =  $scope.userDTO.notificacoes.slice(0,qdtNotificacaoResumida);
    }else{
            $scope.notificacoesResumida =  $scope.userDTO.notificacoes;
    }
  
};
    
}

angular.module('lisnet').
        controller('notificacaoBarra',notificacaoBarra);