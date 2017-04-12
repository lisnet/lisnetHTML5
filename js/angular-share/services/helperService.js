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
          
          this.retornaUnidade = function (uniStCodigo, arrayDeUnidades){
              if(uniStCodigo && arrayDeUnidades && arrayDeUnidades.length > 0){
                  for(var y = 0 ; y < arrayDeUnidades.length; y ++){
                      var _u = arrayDeUnidades[y];
                      if(uniStCodigo === _u.UNI_ST_CODIGO){
                          return  this.clonadorDeObj(_u);
                      }
                  }
                  
              }else{
                  return null;
              }
          };
          this.retornaSemanaDoMes = function (data, exact) {

                var month = data.getMonth()
                        , year = data.getFullYear()
                        , firstWeekday = new Date(year, month, 1).getDay()
                        , lastDateOfMonth = new Date(year, month + 1, 0).getDate()
                        , offsetDate = data.getDate() + firstWeekday - 1
                        , index = 1 // start index at 0 or 1, your choice
                        , weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
                        , week = index + Math.floor(offsetDate / 7)
                        ;
                if (exact || week < 2 + index){
                    return week;
                }else{
                    return week === weeksInMonth ? index + 5 : week;
                }

            };

        }

);