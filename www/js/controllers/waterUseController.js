angular.module('WaterUseController', []).
controller('WaterUseController', ['$scope', '$http','MainService', '$ionicPopup', '$stateParams',
	function($scope, $http, MainService, $ionicPopup, $stateParams){
   
    //// positive number validation
    $scope.floatValidation=function(f_obj,s_obj,val){
       MainService.floatValidation(f_obj,s_obj,val,$scope,"water_use_obj");
    }
    $scope.floatValidation_for_cap=function(f_obj,s_obj,val){
       MainService.floatValidation_for_cap(f_obj,s_obj,val,$scope,"water_use_obj");
    }
    $scope.floatValidation_for_losp=function(f_obj,s_obj,val){
       MainService.floatValidation_for_losp(f_obj,s_obj,val,$scope,"water_use_obj");
    }
    $scope.floatValidation_for_dosp=function(f_obj,s_obj,val){
       MainService.floatValidation_for_dosp(f_obj,s_obj,val,$scope,"water_use_obj");
    }
    $scope.floatValidation_for_lodp=function(f_obj,s_obj,val){
       MainService.floatValidation_for_lodp(f_obj,s_obj,val,$scope,"water_use_obj");
    }
    $scope.floatValidation_for_ry=function(f_obj,s_obj,val){
       MainService.floatValidation_for_ry(f_obj,s_obj,val,$scope,"water_use_obj");
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

  	$scope.remove = function(){
        var click=true;
  		if($scope.water_use_obj.activities.length != 1){
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
			          if (click) {
                       $scope.water_use_obj.activities.splice($scope.water_use_obj.activities.length-1, 1);
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

  	$scope.add = function(){
  		$http.get('water_use.json').	
		success(function(data){
			var water_use_obj2 = data.water_use;
			
			water_use_obj2.farmerId = parseInt($stateParams.farmerId);
			water_use_obj2.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);

			var activities = data.water_use.activities;		
			var details = data.water_use.details;
			var child_details = data.water_use.child_details;
			var data = [];


			for(var i = 0; i < details.length;i++){
				data.push({
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
			water_use_obj2.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name += ($scope.water_use_obj.activities.length + 1);
				var details_here = [];
				for(var j = 0;j <data.length;j++){
					details_here.push({
						name: data[j].name,
						type: data[j].type,
						value: data[j].value,
						is_parent: data[j].is_parent
					});
				}
				water_use_obj2.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}

			$scope.water_use_obj.activities.push(water_use_obj2.activities[0]);			
			$scope.shownGroup = water_use_obj2.activities[0];
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
  	};

	$scope.water_use_obj = MainService.getForm_data();

    if($scope.water_use_obj.submitted === undefined){
    	
    	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		$http.get('water_use.json').	
		success(function(data){
			$scope.water_use_obj = data.water_use;
			
			$scope.water_use_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.water_use_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);

			var activities = data.water_use.activities;		
			var details = data.water_use.details;
			var child_details = data.water_use.child_details;
			var data = [];


			for(var i = 0; i < details.length;i++){
				data.push({
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
			$scope.water_use_obj.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name = activities[i].name + (i+1);
				var details_here = [];
				for(var j = 0;j <data.length;j++){
					details_here.push({
						name: data[j].name,
						type: data[j].type,
						value: data[j].value,
						is_parent: data[j].is_parent
					});
				}
				$scope.water_use_obj.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}

		}).
		error(function(err){
		//error fetching json
			console.error(err.message);
		});	
    }else if($scope.water_use_obj.submitted === false){
    	$scope.flag = false;
    	console.log("false");
    }else{
    	$scope.flag = true;
    	console.log("true");
    }
	var saveFlag = false;
    $scope.save=function(){
   		MainService.save($scope.water_use_obj, 4,$scope);
   		saveFlag = true;
    }

	
    $scope.$on('eventFired', function(event, data) {
       if($scope.water_use_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })

    $scope.submit=function(){
    	if(saveFlag)
			MainService.submit($scope.water_use_obj, 4,$scope);
		else
			MainService.alertBox("Please save before submitting.", $scope);
    }
	/*
	@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
	this function disable this process if it was synced in past.
	*/
	MainService.setFlagForSyncedFarmer($scope, electricPumpWaterUseProcessId);

}])