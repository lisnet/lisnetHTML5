/* 
 Created on : Nov 1, 2016, 5:57:18 PM
 Author     : eros
 */

angular.module('lisnet').filter('cutchars',function (){
    return function (input,size){
      if(angular.isDefined(input)){
          if(input.length <= size) return input;
            return  input.substring(0,size) ;
      }else{
        return input;  
      }
    };
});
