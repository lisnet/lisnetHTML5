/* 
 Created on : Oct 5, 2016, 5:13:54 PM
 Author     : eros
 */


angular.module('lisnet').service('gerenciaRelatorioService', function (buscaAPIService,$filter,$http) {


    this.gerarRelatorio = function (json, $scope) {

        if (angular.isUndefined($scope.userDTO.notificacoes)) {
            $scope.userDTO.notificacoes = [];
        }

        buscaAPIService.relatorio('gerar', json, $scope.userDTO.configLisNet).then(function successCallback(response) {
            console.log(response.statusText);
            var json = response.data;
//            console.log(json);
            var not = {id: json.codigo_rastreio, icon: "fa fa-cog fa-spin fa-2x ", descricao: json.relatorio_titulo, aviso: 'em execução', status: 'A',dtInicio:new Date(),style:'color: #416a8c'};
            $scope.userDTO.notificacoes.unshift(not);
        }, function errorCallback(response) {
            console.log(response.statusText);
            var dataResponse = response.data;
            var json = response.data;
            var not = {id: json.codigo_rastreio, icon: "fa fa-bug  fa-3x", descricao: json.relatorio_titulo, aviso: 'erro', status: 'X',dtInicio:new Date(),style:'color: red'};
            $scope.userDTO.notificacoes.unshift(not);
        });
        $scope.userDTO.notificacoesEmExecucao  = $scope.userDTO.notificacoesEmExecucao + 1;
    };
    this.atualizaRelatorios = function (userDTO) {
        var limit ;
        if(angular.isUndefined(userDTO.notificacoes)){
            userDTO.notificacoes = [];
            limit = 60;
        }else{
            limit  = userDTO.notificacoes.length;
        }
         var dt = new Date();
           dt.setMonth(dt.getMonth() -1);
           var strDT = $filter('date')(dt, " dd/MM/yyyy");
//           console.log('Inside atualizaRelatorios ..');
           buscaAPIService.relatorioGET('listar',userDTO.USU_ST_CODIGO,strDT,'condigo_de_rastrieo',limit,userDTO.configLisNet).then(function successCallback(response){
               userDTO.notificacoesEmExecucao = 0;
//               console.log('response.data = '+ JSON.stringify(response.data) );
               var arrayRel = response.data;
               var arrayNotf = [];
               for(var i = 0 ; i < arrayRel.length ; i ++ ){
                   var rel = arrayRel[i];
                   var icon = null;
                   var aviso = null;
                   var style  = null;
                   switch (rel.REL_CH_STATUS){
                       case 'A':
                           icon = 'fa fa-cog fa-spin fa-2x ';
                           aviso = 'em execução' ;
                           userDTO.notificacoesEmExecucao ++;
                           style = 'color: #416a8c';
                       break;
                       case 'B':
                           icon = 'fa fa-cloud-download  fa-2x text-info';
                           aviso = 'concluído' ;
                           style = 'color: #2d4c2d';
                       break;
                       case 'X':
                           icon = 'fa fa-bug  fa-3x';
                           aviso = 'erro' ;
                           style = 'color: red';
                       break;
                       default :
                           icon = 'fa fa-bug  fa-3x';
                           aviso = 'erro' ;
                           style ='color: red';
                   }
                    var not = {id: rel.REL_IN_CODIGO, icon: icon, descricao: rel.REL_ST_DESCRICAO, aviso: aviso, status: rel.REL_CH_STATUS,dtInicio:rel.REL_DT_CONSULTA,style:style};
                    arrayNotf.push(not);
               }
               if(userDTO.notificacoes.length !== arrayNotf.length){
//                   console.log('Tamanho eh diferente...   $scope.userDTO.notificacoes.length: '+$scope.userDTO.notificacoes.length+"        arrayNotf.length: "+arrayNotf.length);
                   userDTO.notificacoes = arrayNotf;
               }else{
                   for(var i = 0 ; i < arrayNotf.length ; i ++){
                       var not = arrayNotf[i];
                       var not2 =userDTO.notificacoes[i];
                       if(not.codigo_rastreio === not2.codigo_rastreio){
//                           console.log('Inside loop ');
                           if(not.status !== not2.status){
                               console.log('mudando status ..');
                               not2.status = not.status;
                               not2.aviso = not.aviso;
                               if(not.status === 'B'){
                                not2.icon = 'fa fa-cloud-download  fa-2x text-info';
                               }else{
                                   not2.icon = 'fa fa-bug  fa-3x';
                               }
                               
                           }
                       }
                   }
               }
           });
     
    };
    this.statusRelatorio = function (codigo_rastreio, $scope) {

    };
    this.downloadRelatorio = function (codigo_rastreio, $scope) {

    };
    

});

