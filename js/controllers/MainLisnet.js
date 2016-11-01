/* 
 Created on : Oct 26, 2016, 3:22:15 PM
 Author     : eros
 */


function MainLisnet($http,$scope, $rootScope,$state, $location, buscaAPIService, montaUrlLaudoProvider, configLisNet,  deviceDetector,   $timeout,determinaAparelhoProvider,sairDoSistemaService,$localStorage,
    $sessionStorage,$window,gerenciaRelatorioService,$interval,$filter,$localStorage,$state,resumePerfilService,configuraLinks,  $rootScope , $ocLazyLoad, $injector,notificacaoProvider,shareuser) {
        console.log('Inicializando MainLisnet ..');
        
    $scope.$storage = $localStorage;
    this.login ;
    this.senha ;
    this.mostrar = true;
    
    var intDbLength = 3;
    var intMinimoDelay = 1000;
    var dialogLoading;
    
    deviceDetector.protocol = $location.protocol();
    deviceDetector.url = document.URL;
    deviceDetector.screenHeight = $window.screen.availHeight;
    deviceDetector.screenWidth = $window.screen.availWidth;

    deviceDetector.isMobileDevice = $location.protocol() === 'file' || !!window.cordova ? true : false;
    deviceDetector.isCordova = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;


    var _url = $location.protocol() + '://' + location.host + '/lisnet';
    var locationHostSplit = $location.host().split(".");
    var _param1DBName = $location.search()['dbname'];



    if ($localStorage.userDTO && typeof $localStorage.userDTO === 'object') {
//        console.log('login userDTO no $localStorage');
        this.userDTO = $localStorage.userDTO;
        
        configuraLinks.configuraLinksAcesso(this.userDTO);
        this.userDTO.deviceDetector = deviceDetector;

    } else {
        this.userDTO = {status: 'out', perfilId: 2, dtCriacao: new Date(), ultimaTela: 'login',notificationTimer:10000};
        configuraLinks.configuraLinksAcesso(this.userDTO);
       
    }
     buscaAPIService.buscaClientes(this.userDTO.configLisNet)
                .then(function successCallback(response) {
                    this.userDTO = $localStorage.userDTO;
                    this.userDTO.configLisNet.clientes = response.data;
                    console.log('this.userDTO.configLisNet.defaultDB = '+this.userDTO.configLisNet.defaultDB);
                    this.userDTO.cliente = montaUrlLaudoProvider.encontraClientePorNome(this.userDTO.configLisNet.clientes, this.userDTO.configLisNet.defaultDB);
                    this.userDTO.configLisNet.defaultDB = this.userDTO.cliente.CLI_ST_ORACLEUSERNAME;
//                    $scope.state = $state;
//                    console.log("$state.current.name = "+$state.current.name);
//                    $state.current.name = 'Porra....';
                    $localStorage.userDTO = this.userDTO;
                }, function errorCallback(response) {
                    console.log(response.statusText);
                });
    
    this.userDTO.deviceDetector = deviceDetector;
    $localStorage.userDTO = this.userDTO;
    


    this.cleanFields = function () {
        this.login = '';
        this.senha = '';
    };
    
    this.buscaUser = function (_param1, _param2) {
        if (_param1 && _param2 ) {
            
            var modalLoading = notificacaoProvider.modalLoading('Carregando ','Buscando usuário na base, aguarde  ...','MainLisnet');
            
            _param1 = _param1.toUpperCase();
            _param2 = _param2.toUpperCase();
                
                    buscaAPIService.buscaUsuarioAjax(_param1, _param2, this.userDTO.configLisNet)
                            .then(function successCallback(response) {
                                
                                var retorno = response.data;
//                                console.log('response.data = ' + JSON.stringify(retorno));;
                                if (retorno && retorno.USU_ST_NOME && retorno.USU_ST_SENHA && retorno.PUS_ST_CODIGO) {
                                    
                                    this.userDTO.USU_ST_NOME = retorno.USU_ST_NOME;
                                    this.userDTO.USU_ST_SENHA = retorno.USU_ST_SENHA;
                                    this.userDTO.USU_ST_CODIGO = retorno.USU_ST_CODIGO;
                                    this.userDTO.PUS_ST_CODIGO = retorno.PUS_ST_CODIGO;
                                    this.userDTO.USU_CH_ANATOMIA = retorno.USU_CH_ANATOMIA;
                                    this.userDTO.USU_CH_ATIVO = retorno.USU_CH_ATIVO;
                                    this.userDTO.USU_ST_EMAIL = retorno.USU_ST_EMAIL;
                                    this.userDTO.USU_IN_QTDDIA = retorno.USU_IN_QTDDIA;
//                                    this.log('$scope.userDTO.perfilId: '+this.userDTO.perfilId);
                                    $localStorage.userDTO = this.userDTO;
                                    buscaUsuarioMenu(_param1, this.userDTO.PUS_ST_CODIGO, modalLoading ,'widgets.lisnet') ;

                                } else {
                                    modalLoading.dismiss('cancel');
                                    $timeout(function () { 
                                        notificacaoProvider.sweetDialog("Usuário inválido", "Usuário não tem credencias para entrar no sistema, favor contactar o suporte. 2",'warning','red','X');
                                    }, intMinimoDelay);
                                }
                            }, function errorCallback(response) {
                                modalLoading.dismiss('cancel');
                                console.log(response.statusText);
//                                TODO loading with SweetDialog
                                $timeout(function () { 
                                    notificacaoProvider.sweetDialog("Sem acesso a internet", "Aplicativo sem acesso a internet ou Servidor fora do ar   erro =  " + response.data,'warning','red','X');
                                }
                            , intMinimoDelay);
                                $timeout(function () {}, 1000);
                            });
              
        } else {
            $timeout(function () { 
            notificacaoProvider.sweetDialog("Preencha os campos", 'Preencha todos os campos obrigatórios.','warning','red','X');}, intMinimoDelay);
        }
    };



    function  buscaUsuarioMenu(login, perfil,  modalLoading,stateGO) {
        buscaAPIService.buscaUsuarioMenuJSONAjax(login, perfil, this.userDTO.configLisNet)
                .then(function successCallback(response) {
                    this.userDTO.perfil = resumePerfilService.resume(response.data);
                    if (this.userDTO && this.userDTO.perfil && this.userDTO.perfil.length > 0) {
                        this.userDTO.status = 'in';
                        this.userDTO.dtLogon = $filter('date')(new Date(), " dd/MM/yyyy  HH:mm");
                        this.userDTO.ultimaTela = stateGO;
                        $localStorage.userDTO = this.userDTO;
                        $state.go(stateGO, {userDTO: angular.toJson(this.userDTO)});
                        shareuser.userDTO = this.userDTO;
                        $timeout(function () {
                            modalLoading.dismiss('cancel');
                                
                                 $timeout(function () {
                                      gerenciaRelatorioService.atualizaRelatorios(this.userDTO);
                                      buscaAPIService.buscaUnidades(this.userDTO.USU_ST_CODIGO, this.userDTO.configLisNet).then(function sucessCallBack(response) {
                                          this.userDTO.unidades = response.data;
                                             $localStorage.userDTO = this.userDTO;
                                      });
                                      buscaAPIService.buscaConvenios(this.userDTO.USU_ST_CODIGO, this.userDTO.configLisNet).then(function sucessCallBack(response) {
                                              this.userDTO.convenios = response.data;
                                               $localStorage.userDTO = this.userDTO;
                                      });
                                }, 2000);
                        }, 1500);
                        
                    } else {
                        modalLoading.dismiss('cancel');
                        $timeout(function () { 
                                    notificacaoProvider.sweetDialog("Usuário não tem credencias", 'Usuário não tem credencias para entrar no sistema, favor contactar o suporte.','info','red','X');}, intMinimoDelay);
                    }
                }, function errorCallback(response) {
                    modalLoading.dismiss('cancel');
                        $timeout(function () { 
                                    notificacaoProvider.sweetDialog("Sem conunicação", 'Sem internet ou servidor fora do ar .. ','info','red','X');
                                }, intMinimoDelay);
                                
                });
                
              
    };
    
    
    
    this.stateGO = function (stateGO) {
        this.userDTO.ultimaTela = stateGO;
        $localStorage.userDTO = this.userDTO;
        
        try{
//            $state.go(stateGO, {userDTO: angular.toJson(this.userDTO)});
            $state.go(stateGO);
    
        }catch (error){
            notificacaoProvider.sweetDialog("Erro", "Página não encontrada =  " + error,'warning','red','X');
            $state.go('problema.tela_nao_existe');
        }
    };

this.voltaLogo = function (MOD_ST_CODIGO){
        switch (MOD_ST_CODIGO){
            case "00001":
                return "fa fa-th-large";
           break;
           case "00003":
                return "fa fa-pencil-square-o";
           break;
            case "00007":
                return "fa fa-pie-chart";
           break;
            case "00005":
                return "fa fa-usd";
           break;
            case "00008":
                return "fa fa-cogs";
           break;
            case "00047":
                return "fa fa-life-ring";
           break;
            case "00128":
                return "fa fa-pie-chart";
           break;
           case "00129":
                return "fa fa-bar-chart";
           break;
           default:
           return "fa fa-tag";
           
        }  
    };

    this.logOut = function (){
        sairDoSistemaService.logOut();
    };

    $rootScope.$on("startNotificacaoTimer", function () {
        var _interacoes = 0;
        var _sleep = 60000;
        if (this.userDTO && this.userDTO.status && this.userDTO.status === 'in') {
            console.log('Atualizando lista de notificacoes ....');
            
            $timeout(function () { gerenciaRelatorioService.atualizaRelatorios(this.userDTO); }, 20000);
            if ($scope.userDTO && $scope.userDTO.job) {
                console.log('Job is runnig ...');
            } else {
                if (this.userDTO.job) {
                    $interval.cancel(this.userDTO.job);
                }
                this.userDTO.job = $interval(function () {
                    console.log('Starting startNotificacaoTimer .....');
                    _interacoes++;
//                console.log('job update relatorio rodando ... interacoes =  '+_interacoes+'     _sleep = '+_sleep);
                    gerenciaRelatorioService.atualizaRelatorios(this.userDTO);

//                    if (_interacoes >= 5) {
//                        _sleep = 120000;
//                    } else {
//                        _sleep = 60000;
//                    }
                }, _sleep);
            }
        } else {
            console.log('nothing to do ');
        }

    });

 if (this.userDTO && this.userDTO.ultimaTela) {
//            $scope.stageGO($scope.userDTO.ultimaTela);
//            $state.go($scope.userDTO.ultimaTela);
 }

// this.killTimer = function() {
//          if (angular.isDefined(this.userDTO.job)) {
//            $interval.cancel(this.userDTO.job);
//            this.userDTO.job = undefined;
//          }
//     };
  
//     console.log('Ultima linha userDTO is defined = '+ ( angular.isDefined(this.userDTO) ));




}




angular.module('lisnet')
        .controller('MainLisnet',MainLisnet);