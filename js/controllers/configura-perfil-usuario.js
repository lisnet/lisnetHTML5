/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : Feb 13, 2017, 3:55:52 PM
 Author     : eros
 */


function configuraPerfilUsuario($scope, sairDoSistemaService, notificacaoProvider, buscaAPIService, $stateParams, $localStorage, $timeout, $filter,DTOptionsBuilder,helperService) {
    console.log('rodando configuraPerfilUsuario');
    
    //    var self = this;
     var model = this;
    $scope.userDTO = sairDoSistemaService.validarLogin();
    if (!$scope.userDTO.configuraPerfil) {
        var _u  = $scope.userDTO;
        var _usuario = {USU_ST_CODIGO:_u.USU_ST_CODIGO,USU_ST_NOME:_u.USU_ST_NOME,USU_ST_SENHA:_u.USU_ST_SENHA,USU_ST_SENHACONFIRMAR:_u.USU_ST_SENHA,USU_ST_EMAIL:_u.USU_ST_EMAIL};
        $scope.userDTO.configuraPerfil = {
            usuarioDB:_usuario,
                 usuario:helperService.clonadorDeObj(_usuario),editar:true,isValid:false,
             lengthMinNome: 4, lengthMaxNome: 70,
            lengthMinSenha: 4, lengthMaxSenha: 20,
            lengthMinEmail:15,lengthMaxEmail:100};
    }
    $scope.paramsStateConfig = $stateParams;
    $scope.btnEditar = true;
    
    $scope.editar = function (){
        if($scope.userDTO.configuraPerfil.editar){
            $scope.userDTO.configuraPerfil.editar = false;
            $timeout(function (){$scope.inputUSU_ST_NOMEFocus = true;},500);
        }else{
            $scope.userDTO.configuraPerfil.editar = true;
        }
        console.log('$scope.userDTO.configuraPerfil.editar = '+$scope.userDTO.configuraPerfil.editar);
    };
    
     $scope.estaAlterado = function (){
        return !helperService.comparaObjetos($scope.userDTO.configuraPerfil.usuarioDB,$scope.userDTO.configuraPerfil.usuario);
    };
     $scope.validaCampos = function (){
        return validar();
    };
    
    
    function validar() {
        var _perfil = $scope.userDTO.configuraPerfil;
        var _nome = $scope.userDTO.configuraPerfil.usuario.USU_ST_NOME;
        var _senha = $scope.userDTO.configuraPerfil.usuario.USU_ST_SENHA;
        var _senhaConfirma = $scope.userDTO.configuraPerfil.usuario.USU_ST_SENHACONFIRMAR;
        var _email = $scope.userDTO.configuraPerfil.usuario.USU_ST_EMAIL;

        if ((_nome && _nome.length >= _perfil.lengthMinNome && _nome.length <= _perfil.lengthMaxNome)
                && (_senha && _senha.length >= _perfil.lengthMinSenha && _senha.length <= _perfil.lengthMaxSenha && _senhaConfirma && _senha === _senhaConfirma)
                && (_email && _email.length >= _perfil.lengthMinEmail && _email.length <= _perfil.lengthMaxEmail)) {
            return true;
        }
        return false;
    }
    
    $scope.salvarAlteracoes = function (){
        if(validar()){
            console.log('$scope.userDTO.configuraPerfil.usuario: '+JSON.stringify($scope.userDTO.configuraPerfil.usuario,null,2));
            
                    try {
                       buscaAPIService.atualizaUsuario($scope.userDTO.configLisNet, $scope.userDTO.configuraPerfil.usuario)
                               .then(function   sucesso(response) {
                                   var _response = response.data;
                                   var _responseType = typeof _response;
                                   if (_response && _responseType === 'string' && _response.indexOf('ORA-') !== -1) {
                                       notificacaoProvider.sweetError('Erro', _response);
                                   } else {
                                       atualizaView();
                                       notificacaoProvider.sweetSuccess('Perfil Atualizado','Parabéns , perfil atualizado.');
                                       console.log(response.data);
                                   }

                               }, function erro(response) {
                                   console.log(response.statusText);
                                   notificacaoProvider.sweetError('Erro', response.statusText);
                               });
                   } catch (error) {
                       console.log;
                       (error);
                       notificacaoProvider.sweetError('Erro', error);
                   }
               } else {
                   notificacaoProvider.sweetError('Erro', 'os campos nao estao validos ...');
               }
    };
    
    function atualizaView(){
            $scope.userDTO.configuraPerfil.usuarioDB = helperService.clonadorDeObj($scope.userDTO.configuraPerfil.usuario);
            $scope.userDTO.USU_ST_NOME=  $scope.userDTO.configuraPerfil.usuario.USU_ST_NOME;
            $scope.userDTO.USU_ST_SENHA=  $scope.userDTO.configuraPerfil.usuario.USU_ST_SENHA;
            $scope.userDTO.USU_ST_EMAIL=  $scope.userDTO.configuraPerfil.usuario.USU_ST_EMAIL;
            $scope.userDTO.configuraPerfil.editar = true;
    }
    
    
    model.submit = function (isValid) {
        console.log("h");
        if (isValid) {
//            $scope.userDTO.configuraPerfil.isValid =isValid;
            model.message = "Submitted " ;
        } else {
            model.message = "There are still invalid fields below";
        }
    };
    
    $scope.validaForm =function (isValid){
        console.log('validaForm : '+isValid);
        $scope.userDTO.configuraPerfil.isValid =isValid;
    };
    
    
    $scope.reverter = function (){
        $scope.userDTO.configuraPerfil.usuario = helperService.clonadorDeObj($scope.userDTO.configuraPerfil.usuarioDB);
        $scope.userDTO.configuraPerfil.editar = true;
    };
    
}


angular.module('lisnet').
        controller('configuraPerfilUsuario',configuraPerfilUsuario);
