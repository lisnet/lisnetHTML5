/* 
 * Here comes the text of your license
 * Each line should be prefixed with  * 
 */

angular.module('lisnet').filter('ellipsis',function (){
    return function (input,size){
      if(angular.isDefined(input)){
          if(input.length <= size) return input;
            return  input.substring(0,(size || 6)) + "...";
      }else{
        return input;  
      }
    };
});
