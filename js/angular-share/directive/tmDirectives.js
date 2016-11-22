/* 
 Created on : Nov 21, 2016, 1:44:13 PM
 Author     : eros
 */



/**
 * 
 * @returns {Function} -  Directive para dar a funcionalidade do ng-click p a  tecla ENTER em campos de iINPUT
 */
function enterKey () {
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
}


function myPage($compile){
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
};

function autoNext(){
    return {
       restrict: 'A',
       link: function($scope, element, attr, form) { 
           var tabindex = parseInt(attr.tabindex);
           var maxLength = parseInt(attr.ngMaxlength);
           element.on('keypress', function(e) {
               if (element.val().length >= maxLength-1) {
                  var next = angular.element(document.body).find('[tabindex=' + (tabindex+1) + ']');
                  if (next.length > 0) {
                      next.focus();
                      return next.triggerHandler('keypress', { which: e.which});
                  }
                  else  {
                      return false;                          
                  }
               }
               return true;
           });

       }
    };
}
angular.module('lisnet')
        .directive('enterKey',enterKey)
        .directive('myPage',myPage)
        .directive('autoNext',autoNext);


