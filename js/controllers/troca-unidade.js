/* 
 Created on : Dec 20, 2016, 4:17:52 PM
 Author     : eros
 */



angular.module('lisnet').controller('trocaUnidade',function ($scope,$uibModal,DTOptionsBuilder,sairDoSistemaService,helperService){
    
    var wd = this;
    
    
    $scope.userDTO = sairDoSistemaService.validarLogin();
    
    $scope.escolheUnidade = function (uniStCodigo){
        $scope.userDTO.unidade = helperService.retornaUnidade(uniStCodigo,$scope.userDTO.unidades);
    };
    
    $scope.popUnidades =  function (){
        return  $uibModal.open({
                    template:'   <div class="ibox-content"  ng-controller="trocaUnidade" > '
                    +' <span class="m-r-sm text-justify  "  style="font-weight: bold;"    >Unidade: {{main.userDTO.unidade.UNI_ST_CODIGO }} - {{main.userDTO.unidade.UNI_ST_DESCRICAO}}</span> '
                    +'<hr>'
                    +' <table datatable="ng" dt-options="dtOptionsWidgets"  class="table table-striped table-bordered table-hover dataTables-example"> '
                    +'     <thead> '
                    +'     <tr> '
                    +'         <th style="width:50px;" >Escolha a Unidade</th> '
                    +'     </tr> '
                    +'     </thead> '
                    +'     <tbody> '
                    +'     <tr ng-repeat="u in userDTO.unidades"   > '
                    +'         <td  ng-click="escolheUnidade(u.UNI_ST_CODIGO)"   ><span class="text-center  text-muted small    "> <i style="color:blue;"  class="fa fa-exchange" aria-hidden="true"/> {{u.UNI_ST_CODIGO}} - {{u.UNI_ST_DESCRICAO}}</span></td> '
                    +'     </tr> '
                    +'     </tbody> '
                    +' </table> '
                    +'  </div>',
                                scope: $scope
                            });
    };
    
    $scope.dtOptionsWidgets = DTOptionsBuilder.newOptions()
                .withDOM('<"html5buttons"B>lTfgitp')
                .withOption('stateSave', false)
//                .withOption('searching', true)
                .withOption('lengthMenu', [10, 25, 50, 100, 150, 200])
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
    
});

