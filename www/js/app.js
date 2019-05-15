var db = new PouchDB("cotton_connect", {auto_compaction: true});
//var remoteDB = new PouchDB("http://kennith:kennith@192.168.1.108:5984/cotton_connect");
//var remoteDB = new PouchDB("http://sa:sa@192.168.1.51:5984/cotton_connect");

angular.module('starter', ['ionic', 'ionic.contrib.drawer','ngCordova','LoginController','MenuCtrl',
  'HomeController','MainService','MainController', 'SowingCostController', 'HelpEmploymentController',
   'SoilPreparationController', 'WaterUseController', 'IrrigationDetailsController', 
   'ManureApplicationController', 'SidemenuController','Values', 'LandDetailsController',
   'WeedingDetailsController', 'UtilController','MainServiceHelper', 'angular-md5', 
   'LandAndIrrigationController', 'EstimationController', 'CottonPickingHarvestingController',
   'TrainingsAttendedByController', 'MeetingAttendedByController', 'PesticideApplicationDetailsController',
   'BestpracticesDecentworkController', 'LaborsRecordController', 'SellingOthersourceController',
   'FarmerHouseHoldDetailsController','LandHoldingDetailsController','CottonCropDetailsController',
   'LivestockCattleOwnershipController','AssetOwnershipController','EducationalHousingDetailsController',
   'AdditionalDetailsController','SustainablePracticesController','SyncStatusController'])

