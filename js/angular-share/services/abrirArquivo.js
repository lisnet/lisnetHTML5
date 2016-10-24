/* 
 Created on : Jan 12, 2016, 1:37:18 PM
 Author     : eros
 */

angular.module('lisnet').service("abrirArquivoService", function () {

    this.fileOpener = function (filePath, fileMIMEType) {
        cordova.plugins.fileOpener2.open(
                filePath, //'/sdcard/Download/starwars.pdf', // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Download/starwars.pdf
                fileMIMEType, //'application/pdf', 
                {
                    error: function (e) {
                        console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                    },
                    success: function () {
                        console.log('file opened successfully');
                    }
                }
        );
    };

});

