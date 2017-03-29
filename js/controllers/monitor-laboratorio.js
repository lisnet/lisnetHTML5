/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : Mar 28, 2017, 11:22:57 AM
 Author     : eros
 */


function monitorLaboratorio($scope,$state ,buscaAPIService, $stateParams, sairDoSistemaService, notificacaoProvider,  $timeout,  DTOptionsBuilder, helperService,$filter){
    var self = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
    $scope.filtros = ['1D','1W','1M','3M'];
    
    var abas = [{label:'resumo',desc:'Resumo Geral'},{label:'pendencia',desc:'Pendências'},{label:'setores',desc:'Pendências por Setor'}];
    if(!$scope.userDTO.configMonitorLaboratorio){
        
        $scope.userDTO.configMonitorLaboratorio = {unidade:'TODAS',unidadeEx:'TODAS',URGENTE:false,RANGE:'DIA',aba:'resumo',data:{"startDate": moment(),"endDate": moment()}};


     /**
     * Options for Line chart
     */
    $scope.userDTO.configMonitorLaboratorio.lineOptions = {
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        bezierCurve : true,
        bezierCurveTension : 0.4,
        pointDot : true,
        pointDotRadius : 4,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 2,
        datasetFill : true
    };

    /**
     * Options for Bar chart
     */
    $scope.userDTO.configMonitorLaboratorio.barOptions = {
        scaleBeginAtZero : true,
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        barShowStroke : true,
        barStrokeWidth : 2,
        barValueSpacing : 5,
        barDatasetSpacing : 1
};

/**
     * Data for Line chart
     */
    $scope.userDTO.configMonitorLaboratorio.lineData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Example dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "Example dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.7)",
                pointColor: "rgba(26,179,148,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(26,179,148,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
    
     /**
     * Data for Bar chart
     */
    $scope.userDTO.configMonitorLaboratorio.barData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.8)",
                highlightFill: "rgba(26,179,148,0.75)",
                highlightStroke: "rgba(26,179,148,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };   
    }
    
    
    $scope.escolhePeriodo = function (periodo,grafico){
        console.log('periodo: '+periodo+"     grafico: "+grafico);
        switch (grafico){
                case'resumoProcedimentos':
                break;
                case'resumoProcedimentos':
                break;
                case'resumoProcedimentos':
                break;
                case'resumoProcedimentos':
                break;
            
        }
        
    };
    
     


    
};

angular.module('lisnet')
        .controller('monitorLaboratorio',monitorLaboratorio);


