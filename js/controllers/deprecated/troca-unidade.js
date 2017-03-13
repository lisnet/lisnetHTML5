///* 
// Created on : Dec 20, 2016, 4:17:52 PM
// Author     : eros
// */
//
//
//
//angular.module('lisnet').controller('trocaUnidade', function ($scope, $uibModal, DTOptionsBuilder, sairDoSistemaService, helperService, $uibModal) {
//
//    var wd = this;
//
//
//    $scope.userDTO = sairDoSistemaService.validarLogin();
//
//    $scope.escolheUnidade = function (uniStCodigo) {
//        $scope.userDTO.unidade = helperService.retornaUnidade(uniStCodigo, $scope.userDTO.unidades);
//    };
//
//
//    $scope.popUnidades = function () {
//
//        var modalInstance = $uibModal.open({
//            templateUrl: 'views/troca_unidade_modal.html',
//            size: 'lg',
//            controller: ModalInstanceCtrl,
//            scope: $scope
//        });
//
//    };
//
//    function ModalInstanceCtrl($scope, $uibModalInstance) {
//
//        $scope.ok = function () {
//            $uibModalInstance.close();
//        };
//
//        $scope.cancel = function () {
//            $uibModalInstance.dismiss('cancel');
//        };
//    }
//
//
//
//
//});
//
