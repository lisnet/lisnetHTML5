/* 
 Created on : Oct 19, 2016, 2:37:45 PM
 Author     : eros
 */


function controleNotificacoes($scope,$localStorage,sairDoSistemaService,helperService,$rootScope,$window,hotkeys,$uibModal,DTOptionsBuilder){
    
    console.log('Inicializando controleNotificacoes');

    $scope.userDTO = sairDoSistemaService.validarLogin();
    
    $scope.qtdNotificacaoDesc = $scope.userDTO.deviceDetector.isMobileDevice ? 30 : 300;

    

    if (!$scope.states) {
        $scope.states = [];
        $scope.states.push('configuraperfilusuario | Editar / Configurar Usuário');
        $scope.states.push('controle_notificacoes | Controle de Notificações');
        $scope.states.push('widgets | Home Painel de Widgets do Usuário, Inicio , Inĩcio, Começo, Casa');
        $scope.states.push('sair | Sair do Sistema quit exit :q');
        for (i in $scope.userDTO.perfil) {

            var p = $scope.userDTO.perfil[i];
//        $scope.states.push(p.MOD_ST_CODIGO);

            for (y in p.telas) {

                var f = p.telas[y];
                if (f.telas && f.telas.length > 0) {
                    for (x in f.telas) {
                        var n = f.telas[x];
                        if (n.visualisar) {
                            $scope.states.push(n.MOD_ST_CODIGO + ' | ' + n.MOD_ST_DESCRICAO);
                        }
                    }
                } else {
                    if (f.visualisar) {
                        $scope.states.push(f.MOD_ST_CODIGO + ' | ' + f.MOD_ST_DESCRICAO);
                    }
                }

            }
        }
    }
    


$scope.userDTO.bellClass = "label-primary";
    checkNewNotification();
    
    
    var qdtNotificacaoResumida = 6;
    $scope.notificacoesResumida = [];
    
    
    
    
    
    String.prototype.isNumber = function(){return /^\d+$/.test(this);};
    
    $scope.telaSelecionada = '';
    
    $scope.cortaString = function (str){
        var _array = str.split('|');
//        return _array[0];
        var idDaPagina = _array[0].trim();
        $scope.telaSelecionada = '';
        return idDaPagina;
    };
    
 $scope.onSelect = function ($item, $model, $label) {
    $scope.$item = $item;
    $scope.$model = $model;
    $scope.$label = $label;
    console.log("$item = "+$item+" $model =  "+ $model+ "  $label = " +  $label);
        return  $scope.cortaString($item);
};
    
    $scope.cortaStringModStCodigo = function (str){
        var _array = str.split('|');
//        return _array[0];
//        var modStCodigo = _array[0].trim();
//        $scope.telaSelecionada = '';
        return  _array[0].trim();
    };
   
    
    

    $scope.openRelatorio = function (status,codigo_rastreio){
        console.log('Inside openRelatorio codigo_rastreio = '+codigo_rastreio);
        if(status === 'P'){
            var url = $scope.userDTO.configLisNet.baseUrl +'/relatorio/download?codigo_rastreio=' +codigo_rastreio+'&dbname='+$scope.userDTO.configLisNet.defaultDB;
         $window.open(url, '_blank');
        }else{
            
        }
    };
    
    $scope.startTimer = function (){
        $rootScope.$broadcast("startNotificacaoTimer");
    };
    
    $scope.resumeNofificacao = function (){
        checkNewNotification();
    if($scope.userDTO && $scope.userDTO.notificacoes && $scope.userDTO.notificacoes.length < qdtNotificacaoResumida){
            $scope.notificacoesResumida = $scope.userDTO && $scope.userDTO.notificacoes;
    }else if($scope.userDTO && $scope.userDTO.notificacoes && $scope.userDTO.notificacoes.length > qdtNotificacaoResumida){
            $scope.notificacoesResumida =  $scope.userDTO.notificacoes.slice(0,qdtNotificacaoResumida);
    }else{
            $scope.notificacoesResumida =  $scope.userDTO.notificacoes;
    }
  $rootScope.$broadcast("startNotificacaoTimer");
};
 
    function checkNewNotification() {
        for (var x in $scope.userDTO.notificacoes) {
            var not = $scope.userDTO.notificacoes[x];
            if (not.isNew) {
                $scope.userDTO.bellClass =  "label-danger";
                break;
            }
        }
        $scope.userDTO.bellClass =   "label-primary";
    };


 $scope.escolheUnidade = function (uniStCodigo){
        $scope.userDTO.unidade = helperService.retornaUnidade(uniStCodigo,$scope.userDTO.unidades);
    };
    
    
    $scope.popUnidades =  function (){
        
        var modalInstance  = $uibModal.open({
            templateUrl: 'views/troca_unidade_modal.html',
            size: 'lg',
            controller: ModalInstanceCtrl,
            scope: $scope
        });
        
    };
    
    function ModalInstanceCtrl($scope, $uibModalInstance) {

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

 $scope.dtOptionsTrocaUnidade = DTOptionsBuilder.newOptions()
                .withDOM('<"html5buttons"B>lTfgitp')
                .withOption('stateSave', false)
//                .withOption('searching', true)
                .withOption('lengthMenu', [8, 15, 30, 60, 150, 200])
                //        .withLanguage([{url:"//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese.json"}])
                .withLanguage({
                    "sProcessing": "A processar...",
                    "sLengthMenu": "Mostrar _MENU_ registos",
                    "sZeroRecords": "Não foram encontrados resultados",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                    "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
                    "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
//                    "sInfoPostFix": "",
//                    "sSearch": "Procurar:",
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
        
      $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('stateSave', true)
        .withOption('lengthMenu', [10,25,50, 100, 150, 200])
    //        .withLanguage([{url:"//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese.json"}])
         .withLanguage({
	"sProcessing":   "A processar...",
	"sLengthMenu":   "Mostrar _MENU_ registos",
	"sZeroRecords":  "Não foram encontrados resultados",
	"sInfo":         "Mostrando de _START_ até _END_ de _TOTAL_ registos",
	"sInfoEmpty":    "Mostrando de 0 até 0 de 0 registos",
	"sInfoFiltered": "(filtrado de _MAX_ registos no total)",
	"sInfoPostFix":  "",
	"sSearch":       "Procurar:",
	"sUrl":          "",
	"oPaginate": {
	    "sFirst":    "Primeiro",
	    "sPrevious": "Anterior",
	    "sNext":     "Seguinte",
	    "sLast":     "Último"
	}})
        .withButtons([
            {extend: 'copy',text:'Copiar'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Lista_de_Notificacoes'},
            {extend: 'pdf', title: 'Lista_de_Notificacoes'},
            {extend: 'print',text:'Imprimir',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);  
        
}


angular.module('lisnet')
        .controller('controleNotificacoes',controleNotificacoes);


