/* 
 Created on : Dec 14, 2016, 10:15:45 AM
 Author     : eros
 */



function sobre($scope, sairDoSistemaService) {

    $scope.userDTO = sairDoSistemaService.validarLogin();
    $scope.varSimple = "test Thiago";
    $scope.arraySimple = ['test array', 'second test Array', 2, 3, new Date()];
    $scope.simpleJSON = {firstVar: 'Thiago', secondVar: 'Eros', simpleDate: new Date()};
    $scope.typeOfArray = typeof $scope.arraySimple;
    var teste = "teste thiago"
            + "porto";
    $scope.instgeslab =
            "A GesLab foi fundada com o objetivo de fornecer ao mercado soluções corporativas de consultoria e sistema de informação.Baseada em um modelo organizacional estratégico e uma política de gerenciamento participativo."
            + " Nossa meta é atender às necessidades das empresas que estão cada vez mais investindo em tecnologia e capacitação de seus profissionais, para acompanhar as mudanças da era digital."
            + "Somos uma empresa que tem a abrangência nacional e internacional."
            + "Nossa empresa é focada no desenvolvimento de projetos inovadores nas áreas de Sistemas e Tecnologia da Informação."
            + " A atuação de nossa empresa ultrapassa o Território Nacional, almejando o mercado internacional.";

    $scope.insttitulo = "GESLAB";
    /*Simple JSON exemplo aplicado Thiago Porto*/
    $scope.instdata = {firstage: '1994', secondage:'1999'};
                           
    $scope.titulolisnet="LISNET";    
    $scope.lisnetinst =
            "Lisnet sistema de informação de gestão e serviços ao diagnóstico. Sendo, um poderoso LIS (Laboratory Information System), desenvolvido para atender todas as necessidades dos laboratórios de Análises Clínicas nos mais variados perfis e abrangência." 
           +"A riqueza de funcionalidades e a solidez de seus conceitos foram características fundamentais para o sucesso da informatização de diversos serviços públicos e privados, hospitalares e ambulatoriais, assim como laboratórios de apoio, redes de laboratórios, e bancos de sangue."
           +"A característica principal do LISNet é a mobilidade, com seu funcionamento em nuvens (Cloud-Computing), o acesso ao sistema é através da internet, ou seja o cliente poderá instalar o aplicativo em seu computador portátil ou em seu desktop em casa ou na clínica e ter acesso ao sistema com todas as suas funcionalidades 24 horas por dia mesmo fora do laboratório, bastando ter conexão com a internet, sendo ela 3G, Wi-Fi ou banda larga.";
    /*Simple Array exemplo aplicado Thiago Porto*/
    $scope.lisnetano = ['1997', '2002','2005'];
                           
                           
                           
    /**
     * 
     * @param {type} position
     * @returns {Number | String | Date}
     */
    $scope.buscaPosicaoArray = function (position){
        return $scope.arraySimple[position];
    };
    
}



angular.module('lisnet')
        .controller('sobre',sobre);
