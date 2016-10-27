/* 
 Created on : Jan 12, 2016, 1:37:18 PM
 Author     : eros
 */
function consultaLaudos($scope, $filter, sairDoSistemaService, base64, montaUrlLaudoProvider, buscaAPIService, $sce,  $state, $localStorage,
DTOptionsBuilder,$window,$interval,$timeout,notificacaoProvider,determinaAparelhoProvider, $stateParams) {
var self = this;

console.log('Inicializando consultaLaudo');
$scope.userDTO = sairDoSistemaService.validarLogin();


//$scope.userDTO = $localStorage.userDTO;
//    if ($stateParams.userDTO) {
//        console.log('Usando $stateParams');
//        $scope.userDTO = angular.fromJson($stateParams.userDTO);
//    } else {
//        $scope.userDTO = $localStorage.userDTO;
//    }
$scope.popup = {
        inicio: false, fim: false
    };

    $scope.openPopInicio = function () {
        $scope.popup.inicio = true;
    };
    $scope.openPopFim = function () {
        $scope.popup.fim = true;
    };
$scope.tipoformat  = 'dd/MM/yyyy';

$scope.tipoDebusca  = 'data';
$scope.tiposDebusca = [{tipo:'data',desc:'Buscar por Datas'},{tipo:'solicitacao',desc:'Buscar por Solicitação'},{tipo:'prontuario',desc:'Buscar por Prontuário'},{tipo:'sus',desc:'Buscar por Código SUS'},{tipo:'nome',desc:'Buscar por Nome'}];
$scope.tipoDeBuscaVisualizar = {mostrarData:true,mostrarSolicitacao:false,mostrarProntuario:false,mostrarSUS:false,mostrarNome:false};
$scope.trocarVisualizacao = function (){
        switch ($scope.tipoDebusca){
            case '':
                break;
                case 'data':
                    $scope.tipoDeBuscaVisualizar = {mostrarData:true,mostrarSolicitacao:false,mostrarProntuario:false,mostrarSUS:false,mostrarNome:false};
                    ultimoCampo = 'datas';
                break;
                case 'solicitacao':
                    $scope.tipoDeBuscaVisualizar = {mostrarData:false,mostrarSolicitacao:true,mostrarProntuario:false,mostrarSUS:false,mostrarNome:false};
                    ultimoCampo = 'REQ_ST_CODIGO';
                break;
                case 'prontuario':
                    $scope.tipoDeBuscaVisualizar = {mostrarData:false,mostrarSolicitacao:false,mostrarProntuario:true,mostrarSUS:false,mostrarNome:false};
                    ultimoCampo = 'PAC_ST_PRONTUARIO';
                break;
                case 'sus':
                    $scope.tipoDeBuscaVisualizar = {mostrarData:false,mostrarSolicitacao:false,mostrarProntuario:false,mostrarSUS:true,mostrarNome:false};
                    ultimoCampo = 'PAC_IN_CODSUS';
                break;
                case 'nome':
                    $scope.tipoDeBuscaVisualizar = {mostrarData:false,mostrarSolicitacao:false,mostrarProntuario:false,mostrarSUS:false,mostrarNome:true};
                    ultimoCampo = 'PAC_ST_NOME';
                break;
                default :
                    $scope.tipoDeBuscaVisualizar = {mostrarData:true,mostrarSolicitacao:false,mostrarProntuario:false,mostrarSUS:false,mostrarNome:false};
                    ultimoCampo = 'datas';
        }  
};

var myDate = new Date();
if($scope.userDTO.USU_IN_QTDDIA && $scope.userDTO.USU_IN_QTDDIA <= 30){
    minDate = new Date(myDate.getFullYear() ,myDate.getMonth()    ,myDate.getDate() - $scope.userDTO.USU_IN_QTDDIA) ;
}else if($scope.userDTO.USU_IN_QTDDIA && $scope.userDTO.USU_IN_QTDDIA >= 30){
    minDate = new Date(myDate.getFullYear() ,myDate.getMonth() - ($scope.userDTO.USU_IN_QTDDIA / 30)  ,myDate.getDate() ) ;
}else{
    minDate = new Date(myDate.getFullYear() ,myDate.getMonth() -1 ,myDate.getDate() ) ;
}
    
 maxDate = new Date(myDate.getFullYear(),myDate.getMonth(),myDate.getDate());
            
            

$scope.dataPesquisa = {dtInicio: new Date(),dtFim : new Date(),minDate: minDate,maxDate:maxDate};
$scope.mostraLaudo = {iframe:false,iframepdf:false,image:true,loading:false};


 $scope.calcRangeDate = function (){
     ultimoCampo = 'datas';
     var dt = $scope.dataPesquisa.dtFim;
     $scope.dataPesquisa.minDate = new Date(
            dt.getFullYear() ,
            dt.getMonth() - 2,
            dt.getDate());

    if($scope.dataPesquisa.minDate > $scope.dataPesquisa.dtInicio){
        $scope.dataPesquisa.dtInicio = $scope.dataPesquisa.minDate; 
    }
 };
       





    
    if ($scope.userDTO != null && $scope.userDTO.perfil != null && $scope.userDTO.perfil.length > 0  &&  $localStorage.userDTO.status === 'in') {
        var goBack = true;
        for (var i = 0; i < $scope.userDTO.perfil.length; i++) {
            var p = $scope.userDTO.perfil[i];
            if (p.MOD_ST_CODIGO == '00080') {
                goBack = false;
                break;
            }
        }
//var req = {REQ_ST_CODIGO:'teste',PAC_ST_NOME:'Jose Ninguem',PAC_ST_SEXO:'Masculino',REQ_DT_ENTRADA: new Date(),UNI_ST_CODIGO:'001'};
        if ($scope.userDTO.consultalaudo == null) {
            $scope.userDTO.consultalaudo = {unidadeId:$scope.userDTO.unidades[0].UNI_ST_CODIGO,requisicoes :[] };
//            $scope.userDTO.consultalaudo.requisicoes[0] = req;
//            $scope.userDTO.consultalaudo.unidadeId = $scope.userDTO.unidades[0].UNI_ST_CODIGO;
//            $scope.userDTO.consultalaudo.requisicoes = [];
            
        }
        
//        if (goBack)
//            $state.go('login');
    } else {
//        $state.go('login');
    }



    
    //Salvando para recuperacao apos refresh
    $localStorage.userDTO = $scope.userDTO;

    $scope.tirandoOMouse = function () {
        console.log('tirando a porra do mouse ...');
    };


    var ultimoCampo = '';
    $scope.quemMudouPorUltimo = function (campoID) {
        console.log(campoID);
        ultimoCampo = campoID;
    };
    runFiltrar = true;
    $scope.filtrar = function (ev) {
        notificacaoProvider.showDialogLoding($scope,ev);
        self.activated = true;
        

           /*
            * Debloqueio p nova excucao
            */
           $timeout( function(){ console.log('Inside TimeOut');  runFiltrar = true; }, 4000);
           if(runFiltrar){
               runFiltrar = false;
               var _startFilter =  $filter('date')($scope.dataPesquisa.dtInicio, 'dd-MM-yyyy');
               var _endFilter =  $filter('date')($scope.dataPesquisa.dtFim, 'dd-MM-yyyy');
//               console.log('----------------------------------------------------------------------------------------------------------------------------------------');
//               console.log(_startFilter);
//               var _start = $scope.dataPesquisa.dtInicio.getDate()+'-'+$scope.dataPesquisa.dtInicio.getMonth()+'-'+$scope.dataPesquisa.dtInicio.getFullYear();
//               var _end  = $scope.dataPesquisa.dtFim.getDate()+'-'+$scope.dataPesquisa.dtFim.getMonth()+'-'+$scope.dataPesquisa.dtFim.getFullYear();
        var args =  '';
//        console.log("inicio = "+_startFilter+"    Fim = "+_endFilter);
        switch (ultimoCampo) {
            case 'REQ_ST_CODIGO':
                console.log('Inside de Case '+ultimoCampo);
                args = "?campoDePesquisa=REQ_ST_CODIGO&valor="+$scope.userDTO.consultalaudo.requisicao+"&unidade="+$scope.userDTO.consultalaudo.unidadeId;
                break;
            case 'PAC_ST_PRONTUARIO':
                console.log('Inside de Case '+ultimoCampo);
                args = "?campoDePesquisa=PAC_ST_PRONTUARIO&valor="+$scope.userDTO.consultalaudo.prontuario+"&unidade="+$scope.userDTO.consultalaudo.unidadeId;
                break;
            case 'PAC_IN_CODSUS':
                console.log('Inside de Case '+ultimoCampo);
                args = "?campoDePesquisa=PAC_IN_CODSUS&valor="+$scope.userDTO.consultalaudo.sus+"&unidade="+$scope.userDTO.consultalaudo.unidadeId;
                break;
            case 'PAC_ST_NOME':
                console.log('Inside de Case '+ultimoCampo);
                args = "?campoDePesquisa=PAC_ST_NOME&valor="+$scope.userDTO.consultalaudo.nome+"&unidade="+$scope.userDTO.consultalaudo.unidadeId;
                break;
            case 'datas':
                console.log('Inside de Case '+ultimoCampo);
                args = "?campoDePesquisa=datas&dtInicio="+_startFilter+"&dtFim="+_endFilter+"&unidade="+$scope.userDTO.consultalaudo.unidadeId;
                break;
            default :
                console.log('Inside de Case Default');
                args = "?campoDePesquisa=datas&dtInicio="+_startFilter+"&dtFim="+_endFilter+"&unidade="+$scope.userDTO.consultalaudo.unidadeId;

        }
            buscaAPIService.buscaRequisicoes(args,$scope.userDTO.configLisNet)
                    .then(function successCallback(response){
                                       $scope.userDTO.consultalaudo.requisicoes = response.data;
//                               console.log("Quantidade total de registros : "+$scope.userDTO.consultalaudo.requisicoes.length);
                                       $localStorage.userDTO = $scope.userDTO;
                                       notificacaoProvider.closeDialog();
                                   },
                                        function errorCallback(response){
                                            console.log(response.statusText);
//                                            showDialog("Sem unidades","Usuario não tem unidades cadastradas",'Fechar','Aviso',response.statusText); 
                                            notificacaoProvider.closeDialog();
                                   }) ;
           }else{
//               alert('Espera porra');
               console.log('Espera porra.......');
               notificacaoProvider.showDialog("Aguarde",'Em execução','Fechar','Aviso',ev); 
           }
    };

//    console.log('Running consultaLaudo........');
//    $scope.userDTO = JSON.parse(localStorage.getItem('userDTO'));

//    $scope.urlLaudo = $sce.trustAsResourceUrl(localStorage.getItem('urlLaudo')); //localStorage.getItem('urlLaudo');
    


    $scope.montaURLLaudo = function (req_in_codigo, leg_st_codigo, ev) {
        
        notificacaoProvider.showDialogLoding($scope,ev);
//            console.log("leg_st_codigo = "+leg_st_codigo);
        if (leg_st_codigo != null &&   ( leg_st_codigo == '016' ||  leg_st_codigo == '011' ||  leg_st_codigo == '007')) {
            $scope.mostraLaudo = {iframe:false,iframepdf:false,image:false,loading:true};
            
            if (leg_st_codigo == '016' ||  leg_st_codigo == '011' ) {
                $timeout(function(){$scope.mostraLaudo = {iframe:false,iframepdf:true,image:false,loading:false};},2000);
            }else{
                $timeout(function(){$scope.mostraLaudo = {iframe:true,iframepdf:false,image:false,loading:false};},1000);
            }
            
            
            var cliente = $scope.userDTO.configLisNet;
            var xhttp = buscaAPIService.buscaTimeStamp(cliente);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    var dateAsString = JSON.parse(xhttp.responseText).TIME;
                    var urlLaudoJson = montaUrlLaudoProvider.monta(req_in_codigo, dateAsString, $scope.userDTO.cliente);
                    var url = urlLaudoJson.urlLaudo;
                    var urlLaudoPDF = urlLaudoJson.urlLaudoPDF;
                    $scope.urlLaudo = $sce.trustAsResourceUrl(url);
                    $scope.urlLaudoPDF = $sce.trustAsResourceUrl(urlLaudoPDF);
//                    console.log("urlPDF: " + urlLaudoPDF);
                    if(determinaAparelhoProvider.isMobile($scope.userDTO.deviceDetector)){
                        
                        if (leg_st_codigo == '016' || leg_st_codigo == '011') {
                            notificacaoProvider.closeDialog();
//                            $mdDialog.cancel();
                            $window.open(urlLaudoPDF, '_self');
                        } else {
                            notificacaoProvider.closeDialog();
//                            $mdDialog.cancel();
                            $window.open(url, '_self');
                        }
                        
                    }else{
                        notificacaoProvider.closeDialog();
                        $scope.$apply();
                    }
                    
//                    $window.open(urlLaudoPDF, '_target');
                   
                } else {
//                    $scope.msg = 'Problemas na conexão com o servido de Laudo !!! ';
                    notificacaoProvider.closeDialog();
                    $mdDialog.cancel();
//                    notificacaoProvider.showDialog("Aviso",'Problemas na conexão com o servido de Laudo !!! ','Fechar',ev); 
                }
            };
        }else{
            $scope.mostraLaudo = {iframe:false,image:false,loading:true};
            $timeout(function(){$scope.mostraLaudo = {iframe:false,iframepdf:false,image:true,loading:false};},300);
            notificacaoProvider.showDialog("Aviso",'Solicitação não possue exames liberados no momento','Fechar',ev); ;
        }

    };

    $scope.visualizarLaudo = function (req) {
//        console.log(req);
        if (req != null && req.exames != null && req.exames.length > 0) {
            var retorno = false;
            for (var i = 0; i < req.exames.length; i++) {
                var ex = req.exames[i];
                if (ex.LEG_ST_CODIGO == '008' || ex.LEG_ST_CODIGO == '011' || ex.LEG_ST_CODIGO == '016') {
                    retorno = true;
                } else {
                    retorno = false;
                    break;
                }
            }
            return retorno;
        } else {
            return false;
        }
    };

    $scope.goback = function () {
        $state.go('laudo-paciente');
    };

    $scope.sairDoSistema = function () {
        return sairDoSistemaService.logOut();
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    };
    
    
    $scope.printUserDTO = function (){
        console.log(JSON.stringify($scope.userDTO));
    };



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
            {extend: 'copy'},
