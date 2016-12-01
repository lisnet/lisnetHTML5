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
    if(angular.isUndefined(moduloPadrao.campos)){
        console.log('buscando campos .....');
        buscaAPIService.buscaModuloTelaPadrao($scope.userDTO.configLisNet,modStCodigo)
                .then(function successCallback(response){
                    moduloPadrao.entidade = response.data;

                        $scope.moduloPadrao = moduloPadrao;
                       
                        
                },function errorCallback(response){
                    notificacaoProvider.sweetWarning("erro", response.statusText);
                });
    }else{
        $scope.moduloPadrao = moduloPadrao;
    }
    
    
    
    
    
    $scope.filtrar = function ( ) {
        self.modalLoading = notificacaoProvider.modalLoading('filtrando', 'filtrando', $scope);
        $timeout(function () {
            buscaAPIService.buscaEntidadeTelaPadrao($scope.userDTO.configLisNet, modStCodigo)
                    .then(function successCallback(response) {
                        moduloPadrao.entidade.entidades = response.data;

                        $scope.moduloPadrao = moduloPadrao;
                        if (angular.isUndefined($scope.dTOptionsBuilder)) {
                            $scope.dTOptionsBuilder = constroeDTOptionsBuilder();
                        }
                        $timeout(function () {
                            self.modalLoading.dismiss('cancel');
                        }, 500);

                    }, function errorCallback(response) {
                        notificacaoProvider.sweetWarning("erro", response.statusText);
                    });
        }, 150);

    };
    $scope.limparTela = function ( ) {
        moduloPadrao.entidade.entidades = [];
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
                    {extend: 'copy'},
                    {extend: 'csv'},
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


