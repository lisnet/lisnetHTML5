/* 
 Created on : Jan 12, 2016, 1:37:18 PM
 Author     : eros
https://github.com/fragaria/angular-daterangepicker
 */
function consultaLaudos($scope, $filter, sairDoSistemaService,  montaUrlLaudoProvider, buscaAPIService, $sce, $localStorage,
DTOptionsBuilder,$window, $timeout,notificacaoProvider,determinaAparelhoProvider, helperService,moment,$filter,$stateParams) {
var self = this;


console.log('Inicializando consultaLaudo ' );
$scope.userDTO = sairDoSistemaService.validarLogin();
if(!$scope.userDTO.consultalaudo){
    var uni0 = $scope.userDTO.unidades[0];
    $scope.userDTO.consultalaudo  = {unidadeId : uni0.UNI_ST_CODIGO+'-'+uni0.UNI_ST_DESCRICAO,dtInicio:new Date(),dtFim:new Date(),format : 'dd/MM/yyyy'};
}
$scope.inputREQ_ST_CODIGO = true;
$scope.paramsStateConfig =  $stateParams;

$scope.strMax = $filter('date')(new Date(), "yyyy-MM-dd");
var dtMin = new Date();
dtMin.setYear(dtMin.getYear()-1);
$scope.strMin = $filter('date')(dtMin, "yyyy-MM-dd");

var ultimoCampo = 'datas';
var valorCampo;

console.log('typeof = '+typeof $scope.strMax  +"  strMax = "+$scope.strMax);

//console.log(JSON.stringify(moment,null,2));

 $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
    };

 $scope.opts = {
        locale: {
            dateLimit:'{ months: 1 }',
            applyClass: 'btn-green',
            applyLabel: "Aplicar",
            cancelLabel: 'Cancelar',
            fromLabel: "de",
            toLabel: "para",
            customRangeLabel: 'Alcance',
            daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            firstDay: 1,
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril','Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro','Novembro', 'Desembro']
        },
        ranges: {'Últimos 7 dias': [moment().subtract(6, 'days'), moment()],'Últimos 30 dias': [moment().subtract(29, 'days'), moment()] }
    };
    
//     $scope.setStartDate = function () {
//        $scope.date.startDate = moment().subtract(4, "days");
//    };
//    $scope.setRange = function () {
//        $scope.date = {
//            startDate: moment().subtract(5, "days"),
//            endDate: moment()
//        };
//    };
    
    //Watch for date changes
    $scope.$watch('data', function(newDate) {
//        console.log('New date set: ', newDate);
        ultimoCampo = 'datas';
    }, false);

//$scope.datePicker = {};
//$scope.datePicker.date = {startDate: null, endDate: null};

// this.daterange = {startDate: null, endDate: null};
$scope.daterange = {startDate: new Date(), endDate: new Date()};


if($scope.userDTO.consultalaudo.dtInicio){
     $scope.userDTO.consultalaudo.dtInicio = new Date($scope.userDTO.consultalaudo.dtInicio);
     $scope.userDTO.consultalaudo.dtFim = new Date($scope.userDTO.consultalaudo.dtFim);
}


var rangeInMonths = 1;
var myDate = new Date();
if($scope.userDTO.USU_IN_QTDDIA && $scope.userDTO.USU_IN_QTDDIA <= 30){
    $scope.userDTO.consultalaudo.minDate = new Date(myDate.getFullYear() ,myDate.getMonth()    ,myDate.getDate() - $scope.userDTO.USU_IN_QTDDIA) ;
    rangeInMonths = 1;
}else if($scope.userDTO.USU_IN_QTDDIA && $scope.userDTO.USU_IN_QTDDIA >= 30){
      rangeInMonths = $scope.userDTO.USU_IN_QTDDIA / 30;
    $scope.userDTO.consultalaudo.minDate = new Date(myDate.getFullYear() ,myDate.getMonth() - ($scope.userDTO.USU_IN_QTDDIA / 30)  ,myDate.getDate() ) ;
}else{
    rangeInMonths = 1;
    $scope.userDTO.consultalaudo.minDate = new Date(myDate.getFullYear() ,myDate.getMonth() -1 ,myDate.getDate() ) ;
}
    
 $scope.userDTO.consultalaudo.maxDate = new Date();
  $scope.altInputFormats = ['MM/dd/yyyy'];

