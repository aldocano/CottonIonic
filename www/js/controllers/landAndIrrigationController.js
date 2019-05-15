angular.module('LandAndIrrigationController', [])
.controller('LandAndIrrigationController', ['$scope', 'MainService', '$http', '$stateParams', '$ionicPopup', '$filter',
 function($scope, MainService, $http, $stateParams, $ionicPopup, $filter){
	$scope.land_and_irrigation_details_obj = MainService.getForm_data();
	if($scope.land_and_irrigation_details_obj.submitted === undefined){
		db.get(master_data_doc_name).then(function(doc) {
			$http.get('land_and_irrigation_details.json').success(function(data){
				$scope.land_and_irrigation_details_obj = data.land_and_irrigation_details;
				$scope.land_and_irrigation_details_obj.farmerId = parseInt($stateParams.farmerId);
				$scope.land_and_irrigation_details_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);

				// getting area details from land details
                MainService.getlandDetailsData($scope.land_and_irrigation_details_obj.farmerId,$scope.land_and_irrigation_details_obj.farmerTimePeriodId);
				
				var activities = data.land_and_irrigation_details.activities;		
				var details = data.land_and_irrigation_details.details;
				var child_details = data.land_and_irrigation_details.child_details;
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
				$scope.land_and_irrigation_details_obj.activities = [];
				for(var i = 0; i < activities.length;i++){
					activities[i].name = activities[i].name + (i+1);
					var details_here = [];
					for(var j = 0;j <data.length;j++){
						details_here.push({
							key:data[j].key,
							name: data[j].name,
							type: data[j].type,
							value: data[j].value,
							is_parent: data[j].is_parent
						});
					}
					$scope.land_and_irrigation_details_obj.activities.push({
						name: activities[i].name,
						details: details_here
					});
				}
				MainService.checkOrganicArea($scope.land_and_irrigation_details_obj.farmerId);

			}).error(function(err){
			//error fetching json
			console.error(err.message);
		});
		}).catch(function (err) {
		  console.log(err);
		});
	}
	else if($scope.land_and_irrigation_details_obj.submitted === false){
		MainService.checkOrganicArea($scope.land_and_irrigation_details_obj.farmerId);
    	//getting area details from land details
        MainService.getlandDetailsData($scope.land_and_irrigation_details_obj.farmerId,$scope.land_and_irrigation_details_obj.farmerTimePeriodId);
    	$scope.flag = false;
    }else{
    	$scope.flag = true;
    }

	$scope.add = function(){
		$http.get('land_and_irrigation_details.json').	
		success(function(data){
			var land_and_irrigation_details_obj2 = data.land_and_irrigation_details;
			
			land_and_irrigation_details_obj2.farmerId = parseInt($stateParams.farmerId);
			land_and_irrigation_details_obj2.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);

			var activities = data.land_and_irrigation_details.activities;		
			var details = data.land_and_irrigation_details.details;
			var child_details = data.land_and_irrigation_details.child_details;
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
			land_and_irrigation_details_obj2.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name += ($scope.land_and_irrigation_details_obj.activities.length + 1);
				var details_here = [];
				for(var j = 0;j <data.length;j++){
					details_here.push({
						key:data[j].key,
						name: data[j].name,
						type: data[j].type,
						value: data[j].value,
						is_parent: data[j].is_parent
					});
				}
				land_and_irrigation_details_obj2.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}

			$scope.land_and_irrigation_details_obj.activities.push(land_and_irrigation_details_obj2.activities[0]);			
			$scope.shownGroup = land_and_irrigation_details_obj2.activities[0];
		}).
		error(function(err){
			//error fetching json
			console.error(err.message);
		});	
	};

  	$scope.remove = function(){
        var click=true;
  		if($scope.land_and_irrigation_details_obj.activities.length != 1){
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
                    		$scope.land_and_irrigation_details_obj.activities.splice($scope.land_and_irrigation_details_obj.activities.length-1, 1);
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

	$scope.toggleGroup = function(activity) {
		if ($scope.isGroupShown(activity))
	  		$scope.shownGroup = null;
		else
	  		$scope.shownGroup = activity;
  	};
  	$scope.isGroupShown = function(activity) {
    	return $scope.shownGroup === activity;
  	};

  	//responsive function
  	var style_Obj=MainService.ScreenSize();
	if (typeof  style_Obj!="undefined") {
		$scope.popup_Style=style_Obj.Popup;
		$scope.content_Style=style_Obj.Content;
		$scope.title_Style=style_Obj.Title;
	}

	$scope.floatValidation=function(f_obj,s_obj,val){
       MainService.floatValidation(f_obj,s_obj,val,$scope,"land_and_irrigation_details_obj");
    };
    // fetch land details data
    var areaValue,areaOValue;
    $scope.$on('landdetail_result', function(event, data) {
    	areaValue=data[0].value;
    	areaOValue=data[1].value;
 	})
    $scope.areaCompareValidation=function(f_obj,s_obj,key,val){
     	MainService.areaCompareValidation(f_obj,s_obj,key,val,$scope,"land_and_irrigation_details_obj","landArea",areaOValue);
    }
	// for fetching select option from master table
  	$scope.landAndIrrigationDetailsSeason=[];
  	$scope.landAndIrrigationDetailsSourceOfIrrigation=[];
  	$scope.landAndIrrigationDetailsTypeOfIrrigation=[];
  	$scope.landAndIrrigationDetailsMainCrop=[];
  	$scope.landAndIrrigationDetailsIntercrop=[];
	db.get(master_data_doc_name).then(function(doc) {
		$http.get('land_and_irrigation_details.json').
			success(function(data){
				doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
	            var landAndIrrigationDetailsSeasonTypeId=data.land_and_irrigation_details.landAndIrrigationDetailsSeasonTypeId;
	            var landAndIrrigationDetailsSourceOfIrrigationTypeId=data.land_and_irrigation_details.landAndIrrigationDetailsSourceOfIrrigationTypeId;
	            var landAndIrrigationDetailsTypeOfIrrigationTypeId=data.land_and_irrigation_details.landAndIrrigationDetailsTypeOfIrrigationTypeId;
	            var landAndIrrigationDetailsMainCropTypeId=data.land_and_irrigation_details.landAndIrrigationDetailsMainCropTypeId;
	            var landAndIrrigationDetailsIntercropTypeId=data.land_and_irrigation_details.landAndIrrigationDetailsIntercropTypeId;
		        var other = {
		        	typeDetailId: 0,
					name: "",
					checked:false
		        };
		        var other1 = {
		        	typeDetailId: 0,
					name: "",
					checked:false
		        };
		        var none = {
		        	typeDetailId: 0,
		        	name:"",
		        	checked:false
		        };
				angular.forEach(doc.data.typeDetailModels, function(value, key){
					if(landAndIrrigationDetailsSeasonTypeId==value.typeId){
						$scope.landAndIrrigationDetailsSeason.push({
					    	typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
						});
					}else if(landAndIrrigationDetailsSourceOfIrrigationTypeId == value.typeId){
						if(value.typeDetailName === "None"){
							none.typeDetailId = value.typeDetailId;
							none.name = value.typeDetailName;
						}else{
						$scope.landAndIrrigationDetailsSourceOfIrrigation.push({
							typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
						});}
					}else if(landAndIrrigationDetailsTypeOfIrrigationTypeId == value.typeId){
						$scope.landAndIrrigationDetailsTypeOfIrrigation.push({
							typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
						});
					}else if(landAndIrrigationDetailsMainCropTypeId == value.typeId){
						if(value.typeDetailName === "Others"){
							other.typeDetailId = value.typeDetailId;
							other.name = value.typeDetailName;
							other1.typeDetailId = value.typeDetailId;
							other1.name = value.typeDetailName;
						}else{
						$scope.landAndIrrigationDetailsMainCrop.push({
							typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
						});
						$scope.landAndIrrigationDetailsIntercrop.push({
							typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
						});}
					}
				});
				$scope.landAndIrrigationDetailsMainCrop.push(other);
				$scope.landAndIrrigationDetailsIntercrop.push(other1);
				$scope.landAndIrrigationDetailsSourceOfIrrigation.push(none);
		        angular.forEach($scope.land_and_irrigation_details_obj.activities, function(value, key){
	            	angular.forEach(value.details, function(value_s, key_s){
	            	 	if (value_s.type=="4.2") {
	            	 		if (value_s.value!=" ") {
	                	 		angular.forEach($scope.landAndIrrigationDetailsMainCrop,function(value_t,key_t ) {
	                	 			if (value_t.name != value_s.value) {
	                	 				var results = $filter('filter')($scope.landAndIrrigationDetailsMainCrop, {name : value_s.value}, true);
	                                 if (results.length<1) {
		     			               $scope.landAndIrrigationDetailsMainCrop.push({"typeDetailId":0,"name":value_s.value,"checked":false})
	                	 			  }
	                	 			}
								});
	                        }
	            	 	}else if (value_s.type=="4.3") {
	            	 		if (value_s.value!=" ") {
	                	 		angular.forEach($scope.landAndIrrigationDetailsIntercrop,function(value_t,key_t ) {
	                	 			if (value_t.name != value_s.value) {
	                	 				 var results = $filter('filter')($scope.landAndIrrigationDetailsIntercrop, {name : value_s.value}, true);
		                                 if (results.length<1) {
			     			               $scope.landAndIrrigationDetailsIntercrop.push({"typeDetailId":0,"name":value_s.value,"checked":false})
		                	 		      }
		                	 		}
								});
	                        }
	            	 	}
	                });
		        });

            });
	}).catch(function (err) {
		console.log(err);
	});
	//for dropdown dependancy of type of irrigation on source of irrigation(None)
	$scope.otherArrayForMC = {};
	$scope.getChange = function(f_Obj,s_Obj,clickName, val){
		
		//season, mc, ic, soi, toi
		var index1=$scope.land_and_irrigation_details_obj.activities.indexOf(f_Obj);
	    var index2=$scope.land_and_irrigation_details_obj.activities[""+index1+""].details.indexOf(s_Obj);
	    var seasonFiltData, mainCropFiltData, interCropFiltData, soiFiltData, toiFiltData;
	    var soi_ids = "";
	    var toi_ids = "";
	 	if(clickName=="season"){
	    	var invalidEntries = 0;
		    seasonFiltData = $scope.landAndIrrigationDetailsSeason.filter(function(obj) { if (val == obj.name ) {
			    return true;
			}else{
			    invalidEntries++;
			    return false;
			} });
	        $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value=val;
	        $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].id=seasonFiltData[0].typeDetailId;
		}else if(clickName=="mc"){
			var invalidEntries = 0;
			mainCropFiltData = $scope.landAndIrrigationDetailsMainCrop.filter(function(obj) { if (val == obj.name ) {
			    return true;
			}else{
			    invalidEntries++;
			    return false;
			} });
			if($scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value == $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[4].value){
				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value = "Select";
				MainService.alertBox(msg_same_maincrop_and_intercrop, $scope);
			}else{
	        $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value=val;
	        $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].id=mainCropFiltData[0].typeDetailId;
			}
		}else if(clickName=="ic"){
			var invalidEntries = 0;
			interCropFiltData = $scope.landAndIrrigationDetailsIntercrop.filter(function(obj) { if (val == obj.name ) {
			    return true;
			}else{
			    invalidEntries++;
			    return false;
			} });
			if($scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value == $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[3].value){
				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value = "Select";
				MainService.alertBox(msg_same_maincrop_and_intercrop, $scope);
			}else{
	        $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value=val;
	        $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].id=interCropFiltData[0].typeDetailId;
			}	
		}else if(clickName=="soi"){
			if(typeof val == "undefined"){
				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[6].value = [];
				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[6].status = false;
			}
			var invalidEntries = 0;
			var arr = [];
			for(var i = 0; i < val.length; i++){
				soiFiltData = $scope.landAndIrrigationDetailsSourceOfIrrigation.filter(function(obj) { if (val[i] == obj.name ) {
					arr.push({name:val[i],id:obj.typeDetailId});
					return true;
				}else{
			    	invalidEntries++;
			    	return false;
				} });
			}
			for(var j = 0; j < arr.length; j++){
				soi_ids+=arr[j].id+",";
			}
			soi_ids = soi_ids.substring(0, soi_ids.length-1);
			if(soi_ids.includes("291"))
				soi_ids = "291";
	        $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value=val;
			$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].id=soi_ids;

			if(val.includes("None")){
				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value.splice(0,$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value.length);
				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value.push("None");
				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[6].value = [];
				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[6].value.push("Rain-fed");
				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[6].id = "106";
				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[6].status =true;
			}else{
				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[6].value = [];
				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[6].id = "";
				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[6].status = false;
			}
		}else if(clickName=="toi"){
			var invalidEntries = 0;
			var arr1 = [];
			for(var i = 0; i < val.length; i++){
				toiFiltData = $scope.landAndIrrigationDetailsTypeOfIrrigation.filter(function(obj) { if (val[i] == obj.name ) {
					arr1.push({name:val[i],id:obj.typeDetailId});
					return true;
				}else{
			    	invalidEntries++;
			    	return false;
				} });
			}
			for(var j = 0; j < arr1.length; j++){
				toi_ids+=arr1[j].id+",";
			}
			toi_ids = toi_ids.substring(0, toi_ids.length-1);
	        $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value=val;
	        $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].id=toi_ids;
		}
		if(s_Obj.value == 'Others'){
			var pop = $ionicPopup.show({
		     		template: '<input type="text" ng-pattern="/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/" ng-model="otherArrayForMC.othersSpecify" style="background: #45BFAE">',
				    title: 'Please Specify',
				    scope: $scope,
		     		buttons: [ { text: 'Cancel',
		     			  onTap:function(e){
                                    $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].id =0;
				     				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value = "";
				     				$scope.otherArrayForMC.othersSpecify = "";
		     				 }},{
		     			text: 'Ok',
		     			onTap:function(e){
	              		    if (typeof $scope.otherArrayForMC.othersSpecify=="undefined" || $scope.otherArrayForMC.othersSpecify=="" || $scope.otherArrayForMC.othersSpecify=="Others") {
					            $scope.otherArrayForMC.othersSpecify="";
					            MainService.alertBox(msg_others_mandatory,$scope); 
		                        e.preventDefault();	
		     				}else{
		     				var str =$scope.otherArrayForMC.othersSpecify.toString();
				            var n_count = str.length;
						       if (n_count<50) {
		                          if (clickName=="mc") {
		                          	if($scope.otherArrayForMC.othersSpecify.toLowerCase() == $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[index2+1].value.toLowerCase()){
				     			  		MainService.alertBox(msg_same_maincrop_and_intercrop, $scope);
				     			  		$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value = "Select";
				     			  		$scope.otherArrayForMC.othersSpecify = "";
				     			  	}else{
					     				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].id = mainCropFiltData[0].typeDetailId;
					     				$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value = $scope.otherArrayForMC.othersSpecify;
					     			    $scope.landAndIrrigationDetailsMainCrop.push({"typeDetailId":mainCropFiltData[0].typeDetailId,"name":$scope.otherArrayForMC.othersSpecify,"checked":false})
					     				$scope.otherArrayForMC.othersSpecify = "";
					     				pop.close();
				     				}
				     			  }else{
				     			  	if($scope.otherArrayForMC.othersSpecify.toLowerCase() == $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[index2-1].value.toLowerCase()){
				     			  		MainService.alertBox(msg_same_maincrop_and_intercrop, $scope);
				     			  		$scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value = "Select";
				     			  		$scope.otherArrayForMC.othersSpecify = "";
				     			  	}else{
					                    $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].id = interCropFiltData[0].typeDetailId;
					                    $scope.land_and_irrigation_details_obj.activities[""+index1+""].details[""+index2+""].value = $scope.otherArrayForMC.othersSpecify;
					     			    $scope.landAndIrrigationDetailsIntercrop.push({"typeDetailId":interCropFiltData[0].typeDetailId,"name":$scope.otherArrayForMC.othersSpecify,"checked":false})
					     				$scope.otherArrayForMC.othersSpecify = "";
					     				pop.close();
				     				}
				     			  }
				     			}else{
				     				$scope.otherArrayForMC.othersSpecify="";
						            MainService.alertBox("This field accepts upto 50 characters.",$scope); 
		                            e.preventDefault();
				     			}
				     		}
		     				
		     			
		     			}
		     		}]
		     	})
		}

		if($("#soi_id").context.activeElement[5].selected == true){
			for(var i=0; i<$("#soi_id").context.activeElement.length;i++){
				$("#soi_id").context.activeElement[i].selected = false;
			}
			$("#soi_id").context.activeElement[5].selected = true;
		}
	};
	var saveFlag = false;
	$scope.save=function(){
		if (typeof currentFarmerwiseData[0]!="undefined") {
	       	if (currentFarmerwiseData[0].data.land_details.submitted){
	       		if(MainService.area_not_filled_new($scope.land_and_irrigation_details_obj.activities,"landArea",$scope,msg_land_area_not_filled)){
					MainService.save($scope.land_and_irrigation_details_obj, 7,$scope);
					saveFlag = true;
				}	
			}else{
				MainService.alertBox(msg_check_for_submit,$scope);
		    }
		}else{
			MainService.alertBox(msg_check_for_submit,$scope);
	    }	
	};

	$scope.$on('eventFired', function(event, data) {
       if($scope.land_and_irrigation_details_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })

    $scope.submit=function(){
    	if(saveFlag){
	      if(MainService.area_not_filled_new($scope.land_and_irrigation_details_obj.activities,"landArea",$scope,msg_land_area_not_filled)){
    		MainService.submit($scope.land_and_irrigation_details_obj, 7,$scope);
    	  }
    	}else{
			MainService.alertBox("Please save before submitting.", $scope);
		}
    };
 	/*
	@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
	this function disable this process if it was synced in past.
	*/
	MainService.setFlagForSyncedFarmer($scope, landAndIrrigationDetailProcessId);  	
}]);