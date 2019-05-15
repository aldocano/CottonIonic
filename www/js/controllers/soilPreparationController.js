angular.module('SoilPreparationController', []).
controller('SoilPreparationController', ['$scope', '$http','MainService', '$ionicPopup','$stateParams', '$timeout', '$ionicHistory',
	function($scope, $http, MainService, $ionicPopup, $stateParams, $timeout, $ionicHistory){


		$scope.storeValue = function(){
			db.get(back_button_event_doc_name).
			then(function(doc){
				return db.put({
				    _id: back_button_event_doc_name,
				    _rev: doc._rev,
				    title: true
				  });
			}).
			catch(function(err){
				if(err.status === 404){
					db.put({
					  _id: back_button_event_doc_name,
					  title: true
					}).then(function (response) {
					  // handle response
					  console.log("done");
					}).catch(function (err) {
					  console.log(err);
					});
				}else{
					console.log(err.status);
				}
			});
		};

 	 $scope.getChange = function(f_Obj,s_Obj,val){
	        var index1=$scope.soil_prep_cost_obj.activities.indexOf(f_Obj);
		    var index2=$scope.soil_prep_cost_obj.activities[""+index1+""].details.indexOf(s_Obj);
	        var invalidEntries = 0;
		      var moafiltData = $scope.moaArray.filter(function(obj) { if (val == obj.name ) {
			    return true;
			  } else {
			    invalidEntries++;
			    return false;
			  } });
		    $scope.soil_prep_cost_obj.activities[""+index1+""].details[""+index2+""].value=val;
		    $scope.soil_prep_cost_obj.activities[""+index1+""].details[""+index2+""].id=moafiltData[0].typeDetailId;
	 };

    //// fetch land details data
    var areaValue,areaOValue;
    $scope.$on('landdetail_result', function(event, data) {
    	areaValue=data[0].value;
    	areaOValue=data[1].value;
 	})
    //// Area compare validation function called
    $scope.areaCompareValidation=function(f_obj,s_obj,key,val){
        MainService.areaCompareValidation(f_obj,s_obj,key,val,$scope,"soil_prep_cost_obj","farmArea",areaOValue);
    }
    //// positive number validation
    $scope.integerValidation=function(f_obj,s_obj,val){
       MainService.integerValidation1(f_obj,s_obj,val,$scope,"soil_prep_cost_obj");
    }
    //// positive number validation
    $scope.floatValidation=function(f_obj,s_obj,val){
       MainService.floatValidation(f_obj,s_obj,val,$scope,"soil_prep_cost_obj");
    }
    $scope.floatValidation1=function(f_obj,s_obj,val){
       MainService.floatValidation_for_ry(f_obj,s_obj,val,$scope,"soil_prep_cost_obj");
    }

    
    
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

	$scope.soil_prep_cost_obj = MainService.getForm_data(); 
	if($scope.soil_prep_cost_obj.submitted === undefined){

       db.get(master_data_doc_name).then(function(doc) {
		$http.get('soil_preparation.json').
		success(function(data){
			var typeId=data.soil_preparation_cost.landPreparationCultivationPracticesTypeId;
			$scope.soil_prep_cost_obj = data.soil_preparation_cost;
			$scope.soil_prep_cost_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.soil_prep_cost_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
             //// getting area details from land details
            MainService.getlandDetailsData($scope.soil_prep_cost_obj.farmerId,$scope.soil_prep_cost_obj.farmerTimePeriodId);

			$scope.soil_prep_cost_obj.activities=[];
			angular.forEach(doc.data.typeDetailModels, function(value, key){
				
				if (typeId==value.typeId) {
					$scope.soil_prep_cost_obj.activities.push({
				    typeDetailId: value.typeDetailId,
					name: value.typeDetailName
					});
				}

			});
          
			var activities = $scope.soil_prep_cost_obj.activities;		
			var details = data.soil_preparation_cost.details;
			var child_details = data.soil_preparation_cost.child_details;
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
			$scope.soil_prep_cost_obj.activities = [];
			for(var i = 0; i < activities.length;i++){
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
				$scope.soil_prep_cost_obj.activities.push({
					typeDetailId: activities[i].typeDetailId,
					name: activities[i].name,
					details: details_here
				});
			}
	    MainService.checkOrganicArea($scope.soil_prep_cost_obj.farmerId);
		}).
		error(function(err){
			//error fetching json
			console.error(err.message);
		});
		}).catch(function (err) {
			  console.log(err);
	 });
		$timeout(function(){
			MainService.hide_spinner();
			// Temp_value = true;
			$scope.storeValue();
    	},1000);
    	// $ionicPlatform.registerBackButtonAction(function (event) {
     //       event.returnValue;
     //    }, 100);
	}else if($scope.soil_prep_cost_obj.submitted === false){
		//// getting area details from land details
	    MainService.checkOrganicArea($scope.soil_prep_cost_obj.farmerId);
        MainService.getlandDetailsData($scope.soil_prep_cost_obj.farmerId,$scope.soil_prep_cost_obj.farmerTimePeriodId);
		$scope.flag = false;
    	console.log("false");
    	$timeout(function(){
    		MainService.hide_spinner();    		
    		// Temp_value = true;
    		$scope.storeValue();
    	},1000);
    	// $ionicPlatform.registerBackButtonAction(function (event) {
     //       event.returnValue;
     //    }, 100);
    }else{
    	$scope.flag = true;
    	console.log("true");
    	$timeout(function(){
    		MainService.hide_spinner();	
    		// Temp_value = true;
    		$scope.storeValue();
    	},1000);
    }
    var saveFlag = false;
    $scope.save=function(){
    	if (typeof currentFarmerwiseData[0]!="undefined") {
	       	if (currentFarmerwiseData[0].data.land_details.submitted){
	       		if(MainService.area_not_filled_new1($scope.soil_prep_cost_obj.activities,"farmArea",$scope,msg_area_not_filled)){
       		    	MainService.save($scope.soil_prep_cost_obj, 2,$scope);
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
    	if($scope.soil_prep_cost_obj.submitted)
			$scope.flag = true;
			MainService.hide_spinner();
 	})    
    $scope.submit=function(){
    	if(saveFlag){
    		if(MainService.area_not_filled_new1($scope.soil_prep_cost_obj.activities,"farmArea",$scope,msg_area_not_filled)){
	    	   MainService.submit($scope.soil_prep_cost_obj, 2,$scope);
	        }
	    }else{
			MainService.alertBox("Please save before submitting.", $scope);
		}	
    };	

	$scope.moaArray = [];
	db.get(master_data_doc_name).then(function(doc) {
		$http.get('soil_preparation.json').	
			success(function(data){
	            var landPreparationMonthTypeId=data.soil_preparation_cost.landPreparationMonthTypeId;
					angular.forEach(doc.data.typeDetailModels, function(value, key){

						if (landPreparationMonthTypeId==value.typeId) {
							$scope.moaArray.push({
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


	$scope.moaClicked = function(f_Obj,s_Obj){
		if(!$scope.flag){
			var index1=$scope.soil_prep_cost_obj.activities.indexOf(f_Obj);
			var index2=$scope.soil_prep_cost_obj.activities[""+index1+""].details.indexOf(s_Obj);
			MainService.dropdownRefresh(index1,index2,"moaArray","soil_prep_cost_obj",$scope);
			var sos_popup = $ionicPopup.show({
	    		templateUrl: "templates/month_of_activityPopup.html",
	    		title: 'Month of Activity',
	    		// subTitle: 'Please use normal things',
	    		scope: $scope,
	    		buttons: [
	    			{
	     				text: 'Ok',
	     				type: 'button-positive',
	     				onTap: function(e) {
	                  		angular.forEach($scope.moaArray, function(value, key){
									if (value.checked==true) {
								     $scope.soil_prep_cost_obj.activities[""+index1+""].details[""+index2+""].value=value.name;
								     $scope.soil_prep_cost_obj.activities[""+index1+""].details[""+index2+""].id=value.typeDetailId;
									}
							});
	     				}	
	   				}
	 			]
	  		});
		}
	};

	$scope.changeMoa = function(status_index){
      angular.forEach($scope.moaArray,function(f_value,f_key){
      	if (status_index==f_key) {
      	$scope.moaArray[f_key].checked = true;
        }else{$scope.moaArray[f_key].checked = false;}
      })
	};

	$scope.flag_area = function(f_Obj,s_Obj,val){
	    var index1=$scope.soil_prep_cost_obj.activities.indexOf(f_Obj);
	    var index2=$scope.soil_prep_cost_obj.activities[""+index1+""].details.indexOf(s_Obj);
  		if(!val){
  			$scope.soil_prep_cost_obj.activities[""+index1+""].details[1].status=true;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[1].value="Tap";
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[2].status=true;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[2].value=" ";
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[4].status=true;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[4].value=0;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[5].status=true;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[5].value=" ";
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[6].status=true;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[6].value=" ";
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[7].status=true;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[7].value=" ";
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[9].status=true;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[9].value=" ";
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[10].status=true;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[10].value=" ";
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[11].status=true;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[11].value=" ";
        }else{
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[1].status=false;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[2].status=false;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[4].status=false;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[5].status=false;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[6].status=false;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[7].status=false;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[9].status=false;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[10].status=false;
	        $scope.soil_prep_cost_obj.activities[""+index1+""].details[11].status=false;
  	    }
	};

	/*
	@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
	this function disable this process if it was synced in past.
	*/
	MainService.setFlagForSyncedFarmer($scope, landPreparationDetailProcessId);
	
}])

