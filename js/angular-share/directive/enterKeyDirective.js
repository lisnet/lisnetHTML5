/* 
 Created on : Oct 3, 2016, 5:57:18 PM
 Author     : eros
 */



angular.module('lisnet')
    .directive('enterKey', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.enterKey);
                });
                event.preventDefault();
            }
        });
    };
});


