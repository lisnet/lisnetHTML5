/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : Oct 3, 2016, 11:15:16 AM
 Author     : eros
 */

function estatisticaFaturamento($scope){
    
     
    $scope.estatisticaFaturamento = {ordemRelatorio: 'unidade', tipoRelatorio: 'analitico', faturado: true, conferido: true, format: 'dd/MM/yyyy', dtInicio: new Date(), dtFim: new Date()};
    $scope.altInputFormats = ['MM/dd/yyyy'];
    $scope.dateOptions = {
        dateDisabled: false,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };
  
  $scope.popup = {
        inicio: false,fim:false
  };
    
    $scope.openPopInicio = function () {
        $scope.popup.inicio = true;
    };
    $scope.openPopFim = function () {
        $scope.popup.fim = true;
    };
    
    $scope.printJSON = function (){
        console.log(JSON.stringify($scope.estatisticaFaturamento,null,4));
    };
    
};

angular.module('lisnet')
        .controller('estatisticaFaturamento',estatisticaFaturamento);
