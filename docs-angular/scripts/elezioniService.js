'use strict';

/* ElezioniService

    Gestione dei dati elezioni 

 */

angular.module('myApp.services')
   
  
.factory('ElezioniService',           ['ENV', '$http', '$rootScope', '$log', '$localStorage',
                            function ( ENV,   $http,   $rootScope,   $log,   $localStorage) {
  return {


    getConfig: function() {
         $log.debug('ElezioniService: getData');
         var fullApiEndpoint = $rootScope.base_url + '/' + ENV.apiElezioni + '/getConfig'; 
         $log.debug('ElezioniService: api : ' + fullApiEndpoint );
         return $http({ url: fullApiEndpoint,  method: "GET" });
    }

 
  }

}]);

