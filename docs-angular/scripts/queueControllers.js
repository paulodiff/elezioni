angular.module('myApp.controllers')

  .controller('queueMgrCtrl', 

           ['$scope', '$http', 'dialogs',  '$rootScope', 'AuthService', 'SseService', '$state','ENV', '$log','AlertService',
    function($scope,   $http,  dialogs,     $rootScope,   AuthService,   SseService, $state,  ENV ,  $log, AlertService ) {

    console.log('StartUP!');
    $scope.channelId = SseService.getChannelId();
    $log.info('DEBUG############### queueMgrCtrl: startUp!');
    
    $scope.logList = [{"msg":{"batchId":"start","envId":"start","progressValue":"0","progressMax":0,"operationId":"start","actionId":"start","url":"","action":"start","statusCode":"000","response":"start","CodiceEsito":"000","DescrizioneEsito":"start","dataDocumento":"2018-01-17T09:39:52.796Z"},"channelId":"broadcast","rnd":0.6527218158505255,"sseId":"Elezioni.js"}];


    //http://brianhann.com/create-a-modal-row-editor-for-ui-grid-in-minutes/
 
    $scope.openAddress = function (address) {
        console.log(address);
    };


    $scope.gridOptions = {};

    $scope.someProp = 'abc',

    $scope.showMe = function(data){
        AlertService.createDialog('templates/detailInfoDialogForm.html','infoCustomDialogCtrl',data)
        .then(function(dialogData){
            console.log(dialogData);
            console.log('Adding data ....');

            var n = $scope.gridOptions.data.length + 1;
            console.log(dialogData);
            console.log('Saving ..... ');
        });
    };


    $scope.gridOptions = {
      enableSorting: true,
      enableFiltering: true,
      enableGridMenu: true,
      enableRowSelection: true,
      enableSelectAll: true,
      showGridFooter:true,

  
      columnDefs: [
        // { field: 'id', name: '', cellTemplate: 'templates/uigrid-edit-button.html', width: 34 },
        { name: 'batchId', field: 'msg.batchId', width: '5%', visible: true, enableCellEdit: false },
        { name: 'operationId', field: 'msg.operationId', width: '20%', visible: true, enableCellEdit: false },
        { name: 'actionId', field: 'msg.actionId', width: '7%', visible: true, enableCellEdit: false },
        // { name: 'action', field: 'msg.action', width: '7%', visible: true, enableCellEdit: false },
        { name: 'sCode', field: 'msg.statusCode', width: '5%', visible: true, enableCellEdit: false },
        { name: 'p', field: 'msg.progressValue', width: '5%', visible: true, enableCellEdit: false },
        { name: 'max', field: 'msg.progressMax', width: '5%', visible: true, enableCellEdit: false },
        { name: 'codEsito', field: 'msg.CodiceEsito', width: '5%', visible: true, enableCellEdit: false },
        { name: 'DescrizioneEsito', field: 'msg.DescrizioneEsito', width: '20%', visible: true, enableCellEdit: false },
        { name: 'DataOra', field: 'msg.dataDocumento', width: '25%', visible: true, enableCellEdit: false },
        // { name: 'valore', field: 'valore', width: '50%', visible: true, enableCellEdit: false },
        { name: 'zoom', width: '1%',
            cellTemplate: '<button type="button" ng-click="grid.appScope.showMe(row.entity)"><i class="fa fa-edit"></i></button>' }
      ],
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [5, 5, 5, 5]},
      exporterPdfTableHeaderStyle: {fontSize: 8, bold: true, italics: true, color: 'black'},
      exporterPdfHeader: function ( currentPage, pageCount ) {
        return { text: 'Stampa elenco ...' + 'Anagrafica', style: 'headerStyle' };
      },
      exporterPdfFooter: function ( currentPage, pageCount ) {
        return { text: currentPage.toString() + ' of ' + pageCount.toString() + ' anagrafica ' + new Date().toDateString() , style: 'footerStyle' };
      },
      exporterPdfCustomFormatter: function ( docDefinition ) {
        docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
        docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
        return docDefinition;
      }
    };
  
    $scope.gridOptions.multiSelect = true;


    $scope.saveRow = function( rowEntity ) {
        console.log('saveRow....');
        // create a fake promise - normally you'd use the promise returned by $http or $resource
        var promise = $q.defer();
        $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );
        promise.resolve();
        /*
        PostaService.updatePosta(rowEntity)
        .then(function (res) {
            $log.debug(res);
            promise.resolve();
        })
        .catch(function(response) {
            promise.reject();
            $log.debug(response);
        });
        */
    };
    
    $scope.gridOptions.onRegisterApi = function( gridApi ) {
      $scope.gridApi = gridApi;
    };



    // #### ASSEGNAMENTO DATI
    $scope.gridOptions.data = $scope.logList;

    $scope.user = {};
    $scope.progress = {};
    $scope.progress.Value = 1;
    $scope.progress.Max = 100;
    $scope.progress.ValuePercent = 1;

    $scope.test1 = function(p){
        $log.info(p);
        $log.info('queueMgrCtrl : test1info');
        $log.debug('queueMgrCtrl : test1debug');
    };

    $scope.cleanData = function(){
        $log.info('queueMgrCtrl : cleanData');
        $scope.gridOptions.data = [{}];
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
        // $scope.progress.Value = $scope.progress.Value + 10;
        $scope.progress.ValuePercent = $scope.progress.ValuePercent + 10;
        $scope.progress.Max = 100;

        AlertService.createDialog('templates/detailInfoDialogForm.html','infoCustomDialogCtrl',{})
            .then(function(dialogData){
                console.log(dialogData);
                console.log('Adding data ....');

                var n = $scope.gridOptions.data.length + 1;
                console.log(dialogData);
                console.log('Saving ..... ');
            });
      
    };

    $scope.testSse = function() {

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
        $log.info(tweets.msg.progressMax);
        $log.info(tweets.msg.progressValue);
        $log.info('queueMgrCtrl log msg :',tweets.msg.itemN,tweets.msg.txt);
        $scope.$apply( function() {
            // $scope.logList.unshift(tweets);
            $scope.logList.push(tweets);
            // $scope.progress.Value = tweets.msg.progressValue;
            $scope.progress.Max = 100;
            $scope.progress.ValuePercent = (parseInt(tweets.msg.progressValue) + 1) / tweets.msg.progressMax * 100;
            console.log($scope.progress.ValuePercent);
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

  }])

  // ######################################################################## DialogCtrl

.controller('infoCustomDialogCtrl',
// ['$scope','$modalInstance', 'data',
function($location, $rootScope, $scope , $uibModalInstance, data){

    console.log('infoCustomDialogCtrl ....');
    // console.log($location.absUrl());
    console.log(data);

    //-- Variables --//
    $scope.elencoTipoPosta = data;

    $scope.modal = {};
    $scope.n = data;
    $scope.n.msg.envId = 'TEST';
    $scope.modal.tipoPostaStampa = data[0];
    $scope.modal.dataAttuale = moment().format('DD/MM/YYYY');;
    //-- Methods --//

    $scope.cancel = function(){
        $uibModalInstance.dismiss('Canceled');
    }; // end cancel

    $scope.save = function(){
        console.log($scope.modal);
        $uibModalInstance.close($scope.modal);
    }; // end save

    }
//]
); // end controller(customDialogCtrl)


 


