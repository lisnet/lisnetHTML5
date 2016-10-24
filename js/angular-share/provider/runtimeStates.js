/* 
 Created on : Jan 12, 2016, 1:37:18 PM
 Author     : eros
 */


//angular.module('lisnet').provider('base64', function () {
angular.module('lisnet').provider('runtimeStates', function runtimeStates($stateProvider) {
    // runtime dependencies for the service can be injected here, at the provider.$get() function.
    this.$get = function ($q, $timeout, $state) { // for example
        return {
            addState: function (name, state) {
                $stateProvider.state(name, state);
            }
        };
    };
});

