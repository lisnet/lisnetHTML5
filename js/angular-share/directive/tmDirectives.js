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
//        console.log('Inside enterKey ....');
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


function nextFocus() {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            elem.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    console.log('Foda-se ..... carai ...');
                    event.preventDefault();
                    var elementToFocus = elem.next('div').find('input')[0];
                    if (angular.isDefined(elementToFocus)){}
                        elementToFocus.focus();
                }
            });
        }
    };
}


function moveMaxLength(){
    return {
        restrict: "A",
        link: function($scope, element) {
            element.on("input", function(e) {
                if(element.val().length == element.attr("maxlength")) {
                    var $nextElement = element.next();
                    if($nextElement.length) {
                        $nextElement[0].focus();
                    }
                }
            });
        }
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

function fooTable (){
  return function(scope, element){
    var footableTable = element.parents('table');
    if( !scope.$last ) {
        return false;
    }
    scope.$evalAsync(function(){

        if (! footableTable.hasClass('footable-loaded')) {
            footableTable.footable();
        }

        footableTable.trigger('footable_initialized');
        footableTable.trigger('footable_resize');
        footableTable.data('footable').redraw();

    });
  };
}

function capitalize() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
}

function compareTo() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};

 function focus($timeout, $parse) {
//     console.log('Inside focus controle.. directive');
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          scope.$watch(attrs.focus, function(newValue, oldValue) {
              if (newValue) { element[0].focus(); }
          });
          element.bind("blur", function(e) {
              $timeout(function() {
                  scope.$apply(attrs.focus + "=false"); 
              }, 0);
          });
          element.bind("focus", function(e) {
              $timeout(function() {
                  scope.$apply(attrs.focus + "=true");
              }, 0);
          });
      }
    };
  };

function keyFunction($timeout, $parse) {

    return function (scope, element, attrs) {
        console.log('Inside keyFunction....');
        element.bind("keydown keypress", function (event) {
            if (event.which !== 13 && event.which !== 22) {
                event.preventDefault();
//                scope.$watch(attrs.focus, function (newValue, oldValue) {
//                    if (newValue) {
//                        element[0].focus();
//                    }
//                });
                element.bind("blur", function (e) {
                    $timeout(function () {
                        scope.$apply(attrs.focus + "=false");
                    }, 0);
                });
                element.bind("focus", function (e) {
                    $timeout(function () {
                        scope.$apply(attrs.focus + "=true");
                    }, 0);
                });

            }
        });
    };
}


function  eatClickIf($parse, $rootScope) {
    return {
      // this ensure eatClickIf be compiled before ngClick
      priority: 100,
      restrict: 'A',
      compile: function($element, attr) {
        var fn = $parse(attr.eatClickIf);
        return {
          pre: function link(scope, element) {
            var eventName = 'click';
            element.on(eventName, function(event) {
              var callback = function() {
                if (fn(scope, {$event: event})) {
                  // prevents ng-click to be executed
                  event.stopImmediatePropagation();
                  // prevents href 
                  event.preventDefault();
                  return false;
                }
              };
              if ($rootScope.$$phase) {
                scope.$evalAsync(callback);
              } else {
                scope.$apply(callback);
              }
            });
          },
          post: function() {console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');}
        };
      }
    };
  }


angular.module('lisnet')
        .directive('enterKey',enterKey)
        .directive('nextFocus',nextFocus)
        .directive('myPage',myPage)
        .directive('moveMaxLength',moveMaxLength)
        .directive('autoNext',autoNext)
        .directive('fooTable',fooTable)
        .directive('capitalize',capitalize)
        .directive('eatClickIf',eatClickIf)
        .directive('focus',focus)
        .directive('compareTo',compareTo);


