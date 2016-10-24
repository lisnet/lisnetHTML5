/* 
 Created on : Jan 12, 2016, 1:37:18 PM
 Author     : eros
 */


angular.module('lisnet')
        .service('sairDoSistemaService', function ($state, $localStorage,$window) {

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
      this.validarLogin = function (){
          var userDTO = $localStorage.userDTO;
        if(!userDTO ){
          this.logOut();
          $window.open('index.html', '_self');
      }else if (userDTO && !userDTO.status) {
          this.logOut();
          $window.open('index.html', '_self');
      }else if (userDTO && userDTO.status && userDTO.status === 'out') {
          this.logOut();
          $window.open('index.html', '_self');
      }else{
          console.log('validarLogin ....');
      }  
    };
  

});


