/* 
 Created on : Dec 14, 2016, 10:15:45 AM
 Author     : eros
 */



function sobre($scope,sairDoSistemaService){
    
    $scope.userDTO = sairDoSistemaService.validarLogin();
    $scope.varSimple ="test Thiago";
    $scope.arraySimple = ['test array','second test Array',2,3,new Date()];
    $scope.simpleJSON = {firstVar: 'Sei Lah oque', secondVar:'Nunsei di Nada', simpleDate:new Date()};
    $scope.typeOfArray  = typeof $scope.arraySimple;
    
    /**
     * 
     * @param {type} position
     * @returns {Number|String|Date}
     */
    $scope.buscaPosicaoArray = function (position){
        return $scope.arraySimple[position];
    };
    
}



angular.module('lisnet')
        .controller('sobre',sobre);
