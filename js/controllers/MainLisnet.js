/* 
 Created on : Oct 26, 2016, 3:22:15 PM
 Author     : eros
 */


function MainLisnet($scope, $rootScope,$state, $location, buscaAPIService, montaUrlLaudoProvider, deviceDetector,   
$timeout, sairDoSistemaService,$localStorage,$window,gerenciaRelatorioService,$interval,$filter,$localStorage,$state,resumePerfilService,configuraLinks,  $rootScope , notificacaoProvider,shareuser,helperService,moment) {
    
    console.log('Inicializando MainLisnet ..');
    
    var vm = this;
    $scope.$storage = $localStorage;
    this.login ;
    this.senha ;
    this.mostrar = true;
    $scope.inputLoginFocus = true; 
    
    var intDbLength = 3;
    var intMinimoDelay = 1000;
//    var dialogLoading;
    
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
        this.userDTO = configuraLinks.constroeUserDTONovo();
        configuraLinks.configuraLinksAcesso(this.userDTO);
    }
//    if( angular.isDefined(this.userDTO) ){contarTempoLogado();}
    
     buscaAPIService.buscaClientes(this.userDTO.configLisNet)
                .then(function successCallback(response) {
                    this.userDTO = $localStorage.userDTO;
                    this.userDTO.configLisNet.clientes = response.data;
                    console.log('this.userDTO.configLisNet.defaultDB = '+this.userDTO.configLisNet.defaultDB);
                    this.userDTO.cliente = montaUrlLaudoProvider.encontraClientePorNome(this.userDTO.configLisNet.clientes, this.userDTO.configLisNet.defaultDB);
                    this.userDTO.configLisNet.clientes = [this.userDTO.cliente];
                    this.userDTO.configLisNet.defaultDB = this.userDTO.cliente.CLI_ST_ORACLEUSERNAME;
//                    $scope.state = $state;
//                    console.log("$state.current.name = "+$state.current.name);
//                    $state.current.name = 'Porra....';
                    $localStorage.userDTO = this.userDTO;
                }, function errorCallback(response) {
//                    console.log(response.statusText);
                    notificacaoProvider.sweetDialog("Sem acesso ao servidor", "Aplicativo sem acesso a internet ou Servidor fora do ar   erro =  " + response.data,'warning','red','X');
                });
    
    this.userDTO.deviceDetector = deviceDetector;
    $localStorage.userDTO = this.userDTO;
    


    this.cleanFields = function () {
        this.login = '';
        this.senha = '';
    };
    
    this.buscaUser = function (_param1, _param2) {
        if (_param1 && _param2 ) {
            vm.modalLoading = notificacaoProvider.modalLoading('Carregando ','Buscando usuário na base, aguarde  ...',$scope);
            _param1 = _param1.toUpperCase();
            _param2 = _param2.toUpperCase();
                try{
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
                                    this.userDTO.UNI_ST_CODIGO = retorno.UNI_ST_CODIGO;
//                                    this.log('$scope.userDTO.perfilId: '+this.userDTO.perfilId);
                                    $localStorage.userDTO = this.userDTO;
                                    buscaUsuarioMenu(_param1, this.userDTO.PUS_ST_CODIGO ) ;
                                } else {
                                    vm.modalLoading.dismiss('cancel');
                                    $timeout(function () { 
                                        notificacaoProvider.sweetDialog("Usuário inválido", "Usuário não tem credencias para entrar no sistema, favor contactar o suporte. 2",'warning','red','X');
                                    }, intMinimoDelay);
                                }
                            }, function errorCallback(response) {
                                vm.modalLoading.dismiss('cancel');
                                console.log(response.statusText);
//                                TODO loading with SweetDialog
                                $timeout(function () { 
                                    notificacaoProvider.sweetDialog("Sem acesso a internet", "Aplicativo sem acesso a internet ou Servidor fora do ar   erro =  " + response.data,'warning','red','X');
                                }
                            , intMinimoDelay);
                                $timeout(function () {}, 1000);
                            });
                }catch(error){
                    notificacaoProvider.sweetDialog("Sem acesso a internet", "Aplicativo sem acesso a internet erro =  " + error,'warning','red','X');
                }
        } else {
            $timeout(function () { 
            notificacaoProvider.sweetDialog("Preencha os campos", 'Preencha todos os campos obrigatórios.','warning','red','X');}, intMinimoDelay);
        }
    };



    function  buscaUsuarioMenu(login, perfil) {
        buscaAPIService.buscaUsuarioMenuJSONAjax(login, perfil, this.userDTO.configLisNet)
                .then(function successCallback(response) {
                    this.userDTO.perfil = resumePerfilService.resume(response.data);
//                    this.userDTO.perfil = response.data;//resumePerfilService.resume(response.data);
                    if (this.userDTO && this.userDTO.perfil && this.userDTO.perfil.length > 0) {
                        this.userDTO.status = 'in';
//                        this.userDTO.dtLogon = $filter('date')(new Date(), " dd/MM/yyyy  HH:mm");
                        this.userDTO.dtLogon = new Date();
                        this.userDTO.ultimaTela = 'widgets.lisnet';
                        //metthod preferencia de passar objs para outros controllers , usando memoria e nao IO.
                        shareuser.userDTO = this.userDTO;
                        //localStorage do userDTO para possibiliar  o refresh F5 , o perfil faz parte da autorizacao do login .
                        $localStorage.userDTO = this.userDTO;
//                        $state.go(stateGO, {userDTO: angular.toJson(this.userDTO)});
//                        $state.go('widgets.lisnet');
                        vm.stateGO('widgets.lisnet');
                        //todas as chamadas no seu  tempo p nao sobrecarregar nem o cliente nem o servidor
                        $timeout(function () {
//                            $timeout(function (){gerenciaRelatorioService.atualizaRelatorios(this.userDTO);
//                                                         shareuser.userDTO = this.userDTO;
//                                                        $localStorage.userDTO = this.userDTO;
//                              },800);
//                              
//                            vm.modalLoading.dismiss('cancel');
                                 $timeout(function () {
                                      buscaAPIService.buscaUnidades(this.userDTO.USU_ST_CODIGO, this.userDTO.configLisNet).then(function sucessCallBack(response) {
                                          this.userDTO.unidades = response.data;
                                          if(this.userDTO.unidades && this.userDTO.unidades.length > 0){
                                              this.userDTO.unidade = helperService.retornaUnidade(this.userDTO.UNI_ST_CODIGO,this.userDTO.unidades);
                                          }
                                          shareuser.userDTO.unidades = response.data;
//                                             $localStorage.userDTO = this.userDTO;
                                      });
                                            $timeout(function (){buscaAPIService.buscaConvenios(this.userDTO.USU_ST_CODIGO, this.userDTO.configLisNet).then(function sucessCallBack(response) {
                                                    this.userDTO.convenios = response.data;
                                                    shareuser.userDTO.convenios = response.data;
      //                                               $localStorage.userDTO = this.userDTO;
                                            });
                                                    
                                            },500);
                                            contarTempoLogado();
                                            $rootScope.$broadcast("startNotificacaoTimer");
                                            $scope.inputPesquisaTelaFocus = true; 
                                }, 400);
                        }, 500);
                        
                    } else {
                        vm.modalLoading.dismiss('cancel');
                        $timeout(function () { 
                                    notificacaoProvider.sweetDialog("Usuário não tem credencias", 'Usuário não tem credencias para entrar no sistema, favor contactar o suporte.','info','red','X');}, intMinimoDelay);
                    }
                }, function errorCallback(response) {
                    vm.modalLoading.dismiss('cancel');
                        $timeout(function () { 
                                    notificacaoProvider.sweetDialog("Sem conunicação", 'Sem internet ou servidor fora do ar .. ','info','red','X');
                                }, intMinimoDelay);
                });
    };
    
    
    
    
    this.stateGO = function (stateGO) {
//        console.log('$state.current .name =  ' + $state.current.name);
        vm.carregando = true;
        console.log('stateGO = '+stateGO);
        
        $timeout(function () {
            if (stateGO) {

                if ($state.current.name !== stateGO) {
                    try {

                        if (stateGO === 'sair') {
                            vm.logOut();
                        } else {
                            var registroState = $state.href(stateGO);

//                        console.log('$state.get(): '+ $state.get());
                            if (registroState) {

                                this.userDTO.ultimaTela = stateGO;
                                $state.go(stateGO);

                                var stateTokeep = $state.get().filter(function (s) {
                                    return s.name === stateGO;
                                })[0];

//                                console.log("stateTokeep : " + JSON.stringify(stateTokeep, null, 2));

                                if (this.userDTO.hotPages.filter(function (e) {
                                    return e.name === stateGO;
                                }).length > 0) {
                                    console.log('this.userDTO.hotPages contains the element we re looking for');
                                } else if (stateGO !== 'widgets.lisnet') {
                                    $timeout(function (){this.userDTO.hotPages.push(stateTokeep);},300);
                                }

                            } else {
//                    userDTO.modalLoading.dismiss('cancel');
                                notificacaoProvider.sweetDialog("Erro", "Página não encontrada =  " + stateGO, 'warning', 'red', 'X');
                                $state.go('problema.tela_nao_existe');
//                            vm.carregando = false;
                            }
                        }

                    } catch (error) {
                        notificacaoProvider.sweetDialog("Erro", "Página não encontrada =  " + error, 'warning', 'red', 'X');
                        $state.go('problema.tela_nao_existe');
                          vm.carregando = false;
                    }
                } else {
                    vm.carregando = false;
                    console.log('the same state');
                }

                $localStorage.userDTO = this.userDTO;

            } else {
                vm.carregando = false;
                console.log('Do nothing ...');
            }
        }, 150);
        
       
        
         $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
             console.log('$stateChangeSuccess : '+$state.current.name);
             
             $timeout(function (){vm.carregando = false;},1500);
             
             if(vm.modalLoading){
                 console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Cancelando Loading modal  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                vm.modalLoading.dismiss('cancel');
             }
             
          });

    };
    
    
    $rootScope.$on("stateGO", function(){
        vm.stateGO(this.userDTO.stateGO);
    });
    
    
