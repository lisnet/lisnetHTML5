/* 
 Created on : Jan 12, 2016, 1:37:18 PM
 Author     : eros
 */

angular.module('lisnet')
    .directive('myPage', function ($compile) {

        return {
            templateUrl: 'views/laudo/laudo.html',
            restrict: 'AE',
            compile: function compile(element, attrs, transclude) {
                // does nothing currently
                return {
                    pre: function preLink(scope, element, attrs, controller) {
                        // does nothing currently
                    },
                    post: function postLink(scope, element, attrs, controller) {
                        // does nothing currently
                    }
                }
            }
        };
    });



