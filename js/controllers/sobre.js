/* 
 Created on : Dec 14, 2016, 10:15:45 AM
 Author     : eros
 */



function sobre($scope,sairDoSistemaService){
    
    $scope.userDTO = sairDoSistemaService.validarLogin();
    
    
}



angular.module('lisnet')
        .controller('sobre',sobre);