//    this.popUnidades =  function (){
//        return  $uibModal.open({
//                    template:'   <div class="ibox-content"   > '
//                    +' <table datatable="ng" dt-options="dtOptions"  class="table table-striped table-bordered table-hover dataTables-example"> '
//                    +'     <thead> '
//                    +'     <tr> '
//                    +'         <th>-</th> '
//                    +'         <th>Cõdigo</th> '
//                    +'         <th>Descrição</th> '
//                    +'     </tr> '
//                    +'     </thead> '
//                    +'     <tbody> '
//                    +'     <tr ng-repeat="u in main.userDTO.unidades"  ng-click="main.escolheUnidade(u.UNI_ST_CODIGO)" > '
//                    +'         <td    ><a  ng-click="main.escolheUnidade(u.UNI_ST_CODIGO)" ><i class="fa fa-plus-circle" aria-hidden="true"></i></a></td> '      
//                    +'         <td    ><span class="text-center  text-muted small    ">{{u.UNI_ST_CODIGO}}</span></td> '
//                    +'         <td ><span class="pull-right text-muted small  ">{{u.UNI_ST_DESCRICAO}}</span></td> '
//                    +'     </tr> '
//                    +'     </tbody> '
//                    +' </table> '
//               +'  </div>',
//                                scope: $scope
//                            });
//    };
    
    

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
            
            $timeout(function () { gerenciaRelatorioService.atualizaRelatorios(this.userDTO); }, 500);
            
            if (this.userDTO && this.userDTO.job) {
                console.log('Job is runnig ...');
                $interval.cancel(this.userDTO.job);
            } 
                
                this.userDTO.job = $interval(function () {
                    console.log('Starting startNotificacaoTimer .....');
                    _interacoes++;
                    gerenciaRelatorioService.atualizaRelatorios(this.userDTO);
                    contarTempoLogado();
                }, _sleep);
            
        } else {
            console.log('nothing to do ');
        }

    });
    
        function contarTempoLogado() {
    //       this.userDTO.controleDoTempo = $interval(function (){},60000);
            var a = moment();
            var b = moment(this.userDTO.dtLogon);
            var segundos = a.diff(b, 'seconds');
            var diffTempo = 0;
            if(segundos < 3600){
                diffTempo = a.diff(b, 'minutes');
                this.userDTO.tempoLogado = diffTempo + ' minuto(s)';
            }else if(segundos > 3600 && segundos < 86400) {
                diffTempo = a.diff(b, 'hours');
                this.userDTO.tempoLogado = diffTempo + ' hora(s)';
            }else if(segundos > 86400) {
                diffTempo = a.diff(b, 'days');
                this.userDTO.tempoLogado = diffTempo + ' dia(s)';
            }
            console.log('Difference btw 2 dates :   ' + diffTempo);
        }

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



