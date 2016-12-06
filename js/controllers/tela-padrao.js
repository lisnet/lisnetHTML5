/* 
 Created on : Nov 29, 2016, 2:10:26 PM
 Author     : eros
 */

function telaPadrao($scope,$state ,buscaAPIService, $stateParams, $localStorage, sairDoSistemaService, notificacaoProvider, $window, gerenciaRelatorioService, $filter, $timeout, $uibModal, DTOptionsBuilder, $interval, shareuser) {
//{tabela:_tabelaNome,modulo:[{"MOD_ST_CODIGO": "00021",... }],conteudo:};
    var self = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
//    constroeDTOptionsBuilder();
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
        console.log("ent  = "+ JSON.stringify(ent,null,2));
        if(ent.editavel){
            ent.editavel = false;  
        }else{
            ent.editavel = true;  
        }
      
    };
    
    
    
    $scope.mudarStatus = function (ent){
        if(!moduloPadrao.entidade.entidadesDB){
            moduloPadrao.entidade.entidadesDB = [];
        }
        ent[0] = 'U';
        ent.ngStyle = "color: #085  ";
        ent.ngClass = "fa fa-floppy-o ";
      
    };
    
    function carregarLista(blFiltro){
        moduloPadrao.title = 'Carregando ...';
        moduloPadrao.msg = 'Buscando '+moduloPadrao.state.data.pageTitle+' na base de Dados.';
        self.modalLoading = notificacaoProvider.modalLoading(moduloPadrao.title, moduloPadrao.msg, $scope);
         $timeout(function () {
            buscaAPIService.buscaEntidadeTelaPadrao($scope.userDTO.configLisNet, moduloPadrao,blFiltro)
                    .then(function successCallback(response) {
                        console.log('Entidades cheram c sucesso ....');
                        var retornoEntidades = response.data;
                        colocaIconesEstilos(retornoEntidades);
                        moduloPadrao.entidade.entidades = retornoEntidades;
                        
                        if (angular.isUndefined($scope.dTOptionsBuilder)) {
                            $scope.dTOptionsBuilder = constroeDTOptionsBuilder();
                        }
                        $timeout(function () {
                            self.modalLoading.dismiss('cancel');
                        }, 500);

                    }, function errorCallback(response) {
                        notificacaoProvider.sweetError("erro", response.statusText);
                    });
        }, 150);
        
    }
    
    function colocaIconesEstilos(data){
        for(var i = 0; i < data.length; i ++){
            var _entidade = data[i];
            _entidade.ngStyle = "color: #0077b3";
            _entidade.ngClass = "fa fa-database";
            console.log(' _entidade[0] = '+ _entidade[0]);

                for(var y = 0 ; y < _entidade.length ; y ++){
                    var _v = _entidade[y];
                    if(_v && _v.length === 1){
                        if(_v === 'S'){
                            _entidade[y] = true;
                        }else if(_v === 'N'){
                            _entidade[y] = false;
                        }
                    }
                }
        }
    }
    
//    $scope.buscaStyles = function (e ) {
//        if(e === 'R'){
//            return 'color: #0077b3 ';
//        }else if(e === 'U'){
//            return 'color: #085 ';
//        }else if(e === 'C'){
//            return '#0081c2';
//        }else if(e === 'D'){
//            return 'color: red';
//        }
//    };
    
//    $scope.buscaIcons = function (e ) {
//        if(e === 'R'){
//            return 'fa fa-database ';
//        }else if(e === 'U'){
//            return 'fa fa-floppy-o ';
//        }else if(e === 'C'){
//            return 'fa fa-floppy-o ';
//        }else if(e === 'D'){
//            return 'fa fa-times ';
//        }
//    };
    
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
    };


    function retornaPesquisa(){
    if(moduloPadrao.entidade.pesquisas){
      for(y in moduloPadrao.entidade.pesquisas){
            var pesquisaJSON = moduloPadrao.entidade.pesquisas[y];
            if(pesquisaJSON.nome === moduloPadrao.entidade.pesquisa){
                moduloPadrao.entidade.pesquisaJSON = pesquisaJSON;
                console.log(JSON.stringify(moduloPadrao.entidade.pesquisaJSON, null, 2));
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
                .withOption('stateSave', true)
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


