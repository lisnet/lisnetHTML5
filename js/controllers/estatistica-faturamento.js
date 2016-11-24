/* 
 Created on : Oct 3, 2016, 11:15:16 AM
 Author     : eros
 */

function estatisticaFaturamento($scope, buscaAPIService, $stateParams, $localStorage, sairDoSistemaService, notificacaoProvider, $window, gerenciaRelatorioService, $filter ,$timeout, $uibModal,DTOptionsBuilder,$interval,shareuser) {

    console.log('Inicializando estatisticaFaturamento');

//    console.log(shareuser.userDTO);
    $scope.userDTO = sairDoSistemaService.validarLogin();
    
    
    var rangeInMonths = 1;
    var myDate = new Date();
    if($scope.userDTO.USU_IN_QTDDIA && $scope.userDTO.USU_IN_QTDDIA <= 30){
        minDate = new Date(myDate.getFullYear() ,myDate.getMonth()    ,myDate.getDate() - $scope.userDTO.USU_IN_QTDDIA) ;
    }else if($scope.userDTO.USU_IN_QTDDIA && $scope.userDTO.USU_IN_QTDDIA >= 30){
        minDate = new Date(myDate.getFullYear() ,myDate.getMonth() - ($scope.userDTO.USU_IN_QTDDIA / 30)  ,myDate.getDate() ) ;
    }else{
        minDate = new Date(myDate.getFullYear() ,myDate.getMonth() -1 ,myDate.getDate() ) ;
    }

    

    maxDate = new Date(myDate.getFullYear(),myDate.getMonth(),myDate.getDate());
    if($scope.userDTO && !$scope.userDTO.estatisticaFaturamento){
        $scope.userDTO.estatisticaFaturamento = {ordemRelatorio: 'unidade', tipoRelatorio: 'analitico', faturado: true, conferido: true, format: 'dd/MM/yyyy', dtInicio: new Date(), dtFim: new Date(), minDate: minDate,maxDate:maxDate,todasUnidades: true, todosConvenios: true, tipo: 'pdf', unidades: [], convenios: []};
    }else{
        if($scope.userDTO.estatisticaFaturamento.dtInicio){
            $scope.userDTO.estatisticaFaturamento.dtInicio = new Date($scope.userDTO.estatisticaFaturamento.dtInicio);
            $scope.userDTO.estatisticaFaturamento.dtFim = new Date($scope.userDTO.estatisticaFaturamento.dtFim);
            $scope.userDTO.estatisticaFaturamento.minDate = new Date($scope.userDTO.estatisticaFaturamento.minDate);
            $scope.userDTO.estatisticaFaturamento.maxDate = new Date($scope.userDTO.estatisticaFaturamento.maxDate);
       }
    }
    
    shareuser.userDTO = $scope.userDTO;
    $scope.calcRangeDate = function (){
        var _dtInicio = $scope.userDTO.estatisticaFaturamento.dtInicio;
        var _dtFim = $scope.userDTO.estatisticaFaturamento.dtFim;
        if(_dtFim < _dtInicio){
            $scope.userDTO.estatisticaFaturamento.dtInicio =  new Date( _dtFim.getFullYear() ,_dtFim.getMonth() ,_dtFim.getDate());
        }
        
        if(_dtInicio >= $scope.userDTO.estatisticaFaturamento.minDate){
            $scope.userDTO.estatisticaFaturamento.minDate = new Date( _dtFim.getFullYear() ,_dtFim.getMonth() - rangeInMonths ,_dtFim.getDate());
            $scope.userDTO.estatisticaFaturamento.maxDate = new Date( _dtInicio.getFullYear() ,_dtInicio.getMonth() + rangeInMonths ,_dtInicio.getDate());
        }else if(_dtFim <= $scope.userDTO.estatisticaFaturamento.maxDate){
            $scope.userDTO.estatisticaFaturamento.maxDate = new Date( _dtInicio.getFullYear() ,_dtInicio.getMonth() + rangeInMonths ,_dtInicio.getDate());
            $scope.userDTO.estatisticaFaturamento.minDate = new Date( _dtFim.getFullYear() ,_dtFim.getMonth() - rangeInMonths ,_dtFim.getDate());
        }
         
        if($scope.userDTO.estatisticaFaturamento.minDate > $scope.userDTO.estatisticaFaturamento.dtInicio){
            $scope.userDTO.estatisticaFaturamento.dtInicio = $scope.userDTO.estatisticaFaturamento.minDate; 
        }
        if($scope.userDTO.estatisticaFaturamento.maxDate <  $scope.userDTO.estatisticaFaturamento.dtFim){
            $scope.userDTO.estatisticaFaturamento.dtFim = $scope.userDTO.estatisticaFaturamento.maxDate; 
        }
//        console.log('calculando range de datas.  minDate fim = '+ $filter('date')($scope.estatisticaFaturamento.minDate, " dd/MM/yyyy"));
        $scope.dateOptionsMin = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: $scope.userDTO.estatisticaFaturamento.dtFim,
            minDate: $scope.userDTO.estatisticaFaturamento.minDate,
            startingDay: 1
        };
        
         $scope.dateOptionsMax = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: $scope.userDTO.estatisticaFaturamento.maxDate,
            minDate: $scope.userDTO.estatisticaFaturamento.dtInicio,
            startingDay: 1
        };
        
     };
    
    $scope.altInputFormats = ['MM/dd/yyyy'];
    $scope.dateOptionsMin = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: $scope.userDTO.estatisticaFaturamento.dtFim,
            minDate: $scope.userDTO.estatisticaFaturamento.minDate,
            startingDay: 1
        };
        
         $scope.dateOptionsMax = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: $scope.userDTO.estatisticaFaturamento.maxDate,
            minDate: $scope.userDTO.estatisticaFaturamento.dtInicio,
            startingDay: 1
        };

    $scope.popup = {
        inicio: false, fim: false
    };

    $scope.openPopInicio = function () {
        $scope.popup.inicio = true;
    };
    $scope.openPopFim = function () {
        $scope.popup.fim = true;
    };

    $scope.printJSON = function () {
        console.log(JSON.stringify($scope.userDTO.estatisticaFaturamento, null, 4));
    };

    $scope.buscaUnidade = function (uniStCodigo) {
        console.log('$scope.estatisticaFaturamento.unidades.length =  '+$scope.userDTO.estatisticaFaturamento.unidades.length);
        for (var i = 0; i < $scope.userDTO.unidades.length; i++) {
            var uni = $scope.userDTO.unidades[i];
            console.log(uni.UNI_ST_CODIGO);
            if (uni.UNI_ST_CODIGO === uniStCodigo) {
                if (achaUnidade(uniStCodigo, $scope.userDTO.estatisticaFaturamento.unidades)) {
                    notificacaoProvider.sweetDialog("Aviso", "Unidade " + uniStCodigo + " jáf foi incluida", 'info', 'orange', 'X');
                } else {
                    $scope.userDTO.estatisticaFaturamento.unidades.push(uni);
                    delete $scope.uniStCodigo;
                    break;
                }

            }
        }
    };
    $scope.popUnidades =  function (){
        return  $uibModal.open({
                    template:'   <div class="ibox-content"   > '
                    +' <table datatable="ng" dt-options="dtOptions"  class="table table-striped table-bordered table-hover dataTables-example"> '
                    +'     <thead> '
                    +'     <tr> '
                    +'         <th>Add</th> '
                    +'         <th>Cõdigo</th> '
                    +'         <th>Descrição</th> '
                    +'     </tr> '
                    +'     </thead> '
                    +'     <tbody> '
                    +'     <tr ng-repeat="u in userDTO.unidades"  ng-click="buscaUnidade(u.UNI_ST_CODIGO)" > '
                    +'         <td    ><a  ng-click="buscaUnidade(u.UNI_ST_CODIGO)" ><i class="fa fa-plus-circle" aria-hidden="true"></i></a></td> '      
                    +'         <td    ><span class="text-center  text-muted small    ">{{u.UNI_ST_CODIGO}}</span></td> '
                    +'         <td ><span class="pull-right text-muted small  ">{{u.UNI_ST_DESCRICAO}}</span></td> '
                    +'     </tr> '
                    +'     </tbody> '
                    +' </table> '
               +'  </div>',
                                scope: $scope
                            });
    };  
    
    
    $scope.buscaConvenio = function (conStCodigo) {
        if ($scope.userDTO.convenios) {
            for (var i = 0; i < $scope.userDTO.convenios.length; i++) {
                var con = $scope.userDTO.convenios[i];
                console.log(con.CON_ST_CODIGO);
                if (con.CON_ST_CODIGO === conStCodigo) {
                    if (achaConvenio(conStCodigo, $scope.userDTO.estatisticaFaturamento.convenios)) {
                        notificacaoProvider.sweetDialog("Aviso", "Convênio " + conStCodigo + " jáf foi incluido", 'info', 'orange', 'X');
                    } else {
                        $scope.userDTO.estatisticaFaturamento.convenios.push(con);
                        delete $scope.conStCodigo;
                        break;
                    }
                }
            }
        } else {
            notificacaoProvider.sweetDialog("Erro", "Vocẽ não possue convênios em seu  usuário  ", 'warning', 'red', 'X');
        }
    };
    $scope.popConvenios =  function (){
        return  $uibModal.open({
                    template:'   <div class="ibox-content"   > '
                    +' <table datatable="ng" dt-options="dtOptions"  class="table table-striped table-bordered table-hover dataTables-example"> '
                    +'     <thead> '
                    +'     <tr> '
                    +'         <th>Add</th> '
                    +'         <th>Cõdigo</th> '
                    +'         <th>Descrição</th> '
                    +'     </tr> '
                    +'     </thead> '
                    +'     <tbody> '
                    +'     <tr ng-repeat="c in userDTO.convenios"    ng-click="buscaConvenio(c.CON_ST_CODIGO)" > '
                    +'         <td    ><a  ng-click="buscaConvenio(c.CON_ST_CODIGO)" ><i class="fa fa-plus-circle" aria-hidden="true"></i></a></td> '      
                    +'         <td    ><span class="text-center  text-muted small    ">{{c.CON_ST_CODIGO}}</span></td> '
                    +'         <td ><span class="pull-right text-muted small  ">{{c.CON_ST_DESCRICAO}}</span></td> '
                    +'     </tr> '
                    +'     </tbody> '
                    +' </table> '
               +'  </div>',
                                scope: $scope
                            });
    };
    
    
    $scope.limparTela = function (){
        $scope.userDTO.estatisticaFaturamento.unidades = [];
        $scope.userDTO.estatisticaFaturamento.convenios = [];
        $scope.userDTO.estatisticaFaturamento.dtInicio = new Date();
        $scope.userDTO.estatisticaFaturamento.dtFim = new Date();
        $scope.userDTO.estatisticaFaturamento.ordemRelatorio = 'unidade';
    };
    
    $scope.removerUnidade = function (uniStCodigo) {
        achaUnidade(uniStCodigo, $scope.userDTO.estatisticaFaturamento.unidades, true);
    };
    $scope.removerConvenio = function (conStCodigo) {
        achaConvenio(conStCodigo, $scope.userDTO.estatisticaFaturamento.convenios, true);
    };


    

    $scope.geraRelatorio = function () {
        if(liberaGerador()){
            notificacaoProvider.sweetDialog("Aviso", "Você  não possue Unidades ou Convênios para realizar o relatório , favor entrar em contado com o suporte.", 'info', 'orange', 'X');
            $scope.btnGerador = true;
        }else{
                var modalInstance = notificacaoProvider.modalLoading("Relatório em execução","Consultar o icone de trarefas para fazer o download.",$scope);

            $timeout(function () {
//                console.log('timeout is out');
                     modalInstance.dismiss('cancel');
            }, 3000);
            
              var inicio = $scope.userDTO.estatisticaFaturamento.dtInicio;
        var fim = $scope.userDTO.estatisticaFaturamento.dtFim;
        var json = {
            "mod_st_codigo": "999",
            "usu_st_codigo": $scope.userDTO.USU_ST_CODIGO,
            "rel_st_tipoarquivo": "pdf",
            "dbname": $scope.userDTO.cliente.CLI_ST_ORACLEUSERNAME,
            "parametros": {
                "unidades": [],
                "convenios": [],
                "flags": [],
                "data_inicio": $filter('date')(inicio, " dd/MM/yyyy"),
                "data_fim": $filter('date')(fim, " dd/MM/yyyy")
            }
        };

        if($scope.userDTO.estatisticaFaturamento.ordemRelatorio === 'unidade'){
            json.codigo_relatorio =  "RELATORIO_FATURAMENTO_ANALITICO_UNIDADE_CONVENIO";
            json.relatorio_titulo = "Faturamento Unidade/Convênio "+$scope.userDTO.cliente.CLI_ST_NOME;;
            json.relatorio_subtitulo = "";
            json.relatorio_descricao = "........";
        }else{
            json.codigo_relatorio =  "RELATORIO_FATURAMENTO_ANALITICO_UNIDADE_CONVENIO";
            json.relatorio_titulo = "Faturamento Convênio/Unidade "+$scope.userDTO.cliente.CLI_ST_NOME;;
            json.relatorio_subtitulo = "";
            json.relatorio_descricao = "........";
        }
        if ($scope.userDTO.estatisticaFaturamento.unidades.length === 0) {
            for (var i = 0; i < $scope.userDTO.unidades.length; i++) {
                var uni = $scope.userDTO.unidades[i];
                json.parametros.unidades.push(uni.UNI_ST_CODIGO);
            }
        }else{
             for (var i = 0; i < $scope.userDTO.estatisticaFaturamento.unidades.length; i++) {
                var uni = $scope.userDTO.estatisticaFaturamento.unidades[i];
                json.parametros.unidades.push(uni.UNI_ST_CODIGO);
            }
        }
        if ($scope.userDTO.estatisticaFaturamento.convenios.length === 0) {
            for (var i = 0; i < $scope.userDTO.convenios.length; i++) {
                var con = $scope.userDTO.convenios[i];
                json.parametros.convenios.push(con.CON_ST_CODIGO);
            }
        }else{
             for (var i = 0; i < $scope.userDTO.estatisticaFaturamento.convenios.length; i++) {
                var con = $scope.userDTO.estatisticaFaturamento.convenios[i];
                json.parametros.convenios.push(con.CON_ST_CODIGO);
            }
        }
        if (!$scope.userDTO.estatisticaFaturamento.faturado && !$scope.userDTO.estatisticaFaturamento.conferido) {
            json.parametros.flags = ["CON", "FAT"];
        } else {

            if ($scope.userDTO.estatisticaFaturamento.faturado) {
                json.parametros.flags.push("FAT");
            }
            if ($scope.userDTO.estatisticaFaturamento.conferido) {
                json.parametros.flags.push("CON");
            }
        }

        gerenciaRelatorioService.gerarRelatorio(json, $scope);
        
        }
      

    };


 $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
