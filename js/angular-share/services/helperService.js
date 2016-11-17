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

        }

);