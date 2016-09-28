/* 
 * Here comes the text of your license
 * Each line should be prefixed with  * 
 */


angular.module('lisnet').provider("serialGenerator",function (){
    var _length = 20;
    var _max = 64;
    var _min = 32;
    this.$get = function (){
        return {
            generate : function (){
                var serial = "";
                while(serial.length < _length){
                    serial += String.fromCharCode(Math.floor(Math.random() * _max) + _min);
                }
                return serial;
            },degenerate : function (){
                var serial = "";
                while(serial.length < _length){
                    serial += String.fromCharCode(Math.floor(Math.random() * _max) + _min);
                }
                return serial;
            }
        };
    };
});


