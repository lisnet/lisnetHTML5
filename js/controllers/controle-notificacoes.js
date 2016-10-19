/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : Oct 19, 2016, 2:37:45 PM
 Author     : eros
 */


function controleNotificacoes($scope,$localStorage,sairDoSistemaService,DTOptionsBuilder){
    
    console.log('Inicializando controleNotificacoes');
    sairDoSistemaService.validarLogin();

    $scope.userDTO = $localStorage.userDTO;
    
//    $scope.dtOptions = DTOptionsBuilder.newOptions()
//        .withDOM('<"html5buttons"B>lTfgitp')
//        .withButtons([
//            {extend: 'copy'},
//            {extend: 'csv'},
//            {extend: 'excel', title: 'ExampleFile'},
//            {extend: 'pdf', title: 'ExampleFile'},
//
//            {extend: 'print',
//                customize: function (win){
//                    $(win.document.body).addClass('white-bg');
//                    $(win.document.body).css('font-size', '10px');
//
//                    $(win.document.body).find('table')
//                        .addClass('compact')
//                        .css('font-size', 'inherit');
//                }
//            }
//        ]);
        
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
            {extend: 'copy',text:'Copiar'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Lista_de_Notificacoes'},
            {extend: 'pdf', title: 'Lista_de_Notificacoes'},
            {extend: 'print',text:'Imprimir',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);  
        
}


angular.module('lisnet')
        .controller('controleNotificacoes',controleNotificacoes);


