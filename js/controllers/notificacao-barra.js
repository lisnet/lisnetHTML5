/* 
 Created on : Oct 19, 2016, 4:46:04 PM
 Author     : eros
 */


/* global i, y, x */

function notificacaoBarra($scope, $window,sairDoSistemaService,$rootScope){
    
    console.log('Inicializando notificacaoBarra');
    $scope.userDTO = sairDoSistemaService.validarLogin();
    
     $scope.userDTO.bellClass = "label-primary";
    checkNewNotification();
    
    
    var qdtNotificacaoResumida = 6;
    $scope.notificacoesResumida = [];
    
    String.prototype.isNumber = function(){return /^\d+$/.test(this);};
    $scope.telaSelecionada = '';
    $scope.cortaString = function (str){
        var _array = str.split('|');
//        return _array[0];
        var idDaPagina = _array[0].trim();
        $scope.telaSelecionada = '';
        return idDaPagina;
    };
    $scope.cortaStringModStCodigo = function (str){
        var _array = str.split('|');
//        return _array[0];
//        var modStCodigo = _array[0].trim();
//        $scope.telaSelecionada = '';
        return  _array[0].trim();
    };
    $scope.states = [];
    $scope.states.push('controle.notificacoes | Controle de Notificações');
    $scope.states.push('widgets.lisnet | Home Painel de Widgets do Usuário, Inicio , Inĩcio, Começo, Casa');
    $scope.states.push('sair | Sair do Sistema quit exit :q');
    for (i in $scope.userDTO.perfil) {

        var p = $scope.userDTO.perfil[i];
//        $scope.states.push(p.MOD_ST_CODIGO);

        for (y in p.telas) {

            var f = p.telas[y];
            if (f.telas && f.telas.length > 0 ) {
                for (x in f.telas) {
                    var n = f.telas[x];
                    if (n.visualisar) {
                        $scope.states.push(n.state +' | '+n.MOD_ST_DESCRICAO+' | '+n.MOD_ST_CODIGO  );
                    }
                }
            } else {
                if(f.visualisar){
                    $scope.states.push(f.state +' | '+f.MOD_ST_DESCRICAO+' | '+f.MOD_ST_CODIGO);
                }
            }
            
        }
    }

    $scope.openRelatorio = function (status,codigo_rastreio){
        console.log('Inside openRelatorio codigo_rastreio = '+codigo_rastreio);
        if(status === 'B'){
            var url = $scope.userDTO.configLisNet.baseUrl +'/relatorio/download?codigo_rastreio=' +codigo_rastreio+'&dbname='+$scope.userDTO.configLisNet.defaultDB;
         $window.open(url, '_blank');
        }else{
            
        }
    };
    
    $scope.startTimer = function (){
        $rootScope.$broadcast("startNotificacaoTimer");
    };
    
    $scope.resumeNofificacao = function (){
        checkNewNotification();
    if($scope.userDTO && $scope.userDTO.notificacoes && $scope.userDTO.notificacoes.length < qdtNotificacaoResumida){
            $scope.notificacoesResumida = $scope.userDTO && $scope.userDTO.notificacoes;
    }else if($scope.userDTO && $scope.userDTO.notificacoes && $scope.userDTO.notificacoes.length > qdtNotificacaoResumida){
            $scope.notificacoesResumida =  $scope.userDTO.notificacoes.slice(0,qdtNotificacaoResumida);
    }else{
            $scope.notificacoesResumida =  $scope.userDTO.notificacoes;
    }
  $rootScope.$broadcast("startNotificacaoTimer");
};
 
 function checkNewNotification() {
        for (var x in $scope.userDTO.notificacoes) {
            var not = $scope.userDTO.notificacoes[x];
            if (not.isNew) {
                $scope.userDTO.bellClass =  "label-danger";
                break;
            }
        }
        $scope.userDTO.bellClass =   "label-primary";
    };
 
 }

angular.module('lisnet').
        controller('notificacaoBarra',notificacaoBarra);