.run(['$ionicPlatform','$state', '$ionicHistory','Back_button_tap_flag_value','$timeout','$cordovaToast','MainService',
  function($ionicPlatform, $state, $ionicHistory,Back_button_tap_flag_value, $timeout, $cordovaToast, MainService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // db.sync(remoteDB, {live : true, retry : true});



    $ionicPlatform.registerBackButtonAction(function (event) {
      if($state.current.name == "app.login"){
        if(Back_button_tap_flag_value)
          ionic.Platform.exitApp();
        else{
           Back_button_tap_flag_value = true; 
           $cordovaToast.show('Tap again to exit', toastSDuration, toastPosition);        
        }
        $timeout(function(){Back_button_tap_flag_value = false;}, 2000);  
      }else if($state.current.name == "app.home"){
        
        if(Back_button_tap_flag_value)
          ionic.Platform.exitApp();
        else{
           Back_button_tap_flag_value = true; 
           $cordovaToast.show('Tap again to exit', toastSDuration, toastPosition);        
        }
        $timeout(function(){Back_button_tap_flag_value = false;}, 2000);



      }else if($state.current.name == "app.main"){
        // $state.go('app.home');
        MainService.show_spinner();
        $timeout(function(){
        MainService.hide_spinner();
        $state.go('app.home');
        }, 1000);
      }
      /*
      The following condition is for the soil preparation page back  button control.
      Initially we did not need it but latter we saw complexity during load of the page and getting back from the page.
      So the following code represents how we handled the back button from that state.

      @author: Ratikanta Pradhan (ratikanta@sdrc.co.in)
      */
      else if($state.current.name == "app.soil_Preparation"){
        MainService.show_spinner();
        $timeout(function(){
          db.get(back_button_event_doc_name).
          then(function(doc){
            if(doc.title){
              MainService.hide_spinner();
              $ionicHistory.goBack(-1);
            }
          }).
          catch(function(err){
            console.log(err.status);            
          });  
        }, 1000);
        
      }else if($state.current.name == "app.syncStatus"){
        event.preventDefault();
      }else{
        $ionicHistory.goBack(-1);
      }

    }, 100);

  });
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

   .state('app', {
    url: '/app',    
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuCtrl'
  })
  .state('app.login', {
      url: '/login',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginController'
        }
      }
    })
 
    .state('app.home', {
      url: '/home',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeController'
        }
      }
    })
    .state('app.main', {
      url: '/main',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'MainController'
        }
      }
    })
    .state('app.sowingCost', {
      url: '/sowing_cost/:farmerId/:farmerTimePeriodId',
      views: {
        'menuContent': {
          templateUrl: 'templates/sowingCost.html',
          controller: 'SowingCostController'
        }
      }
    })
    .state('app.help_Employment', {
      url: '/help_Employment/:farmerId/:farmerTimePeriodId',
      views: {
        'menuContent': {
          templateUrl: 'templates/help_Employment.html',
          controller: 'HelpEmploymentController'
        }
      }
    })
    .state('app.soil_Preparation', {
      cache: false,
      url: '/soil_Preparation/:farmerId/:farmerTimePeriodId',
      views: {
        'menuContent': {
          templateUrl: 'templates/soil_Preparation.html',
          controller: 'SoilPreparationController'
        }
      }
    })
    .state('app.waterUse', {
      url: '/waterUse/:farmerId/:farmerTimePeriodId',
      views: {
        'menuContent': {
          templateUrl: 'templates/waterUse.html',
          controller: 'WaterUseController'
        }
      }
    })
    .state('app.irrigationDetails', {
      url: '/irrigationDetails/:farmerId/:farmerTimePeriodId',
      views: {
        'menuContent': {
          templateUrl: 'templates/irrigationDetails.html',
          controller: 'IrrigationDetailsController'
        }
      }
    })
    .state('app.manureApplication', {
      url: '/manureApplication/:farmerId/:farmerTimePeriodId',
      views: {
        'menuContent': {
          templateUrl: 'templates/manureApplication.html',
          controller: 'ManureApplicationController'
        }
      }
    })
    .state('app.landAndIrrigation', {
      url: '/landAndIrrigation/:farmerId/:farmerTimePeriodId',
      views: {
        'menuContent': {
          templateUrl: 'templates/landAndIrrigation.html',
          controller: 'LandAndIrrigationController'
        }
      }
    })
    .state('app.estimation', {
      url: '/estimation/:farmerId/:farmerTimePeriodId',
      views: {
        'menuContent': {
          templateUrl: 'templates/estimation.html',
          controller: 'EstimationController'
        }
      }
    })
 
    .state('app.section_a', {
      url: '/section_a',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/section_a.html',
          controller: 'MainController'
        }
      }
    })
    .state('app.land_details', {
      url: '/land_details/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/land_details.html',
          controller: 'LandDetailsController'
        }
      }
    }) 
    .state('app.weeding_details', {
      url: '/weeding_details/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/weedingDetails.html',
          controller: 'WeedingDetailsController'
        }
      }
    })  
    .state('app.cotton_picking_harvesting', {
      url: '/cotton_picking_harvesting/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/cottonPickingHarvesting.html',
          controller: 'CottonPickingHarvestingController'
        }
      }
    })
    .state('app.trainings_attended_by', {
      url: '/trainings_attended_by/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/trainingsAttendedBy.html',
          controller: 'TrainingsAttendedByController'
        }
      }
    })
    .state('app.meeting_attended_by', {
      url: '/meeting_attended_by/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/meetingAttendedBy.html',
          controller: 'MeetingAttendedByController'
        }
      }
    })
    .state('app.pesticide_application_details', {
      url: '/pesticide_application_details/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/pesticideApplicationDetails.html',
          controller: 'PesticideApplicationDetailsController'
        }
      }
    })
    .state('app.bestpractices_decentwork', {
      url: '/bestpractices_decentwork/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/bestpractices_decentwork.html',
          controller: 'BestpracticesDecentworkController'
        }
      }
    })
    .state('app.labors_record', {
      url: '/labors_record/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/laborsRecord.html',
          controller: 'LaborsRecordController'
        }
      }
    })
    .state('app.selling_othersource', {
      url: '/selling_othersource/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/selling_othersource.html',
          controller: 'SellingOthersourceController'
        }
      }
    })
    .state('app.farmer_household_details', {
      url: '/farmer_household_details/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/farmerHouseholdDetails.html',
          controller: 'FarmerHouseHoldDetailsController'
        }
      }
    })
    .state('app.land_holding_details', {
      url: '/land_holding_details/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/landHoldingDetails.html',
          controller: 'LandHoldingDetailsController'
        }
      }
    })
    .state('app.cotton_crop_details', {
      url: '/cotton_crop_details/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/cottonCropDetails.html',
          controller: 'CottonCropDetailsController'
        }
      }
    })
    .state('app.livestock_cattle_ownership', {
      url: '/livestock_cattle_ownership/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/livestockCattleOwnership.html',
          controller: 'LivestockCattleOwnershipController'
        }
      }
    })
    .state('app.asset_ownership', {
      url: '/asset_ownership/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/assetOwnership.html',
          controller: 'AssetOwnershipController'
        }
      }
    })
    .state('app.educational_housing_details', {
      url: '/educational_housing_details/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/educationalHousingDetails.html',
          controller: 'EducationalHousingDetailsController'
        }
      }
    })
    .state('app.additional_details', {
      url: '/additional_details/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/additionalDetails.html',
          controller: 'AdditionalDetailsController'
        }
      }
    })
    .state('app.sustainable_practices', {
      url: '/sustainable_practices/:farmerId/:farmerTimePeriodId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/sustainablePractices.html',
          controller: 'SustainablePracticesController'
        }
      }
    })
    .state('app.syncStatus', {
      url: '/syncStatus',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/syncStatus.html',
          controller: 'SyncStatusController'
        }
      }
    })
   ;
  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/app/playlists');
  $urlRouterProvider.otherwise('/app/login');
});
