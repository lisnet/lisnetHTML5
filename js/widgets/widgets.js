/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : Oct 13, 2016, 3:37:39 PM
 Author     : eros
 */


function widgets($scope,sairDoSistemaService,$window,$localStorage){
//    $scope.userDTO = $localStorage.userDTO;
//    
//    if(angular.isUndefined($scope.userDTO) && !$scope.userDTO){
//        sairDoSistemaService.logOut();
//        $window.open('index.html', '_self');
//    }else if ($scope.userDTO && $scope.userDTO.status && $scope.userDTO.status === 'out') {
//        sairDoSistemaService.logOut();
//        $window.open('index.html', '_self');
//    }

sairDoSistemaService.validarLogin();
    
}

angular.module('lisnet').controller('widgets',widgets);