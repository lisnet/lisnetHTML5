/* 
 Created on : Nov 1, 2016, 5:57:18 PM
 Author     : eros
 */



angular.module('lisnet')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
}]);


