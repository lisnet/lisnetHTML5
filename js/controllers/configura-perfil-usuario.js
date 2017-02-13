/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : Feb 13, 2017, 3:55:52 PM
 Author     : eros
 */


function configuraPerfilUsuario($scope, sairDoSistemaService, notificacaoProvider, buscaAPIService, $stateParams, $localStorage, $timeout, $filter,DTOptionsBuilder,helperService) {
    console.log('rodando configuraPerfilUsuario');
    
    //    var self = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
    if (!$scope.userDTO.configuraPerfil) {
        var _u  = $scope.userDTO;
        var _usuario = {USU_ST_NOME:_u.USU_ST_NOME,USU_ST_SENHA:_u.USU_ST_SENHA,USU_ST_EMAIL:_u.USU_ST_EMAIL};
        $scope.userDTO.configuraPerfil = {
            usuarioDB:_usuario,
                 usuario:helperService.clonadorDeObj(_usuario)};
    }
    $scope.paramsStateConfig = $stateParams;
    
    
}


angular.module('lisnet').
        controller('configuraPerfilUsuario',configuraPerfilUsuario);
