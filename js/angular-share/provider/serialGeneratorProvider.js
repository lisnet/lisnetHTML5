/* 
 Created on : Nov 1, 2016, 5:57:18 PM
 Author     : eros
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


