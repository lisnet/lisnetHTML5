/* 
 Created on : Jan 12, 2016, 1:37:18 PM
 Author     : eros
 */


angular.module('lisnet')
        .service('sairDoSistemaService', function ($state, $localStorage, $window, $rootScope,shareuser,$location) {

            this.logOut = function () {
                console.log('saindo do sistema, limpando o cache  ...');
                  delete shareuser;
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
//                    console.log('$state.current.name = '+$state.current.name+'  $location.path()  : '+$location.path());
                    
                    $window.open('index.html', '_self');
                
            };
            
            this.validarLogin = function () {
                var userDTO = this.validaUserDTO();
                if(shareuser.userDTO && shareuser.userDTO.perfil  ){
                    console.log('Pegando do share service  da memoria ...');
//                    userDTO = shareuser.userDTO;
                }else{
                    shareuser.userDTO = userDTO;
                    console.log('Pegando do $localStorage ...');
                }
                
                if (userDTO && userDTO.USU_CH_ATIVO && userDTO.USU_CH_ATIVO === 'S' && userDTO.perfil && userDTO.status && userDTO.status === 'in') {
                    return userDTO;
                } else {
                    console.log('login invalido , saindo do sistema agora ..');
                        this.logOut();
                }
                
            };
            
            this.validaUserDTO = function (){
                return shareuser.userDTO && shareuser.userDTO.perfil ? shareuser.userDTO : $localStorage.userDTO;
            };


        });


