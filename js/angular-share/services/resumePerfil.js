/* 
 Created on : Oct 24, 2016, 2:03:59 PM
 Author     : eros
 */



angular.module('lisnet').service('resumePerfilService', function ($state) {


    this.resume = function (perfil) {

    console.log('resumePerfilService ....................................................................................................................................................................................');
        var arrayStates = [];
        for (x in $state.get()) {
            var _s = $state.get()[x];
            arrayStates.push(_s.name);
        }
//        console.log("arrayStates = " + arrayStates);

        for (i in perfil) {
            var pai = perfil[i];
            if (pai.telas) {
                for (y in pai.telas) {
                    var filho = pai.telas[y];
                    if (filho.telas) {
//                        console.log('Filho com paginas  ...');
                        filho.visualisar = true;
                        for (z in filho.telas) {
                            var neto = filho.telas[z];
                            neto.visualisar = this.findState(neto.state, arrayStates);
                        }
                    } else {
//                        console.log('Filho sem paginas  ...');
                        filho.visualisar = this.findState(filho.state, arrayStates);
                    }
                }
            } else {
//                console.log('Pai sem paginas  ...');
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


});


