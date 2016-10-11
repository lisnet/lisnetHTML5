/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : Oct 3, 2016, 11:15:16 AM
 Author     : eros
 */

function estatisticaFaturamento($scope, buscaAPIService, $stateParams, $localStorage, sairDoSistemaService, notificacaoProvider, $window, gerenciaRelatorioService, $filter) {

    console.log('Inicializando estatisticaFaturamento');

    $scope.userDTO = $localStorage.userDTO;

//    if ($stateParams.userDTO) {
//        console.log('Usando $stateParams');
//        $scope.userDTO = angular.fromJson($stateParams.userDTO);
//    } else {
//        $scope.userDTO = $localStorage.userDTO;
//    }

    if ($scope.userDTO && $scope.userDTO.status && $scope.userDTO.status === 'out') {
        sairDoSistemaService.logOut();
        $window.open('index.html', '_self');
    }

//    buscaAPIService.buscaUnidades($scope.userDTO.USU_ST_CODIGO, $scope.userDTO.configLisNet).then(function sucessCallBack(response) {
//        $scope.userDTO.unidades = response.data;
//    });
//
//    buscaAPIService.buscaConvenios($scope.userDTO.USU_ST_CODIGO, $scope.userDTO.configLisNet).then(function sucessCallBack(response) {
//        $scope.userDTO.convenios = response.data;
//    });



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

    $scope.calcRangeDate = function (minOrMax){
//        console.log('calculando range de datas.  minDate antes = '+ $filter('date')($scope.estatisticaFaturamento.minDate, " dd/MM/yyyy"));
        if(minOrMax){
            var dt = $scope.estatisticaFaturamento.dtFim;
            $scope.estatisticaFaturamento.maxDate = new Date( dt.getFullYear() ,dt.getMonth() + 2,dt.getDate());
        }else{
            var dt = $scope.estatisticaFaturamento.dtFim;
            $scope.estatisticaFaturamento.minDate = new Date( dt.getFullYear() ,dt.getMonth() - 2,dt.getDate());
        }
         
         
//       console.log('calculando range de datas.  minDate depois = '+ $filter('date')($scope.estatisticaFaturamento.minDate, " dd/MM/yyyy"));
        if($scope.estatisticaFaturamento.minDate > $scope.estatisticaFaturamento.dtInicio){
            $scope.estatisticaFaturamento.dtInicio = $scope.estatisticaFaturamento.minDate; 
        }
//        console.log('calculando range de datas.  minDate fim = '+ $filter('date')($scope.estatisticaFaturamento.minDate, " dd/MM/yyyy"));
        $scope.dateOptions = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: $scope.estatisticaFaturamento.maxDate,
            minDate: $scope.estatisticaFaturamento.minDate,
            startingDay: 1
        };
     };
    
    $scope.altInputFormats = ['MM/dd/yyyy'];
    $scope.dateOptions = {
        dateDisabled: false,
        formatYear: 'yy',
        maxDate: $scope.estatisticaFaturamento.maxDate,
        minDate: $scope.estatisticaFaturamento.minDate,
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
                    console.log('achei carai ' + JSON.stringify(uni));
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
                        console.log('achei carai ' + JSON.stringify(con));
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
        var inicio = $scope.estatisticaFaturamento.dtInicio;
        var fim = $scope.estatisticaFaturamento.dtFim;
        var json = {
            "mod_st_codigo": "999",
            "codigo_relatorio": "RELATORIO_FATURAMENTO_ANALITICO",
            "rel_st_descricao": "Relátorio de Faturamento Analítico",
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
//       var notificacao = {link:"http://www.google.com", icon:"fa-file-pdf-o",descricao:'Relatório de Faturamento',aviso:"2(s) minutos atrás"};  
//       if($scope.userDTO.notificacoes){
//           $scope.userDTO.notificacoes.push(notificacao);
//       }else{
//           $scope.userDTO.notificacoes =[];
//           $scope.userDTO.notificacoes.push(notificacao);
//       }
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
