/* 
 Created on : Nov 29, 2016, 2:10:26 PM
 Author     : eros
 */

function telaPadrao($scope,$state ,buscaAPIService, $stateParams, $localStorage, sairDoSistemaService, notificacaoProvider, $window, gerenciaRelatorioService, $filter, $timeout, $uibModal, DTOptionsBuilder, $interval, shareuser,helperService) {
//{tabela:_tabelaNome,modulo:[{"MOD_ST_CODIGO": "00021",... }],conteudo:};
    var self = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
    
    
    
//    constroeDTOptionsBuilder();

//    $scope.altInputFormats = ['MM/dd/yyyy'];
//    $scope.formatDay  =  'dd/MM/yyyy';
    $scope.formatHour =  'HH:mm:ss';
    $scope.popup = {inicio: false, fim: false};
//    $scope.openPopInicio = function () {$scope.popup.inicio = true;};
    $scope.opeDataPicker = function (entidade,indexE) {
//        console.log(JSON.stringify(entidade,null,2));
//        var dataEnt = 
                entidade[0].dataPicker[indexE] = true;
//        dataEnt.dataPicker[indexE] = true;
    };
    
//    $scope.isOpeDataPicker = function (entidade,indexE) {
//        console.log(JSON.stringify(entidade,null,2));
//        var dataEnt = entidade[entidade.length-1];
//         return  dataEnt.dataPicker[indexE] ;
//    };
    
//    $scope.openPopFim = function (entidade) {
//        dataEnt.fim = true;
//    };
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
    var modStCodigo = $stateParams.modStCodigo;
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
                    moduloPadrao.entidade = response.data;

                        $scope.moduloPadrao = moduloPadrao;
                        if(!moduloPadrao.entidade.pesquisaTipo){
                             moduloPadrao.entidade.pesquisaTipo = "0";
                             moduloPadrao.entidade.pesquisa = moduloPadrao.entidade.pesquisas[0].nome;
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
            moduloPadrao.entidade.pesquisaInput = moduloPadrao.entidade.pesquisaInput.toUpperCase();
            moduloPadrao.entidade.pesquisaInput = moduloPadrao.entidade.pesquisaInput.trim();
            carregarLista(blFiltro);
        }else if(!blFiltro) {
            carregarLista(blFiltro);
        }else{
            notificacaoProvider.sweetError('Erro', 'preencher os campos para filtrar a pesquisa');
        }
    };
    
    $scope.tronarEditavel = function (ent){
//        console.log("ent  = "+ JSON.stringify(ent,null,2));
        if(ent[0].editavel){
            ent[0].editavel = false;  
        }else{
            ent[0].editavel = true;  
        }
      
    };
    
    
    
    $scope.mudarStatus = function (ent, indexParent,indexChild){
        
        
        console.log(' index filho  =  '+indexChild);
        
        var obj = moduloPadrao.entidade.entidadesDB.filter(function ( obj ) {
            return obj[0].id === ent[0].id;
        })[0];
        
            var objReferencia = helperService.clonadorDeObj(obj);
            objReferencia.shift();

            var entReferencia = helperService.clonadorDeObj(ent);
            entReferencia.shift();
            
            if(helperService.comparaObjetos(objReferencia,entReferencia)){
                console.log("os objs sao iquais ");
                ent[0].status = 'R';
                ent[0].ngStyle = "color: #0077b3";
                ent[0].ngClass = "fa fa-database";
                ent[0].toolTip= "não há alterações";
            }else{
                ent[0].ngStyle = "color: green ";
                ent[0].status = 'U';
                ent[0].toolTip= "linha com informações à serem salvas..";
            }
            
            console.log(objReferencia);
            console.log(entReferencia);
        
        
        
    };
    
    function carregarLista(blFiltro){
        $scope.limparTela();
        moduloPadrao.title = 'Carregando ...';
        moduloPadrao.msg = 'Buscando '+moduloPadrao.state.data.pageTitle+' na base de Dados.';
        self.modalLoading = notificacaoProvider.modalLoading(moduloPadrao.title, moduloPadrao.msg, $scope);
         $timeout(function () {
            buscaAPIService.buscaEntidadeTelaPadrao($scope.userDTO.configLisNet, moduloPadrao,$scope.userDTO.UNI_ST_CODIGO,blFiltro)
                    .then(function successCallback(response) {
                        console.log('Entidades chegaram c sucesso .... aguarde construcao da tabela');
                        var retornoEntidades = response.data;
                        colocaIconesEstilos(retornoEntidades);
                        moduloPadrao.entidade.entidades = retornoEntidades;
                        
                        if (angular.isUndefined($scope.dTOptionsBuilder)) {
                            $scope.dTOptionsBuilder = constroeDTOptionsBuilder();
                        }
                        $timeout(function () {
                            self.modalLoading.dismiss('cancel');
                        }, 700);

                    }, function errorCallback(response) {
                        notificacaoProvider.sweetError("erro", response.statusText);
                    });
        }, 120);
        
    }
    
    function colocaIconesEstilos(data){
        moduloPadrao.entidade.entidadesDB = [];
        for(var i = 0; i < data.length; i ++){
            var _entidade = data[i];
            var dataEnt = {};
            dataEnt.id = i;
            dataEnt.status = 'R';
            dataEnt.popup = {inicio: false, fim: false};
            dataEnt.ngStyle = "color: #0077b3";
            dataEnt.ngClass = "fa fa-database";
            dataEnt.toolTip= "não há alterações";
            dataEnt.dataPicker = [];
//            console.log(' _entidade[0] = '+ _entidade[0]);

                for(var y = 0 ; y < _entidade.length ; y ++){
                    var _v = _entidade[y];
                    if(_v && _v.length === 1){
                        if(_v === 'S'){
                            _entidade[y] = true;
                        }else if(_v === 'N'){
                            _entidade[y] = false;
                        }
                    }else if(_v && _v.length === 24 && _v.substring(_v.length -1 , _v.length) === 'Z'){
//                        console.log(_v);
                        _entidade[y] = new Date(_v);
                        dataEnt.dataPicker.push(false);
                    }
                }
                _entidade.shift();
                _entidade.unshift(dataEnt);
//                _entidade.push(dataEnt);
                /*
                 * salvando o esta original de todos os objs
                 */
                moduloPadrao.entidade.entidadesDB.push(helperService.clonadorDeObj(_entidade));
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
                    {extend: 'excel', title: 'Lista_configuracoes'},
                    {extend: 'pdf', title: 'Lista_configuracoes'},
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
    }
    
    

};

angular.module('lisnet')
        .controller('telaPadrao', telaPadrao);


