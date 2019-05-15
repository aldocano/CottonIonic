angular.module("CottonPickingHarvestingController", ['ionic-datepicker']).
controller('CottonPickingHarvestingController', ['$scope', '$http','MainService', '$ionicPopup', '$stateParams', 'ionicDatePicker', '$filter', '$timeout','$ionicPlatform',
function($scope, $http, MainService, $ionicPopup, $stateParams, ionicDatePicker, $filter, $timeout,$ionicPlatform){
 	 
 	 //@@@@@author Sourav Keshari Nath @@@@@@
 	 $scope.getChange = function(f_Obj,s_Obj,clickName,val){
	        var index1=$scope.cotton_picking_harvesting_obj.activities.indexOf(f_Obj);
		    var index2=$scope.cotton_picking_harvesting_obj.activities[""+index1+""].details.indexOf(s_Obj);
		    var mopfiltData,hbtfiltData;
            if (clickName=="sos"){
		         var invalidEntries = 0;
			       mopfiltData = $scope.mopArray.filter(function(obj) { if (val == obj.name ) {
				    return true;
				  } else {
				    invalidEntries++;
				    return false;
				  } });
		        $scope.cotton_picking_harvesting_obj.activities[""+index1+""].details[""+index2+""].value=val;
		        $scope.cotton_picking_harvesting_obj.activities[""+index1+""].details[""+index2+""].id=mopfiltData[0].typeDetailId;
			}
			else {
				 var invalidEntries = 0;
			       hbtfiltData = $scope.hbtArray.filter(function(obj) { if (val == obj.name ) {
				    return true;
				  } else {
				    invalidEntries++;
				    return false;
				  } });
		        $scope.cotton_picking_harvesting_obj.activities[""+index1+""].details[""+index2+""].value=val;
		        $scope.cotton_picking_harvesting_obj.activities[""+index1+""].details[""+index2+""].id=hbtfiltData[0].typeDetailId;
			}

	 };
	// $scope.
    $scope.storageEnable = function(index,val){
	  		if(!val){
		        $scope.cotton_picking_harvesting_obj.pre_table_data[1].status=true;
		        $scope.cotton_picking_harvesting_obj.pre_table_data[1].value=" ";
               }
	  		else{
		        $scope.cotton_picking_harvesting_obj.pre_table_data[1].status=false;
	  	      }
	};
 	//// fetch land details data
    var areaValue,areaOValue;
    $scope.$on('landdetail_result', function(event, data) {
    	areaValue=data[0].value;
    	areaOValue=data[1].value;
 	}) 
 	 //// positive number validation
    $scope.integerValidation=function(f_obj,s_obj,val){
       MainService.integerValidation(f_obj,s_obj,val,$scope,"cotton_picking_harvesting_obj");
    }
	//// Area compare validation function called
    $scope.areaCompareValidation=function(f_obj,s_obj,key,val){
     	MainService.areaCompareValidation1(f_obj,s_obj,key,val,$scope,"cotton_picking_harvesting_obj","farmArea",areaOValue);
    }
    $scope.floatValidation2=function(f_obj,s_obj,val){
       MainService.floatValidation_for_ry(f_obj,s_obj,val,$scope,"cotton_picking_harvesting_obj");
    }
 	// $scope.sosRatiArray = [];	
 	//// responsive function called
    var style_Obj=MainService.ScreenSize();
    if (typeof  style_Obj!="undefined") {
	        $scope.popup_Style=style_Obj.Popup;
	        $scope.content_Style=style_Obj.Content;
	        $scope.title_Style=style_Obj.Title;
    }
	
    $scope.toggleGroup = function(activity) {
    	$timeout(function () {
	    	if ($scope.isGroupShown(activity)) {
	      		$scope.shownGroup = null;
	    	} else {
		      		$scope.shownGroup = activity;
	    	}
    	}, 100);
  	};

  	$scope.isGroupShown = function(activity) {
    	return $scope.shownGroup === activity;
  	};
  	

  	$scope.selectedDate = new Date();

	$scope.cotton_picking_harvesting_obj = MainService.getForm_data();
    if($scope.cotton_picking_harvesting_obj.submitted === undefined){
    	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		$http.get('cotton_picking_harvesting.json').	
		success(function(data){
			$scope.cotton_picking_harvesting_obj = data.cotton_picking_harvesting;
			
			$scope.cotton_picking_harvesting_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.cotton_picking_harvesting_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
            //// getting area details from land details
            MainService.getlandDetailsData($scope.cotton_picking_harvesting_obj.farmerId,$scope.cotton_picking_harvesting_obj.farmerTimePeriodId);

			var activities = data.cotton_picking_harvesting.activities;		
			var details = data.cotton_picking_harvesting.details;
			var child_details = data.cotton_picking_harvesting.child_details;
			var data = [];

			for(var i = 0; i < details.length;i++){
				data.push({
					key:details[i].key,
					name: details[i].name,
					type: details[i].has_child?0:details[i].type,
					value: details[i].value?details[i].value:0,
					is_parent: true
				}); 
				for(var j = 0; j < child_details.length; j++){
					if(details[i].name == child_details[j].parent){
						data.push({
							name: child_details[j].name,
							type: child_details[j].type,
							value: child_details[j].value?child_details[j].value:0,
							is_parent: false
						}); 
					}
				}
			}

			//kichhi kara
			$scope.cotton_picking_harvesting_obj.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name = activities[i].name + (i+1);
				var details_here = [];
				for(var j = 0;j <data.length;j++){
					details_here.push({
						key: data[j].key,
						name: data[j].name,
						type: data[j].type,
						value: data[j].value,
						is_parent: data[j].is_parent,
						status:true
					});
				}
				$scope.cotton_picking_harvesting_obj.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}
	     MainService.checkOrganicArea($scope.cotton_picking_harvesting_obj.farmerId);
	     $scope.cotton_picking_harvesting_obj.pre_table_data[1].status=true;
    	
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
    }else if($scope.cotton_picking_harvesting_obj.submitted === false){
         //// getting area details from land details
	     MainService.checkOrganicArea($scope.cotton_picking_harvesting_obj.farmerId);
         MainService.getlandDetailsData($scope.cotton_picking_harvesting_obj.farmerId,$scope.cotton_picking_harvesting_obj.farmerTimePeriodId);
    	$scope.flag = false;
    	console.log("false");
    }else{
    	$scope.flag = true;
    	console.log("true");
    }
    $scope.validString=function(f_obj,s_obj,val){
     	MainService.validString(f_obj,s_obj,val,$scope,"cotton_picking_harvesting_obj");
    }
    var saveFlag = false;
    $scope.save=function(){
    	MainService.save($scope.cotton_picking_harvesting_obj, 10,$scope);
    	saveFlag = true;
    }

    $scope.$on('eventFired', function(event, data) {
        if($scope.cotton_picking_harvesting_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })     

    $scope.submit=function(){
    	if(saveFlag){
		   	    MainService.submit($scope.cotton_picking_harvesting_obj, 10,$scope);
		}else{
			MainService.alertBox("Please save before submitting.", $scope);
		}    
    };


  	$scope.remove = function(){
    var click=true;
		if($scope.cotton_picking_harvesting_obj.activities.length >1){
		  		var confirmPopup = $ionicPopup.show({
			title: 'Confirm',
			template: 'Are you sure you want to delete the entire row?',
			scope: $scope,
			buttons: [
		      { text: 'No' },
		      {
		        text: '<b>Yes</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		          
		           if (click) {
                     $scope.cotton_picking_harvesting_obj.activities.splice($scope.cotton_picking_harvesting_obj.activities.length-1, 1);
                     click=false;
                   }
                    confirmPopup.close();
                   
		        }
		      }
		    ]
		});

		}else{
			$scope.flag = false;
			// MainService.show_toast("Minimum should stay one!");
		}
  		
  	};

	$scope.mopArray = [];
	$scope.tosArray = [];
	$scope.landDetailCurrentStatus=[];
	db.get(master_data_doc_name).then(function(doc) {
		$http.get('cotton_picking_harvesting.json').	
			success(function(data){
				var unorderedTypeDetailModels = doc.data.typeDetailModels;
				doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
	            var monthOfPickingTypeId=data.cotton_picking_harvesting.monthOfPickingTypeId;
	            var typeOfStorageTypeId=data.cotton_picking_harvesting.typeOfStorageTypeId;
		        var other = {
		        	typeDetailId: 0,
					name: "",
					checked:false
		        };
		      
				angular.forEach(unorderedTypeDetailModels, function(value, key){
					if (monthOfPickingTypeId==value.typeId) {
						$scope.mopArray.push({
					    typeDetailId: value.typeDetailId,
						name: value.typeDetailName,
						checked:false,
						});
					}
				});
				angular.forEach(doc.data.typeDetailModels, function(value, key){
					if (typeOfStorageTypeId==value.typeId) {
						$scope.tosArray.push({
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
    
 	$scope.getChange = function(f_Obj,s_Obj,val){
	        var index1=$scope.cotton_picking_harvesting_obj.activities.indexOf(f_Obj);
		    var index2=$scope.cotton_picking_harvesting_obj.activities[""+index1+""].details.indexOf(s_Obj);
              var invalidEntries = 0;
		      var moafiltData = $scope.mopArray.filter(function(obj) { if (val == obj.name ) {
			    return true;
			  } else {
			    invalidEntries++;
			    return false;
			  } });
               $scope.cotton_picking_harvesting_obj.activities[""+index1+""].details[""+index2+""].value=val;
		       $scope.cotton_picking_harvesting_obj.activities[""+index1+""].details[""+index2+""].id=moafiltData[0].typeDetailId;
	};

	$scope.getTypeOfStorageChange = function(index,val){
	          var invalidEntries = 0;
		      var tosfiltData = $scope.tosArray.filter(function(obj) { if (val == obj.name ) {
			    return true;
			  } else {
			    invalidEntries++;
			    return false;
			  } });

               $scope.cotton_picking_harvesting_obj.pre_table_data[""+index+""].value=val;
		       $scope.cotton_picking_harvesting_obj.pre_table_data[""+index+""].id=tosfiltData[0].typeDetailId;
	};

	$scope.myfy=function(f_Obj,s_Obj,val){
		var index1=$scope.cotton_picking_harvesting_obj.activities.indexOf(f_Obj);
		var index2=$scope.cotton_picking_harvesting_obj.activities[""+index1+""].details.indexOf(s_Obj);
		$scope.cotton_picking_harvesting_obj.activities[""+index1+""].details[""+index2+""].value=$filter('date')(val, 'yyyy-MM-dd'); //$filter('date')(val, 'yyyy-MM-dd'); 
	}
  	$scope.add = function(){
  		$http.get('cotton_picking_harvesting.json').	
		success(function(data){
			var cotton_picking_harvesting_obj2 = data.cotton_picking_harvesting;
			
			cotton_picking_harvesting_obj2.farmer_id = parseInt($stateParams.farmer_id);
			cotton_picking_harvesting_obj2.financial_year = parseInt($stateParams.financial_year);

			var activities = data.cotton_picking_harvesting.activities;		
			var details = data.cotton_picking_harvesting.details;
			var child_details = data.cotton_picking_harvesting.child_details;
			var data = [];


			for(var i = 0; i < details.length;i++){
				data.push({
					key:details[i].key,
					name: details[i].name,
					type: details[i].has_child?0:details[i].type,
					value: details[i].value?details[i].value:0,
					is_parent: true
				}); 
				for(var j = 0; j < child_details.length; j++){
					if(details[i].name == child_details[j].parent){
						data.push({
							name: child_details[j].name,
							type: child_details[j].type,
							value: child_details[j].value?child_details[j].value:0,
							is_parent: false
						}); 
					}
				}
			}
			cotton_picking_harvesting_obj2.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name += ($scope.cotton_picking_harvesting_obj.activities.length + 1);
				var details_here = [];
				for(var j = 0;j <data.length;j++){
					details_here.push({
						key: data[j].key,
						name: data[j].name,
						type: data[j].type,
						value: data[j].value,
						is_parent: data[j].is_parent
					});
				}
				cotton_picking_harvesting_obj2.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}

			$scope.cotton_picking_harvesting_obj.activities.push(cotton_picking_harvesting_obj2.activities[0]);	
			$timeout(function(){
				$scope.shownGroup = cotton_picking_harvesting_obj2.activities[0];
			},200);
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
  	};
	/*
	@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
	this function disable this process if it was synced in past.
	*/
	MainService.setFlagForSyncedFarmer($scope, cottonPickingHarvestingRecordProcessId);
}]);


	
