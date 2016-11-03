/* 
 Created on : Jan 12, 2016, 1:37:18 PM
 Author     : eros
 */


angular.module('lisnet')
        .service('sairDoSistemaService', function ($state, $localStorage, $window, $rootScope,shareuser) {

            this.logOut = function () {
                console.log('saindo do sistema, limpando o cache  ...');
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

                
                $rootScope = $rootScope.$new(true);
//            $scope = $scope.$new(true);

                $window.open('index.html', '_self');
            };
            this.validarLogin = function () {
                var userDTO;
                if(shareuser.userDTO && shareuser.userDTO.perfil  ){
                    console.log('Pegando do share service ...');
                    userDTO = shareuser.userDTO;
                }else{
                    console.log('Pegando do $localStorage ...');
                    userDTO = $localStorage.userDTO;
                }
                
                if (!userDTO) {
                    this.logOut();
//                    $window.open('index.html', '_self');
                } else if (userDTO && !userDTO.status) {
                    this.logOut();
//                    $window.open('index.html', '_self');
                } else if (userDTO && userDTO.status && userDTO.status === 'out') {
                    this.logOut();
//                    $window.open('index.html', '_self');
                } else {
                    return userDTO;
                    console.log('validarLogin ....');
                }
                
                
                
            };


        });


