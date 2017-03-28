/* 
 Created on : Oct 24, 2016, 2:03:59 PM
 Author     : eros
 */



/* global x, i, y, z */



angular.module('lisnet')
        .service('resumePerfilService', function ($state,runtimeStates,configLisNet) {


    this.resume = function (perfil) {

        for (i in perfil) {
            var pai = perfil[i];
            if (pai.telas) {
                for (y in pai.telas) {
                    var filho = pai.telas[y];
                    if (filho.telas) {
                        filho.visualisar = true;
                        for (z in filho.telas) {
                            var neto = filho.telas[z];
                            
                            var _n = this.findStateJSON(neto.MOD_ST_CODIGO);
                            if (_n) {
                                neto.visualisar = true;
                                if (!$state.href(neto.MOD_ST_CODIGO)) {
                                    _n.state.params.breadcrumb = [{label: 'Home', go: 'widgets'}, {label: pai.MOD_ST_DESCRICAO, go: null}, {label: filho.MOD_ST_DESCRICAO, go: null}, {label: neto.MOD_ST_DESCRICAO, go: neto.MOD_ST_CODIGO}];
                                    _n.state.params.modStCodigo = neto.MOD_ST_CODIGO;
                                    runtimeStates.addState(_n.MOD_ST_CODIGO, _n.state);
                                    if (_n.states) {
                                        console.log('bastardos neto ' + _n.states.length);
                                        for (i in _n.states) {
                                            var _bastardo = _n.states[i];
                                            runtimeStates.addState(_bastardo.MOD_ST_CODIGO, _bastardo.state);
                                        }
                                    }
                                }
                            }
                        }
                    } else {

                        var _f = this.findStateJSON(filho.MOD_ST_CODIGO);
                        if (_f) {
                            filho.visualisar = true;
                            if (!$state.href(filho.MOD_ST_CODIGO)) {
                                _f.state.params.breadcrumb = [{label: 'Home', go: 'widgets'}, {label: pai.MOD_ST_DESCRICAO, go: null}, {label: filho.MOD_ST_DESCRICAO, go: filho.MOD_ST_CODIGO}];
                                _f.state.params.modStCodigo = filho.MOD_ST_CODIGO;
                                runtimeStates.addState(_f.MOD_ST_CODIGO, _f.state);
                                if (_f.states) {
                                    console.log('bastardos filho ' + _f.states.length);
                                    for (y in _f.states) {
                                        var _bastardo = _f.states[y];
                                        runtimeStates.addState(_bastardo.MOD_ST_CODIGO, _bastardo.state);
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                pai.visualisar = false;
            }
        }
        return perfil;
    };

    this.findState = function (stateName, array) {
        for (i in array) {
            if (array[i] === stateName) {
                return true;
            }
        }
        return false;
    };

    this.findStateJSON = function (MOD_ST_CODIGO){
        return configLisNet.stateArray.filter(function (state){
            return state.MOD_ST_CODIGO ===  MOD_ST_CODIGO;
        })[0];
};
    
    this.retornaStatesPesquisa = function (scope,userDTO){
        
        var statesPesquisa = configLisNet.statesPesquisa;

        for (i in userDTO.perfil) {

            var p = userDTO.perfil[i];
//        $scope.states.push(p.MOD_ST_CODIGO);

            for (y in p.telas) {

                var f = p.telas[y];
                if (f.telas && f.telas.length > 0) {
                    for (x in f.telas) {
                        var n = f.telas[x];
                        if (n.visualisar) {
                            statesPesquisa.push(n.MOD_ST_CODIGO + ' | ' + n.MOD_ST_DESCRICAO);
                        }
                    }
                } else {
                    if (f.visualisar) {
                        statesPesquisa.push(f.MOD_ST_CODIGO + ' | ' + f.MOD_ST_DESCRICAO);
                    }
                }
            }
    }
        return statesPesquisa;
    };

});

    function telaPadrao() {
        return   [
            {
                files: ['bower_components/sweetalert/dist/sweetalert.min.js', 'bower_components/sweetalert/dist/sweetalert.css']
            },
            {
                name: 'oitozero.ngSweetAlert',
                files: ['bower_components/ngSweetAlert/SweetAlert.min.js']
            },
            {
                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
            },
            {
                serie: true,
                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
            },
            {
                serie: true,
                name: 'datatables',
                files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
            },
            {
                serie: true,
                name: 'datatables.buttons',
                files: ['bower_components/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.min.js']
            },
            {
                name: 'ui.switchery',
                files: ['css/plugins/switchery/switchery.css', 'js/plugins/switchery/switchery.js', 'js/plugins/switchery/ng-switchery.js']
            },
            {
                files: ['bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.js']
            }
        ];
    };

    function telaComplexa() {
        return   [
            {
                files: ['bower_components/sweetalert/dist/sweetalert.min.js', 'bower_components/sweetalert/dist/sweetalert.css']
            },
            {
                name: 'oitozero.ngSweetAlert',
                files: ['bower_components/ngSweetAlert/SweetAlert.min.js']
            },
            {
                files: ['bower_components/moment/min/moment.min.js']
            },
            {
                name: 'ui.knob',
                files: ['js/plugins/jsKnob/jquery.knob.js', 'js/plugins/jsKnob/angular-knob.js']
            },
//            {
//                files: ['bower_components/ion.rangeSlider/css/ion.rangeSlider.css', 'bower_components/ion.rangeSlider/css/ion.rangeSlider.skinFlat.css', 'bower_components/ion.rangeSlider/js/ion.rangeSlider.min.js']
//            },
            {
                insertBefore: '#loadBefore',
                name: 'localytics.directives',
                files: ['css/plugins/chosen/bootstrap-chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
            },
//            {
//                name: 'nouislider',
//                files: ['css/plugins/nouslider/jquery.nouislider.css', 'js/plugins/nouslider/jquery.nouislider.min.js', 'js/plugins/nouslider/angular-nouislider.js']
//            },
            {
                name: 'datePicker',
                files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/angular-datepicker.js']
            },
            {
                files: ['bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min.js']
            },
            {
                files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
            },
            {
                name: 'ui.switchery',
                files: ['css/plugins/switchery/switchery.css', 'js/plugins/switchery/switchery.js', 'js/plugins/switchery/ng-switchery.js']
            },
            {
                name: 'colorpicker.module',
                files: ['css/plugins/colorpicker/colorpicker.css', 'js/plugins/colorpicker/bootstrap-colorpicker-module.js']
            },
            {
                name: 'ngImgCrop',
                files: ['js/plugins/ngImgCrop/ng-img-crop.js', 'css/plugins/ngImgCrop/ng-img-crop.css']
            },
            {
                serie: true,
                files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
            },
            {
                name: 'daterangepicker',
                files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
            },
            {
                files: ['css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
            },
            {
                name: 'ui.select',
                files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
            },
            {
                files: ['css/plugins/touchspin/jquery.bootstrap-touchspin.min.css', 'js/plugins/touchspin/jquery.bootstrap-touchspin.min.js']
            },
            {
                name: 'ngTagsInput',
                files: ['js/plugins/ngTags//ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
            },
            {
                files: ['js/plugins/dualListbox/jquery.bootstrap-duallistbox.js', 'css/plugins/dualListbox/bootstrap-duallistbox.min.css']
            },
            {
                name: 'frapontillo.bootstrap-duallistbox',
                files: ['js/plugins/dualListbox/angular-bootstrap-duallistbox.js']
            },
            {
                serie: true,
                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
            },
            {
            serie: true,
            name: 'datatables',
            files: ['bower_components/angular-datatables/dist/angular-datatables.min.js']
            },
            {
                serie: true,
                name: 'datatables.buttons',
                files: ['bower_components/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.min.js']
            },
            {
                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
            },
            {
                name: 'oitozero.ngSweetAlert',
                files: ['bower_components/sweetalert/dist/sweetalert.min.js']
            },
            {
                files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
            },
            {
                files: ['css/plugins/steps/jquery.steps.css']
            },
            {
                files: ['bower_components/footable/dist/footable.all.min.js', 'bower_components/footable/css/footable.core.css']
            },
            {
                name: 'ui.footable',
                files: ['bower_components/angular-footable/dist/angular-footable.js']
            }
        ];
    };


