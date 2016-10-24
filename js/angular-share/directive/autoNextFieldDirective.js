/* 
 Created on : Jan 12, 2016, 1:37:18 PM
 Author     : eros
 */


angular.module('lisnet')
        .directive('autoNext', function() {
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
});


