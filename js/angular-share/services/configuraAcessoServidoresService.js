
/* 
 Created on : Oct 26, 2016, 10:59:13 AM
 Author     : eros
 */


angular.module('lisnet')
        .service('configuraAcessoServidoresService', function ($location,$browser){
    
    this.detertinaAparelho = function (userDTO){
        
    };
    this.configuraLinksAcesso = function (userDTO){
            console.log("$location.absUrl() = " + $location.absUrl()
            + "\n $location.url() = " + $location.url()
            + "\n $location.protocol() = " + $location.protocol()
            + "\n $location.host() = " + $location.host()
            + "\n location.host = " + location.host
            + "\n $location.port() = " + $location.port()
            + "\n $location.path() = " + $location.path() 
            + "\n $location.hash() = " + $location.hash());
            var _url = $location.protocol() + '://' + location.host + '/lisnet';
            console.log('_url = '+_url);
            
            
    };
    
});


