/*
 *  Login
 *  Author: eroskoller
 *
 */


function loginFunction($scope, $state, $location, buscaUsuarioSeviceAPI, montaUrlLaudoProvider, configLisNet, notificacaoProvider,  $window, deviceDetector,   $timeout,determinaAparelhoProvider,sairDoSistemaService,$localStorage,
    $sessionStorage) {
    
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
//        console.log('loginFunction userDTO no $localStorage');
        $scope.userDTO = $localStorage.userDTO;
        $scope.userDTO.deviceDetector = deviceDetector;
        if (_param1DBName && _param1DBName.length >= intDbLength) {

            if ($scope.userDTO.deviceDetector.isMobileDevice) {
                console.log("userDTO existem e mudando o dbname ...........");
                configLisNet.defaultDB = _param1DBName.toLowerCase();
                $scope.userDTO.configLisNet = configLisNet;
                _url = 'http://' + $scope.userDTO.configLisNet.defaultDB + '.lisnet.com.br/nodedev/lisnet';
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

        if (locationHostSplit[0] && locationHostSplit[0] != 'localhost' && locationHostSplit[0] != '192' && locationHostSplit[0] != '127' && locationHostSplit[0] != 'developer') {
            _url = $location.protocol() + '://' + location.host + '/nodedev/lisnet';
            if (_param1DBName && _param1DBName.length >= intDbLength) {
                configLisNet.defaultDB = _param1DBName.toLowerCase();
            } else {
                configLisNet.defaultDB = locationHostSplit[0].toLowerCase();
            }
            $scope.userDTO.configLisNet = configLisNet;
            $scope.userDTO.configLisNet.url = _url;
            $scope.userDTO.configLisNet.baseUrl = _url;
            $scope.userDTO.imageSrc = "resources/" + $scope.userDTO.configLisNet.defaultDB + "/img/logo_site.png";
            $scope.userDTO.cliente = montaUrlLaudoProvider.encontraClientePorNome(configLisNet.clientes, $scope.userDTO.configLisNet.defaultDB);
        } else if ($scope.userDTO.deviceDetector.isMobileDevice) { // mobile cordova phonegap
            if (_param1DBName && _param1DBName.length >= intDbLength) {
                configLisNet.defaultDB = _param1DBName.toLowerCase();
            }

            $scope.userDTO.configLisNet = configLisNet;
            _url = 'http://' + $scope.userDTO.configLisNet.defaultDB + '.lisnet.com.br/nodedev/lisnet';
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
        buscaUsuarioSeviceAPI.buscaClientes($scope.userDTO.configLisNet)
                .then(function successCallback(response) {
                    $scope.userDTO.configLisNet.clientes = response.data;
                    configLisNet.clientes = response.data;
                    $scope.userDTO.cliente = montaUrlLaudoProvider.encontraClientePorNome($scope.userDTO.configLisNet.clientes, $scope.userDTO.configLisNet.defaultDB);
                    $localStorage.userDTO = $scope.userDTO;
                }, function errorCallback(response) {
                    console.log(response.statusText);
                    $scope.userDTO.cliente = montaUrlLaudoProvider.encontraClientePorNome(configLisNet.clientes, $scope.userDTO.configLisNet.defaultDB);
                    $localStorage.userDTO = $scope.userDTO;
                });
    }


    $scope.cleanFields = function () {
        $scope.login = '';
        $scope.senha = '';
    };
    
    $scope.buscaUser = function (_param1, _param2, ev) {
        if (_param1 && _param2 ) {
            _param1 = _param1.toUpperCase();
            _param2 = _param2.toUpperCase();
                
                    buscaUsuarioSeviceAPI.buscaUsuarioAjax(_param1, _param2, $scope.userDTO.configLisNet)
                            .then(function successCallback(response) {
                                buscaUsuarioSeviceAPI.buscaUnidades($scope.userDTO.USU_ST_CODIGO, $scope.userDTO.configLisNet).then(function sucessCallBack(response) {
                                    $scope.userDTO.unidades = response.data;
                                });

                                buscaUsuarioSeviceAPI.buscaConvenios($scope.userDTO.USU_ST_CODIGO, $scope.userDTO.configLisNet).then(function sucessCallBack(response) {
                                    $scope.userDTO.convenios = response.data;
                                });
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
                                    determinaAparelhoProvider.isMobile($scope.userDTO.deviceDetector) ? buscaUsuarioMenu(_param1, $scope.userDTO.PUS_ST_CODIGO, ev, 'contrucao.contrucao') : buscaUsuarioMenu(_param1, $scope.userDTO.PUS_ST_CODIGO, ev, 'contrucao.contrucao');
                                    
                                    
                                    
                              
                                } else {
                                    $timeout(function () { 
//                                        if (!dialogLoading.$$state.status) { $mdDialog.hide(dialogLoading); }
                                    notificacaoProvider.sweetDialog("Usuário inválido", "Usuário não tem credencias para entrar no sistema, favor contactar o suporte. 2",'warning','red','X');
                                }, intMinimoDelay);
                                
                                }
                            }, function errorCallback(response) {
                                console.log(response.statusText);
//                                TODO loading with SweetDialog
                                $timeout(function () { 
//                                    if (!dialogLoading.$$state.status) { $mdDialog.hide(dialogLoading); }
//                                notificacaoProvider.showDialog("Sem acesso a internet", "Aplicativo sem acesso a internet ou Servidor fora do ar   erro =  " + response.data, 'Fechar', 'Aviso', ev);
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

 

    function  buscaUsuarioMenu(login, perfil, ev, stateGO) {
        buscaUsuarioSeviceAPI.buscaUsuarioMenuJSONAjax(login, perfil, $scope.userDTO.configLisNet)
                .then(function successCallback(response) {
                    $scope.userDTO.perfil = response.data;
                    if ($scope.userDTO && $scope.userDTO.perfil && $scope.userDTO.perfil.length > 0) {
                        $scope.userDTO.status = 'in';
                        $scope.userDTO.ultimaTela = stateGO;
                        $localStorage.userDTO = $scope.userDTO;
//                        loopaPerfil($scope.userDTO.perfil);
//                            console.log(  JSON.stringify($scope.userDTO.perfil , null , 2) );
                        $state.go(stateGO, {userDTO: angular.toJson($scope.userDTO)});
                    } else {
//                        notificacaoProvider.sweetDialog("Usuário não tem credencias", 'Usuário não tem credencias para entrar no sistema, favor contactar o suporte.','info','red','X');
                        $timeout(function () { 
//                            if (!dialogLoading.$$state.status) { $mdDialog.hide(dialogLoading); }
                                    notificacaoProvider.sweetDialog("Usuário não tem credencias", 'Usuário não tem credencias para entrar no sistema, favor contactar o suporte.','info','red','X');}, intMinimoDelay);
                    }
                }, function errorCallback(response) {
//                    notificacaoProvider.sweetDialog("Sem conunicação", 'Sem internet ou servidor fora do ar .','warning','red','X');
                        $timeout(function () { 
//                            if (!dialogLoading.$$state.status) { $mdDialog.hide(dialogLoading); }
                                                            notificacaoProvider.showDialogWarning("Sem conunicação", 'Sem internet ou servidor fora do ar .. ' + response.data, 'Fechar', 'Aviso', ev);}, intMinimoDelay);
//                    notificacaoProvider.showDialogWarning("Sem conunicação", 'Sem internet ou servidor fora do ar .. ' + response.data, 'Fechar', 'Aviso', ev);
                });
    };
    
    
    
    $scope.stageGO = function (stateGO) {
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
        console.log('loging Out dude ...');
        $localStorage.$reset({
            counter: 42
        });
        delete $localStorage.userDTO;
//        sairDoSistemaService.logOut();
        $state.go('login');
    };


$scope.acheiOFDP = function  (msg){
    if(msg == '00007.00263'){
        console.log(msg);    
    }else if(msg == '00263'){
        console.log(msg);    
    }
    
};

};


angular.module('lisnet')
        .controller('loginFunction', loginFunction);
