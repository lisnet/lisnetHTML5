/* 
 * Here comes the text of your license
 * Each line should be prefixed with  * 
 */


angular.module('lisnet')
        .service('sairDoSistemaService', function ($state, $localStorage, $sessionStorage) {

    this.logOut = function () {
//        console.log("rodando sairDoSistema() .........................");
//        $localStorage.userDTO = 2;
//        localStorage.removeItem('userDTO');
        delete $localStorage.userDTO;
//        localStorage.removeItem('urlLaudo');
        delete $localStorage.urlLaudo;
//        localStorage.removeItem('urlLaudoPDF');
        delete $localStorage.urlLaudoPDF;
//        localStorage.clear();
//        $localStorage.$reset();
//        $sessionStorage.$reset();
        
    };

});


