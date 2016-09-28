/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function () {
    angular.module('lisnet', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'pascalprecht.translate',       // Angular Translate
        'ngIdle',                       // Idle timer
        'ngSanitize',                    // ngSanitize
        'ngAnimate',
//        'ngMaterial',
        'angularMoment',
        'ngRoute',
        'ngAria',
        'ng.deviceDetector',
        'reTree',
        'ngStorage'
    ]);
})();

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad