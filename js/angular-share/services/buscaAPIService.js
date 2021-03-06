/* 
 Created on : Jan 12, 2016, 1:37:18 PM
 Author     : eros
 *
 * https://docs.angularjs.org/api/ng/service/$http
 * http://stackoverflow.com/questions/21915834/angular-http-setting-a-promise-on-the-timeout-config     timeout
 */

angular.module('lisnet').service("buscaAPIService",function ($http){
    
    
    
    this.relatorio = function (comando,json,configLisNet){
//        console.log("buscaUnidades = " + JSON.stringify(configLisNet)   + "  ...........");
//        var params = '?dbname='+configLisNet.defaultDB;
        var url = configLisNet.baseUrl +'/relatorio/' +comando;
        return $http.post(url,json,
            {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }
        );
    };
    
    
    this.relatorioGET = function (comando,usu_st_codigo,rel_dt_consulta,codigo_rastreio,limit,configLisNet){
        var url = configLisNet.baseUrl +'/relatorio/' +comando;
//        console.log('Inside relatorioGET ....comando: '+comando+'    usu_st_codigo: '+usu_st_codigo+'    rel_dt_consulta: '+rel_dt_consulta+'   codigo_rastreio: '+codigo_rastreio);
        switch (comando){
            case 'download':
                url = url+'?dbname='+configLisNet.defaultDB+'&codigo_rastreio='+codigo_rastreio;
                break;
            case 'listar':
                var max = limit?limit:60;
                url = url+'?dbname='+configLisNet.defaultDB+'&usu_st_codigo='+usu_st_codigo+'&rel_dt_consulta='+rel_dt_consulta+'&limit='+max;
                break;
        }
//        console.log('url = '+url);
        return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    
    
    /**
     * 
     * @param {type} configLisNet
     * @returns {unresolved}
     */
     this.buscaClientes = function (configLisNet){
//         console.log('buscaClientes : '+configLisNet.baseUrl);
//        console.log("buscaUnidades = " + JSON.stringify(configLisNet)   + "  ...........");
//        var params = '?dbname=einstein';//+configLisNet.defaultDB;
        var url = configLisNet.baseUrl +'/buscaClientes' ;// + params;
//        console.log('buscaClientes   url  = '+url);
        return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    
    /*
     * 
     * @param {type} login
     * @param {type} senha
     * @param {type} configLisNet
     * @returns {XMLHttpRequest}
     * @deprecated   Use buscaUsuarioAjax
     */
    this.buscaUsuario = function (login, senha , configLisNet) {
//        console.log("Dentro do Sevico  configLisNet = " + JSON.stringify(configLisNet)   + "  ...........");
        login = login.toUpperCase();
        var params = '?login=' + login + '&senha=' + senha + '&dbname='+configLisNet.defaultDB;
//        console.log('params = '+params);
        var xhttp = new XMLHttpRequest();
        var url =  configLisNet.baseUrl +'/buscaUsuario' + params;
//        console.log('buscaUsuario = '+url);
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
        xhttp.setRequestHeader('Content-type', 'application/ecmascript');
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        
        xhttp.send(null);
        return xhttp;
    };
    
    
     this.buscaUsuarioAjax = function (login, senha , configLisNet){
        var params = '?login=' + login + '&senha=' + senha + '&dbname='+configLisNet.defaultDB;
        var url =  configLisNet.baseUrl +'/buscaUsuario' + params;
//                console.log("buscaUsuarioAjax URL = " + url );
        return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    /**
     * 
     * @param {type} login
     * @param {type} perfil
     * @param {type} configLisNet
     * @returns {XMLHttpRequest}
     * @deprecated   Use buscaUsuarioMenuAjax
     */
    this.buscaUsuarioMenu = function (login, perfil,configLisNet){
//        console.log("Dentro do Sevico buscaUsuarioMenu  configLisNet = " + JSON.stringify(configLisNet)   + "  ...........");
        var params = '?login=' + login + '&perfil=' + perfil + '&dbname='+configLisNet.defaultDB;
//        console.log('buscaUsuarioMenu params = '+params);
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", configLisNet.baseUrl +'/buscaUsuarioMenu' + params, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        
        xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
        xhttp.setRequestHeader('Content-type', 'application/ecmascript');
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        
        xhttp.send(null);
        return xhttp;
    };
    /*
     * 
     * @param {type} login
     * @param {type} perfil
     * @param {type} configLisNet
     * @returns {unresolved}
     */
     this.buscaUsuarioMenuAjax = function (login, perfil,configLisNet){
        var params = '?login=' + login + '&perfil=' + perfil + '&dbname='+configLisNet.defaultDB;
        var url =  configLisNet.baseUrl +'/buscaUsuarioMenu' + params;
            return $http({method : 'GET',url : url,
                  headers : {
                      'Content-Type' : 'application/x-www-form-urlencoded',
                      'Access-Control-Allow-Headers': '*',
                      'Access-Control-Allow-Methods':'GET, POST, PUT',
                      'Access-Control-Allow-Origin': '*'
                  }});
      };
      
       /*
     * 
     * @param {type} login
     * @param {type} perfil
     * @param {type} configLisNet
     * @returns {unresolved}
     */
     this.buscaUsuarioMenuJSONAjax = function (login, perfil,configLisNet){
        var params = '?login=' + login + '&perfil=' + perfil + '&dbname='+configLisNet.defaultDB;
        var url =  configLisNet.baseUrl +'/buscaUsuarioMenuJSON' + params;
            return $http({method : 'GET',url : url,
                  headers : {
                      'Content-Type' : 'application/x-www-form-urlencoded',
                      'Access-Control-Allow-Headers': '*',
                      'Access-Control-Allow-Methods':'GET, POST, PUT',
                      'Access-Control-Allow-Origin': '*'
                  }});
      };
    
    /*
     * 
     * @param {type} login
     * @param {type} configLisNet
     * @returns {unresolved}
     */
    this.buscaUnidades = function (login,cli_in_codigo ,configLisNet){
//        console.log("buscaUnidades = " + JSON.stringify(configLisNet)   + "  ...........");
        var params = '?login=' + login + '&dbname='+configLisNet.defaultDB+'&cliente='+cli_in_codigo;
        var url = configLisNet.baseUrl +'/buscaUnidades' + params;
        console.log('buscaUnidades  url construida = '+url);
        return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    /*
     * 
     * @param {type} login
     * @param {type} configLisNet
     * @returns {unresolved}
     */
    this.buscaConvenios = function (login, configLisNet){
//        console.log("buscaUnidades = " + JSON.stringify(configLisNet)   + "  ...........");
        var params = '?login=' + login + '&dbname='+configLisNet.defaultDB;
        var url = configLisNet.baseUrl +'/buscaConvenios' + params;
        return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    /*
     * 
     * @param {type} unidades
     * @param {type} configLisNet
     * @returns {unresolved}
     */
    this.buscaLocais = function (unidades,configLisNet){
        console.log("buscaLocais = " + JSON.stringify(configLisNet)   + "  ...........");
        var params = '?unidades=' + unidades + '&dbname='+configLisNet.defaultDB;
        var url = configLisNet.baseUrl +'/buscaLocais' + params;
        return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    /*
     * 
     * @param {type} args
     * @param {type} configLisNet
     * @returns {unresolved}
     */
    this.buscaRequisicoes = function (args,limit,configLisNet){
//        console.log("buscaRequisicoes = " + JSON.stringify(configLisNet)   + "  ...........");
        var params =  args + '&dbname='+configLisNet.defaultDB+ '&limit='+limit;
        var url = configLisNet.baseUrl +'/buscaRequisicoes' + params;
//                console.log("buscaRequisicoes URL = " + url );
        return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    
     this.buscaStatusRequisicao = function (reqStCodigo,configLisNet){
//        console.log("buscaRequisicoes = " + JSON.stringify(configLisNet)   + "  ...........");
        var url = configLisNet.baseUrl +'/buscaStatusRequisicao' + '?dbname='+configLisNet.defaultDB+"&req_st_codigo="+reqStCodigo;
        return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    /*
     * @deprecated  Use a versao AJAX
     */
    this.buscaTodosAtendimento = function (req_in_codigo, req_st_senha, configLisNet) {
        
        var params = '?chave_1=' + req_in_codigo + '&chave_2=' + req_st_senha + '&dbname=' + configLisNet.defaultDB;
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", configLisNet.baseUrl + '/buscaTodosAtendimentos' + params, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
            xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
            xhttp.setRequestHeader('Content-type', 'application/ecmascript');
            xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        
            xhttp.send(null);
            return xhttp;
        
    };
    
    /**
     * 
     * @param {type} req_in_codigo
     * @param {type} req_st_senha
     * @param {type} configLisNet
     * @returns {unresolved}
     */
    this.buscaTodosAtendimentoAjax = function (req_in_codigo, req_st_senha, configLisNet){
        var params = '?chave_1=' + req_in_codigo + '&chave_2=' + req_st_senha + '&dbname=' + configLisNet.defaultDB;
        var url = configLisNet.baseUrl + '/buscaTodosAtendimentos' + params;
//                console.log("buscaTodosAtendimentoAjax URL = " + url );
        return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    
   /**
    * 
    * @param {type} configLisNet
    * @returns {XMLHttpRequest}
    */
//    this.buscaTimeStamp = function (configLisNet){
//        var params = '?dbname='+configLisNet.defaultDB;
//        var xhttp = new XMLHttpRequest();
//        xhttp.open("GET", configLisNet.baseUrl +'/buscaTimeStamp' + params, true);
//        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//        
//        xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
//        xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
//        xhttp.setRequestHeader('Content-type', 'application/ecmascript');
//        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
//        
//        xhttp.send(null);
//        return xhttp;
//    };
    /**
    * 
    * @param {type} configLisNet
    * @returns {XMLHttpRequest}
    */
    this.buscaTimeStamp = function (configLisNet){
        var params = '?dbname='+configLisNet.defaultDB;
        var url = configLisNet.baseUrl +'/buscaTimeStamp' + params;
         return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    /**
     * 
     * @param {type} url
     * @param {type} configLisNet
     * @returns {XMLHttpRequest}
     */
    this.buscaLaudo = function (url,configLisNet){
        var xhttp = new XMLHttpRequest();
        var params = '?url='+url;
        xhttp.open("GET", configLisNet.baseUrl +'/buscaLaudo' + params, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
        xhttp.setRequestHeader('Content-type', 'application/ecmascript');
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        
        xhttp.send(null);
        return xhttp;
    };
    /**
     * 
     * @param {type} url
     * @param {type} configLisNet
     * @returns {buscaUsuarioService_L8.buscaLaudoPDF.xhttp|XMLHttpRequest}
     */
    this.buscaLaudoPDF = function (url,configLisNet){
        var xhttp = new XMLHttpRequest();
        xhttp.responseType = "arraybuffer";
        var params = '?caminho='+url;
        xhttp.open("GET", configLisNet.baseUrl +'/buscaLaudoPDF' + params, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
        xhttp.setRequestHeader('Content-type', 'application/ecmascript');
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        
        xhttp.send(null);
        return xhttp;
    };
    /**
     * 
     * @param {type} pac_in_codigo
     * @param {type} configLisNet
     * @returns {buscaUsuarioService_L8.atualizaVisualizacao.xhttp|XMLHttpRequest}
     */
    this.atualizaVisualizacao = function (pac_in_codigo,configLisNet){
        var xhttp = new XMLHttpRequest();
        xhttp.responseType = "arraybuffer";
        var params = 'pac_in_codigo=' + pac_in_codigo + '&dbname='+configLisNet.defaultDB;
        xhttp.open("PUT", configLisNet.baseUrl +'/atualizaVisualizacao', true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
        xhttp.setRequestHeader('Content-type', 'application/ecmascript');
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        
        xhttp.send(params);
        return xhttp;
    };
    
    
/**
 * 
 * @param {type} configLisNet
 * @param {type} modStCodigo
 * @returns {unresolved}
 * @deprecated usar buscaEntidadeTelaPadrao
 */
     this.buscaModuloTelaPadrao = function (configLisNet,modStCodigo){
        var params = '?MOD_ST_CODIGO=' + modStCodigo + '&dbname='+configLisNet.defaultDB;
        var url = configLisNet.baseUrl +'/buscaModuloTelaPadrao'+ params;
//        console.log('buscaModuloTelaPadrao : '+url);
        return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    /**
     * 
     * @param {type} configLisNet
     * @param {type} moduloPadrao
     * @param {type} uniStCodigo
     * @param {type} limit
     * @param {type} blFiltro
     * @returns {unresolved}
     */
    this.buscaEntidadeTelaPadrao = function (configLisNet,moduloPadrao,uniStCodigo, limit ,blFiltro){
        var params = '?MOD_ST_CODIGO=' + moduloPadrao.modStCodigo + '&UNI_ST_CODIGO='+uniStCodigo+ '&dbname='+configLisNet.defaultDB;
        if(blFiltro){
            params = params+'&pesquisaTipo='+moduloPadrao.entidade.pesquisaTipo+'&pesquisaCodigo='+moduloPadrao.entidade.pesquisaJSON.campo+'&pesquisaValor='+moduloPadrao.entidade.pesquisaInput+'&limit='+limit;
        }
        var url = configLisNet.baseUrl +'/buscaEntidadeTelaPadrao'+ params+'&limit='+limit;
//        console.log('buscaModuloTelaPadrao : '+url);
        return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    
    this.buscaPaciente = function (configLisNet,pacInCodigo){
        var params = '?PAC_IN_CODIGO=' + pacInCodigo + '&dbname='+configLisNet.defaultDB;
        
        var url = configLisNet.baseUrl +'/buscaPaciente'+ params;
        console.log('buscaPaciente : '+url);
        return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    
    this.buscaEndereco = function (configLisNet,cep){
        
        var urlExterna = 'https://viacep.com.br/ws/'+cep+'/json/';
        var params = '?caminho=' + urlExterna;
        var url = configLisNet.baseUrl +'/buscaEndereco'+ params;
        
        console.log('buscaEndereco : '+cep);
        
        return $http({method : 'GET',url : url,
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }});
    };
    
    
    this.salvaEntidadeTelaPadrao = function (configLisNet,moduloPadrao,uniStCodigo,entidadeJSON){
//        console.log("salvaEntidadeTelaPadrao = " + JSON.stringify(configLisNet)   + "  ...........");
//        var params = '?dbname='+configLisNet.defaultDB;
        var params = '?MOD_ST_CODIGO=' + moduloPadrao.modStCodigo + '&UNI_ST_CODIGO='+uniStCodigo+ '&dbname='+configLisNet.defaultDB;
        var url = configLisNet.baseUrl +'/salvaEntidadeTelaPadrao'+ params;
        
        return $http.put(url,entidadeJSON,
            {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }
        );
    };
    
    this.atualizaUsuario = function (configLisNet,usuarioJSON){

        var params = '?dbname='+configLisNet.defaultDB;
        var url = configLisNet.baseUrl +'/atualizaUsuario'+ params;
        
        return $http.put(url,usuarioJSON,{
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }
        );
    };
    
    this.buscaGrafico = function (tipo,periodo,json,configLisNet){
//        console.log('buscaGrafico : '+JSON.stringify(json));
        var url = configLisNet.baseUrl +'/buscaGrafico/'+tipo+'/' +periodo+'?dbname='+configLisNet.defaultDB;
//        console.log('url : '+url);
        return $http.post(url,json,
            {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods':'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*'
            }
        );
    };
    
    
});