//        .withOption('stateSave', true)
//        .withOption('lengthMenu', [10,25,50, 100, 150, 200])
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
//            {extend: 'copy',text:'Copiar'},
//            {extend: 'csv'},
//            {extend: 'excel', title: 'Lista_de_Notificacoes'},
//            {extend: 'pdf', title: 'Lista_de_Notificacoes'},
//            {extend: 'print',text:'Imprimir',
//                customize: function (win){
//                    $(win.document.body).addClass('white-bg');
//                    $(win.document.body).css('font-size', '10px');
//                    $(win.document.body).find('table')
//                        .addClass('compact')
//                        .css('font-size', 'inherit');
//                }
//            }
        ]);  

     function liberaGerador(){
        if($scope.userDTO.unidades && $scope.userDTO.unidades.length > 0 && $scope.userDTO.convenios && $scope.userDTO.convenios.length > 0){
            return false;
        }else{
            return  true;
        }
    };

    function achaUnidade(uniStCodigo, arrayUnidades, remover) {
        if (arrayUnidades && arrayUnidades.length > 0) {
            for (var i = 0; i < arrayUnidades.length; i++) {
                var uni = arrayUnidades[i];
                if (uni.UNI_ST_CODIGO === uniStCodigo) {
                    if (remover) {
                        arrayUnidades.splice(i, 1);
                    }
                    return true;
                }
            }
        } else {
            return false;
        }
    } ;
};

function achaConvenio(conStCodigo, arrayConvenios, remover) {
    if (arrayConvenios && arrayConvenios.length > 0) {
        for (var i = 0; i < arrayConvenios.length; i++) {
            var con = arrayConvenios[i];
            if (con.CON_ST_CODIGO === conStCodigo) {
                if (remover) {
                    arrayConvenios.splice(i, 1);
                }
                return true;
            }
        }
    } else {
        return false;
    }
};

angular.module('lisnet')
        .controller('estatisticaFaturamento', estatisticaFaturamento);