$scope.calcRangeDate = function (blFuturo){
     console.log('consultalaudo calcRangeDate Consulta Laujdo  ....');
     ultimoCampo = 'datas';
     var dtRetorno ;
     
            if(blFuturo){
                dtRetorno =helperService.rangeDatas(null, 1, $scope.userDTO.consultalaudo.dtInicio, true);
                $scope.userDTO.consultalaudo.maxDate = dtRetorno;
                if($scope.userDTO.consultalaudo.dtFim > dtRetorno){
                   $scope.userDTO.consultalaudo.dtFim = dtRetorno;
                }
                if($scope.userDTO.consultalaudo.dtFim < $scope.userDTO.consultalaudo.dtInicio){
                    $scope.userDTO.consultalaudo.dtInicio = $scope.userDTO.consultalaudo.dtFim;
                }
            }else{
                dtRetorno =helperService.rangeDatas(null, 1, $scope.userDTO.consultalaudo.dtFim, false);
                $scope.userDTO.consultalaudo.minDate = dtRetorno;
                if($scope.userDTO.consultalaudo.dtInicio < dtRetorno){
                   $scope.userDTO.consultalaudo.dtInicio = dtRetorno;
                }
                if($scope.userDTO.consultalaudo.dtInicio >$scope.userDTO.consultalaudo.dtFim){
                    $scope.userDTO.consultalaudo.dtFim = $scope.userDTO.consultalaudo.dtInicio;
                }
            }
     
     console.log('Data do retorno = ' + $filter('date')(dtRetorno,'dd/MM/yyyy'));
        
        
        $scope.dateOptionsMin = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: $scope.userDTO.consultalaudo.dtFim,
            minDate: $scope.userDTO.consultalaudo.minDate,
            startingDay: 1
        };
        
         $scope.dateOptionsMax = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: $scope.userDTO.consultalaudo.maxDate,
            minDate: $scope.userDTO.consultalaudo.dtInicio,
            startingDay: 1
        };
        
     };




    $scope.popup = {inicio: false, fim: false};

    $scope.openPopInicio = function () {$scope.popup.inicio = true;};
    
    $scope.openPopFim = function () {$scope.popup.fim = true;};

    $scope.tipoDebusca  = 'data';
//$scope.tiposDebusca = [{tipo:'data',desc:'Buscar por Datas'},{tipo:'solicitacao',desc:'Buscar por Solicitação'},{tipo:'prontuario',desc:'Buscar por Prontuário'},{tipo:'sus',desc:'Buscar por Código SUS'},{tipo:'nome',desc:'Buscar por Nome'}];
//$scope.tipoDeBuscaVisualizar = {mostrarData:true,mostrarSolicitacao:false,mostrarProntuario:false,mostrarSUS:false,mostrarNome:false};
    $scope.trocarVisualizacao = function (tipoDebusca,valor){
        console.log('tipoDebusca = '+tipoDebusca);
        switch (tipoDebusca){
                case 'datas':
//                    $scope.tipoDeBuscaVisualizar = {mostrarData:true,mostrarSolicitacao:false,mostrarProntuario:false,mostrarSUS:false,mostrarNome:false};
                    ultimoCampo = 'datas';
                break;
                case 'REQ_ST_CODIGO':
//                    $scope.tipoDeBuscaVisualizar = {mostrarData:false,mostrarSolicitacao:true,mostrarProntuario:false,mostrarSUS:false,mostrarNome:false};
                    ultimoCampo = 'REQ_ST_CODIGO';
                break;
                case 'PAC_ST_PRONTUARIO':
//                    $scope.tipoDeBuscaVisualizar = {mostrarData:false,mostrarSolicitacao:false,mostrarProntuario:true,mostrarSUS:false,mostrarNome:false};
                    ultimoCampo = 'PAC_ST_PRONTUARIO';
                break;
                case 'PAC_IN_CODSUS':
//                    $scope.tipoDeBuscaVisualizar = {mostrarData:false,mostrarSolicitacao:false,mostrarProntuario:false,mostrarSUS:true,mostrarNome:false};
                    ultimoCampo = 'PAC_IN_CODSUS';
                break;
                case 'PAC_ST_NOME':
//                    $scope.tipoDeBuscaVisualizar = {mostrarData:false,mostrarSolicitacao:false,mostrarProntuario:false,mostrarSUS:false,mostrarNome:true};
                    ultimoCampo = 'PAC_ST_NOME';
                break;
                default :
//                    $scope.tipoDeBuscaVisualizar = {mostrarData:true,mostrarSolicitacao:false,mostrarProntuario:false,mostrarSUS:false,mostrarNome:false};
                    ultimoCampo = 'datas';
        }  
        valorCampo = valor;
};


            
//$scope.userDTO.consultalaudo
//$scope.dataPesquisa = {dtInicio: new Date(),dtFim : new Date(),minDate: minDate,maxDate:maxDate};
//$scope.userDTO.consultalaudo.minDate = minDate;
//$scope.userDTO.consultalaudo.maxDate = maxDate;
//$scope.mostraLaudo = {iframe:false,iframepdf:false,image:true,loading:false};


