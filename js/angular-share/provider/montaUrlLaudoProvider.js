/* 
 Created on : Jan 12, 2016, 1:37:18 PM
 Author     : eros
 */


angular.module('lisnet').provider('montaUrlLaudoProvider', function () {


        this.$get = function (base64){
          return {
            monta: function (req_in_codigo,  sysdate, cliente) {
//                console.log("CLI_IN_CODIGO: "+cliente.CLI_IN_CODIGO);
                var cincoPrimeirosInvertido = parseInt(base64.reverse(req_in_codigo.substring(0, 5)));
                var cincoUltimos = parseInt(req_in_codigo.substring(5, req_in_codigo.length));
                var senha = parseInt((cincoPrimeirosInvertido + cincoUltimos) * (cliente.CLI_IN_CODIGO / 555));
                var urlLaudo,urlLaudoPDF;
                var rightNow = new Date();
//                urlLaudo = "http://" + cliente.CLI_ST_CODIGO + '.lisnet.com.br/cgi/liscgin2.exe?url=' + base64.encode(req_in_codigo + "|" + senha + "|" + sysdate+"|"+req_in_codigo+"_1471030809");
//                urlLaudo = "http://" + cliente.CLI_ST_CODIGO + '.lisnet.com.br/cgi/liscgin2.exe?url=' + base64.encode(req_in_codigo + "|" + senha + "||" + sysdate+"|"+req_in_codigo+"_"+rightNow.getTime());  //+"|"+req_in_codigo+"_"+rightNow.getTime());
               urlLaudo = "http://" + cliente.CLI_ST_CODIGO + '.lisnet.com.br/laudoc/cgi/liscgi.exe?url=' + base64.encode(req_in_codigo + "|" + senha + "||" + sysdate+"|"+req_in_codigo+"_"+rightNow.getTime());  //+"|"+req_in_codigo+"_"+rightNow.getTime());
               
                if(cliente.CLI_CH_CERTIFICADOGESLAB == 'S'){
                    //http://cliente.lisnet.com.br/pdf1/oi/default.aspx?url='.base64_encode("http://cliente.lisnet.com.br/laudoc/cgi/liscgi.exe?url=".base64_encode($_GET['req'].'|'.base64_decode(base64_decode($_GET['pass'])).'||'.$resultD["DATAHORA_AGORA"].'|'.$_GET['req'].'_'.$tempo)."")."&id=".$_GET['req']."_".$tempo
                //http://cejam.lisnet.com.br/pdf1/oi/default.aspx?url=aHR0cDovL2NlamFtLmxpc25ldC5jb20uYnIvbGF1ZG9jL2NnaS9saXNjZ2kuZXhlP3VybD1NVFl3TURZeE9EUXdNWHd4TkRRME9ETjhmREV5THpBNEx6SXdNVFl0TVRZNk1qYzZNREo4TVRZd01EWXhPRFF3TVY4eE5EY3hNRE13T0RBNQ==&id=1600618401_1471030809
                //http://einstein.lisnet.com.br/pdf1/oi/default.aspx?url=aHR0cDovL2VpbnN0ZWluLmxpc25ldC5jb20uYnIvY2dpL2xpc2NnaW4yLmV4ZT91cmw9TVRZd01EUXdPRGswTTN3NU1ESXpOM3d4TlM4d09DOHlNREUyTFRFeU9qVTNPakU1&id=1600408943
                    
                    urlLaudoPDF = "http://" + cliente.CLI_ST_CODIGO + '.lisnet.com.br/pdf1/oi/default.aspx?url=' + base64.encode(urlLaudo) + '&id=' + req_in_codigo+'_'+rightNow.getTime()+'#view=fith';
//                    console.log('demo http://einstein.lisnet.com.br/pdf1/oi/default.aspx?url='+base64.decode('aHR0cDovL2VpbnN0ZWluLmxpc25ldC5jb20uYnIvcGRmMS9saXNjZ2kvbGlzY2dpLmV4ZT91cmw9TVRBek1qRTBOemcxT1h3eE1UQTNPREY4ZkRJeEx6QTJMekl3TVRZdE1UYzZNams2TXpWOE1UQXpNakUwTnpnMU9RPT0='+'')+'&id=1032147859#view=fith');
//                    console.log('minha ' + urlLaudoPDF);
//                    console.log('URL do pdf certificado .....');
//                    urlLaudoPDF = "http://" + cliente.CLI_ST_CODIGO + '.lisnet.com.br/pdf1/oi/default.aspx?url=' + base64.encode(urlLaudo) + '&id=' + req_in_codigo+'#view=fith';
//                    urlLaudoPDF = null;
                }else{
                    urlLaudoPDF = "http://" + cliente.CLI_ST_CODIGO + '.lisnet.com.br/pdf1/lis/default.aspx?url=' + base64.encode(urlLaudo) + '&id=' + req_in_codigo+'#view=fith';
                }
//                console.log(urlLaudoPDF);
                return {urlLaudo: urlLaudo, urlLaudoPDF: urlLaudoPDF};
            },
            senhaDeComparacao: function (req_in_codigo) {
                var cincoPrimeirosInvertido = parseInt(base64.reverse(req_in_codigo.substring(0, 5)));
                var cincoUltimos = parseInt(req_in_codigo.substring(5, req_in_codigo.length));
                return cincoPrimeirosInvertido + '' + cincoUltimos;
            },
            senhaDeComparacaoNova: function (req_in_codigo,CLI_IN_CODIGO) {
                var cincoPrimeirosInvertido = parseInt(base64.reverse(req_in_codigo.substring(0, 5)));
                var cincoUltimos = parseInt(req_in_codigo.substring(5, req_in_codigo.length));
                var senha = parseInt((cincoPrimeirosInvertido + cincoUltimos) * (CLI_IN_CODIGO / 555));
//                console.log('senha nova : '+senha);
                return senha;
            },
            encontraClientePorNome : function (clientes,name){
                for(var i = 0 ; i < clientes.length ; i ++) {
                    var cli = clientes[i];
                    
                    if(cli.CLI_ST_CODIGO.toUpperCase() === name.toUpperCase()){
//                        console.log(cli);
                        return cli;
                        break;
                    }
//                    else{
//                        console.log('cli.CLI_ST_CODIGO.toUpperCase() : '+cli.CLI_ST_CODIGO.toUpperCase() +'   name.toUpperCase(): ' + name.toUpperCase());
//                    }
                }
            }
          };  
        };

});


