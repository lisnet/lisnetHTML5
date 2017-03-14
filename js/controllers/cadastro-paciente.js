/* 
 * 
 * https://www.golden-layout.com
 */

/* 
 Created on : Jan 9, 2017, 12:17:42 PM
 Author     : eros
 */


/* global y */

function cadastroPaciente($scope, sairDoSistemaService, notificacaoProvider, buscaAPIService, $stateParams, $localStorage, $timeout, $filter,DTOptionsBuilder,helperService,$state,$rootScope,$timeout,hotkeys) {

    var selfCadastroPaciente = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
    $scope.steps = [{label:'F7',state:'00220.busca_paciente'},{label:'Paciente',state:'00220.constroe_paciente'},{label:'End./Contato',state:'00220.constroe_paciente_contato'},{label:'Solicitação',state:'00220.constroe_requisicao'},{label:'Compl.',state:'00220.dados_complementares'},{label:'Exames',state:'00220.inclue_exames'}];
    $scope.paramsStateConfig = $stateParams;
    selfCadastroPaciente.submit = function (isValid) {
        console.log("h");
        if (isValid) {
//            $scope.userDTO.configuraPerfil.isValid =isValid;
            selfCadastroPaciente.message = "Submitted " ;
        } else {
            selfCadastroPaciente.message = "There are still invalid fields below";
        }
    };
    $scope.inputPAC_ST_NOMEBUSCA = true;
    
    if (!$scope.userDTO.cadastroPaciente) {
        $scope.inputPAC_ST_NOME = true;
        $scope.userDTO.cadastroPaciente = {showWizard:false,ultimoStep:'00220.busca_paciente',
            showConstroePaciente:false,showConstroeRequisicao:false,ultimoCampo:''
            ,pacienteDB:null,paciente:null,pacientes:{},requisicao:{exame:{},exames:[],solicitantes:[]}};
          $state.transitionTo('00220.busca_paciente');
          $timeout(function (){$scope.userDTO.cadastroPaciente.ultimoStep = '00220.busca_paciente';},1000);
          
    }else{
        console.log('redirecionando p : '+$scope.userDTO.cadastroPaciente.ultimoStep);
        $timeout(function (){$state.go($scope.userDTO.cadastroPaciente.ultimoStep);},500);
    }
    
    $scope.userDTO.cadastroPaciente.config =   configPadrao();
    
  hotkeys.add({
    combo: 'f7',
    description: 'This one goes to cadastrodepacientes',
    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
    callback: function(event,hotkeys) {
        event.preventDefault();
      $scope.goToStep('00220.busca_paciente');
    }
  });
  
  hotkeys.add({
    combo: 'f4',
    description: 'Salvar alteracoes',
    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
    callback: function(event,hotkeys) {
        event.preventDefault();
        console.log('Salvando alteracoes');
        $scope.salvarAlteracoes($state.current.name);
    }
  });
  
  hotkeys.add({
    combo: 'f2',
    description: 'Editar tela em questao',
    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
    callback: function(event,hotkeys) {
        event.preventDefault();
        $scope.editarTela($state.current.name);
    }
  });
  
  hotkeys.add({
    combo: 'alt+right',
    description: 'This one goes to next page to the right',
    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
    callback: function(event, hotkey) {
        event.preventDefault();
        console.log('next step right ...');
        nextScreen(true);
    }
  });
  
  hotkeys.add({
    combo: 'alt+left',
    description: 'This one goes to next page to the left',
    allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
    callback: function(event, hotkey) {
        event.preventDefault();
      console.log('next step left ...');
      nextScreen(false);
    }
  });

    $scope.compara = function (obj1,obj2){
        return helperService.comparaObjetos(obj1,obj2);
    };

    $scope.salvarAlteracoes = function (stateTela){
        console.log(stateTela);
         switch (stateTela){
                case '00220.constroe_paciente':
                    $scope.userDTO.cadastroPaciente.config.constroe_paciente = true;
                    $scope.userDTO.cadastroPaciente.pacienteDB = helperService.clonadorDeObj($scope.userDTO.cadastroPaciente.paciente);
                    break;
                    case '00220.constroe_paciente_contato':
                    $scope.userDTO.cadastroPaciente.config.constroe_contato =true;
                    $scope.userDTO.cadastroPaciente.pacienteDB = helperService.clonadorDeObj($scope.userDTO.cadastroPaciente.paciente);
                    break;
                    case '00220.constroe_requisicao':
                    $scope.userDTO.cadastroPaciente.config.constroe_solicitacao = true;
                    break;
            }
    };

    $scope.editarTela =  function (stateTela){
        console.log("editarTela  state : "+stateTela);
        switch (stateTela){
                    case '00220.busca_paciente':
                        $scope.userDTO.cadastroPaciente.paciente = {};
                        $scope.userDTO.cadastroPaciente.pacienteDB = {};
                        
                        $state.go('00220.constroe_paciente');
                        //TODO busca código único de paciente PAC_IN_CODIGO
                        $timeout(function (){$scope.userDTO.cadastroPaciente.config.constroe_paciente = false;  },100);
                        $timeout(function (){$scope.inputPAC_ST_NOME = true;  },800);
                    break;
                    case '00220.constroe_paciente':
                    $scope.userDTO.cadastroPaciente.config.constroe_paciente = $scope.userDTO.cadastroPaciente.config.constroe_paciente ? false : true;
//                        $scope.inputPAC_ST_NOME = true;
                        $timeout(function (){$scope.inputPAC_ST_NOME = true;  },500);
                    break;
                    case '00220.constroe_paciente_contato':
                    $scope.userDTO.cadastroPaciente.config.constroe_contato = $scope.userDTO.cadastroPaciente.config.constroe_contato ? false : true;
                        $timeout(function (){$scope.inputPAC_ST_CEP = false; $scope.inputPAC_ST_CEP = true;},500);
                    break;
                    case '00220.constroe_requisicao':
                    $scope.userDTO.cadastroPaciente.config.constroe_solicitacao = $scope.userDTO.cadastroPaciente.config.constroe_solicitacao ? false : true;
                        $timeout(function (){$scope.inputREQ_ST_MATRICULA = true;},500);
                    break;
            }
        
    };
    
    $scope.trocarVisualizacao = function (tipoDebusca, valor) {
//        console.log('tipoDebusca = ' + tipoDebusca);
        switch (tipoDebusca) {
            case 'PAC_DT_NASCIMENTO':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_DT_NASCIMENTO';
                break;
            case 'REQ_ST_CODIGO':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'REQ_ST_CODIGO';
                break;
            case 'PAC_ST_PRONTUARIO':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_ST_PRONTUARIO';
                break;
            case 'PAC_IN_CODSUS':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_IN_CODSUS';
                break;
            case 'PAC_ST_NOME':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_ST_NOME';
                break;
            case 'PAC_ST_CPF':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_ST_CPF';
                break;
            case 'PAC_ST_RG':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_ST_RG';
                break;
            case 'REQ_ST_CODIGOALT':
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'REQ_ST_CODIGOALT';
                break;
            default :
                $scope.userDTO.cadastroPaciente.ultimoCampo = 'PAC_DT_NASCIMENTO';
        }
        $scope.userDTO.cadastroPaciente.valorCampo = valor;
        console.log('ultimo campo: ' + $scope.userDTO.cadastroPaciente.ultimoCampo + '   valor: ' + $scope.userDTO.cadastroPaciente.valor);
    };

    $scope.filtrar = function ( ) {
        console.log('ultimoCampo = ' + $scope.userDTO.cadastroPaciente.ultimoCampo);
        $scope.userDTO.cadastroPaciente.paciente = null;
        $scope.userDTO.cadastroPaciente.pacienteDB = null;
        if ($scope.userDTO.cadastroPaciente.ultimoCampo && $scope.userDTO.cadastroPaciente.valorCampo) {
            selfCadastroPaciente.modalLoading = notificacaoProvider.modalLoading('filtrando', 'filtrando', $scope);
            selfCadastroPaciente.activated = true;
            $timeout(function () {
                
                runFiltrar = true;
                if (runFiltrar) {
                    runFiltrar = false;

                    var args = '';

//            var uniStCodigo = $scope.userDTO.unidade.UNI_ST_CODIGO;
                    var libetaPesquisa = false;
                    args = "?campoDePesquisa=" + $scope.userDTO.cadastroPaciente.ultimoCampo + "&valor=" + $scope.userDTO.cadastroPaciente.valorCampo.toUpperCase();
                    console.log('args = ' + args);
                    if (libetaPesquisa || true) {
                        console.log('$scope.paramsStateConfig.limit : ' + $scope.paramsStateConfig.limit);
                        buscaAPIService.buscaRequisicoes(args, $scope.paramsStateConfig.limit, $scope.userDTO.configLisNet)
                                .then(function successCallback(response) {
                                    $scope.userDTO.cadastroPaciente.requisicoes = response.data;
                                    console.log("Quantidade total de registros : " + $scope.userDTO.cadastroPaciente.requisicoes.length);
                                    constroeListaPacientes($scope.userDTO.cadastroPaciente.requisicoes);
                                    $localStorage.userDTO = $scope.userDTO;
                                    $timeout(function () {
                                        selfCadastroPaciente.modalLoading.dismiss('cancel');
                                    }, 1000);
                                },
                                        function errorCallback(response) {
                                            console.log(response.statusText);
                                            $timeout(function () {
                                                selfCadastroPaciente.modalLoading.dismiss('cancel');
                                            }, 1000);
                                        });
                    } else {
                        $timeout(function () {
                            selfCadastroPaciente.modalLoading.dismiss('cancel');
                        }, 200);
                    }

                } else {
                    console.log('Espera porra.......');
                    $timeout(function () {
                        selfCadastroPaciente.modalLoading = notificacaoProvider.modalLoading('Aguarde', 'Em execução', $scope);
                    }, 300);
                }
            }, 250);
        } else {

        }
    };
    
    $scope.encontraPaciente = function (PAC_IN_CODIGO){
        var _pacs = $scope.userDTO.cadastroPaciente.pacientes;
        var _pac = _pacs.filter(function (p) {
                        return p.PAC_IN_CODIGO === PAC_IN_CODIGO;
                    })[0];
        $scope.userDTO.cadastroPaciente.pacienteDB = _pac;
        $scope.userDTO.cadastroPaciente.paciente = helperService.clonadorDeObj(_pac);
        $state.transitionTo('00220.constroe_paciente');

        _pac = buscaAPIService.buscaPaciente($scope.userDTO.configLisNet,_pac.PAC_IN_CODIGO).then(
                function sucess(response){
                    _pac = response.data;
                    $scope.userDTO.cadastroPaciente.pacienteDB = _pac;
                    $scope.userDTO.cadastroPaciente.paciente = helperService.clonadorDeObj(_pac);
                    $scope.userDTO.cadastroPaciente.requisicao = {};
                    
                    $timeout(function (){$scope.inputPAC_ST_NOMEConstroePaciente = true;},400);
                    $scope.userDTO.cadastroPaciente.requisicoes = [];
                    $scope.userDTO.cadastroPaciente.pacientes = [];
                },
                function erro(response){
                    console.log(response.statusText);
                        notificacaoProvider.sweetError('Erro','Erro na busca de paciente por PAC_IN_CODIGO   ERRO: '+response.statusText);
                });
    };

    $scope.constroeEndereco = function (p) {
//            console.log(JSON.stringify(p));
        var endereco;
        if (p.PAC_ST_CIDADE) {
            endereco = endereco + p.PAC_ST_CIDADE + ' - ';
        }
        if (p.PAC_ST_ESTADO) {
            endereco = endereco + p.PAC_ST_ESTADO + ' - ';
        }
        if (p.PAC_ST_ENDERECO) {
            endereco = endereco + p.PAC_ST_ENDERECO + ' | ';
        }
        if (p.PAC_ST_CEP) {
            endereco = endereco + p.PAC_ST_CEP + ' - ';
        }
        if (endereco && endereco.length > 1) {
            return   endereco.substring(endereco.length - 1, endereco.length);
        } else {
            return null;
        }

    };
    
    $scope.buscaEndereco = function(){
        if($scope.userDTO.cadastroPaciente.paciente.PAC_ST_CEP &&  $scope.userDTO.cadastroPaciente.paciente.PAC_ST_CEP.length > 7){
            var _pac = $scope.userDTO.cadastroPaciente.paciente;
            buscaAPIService.buscaEndereco($scope.userDTO.configLisNet , $scope.userDTO.cadastroPaciente.paciente.PAC_ST_CEP).then(
              function sucesso(response){
                        var _e =response.data; 
         //               console.log(JSON.stringify(_e,null,2));
                        if(_e.cep && _e.localidade && _e.uf){
                            _pac.PAC_ST_CEP  = _e.cep;
                            _pac.PAC_ST_ENDERECO = _e.logradouro;
                            _pac.PAC_ST_BAIRRO = _e.bairro;
                            _pac.PAC_ST_CIDADE = _e.localidade;
                            _pac.PAC_ST_ESTADO = _e.uf.toUpperCase();
                            _pac.PAC_ST_NUMERO = '';
                            _pac.PAC_ST_COMPLEMENTO = '';
                            $scope.inputPAC_ST_NUMERO = true;
                        }else{
                                selfCadastroPaciente.modalErro = notificacaoProvider.sweetError('ERRO no cep '+$scope.userDTO.cadastroPaciente.paciente.PAC_ST_CEP,'CEP incorreto ou inválido ');
                                limpaEnd();
                        }
              },
              function erro(response){
                        selfCadastroPaciente.modalErro = notificacaoProvider.sweetError('ERRO no cep '+$scope.userDTO.cadastroPaciente.paciente.PAC_ST_CEP,'CEP inválido.'+response.statusText);
                        limpaEnd();
              });
        }
        function limpaEnd (){
                   _pac.PAC_ST_ENDERECO = "";
                   _pac.PAC_ST_BAIRRO = "";
                   _pac.PAC_ST_CIDADE = "";
                   _pac.PAC_ST_ESTADO = "";
                   $scope.inputPAC_ST_CEP = true;
                   //TODO callback dismiss modal focus inputPAC_ST_CEP
        }
    };

    function  constroeListaPacientes(requisicoes) {
          if (typeof requisicoes === 'object' && requisicoes.length > 0) {
              $scope.userDTO.cadastroPaciente.pacientes = [];
              var _pacs = [];
              for (y  in requisicoes) {
                  var req = requisicoes[y];
  //                console.log('req : '+JSON.stringify(req,null,2));
                  if (_pacs.length === 0) {
                      _pacs.push(constroePaciente(req));
                  } else if (_pacs.length >= 0) {
                      var pac_in_codigo = req.PAC_IN_CODIGO;
                      var _pac = _pacs.filter(function (p) {
                          return p.PAC_IN_CODIGO === pac_in_codigo;
                      })[0];
                      if (_pac) {
                          _pac.requisicoes.push(constroeRequisicao(req));
                      } else {
                          _pacs.push(constroePaciente(req));
                      }
                  }
              }
              $scope.userDTO.cadastroPaciente.pacientes = _pacs;
          } else {
              $scope.userDTO.cadastroPaciente.pacientes = [];
          }
      };

    function constroePaciente(req) {
          return {PAC_IN_CODIGO: req.PAC_IN_CODIGO,
              PAC_ST_NOME: req.PAC_ST_NOME,
              PAC_ST_SEXO: req.PAC_ST_SEXO,
              PAC_ST_PRONTUARIO: req.PAC_ST_PRONTUARIO,
              PAC_IN_CODSUS: req.PAC_IN_CODSUS,
              PAC_ST_CPF: req.PAC_ST_CPF,
              PAC_ST_ESTADO: req.PAC_ST_ESTADO,
              PAC_ST_BAIRRO: req.PAC_ST_BAIRRO,
              PAC_ST_CIDADE: req.PAC_ST_CIDADE,
              PAC_ST_ENDERECO: req.PAC_ST_ENDERECO,
              PAC_ST_CEP: req.PAC_ST_CEP,
              requisicoes: [constroeRequisicao(req)]};
      };

    function constroeRequisicao(req) {
        return  {REQ_ST_CODIGO: req.REQ_ST_CODIGO,
            REQ_DT_CADASTRO: req.REQ_DT_CADASTRO,
            UNI_ST_CODIGO: req.UNI_ST_CODIGO,
            SOL_ST_CODIGO: req.SOL_ST_CODIGO,
            LEG_ST_CODIGO: req.LEG_ST_CODIGO,
            REQ_ST_CODIGOALT: req.REQ_ST_CODIGOALT};
    };
    
    $scope.goToStep = function (step){
        
                var _c = {state:$state.current.name}  ;
                var _n = {state:step}  ;
                for(i in $scope.steps){
                    var _s = $scope.steps[i];
                    if(_s.state === _c.state){
                        _c.index = i;
                        break;
                    }
                }
                for(y in $scope.steps){
                    var _s = $scope.steps[y];
                    if(_s.state === step){
                        _n.index = y;
                        break;
                    }
                }
//                console.log(JSON.stringify([_c,_n],null,2));
                var _rt = true;
                if(_c.index < _n.index){
                    console.log('going forward dude');
                    _rt  = nextScreen(true);
                }else{
                    console.log('going backwards dude');
                    _rt  = nextScreen(false);
                }
                if(!_rt){
                    console.log('não rolou, voltando ....');
                    $timeout(function (){$state.go(_c.state);},400);
                }
    };
    
    function nextScreen(direction){
        
        var _s = $state.current.name;
        console.log('Inside nextScreen ....  state = '+_s);
        switch (_s){
            case '00220':
                if($scope.userDTO.cadastroPaciente.paciente){
                    $scope.goToStep("00220.busca_paciente");return true;
                }else{
                    notificacaoProvider.sweetWarning('Info', 'Escolha um paciente ou crie um novo para proceguir. F2');
                    return false;
                }
            break;
            case '00220.busca_paciente':
                
                if (direction) {
                    if ($scope.userDTO.cadastroPaciente.paciente) {
                        $state.go("00220.constroe_paciente");
                        return true;
                    } else {
                        notificacaoProvider.sweetWarning('Info', 'Escolha um paciente ou crie um novo para proceguir. F2');
                        return false;
                    }
                } else {
                    $state.go("00220.busca_paciente");
                    return true;
                }
                
            break;
            case '00220.constroe_paciente':
                    if (direction) {
                        if (helperService.comparaObjetos($scope.userDTO.cadastroPaciente.paciente, $scope.userDTO.cadastroPaciente.pacienteDB)) {
                            $state.go("00220.constroe_paciente_contato");
                            return true;
                        } else {
                            notificacaoProvider.sweetWarning('Info', 'É preciso salvar o paciente antes de proceguir , aperte F4 para salvar');
                            return false;
                        }
                    } else {
                        $state.go("00220.busca_paciente");
                        return true;
                    }
                
            break;
            case '00220.constroe_paciente_contato':
                    if (direction) {
                        if (helperService.comparaObjetos($scope.userDTO.cadastroPaciente.paciente, $scope.userDTO.cadastroPaciente.pacienteDB)) {
                            $state.go("00220.constroe_requisicao");
                            return true;
                        } else {
                            notificacaoProvider.sweetWarning('Info', 'É preciso salvar as alterações antes de proceguir , aperte F4 para salvar');
                            return false;
                        }
                    } else {
                        $state.go("00220.constroe_paciente");
                        return true;
                    }
            break;
            case '00220.constroe_requisicao':
                if (direction) {
                    if ($scope.userDTO.cadastroPaciente.requisicao && $scope.userDTO.cadastroPaciente.requisicao.unidade && $scope.userDTO.cadastroPaciente.local) {
                        $state.go("00220.dados_complementares");
                        return true;
                    } else {
                        notificacaoProvider.sweetWarning('Info', 'Escolha um Local e um Posto');
                        return false;
                    }
                } else {
                    $state.go("00220.constroe_paciente_contato");
                    return true;
                }
            break;
            case '00220.dados_complementares':
//                $scope.goToStep("cadastrodepacientes.inclue_exames");
                $state.go("00220.inclue_exames");
            break;
            case '00220.inclue_exames':
//                $scope.goToStep("cadastrodepacientes");
                $state.go("00220");
            break;
        }  
    };
   

$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
             if ( $scope.userDTO &&  $scope.userDTO.cadastroPaciente && $state.current.name.includes("00220" )) {
                        console.log("current state p ultimoStep: " + $state.current.name);
                        
                        var _s = $state.current.name;
                        
                        switch (_s){
                            case '00220.busca_paciente':
                                $scope.userDTO.cadastroPaciente.showWizard = false;
                            break;
                            default :
                                $scope.userDTO.cadastroPaciente.showWizard = true;
                        }
                        
                        if(_s !== '00220'){
                            $scope.userDTO.cadastroPaciente.ultimoStep = _s;
                        }
                        
                    }
   });

$scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withOption('stateSave', false)
            .withOption('lengthMenu', [8, 20, 40, 100, 150, 200])
            //        .withLanguage([{url:"//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese.json"}])
            .withLanguage({
                "sProcessing": "A processar...",
                "sLengthMenu": "Mostrar _MENU_ registos",
                "sZeroRecords": "Não foram encontrados resultados",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
                "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                "sInfoPostFix": "",
                "sSearch": "Procurar:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "Primeiro",
                    "sPrevious": "Anterior",
                    "sNext": "Seguinte",
                    "sLast": "Último"
                }})
            .withButtons([
                {extend: 'copy'},
//            {extend: 'csv'},
//            {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile'},
                {extend: 'print',
                    customize: function (win) {
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                    }
                }
            ]);


};

function configPadrao() {

                return {
                    PAC_IN_CODIGO: {disable: true, min: 4, max: 15, visible: true, required: false, label: 'Código Interno', position: 0},
                    PAC_ST_NOME: {disable: false, min: 5, max: 70, visible: true, required: true, label: 'Nome', position: 1},
                    PAC_DT_NASCIMENTO: {disable: false, min: 5, max: 20, visible: true, required: false, label: 'Data de Nascimento', position: 2},
                    PAC_IN_IDADE: {disable: false, min: 5, max: 20, visible: true, required: false, label: 'Idade', position: 3},
                    PAC_ST_SEXO: {disable: false, min: 5, max: 20, visible: true, required: true, label: 'fa fa-venus-mars', position: 4},
                    PAC_ST_ESTADOCIVIL: {disable: false, min: 5, max: 20, visible: true, required: false, label: 'Estado Civil', position: 5},
                    PAC_ST_RG: {disable: false, min: 2, max: 12, visible: true, required: false, label: 'R.G', position: 6},
                    PAC_ST_CPF: {disable: false, min: 11, max: 14, visible: true, required: false, label: 'CPF', position: 7},
                    PAC_IN_CODSUS: {disable: false, min: 10, max: 15, visible: true, required: false, label: 'S.U.S', position: 8},
                    PAC_ST_PRONTUARIO: {disable: false, min: 4, max: 15, visible: true, required: false, label: 'Prontuário', position: 9},
                    PAC_ST_COR: {disable: false, min: 1, max: 2, visible: true, required: false, label: 'Cor', position: 10},
                    PAC_ST_RESP: {disable: false, min: 8, max: 50, visible: true, required: false, label: 'Responsável', position: 11},
                    PAC_ST_NOMEMAE: {disable: false, min: 8, max: 70, visible: true, required: false, label: 'Nome da Mãe', position: 12},
                    constroe_paciente: true,
                    PAC_ST_CEP: {disable: false, min: 8, max: 9, visible: true, required: false, label: 'CEP', position: 13},
                    PAC_ST_ENDERECO: {disable: false, min: 8, max: 70, visible: true, required: false, label: 'Endereço', position: 14},
                    PAC_ST_NUMERO: {disable: false, min: 0, max: 5, visible: true, required: false, label: 'Numero', position: 15},
                    PAC_ST_COMPLEMENTO: {disable: false, min: 0, max: 50, visible: true, required: false, label: 'Complemento', position: 16},
                    PAC_ST_BAIRRO: {disable: false, min: 0, max: 50, visible: true, required: false, label: 'Bairro', position: 17},
                    PAC_ST_CIDADE: {disable: false, min: 0, max: 50, visible: true, required: false, label: 'Cidade', position: 18},
                    PAC_ST_ESTADO: {disable: false, min: 0, max: 2, visible: true, required: false, label: 'UF', position: 19},
                    PAC_ST_TELEFONE: {disable: false, min: 0, max: 20, visible: true, required: false, label: 'Telefone', position: 20},
                    PAC_ST_CELULAR: {disable: false, min: 0, max: 20, visible: true, required: false, label: 'Celular', position: 21},
                    PAC_ST_EMAIL: {disable: false, min: 0, max: 50, visible: true, required: false, label: 'Email', position: 22},
                    PAC_BL_OBSERVACAO: {disable: false, min: 0, max: 400, visible: true, required: false, label: 'Observação', position: 23},
                    constroe_contato: true,
                    REQ_IN_CODIGO: {disable: false, min: 0, max: 50, visible: true, required: false, label: 'Solicitação', position: 24},
                    REQ_DT_CADASTRO: {disable: true, min: 0, max: 50, visible: true, required: true, label: 'Data', position: 25},
                    REQ_ST_MATRICULA: {disable: false, min: 0, max: 30, visible: true, required: false, label: 'N. Cart.', position: 26},
                    REQ_ST_SENHA: {disable: false, min: 0, max: 20, visible: true, required: false, label: 'Senha', position: 27},
                    REQ_DT_VALIDADESENHA: {disable: true, min: 0, max: 20, visible: true, required: false, label: 'Validade', position: 28},
                    REQ_ST_AUTORIZACAO: {disable: false, min: 0, max: 20, visible: true, required: false, label: 'Autorização', position: 29},
                    UNI_ST_CODIGO: {disable: false, min: 3, max: 3, visible: true, required: true, label: 'Local', position: 30},
                    ORI_ST_CODIGO: {disable: false, min: 3, max: 3, visible: true, required: true, label: 'Posto', position: 31},
                    CON_ST_CODIGO: {disable: false, min: 3, max: 3, visible: true, required: false, label: 'Convênio', position: 32},
                    REG_ST_CODIGO: {disable: false, min: 3, max: 3, visible: true, required: false, label: 'Plano', position: 33},
                    LOC_ST_CODIGO: {disable: false, min: 3, max: 3, visible: true, required: false, label: 'Entrega', position: 34},
                    CID_ST_CODIGO: {disable: false, min: 3, max: 3, visible: true, required: false, label: 'C.I.D', position: 35},
                    constroe_solicitacao: false,
                    REQ_ST_DUM: {disable: false, min: 0, max: 20, visible: true, required: false, label: 'DUM', position: 36},
                    REQ_CH_GESTANTE: {disable: false, min: 0, max: 1, visible: true, required: false, label: 'Gestante', position: 37},
                    REQ_CH_RN: {disable: false, min: 0, max: 1, visible: true, required: false, label: 'R.N.', position: 38},
                    REQ_ST_PESO: {disable: false, min: 0, max: 5, visible: true, required: false, label: 'Peso', position: 39},
                    REQ_ST_ALTURA: {disable: false, min: 0, max: 5, visible: true, required: false, label: 'Altura', position: 40},
                    COL_ST_CODIGO: {disable: false, min: 0, max: 20, visible: true, required: false, label: 'Coletor', position: 41},
                    REQ_DT_COLETA: {disable: false, min: 0, max: 20, visible: true, required: false, label: 'Data & Hora', position: 42},
                    REQ_ST_QUARTO: {disable: false, min: 0, max: 10, visible: true, required: false, label: 'Quarto', position: 43},
                    REQ_ST_LEITO: {disable: false, min: 0, max: 10, visible: true, required: false, label: 'Leito', position: 44},
                    REQ_BL_OBSERVACAO: {disable: false, min: 0, max: 4000, visible: true, required: false, label: 'Observação', position: 45},
                    constroe_complementares: false,
                    SOL_ST_CODIGO: {disable: false, min: 0, max: 3, visible: true, required: false, label: 'Solicitante', position: 46},
                    REQ_ST_GUIA: {disable: false, min: 0, max: 20, visible: true, required: false, label: 'N da Guia', position: 47},
                    EXA_ST_CODIGO: {disable: false, min: 2, max: 10, visible: true, required: false, label: 'Procedimento', position: 48},
                    EXA_ST_DESCRICAO: {disable: false, min: 2, max: 10, visible: true, required: false, label: 'Descrição Exame', position: 49},
                    MAT_ST_CODIGO: {disable: false, min: 0, max: 5, visible: true, required: false, label: 'Material', position: 50},
                    MAT_ST_DESCRICAO: {disable: false, min: 0, max: 5, visible: true, required: false, label: 'Descrição Material', position: 50},
                    constroe_exames: false
                };
            };

angular.module('lisnet')
        .controller('cadastroPaciente', cadastroPaciente);