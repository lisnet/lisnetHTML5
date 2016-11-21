/* 
 Created on : Jan 12, 2016, 1:37:18 PM
 Author     : eros
 */


angular.module('lisnet')
        .provider('notificacaoProvider', function () {

            this.$get = function (SweetAlert,$uibModal) {
                return {
//                    closeDialog: function () {
//                        $mdDialog.cancel();
//                    },
//                    showDialog: function (title, textContent, btnLabel, label, ev) {
//                        $mdDialog.show(
//                                $mdDialog.alert()
//                                .parent(angular.element(document.querySelector('#lisnetIndexPage')))
//                                .clickOutsideToClose(true)
//                                .title(title)
//                                .textContent(textContent)
//                                .ariaLabel(label)
//                                .ok(btnLabel)
//                                .targetEvent(ev)
//                                ).then(function (result) {
//                                    $mdDialog.cancel();
//                                }, function (reason) {
//                                    $mdDialog.cancel();
//                                });
//                    },
//                    showDialogWarning: function (title, textContent, btnLabel, label, ev) {
//                        $mdDialog.show(
//                                $mdDialog.alert()
//                                .parent(angular.element(document.querySelector('#lisnetIndexPage')))
//                                .clickOutsideToClose(true)
//                                .title(title)
//                                .textContent(textContent)
//                                .ariaLabel(label)
//                                .ok(btnLabel)
//                                .targetEvent(ev)
//                                );
//                    },
//                     showDialogError: function (title, textContent, btnLabel, label, ev) {
//                        $mdDialog.show(
//                                $mdDialog.alert()
//                                .parent(angular.element(document.querySelector('#lisnetIndexPage')))
//                                .clickOutsideToClose(true)
//                                .title(title)
//                                .textContent(textContent)
//                                .ariaLabel(label)
//                                .ok(btnLabel)
//                                .targetEvent(ev)
//                                );
//                    },
//                    showDialogLoding: function ($scope, ev) {
//                        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
//                        return $mdDialog.show({
////                controller: DialogController,
////                templateUrl: 'dialog.loading.html',
//                            template: ' <md-dialog aria-label="Mango (Fruit)"  ng-cloak   style="  min-width: 40px;"  > ' +
//                                    ' <form> ' +
//                                    ' <md-dialog-content> ' +
//                                    '   <div class="md-dialog-content">' +
//                                    '             <div layout="row" layout-sm="column" layout-align="space-around">' +
//                                    '                 <md-progress-circular md-mode="indeterminate"  md-diameter="50" ></md-progress-circular>' +
//                                    '             </div>' +
//                                    '   </div>' +
//                                    ' </md-dialog-content>' +
//                                    ' </form>' +
//                                    ' </md-dialog>',
//                            parent: angular.element(document.querySelector('#lisnetIndexPage')),
//                            targetEvent: ev,
//                            clickOutsideToClose: true,
//                            fullscreen: useFullScreen
//                        }).then(function (result) {
//                            console.log(result);
//                        }, function (reason) {
//                            console.log(reason);
//                        });
//                    },
//                    showToast: function (delay,label,info,controller) {
//                        $mdToast.show({
//                            hideDelay: delay,
//                            position: 'top right',
//                            controller: controller,
////          templateUrl : 'toast-template.html'
//                            template: '<md-toast><span class="md-toast-text" flex>'+label+'</span> <md-button  aria-label="Info" class="md-highlight" ng-click="openMoreInfo($event)">  '+info+'</md-button><md-button   aria-label="x"  ng-click="closeToast()"><i class="fa fa-times" aria-hidden="true"></i></md-button></md-toast>'
//                        });
//                    },
//                    isDlgOpen: false,
//                    closeToast: function () {
//                        console.log('closing that thing ...');
//                        if (this.isDlgOpen)
//                            return;
//                        $mdToast
//                                .hide()
//                                .then(function () {
//                                    this.isDlgOpen = false;
//                                });
//                    },
//                     openMoreInfo : function(title,text,label,e) {
//         
//                        if ( this.isDlgOpen ) return;
//                        isDlgOpen = true;
//                        $mdDialog
//                          .show($mdDialog
//                            .alert()
//                            .title(title)
//                            .textContent(text)
//                            .ariaLabel(label)
//                            .ok('ok')
//                            .targetEvent(e)
//                          )
//                          .then(function() {
//                            this.isDlgOpen = false;
//                          });
//                      },
//                      sweetInfo : function (title,text) {
//                            SweetAlert.swal({
//                                title: title,
//                                text: text
//                            });
//                        },
                        sweetDialog : function (title,text,type,confirmButtonColor,confirmButtonText) {
                            SweetAlert.swal({
                                title: title,
                                text: text,
                                type:type,
                                confirmButtonColor: confirmButtonColor,
                                confirmButtonText: confirmButtonText
                            });
                        },sweetSuccess : function (title,text) {
                            SweetAlert.swal({
                                title: title,
                                text: text,
                                type: "success"
                            });
                        },sweetWarning : function (title,text) {
                            SweetAlert.swal({
                                title: title,
                                text: text,
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
//                                confirmButtonText: "Yes, delete it!",
                                closeOnConfirm: false,
                                closeOnCancel: false
                            },function () { SweetAlert.swal("Ok!"); });
                        },sweetLoading : function () {
                            SweetAlert.swal({
                                
                                title: 'loading',
                                type: "warning",
                                template:'<h1>Test template ...</h1>',
                                confirmButtonColor: 'red',
                                confirmButtonText: 'ok'
                            });
                        },modalLoading:function (title,msg,scope){
                            return   $uibModal.open({
                                template:'<div class="inmodal  modal-loading" >   '+
                                ' <div class="modal-header">  '+
                                '     <h4 class="modal-title">'+title+'</h4>  '+
                                '     <strong class="font-bold  text-navy ">'+msg+'</strong>  '+
                                ' </div>  '+
                                ' <div class="modal-body">  '+
                                '     <div class="sk-spinner sk-spinner-three-bounce">  '+
                                '                         <div class="sk-bounce1"></div>  '+
                                '                         <div class="sk-bounce2"></div>  '+
                                '                         <div class="sk-bounce3"></div>  '+
                                '                     </div>  '+
                                ' </div> </div>',
                                scope:scope
//                                controller: controller
                            });
                            
                        },modalLoadingGenerico:function (title,msg){
                            return   $uibModal.open({
                                template:'<div class="inmodal  modal-loading" >   '+
                                ' <div class="modal-header">  '+
                                '     <h4 class="modal-title">'+title+'</h4>  '+
                                '     <strong class="font-bold  text-danger ">'+msg+'</strong>  '+
                                ' </div>  '+
                                ' <div class="modal-body">  '+
                                '     <div class="sk-spinner sk-spinner-three-bounce">  '+
                                '                         <div class="sk-bounce1"></div>  '+
                                '                         <div class="sk-bounce2"></div>  '+
                                '                         <div class="sk-bounce3"></div>  '+
                                '                     </div>  '+
                                ' </div> </div>'
                            });
                        },modalIframe:function (title,msg,scope,url){
                            return   $uibModal.open({
                                template:
                                 '<div class="inmodal  modal-iframe"  style="width:100%; height: 100%;" >   '+
                                ' <div class="modal-header">  '+
                                '     <h4 class="modal-title">'+title+'</h4>  '+
                                '     <strong class="font-bold ">'+msg+'</strong>  '+
//                                '     <a href='+url+' target="_blank" >Download</a>'+
                                ' <div  id="loadImg" class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div> '+
                                ' </div>  '+
                                ' <div class="modal-body  modal-iframe">  '+
                                ' <div class="embed-responsive embed-responsive-4by3 ">  '+
                                '     <iframe  id="myiframe" class="embed-responsive-item" src="'+url+'"   onload="myFunc();" ></iframe>  '+
                                '   </div>  '+
                                ' </div>  '+
                                ' <script>function myFunc(){  document.getElementById("loadImg").style.display="none";   } </script> '+
                                ' </div>',
                                size: 'lg',
                                scope:scope
//                                controller: controller
                            });
                        }

                };
            };
        });

