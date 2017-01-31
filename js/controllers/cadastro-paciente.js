/* 
 * 
 * https://www.golden-layout.com
 */

/* 
 Created on : Jan 9, 2017, 12:17:42 PM
 Author     : eros
 */


function cadastroPaciente($scope,sairDoSistemaService){
    
    var self = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
    
}


angular.module('lisnet')
        .controller('cadastroPaciente',cadastroPaciente);