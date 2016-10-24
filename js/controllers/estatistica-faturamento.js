/* 
 Created on : Oct 3, 2016, 11:15:16 AM
 Author     : eros
 */

function estatisticaFaturamento($scope, buscaAPIService, $stateParams, $localStorage, sairDoSistemaService, notificacaoProvider, $window, gerenciaRelatorioService, $filter ,$timeout, $uibModal) {

    console.log('Inicializando estatisticaFaturamento');

    sairDoSistemaService.validarLogin();

    $scope.userDTO = $localStorage.userDTO;
    var rangeInMonths = 1;

    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    estatisticaFaturamento  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

    var myDate = new Date();
    if($scope.userDTO.USU_IN_QTDDIA && $scope.userDTO.USU_IN_QTDDIA <= 30){
        minDate = new Date(myDate.getFullYear() ,myDate.getMonth()    ,myDate.getDate() - $scope.userDTO.USU_IN_QTDDIA) ;
    }else if($scope.userDTO.USU_IN_QTDDIA && $scope.userDTO.USU_IN_QTDDIA >= 30){
        minDate = new Date(myDate.getFullYear() ,myDate.getMonth() - ($scope.userDTO.USU_IN_QTDDIA / 30)  ,myDate.getDate() ) ;
    }else{
        minDate = new Date(myDate.getFullYear() ,myDate.getMonth() -1 ,myDate.getDate() ) ;
    }

    

    maxDate = new Date(myDate.getFullYear(),myDate.getMonth(),myDate.getDate());
    $scope.estatisticaFaturamento = {ordemRelatorio: 'unidade', tipoRelatorio: 'analitico', faturado: true, conferido: true, format: 'dd/MM/yyyy', dtInicio: new Date(), dtFim: new Date(), minDate: minDate,maxDate:maxDate,todasUnidades: true, todosConvenios: true, tipo: 'pdf', unidades: [], convenios: []};

    $scope.calcRangeDate = function (){
        var _dtInicio = $scope.estatisticaFaturamento.dtInicio;
        var _dtFim = $scope.estatisticaFaturamento.dtFim;
        
        if(_dtFim < _dtInicio){
            $scope.estatisticaFaturamento.dtInicio =  new Date( _dtFim.getFullYear() ,_dtFim.getMonth() ,_dtFim.getDate());
        }
        
        if(_dtInicio >= $scope.estatisticaFaturamento.minDate){
            $scope.estatisticaFaturamento.minDate = new Date( _dtFim.getFullYear() ,_dtFim.getMonth() - rangeInMonths ,_dtFim.getDate());
            $scope.estatisticaFaturamento.maxDate = new Date( _dtInicio.getFullYear() ,_dtInicio.getMonth() + rangeInMonths ,_dtInicio.getDate());
        }else if(_dtFim <= $scope.estatisticaFaturamento.maxDate){
            $scope.estatisticaFaturamento.maxDate = new Date( _dtInicio.getFullYear() ,_dtInicio.getMonth() + rangeInMonths ,_dtInicio.getDate());
            $scope.estatisticaFaturamento.minDate = new Date( _dtFim.getFullYear() ,_dtFim.getMonth() - rangeInMonths ,_dtFim.getDate());
        }
        
//        if(minOrMax){
//            $scope.estatisticaFaturamento.maxDate = new Date( _dtMin.getFullYear() ,_dtMin.getMonth() + rangeInMonths ,_dtMin.getDate());
//        }else{
//            $scope.estatisticaFaturamento.minDate = new Date( _dtMax.getFullYear() ,_dtMax.getMonth() - rangeInMonths ,_dtMax.getDate());
//        }
         
//        if($scope.estatisticaFaturamento.minDate > $scope.estatisticaFaturamento.dtInicio){
//            $scope.estatisticaFaturamento.dtInicio = $scope.estatisticaFaturamento.minDate; 
//        }
//        if($scope.estatisticaFaturamento.maxDate <  $scope.estatisticaFaturamento.dtFim){
//            $scope.estatisticaFaturamento.dtFim = $scope.estatisticaFaturamento.maxDate; 
//        }
        
//        console.log('calculando range de datas.  minDate fim = '+ $filter('date')($scope.estatisticaFaturamento.minDate, " dd/MM/yyyy"));
        $scope.dateOptionsMin = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: $scope.estatisticaFaturamento.dtFim,
            minDate: $scope.estatisticaFaturamento.minDate,
            startingDay: 1
        };
        
         $scope.dateOptionsMax = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: $scope.estatisticaFaturamento.maxDate,
            minDate: $scope.estatisticaFaturamento.dtInicio,
            startingDay: 1
        };
        
     };
    
    $scope.altInputFormats = ['MM/dd/yyyy'];
    $scope.dateOptionsMin = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: $scope.estatisticaFaturamento.dtFim,
            minDate: $scope.estatisticaFaturamento.minDate,
            startingDay: 1
        };
        
         $scope.dateOptionsMax = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: $scope.estatisticaFaturamento.maxDate,
            minDate: $scope.estatisticaFaturamento.dtInicio,
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
        console.log(JSON.stringify($scope.estatisticaFaturamento, null, 4));
    };

    $scope.buscaUnidade = function (uniStCodigo) {
        for (var i = 0; i < $scope.userDTO.unidades.length; i++) {
            var uni = $scope.userDTO.unidades[i];
            console.log(uni.UNI_ST_CODIGO);
            if (uni.UNI_ST_CODIGO === uniStCodigo) {
                if (achaUnidade(uniStCodigo, $scope.estatisticaFaturamento.unidades)) {
                    notificacaoProvider.sweetDialog("Aviso", "Unidade " + uniStCodigo + " jáf foi incluida", 'info', 'orange', 'X');
                } else {
                    $scope.estatisticaFaturamento.unidades.push(uni);
//                    console.log('achei carai ' + JSON.stringify(uni));
                    delete $scope.uniStCodigo;
                    break;
                }

            }
        }
    };
    $scope.buscaConvenio = function (conStCodigo) {
        if ($scope.userDTO.convenios) {
            for (var i = 0; i < $scope.userDTO.convenios.length; i++) {
                var con = $scope.userDTO.convenios[i];
                console.log(con.CON_ST_CODIGO);
                if (con.CON_ST_CODIGO === conStCodigo) {
                    if (achaConvenio(conStCodigo, $scope.estatisticaFaturamento.convenios)) {
                        notificacaoProvider.sweetDialog("Aviso", "Convênio " + conStCodigo + " jáf foi incluido", 'info', 'orange', 'X');
                    } else {
                        $scope.estatisticaFaturamento.convenios.push(con);
//                        console.log('achei carai ' + JSON.stringify(con));
                        delete $scope.conStCodigo;
                        break;
                    }
                }
            }
        } else {
            notificacaoProvider.sweetDialog("Erro", "Vocẽ não possue convênios em seu  usuário  ", 'warning', 'red', 'X');
        }
    };
    $scope.removerUnidade = function (uniStCodigo) {
        achaUnidade(uniStCodigo, $scope.estatisticaFaturamento.unidades, true);
    };
    $scope.removerConvenio = function (conStCodigo) {
        achaConvenio(conStCodigo, $scope.estatisticaFaturamento.convenios, true);
    };


    

    $scope.geraRelatorio = function () {
        if(liberaGerador()){
            notificacaoProvider.sweetDialog("Aviso", "Você  não possue Unidades ou Convênios para realizar o relatório , favor entrar em contado com o suporte.", 'info', 'orange', 'X');
            $scope.btnGerador = true;
        }else{
            
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/modal_loading.html',
                    controller: ModalInstanceCtrl
                });

            $timeout(function () {
//                console.log('timeout is out');
                     modalInstance.dismiss('cancel');
            }, 4000);
            
              var inicio = $scope.estatisticaFaturamento.dtInicio;
        var fim = $scope.estatisticaFaturamento.dtFim;
        var json = {
            "mod_st_codigo": "999",
            "usu_st_codigo": $scope.userDTO.USU_ST_CODIGO,
            "rel_st_tipoarquivo": "pdf",
            "dbname": "einstein",
            "parametros": {
                "unidades": [],
                "convenios": [],
                "flags": [],
                "data_inicio": $filter('date')(inicio, " dd/MM/yyyy"),
                "data_fim": $filter('date')(fim, " dd/MM/yyyy")
            }
        };

        if($scope.estatisticaFaturamento.ordemRelatorio === 'unidade'){
            json.codigo_relatorio =  "RELATORIO_FATURAMENTO_ANALITICO_UNIDADE_CONVENIO";
            json.relatorio_titulo = "Relatório Analitico Unidade/Convênio";
            json.relatorio_subtitulo = "Relatório Analitico Unidade/Convênio SubTituto";
            json.relatorio_descricao = "Relatório Analitico Unidade/Convênio descrição";
        }else{
            json.codigo_relatorio =  "RELATORIO_FATURAMENTO_ANALITICO_CONVENIO_UNIDADE";
            json.relatorio_titulo = "Relatório Analitico Covênio/Unidade";
            json.relatorio_subtitulo = "Relatório Analitico Covênio/Unidade SubTituto";
            json.relatorio_descricao = "Relatório Analitico Covênio/Unidade descrição";
        }
        if ($scope.estatisticaFaturamento.unidades.length === 0) {
            for (var i = 0; i < $scope.userDTO.unidades.length; i++) {
                var uni = $scope.userDTO.unidades[i];
                json.parametros.unidades.push(uni.UNI_ST_CODIGO);
            }
        }else{
             for (var i = 0; i < $scope.estatisticaFaturamento.unidades.length; i++) {
                var uni = $scope.estatisticaFaturamento.unidades[i];
                json.parametros.unidades.push(uni.UNI_ST_CODIGO);
            }
        }
        if ($scope.estatisticaFaturamento.convenios.length === 0) {
            for (var i = 0; i < $scope.userDTO.convenios.length; i++) {
                var con = $scope.userDTO.convenios[i];
                json.parametros.convenios.push(con.CON_ST_CODIGO);
            }
        }else{
             for (var i = 0; i < $scope.estatisticaFaturamento.convenios.length; i++) {
                var con = $scope.estatisticaFaturamento.convenios[i];
                json.parametros.convenios.push(con.CON_ST_CODIGO);
            }
        }
        if (!$scope.estatisticaFaturamento.faturado && !$scope.estatisticaFaturamento.conferido) {
            json.parametros.flags = ["CON", "FAT"];
        } else {

            if ($scope.estatisticaFaturamento.faturado) {
                json.parametros.flags.push("FAT");
            }
            if ($scope.estatisticaFaturamento.conferido) {
                json.parametros.flags.push("CON");
            }
        }

        gerenciaRelatorioService.gerarRelatorio(json, $scope);
        
        }
      

    };

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
