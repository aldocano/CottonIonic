angular.module("CottonCropDetailsController", ['ionic-datepicker']).
controller('CottonCropDetailsController', ['$scope', '$http','MainService', '$ionicPopup', '$stateParams','$filter', '$timeout',
function($scope, $http, MainService, $ionicPopup, $stateParams, $filter, $timeout){
 
 	//// fetch land details data
    var areaValue,areaOValue;
    $scope.$on('landdetail_result', function(event, data) {
    	areaValue=data[0].value;
    	areaOValue=data[1].value;
 	}) 

    //// positive number validation
    $scope.integerValidation=function(f_obj,val){
       MainService.integerValidation_others(f_obj,val,$scope,"cotton_crop_details_obj",four_digit_validation);
    }
    //// positive number validation
    $scope.floatValidation=function(f_obj,val){
       MainService.floatValidation_others(f_obj,val,$scope,"cotton_crop_details_obj",msg_invalid_decimal);
    }
 	// $scope.sosRatiArray = [];	
 	//// responsive function called
    var style_Obj=MainService.ScreenSize();
    if (typeof  style_Obj!="undefined") {
	        $scope.popup_Style=style_Obj.Popup;
	        $scope.content_Style=style_Obj.Content;
	        $scope.title_Style=style_Obj.Title;
    }
	
	$scope.cotton_crop_details_obj = MainService.getForm_data();
    if($scope.cotton_crop_details_obj.submitted === undefined){
    	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		$http.get('cotton_crop_details.json').	
		success(function(data){
			$scope.cotton_crop_details_obj = data.cotton_crop_details;
			
			$scope.cotton_crop_details_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.cotton_crop_details_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
	        MainService.checkOrganicArea($scope.cotton_crop_details_obj.farmerId);
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
    }else if($scope.cotton_crop_details_obj.submitted === false){
         //// getting area details from land details
	     MainService.checkOrganicArea($scope.cotton_crop_details_obj.farmerId);
    	$scope.flag = false;
    	console.log("false");
    }else{
    	$scope.flag = true;
    	console.log("true");
    }
    $scope.spArray=[];
	db.get(master_data_doc_name).then(function(doc) {
		$http.get('cotton_crop_details.json').
			success(function(data){
				doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
	            var stapleTypeId=data.cotton_crop_details.stapleTypeId;

				angular.forEach(doc.data.typeDetailModels, function(value, key){
                    if(stapleTypeId == value.typeId){
						$scope.spArray.push({
							typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
						});
					}
				});
	        })
	}).catch(function (err) {
		console.log(err);
	});




    $scope.validString=function(f_obj,s_obj,val){
     	MainService.validString(f_obj,s_obj,val,$scope,"cotton_crop_details_obj");
    }
    var saveFlag = false;
    $scope.save=function(){
    	MainService.save($scope.cotton_crop_details_obj, 18,$scope);
    	saveFlag = true;
    }

    $scope.$on('eventFired', function(event, data) {
        if($scope.cotton_crop_details_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })     

    $scope.submit=function(){
    	if(saveFlag){
		   	    MainService.submit($scope.cotton_crop_details_obj, 18,$scope);
		}else{
			MainService.alertBox("Please save before submitting.", $scope);
		}    
    };
	/*
	@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
	this function disable this process if it was synced in past.
	*/
	MainService.setFlagForSyncedFarmer($scope, otherInformationCottonCropDetailProcessId);
}]);