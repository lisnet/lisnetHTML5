/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : Oct 3, 2016, 11:15:16 AM
 Author     : eros
 */

function estatisticaFaturamento($scope, buscaUsuarioSeviceAPI, $stateParams, $localStorage, notificacaoProvider) {

$scope.userDTO = $localStorage.userDTO;

//    if ($stateParams.userDTO) {
//        console.log('Usando $stateParams');
//        $scope.userDTO = angular.fromJson($stateParams.userDTO);
//    } else {
//        $scope.userDTO = $localStorage.userDTO;
//    }

    


    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    estatisticaFaturamento  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');



    $scope.estatisticaFaturamento = {ordemRelatorio: 'unidade', tipoRelatorio: 'analitico', faturado: true, conferido: true, format: 'dd/MM/yyyy', dtInicio: new Date(), dtFim: new Date(), todasUnidades: true, todosConvenios: true, tipo: 'pdf', unidades: [], convenios: []};
    $scope.altInputFormats = ['MM/dd/yyyy'];
    $scope.dateOptions = {
        dateDisabled: false,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.popup = {
        inicio: false, fim: false
    };

    $scope.openPopInicio = function () {
        $scope.popup.inicio = true;
    };
    $scope.openPopFim = function () {
        $scope.popup.fim = true;
    };

    $scope.printJSON = function () {
        console.log(JSON.stringify($scope.estatisticaFaturamento, null, 4));
    };

    $scope.buscaUnidade = function (uniStCodigo) {
        for (var i = 0; i < $scope.userDTO.unidades.length; i++) {
            var uni = $scope.userDTO.unidades[i];
            console.log(uni.UNI_ST_CODIGO);
            if (uni.UNI_ST_CODIGO === uniStCodigo) {
                if(achaUnidade(uniStCodigo,$scope.estatisticaFaturamento.unidades)){
                    notificacaoProvider.sweetDialog("Aviso", "Unidade "+uniStCodigo+" jáf foi incluida", 'info', 'orange', 'X');
                }else{
                    $scope.estatisticaFaturamento.unidades.push(uni);
                    console.log('achei carai ' + JSON.stringify(uni));
                    delete $scope.uniStCodigo;
                    break;
                }
                
            }
        }
    };
    $scope.buscaConvenio = function (conStCodigo) {
        if ($scope.userDTO.convenios) {
            for (var i = 0; i < $scope.userDTO.convenios.length; i++) {
                var con = $scope.userDTO.convenios[i];
                console.log(con.CON_ST_CODIGO);
                if (con.CON_ST_CODIGO === conStCodigo) {
                    if(achaConvenio(conStCodigo,$scope.estatisticaFaturamento.convenios)){
                            notificacaoProvider.sweetDialog("Aviso", "Convênio "+conStCodigo+" jáf foi incluido", 'info', 'orange', 'X');
                    }else{
                            $scope.estatisticaFaturamento.convenios.push(con);
                            console.log('achei carai ' + JSON.stringify(con));
                            delete $scope.conStCodigo;
                            break;
                    }
                }
            }
        } else {
            notificacaoProvider.sweetDialog("Erro", "Vocẽ não possue convênios em seu  usuário  ", 'warning', 'red', 'X');
        }
    };
     $scope.removerUnidade =  function (uniStCodigo){
         achaUnidade(uniStCodigo,$scope.estatisticaFaturamento.unidades,true);
     } ;
     $scope.removerConvenio =  function (conStCodigo){
         achaConvenio(conStCodigo,$scope.estatisticaFaturamento.convenios,true);
     } ;
     
    function achaUnidade (uniStCodigo, arrayUnidades,remover){
        if(arrayUnidades && arrayUnidades.length > 0){
            for(var i = 0 ; i < arrayUnidades.length; i ++){
                var uni = arrayUnidades[i];
                if(uni.UNI_ST_CODIGO === uniStCodigo){
                    if(remover){
                        arrayUnidades.splice(i,1);
                    }
                    return true;
                }
            }
        }else{
            return false;
        }
    };
};

function achaConvenio(conStCodigo, arrayConvenios,remover){
    if(arrayConvenios && arrayConvenios.length > 0){
            for(var i = 0 ; i < arrayConvenios.length; i ++){
                var con = arrayConvenios[i];
                if(con.CON_ST_CODIGO === conStCodigo){
                     if(remover){
                        arrayConvenios.splice(i,1);
                    }
                    return true;
                }
            }
        }else{
            return false;
        }
};

angular.module('lisnet')
        .controller('estatisticaFaturamento', estatisticaFaturamento);
