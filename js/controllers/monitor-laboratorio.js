/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * https://github.com/jtblin/angular-chart.js/issues/285
 */
/* 
 Created on : Mar 28, 2017, 11:22:57 AM
 Author     : eros
 */


function monitorLaboratorio($scope, $state, buscaAPIService, $stateParams, sairDoSistemaService, notificacaoProvider, $timeout, DTOptionsBuilder, helperService, $filter,buscaAPIService) {
    var self = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
    $scope.filtros = ['1D', '1W', '1M'];
    self.configLisnet = $scope.userDTO.configLisNet;

    var abas = [{label: 'resumo', desc: 'Resumo Geral'}, {label: 'pendencia', desc: 'Pendências'}, {label: 'setores', desc: 'Pendências por Setor'}];
    if (!$scope.userDTO.configMonitorLaboratorio) {

        $scope.userDTO.configMonitorLaboratorio = {
            unidade: 'TODAS', unidadeEx: 'TODAS', urgente: false, RANGE: 'DIA', aba: 'resumo', 
            data: {"startDate": moment(), "endDate": moment()},
            resumoProcedimentos: {periodo: '1D', data: new Date(),formatoData:'dd/MM/yyyy',loading:true,total:0,blink:true}, 
            resumoPacientes: {periodo: '1D', data: new Date(),formatoData:'dd/MM/yyyy',loading:true,total:0,blink:true}, 
            faturamentoEstimado: {periodo: '1D', data: new Date(),formatoData:'dd/MM/yyyy',loading:true,total:0,blink:true}
        };
        
        /**
         * Data for Line chart Resumo Procedimentos
         */
        $scope.userDTO.configMonitorLaboratorio.lineDataResumoProcedimentos = {
            labels: ["0", "1", "2", "3", "4", "5", "6"],
            datasets: [
                {
                    label: "Resumo de Procedimentos",
                    fillColor: self.configLisnet.colorsChart[0].fillColor,
                    strokeColor: self.configLisnet.colorsChart[0].strokeColor,
                    pointColor: self.configLisnet.colorsChart[0].highlightStroke,
                    pointHighlightStroke: self.configLisnet.colorsChart[0].highlightStroke,
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    data: [0, 0, 0, 0, 0, 0, 0]
                }
            ]
        };

        /**
         * Data for Bar chart Paciente
         */
        $scope.userDTO.configMonitorLaboratorio.barDataPacientes = {
            labels: ["0", "1", "2", "3", "4", "5", "6"],
            datasets: [
                {
                    label: "Resumo de Pacientes",
                    fillColor: self.configLisnet.colorsChart[12].fillColor,
                    strokeColor: self.configLisnet.colorsChart[12].strokeColor,
                    highlightFill: self.configLisnet.colorsChart[12].highlightFill,
                    highlightStroke: self.configLisnet.colorsChart[12].highlightStroke,
                    data: [0, 0, 0, 0, 0, 0, 0]
                }
            ]
        };
        
        /**
         * Data for Bar chart Faturamento
         */
        $scope.userDTO.configMonitorLaboratorio.barDataFaturamento = {
            labels: ["0", "1", "2", "3", "4", "5", "6"],
            datasets: [
                {
                    label: "Faturamento Estimado",
                    fillColor: self.configLisnet.colorsChart[1].fillColor,
                    strokeColor: self.configLisnet.colorsChart[1].strokeColor,
                    highlightFill: self.configLisnet.colorsChart[1].highlightFill,
                    highlightStroke: self.configLisnet.colorsChart[1].highlightStroke,
                    data: [0, 0, 0, 0, 0, 0, 0]
                }
            ]
        };
        
        $timeout(function (){atualizarResumoProcedimentos();},800);
        $timeout(function (){atualizarResumoPacientes();},3000);
        $timeout(function (){atualizarFaturamentoEstimado();},6000);
        
    }
    
        //Watch for date changes
    $scope.$watch('userDTO.configMonitorLaboratorio.data', function(newDate) {
        var _c =  $scope.userDTO.configMonitorLaboratorio;
        console.log('New date set: ',  JSON.stringify(newDate) );
        
        _c.resumoProcedimentos.data = new Date(newDate.startDate);
        _c.resumoPacientes.data = new Date(newDate.startDate);
        _c.faturamentoEstimado.data = new Date(newDate.startDate);
        
        _c.resumoProcedimentos.css = 'animated fadeOutLeft';
        _c.resumoPacientes.css = 'animated fadeOutLeft';
        _c.faturamentoEstimado.css = 'animated fadeOutLeft';
        
        $timeout(function () {
            _c.resumoProcedimentos.css = 'animated fadeInLeft';
            _c.resumoPacientes.css = 'animated fadeInLeft';
            _c.faturamentoEstimado.css = 'animated fadeInLeft';
        }, 1000);
    }, false);
    
     
    
    self.config = $scope.userDTO.configMonitorLaboratorio;
    self.config.resumoProcedimentos.data = new Date(self.config.resumoProcedimentos.data);
    self.config.resumoPacientes.data = new Date(self.config.resumoPacientes.data);
    self.config.faturamentoEstimado.data = new Date(self.config.faturamentoEstimado.data);

   
    function escolherFormatoData(periodo, grafico){
        switch (periodo){
            case '1D':
                self.config[grafico].formatoData = 'dd/MM/yyyy';
            break;
            case '1W':
                self.config[grafico].formatoData = 'w/MM';
            break;
            case '1M':
                self.config[grafico].formatoData = 'MM/yyyy';
            break;
            case '3M':
                self.config[grafico].formatoData = 'MM/yyyy';
            break;
            case '6M':
                self.config[grafico].formatoData = 'MM/yyyy';
            break;
            
        }
        animacaoEscolahData(grafico);
    }
    
    function  atualizarResumoProcedimentos() {
        var _c =  $scope.userDTO.configMonitorLaboratorio;
        var _p = $scope.userDTO.configMonitorLaboratorio.resumoProcedimentos;
        
            var _user = $scope.userDTO;
            var _gl = $scope.userDTO.configMonitorLaboratorio.lineOptions;
            var _u = retornaUnidades();
            _p.loading = true;
            var dtFormat = constroeFormat(_p.periodo, _p.data);
            var _json = {dtFiltro: $filter('date')(_p.data, 'yyyy-MM-dd'),
                dtFormat: dtFormat,
                unidades: _u.unidades, unidadesEx: _u.unidadesEx,urgente:_c.urgente ? 'S':'N'};
            buscaAPIService.buscaGrafico('resumoProcedimentos', _p.periodo, _json, _user.configLisNet).then(
                    function success(response) {
                        var _d = response.data;
                        console.log(JSON.stringify(_d, null, 2));
                        var _g = $scope.userDTO.configMonitorLaboratorio.lineDataResumoProcedimentos;
                        _g.labels = _d[0];
                        _g.datasets[0].data = _d[1];
                        _p.loading = false;
                        _p.blink = false;
                        _p.total = _d[1].reduce(function (prev,current){
                            return prev +  (current ? current: 0)  ;
                        },0);
                        $timeout(function (){_p.blink = true;},3);

                    }, function error(response) {

                    }
            );
    }
    
    function  atualizarResumoPacientes() {
        var _c = $scope.userDTO.configMonitorLaboratorio;
        var _p = $scope.userDTO.configMonitorLaboratorio.resumoPacientes;
        
            var _user = $scope.userDTO;
            var _gl = $scope.userDTO.configMonitorLaboratorio.barDataPacientes;
            var _u = retornaUnidades();
            _p.loading = true;
            var dtFormat = constroeFormat(_p.periodo, _p.data);
            var _json = {dtFiltro: $filter('date')(_p.data, 'yyyy-MM-dd'),
                dtFormat: dtFormat,
                unidades: _u.unidades, unidadesEx: _u.unidadesEx,urgente:_c.urgente ? 'S':'N'};
            buscaAPIService.buscaGrafico('resumoPacientes', _p.periodo, _json, _user.configLisNet).then(
                    function success(response) {
                        var _d = response.data;
                        console.log(JSON.stringify(_d, null, 2));
                        var _g = $scope.userDTO.configMonitorLaboratorio.barDataPacientes;
                        _g.labels = _d[0];
                        _g.datasets[0].data = _d[1];
                        _p.loading = false;
                        _p.blink = false;
                        _p.total = _d[1].reduce(function (prev,current){
                            return prev +  (current ? current: 0)  ;
                        },0);
                        $timeout(function (){_p.blink = true;},3);
                    }, function error(response) {

                    }
            );
    }
    
    function  atualizarFaturamentoEstimado() {
        var _c = $scope.userDTO.configMonitorLaboratorio;
        var _p = $scope.userDTO.configMonitorLaboratorio.faturamentoEstimado;
        
            var _user = $scope.userDTO;
            var _u = retornaUnidades();
            _p.loading = true;
            var dtFormat = constroeFormat(_p.periodo, _p.data);
            var _json = {dtFiltro: $filter('date')(_p.data, 'yyyy-MM-dd'),
                dtFormat: dtFormat,
                unidades: _u.unidades, unidadesEx: _u.unidadesEx,urgente:_c.urgente ? 'S':'N'};
            buscaAPIService.buscaGrafico('faturamentoEstimado', _p.periodo, _json, _user.configLisNet).then(
                    function success(response) {
                        var _d = response.data;
                        console.log(JSON.stringify(_d, null, 2));
                        var _g = $scope.userDTO.configMonitorLaboratorio.barDataFaturamento;
                        _g.labels = _d[0];
                        _g.datasets[0].data = _d[1];
                        _p.loading = false;
                        _p.blink = false;
                        _p.total = _d[1].reduce(function (prev,current){
                            return prev +  (current ? current: 0)  ;
                        },0);
                        $timeout(function (){_p.blink = true;},3);
                    }, function error(response) {

                    }
            );
    }
    
    function constroeFormat(periodo, data){
        switch (periodo){
            case '1D':
                return $filter('date')(data,'dd-MM-yyyy');
             break;
             case '1W':
                return $filter('date')(data,'ww-yyyy');
             break;
             case '1M':
                return $filter('date')(data,'MM-yyyy');
             break;
//             case '1D':
//                return $filter('date')(data,'dd-MM-yyyy');
//             break;
//             case '1D':
//                return $filter('date')(data,'dd-MM-yyyy');
//             break;
//             case '1D':
//                return $filter('date')(data,'dd-MM-yyyy');
//             break;
        }
    }
    
    function retornaUnidades(){
        var _u = $scope.userDTO;
        var unidades  = [];
        
        var _uAtivas = $scope.userDTO.unidades.filter(function (unidade){
                return unidade.UNI_CH_ATIVO === 'S';
            });
        
        if(_u.configMonitorLaboratorio.unidade === 'TODAS'){
            
            unidades= _uAtivas.map(function (unidade){
                return unidade.UNI_ST_CODIGO;
            });
        }else{
            unidades = [_u.configMonitorLaboratorio.unidade];
        }
        var unidadesEx = [];
        if(_u.configMonitorLaboratorio.unidadeEx === 'TODAS'){
             unidadesEx = _uAtivas.map(function (unidade){
                return unidade.UNI_ST_CODIGO;
            });
        }else{
            unidadesEx = [_u.configMonitorLaboratorio.unidadeEx];
        }
        return {unidades:unidades,unidadesEx:unidadesEx};
    };
    
    $scope.escolhePeriodo = function (periodo, grafico) {
        self.config[grafico].periodo = periodo;
        escolherFormatoData(periodo, grafico);
        encontraGraficoParaAtualizar(grafico);
    };

    $scope.atualizar = function (){
        atualizarResumoProcedimentos();
        $timeout(function (){ atualizarResumoPacientes(); },1000);
        $timeout(function (){atualizarFaturamentoEstimado();},1500);
        
    };

    $scope.isActive = function (periodo, grafico) {
        return self.config[grafico].periodo === periodo;
    };
    
    $scope.grabCSS = function (grafico) {
        return self.config[grafico].css;
    };

    $scope.shiftDate = function (direcao, grafico) {
        console.log('direcao: ' + direcao + '   grafico: ' + grafico);
        if (direcao) {
            self.config[grafico].data.setDate(self.config[grafico].data.getDate() + 1);
        } else {
            self.config[grafico].data.setDate(self.config[grafico].data.getDate() - 1);
        }
        animacaoEscolahData(grafico);
        encontraGraficoParaAtualizar(grafico);
    };
    
    function animacaoEscolahData(grafico){
         self.config[grafico].css = 'animated fadeOutLeft';
        $timeout(function () {
            self.config[grafico].css = 'animated fadeInLeft';
        }, 1000);
    }
    
    function encontraGraficoParaAtualizar(grafico){
        switch (grafico){
            case 'resumoProcedimentos':
                atualizarResumoProcedimentos();
            break;
            case 'resumoPacientes':
                atualizarResumoPacientes();
            break;
        case 'faturamentoEstimado':
            atualizarFaturamentoEstimado();
            break;
        }
    }
    

        /**
         * Options for Line chart
         */
        $scope.userDTO.configMonitorLaboratorio.lineOptions = {
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            bezierCurve: true,
            bezierCurveTension: 0.4,
            pointDot: true,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            height:140
        };

        /**
         * Options for Bar chart
         */
        $scope.userDTO.configMonitorLaboratorio.barOptions = {
            scaleBeginAtZero: true,
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            barShowStroke: true,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            barDatasetSpacing: 1
        };

}


angular.module('lisnet')
        .controller('monitorLaboratorio', monitorLaboratorio);


