angular.module('myApp.controllers')

  .controller('queueMgrCtrl', 

           ['$scope', '$http', 'dialogs',  '$rootScope', 'AuthService', 'QueueService', 'SseService', '$state','ENV', '$log','usSpinnerService',
    function($scope,   $http,  dialogs,     $rootScope,   AuthService,   QueueService, SseService, $state,  ENV ,  $log, usSpinnerService ) {

    console.log('StartUP!');
    $scope.channelId = SseService.getChannelId();
    $log.info('DEBUG############### queueMgrCtrl: startUp!');
    
    $scope.logList = [{"msg":{"envId":"test","operationId":"recuperaVotantiReferendum","actionId":"showXML","url":"http://10.10.6.63:9989/elezioni/wscall/test/recuperaVotantiReferendum/showXML","action":"showXML","statusCode":"200","response":"<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:elet=\"http://it.mininterno.sie/elettorale\">\r\n    <soapenv:Header/>\r\n    <soapenv:Body>\r\n    <elet:ParametriRichiestaRecuperaVotanti>\r\n        <elet:Utente>\r\n            <elet:UserID>cm4ucmltaW5pLndlYnNlcnZpY2UuZ2lhY29taW5p</elet:UserID>\r\n            <elet:Password>UklNSU5JLnJlZjEyMjAxNg&#x3D;&#x3D;</elet:Password>\r\n        </elet:Utente> \r\n        <elet:Evento>\r\n            <elet:TipoElezione>7</elet:TipoElezione>\r\n            <elet:DataElezione>3016-12-04</elet:DataElezione>\r\n        </elet:Evento>\r\n        <elet:DataOraInizioComunicazione>3016-12-04T12:00:00</elet:DataOraInizioComunicazione>\r\n        <elet:CodiceProvincia>101</elet:CodiceProvincia>\r\n        <elet:CodiceComune>140</elet:CodiceComune>\r\n    </elet:ParametriRichiestaRecuperaVotanti>\r\n</soapenv:Body>\r\n</soapenv:Envelope>","CodiceEsito":"1000","DescrizioneEsito":"showXML Eseguito con successo","dataDocumento":"2018-01-15T12:50:00.584Z"},"channelId":"broadcast","rnd":0.4427302582248185,"sseId":"Elezioni.js"}];

    $scope.user = {};

    $scope.test1 = function(){
        $log.info('queueMgrCtrl : queue1');
        $log.debug('queueMgrCtrl : queue1');
    };

    $scope.test2 = function(){
        $log.info('queueMgrCtrl : queue2');
        $log.debug('queueMgrCtrl : queue2');
    };

    $scope.queue = function(){
        $log.info('queueMgrCtrl : queue');
        QueueService.getData().then(function() {
            $log.info('queueMgrCtrl : queue queue');
          })
          .catch(function(error) {
            $log.info('queueMgrCtrl : queue ERROR');
            $log.info(error);
        });
    };

    $scope.checkSse = function() {
        $log.info('queueMgrCtrl: checkSse');
        $log.info(SseService.getChannelId());
    };

    $scope.testSse = function() {
        $scope.maxProgressBar = 1000;
        $scope.currentProgressBar = 0;
        $log.info('queueMgrCtrl: uploadCsv');
        var fullApiEndpoint = $rootScope.base_url + '/' + ENV.apiElezioni + '/testSse/' + SseService.getChannelId(); 
        $log.info('queueMgrCtrl: api : ' + fullApiEndpoint );

        return $http({ 
            url: fullApiEndpoint, 
            method: "GET"
          })
            .then(function (res) {
                $log.info('sid24pCtrl : setting data');
                $log.info(res.data);
                // $scope.user = res.data;
            })
            .catch(function(response) {
                console.log(response);
            });
    };

    $scope.broadcastSse = function() {
        $scope.maxProgressBar = 1000;
        $scope.currentProgressBar = 0;
        $log.info('queueMgrCtrl: broadcast');
        var fullApiEndpoint = $rootScope.base_url + '/' + ENV.apiElezioni + '/broadcastSse/' + SseService.getChannelId(); 
        $log.info('queueMgrCtrl: api : ' + fullApiEndpoint );

        return $http({ 
            url: fullApiEndpoint, 
            method: "GET"
          })
            .then(function (res) {
                $log.info('queueMgrCtrl : setting data');
                $log.info(res.data);
                // $scope.user = res.data;
            })
            .catch(function(response) {
                console.log(response);
            });
    };


    $scope.tweets = SseService.getMessages(function(response) {
        $log.info('queueMgrCtrl: tweets', response);
        var tweets = JSON.parse(response.data);
        $log.info(tweets);
        $log.info('queueMgrCtrl log msg :',tweets.msg.itemN,tweets.msg.txt);
        $scope.$apply( function() {
            $scope.logList.push(tweets);
        });

        /*
        $scope.$apply( function() {
            $scope.my_progressBarValue = tweets.msg.itemN;
            if ( tweets.msg.txt ) $scope.my_progressText = tweets.msg.txt;
    
        });
        */

        // $scope.tweets = tweets;
    });



/*
    $scope.getProfile = function() {

        $log.info('profileMgrCtrl: getProfile');
        usSpinnerService.spin('spinner-1');
        
        ProfileService.getProfile().then(function (res) {
            $log.info('profileMgrCtrl : setting data');
            $log.info(res.data);
            $scope.user = res.data;
            $scope.user.appVersion = ENV.appVersion;
            usSpinnerService.stop('spinner-1');
         })
        .catch(function(response) {
            usSpinnerService.stop('spinner-1');
            console.log(response);
            var dlg = dialogs.error(response.data.title, response.data.message, {});
					  dlg.result.then(function(btn){
                        $state.go('login');
						$scope.confirmed = 'You confirmed "Yes."';
					},function(btn){
                        $state.go('login');
						$scope.confirmed = 'You confirmed "No."';
					});
       
        });

    };


    $scope.updateProfile = function() {
        $log.info('profileMgrCtrl: updateProfile');
        var fullApiEndpoint = $rootScope.base_url + '/' + ENV.apiProfile;
        $log.info('profileMgrCtrl: api : ' + fullApiEndpoint );
        $http.put(fullApiEndpoint, $scope.user)
            .then(function (res) {
                dialogs.notify('ok','Profile has been updated');
                $log.info(res);
                // $scope.user = res.data.user;
         }).catch(function(response) {
                    var dlg = dialogs.confirm(response.data.message, response.status);
					dlg.result.then(function(btn){
						$scope.confirmed = 'You confirmed "Yes."';
					},function(btn){
						$scope.confirmed = 'You confirmed "No."';
					});
       
        });
   
    };

    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          dialogs.notify('You have successfully linked a ' + provider + ' account');
          $scope.getProfile();
        })
        .catch(function(response) {
          dialogs.error(response.data.message, response.status);
        });
    };

    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          dialogs.notify('You have unlinked a ' + provider + ' account');
          $scope.getProfile();
        })
        .catch(function(response) {
          dialogs.error(response.data ? response.data.message : 'Could not unlink ' + provider + ' account', response.status);
        });
    };

    $scope.getProfile();

    */

  }]);


 


