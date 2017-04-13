/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : Apr 13, 2017, 10:29:03 AM
 Author     : eros
 */



function criacaoFormularioUsuario($scope, $state, buscaAPIService, $stateParams, sairDoSistemaService, notificacaoProvider, $timeout, DTOptionsBuilder, helperService, $filter,buscaAPIService,$q) {
    
    var self = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
    self.u = $scope.userDTO;
    if(!$scope.userDTO.configFormularioUsuario ){
        $scope.userDTO.configFormularioUsuario = {step:"00504.define_detalhes"};
        $state.go(self.u.configFormularioUsuario.step);
    }
    
};


angular.module('lisnet').
        controller('criacaoFormularioUsuario',criacaoFormularioUsuario);

