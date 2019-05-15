angular.module("IrrigationDetailsController", []).
controller('IrrigationDetailsController', ['$scope', '$http','MainService', '$ionicPopup', '$stateParams',
	function($scope, $http, MainService, $ionicPopup, $stateParams){
		
		//// fetch land details data
	    var areaValue,areaOValue;
	    $scope.$on('landdetail_result', function(event, data) {
	    	areaValue=data[0].value;
	    	areaOValue=data[1].value;
	 	})
		//// Area compare validation function called
        $scope.areaCompareValidation=function(f_obj,s_obj,key,val){
         	MainService.areaCompareValidation(f_obj,s_obj,key,val,$scope,"irrigation_details_obj","areaIrrigated",areaOValue);
        }
        //// positive number validation
	    $scope.floatValidation=function(f_obj,s_obj,val){
	       MainService.floatValidation(f_obj,s_obj,val,$scope,"irrigation_details_obj");
	    }
	    $scope.floatValidation1=function(f_obj,s_obj,val){
	       MainService.floatValidation_for_losp(f_obj,s_obj,val,$scope,"irrigation_details_obj");
	    }
	    $scope.floatValidation_for_cost_of_oil=function(f_obj,s_obj,val){
	       MainService.floatValidation_for_ry(f_obj,s_obj,val,$scope,"irrigation_details_obj");
	    }
	    $scope.floatValidation_for_domr=function(f_obj,s_obj,val){
	       MainService.floatValidation_for_losp(f_obj,s_obj,val,$scope,"irrigation_details_obj");
	    }
		var style_Obj=MainService.ScreenSize();
         if (typeof  style_Obj!="undefined") {
	        $scope.popup_Style=style_Obj.Popup;
	        $scope.content_Style=style_Obj.Content;
	        $scope.title_Style=style_Obj.Title;
         }
		$scope.toggleGroup = function(activity) {
	    	if ($scope.isGroupShown(activity)) {
	      		$scope.shownGroup = null;
	    	} else {
	      		$scope.shownGroup = activity;
	    	}
	  	};
	  	$scope.isGroupShown = function(activity) {
	    	return $scope.shownGroup === activity;
	  	};

	  	$scope.flag_qty_cost = function(f_Obj,s_Obj,val){
		    var index1=$scope.irrigation_details_obj.activities.indexOf(f_Obj);
		    var index2=$scope.irrigation_details_obj.activities[""+index1+""].details.indexOf(s_Obj);
	  		if(!val){
		        $scope.irrigation_details_obj.activities[""+index1+""].details[3].status=true;
		        $scope.irrigation_details_obj.activities[""+index1+""].details[3].value=" ";
		        $scope.irrigation_details_obj.activities[""+index1+""].details[4].status=true;
		        $scope.irrigation_details_obj.activities[""+index1+""].details[4].value=" ";
            }else{
		        $scope.irrigation_details_obj.activities[""+index1+""].details[3].status=false;
		        $scope.irrigation_details_obj.activities[""+index1+""].details[4].status=false;
	  	    }
	    };

  	$scope.remove = function(){
  		var click = true;
  		if($scope.irrigation_details_obj.activities.length != 1){
  		  		var confirmPopup = $ionicPopup.show({
				title: 'Confirm',
				template: 'Are you sure you want to delete the entire row?',
				scope:$scope,
				buttons: [
			      { text: 'No' },
			      {
			        text: '<b>Yes</b>',
			        type: 'button-positive',
			        onTap: function(e) {
			            if(click){	
                            $scope.irrigation_details_obj.activities.splice($scope.irrigation_details_obj.activities.length-1, 1);
                         	click = false;
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

  	$scope.add = function(){
  		$http.get('irrigation_details.json').	
		success(function(data){
			
			var irrigation_details_obj2 = data.irrigation_details;
			
			irrigation_details_obj2.farmerId = parseInt($stateParams.farmerId);
			irrigation_details_obj2.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
          
			var activities = data.irrigation_details.activities;		
			var details = data.irrigation_details.details;
			var child_details = data.irrigation_details.child_details;
			var data = [];


			for(var i = 0; i < details.length;i++){
				data.push({
					key: details[i].key,
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
			irrigation_details_obj2.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name += ($scope.irrigation_details_obj.activities.length + 1);
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
				irrigation_details_obj2.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}
            
			$scope.irrigation_details_obj.activities.push(irrigation_details_obj2.activities[0]);			
			$scope.shownGroup = irrigation_details_obj2.activities[0];
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
  	};

	$scope.irrigation_details_obj = MainService.getForm_data();  
    if($scope.irrigation_details_obj.submitted === undefined){
    	
    	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		$http.get('irrigation_details.json').	
		success(function(data){
			$scope.irrigation_details_obj = data.irrigation_details;
			
			$scope.irrigation_details_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.irrigation_details_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
            
             //// getting area details from land details
            MainService.getlandDetailsData($scope.irrigation_details_obj.farmerId,$scope.irrigation_details_obj.farmerTimePeriodId);

			var activities = data.irrigation_details.activities;		
			var details = data.irrigation_details.details;
			var child_details = data.irrigation_details.child_details;
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
			$scope.irrigation_details_obj.activities = [];
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
				$scope.irrigation_details_obj.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}
            MainService.checkOrganicArea($scope.irrigation_details_obj.farmerId);
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
    }else if($scope.irrigation_details_obj.submitted === false){
        MainService.checkOrganicArea($scope.irrigation_details_obj.farmerId);
        MainService.getlandDetailsData($scope.irrigation_details_obj.farmerId,$scope.irrigation_details_obj.farmerTimePeriodId);
    	$scope.flag = false;
    	console.log("false");
    }else{
    	$scope.flag = true;
    	console.log("true");
    }
	var saveFlag = false;
    $scope.save=function(){
		if (typeof currentFarmerwiseData[0]!="undefined") {
	       	if (currentFarmerwiseData[0].data.land_details.submitted){
	       		if(MainService.area_not_filled_new($scope.irrigation_details_obj.activities,"areaIrrigated",$scope,msg_cotton_area_not_filled)){
			        MainService.save($scope.irrigation_details_obj, 5);
		   			saveFlag = true;
	   			}         
			}else{
				MainService.alertBox(msg_check_for_submit,$scope);
		    }
	    }else{
			MainService.alertBox(msg_check_for_submit,$scope);
	    }
    }

    $scope.$on('eventFired', function(event, data) {
        if($scope.irrigation_details_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })   

    $scope.submit=function(){
    	if(saveFlag){
    		if(MainService.area_not_filled_new($scope.irrigation_details_obj.activities,"areaIrrigated",$scope,msg_cotton_area_not_filled)){
			  MainService.submit($scope.irrigation_details_obj, 5,$scope);
			}
		}
	   	else{
			MainService.alertBox("Please save before submitting.", $scope);
	   	}
    };  	

    /*
	@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
	this function disable this process if it was synced in past.
	*/
	MainService.setFlagForSyncedFarmer($scope, irrigationDetailProcessId);
}])