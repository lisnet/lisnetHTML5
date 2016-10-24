/* 
 * Here comes the text of your license
 * Each line should be prefixed with  * 
 */

/* 
 Created on : Nov 1, 2016, 5:57:18 PM
 Author     : eros
 */

angular.module('lisnet').filter('name', function () {
    return function (input) {
        if ( angular.isDefined(input)) {
            console.log('printing input from nameFilter = ' + input);
            var listaDeNomes = input.split(" ");

            var listDeNomesFormata = listaDeNomes.map(function (nome) {
//            if(nome == "da" || nome == "de") return nome;
                if (/(da|de)/.test(nome))
                    return nome;
                return nome.charAt(0).toUpperCase() + nome.substr(1).toLowerCase();
            });
        }
        if (angular.isDefined(listDeNomesFormata)) {
            return listDeNomesFormata.join(" ");
        } else {
            return input;
        }

    };
});


