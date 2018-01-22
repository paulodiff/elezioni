angular.module('myApp.controllers')

.controller('homeCtrl', 
           ['$scope', 'dialogs', '$rootScope', 'AuthService', 'Session', '$state','ENV', '$log', 'ElezioniService',
    function($scope,   dialogs,   $rootScope,   AuthService,   Session,   $state,  ENV ,  $log, ElezioniService ) {

  $scope.btnCheck = false;
  $scope.n = {};

  console.log('homeCtrl:getConfig');

  $scope.goToInviaIstanza = function(){
      console.log('state.go...protocollo');
      $state.go('protocollo');
  }

  function initData(){
    $log.info('homeCtrl : getConfig');
        ElezioniService.getConfig().then(function(data) {
            $log.info('queueMgrCtrl : getConfig queue');
            $log.info(data);
            $scope.n = data;
          })
          .catch(function(error) {
            $log.info('homeCtrl : getConfig ERROR');
            $log.info(error);
        });
  }

  initData();

  }]);

  