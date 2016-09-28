/*
 *  Login
 *  Author: eroskoller
 *
 */


function loginFunction($scope, $state, $location, buscaUsuarioSeviceAPI, montaUrlLaudoProvider, configLisNet, notificacaoProvider, $localStorage, $window, deviceDetector,   $timeout,determinaAparelhoProvider,sairDoSistemaService) {
    
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
//            $state.go($scope.userDTO.ultimaTela);
        }

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
                                var retorno = response.data;
                                console.log('response.data = ' + JSON.stringify(retorno));
                                if (retorno && retorno.USU_ST_NOME && retorno.USU_ST_SENHA && retorno.PUS_ST_CODIGO) {
                                    
                                    $scope.userDTO.USU_ST_NOME = retorno.USU_ST_NOME;
                                    $scope.userDTO.USU_ST_SENHA = retorno.USU_ST_SENHA;
                                    $scope.userDTO.USU_ST_CODIGO = retorno.USU_ST_CODIGO;
                                    $scope.userDTO.PUS_ST_CODIGO = retorno.PUS_ST_CODIGO;
                                    $scope.userDTO.USU_CH_ANATOMIA = retorno.USU_CH_ANATOMIA;
                                    $scope.userDTO.USU_CH_ATIVO = retorno.USU_CH_ATIVO;
                                    $scope.userDTO.USU_ST_EMAIL = retorno.USU_ST_EMAIL;
                                    $scope.userDTO.USU_IN_QTDDIA = retorno.USU_IN_QTDDIA;
                                    
                                    $localStorage.userDTO = $scope.userDTO;
                                    console.log('$scope.userDTO.perfilId: '+$scope.userDTO.perfilId);
                                    
                                    determinaAparelhoProvider.isMobile($scope.userDTO.deviceDetector) ? buscaUsuarioMenu(_param1, $scope.userDTO.PUS_ST_CODIGO, ev, 'dashboards.dashboard_1') : buscaUsuarioMenu(_param1, $scope.userDTO.PUS_ST_CODIGO, ev, 'dashboards.dashboard_1');
                              
                                } else {
                                    $timeout(function () { 
//                                        if (!dialogLoading.$$state.status) { $mdDialog.hide(dialogLoading); }
                                    notificacaoProvider.showDialog("Usuário não tem credencias", 'Usuário não tem credencias para entrar no sistema, favor contactar o suporte. 2', 'Fechar', 'Aviso', ev);}, intMinimoDelay);
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
                        $localStorage.userDTO = $scope.userDTO;
                        $state.go(stateGO, {userDTO: angular.toJson($scope.userDTO)});
                    } else {
//                        notificacaoProvider.sweetDialog("Usuário não tem credencias", 'Usuário não tem credencias para entrar no sistema, favor contactar o suporte.','info','red','X');
                        $timeout(function () { 
//                            if (!dialogLoading.$$state.status) { $mdDialog.hide(dialogLoading); }
                                    notificacaoProvider.sweetDialog("Usuário não tem credencias", 'Usuário não tem credencias para entrar no sistema, favor contactar o suporte.','info','red','X');}, intMinimoDelay);
                    }
                }, function errorCallback(response) {
//                    notificacaoProvider.sweetDialog("Sem conunicação", 'Sem internet ou servidor fora do ar .','warning','red','X');
                        $timeout(function () { if (!dialogLoading.$$state.status) { $mdDialog.hide(dialogLoading); }
                                                            notificacaoProvider.showDialogWarning("Sem conunicação", 'Sem internet ou servidor fora do ar .. ' + response.data, 'Fechar', 'Aviso', ev);}, intMinimoDelay);
//                    notificacaoProvider.showDialogWarning("Sem conunicação", 'Sem internet ou servidor fora do ar .. ' + response.data, 'Fechar', 'Aviso', ev);
                });
    };

    function atualizaRequisicao(req_in_codigo, pac_in_codigo) {
        var xhttp = buscaUsuarioSeviceAPI.atualizaVisualizacao(pac_in_codigo, $scope.userDTO.configLisNet);
        xhttp.onerror = function (e) {
//            showDialog("Sem acesso a internet", "Aplicativo sem acesso a internet ou Servidor fora do ar", 'Fechar', 'Aviso', ev);
        };
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
//                console.log(xhttp.responseText);
                $scope.msg = 'Requisicao atualizada com sucesso';
            } else {
                $scope.msg = 'Problemas na atualizadacao';
            }
        };
    };

    $scope.logOut = function (){
        sairDoSistemaService.logOut();
    };


};


angular.module('lisnet')
        .controller('loginFunction', loginFunction);
