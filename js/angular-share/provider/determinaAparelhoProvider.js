/* 
 * Here comes the text of your license
 * Each line should be prefixed with  * 
 */


angular.module('lisnet').provider('determinaAparelhoProvider', function () {

    this.$get = function () {
        return {
            isMobile: function (deviceDetector) {
//                console.log('dentro determinaAparelhoProvider ...............................................');
//                console.log(JSON.stringify(deviceDetector,null,2));
                if (deviceDetector) {
                    if (   deviceDetector.device && 
                            ( deviceDetector.isMobileDevice || deviceDetector.isCordova  || deviceDetector.device.android || deviceDetector.device.ipad || deviceDetector.device.iphone || deviceDetector.device.blackberry ||  deviceDetector.device.unknown || 
                          ((deviceDetector.screenHeight <=960 && deviceDetector.screenWidth <= 660) ||  (deviceDetector.screenHeight <= 660 && deviceDetector.screenWidth <= 960)  ))  ) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }

            }
        };
    };

});


