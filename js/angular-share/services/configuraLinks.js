
/* 
 Created on : Oct 26, 2016, 10:59:13 AM
 Author     : eros
 */


angular.module('lisnet')
        .service('configuraLinks', function ($location, $browser, configLisNet,$localStorage) {

            this.detertinaAparelho = function (userDTO) {

            };
    this.constroeUserDTONovo = function (){
      return {status: 'out', perfilId: 2, dtCriacao: new Date(), ultimaTela: 'login',notificationTimer:10000,hotPages:[]};  
    };
            this.configuraLinksAcesso = function (userDTO) {
                var intDbLength = 4;
                
//         console.log('urlFinal =  '+urlFinal);
//            console.log("$location.absUrl() = " + $location.absUrl()
//            + "\n $location.url() = " + $location.url()
//            + "\n $location.protocol() = " + $location.protocol()
//            + "\n $location.host() = " + $location.host()
//            + "\n location.host = " + location.host
//            + "\n $location.port() = " + $location.port()
//            + "\n $location.path() = " + $location.path() 
//            + "\n $location.hash() = " + $location.hash());
//            var _url = $location.protocol() + '://' + location.host + '/lisnet';
//            console.log('_url = '+_url);
//        var u = 'http://einstein.lisnet.com.br/nodehomolog/lisnetHTML5/#/login';
//        var u = 'http://localhost:8080/lisnetHTML5/#/login';
//        console.log(split);
//        console.log(urlFinal);
//        split.pop();

                if (userDTO ) {

                            userDTO.configLisNet = configLisNet;

                            var locationHostSplit = $location.host().split(".");
                            var u = $location.absUrl();
                            var split = u.split("/");
                            split.splice(split.length - 3, 3);
                            var urlFinal = '';
                            for (var i = 0; i < split.length; i++) {
                                urlFinal = urlFinal + split[i] + '/';
                            }
                            urlFinal = urlFinal + 'lisnet';
                            console.log(urlFinal);
                            userDTO.configLisNet.baseUrl = urlFinal;
        //                userDTO.configLisNet.defaultDB = locationHostSplit[0].toLowerCase();
        //                console.log(_param1DBName);
                            if (locationHostSplit[0] && locationHostSplit[0] !== 'localhost' && locationHostSplit[0] !== '192' && locationHostSplit[0] !== '127' && locationHostSplit[0] !== 'developer' ) {
                                console.log('online ...... locationHostSplit[0].toLowerCase() =  '+locationHostSplit[0].toLowerCase());
                                userDTO.configLisNet.defaultDB = locationHostSplit[0].toLowerCase();
                                //TODO make sure this is going to be de defualt URL
                                userDTO.configLisNet.baseUrl = 'http://einstein.lisnet.com.br/nodehomolog/lisnet';
                            } else if (locationHostSplit[0] && locationHostSplit[0] === 'localhost' || locationHostSplit[0] === '192' || locationHostSplit[0] === '127' || locationHostSplit[0] === 'developer') {
                                console.log('localhost ......');
        //                    userDTO.configLisNet.defaultDB = locationHostSplit[0].toLowerCase();
                                userDTO.configLisNet.baseUrl = $location.protocol()+'://'+location.host+'/lisnet';
//                                console.log('userDTO.configLisNet.baseUrl = '+userDTO.configLisNet.baseUrl);
                            } else if ($location.protocol() === 'file') {
                                console.log('cordova .......');
                                userDTO.configLisNet.baseUrl = urlFinal;
                                var ___url = 'http://einstein.lisnet.com.br/nodehomolog/lisnet';
                                userDTO.configLisNet.baseUrl = ___url;
                                userDTO.configLisNet.defaultDB = 'einstein';
                            }


                } else {
                    console.log('jah foi configurado ..... angular.isDefined = .'+angular.isDefined(userDTO));
                    console.log('jah foi configurado ..... angular.isDefined  userDTO.configLisNet = .'+angular.isDefined(userDTO.configLisNet));
                }
                var _param1DBName = $location.search()['dbname'];
                if (_param1DBName && _param1DBName.length >= intDbLength) {
//                    userDTO.configLisNet.defaultDB = _param1DBName.toLowerCase();
                    userDTO.configLisNet.defaultDB = _param1DBName.toLowerCase();
//                    $localStorage.userDTO = userDTO;
                }
                $localStorage.userDTO = userDTO;

//                userDTO.configLisNet.baseUrl = 'http://localhost:8080/lisnet';

            };

        });


