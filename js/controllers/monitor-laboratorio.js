/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * https://github.com/jtblin/angular-chart.js/issues/285
 * 
 * FillColors multicolor
 * http://plnkr.co/edit/nT6ogx9pJ2r81KxNzPlv?p=preview
 */
/* 
 Created on : Mar 28, 2017, 11:22:57 AM
 Author     : eros
 */


function monitorLaboratorio($scope, $state, buscaAPIService, $stateParams, sairDoSistemaService, notificacaoProvider, $timeout, DTOptionsBuilder, helperService, $filter,buscaAPIService,$q) {
    var self = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
    $scope.filtros = ['1D', '1W', '1M'];
    self.configLisnet = $scope.userDTO.configLisNet;
    self.config = $scope.userDTO.configMonitorLaboratorio;
//    $scope.options = { legend: { display: true } };
//    $scope.paramsStateConfig =  $stateParams;
//    console.log(JSON.stringify($stateParams,null,2));
    $scope.colours = [{fillColor:["#FF0000", "#00FF00", "#0000FF", "#00FFFF", "#FFFF00"]}];
    
        $scope.series = ['Series A'];
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        
        $scope.options = { legend: { display: true },scales: {yAxes: [{id: 'y-axis-1',type: 'linear',display: true,position: 'left',color:'red'},{id: 'y-axis-2',type: 'linear',display: true,position: 'right'}]}};
        
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
    

//    var abas = [{label: 'resumo', desc: 'Resumo Geral'}, {label: 'pendencia', desc: 'Pendências'}, {label: 'setores', desc: 'Pendências por Setor'}];
    if (!$scope.userDTO.configMonitorLaboratorio) {
        
        $scope.userDTO.configMonitorLaboratorio = {
            resumoProcedimentos: {periodo: '1D', data: new Date(),formatoData:'dd/MM/yyyy',loading:true,total:0,blink:true}, 
            resumoPacientes: {periodo: '1D', data: new Date(),formatoData:'dd/MM/yyyy',loading:true,total:0,blink:true}, 
            faturamentoEstimado: {periodo: '1D', data: new Date(),formatoData:'dd/MM/yyyy',loading:true,total:0,blink:true},
            resumoEntregues: {periodo: '1D', data: new Date(),formatoData:'dd/MM/yyyy',loading:true,total:0,blink:true},
            resumoStatus: {periodo: '1D', data: new Date(),formatoData:'dd/MM/yyyy',loading:true,total:0,blink:true},
            resumoPendencias: {periodo: '1D', data: new Date(),formatoData:'dd/MM/yyyy',loading:true,total:0,blink:true},
            unidade: 'TODAS', unidadeEx: 'TODAS', urgente: false, RANGE: 'DIA', aba: 'resumo',
            data: {"startDate": moment(), "endDate": moment()},
            arrayGeral:['faturamentoEstimado','resumoPacientes','resumoProcedimentos'],
            arrayPendencias:['resumoEntregues','resumoStatus','resumoPendencias']
        };
        self.config = $scope.userDTO.configMonitorLaboratorio;
        /**
         * Data for Doughnut chart Resume Status
         */
        $scope.userDTO.configMonitorLaboratorio.doughnutDataResumoStatus = [{value: 0,color:"#a3e1d4",highlight: "#1ab394",label: "App"}];
        $scope.userDTO.configMonitorLaboratorio.dataResumoStatus = [];
        $scope.userDTO.configMonitorLaboratorio.labelResumoStatus = [];
    
        /**
         * Data for Doughnut chart Resumo Pendencias
         */
        $scope.userDTO.configMonitorLaboratorio.labelResumoPendencias = [];
        $scope.userDTO.configMonitorLaboratorio.dataResumoPendencias = [];
        $scope.userDTO.configMonitorLaboratorio.doughnutDataResumoPendencias = [{value: 0,color:"#a3e1d4",highlight: "#1ab394",label: "App"}];
    
        /**
         * Data for Line chart Resumo Procedimentos
         */
        $scope.userDTO.configMonitorLaboratorio.labelResumoProcedimentos = [];
        $scope.userDTO.configMonitorLaboratorio.dataResumoProcedimentos = [[]];
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
         * Data for Line chart Resumo  Entregues
         */
        $scope.userDTO.configMonitorLaboratorio.lineDataResumoEntregues = {
            labels: ["0", "1", "2", "3", "4", "5", "6"],
            datasets: [
                {
                    label: "Resumo de Procedimentos",
                    fillColor: self.configLisnet.colorsChart[1].fillColor,
                    strokeColor: self.configLisnet.colorsChart[1].strokeColor,
                    pointColor: self.configLisnet.colorsChart[1].highlightStroke,
                    pointHighlightStroke: self.configLisnet.colorsChart[1].highlightStroke,
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    data: [0, 0, 0, 0, 0, 0, 0]
                }
            ]
        };
        
        
        $scope.userDTO.configMonitorLaboratorio.labelResumoEntregues = [];
        $scope.userDTO.configMonitorLaboratorio.dataResumoEntregues = [[]];
        $scope.userDTO.configMonitorLaboratorio.datasetOverrideResumoEntregues = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        
        /**
         * Data for Line chart Resumo 
         */
        $scope.userDTO.configMonitorLaboratorio.lineDataResumoStatus = {
            labels: ["0", "1", "2", "3", "4", "5", "6"],
            datasets: [
                {
                    label: "Resumo de Procedimentos",
                    fillColor: self.configLisnet.colorsChart[1].fillColor,
                    strokeColor: self.configLisnet.colorsChart[1].strokeColor,
                    pointColor: self.configLisnet.colorsChart[1].highlightStroke,
                    pointHighlightStroke: self.configLisnet.colorsChart[1].highlightStroke,
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    data: [0, 0, 0, 0, 0, 0, 0]
                }
            ]
        };
        
        /**
         * Data for Bar chart Paciente
         */
        $scope.userDTO.configMonitorLaboratorio.labelPacientes = [];
        $scope.userDTO.configMonitorLaboratorio.dataPacientes = [[]];
        $scope.userDTO.configMonitorLaboratorio.seriesPacientes = ['Pacientes'];
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
        $scope.userDTO.configMonitorLaboratorio.labelFaturamento = [];
        $scope.userDTO.configMonitorLaboratorio.dataFaturamento = [[]];
        $scope.userDTO.configMonitorLaboratorio.seriesFaturamento = ['Seilah'];
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
        
        /**
         * Data for Bar chart ResumoStatus
         */
        $scope.userDTO.configMonitorLaboratorio.barDataResumoStatus = {
            labels: ["0", "1", "2", "3", "4", "5", "6"],
            datasets: [
                {
                    label: "Faturamento Estimado",
//                    fillColor: self.configLisnet.colorsChart[1].fillColor,
                    strokeColor: self.configLisnet.colorsChart[1].strokeColor,
                    highlightFill: self.configLisnet.colorsChart[1].highlightFill,
                    highlightStroke: self.configLisnet.colorsChart[1].highlightStroke,
                    data: [0, 0, 0, 0, 0, 0, 0]
//                    fillColor:["#FF0000", "#00FF00", "#0000FF", "#00FFFF", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00", "#FFFF00"]
                }
            ]
        };
        
        atualizarTudo();
    }else{
            //transforma datas extraidas do localStorage
                for (var _attr in self.config) {
                    if(self.config[_attr].data){
//                        console.log(self.config[_attr].data);
                        self.config[_attr].data = new Date(self.config[_attr].data);
                    }
             }    
//             atualizarTudo();
    }
   
    
    
//    $scope.userDTO.configMonitorLaboratorio.MOD_ST_CODIGO = $scope.paramsStateConfig.MOD_ST_CODIGO;
    
    
        //Watch for date changes
    $scope.$watch('userDTO.configMonitorLaboratorio.data', function(newDate) {
        var _c =  $scope.userDTO.configMonitorLaboratorio;
        console.log('New date set: ',  JSON.stringify(newDate) );
        var arrayAttr = [];
        //Looping objs and setting newDate and animation
        for (var attr in _c) {
            if(_c[attr].data){
//                console.log(_c[attr].data);
                _c[attr].data = new Date(newDate.startDate);
                _c[attr].css = 'animated fadeOutLeft';
                arrayAttr.push(attr);
                  
            }
        }

        //Looping attr and setting animation In
        $timeout(function () {
            for(var _yy in arrayAttr){
                _c[arrayAttr[_yy]].css = 'animated fadeInLeft';
            }

        }, 1000);
    }, false);
   
    function escolherFormatoData(periodo, grafico){
        switch (periodo){
            case '1D':
                $scope.userDTO.configMonitorLaboratorio[grafico].formatoData = 'dd/MM/yyyy';
            break;
            case '1W':
                $scope.userDTO.configMonitorLaboratorio[grafico].formatoData = 'w/MM';
            break;
            case '1M':
                $scope.userDTO.configMonitorLaboratorio[grafico].formatoData = 'MM/yyyy';
            break;
            case '3M':
                $scope.userDTO.configMonitorLaboratorio[grafico].formatoData = 'MM/yyyy';
            break;
            case '6M':
                $scope.userDTO.configMonitorLaboratorio[grafico].formatoData = 'MM/yyyy';
            break;
            
        }
        animacaoEscolahData(grafico);
    }
    
    function  atualizarResumoProcedimentos() {
        var _c =  $scope.userDTO.configMonitorLaboratorio;
        var _p = $scope.userDTO.configMonitorLaboratorio.resumoProcedimentos;
            var _user = $scope.userDTO;
            var _u = retornaUnidades();
            _p.loading = true;
            var dtFormat = constroeFormat(_p.periodo, _p.data);
            var _json = {dtFiltro: $filter('date')(_p.data, 'yyyy-MM-dd'),
                dtFormat: dtFormat,
                unidades: _u.unidades, unidadesEx: _u.unidadesEx,urgente:_c.urgente ? 'S':'N'};
            buscaAPIService.buscaGrafico('resumoProcedimentos', _p.periodo, _json, _user.configLisNet).then(
                    function success(response) {
                        var _d = response.data;
//                        console.log(JSON.stringify(_d, null, 2));
                        var _g = $scope.userDTO.configMonitorLaboratorio.lineDataResumoProcedimentos;
                        $scope.userDTO.configMonitorLaboratorio.labelResumoProcedimentos = [];
                        $scope.userDTO.configMonitorLaboratorio.dataResumoProcedimentos = [[]];
                        _g.labels = _d[0];
                        _g.datasets[0].data = _d[1];
                        $scope.userDTO.configMonitorLaboratorio.labelResumoProcedimentos = _d[0];
                        $scope.userDTO.configMonitorLaboratorio.dataResumoProcedimentos[0] = _d[1];
                        _p.loading = false;
                        _p.blink = false;
                        _p.total = _d[1].reduce(function (prev,current){
                            return prev +  (current ? current: 0)  ;
                        },0);
                       
                        $timeout(function (){_p.blink = true;},3);
                        var promise = promiseResumoStatus(_p.periodo, _json);
                        promise.then(function(data) {
                            _p.resolveStatus = data;
//                          alert('Success: ' + data);
                            _p.entregues = 0;
                             _p.entregues = data.reduce(function (prev,current){
                                    return prev +  (current[0] === '011' || current[0] === '016' ? current[1]: 0)  ;
                                },0);
//                            console.log('_p.entregues : '+_p.entregues);
                        }, function(reason) {
//                          alert('Failed: ' + reason);
                             _p.resolveStatus = [];
                        });

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
//                        console.log(JSON.stringify(_d, null, 2));
                        var _g = $scope.userDTO.configMonitorLaboratorio.barDataPacientes;
                        _g.labels = _d[0];
                        _g.datasets[0].data = _d[1];
                        $scope.userDTO.configMonitorLaboratorio.labelPacientes = _d[0];
                        $scope.userDTO.configMonitorLaboratorio.dataPacientes = [_d[1]];
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
        var _f = $scope.userDTO.configMonitorLaboratorio.faturamentoEstimado;
        
            var _user = $scope.userDTO;
            var _u = retornaUnidades();
            _f.loading = true;
            var dtFormat = constroeFormat(_f.periodo, _f.data);
            var _json = {dtFiltro: $filter('date')(_f.data, 'yyyy-MM-dd'),
                dtFormat: dtFormat,
                unidades: _u.unidades, unidadesEx: _u.unidadesEx,urgente:_c.urgente ? 'S':'N'};
            buscaAPIService.buscaGrafico('faturamentoEstimado', _f.periodo, _json, _user.configLisNet).then(
                    function success(response) {
                        var _d = response.data;
//                        console.log(JSON.stringify(_d, null, 2));
                        var _g = $scope.userDTO.configMonitorLaboratorio.barDataFaturamento;
                        _g.labels = _d[0];
                        _g.datasets[0].data = _d[1];
                        $scope.userDTO.configMonitorLaboratorio.labelFaturamento = _d[0];
                        $scope.userDTO.configMonitorLaboratorio.dataFaturamento = [_d[1]];
                        $scope.userDTO.configMonitorLaboratorio.seriesFaturamento = ['Seilah','kjkkjh'];
                        _f.loading = false;
                        _f.blink = false;
                        _f.total = _d[1].reduce(function (prev,current){
                            return prev +  (current ? current: 0)  ;
                        },0);
                        $timeout(function (){_f.blink = true;},3);
                    }, function error(response) {

                    }
            );
    }
    
    function  atualizarResumoEntregues() {
          var _c =  $scope.userDTO.configMonitorLaboratorio;
        var _e = $scope.userDTO.configMonitorLaboratorio.resumoEntregues;
            var _user = $scope.userDTO;
            var _u = retornaUnidades();
            _e.loading = true;
            var dtFormat = constroeFormat(_e.periodo, _e.data);
            var _json = {dtFiltro: $filter('date')(_e.data, 'yyyy-MM-dd'),
                dtFormat: dtFormat,
                unidades: _u.unidades, unidadesEx: _u.unidadesEx,urgente:_c.urgente ? 'S':'N'};
            buscaAPIService.buscaGrafico('resumoProcedimentos', _e.periodo, _json, _user.configLisNet).then(
                    function success(response) {
                        var _d = response.data;
//                        console.log(JSON.stringify(_d, null, 2));
//                        var _g = $scope.userDTO.configMonitorLaboratorio.lineDataResumoEntregues;
//                        _g.labels = _d[0];
//                        _g.datasets[0].data = _d[1];
                        $scope.userDTO.configMonitorLaboratorio.labelResumoEntregues = [];
                        $scope.userDTO.configMonitorLaboratorio.dataResumoEntregues = [];
                        $scope.userDTO.configMonitorLaboratorio.labelResumoEntregues = _d[0];
                        $scope.userDTO.configMonitorLaboratorio.dataResumoEntregues = [_d[1]];
                        _e.loading = false;
                        _e.blink = false;
                        _e.total = _d[1].reduce(function (prev,current){
                            return prev +  (current ? current: 0)  ;
                        },0);
                        
                        promiseResumoStatus(_e.periodo, _json).then(data => {
                                _e.entregues = 0;
                                _e.entregues = data.reduce(function (prev, current) {
                                    return prev + (current[0] === '011' || current[0] === '016' ? current[1] : 0);
                                }, 0);
                            });
                        
                        $timeout(function (){_e.blink = true;},3);

                    }, function error(response) {
                        console.log(response);
                    }
            );
    }
    
    function  atualizarResumoStatus() {
          var _c =  $scope.userDTO.configMonitorLaboratorio;
        var _s = $scope.userDTO.configMonitorLaboratorio.resumoStatus;
//            var _user = $scope.userDTO;
            var _u = retornaUnidades();
            var _color = self.configLisnet.colorsChart;
            _s.loading = true;
            var dtFormat = constroeFormat(_s.periodo, _s.data);
            var _json = {dtFiltro: $filter('date')(_s.data, 'yyyy-MM-dd'),
                dtFormat: dtFormat,
                unidades: _u.unidades, unidadesEx: _u.unidadesEx,urgente:_c.urgente ? 'S':'N'};
            
             var promise = promiseResumoStatus(_s.periodo, _json);
                        promise.then(function(data) {
//                            console.log(JSON.stringify(data,null,2));
//                            _p.resolveStatus = data;
//                          alert('Success: ' + data);

//                               $scope.userDTO.configMonitorLaboratorio.doughnutDataResumoStatus = [];
                               $scope.userDTO.configMonitorLaboratorio.labelResumoStatus = [];
                               $scope.userDTO.configMonitorLaboratorio.dataResumoStatus = [];
                               for (var _i in data) {
                                   $scope.userDTO.configMonitorLaboratorio.doughnutDataResumoStatus[_i] = {value: data[_i][1], label: data[_i][0], color: _color[_i].fillColor, highlight: _color[_i].highlightFill};
                                   $scope.userDTO.configMonitorLaboratorio.labelResumoStatus.push(data[_i][0]);
                                   $scope.userDTO.configMonitorLaboratorio.dataResumoStatus.push(data[_i][1]);
                               }
                                _s.loading = false;
                               _s.blink = false;

                               $timeout(function () {
                                   _s.blink = true;
                               }, 3);

                        }, function(reason) {
//                          alert('Failed: ' + reason);
                             _s.resolveStatus = [];
                        });
            
    }
    
    function  atualizarResumoPendencias() {
        var _c =  $scope.userDTO.configMonitorLaboratorio;
        var _p = $scope.userDTO.configMonitorLaboratorio.resumoPendencias;
            var _user = $scope.userDTO;
            var _u = retornaUnidades();
            _p.loading = true;
            
            var dtFormat = constroeFormat(_p.periodo, _p.data);
            var _json = {dtFiltro: $filter('date')(_p.data, 'yyyy-MM-dd'),dtFormat: dtFormat,unidades: _u.unidades, unidadesEx: _u.unidadesEx,urgente:_c.urgente ? 'S':'N'};
//            var colors = [{color:"rgba(229, 0, 3,0.5)",highlight: "#1ab394"},{color: "#dedede",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"},{color: "#A4CEE8",highlight: "#1ab394"}];
            
                        buscaAPIService.buscaGrafico('resumoPendencias', _p.periodo, _json, _user.configLisNet).then(
                           function success(response) {
//                               console.log(JSON.stringify(response.data));
                               var data = response.data;

//                               console.log(JSON.stringify(data,null,2));
                                $scope.userDTO.configMonitorLaboratorio.colorsResumoPendencias = [];
                                $scope.userDTO.configMonitorLaboratorio.labelResumoPendencias = [];
                                $scope.userDTO.configMonitorLaboratorio.dataResumoPendencias = [];
                                $scope.userDTO.configMonitorLaboratorio.seriesResumoPendencias = []
                               $scope.userDTO.configMonitorLaboratorio.doughnutDataResumoPendencias = [];
                               for (_i in data) {
                                   $scope.userDTO.configMonitorLaboratorio.doughnutDataResumoPendencias[_i] = {value: data[_i][1], label: data[_i][0], color: data[_i][2], highlight: data[_i][2]};
                                   $scope.userDTO.configMonitorLaboratorio.labelResumoPendencias.push(data[_i][0]);
                                   $scope.userDTO.configMonitorLaboratorio.dataResumoPendencias.push(data[_i][1]);
                                   $scope.userDTO.configMonitorLaboratorio.colorsResumoPendencias.push(data[_i][2]);
                                   $scope.userDTO.configMonitorLaboratorio.seriesResumoPendencias.push(data[_i][0]);
                               }

                               _p.loading = false;
                               _p.blink = false;

                               $timeout(function () {
                                   _p.blink = true;
                               }, 3);
                           }, function error(response) {
                       alert('erro');
                       reject(response);
                   }
                   );
    }
    
    function promiseResumoStatus(periodo,json){
        var _user = $scope.userDTO;
        
        return $q(function (resolve, reject) {
            buscaAPIService.buscaGrafico('resumoStatus', periodo, json, _user.configLisNet).then(
                    function success(response) {
//                        console.log(JSON.stringify(response.data));
                        resolve(response.data); 
                    }, function error(response) {
                        alert('erro');
                          reject(response); 
                    }
            );
        });
        
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
    
    $scope.escolhePeriodoAll = function (periodo,array) {
        for(var _x in array){
            var _grafico = array[_x];
              console.log('_grafico : '+_grafico);
             self.config[_grafico].periodo = periodo;
        }
        $timeout(function (){$scope.atualizar();},500);
    };
    
    $scope.escolhePeriodo = function (periodo, grafico) {
        console.log('periodo: '+periodo+'   grafico: '+grafico);
        self.config[grafico].periodo = periodo;
        escolherFormatoData(periodo, grafico);
        encontraGraficoParaAtualizar(grafico);
    };

    $scope.atualizar = function (){
        $scope.userDTO.configMonitorLaboratorio.resumoProcedimentos.loading = true;
        $scope.userDTO.configMonitorLaboratorio.resumoEntregues.loading = true;
        $scope.userDTO.configMonitorLaboratorio.resumoPacientes.loading = true;
        $scope.userDTO.configMonitorLaboratorio.faturamentoEstimado.loading = true;
        $scope.userDTO.configMonitorLaboratorio.resumoStatus.loading = true;
        $scope.userDTO.configMonitorLaboratorio.resumoPendencias.loading = true;
        atualizarTudo();
    };
    
    function atualizarTudo(){
        $timeout(function (){atualizarResumoProcedimentos();},800);
        $timeout(function (){ atualizarResumoPacientes(); },1000);
        $timeout(function (){atualizarFaturamentoEstimado();},1500);
        $timeout(function (){atualizarResumoEntregues();},2000);
        $timeout(function (){atualizarResumoStatus();},2500);
        $timeout(function (){atualizarResumoPendencias();},500);
    }

    
    
    function encontraGraficoParaAtualizar(grafico) {
        switch (grafico) {
            case 'resumoProcedimentos':
                atualizarResumoProcedimentos();
                break;
            case 'resumoPacientes':
                atualizarResumoPacientes();
                break;
            case 'faturamentoEstimado':
                atualizarFaturamentoEstimado();
                break;
            case 'resumoEntregues':
                atualizarResumoEntregues();
                break;
            case 'resumoStatus':
                atualizarResumoStatus();
                break;
            case 'resumoPendencias':
                atualizarResumoPendencias();
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
  
/**  */
  $scope.userDTO.configMonitorLaboratorio.doughnutOptions = {
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 2,
        percentageInnerCutout : 45, // This is 0 for Pie charts
        animationSteps : 100,
        animationEasing : "easeOutBounce",
        animateRotate : true,
        animateScale : false
    };
    
    /**
     * Options for Doughnut chart
     */
  $scope.userDTO.configMonitorLaboratorio.doughnutOptions = {
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 2,
        percentageInnerCutout : 45, // This is 0 for Pie charts
        animationSteps : 100,
        animationEasing : "easeOutBounce",
        animateRotate : true,
        animateScale : false
    };

    $scope.isActive = function (periodo, grafico) {
        return $scope.userDTO.configMonitorLaboratorio[grafico].periodo ? self.config[grafico].periodo  === periodo : false;
    };
    
    $scope.grabCSS = function (grafico) {
        return $scope.userDTO.configMonitorLaboratorio[grafico].css;
    };

    $scope.shiftDate = function (direcao, grafico) {
        console.log('direcao: ' + direcao + '   grafico: ' + grafico);
        if (direcao) {
            $scope.userDTO.configMonitorLaboratorio[grafico].data.setDate(self.config[grafico].data.getDate() + 1);
        } else {
            $scope.userDTO.configMonitorLaboratorio[grafico].data.setDate(self.config[grafico].data.getDate() - 1);
        }
        animacaoEscolahData(grafico);
        encontraGraficoParaAtualizar(grafico);
    };
    
    function animacaoEscolahData(grafico){
         $scope.userDTO.configMonitorLaboratorio[grafico].css = 'animated fadeOutLeft';
        $timeout(function () {
            $scope.userDTO.configMonitorLaboratorio[grafico].css = 'animated fadeInLeft';
        }, 1000);
    }

}


angular.module('lisnet')
        .controller('monitorLaboratorio', monitorLaboratorio);


