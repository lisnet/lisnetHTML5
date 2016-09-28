/* 
 * Here comes the text of your license
 * Each line should be prefixed with  * 
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