//            {extend: 'csv'},
//            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);
        
        $scope.dtOptionsMobile = DTOptionsBuilder.newOptions()
                .withDOM('<"html5buttons"B>lTfgitp')
                .withOption('stateSave', true)
                //        .withLanguage([{url:"//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese.json"}])
//                .withDisplayLength(2)
                .withOption('lengthMenu', [10,25,50, 100, 150, 200])
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
                    }}).withButtons([
//            {extend: 'copy'},
    //            {extend: 'csv'},
    //            {extend: 'excel', title: 'ExampleFile'},
//            {extend: 'pdf', title: 'ExampleFile'},
//            {extend: 'print',
//                customize: function (win) {
//                    $(win.document.body).addClass('white-bg');
//                    $(win.document.body).css('font-size', '10px');
//
//                    $(win.document.body).find('table')
//                            .addClass('compact')
//                            .css('font-size', 'inherit');
//                }
//            }
        ]);
        
        $scope.retornaDate = function (strDate){
        return new Date(strDate);
    };

}

angular.module('lisnet').controller('consultaLaudos', consultaLaudos);
//        .config(function ($mdDateLocaleProvider) {
////            console.log('Config insede   cadastroAtendimento');
//            $mdDateLocaleProvider.msgCalendar = 'Calendario';
////            $mdDateLocaleProvider.months = ['Janeiro', 'Fevereiro', 'Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novenbro','Desembro'];
//            $mdDateLocaleProvider.months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novenbro', 'Dezembro'];
//            $mdDateLocaleProvider.shortMonths = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
//            $mdDateLocaleProvider.days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado'];
//            $mdDateLocaleProvider.shortDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
//
////            $mdDateLocaleProvider.formatDate = function (date) {
//////                return moment(date).format('DD/MM/YYYY');
////                return moment(date).format('L');
////            };
//            $mdDateLocaleProvider.parseDate = function (dateString) {
////                var m = moment(dateString, 'L', true);
//                var m = moment(dateString, 'DD/MM/YYYY', true);
//                return m.isValid() ? m.toDate() : new Date(NaN);
//            };
//            $mdDateLocaleProvider.formatDate = function (date) {
//                return moment(date).format('DD/MM/YYYY');
////                return moment(date).format('L');
//            };
////              $mdDateLocaleProvider.monthHeaderFormatter = function(date) {
////                return shortMonths[date.getMonth()] + ' ' + date.getFullYear();
////              };
//
//            $mdDateLocaleProvider.weekNumberFormatter = function (weekNumber) {
//                return 'Semana ' + weekNumber;
//            };
//            $mdDateLocaleProvider.msgCalendar = 'Calendario';
//            $mdDateLocaleProvider.msgOpenCalendar = 'Ouvir o Calendario';
//
//
//        })
                
