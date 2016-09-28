/* 
 * Here comes the text of your license
 * Each line should be prefixed with  * 
 */



angular.module('lisnet')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
}]);