// $scope.calcRangeDate = function (){
//     ultimoCampo = 'datas';
//     var dt = $scope.dataPesquisa.dtFim;
//     $scope.dataPesquisa.minDate = new Date(
//            dt.getFullYear() ,
//            dt.getMonth() - 2,
//            dt.getDate());
//
//    if($scope.dataPesquisa.minDate > $scope.dataPesquisa.dtInicio){
//        $scope.dataPesquisa.dtInicio = $scope.dataPesquisa.minDate; 
//    }
// };
 
 
       
    //Salvando para recuperacao apos refresh
//    $localStorage.userDTO = $scope.userDTO;

    $scope.tirandoOMouse = function () {
        console.log('tirando a porra do mouse ...');
    };


    
    
//    $scope.quemMudouPorUltimo = function (campoID) {
//        console.log(campoID);
//        ultimoCampo = campoID;
//        if(ultimoCampo && ultimoCampo !== 'datas'){
//            $scope.filtrar();
//        }
//    };
    runFiltrar = true;
    
    $scope.filtrar = function ( ) {
        
//        notificacaoProvider.showDialogLoding($scope,ev);
    console.log('ultimoCampo = '+ultimoCampo);
        self.modalLoading = notificacaoProvider.modalLoading('filtrando','filtrando',$scope);
        self.activated = true;
      
        $timeout(function (){
              /*
            * Debloqueio p nova excucao
            */
           runFiltrar = true;
           if(runFiltrar){
               runFiltrar = false;
               var _startFilter =  $filter('date')($scope.date.startDate._d, 'dd-MM-yyyy');
               var _endFilter =  $filter('date')($scope.date.endDate._d, 'dd-MM-yyyy');

        var args =  '';
       var uniStCodigo = $scope.userDTO.consultalaudo.unidadeId.substring(0,3);
       var libetaPesquisa = false;
        switch (ultimoCampo) {
            case 'datas':
                console.log('Inside de Case '+ultimoCampo);
                 libetaPesquisa = true;
                args = "?campoDePesquisa=datas&dtInicio="+_startFilter+"&dtFim="+_endFilter+"&unidade="+uniStCodigo;
                break;
            default :
                console.log('Inside de Case Default');
                 libetaPesquisa = true;
                args = "?campoDePesquisa="+ultimoCampo+"&valor="+valorCampo+"&unidade="+uniStCodigo;

        }
        console.log('args = '+args);
                if (libetaPesquisa) {
                    buscaAPIService.buscaRequisicoes(args,$scope.paramsStateConfig.limit ,$scope.userDTO.configLisNet)
                            .then(function successCallback(response) {
                                $scope.userDTO.consultalaudo.requisicoes = response.data;
                                console.log("Quantidade total de registros : " + $scope.userDTO.consultalaudo.requisicoes.length);
                                $localStorage.userDTO = $scope.userDTO;
                                $timeout(function () {
                                    self.modalLoading.dismiss('cancel');
                                }, 1000);
                            },
                                    function errorCallback(response) {
                                        console.log(response.statusText);
                                        $timeout(function () {
                                            self.modalLoading.dismiss('cancel');
                                        }, 1000);
                                    });
                } else {
                    $timeout(function () {self.modalLoading.dismiss('cancel'); }, 200);
                }
           
           }else{
//               alert('Espera porra');
               console.log('Espera porra.......');
//               notificacaoProvider.showDialog("Aguarde",'Em execução','Fechar','Aviso',ev); 
                $timeout(function (){self.modalLoading = notificacaoProvider.modalLoading('Aguarde','Em execução',$scope);},300);
               
           }
        },250);
        
         
    };

