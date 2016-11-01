/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : Nov 1, 2016, 4:47:06 PM
 Author     : eros
https://egghead.io/lessons/angularjs-sharing-data-between-controllers

 */

angular.module('lisnet')
        .service('shareuser', function shareUser(){
    var shareUser = this;
    shareUser.userDTO = {status: 'out', type:'shared',perfilId: 2, dtCriacao: new Date(), ultimaTela: 'login',notificationTimer:10000};
});

