/* 
 * Here comes the text of your license
 * Each line should be prefixed with  * 
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


