/*
 *  Login
 *  Author: eroskoller
 *  http://stackoverflow.com/questions/16619740/angular-should-i-use-this-or-scope
 *  http://stackoverflow.com/questions/24830679/why-do-we-use-rootscope-broadcast-in-angularjs
 *
 */


function login($scope, $rootScope,$state, $location, buscaAPIService, montaUrlLaudoProvider, configLisNet, notificacaoProvider,  deviceDetector,   $timeout,determinaAparelhoProvider,sairDoSistemaService,$localStorage,
    $sessionStorage,$window,gerenciaRelatorioService,$interval,$filter,$localStorage,$state,resumePerfilService) {
    
    console.log('Inicializando login');
    
     $scope.killTimer = function() {
          if (angular.isDefined($scope.userDTO.job)) {
            $interval.cancel($scope.userDTO.job);
            $scope.userDTO.job = undefined;
          }
     };
    
//   var arrayStateObj =$state.get();
   
//   for(i in arrayStateObj){
//       arrayRegistros.push(arrayStateObj[i].name);
//   }
    
//    console.log(JSON.stringify($state.get(),null,4));
//    console.log(arrayRegistros);
    
    $scope.$storage = $localStorage;
    
    $scope.login ;
    $scope.senha ;
    $scope.mostrar = true;
    var intDbLength = 3;
    var intMinimoDelay = 1000;
    var dialogLoading;
    
    deviceDetector.protocol = $location.protocol();
    deviceDetector.url = document.URL;
    deviceDetector.screenHeight = $window.screen.availHeight;
    deviceDetector.screenWidth = $window.screen.availWidth;

    deviceDetector.isMobileDevice = $location.protocol() == 'file' || !!window.cordova ? true : false;
    deviceDetector.isCordova = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
//    delete $localStorage.userDTO;

    $scope.perfis = [{id: 0, icon: "fa fa-user", perfil: "Paciente"}
//        , {id: 2, icon: "fa fa-search", perfil: "Consultas"}
    ];

    var _url = $location.protocol() + '://' + location.host + '/lisnet';
    var locationHostSplit = $location.host().split(".");
    var _param1DBName = $location.search()['dbname'];


    if ($localStorage.userDTO && typeof $localStorage.userDTO === 'object') {
//        console.log('login userDTO no $localStorage');
        $scope.userDTO = $localStorage.userDTO;
        $scope.userDTO.deviceDetector = deviceDetector;
        if (_param1DBName && _param1DBName.length >= intDbLength) {

            if ($scope.userDTO.deviceDetector.isMobileDevice) {
                console.log("userDTO existem e mudando o dbname ...........");
                configLisNet.defaultDB = _param1DBName.toLowerCase();
                $scope.userDTO.configLisNet = configLisNet;
                //TODO tornar mais dinamico
                _url = 'http://' + $scope.userDTO.configLisNet.defaultDB + '.lisnet.com.br/nodehomolog/lisnet';
                $scope.userDTO.configLisNet.url = _url;
                $scope.userDTO.configLisNet.baseUrl = _url;
                $scope.userDTO.imageSrc = "resources/" + $scope.userDTO.configLisNet.defaultDB + "/img/logo_site.png";
                $localStorage.userDTO = $scope.userDTO;
            } else {
                configLisNet.defaultDB = _param1DBName.toLowerCase();
                $scope.userDTO.configLisNet = configLisNet;
                $scope.userDTO.imageSrc = "resources/" + $scope.userDTO.configLisNet.defaultDB + "/img/logo_site.png";
                console.log(JSON.stringify($scope.userDTO.deviceDetector, null, 2));
                $localStorage.userDTO = $scope.userDTO;
            }
        }
        if ($scope.userDTO.ultimaTela) {
//            $scope.stageGO($scope.userDTO.ultimaTela);
//            $state.go($scope.userDTO.ultimaTela);
        }
//        console.log(JSON.stringify($scope.userDTO.configLisNet));

    } else {
        $scope.userDTO = {status: 'out', perfilId: 2, dtCriacao: new Date(), ultimaTela: 'login'};
        $scope.userDTO.deviceDetector = deviceDetector;

        if (locationHostSplit[0] && locationHostSplit[0] !== 'localhost' && locationHostSplit[0] !== '192' && locationHostSplit[0] !== '127' && locationHostSplit[0] !== 'developer') {
            _url = $location.protocol() + '://' + location.host + '/nodehomolog/lisnet';
            if (_param1DBName && _param1DBName.length >= intDbLength) {
                configLisNet.defaultDB = _param1DBName.toLowerCase();
            } else {
                configLisNet.defaultDB = locationHostSplit[0].toLowerCase();
            }
            $scope.userDTO.configLisNet = configLisNet;
            $scope.userDTO.configLisNet.url = _url;
            $scope.userDTO.configLisNet.baseUrl = _url;
            $scope.userDTO.imageSrc = "resources/" + $scope.userDTO.configLisNet.defaultDB + "/img/logo_site.png";
            //TODO proper load of clients
//            $scope.userDTO.cliente = montaUrlLaudoProvider.encontraClientePorNome(configLisNet.clientes, $scope.userDTO.configLisNet.defaultDB);
        } else if ($scope.userDTO.deviceDetector.isMobileDevice) { // mobile cordova phonegap
            if (_param1DBName && _param1DBName.length >= intDbLength) {
                configLisNet.defaultDB = _param1DBName.toLowerCase();
            }

            $scope.userDTO.configLisNet = configLisNet;
            _url = 'http://' + $scope.userDTO.configLisNet.defaultDB + '.lisnet.com.br/nodehomolog/lisnet';
            $scope.userDTO.configLisNet.url = _url;
            $scope.userDTO.configLisNet.baseUrl = _url;
            $scope.userDTO.imageSrc = "resources/" + $scope.userDTO.configLisNet.defaultDB + "/img/logo_site.png";
        } else {
            if (_param1DBName && _param1DBName.length >= intDbLength) {
                configLisNet.defaultDB = _param1DBName.toLowerCase();
            }
            $scope.userDTO.configLisNet = configLisNet;
            $scope.userDTO.configLisNet.url = _url;
            $scope.userDTO.configLisNet.baseUrl = _url;
            $scope.userDTO.imageSrc = "resources/" + $scope.userDTO.configLisNet.defaultDB + "/img/logo_site.png";
        }
        buscaAPIService.buscaClientes($scope.userDTO.configLisNet)
                .then(function successCallback(response) {
                    $scope.userDTO.configLisNet.clientes = response.data;
                    configLisNet.clientes = response.data;
                    $scope.userDTO.cliente = montaUrlLaudoProvider.encontraClientePorNome($scope.userDTO.configLisNet.clientes, $scope.userDTO.configLisNet.defaultDB);
                    $scope.userDTO.configLisNet.defaultDB = $scope.userDTO.cliente.CLI_ST_ORACLEUSERNAME;
                    $localStorage.userDTO = $scope.userDTO;
                }, function errorCallback(response) {
                    console.log(response.statusText);
                    $scope.userDTO.cliente = montaUrlLaudoProvider.encontraClientePorNome(configLisNet.clientes, $scope.userDTO.configLisNet.defaultDB);
                    $localStorage.userDTO = $scope.userDTO;
                });
    }

    if( $scope.userDTO && $scope.userDTO.status === "out"  ){
        console.log('Usuario esta fora....');
//        notificacaoProvider.sweetWarning('Out','Get a fuck out at here ... dude ....');
        sairDoSistemaService.logOut();
    }else{
//        console.log('usuário autorizado, com credenciais ..');
    }


    $scope.cleanFields = function () {
        $scope.login = '';
        $scope.senha = '';
    };
    
    $scope.buscaUser = function (_param1, _param2, ev) {
        if (_param1 && _param2 ) {
            
            var modalLoading = notificacaoProvider.modalLoading('Carregando ','Buscando usuário na base, aguarde  ...','login');
            
            _param1 = _param1.toUpperCase();
            _param2 = _param2.toUpperCase();
                
                    buscaAPIService.buscaUsuarioAjax(_param1, _param2, $scope.userDTO.configLisNet)
                            .then(function successCallback(response) {
                                
                                var retorno = response.data;
//                                console.log('response.data = ' + JSON.stringify(retorno));;
                                if (retorno && retorno.USU_ST_NOME && retorno.USU_ST_SENHA && retorno.PUS_ST_CODIGO) {
                                    
                                    $scope.userDTO.USU_ST_NOME = retorno.USU_ST_NOME;
                                    $scope.userDTO.USU_ST_SENHA = retorno.USU_ST_SENHA;
                                    $scope.userDTO.USU_ST_CODIGO = retorno.USU_ST_CODIGO;
                                    $scope.userDTO.PUS_ST_CODIGO = retorno.PUS_ST_CODIGO;
                                    $scope.userDTO.USU_CH_ANATOMIA = retorno.USU_CH_ANATOMIA;
                                    $scope.userDTO.USU_CH_ATIVO = retorno.USU_CH_ATIVO;
                                    $scope.userDTO.USU_ST_EMAIL = retorno.USU_ST_EMAIL;
                                    $scope.userDTO.USU_IN_QTDDIA = retorno.USU_IN_QTDDIA;
                                    console.log('$scope.userDTO.perfilId: '+$scope.userDTO.perfilId);
                                    $localStorage.userDTO = $scope.userDTO;
                                    buscaUsuarioMenu(_param1, $scope.userDTO.PUS_ST_CODIGO, ev,modalLoading ,'widgets.lisnet') ;

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
//                if (!dialogLoading.$$state.status) { $mdDialog.hide(dialogLoading); }
            notificacaoProvider.sweetDialog("Preencha os campos", 'Preencha todos os campos obrigatórios.','warning','red','X');}, intMinimoDelay);
        }
    };

    $scope.userDTO.arrayRegistros =  ["", "login", "widgets", "widgets.lisnet", "erro", "contrucao", "contrucao.contrucao", "controle", "controle.notificacoes", "00001", "00001.00273", "00007", "00007.00263"];
//    $scope.validaState = function (stateRegistro){
//        
//        for(var i =0; i <   $scope.userDTO.arrayRegistros.length ; i ++){
//            console.log('arrayRegistros[i] = '+$scope.userDTO.arrayRegistros[i]);
//            if($scope.userDTO.arrayRegistros[i] === stateRegistro){
//                console.log('Inside validaState = '+stateRegistro+'  achei ...');
//                return true;
//            }
//            return false;
//        }
////        return f
//    };

    function  buscaUsuarioMenu(login, perfil, ev, modalLoading,stateGO) {
        buscaAPIService.buscaUsuarioMenuJSONAjax(login, perfil, $scope.userDTO.configLisNet)
                .then(function successCallback(response) {
//                    var perfil =    response.data;
//                    $scope.userDTO.perfil = response.data;
                    $scope.userDTO.perfil = resumePerfilService.resume(response.data);
//                    console.log('JSON.stringify($scope.userDTO.perfil,null,4)  = \n '+JSON.stringify($scope.userDTO.perfil,null,4));
                    if ($scope.userDTO && $scope.userDTO.perfil && $scope.userDTO.perfil.length > 0) {
                        $scope.userDTO.status = 'in';
                        $scope.userDTO.dtLogon = $filter('date')(new Date(), " dd/MM/yyyy  HH:mm");
                        $scope.userDTO.ultimaTela = stateGO;
                        $localStorage.userDTO = $scope.userDTO;

                        $timeout(function () {
                            modalLoading.dismiss('cancel');
                                $state.go(stateGO, {userDTO: angular.toJson($scope.userDTO)});
                                 $timeout(function () {
                                    modalLoading.dismiss('cancel');
                                      gerenciaRelatorioService.atualizaRelatorios($scope);
                                      buscaAPIService.buscaUnidades($scope.userDTO.USU_ST_CODIGO, $scope.userDTO.configLisNet).then(function sucessCallBack(response) {
                                          $scope.userDTO.unidades = response.data;
                                      });
                                      buscaAPIService.buscaConvenios($scope.userDTO.USU_ST_CODIGO, $scope.userDTO.configLisNet).then(function sucessCallBack(response) {
                                              $scope.userDTO.convenios = response.data;
                                               $localStorage.userDTO = $scope.userDTO;
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
                                    notificacaoProvider.showDialogWarning("Sem conunicação", 'Sem internet ou servidor fora do ar .. ' + response.data, 'Fechar', 'Aviso', ev);}, intMinimoDelay);
                });
                
              
    };
    
    
    
    $scope.stageGO = function (stateGO) {
//        console.log('Inside stageGO .....');
//        $scope.userDTO.dtLogon = new Date();
        $scope.userDTO.ultimaTela = stateGO;
        $localStorage.userDTO = $scope.userDTO;
        try{
            $state.go(stateGO, {userDTO: angular.toJson($scope.userDTO)});
        }catch (error){
            notificacaoProvider.sweetDialog("Erro", "Página não encontrada =  " + error,'warning','red','X');
            $state.go('contrucao.contrucao');
        }
        
    };

$scope.voltaLogo = function (MOD_ST_CODIGO){
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

    $scope.logOut = function (){
         $interval.cancel($scope.userDTO.job);
         
        $scope.userDTO.status= 'out';
        console.log('loging Out dude ...');
        $rootScope = $rootScope.$new(true);
        $scope = $scope.$new(true);
        sairDoSistemaService.logOut();
        $state.go('login');
    };


//$scope.acheiOFDP = function  (msg){
//    if(msg == '00007.00263'){
//        console.log(msg);    
//    }else if(msg == '00263'){
//        console.log(msg);    
//    }
//};
//$scope.notificacoesResumida = [];
//$scope.notificacoesEnxecucao = 0;
//$scope.resumeNofificacao = function (){
//    if($scope.userDTO && $scope.userDTO.notificacoes && $scope.userDTO.notificacoes.length < qdtNotificacaoResumida){
//            $scope.notificacoesResumida = $scope.userDTO && $scope.userDTO.notificacoes;
//    }else if($scope.userDTO && $scope.userDTO.notificacoes && $scope.userDTO.notificacoes.length > qdtNotificacaoResumida){
//            $scope.notificacoesResumida =  $scope.userDTO.notificacoes.slice(0,qdtNotificacaoResumida);
//    }else{
//            $scope.notificacoesResumida =  $scope.userDTO.notificacoes;
//    }
//  
//};;


  
    if ($scope.userDTO && $scope.userDTO.status &&  $scope.userDTO.status === 'in') {
        if($scope.userDTO.job){
            $interval.cancel($scope.userDTO.job);
        }
        $scope.userDTO.job = $interval(function () {
            console.log('job update relatorio rodando ...');
                gerenciaRelatorioService.atualizaRelatorios($scope);
        }, 30000);
    }



};


angular.module('lisnet')
        .controller('login', login);
