angular.module("LivestockCattleOwnershipController", ['ionic-datepicker']).
controller('LivestockCattleOwnershipController', ['$scope', '$http','MainService', '$ionicPopup', '$stateParams','$filter', '$timeout',
function($scope, $http, MainService, $ionicPopup, $stateParams, $filter, $timeout){
 
 	//// fetch land details data
    var areaValue,areaOValue;
    $scope.$on('landdetail_result', function(event, data) {
    	areaValue=data[0].value;
    	areaOValue=data[1].value;
 	}) 

    //// positive number validation
    $scope.integerValidation=function(f_obj,val){
       MainService.integerValidation_others(f_obj,val,$scope,"livestock_cattle_ownership_obj",three_digit_validation);
    }
    //// positive number validation
    $scope.floatValidation=function(f_obj,val){
       MainService.floatValidation_others(f_obj,val,$scope,"livestock_cattle_ownership_obj",msg_invalid_decimal);
    }
 	//// responsive function called
    var style_Obj=MainService.ScreenSize();
    if (typeof  style_Obj!="undefined") {
	        $scope.popup_Style=style_Obj.Popup;
	        $scope.content_Style=style_Obj.Content;
	        $scope.title_Style=style_Obj.Title;
    }
	
	$scope.livestock_cattle_ownership_obj = MainService.getForm_data();
    if($scope.livestock_cattle_ownership_obj.submitted === undefined){
    	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		$http.get('livestock_cattle_ownership.json').	
		success(function(data){
			$scope.livestock_cattle_ownership_obj = data.livestock_cattle_ownership;
			
			$scope.livestock_cattle_ownership_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.livestock_cattle_ownership_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
	        MainService.checkOrganicArea($scope.livestock_cattle_ownership_obj.farmerId);
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
    }else if($scope.livestock_cattle_ownership_obj.submitted === false){
         //// getting area details from land details
	     MainService.checkOrganicArea($scope.livestock_cattle_ownership_obj.farmerId);
    	$scope.flag = false;
    	console.log("false");
    }else{
    	$scope.flag = true;
    	console.log("true");
    }

    $scope.validString=function(f_obj,s_obj,val){
     	MainService.validString(f_obj,s_obj,val,$scope,"livestock_cattle_ownership_obj");
    }
    var saveFlag = false;
    $scope.save=function(){
    	MainService.save($scope.livestock_cattle_ownership_obj, 19,$scope);
    	saveFlag = true;
    }

    $scope.$on('eventFired', function(event, data) {
        if($scope.livestock_cattle_ownership_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })     

    $scope.submit=function(){
    	if(saveFlag){
		   	    MainService.submit($scope.livestock_cattle_ownership_obj, 19,$scope);
		}else{
			MainService.alertBox("Please save before submitting.", $scope);
		}    
    };
    /*
    @author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
    this function disable this process if it was synced in past.
    */
    MainService.setFlagForSyncedFarmer($scope, otherInformationLiveStockAndCattleOwnershipProcessId);
}]);