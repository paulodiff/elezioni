'use strict';

/* ElezioniService

    Gestione dei dati elezioni 

 */

angular.module('myApp.services')
   
  
.factory('ElezioniService',           ['ENV', '$http', '$rootScope', '$log', '$localStorage',
                            function ( ENV,   $http,   $rootScope,   $log,   $localStorage) {
  return {


    getConfig: function() {
         $log.info('ElezioniService: getData');
         var fullApiEndpoint = ENV.apiEndpoint + '/' + ENV.apiElezioni + '/getConfig'; 
         $log.info('ElezioniService: api : ' + fullApiEndpoint );
         return $http({ url: fullApiEndpoint,  method: "GET" });
    }

 
  }

}]);