//    console.log('Running consultaLaudo........');
//    $scope.userDTO = JSON.parse(localStorage.getItem('userDTO'));

//    $scope.urlLaudo = $sce.trustAsResourceUrl(localStorage.getItem('urlLaudo')); //localStorage.getItem('urlLaudo');
    
    

    $scope.montaURLLaudo = function (req_in_codigo, leg_st_codigo, blPdf) {
        
        if (leg_st_codigo &&   ( leg_st_codigo === '016' ||  leg_st_codigo === '011' ||  leg_st_codigo === '007')) {
            var req = pegaRequisicao(req_in_codigo);
            
            buscaAPIService.buscaTimeStamp($scope.userDTO.configLisNet).then(
                    function successCallback(response) {
                        var dateAsString = response.data.TIME;
                        var urlLaudoJson = montaUrlLaudoProvider.monta(req_in_codigo, dateAsString, $scope.userDTO.cliente);
                        var url = urlLaudoJson.urlLaudo;
                        var urlLaudoPDF = urlLaudoJson.urlLaudoPDF;
                        $scope.urlLaudo = $sce.trustAsResourceUrl(url);
                        $scope.urlLaudoPDF = $sce.trustAsResourceUrl(urlLaudoPDF);
//                    console.log("urlPDF: " + urlLaudoPDF);
                        if (determinaAparelhoProvider.isMobile($scope.userDTO.deviceDetector)) {

                            if (leg_st_codigo === '016' || leg_st_codigo == '011') {
                                notificacaoProvider.closseDialog();
//                            $mdDialog.cancel();
                                $window.open(urlLaudoPDF, '_self');
                            } else {
                                notificacaoProvider.closeDialog();
//                            $mdDialog.cancel();
                                $window.open(url, '_self');
                            }

                        } else {
                            
                                 var data = $filter('date')(req.REQ_DT_CADASTRO,'dd/MM/yyyy')
                                 if(blPdf){
                                     notificacaoProvider.modalIframe(req.PAC_ST_NOME,'Nome: '+req.PAC_ST_NOME + '   |   Data : '+  data ,$scope,urlLaudoPDF);
                                 }else{
                                     notificacaoProvider.modalIframe(req.PAC_ST_NOME,'Nome: '+req.PAC_ST_NOME + '   |  Data : '+  data ,$scope,url);
                                 }
                                
//                               $window.open(urlLaudoPDF, '_blank');
                        }
                    },
                    function errorCallback(response) {});
            
        }else{
//            $scope.mostraLaudo = {iframe:false,image:false,loading:true};
//            $timeout(function(){$scope.mostraLaudo = {iframe:false,iframepdf:false,image:true,loading:false};},300);
//            notificacaoProvider.showDialog("Aviso",'Solicitação não possue exames liberados no momento','Fechar',ev); 
            notificacaoProvider.sweetSuccess("Aviso",'Solicitação não possue exames liberados no momento');
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

    $scope.limparTela = function (){
  $scope.userDTO.consultalaudo.requisicoes = [];  
  $scope.userDTO.consultalaudo.dtFim = new Date();
  $scope.userDTO.consultalaudo.dtInicio = new Date();
  ultimoCampo = 'datas';
};



 $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('stateSave', false)
        .withOption('lengthMenu', [15,30,50, 100, 150, 200])
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
                .withOption('stateSave', false)
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
        
        function pegaRequisicao(REQ_ST_CODIGO){
            for(x in $scope.userDTO.consultalaudo.requisicoes){
                var req = $scope.userDTO.consultalaudo.requisicoes[x];
                if(req.REQ_ST_CODIGO === REQ_ST_CODIGO){
                    return req;
                }
            }
        }

}

angular.module('lisnet').controller('consultaLaudos', consultaLaudos);

angular.module('lisnet').constant('angularMomentConfig', {
    timezone: 'Europe/London' // e.g. 'Europe/London'
});
