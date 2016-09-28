/* 
 * Here comes the text of your license
 * Each line should be prefixed with  * 
 */

angular.module('lisnet').filter('cutchars',function (){
    return function (input,size){
      if(angular.isDefined(input)){
          if(input.length <= size) return input;
            return  input.substring(size|| 2,(input.length )) ;
      }else{
        return input;  
      }
    };
});
