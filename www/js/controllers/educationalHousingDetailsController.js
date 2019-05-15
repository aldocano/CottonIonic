angular.module("EducationalHousingDetailsController", ['ionic-datepicker']).
controller('EducationalHousingDetailsController', ['$scope', '$http','MainService', '$ionicPopup', '$stateParams','$filter', '$timeout',
function($scope, $http, MainService, $ionicPopup, $stateParams, $filter, $timeout){
 
 	//// fetch land details data
    var areaValue,areaOValue;
    $scope.$on('landdetail_result', function(event, data) {
    	areaValue=data[0].value;
    	areaOValue=data[1].value;
 	}) 

    //// positive number validation
    $scope.integerValidation=function(f_obj,val){
       MainService.integerValidation_others(f_obj,val,$scope,"educational_housing_details_obj",two_digit_validation);
    }
    //// positive number validation
    $scope.floatValidation=function(f_obj,val){
       MainService.floatValidation_others(f_obj,val,$scope,"educational_housing_details_obj",msg_invalid_decimal);
    }
 	// $scope.sosRatiArray = [];	
 	//// responsive function called
    var style_Obj=MainService.ScreenSize();
    if (typeof  style_Obj!="undefined") {
	        $scope.popup_Style=style_Obj.Popup;
	        $scope.content_Style=style_Obj.Content;
	        $scope.title_Style=style_Obj.Title;
    }
	
	$scope.educational_housing_details_obj = MainService.getForm_data();
    if($scope.educational_housing_details_obj.submitted === undefined){
    	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		$http.get('educational_housing_details.json').	
		success(function(data){
			$scope.educational_housing_details_obj = data.educational_housing_details;
			
			$scope.educational_housing_details_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.educational_housing_details_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
	        MainService.checkOrganicArea($scope.educational_housing_details_obj.farmerId);
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
    }else if($scope.educational_housing_details_obj.submitted === false){
         //// getting area details from land details
	     MainService.checkOrganicArea($scope.educational_housing_details_obj.farmerId);
    	$scope.flag = false;
    	console.log("false");
    }else{
    	$scope.flag = true;
    	console.log("true");
    }
    $scope.aiArray=[];
    $scope.ceArray=[];
    $scope.vcArray=[];
	db.get(master_data_doc_name).then(function(doc) {
		$http.get('educational_housing_details.json').
			success(function(data){
				doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
	            var educationalfarmerTypeId=data.educational_housing_details.educationalfarmerTypeId;
	            var housingTypeId=data.educational_housing_details.housingTypeId;
	            var drinkingWaterTypeId=data.educational_housing_details.drinkingWaterTypeId;

				angular.forEach(doc.data.typeDetailModels, function(value, key){
                    if(educationalfarmerTypeId == value.typeId){
						$scope.aiArray.push({
							typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
						});
					}else if(housingTypeId == value.typeId){
						$scope.ceArray.push({
							typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
						});
					}else if(drinkingWaterTypeId == value.typeId){
						$scope.vcArray.push({
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

	$scope.getChange = function(index,val){
        var ids="";
		var arr = val;
		for(var j = 0; j < arr.length; j++){
			ids+=arr[j]+",";
		}
		ids = ids.substring(0, ids.length-1);
		$scope.educational_housing_details_obj.details[""+index+""].id=ids;
	}


    $scope.validString=function(f_obj,s_obj,val){
     	MainService.validString(f_obj,s_obj,val,$scope,"educational_housing_details_obj");
    }
    var saveFlag = false;
    $scope.save=function(){
    	MainService.save($scope.educational_housing_details_obj, 21,$scope);
    	saveFlag = true;
    }

    $scope.$on('eventFired', function(event, data) {
        if($scope.educational_housing_details_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })     

    $scope.submit=function(){
    	if(saveFlag){
		   	    MainService.submit($scope.educational_housing_details_obj, 21,$scope);
		}else{
			MainService.alertBox("Please save before submitting.", $scope);
		}    
    };
	/*
	@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
	this function disable this process if it was synced in past.
	*/
	MainService.setFlagForSyncedFarmer($scope, otherInformationEducationalAndHousingDetailsProcessId);
}]);