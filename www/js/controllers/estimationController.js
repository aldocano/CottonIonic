angular.module('EstimationController', [])
.controller('EstimationController', ['$scope', 'MainService', '$http', '$stateParams', '$ionicPopup', '$filter',
 function($scope, MainService, $http, $stateParams, $ionicPopup, $filter){
 	$scope.estimation_obj = MainService.getForm_data();
 	if($scope.estimation_obj.submitted === undefined){
		db.get(master_data_doc_name).then(function(doc) {
			$http.get('estimation.json').success(function(data){
				$scope.estimation_obj = data.estimation;
				$scope.estimation_obj.farmerId = parseInt($stateParams.farmerId);
				$scope.estimation_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);

				// getting area details from land details
                MainService.getlandDetailsData($scope.estimation_obj.farmerId,$scope.estimation_obj.farmerTimePeriodId);
				
				var activities = data.estimation.activities;		
				var details = data.estimation.details;
				var child_details = data.estimation.child_details;
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
				$scope.estimation_obj.activities = [];
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
					$scope.estimation_obj.activities.push({
						name: activities[i].name,
						details: details_here
					});
				}
				MainService.checkOrganicArea($scope.estimation_obj.farmerId);

			}).error(function(err){
			//error fetching json
			console.error(err.message);
		});
		}).catch(function (err) {
		  console.log(err);
		});
	}else if($scope.estimation_obj.submitted === false){
		MainService.checkOrganicArea($scope.estimation_obj.farmerId);
    	//getting area details from land details
        MainService.getlandDetailsData($scope.estimation_obj.farmerId,$scope.estimation_obj.farmerTimePeriodId);
    	$scope.flag = false;
    }else{
    	$scope.flag = true;
    }


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
	$scope.add = function(){
		$http.get('estimation.json').	
		success(function(data){
			var estimation_obj2 = data.estimation;
			
			estimation_obj2.farmerId = parseInt($stateParams.farmerId);
			estimation_obj2.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);

			var activities = data.estimation.activities;		
			var details = data.estimation.details;
			var child_details = data.estimation.child_details;
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
			estimation_obj2.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name += ($scope.estimation_obj.activities.length + 1);
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
				estimation_obj2.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}

			$scope.estimation_obj.activities.push(estimation_obj2.activities[0]);			
			$scope.shownGroup = estimation_obj2.activities[0];
		}).
		error(function(err){
			//error fetching json
			console.error(err.message);
		});	
	};
	 $scope.remove = function(){
        var click=true;
  		if($scope.estimation_obj.activities.length != 1){
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
                    		$scope.estimation_obj.activities.splice($scope.estimation_obj.activities.length-1, 1);
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
  	$scope.floatValidation=function(f_obj,s_obj,val){
       MainService.floatValidation(f_obj,s_obj,val,$scope,"estimation_obj");
    };
    // fetch land details data
    var areaValue,areaOValue;
    $scope.$on('landdetail_result', function(event, data) {
    	areaValue=data[0].value;
    	areaOValue=data[1].value;
 	})
    $scope.areaCompareValidation=function(f_obj,s_obj,key,val){
     	MainService.areaCompareValidation(f_obj,s_obj,key,val,$scope,"estimation_obj","landArea",areaOValue);
    }
 	$scope.integerValidation = function (key1,key2,val,type){
    	if(val !== null && val != " " && val != ""){
		 		var index1=$scope.estimation_obj.activities.indexOf(key1);
			    var index2=$scope.estimation_obj.activities[""+index1+""].details.indexOf(key2);
			    if (typeof val!="undefined"){
			    if (MainService.validInteger(val)){
			        if (typeof val!="undefined"){
			    		$scope.estimation_obj.activities[""+index1+""].details[""+index2+""].value=val;
			    	}else{
			    		MainService.alertBox(msg_labour_related_num_field,$scope);
			    		$scope.estimation_obj.activities[""+index1+""].details[""+index2+""].value="";
			    	}
			    }else{
			    	MainService.alertBox(three_digit_validation,$scope);
			    	$scope.estimation_obj.activities[""+index1+""].details[""+index2+""].value=null;
			    }
			}else{
				MainService.alertBox(three_digit_validation,$scope);
			    $scope.estimation_obj.activities[""+index1+""].details[""+index2+""].value=null;
			}
	 	}    
 	}    
    // for fetching select option from master table
  	$scope.estimationNOC=[];
  	$scope.estimationEstimated=[];
  	$scope.estimationActual=[];
  	var typeDetailModels_ordered = {};
  	db.get(master_data_doc_name).then(function(doc) {
		$http.get('estimation.json').
			success(function(data){
				typeDetailModels_ordered = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
				// doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
	            var estimationNOCTypeId=data.estimation.estimationNameOfCropTypeId;
	            var estimationEstimatedTypeId=data.estimation.estimationMOHEstimatedTypeId;
	            var estimationCSTypeId=data.estimation.estimationCropStatusTypeId;
	            var other = {
		        	typeDetailId: 0,
					name: "",
					checked:false
		        };
		        
				angular.forEach(typeDetailModels_ordered, function(value, key){
					if(estimationNOCTypeId==value.typeId){
						if(value.typeDetailName === "Others"){
							other.typeDetailId = value.typeDetailId;
							other.name = value.typeDetailName;
						}else{	
						$scope.estimationNOC.push({
					    	typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
						});}
					}
				});
				$scope.estimationNOC.push(other);
				angular.forEach(doc.data.typeDetailModels, function(value, key){
				if(estimationEstimatedTypeId == value.typeId){
						$scope.estimationEstimated.push({
							typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
						});
						$scope.estimationActual.push({
							typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
						});
					}
				});

                angular.forEach($scope.estimation_obj.activities, function(value, key){
                	 angular.forEach(value.details, function(value_s, key_s){
                	 	if (value_s.type=="4.1") {
                	 		if (value_s.value!="Tap" && value_s.value!=" ") {
	                	 		angular.forEach($scope.estimationNOC,function(value_t,key_t ) {
	                	 			if (value_t.name != value_s.value) {
	                	 				var results = $filter('filter')($scope.estimationNOC, {name : value_s.value}, true);
	                                 if (results.length<1) {
		     			               $scope.estimationNOC.push({"typeDetailId":0,"name":value_s.value,"checked":false})
	                	 			  }
	                	 			}
								});
                            }
                	 	}
                    });
                });
	        })
	}).catch(function (err) {
		console.log(err);
	});

	$scope.otherArrayForNOC = {};
	$scope.getChange = function(f_Obj,s_Obj,clickName, val){
		//estimated, actual, noc, cs
		var index1=$scope.estimation_obj.activities.indexOf(f_Obj);
	    var index2=$scope.estimation_obj.activities[""+index1+""].details.indexOf(s_Obj);
	    var estimatedFiltData, actualFiltData, nocFiltData, csFiltData;
	    if(clickName=="noc"){
	 		var invalidEntries = 0;
		    nocFiltData = $scope.estimationNOC.filter(function(obj) { if (val == obj.name ) {
			    return true;
			}else{
			    invalidEntries++;
			    return false;
			} });
	        $scope.estimation_obj.activities[""+index1+""].details[""+index2+""].value=val;
	        $scope.estimation_obj.activities[""+index1+""].details[""+index2+""].id=nocFiltData[0].typeDetailId;
		}else if(clickName=="estimated"){
	 		var invalidEntries = 0;
		    estimatedFiltData = $scope.estimationEstimated.filter(function(obj) { if (val == obj.name ) {
			    return true;
			}else{
			    invalidEntries++;
			    return false;
			} });
	        $scope.estimation_obj.activities[""+index1+""].details[""+index2+""].value=val;
	        $scope.estimation_obj.activities[""+index1+""].details[""+index2+""].id=estimatedFiltData[0].typeDetailId;
		}else if(clickName=="actual"){
	 		var invalidEntries = 0;
		    actualFiltData = $scope.estimationActual.filter(function(obj) { if (val == obj.name ) {
			    return true;
			}else{
			    invalidEntries++;
			    return false;
			} });
	        $scope.estimation_obj.activities[""+index1+""].details[""+index2+""].value=val;
	        $scope.estimation_obj.activities[""+index1+""].details[""+index2+""].id=actualFiltData[0].typeDetailId;
		}
		if(s_Obj.value == 'Others'){
			var pop = $ionicPopup.show({
		     		template: '<input type="text" ng-pattern="/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/" ng-model="otherArrayForNOC.othersSpecify" style="background: #45BFAE">',
				    title: 'Please Specify',
				    scope: $scope,
		     		buttons: [ { text: 'Cancel',
		     			  onTap:function(e){
                                    $scope.estimation_obj.activities[""+index1+""].details[""+index2+""].id =0;
				     				$scope.estimation_obj.activities[""+index1+""].details[""+index2+""].value = "";
				     				$scope.otherArrayForNOC.othersSpecify = "";
		     				 }},{
		     			text: 'Ok',
		     			onTap:function(e){
	              		    if (typeof $scope.otherArrayForNOC.othersSpecify=="undefined" || $scope.otherArrayForNOC.othersSpecify=="" || $scope.otherArrayForNOC.othersSpecify=="Others") {
					            $scope.otherArrayForNOC.othersSpecify = "";
					            MainService.alertBox(msg_others_mandatory,$scope); 
		                        e.preventDefault();	
		     				}else{
		     				var str =$scope.otherArrayForNOC.othersSpecify.toString();
				            var n_count = str.length;
						       if (n_count<50) {
		                          if (clickName=="noc") {
				     				$scope.estimation_obj.activities[""+index1+""].details[""+index2+""].id = nocFiltData[0].typeDetailId;
				     				$scope.estimation_obj.activities[""+index1+""].details[""+index2+""].value = $scope.otherArrayForNOC.othersSpecify;
				     			    $scope.estimationNOC.push({"typeDetailId":nocFiltData[0].typeDetailId,"name":$scope.otherArrayForNOC.othersSpecify,"checked":false})
				     				$scope.otherArrayForNOC.othersSpecify = "";
				     				pop.close();
				     			  }
				     			}else{
				     				$scope.otherArrayForNOC.othersSpecify="";
						            MainService.alertBox("This field accepts upto 50 characters.",$scope); 
		                            e.preventDefault();
				     			}
				     		}
		     				
		     			
		     			}
		     		}]
		     	})
		}
	}
	

	var saveFlag = false;
	$scope.save=function(){
		if (typeof currentFarmerwiseData[0]!="undefined") {
	       	if (currentFarmerwiseData[0].data.land_details.submitted){
	       		if(MainService.totalSum($scope.estimation_obj.activities,"landArea",areaOValue,$scope)){
	       			if(MainService.area_not_filled_new($scope.estimation_obj.activities,"landArea",$scope,msg_farm_area_not_filled)){
						MainService.save($scope.estimation_obj, 9,$scope);
					    saveFlag = true;
					}
				}
			}else{
				MainService.alertBox(msg_check_for_submit,$scope);
		    }
		}else{
			MainService.alertBox(msg_check_for_submit,$scope);
	    }	
	};

	$scope.$on('eventFired', function(event, data) {
       if($scope.estimation_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })

    $scope.submit=function(){
    	if(saveFlag){
    		if(MainService.totalSum($scope.estimation_obj.activities,"landArea",areaOValue,$scope)){
       			if(MainService.area_not_filled_new($scope.estimation_obj.activities,"landArea",$scope,msg_farm_area_not_filled)){
		             MainService.submit($scope.estimation_obj, 9,$scope);
		         }
    		}
    	}else{
			MainService.alertBox("Please save before submitting.", $scope);
		}
    };
	/*
	@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
	this function disable this process if it was synced in past.
	*/
	MainService.setFlagForSyncedFarmer($scope, estimationOfProductionProcessId);    
 }]) 