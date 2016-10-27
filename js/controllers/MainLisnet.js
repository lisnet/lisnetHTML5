/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : Oct 26, 2016, 3:22:15 PM
 Author     : eros
 */


function MainLisnet($http,$scope, $rootScope,$state, $location, buscaAPIService, montaUrlLaudoProvider, configLisNet,  deviceDetector,   $timeout,determinaAparelhoProvider,sairDoSistemaService,$localStorage,
    $sessionStorage,$window,gerenciaRelatorioService,$interval,$filter,$localStorage,$state,resumePerfilService,configuraLinks,  $rootScope , $ocLazyLoad, $injector,notificacaoProvider) {
        console.log('Inicializando MainLisnet ..');
        

    
//    this.userDTO = {status: 'out', perfilId: 2, dtCriacao: new Date(), ultimaTela: 'login'};

    
    $scope.$storage = $localStorage;
    this.teste = 'holly fuck  dude ...';
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
//    delete $localStorage.userDTO;

    this.perfis = [{id: 0, icon: "fa fa-user", perfil: "Paciente"}
//        , {id: 2, icon: "fa fa-search", perfil: "Consultas"}
    ];

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
//        $scope.userDTO.configLisNet = configLisNet;
        configuraLinks.configuraLinksAcesso(this.userDTO);
//        console.log('JSON.stringify(this.userDTO) = '+JSON.stringify(this.userDTO));
//        this.userDTO = $localStorage.userDTO;
       
    }
     buscaAPIService.buscaClientes(this.userDTO.configLisNet)
                .then(function successCallback(response) {
                    this.userDTO = $localStorage.userDTO;
//                    console.log('JSON.stringify(this.userDTO) = '+JSON.stringify(this.userDTO));
                    this.userDTO.configLisNet.clientes = response.data;
//                    console.log('JSON.stringify(this.userDTO) = '+JSON.stringify(this.userDTO));
//                    configLisNet.clientes = response.data;
                    this.userDTO.cliente = montaUrlLaudoProvider.encontraClientePorNome(this.userDTO.configLisNet.clientes, this.userDTO.configLisNet.defaultDB);
                    this.userDTO.configLisNet.defaultDB = this.userDTO.cliente.CLI_ST_ORACLEUSERNAME;
                    $localStorage.userDTO = this.userDTO;
                }, function errorCallback(response) {
                    console.log(response.statusText);
//                    this.userDTO.cliente = montaUrlLaudoProvider.encontraClientePorNome(this.userDTO.configLisNet.clientes, this.userDTO.configLisNet.defaultDB);
//                    $localStorage.userDTO = this.userDTO;
                });
    
    this.userDTO.deviceDetector = deviceDetector;
    $localStorage.userDTO = this.userDTO;
    
//    if( this.userDTO && this.userDTO.status === "out"  ){
//        console.log('Usuario esta fora....');
//        sairDoSistemaService.logOut();
//    }


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
//                if (!dialogLoading.$$state.status) { $mdDialog.hide(dialogLoading); }
            notificacaoProvider.sweetDialog("Preencha os campos", 'Preencha todos os campos obrigatórios.','warning','red','X');}, intMinimoDelay);
        }
    };

//    $scope.userDTO.arrayRegistros =  ["", "login", "widgets", "widgets.lisnet", "erro", "contrucao", "contrucao.contrucao", "controle", "controle.notificacoes", "00001", "00001.00273", "00007", "00007.00263"];
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

    function  buscaUsuarioMenu(login, perfil,  modalLoading,stateGO) {
        buscaAPIService.buscaUsuarioMenuJSONAjax(login, perfil, this.userDTO.configLisNet)
                .then(function successCallback(response) {
//                    var perfil =    response.data;
//                    $scope.userDTO.perfil = response.data;
                    this.userDTO.perfil = resumePerfilService.resume(response.data);
//                    console.log('JSON.stringify($scope.userDTO.perfil,null,4)  = \n '+JSON.stringify($scope.userDTO.perfil,null,4));
                    if (this.userDTO && this.userDTO.perfil && this.userDTO.perfil.length > 0) {
                        this.userDTO.status = 'in';
                        this.userDTO.dtLogon = $filter('date')(new Date(), " dd/MM/yyyy  HH:mm");
                        this.userDTO.ultimaTela = stateGO;
                        $localStorage.userDTO = this.userDTO;

                        $timeout(function () {
                            modalLoading.dismiss('cancel');
                                $state.go(stateGO, {userDTO: angular.toJson(this.userDTO)});
                                 $timeout(function () {
//                                    modalLoading.dismiss('cancel');
                                      gerenciaRelatorioService.atualizaRelatorios(this.userDTO);
                                      buscaAPIService.buscaUnidades(this.userDTO.USU_ST_CODIGO, this.userDTO.configLisNet).then(function sucessCallBack(response) {
                                          this.userDTO.unidades = response.data;
//                                          console.log(JSON.stringify(response.data));
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
//                                    notificacaoProvider.showDialogWarning("Sem conunicação", 'Sem internet ou servidor fora do ar .. ' + response.data, 'Fechar', 'Aviso', ev);
                                    notificacaoProvider.sweetDialog("Sem conunicação", 'Sem internet ou servidor fora do ar .. ','info','red','X');
                                }, intMinimoDelay);
                                
                });
                
              
    };
    
    
    
    this.stateGO = function (stateGO) {
//        console.log('Inside stageGO .....');
//        $scope.userDTO.dtLogon = new Date();
        this.userDTO.ultimaTela = stateGO;
        $localStorage.userDTO = this.userDTO;
        try{
            $state.go(stateGO, {userDTO: angular.toJson(this.userDTO)});
        }catch (error){
            notificacaoProvider.sweetDialog("Erro", "Página não encontrada =  " + error,'warning','red','X');
            $state.go('contrucao.contrucao');
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
         $interval.cancel(this.userDTO.job);
         
        this.userDTO.status= 'out';
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

    $rootScope.$on("startNotificacaoTimer", function () {
        var _interacoes = 0;
        var _sleep = 60000;
        console.log('Starting startNotificacaoTimer .....');
        gerenciaRelatorioService.atualizaRelatorios(this.userDTO);
        
        this.userDTO.notificationTimer = 10;
        this.userDTO.notificationTimerInteracoes = 0;
        if (this.userDTO && this.userDTO.status && this.userDTO.status === 'in') {
            if (this.userDTO.job) {
                $interval.cancel(this.userDTO.job);
            }
            this.userDTO.job = $interval(function () {
                _interacoes ++ ;
                console.log('job update relatorio rodando ... interacoes =  '+_interacoes+'     _sleep = '+_sleep);
                gerenciaRelatorioService.atualizaRelatorios(this.userDTO);
                
                if(_interacoes >= 5){
                    _sleep = 120000;
                }else{
                    _sleep = 60000;
                }
            }, _sleep);
        }
    });

 if (this.userDTO && this.userDTO.ultimaTela) {
//            $scope.stageGO($scope.userDTO.ultimaTela);
//            $state.go($scope.userDTO.ultimaTela);
 }

 this.killTimer = function() {
          if (angular.isDefined(this.userDTO.job)) {
            $interval.cancel(this.userDTO.job);
            this.userDTO.job = undefined;
          }
     };
  
//     console.log('Ultima linha userDTO is defined = '+ ( angular.isDefined(this.userDTO) ));
}




angular.module('lisnet')
        .controller('MainLisnet',MainLisnet);