//var qdtNotificacaoResumida = 6;
//    this.notificacoesResumida = [];
//    
//    String.prototype.isNumber = function(){return /^\d+$/.test(this);};
//    this.telaSelecionada = '';
//    this.cortaString = function (str){
//        var _array = str.split('|');
////        return _array[0];
//        var idDaPagina = _array[0];
//        $scope.telaSelecionada = '';
//        return idDaPagina;
//    };
//    this.states = [];
//    this.states.push('controle.notificacoes| Controle de Notificações');
//    this.states.push('widgets.lisnet| Home Painel de Widgets do Usuário, Inicio , Inĩcio, Começo');
//    this.states.push('sair| Sair do Sistema quit exit');
//    
//       function montaStatesPesquisa() {
//        for (i in this.userDTO.perfil) {
//
//            var p = this.userDTO.perfil[i];
////        $scope.states.push(p.MOD_ST_CODIGO);
//
//            for (y in p.telas) {
//
//                var f = p.telas[y];
//                if (f.telas) {
//                    for (x in f.telas) {
//                        var n = f.telas[x];
//                        if (n.visualisar) {
//                            vm .states.push(n.stateComposto + '| ' + n.MOD_ST_DESCRICAO);
//                        }
//                    }
//                } else {
//                    if (f.visualisar) {
//                        vm .states.push(f.stateComposto + '| ' + f.MOD_ST_DESCRICAO);
//                    }
//                }
//
//            }
//        }
//    };
//    
//
//    this.openRelatorio = function (status,codigo_rastreio){
//        console.log('Inside openRelatorio codigo_rastreio = '+codigo_rastreio);
//        if(status === 'B'){
//            var url = this.userDTO.configLisNet.baseUrl +'/relatorio/download?codigo_rastreio=' +codigo_rastreio+'&dbname='+this.userDTO.configLisNet.defaultDB;
//         $window.open(url, '_blank');
//        }else{
//            
//        }
//    };
//    
//    this.startTimer = function (){
//        $rootScope.$broadcast("startNotificacaoTimer");
//    };
//    
//    this.resumeNofificacao = function (){
//        
//    if(this.userDTO && this.userDTO.notificacoes && this.userDTO.notificacoes.length < qdtNotificacaoResumida){
//            this.notificacoesResumida = this.userDTO && this.userDTO.notificacoes;
//    }else if(this.userDTO && this.userDTO.notificacoes && this.userDTO.notificacoes.length > qdtNotificacaoResumida){
//            this.notificacoesResumida =  this.userDTO.notificacoes.slice(0,qdtNotificacaoResumida);
//    }else{
//            this.notificacoesResumida =  this.userDTO.notificacoes;
//    }
//  $rootScope.$broadcast("startNotificacaoTimer");
//};








}
angular.module('lisnet')
        .controller('MainLisnet',MainLisnet);