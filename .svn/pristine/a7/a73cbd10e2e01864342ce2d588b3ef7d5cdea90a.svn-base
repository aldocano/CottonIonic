angular.module("FarmerHouseHoldDetailsController", ['ionic-datepicker']).
controller('FarmerHouseHoldDetailsController', ['$scope', '$http','MainService', '$ionicPopup', '$stateParams', 'ionicDatePicker', '$filter', '$timeout',
function($scope, $http, MainService, $ionicPopup, $stateParams, ionicDatePicker, $filter, $timeout){
 
 	//// fetch land details data
    var areaValue,areaOValue;
    $scope.$on('landdetail_result', function(event, data) {
    	areaValue=data[0].value;
    	areaOValue=data[1].value;
 	}) 

    //// positive number validation
    $scope.integerValidation=function(f_obj,val){
       MainService.integerValidation_others(f_obj,val,$scope,"farmer_household_details_obj",two_digit_validation);
    }
 	// $scope.sosRatiArray = [];	
 	//// responsive function called
    var style_Obj=MainService.ScreenSize();
    if (typeof  style_Obj!="undefined") {
	        $scope.popup_Style=style_Obj.Popup;
	        $scope.content_Style=style_Obj.Content;
	        $scope.title_Style=style_Obj.Title;
    }
	
  	$scope.selectedDate = new Date();

	$scope.farmer_household_details_obj = MainService.getForm_data();
    if($scope.farmer_household_details_obj.submitted === undefined){
    	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		$http.get('farmer_household_details.json').	
		success(function(data){
			$scope.farmer_household_details_obj = data.farmer_household_details;
			
			$scope.farmer_household_details_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.farmer_household_details_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
	        MainService.checkOrganicArea($scope.farmer_household_details_obj.farmerId);
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
    }else if($scope.farmer_household_details_obj.submitted === false){
         //// getting area details from land details
	     MainService.checkOrganicArea($scope.farmer_household_details_obj.farmerId);
    	$scope.flag = false;
    	console.log("false");
    }else{
    	$scope.flag = true;
    	console.log("true");
    }
    $scope.validString=function(f_obj,s_obj,val){
     	MainService.validString(f_obj,s_obj,val,$scope,"farmer_household_details_obj");
    }
    var saveFlag = false;
    $scope.save=function(){
    	MainService.save($scope.farmer_household_details_obj, 16,$scope);
    	saveFlag = true;
    }

    $scope.$on('eventFired', function(event, data) {
        if($scope.farmer_household_details_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })     

    $scope.submit=function(){
    	if(saveFlag){
		   	    MainService.submit($scope.farmer_household_details_obj, 16,$scope);
		}else{
			MainService.alertBox("Please save before submitting.", $scope);
		}    
    };
    /*
    @author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
    this function disable this process if it was synced in past.
    */
    MainService.setFlagForSyncedFarmer($scope, otherInformationFarmerHouseholdDetailsProcessId);
}]);