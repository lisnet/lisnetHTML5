/* 
 Created on : Nov 29, 2016, 2:10:26 PM
 Author     : eros
 */

function telaPadrao($scope,$state ,buscaAPIService, $stateParams, sairDoSistemaService, notificacaoProvider,  $timeout,  DTOptionsBuilder, helperService) {
//{tabela:_tabelaNome,modulo:[{"MOD_ST_CODIGO": "00021",... }],conteudo:};
    var self = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
    
    $scope.jsonTelaPadrao =  $stateParams;
    var modStCodigo = $scope.jsonTelaPadrao.modStCodigo;
    
    $scope.formatHour =  'HH:mm:ss';
    $scope.popup = {inicio: false, fim: false};
    $scope.opeDataPicker = function (entidade,indexE) {
                entidade[0].dataPicker[indexE] = true;
    };
    
    $scope.dateOptions = {
            dateDisabled: false,
            formatYear: 'yy',
            startingDay: 1
        };
        
        $scope.hrOptions = {
            format:'HH:mm',
            dateDisabled: false,
            formatYear: 'yy'
        };

    if(angular.isUndefined($scope.dTOptionsBuilder)){
                               $scope.dTOptionsBuilder = constroeDTOptionsBuilder();
    }
    
    var moduloPadrao;
    
    if ($scope.userDTO.telaPadrao && $scope.userDTO.telaPadrao.length > 0) {

        if ($scope.userDTO.telaPadrao.filter(encontraModulo).length > 0) {
            moduloPadrao = $scope.userDTO.telaPadrao.filter(encontraModulo)[0];
            console.log('moduloPadrao da memoria ...  ');
        } else {
            moduloPadrao =   montaModulo(modStCodigo);
        }

    } else {
        $scope.userDTO.telaPadrao = [];
        moduloPadrao =  montaModulo(modStCodigo);
    }
    
    
    console.log("moduloPadrao.campos is Undefined = "+ angular.isUndefined(moduloPadrao.campos));
    if(angular.isUndefined(moduloPadrao.entidade)){
        
        console.log('buscando campos .....');
        buscaAPIService.buscaModuloTelaPadrao($scope.userDTO.configLisNet,modStCodigo)
                .then(function successCallback(response){
//                    console.log(JSON.stringify(response.data,null, 2));
//                    console.log(typeof response.data);
                    moduloPadrao.entidade = response.data;
                        $scope.moduloPadrao = moduloPadrao;
                        if(!moduloPadrao.entidade.pesquisaTipo){
                             moduloPadrao.entidade.pesquisaTipo = "0";
                             if(moduloPadrao.entidade.pesquisas &&  moduloPadrao.entidade.pesquisas.length > 0){
                                moduloPadrao.entidade.pesquisa = moduloPadrao.entidade.pesquisas[0].nome;
                             }
                        }
                        
                },function errorCallback(response){
                    notificacaoProvider.sweetWarning("erro", response.statusText);
                });
    }else{
        $scope.moduloPadrao = moduloPadrao;
    }

    
    
    
   
    
    $scope.buscar = function ( blFiltro) {
        retornaPesquisa();
        
        if(blFiltro && moduloPadrao.entidade.pesquisaJSON && moduloPadrao.entidade.pesquisaJSON.campo && moduloPadrao.entidade.pesquisaInput){
//            moduloPadrao.entidade.pesquisaInput = moduloPadrao.entidade.pesquisaInput.toUpperCase();
            moduloPadrao.entidade.pesquisaInput = moduloPadrao.entidade.pesquisaInput.trim();
            carregarLista(blFiltro);
        }else if(!blFiltro) {
            carregarLista(blFiltro);
        }else{
            notificacaoProvider.sweetError('Erro', 'preencher os campos para filtrar a pesquisa');
        }
    };
    
    tronarEditavel = function (ent) {
        if (ent[0].editavel) {
            ent[0].editavel = false;
        } else {
            ent[0].editavel = true;
        }
    };
    
    removeEntidade = function (ent){
        var _index  = moduloPadrao.entidade.entidades.indexOf(ent);
        console.log('_index = '+_index);
        if(_index || _index === 0){
            if(moduloPadrao.entidade.entidades.length === 1){
                moduloPadrao.entidade.entidades = [];
                moduloPadrao.entidade.entidadesDB = [];
            }else{
                moduloPadrao.entidade.entidades.splice(_index, 1);
                moduloPadrao.entidade.entidadesDB.splice(_index, 1);
            }
        }
    };
    
    $scope.manipulaEntidade = function (ent,acao){
        switch (acao) {
            case 'editar':
                tronarEditavel(ent);
                break;
            case 'excluir':
                switch (ent[0].status){
                    case 'R':
                        ent[0].editavel = false;
                        ent[0].status = 'D';
                        ent[0].ngClass = "fa fa-times";
                        ent[0].ngStyle = "color: red";
                        ent[0].toolTip = "deletar linha ?";
                    break;
                    case 'D':
                        try {
                            self.modalLoading = notificacaoProvider.modalLoading('Excluindo', 'excluindo linha', $scope);
                            $timeout(function () {
                                buscaAPIService.salvaEntidadeTelaPadrao($scope.userDTO.configLisNet, moduloPadrao, $scope.userDTO.UNI_ST_CODIGO, ent)
                                        .then(function   sucesso(response) {
                                            var _response = response.data;
                                            var _responseType = typeof _response;
                                            console.log(typeof _response);
                                            if (_response && _responseType === 'string' && _response.indexOf('ORA-') !== -1) {
                                                notificacaoProvider.sweetError('Erro', _response);
                                            } else {
                                                removeEntidade(ent);
                                            }
                                            console.log(response.data);
                                            self.modalLoading.dismiss('cancel');
                                        }, function erro(response) {
                                            console.log(response.statusText);
                                            notificacaoProvider.sweetError('Erro', response.statusText);
                                            self.modalLoading.dismiss('cancel');
                                        });
                            }, 300);
                        } catch (error) {
                            console.log(error);
                            self.modalLoading.dismiss('cancel');
                            notificacaoProvider.sweetError('Erro', error);
                        }    
                    break;
                    case 'C':
                        self.modalLoading = notificacaoProvider.modalLoading('Excluindo', 'excluindo linha', $scope);
                        $timeout(function (){
                            removeEntidade(ent);
                            self.modalLoading.dismiss('cancel');
                        },300);
                    break;
                }
                break;
            case 'desfazer':
                if (ent[0].status !== 'C') {
                    ent[0].editavel = false;
                    $timeout(function () {
                        var obj = moduloPadrao.entidade.entidadesDB.filter(function (obj) {
                            return obj[0].id === ent[0].id;
                        })[0];
                        var objReferencia = helperService.clonadorDeObj(obj);
                        console.log('desfazendo essa porra ...');
                        console.log(objReferencia);
                        for (var x = 1; x < objReferencia.length; x++) {
                            ent[x] = objReferencia[x];
                        }
                        ent[0].status = 'R';
                        ent[0].ngClass = "fa fa-database";
                        ent[0].ngStyle = "color: #0077b3";
                        ent[0].toolTip = "não há alterações";
                    }, 300);
                } else {
                        console.log('nothing TO DO ');
                }
                break;
                
                 case 'salvar':
                    if (ent[0].status !== 'R') {
                        ent[0].editavel = false;
                        try {
                            buscaAPIService.salvaEntidadeTelaPadrao($scope.userDTO.configLisNet, moduloPadrao, $scope.userDTO.UNI_ST_CODIGO, ent)
                                    .then(function   sucesso(response) {
                                        var  _response =  response.data;
                                        var _responseType = typeof _response;
                                        if (_response && _responseType === 'string' && _response.indexOf('ORA-') !== -1) {
                                                notificacaoProvider.sweetError('Erro', _response);
                                            } else {
                                                console.log(response.data);
                                                ent[0].status = 'R';
                                                ent[0].ngClass = "fa fa-database";
                                                ent[0].ngStyle = "color: #0077b3";
                                                ent[0].toolTip = "não há alterações";
                                                substituiEntidadeDB(ent);
                                            }
                                        
                                    }, function erro(response) {
                                        console.log(response.statusText);
                                        notificacaoProvider.sweetError('Erro', response.statusText);
                                    });
                        } catch (error) {
                            console.log;
                            (error);
                            notificacaoProvider.sweetError('Erro', error);
                        }
                    } else {
                        console.log('nothing TODO ');
                    }
                break;
                
        }
    };
    
    function substituiEntidadeDB(ent){
        console.log('Inside substituiEntidadeDB');
//        console.log(ent);
        var _index ;
        for(var i  =0  ; i < moduloPadrao.entidade.entidadesDB.length; i ++){
            var entDB =moduloPadrao.entidade.entidadesDB[i];
            if(entDB[0].id === ent[0].id){
                console.log('achamos no entidadeDB , fazendo a troca');
               _index  = i; 
               break;
            }
        }
        if(_index){
            console.log('substituindo entidade ...');
             var entReferencia = helperService.clonadorDeObj(ent);
            moduloPadrao.entidade.entidadesDB[_index] = entReferencia;
        }
    }
    
    $scope.criarNovoRegistro = function () {
        console.log("moduloPadrao.entidade.colunas.length   =  " + moduloPadrao.entidade.colunas.length);
        self.modalLoading = notificacaoProvider.modalLoading('Criando', 'criando nova linha para registro', $scope);
        $timeout(function () {
            var _newEnt = [moduloPadrao.entidade.colunas.length + 1];
            var _dataEnt = {};
            _dataEnt.id = Number(new Date());
            _dataEnt.editavel = true;
            _dataEnt.status = 'C';
            _dataEnt.popup = {inicio: false, fim: false};
            _dataEnt.ngStyle = "color: orange";
            _dataEnt.ngClass = "fa fa-star-o";
            _dataEnt.toolTip = "novo item à ser salvo.";
            _dataEnt.dataPicker = [];
            _newEnt[0] = _dataEnt;
            for (var x = 0; x < moduloPadrao.entidade.colunas.length; x++) {
                _newEnt[x + 1] = null;
            }
//            console.log(_newEnt);
            if (angular.isUndefined(moduloPadrao.entidade.entidades)) {
                moduloPadrao.entidade.entidades = [];
                moduloPadrao.entidade.entidadesDB = [];
            }

            moduloPadrao.entidade.entidades.unshift(_newEnt);
            moduloPadrao.entidade.entidadesDB.unshift(helperService.clonadorDeObj(_newEnt));
            self.modalLoading.dismiss('cancel');
        }, 300);
    };
    
    
    
    
    $scope.mudarStatus = function (ent, indexParent, indexChild) {

        if (ent[0].editavel  && ent[0].status !== 'C' ) {
            console.log(' index filho  =  ' + indexChild);

            var obj = moduloPadrao.entidade.entidadesDB.filter(function (obj) {
                return obj[0].id === ent[0].id;
            })[0];

            var objReferencia = helperService.clonadorDeObj(obj);
            objReferencia.shift();

            var entReferencia = helperService.clonadorDeObj(ent);
            entReferencia.shift();

            if (helperService.comparaObjetos(objReferencia, entReferencia)) {
                console.log("they r equals ");
                ent[0].status = 'R';
                ent[0].ngStyle = "color: #0077b3";
                ent[0].ngClass = "fa fa-database";
                ent[0].toolTip = "não há alterações";
            } else {
                ent[0].ngStyle = "color: green ";
                ent[0].status = 'U';
                ent[0].toolTip = "registro marcado para atualização";
            }

//            console.log(objReferencia);
//            console.log(entReferencia);
        } else {
            console.log('Entidade nao eh editavel no momento ...');
        }
    };
    
    
    
    function carregarLista(blFiltro) {
        $scope.limparTela();
        moduloPadrao.title = 'Carregando ...';
        moduloPadrao.msg = 'Buscando ' + moduloPadrao.state.data.pageTitle + ' na base de Dados.';
        self.modalLoading = notificacaoProvider.modalLoading(moduloPadrao.title, moduloPadrao.msg, $scope);
        $timeout(function () {
            try {
                buscaAPIService.buscaEntidadeTelaPadrao($scope.userDTO.configLisNet, moduloPadrao, $scope.userDTO.unidade.UNI_ST_CODIGO, $scope.jsonTelaPadrao.limit, blFiltro)
                        .then(function successCallback(response) {
                            console.log('Entidades chegaram c sucesso .... aguarde construcao da tabela');
                            var retornoEntidades = response.data;
//                            console.log(typeof retornoEntidades);
                            if ((typeof retornoEntidades) === 'object') {
                                colocaIconesEstilos(retornoEntidades);
                                moduloPadrao.entidade.entidades = retornoEntidades;

                                if (angular.isUndefined($scope.dTOptionsBuilder)) {
                                    $scope.dTOptionsBuilder = constroeDTOptionsBuilder();
                                }
                                $timeout(function () {
                                    self.modalLoading.dismiss('cancel');
                                }, 700);
                            } else {
                                self.modalLoading.dismiss('cancel');
                                notificacaoProvider.sweetError("erro", retornoEntidades);
                                $scope.limparTela();
                            }
                        }, function errorCallback(response) {
                            notificacaoProvider.sweetError("erro", response.statusText);
                        });
            } catch (error) {
                notificacaoProvider.sweetError("erro", error);
            }
        }, 250);
    };
    
    function colocaIconesEstilos(data) {
        moduloPadrao.entidade.entidadesDB = [];

        if (data && typeof data != 'string') {
            for (var i = 0; i < data.length; i++) {
                var _entidade = data[i];
                var dataEnt = {};
                dataEnt.id = i;
                dataEnt.status = 'R';
                dataEnt.popup = {inicio: false, fim: false};
                dataEnt.ngStyle = "color: #0077b3";
                dataEnt.ngClass = "fa fa-database";
                dataEnt.toolTip = "não há alterações";
                dataEnt.dataPicker = [];
//            console.log(' _entidade[0] = '+ _entidade[0]);

                for (var y = 0; y < _entidade.length; y++) {
                    var _v = _entidade[y];
                    if (_v && _v.length === 1) {
                        if (_v === 'S') {
                            _entidade[y] = true;
                        } else if (_v === 'N') {
                            _entidade[y] = false;
                        }
                    } else if (_v && _v.length === 24 && _v.substring(_v.length - 1, _v.length) === 'Z') {
//                        console.log(_v);
                        _entidade[y] = new Date(_v);
                        dataEnt.dataPicker.push(false);
                    }
                }
                _entidade.shift();
                _entidade.unshift(dataEnt);
                moduloPadrao.entidade.entidadesDB.push(helperService.clonadorDeObj(_entidade));
            }
        } else {
//            moduloPadrao.entidade.entidadesDB = [];
//            moduloPadrao.entidade.entidades = [];
            console.log('nothing TO DO ....');
            $scope.limparTela();
        }


    }
    
    
    $scope.buscaTipo = function (chTipo ) {
        console.log('chTipo = '+chTipo);
        if(angular.isDefined(chTipo)){
            if (chTipo.toUpperCase() === 'E') {
                return 'text';
            } else if (chTipo.toUpperCase() === 'C') {
                return 'checkbox';
            }
        }else{
            return 'text';
        }

        
    };
    
    $scope.limparTela = function ( ) {
        moduloPadrao.entidade.entidades = [];
        moduloPadrao.entidade.entidadesDB = [];
    };


    function retornaPesquisa(){
    if(moduloPadrao.entidade.pesquisas){
      for(y in moduloPadrao.entidade.pesquisas){
            var pesquisaJSON = moduloPadrao.entidade.pesquisas[y];
            if(pesquisaJSON.nome === moduloPadrao.entidade.pesquisa){
                moduloPadrao.entidade.pesquisaJSON = pesquisaJSON;
//                console.log(JSON.stringify(moduloPadrao.entidade.pesquisaJSON, null, 2));
                break;
            }
        }  
    }else{
      console.log('escolha um filtro p pesquisa ..');  
    }
        
    };
    function  encontraModulo(e) {
        return e.modStCodigo === modStCodigo;
    };
    function montaModulo(_modStCodigo) {
        mp = {modStCodigo: _modStCodigo};
        mp.state = $state.current;
//        mp.dTOptionsBuilder = constroeDTOptionsBuilder();
        $scope.userDTO.telaPadrao.push(mp);
        return mp;
    };
    
    
    function constroeDTOptionsBuilder(){
            return  DTOptionsBuilder.newOptions()
                .withDOM('<"html5buttons"B>lTfgitp')
                .withOption('stateSave', false)
//                .withOption('searching', true)
                .withOption('lengthMenu', [10, 25, 50, 100, 150, 200])
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
//                    {extend: 'copy'},
//                    {extend: 'csv'},
//                    {extend: 'excel', title: 'Lista_configuracoes'},
//                    {extend: 'pdf', title: 'Lista_configuracoes'},
                    {
//                        extend: 'print',
                        customize: function (win) {
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                        }
                    }
                ]);
    }

};

angular.module('lisnet')
        .controller('telaPadrao', telaPadrao);


