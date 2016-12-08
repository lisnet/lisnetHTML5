/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : Nov 16, 2016, 10:30:28 AM
 Author     : eros
 */


angular.module('lisnet').service('helperService', function () {


            this.rangeDatas = function (lapsoDias, lapsoMeses, dataBase, blFuturo) {
                var dtRetorno;
                if (dataBase && (lapsoDias || lapsoMeses)) {
                    if (blFuturo) {
                        if (lapsoMeses) {
                            dtRetorno = new Date(dataBase.getFullYear(), dataBase.getMonth() + lapsoMeses, dataBase.getDate());
                        } else {
                            dtRetorno = new Date(dataBase.getFullYear(), dataBase.getMonth(), dataBase.getDate() + lapsoDias);
                        }
                    } else {
                        if (lapsoMeses) {
                            dtRetorno = new Date(dataBase.getFullYear(), dataBase.getMonth() - lapsoMeses, dataBase.getDate());
                        } else {
                            dtRetorno = new Date(dataBase.getFullYear(), dataBase.getMonth(), dataBase.getDate() - lapsoDias);
                        }
                    }

                    return dtRetorno;
                } else {
                    return new Date();
                }
            };
            
            this.clonadorDeObj = function (obj) {
                    if (null === obj || "object" !== typeof obj) return obj;
                    var copy = obj.constructor();
                    for (var attr in obj) {
                        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
                    }
                    return copy;
          };
          
          this.comparaObjetos = function (obj1,obj2) {
//                    if (null === obj1 || "object" !== typeof obj1  && null === obj2 || "object" !== typeof obj2) return false;
                    return JSON.stringify(obj1) === JSON.stringify(obj2);
          };


        }

);