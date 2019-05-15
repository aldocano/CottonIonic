angular.module("LaborsRecordController", []).
controller('LaborsRecordController', ['$scope','MainService', '$rootScope', '$ionicPopup', '$location','$cordovaToast','$filter','$http','$stateParams','$timeout',
	function($scope, MainService, $rootScope, $ionicPopup, $location, $cordovaToast, $filter,$http,$stateParams,$timeout){
	
    //// responsive function called
    var style_Obj=MainService.ScreenSize();
    if (typeof  style_Obj!="undefined") {
	        $scope.popup_Style=style_Obj.Popup;
	        $scope.content_Style=style_Obj.Content;
	        $scope.title_Style=style_Obj.Title;
    }
	//// fetch land details data
    var areaValue,areaOValue;
    $scope.$on('landdetail_result', function(event, data) {
    	areaValue=data[0].value;
    	areaOValue=data[1].value;
 	})
     //// positive number validation
    $scope.integerValidation=function(f_obj,s_obj,t_obj,val){
       MainService.integerValidationSub(f_obj,s_obj,t_obj,val,$scope,"labors_record_obj");
    }
    $scope.integerValidation_3_digit=function(f_obj,s_obj,t_obj,val){
       MainService.integerValidationSub_3_digit(f_obj,s_obj,t_obj,val,$scope,"labors_record_obj");
    }

    $scope.floatValidation=function(f_obj,s_obj,t_obj,val){
       MainService.floatValidation_for_child_3_digit(f_obj,s_obj,t_obj,val,$scope,"labors_record_obj");
    }
     //// Area compare validation function called
    $scope.areaCompareValidation=function(f_obj,s_obj,t_obj,key,val){
        MainService.areaCompareValidation_for_child(f_obj,s_obj,t_obj,key,val,$scope,"labors_record_obj","farmArea",areaOValue);
    }

    $scope.labors_record_obj = MainService.getForm_data();
      if($scope.labors_record_obj.submitted === undefined){	
     	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		db.get(master_data_doc_name).then(function(doc) {
		$http.get('labors_record.json').	
		success(function(data){
            var typeId=data.labors_record.farmActivity;

            var landTypeId=data.labors_record.landTypeId;
            var seedTypeId=data.labors_record.seedTypeId;
            var fertilizerTypeId=data.labors_record.fertilizerTypeId;
            var biopesticideTypeId=data.labors_record.biopesticideTypeId;
            var irigationTypeId=data.labors_record.irigationTypeId;
            var weedingTypeId=data.labors_record.weedingTypeId;
            var pickingTypeId=data.labors_record.pickingTypeId;

            var landpreparationPracticeTypeId=data.labors_record.landpreparationPracticeTypeId
            var seedPracticesTypeId=data.labors_record.seedPracticesTypeId
            var fertilizerPracticesTypeId=data.labors_record.fertilizerPracticesTypeId
            var biopesticidePracticesTypeId=data.labors_record.biopesticidePracticesTypeId
            var irigationPracticesTypeId=data.labors_record.irigationPracticesTypeId
            var weedingPracticesTypeId=data.labors_record.weedingPracticesTypeId
            var pickingPracticesTypeId=data.labors_record.pickingPracticesTypeId
           			
			$scope.labors_record_obj = data.labors_record;
			$scope.labors_record_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.labors_record_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
         
            MainService.getlandDetailsData($scope.labors_record_obj.farmerId,$scope.labors_record_obj.farmerTimePeriodId);

			var details = data.labors_record.details;
			var child_details = data.labors_record.child_details;
			var data = [];
			var child_data = [];

            $scope.labors_record_obj.activities=[];
			angular.forEach(doc.data.typeDetailModels, function(value, key){
				var lpTypeId,spTypeId,fpTypeId,bpTypeId,ipTypeId,wpTypeId,ppTypeId;
              	if (typeId==value.typeId) {
					if (value.typeDetailId==landTypeId) {
						lpTypeId=landpreparationPracticeTypeId;
					}else if (value.typeDetailId==seedTypeId) {
            			lpTypeId=seedPracticesTypeId;
            		}else if (value.typeDetailId==fertilizerTypeId) {
            			lpTypeId=fertilizerPracticesTypeId;
            		}else if (value.typeDetailId==biopesticideTypeId) {
            			lpTypeId=biopesticidePracticesTypeId;
            		}else if (value.typeDetailId==irigationTypeId) {
            			lpTypeId=irigationPracticesTypeId;
            		}else if (value.typeDetailId==weedingTypeId) {
            			lpTypeId=weedingPracticesTypeId;
            		}else {
            			lpTypeId=pickingPracticesTypeId;
            		}
					$scope.labors_record_obj.activities.push({
				    typeDetailId: value.typeDetailId,
					name: value.typeDetailName,
					id:lpTypeId
					});
				}

			});
			var activities = $scope.labors_record_obj.activities;		

			for(var i = 0; i < details.length;i++){
				data.push({
					key:details[i].key,
					name: details[i].name,
					type: details[i].has_child?0:details[i].type,
					value: details[i].value?details[i].value:0,
					is_parent: true,
					child_details:details[i].child_details
				}); 
				for(var j = 0; j < child_details.length; j++){
					if(details[i].name == child_details[j].parent){
						child_data.push({
							name: child_details[j].name,
							type: child_details[j].type,
							value: child_details[j].value?child_details[j].value:0,
							is_parent: false
						}); 
					}
				}

			}
			$scope.labors_record_obj.activities = [];
			for(var i = 0; i < activities.length;i++){
				var childName = (i+1);
				var details_here = [];
				for(var j = 0;j <data.length;j++){
					details_here.push({
						key:data[j].key,
						name: data[j].name,
						type: data[j].type,
						value: data[j].value,
						is_parent: data[j].is_parent,
						child_details:data[j].child_details
					});
				}
				$scope.labors_record_obj.activities.push({
					name: activities[i].name,
					id:activities[i].typeDetailId,
					s_id:activities[i].id,
					show:false,
					details: details_here,
				});
			}
            MainService.checkOrganicArea($scope.labors_record_obj.farmerId);
		}).
		error(function(err){
		//error fetching json
			console.error(err.message);
		});	
	}).catch(function (err) {
		  console.log(err);
		});
    }else if($scope.labors_record_obj.submitted === false){
    	//// getting area details from land details
    	MainService.checkOrganicArea($scope.labors_record_obj.farmerId);
        MainService.getlandDetailsData($scope.labors_record_obj.farmerId,$scope.labors_record_obj.farmerTimePeriodId);
    	$scope.flag = false;
    }else{
    	$scope.flag = true;
    }
  	 $scope.addSub = function(f_Obj,s_Obj){
  		$http.get('labors_record.json').	
		success(function(data){
            var index1=$scope.labors_record_obj.activities.indexOf(f_Obj);
			var details = data.labors_record.add_chlid_details;
             var childDetails=[];
             angular.forEach(details, function(value, key){
             	if (value.child_details.length>0) {
             		childDetails=value.child_details;
             	}
             });
             var childs={
             	"name": "Practice No."+($scope.labors_record_obj.activities[""+index1+""].details.length+1),
				"type": 4,
				"has_child": true,
				"value": 0,
				"child_details": childDetails
             }
             $scope.labors_record_obj.activities[""+index1+""].details.push(childs);
            $timeout(function(){
				$scope.shownChild = childs;
			},200);

	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
  	};
	
    $scope.removeSub = function(f_Obj){
        var click=true;
        var index1=$scope.labors_record_obj.activities.indexOf(f_Obj);
  		if($scope.labors_record_obj.activities[""+index1+""].details.length > 1){
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
                    		$scope.labors_record_obj.activities[""+index1+""].details.splice($scope.labors_record_obj.activities[""+index1+""].details.length-1, 1);
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
  	$scope.otherArrayForNOC = {};
    $scope.getChange = function(f_Obj,s_Obj,t_Obj,val){
	        var index1=$scope.labors_record_obj.activities.indexOf(f_Obj);
		    var index2=$scope.labors_record_obj.activities[""+index1+""].details.indexOf(s_Obj);
		    var index3=$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details.indexOf(t_Obj);
		if(val != "Tap" && typeof(val) != 'undefined'){
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[1].status = false;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[3].status = false;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[4].status = false;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[5].status = false;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[7].status = false;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[8].status = false;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[9].status = false;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[11].status = false;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[12].status = false;
		}else{
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[1].status = true;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[3].status = true;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[4].status = true;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[5].status = true;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[7].status = true;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[8].status = true;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[9].status = true;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[11].status = true;
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[12].status = true;

			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[1].value = " ";
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[3].value = " ";
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[4].value = " ";
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[5].value = " ";
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[7].value = " ";
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[8].value = " ";
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[9].value = " ";
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[11].value = " ";
			$scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[12].value = " ";
		}

		    var nocfiltData;

		    	  var invalidEntries = 0;
			       nocfiltData = $scope.lpArray.filter(function(obj) { if (val == obj.name ) {
				    return true;
				  } else {
				    invalidEntries++;
				    return false;
				  } });
		        $scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value=val;
		        $scope.labors_record_obj.activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].id=nocfiltData[0].typeDetailId;
			};
	$scope.lpArray = [];
	$scope.landDetailCurrentStatus=[];
	db.get(master_data_doc_name).then(function(doc) {
		$http.get('labors_record.json').	
			success(function(data){
					doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
		            var lpTypeId;
						    angular.forEach(doc.data.typeDetailModels, function(value, key){
								if (data.labors_record.landpreparationPracticeTypeId==value.typeId) {
									$scope.lpArray.push({
								    typeDetailId: value.typeDetailId,
									name: value.typeDetailName,
									checked:false,
									id:data.labors_record.landpreparationPracticeTypeId
									});
								}
			                })
			                angular.forEach(doc.data.typeDetailModels, function(value, key){
								if (data.labors_record.seedPracticesTypeId==value.typeId) {
									$scope.lpArray.push({
								    typeDetailId: value.typeDetailId,
									name: value.typeDetailName,
									checked:false,
									id:data.labors_record.seedPracticesTypeId
									});
								}
			                })
			                angular.forEach(doc.data.typeDetailModels, function(value, key){
								if (data.labors_record.fertilizerPracticesTypeId==value.typeId) {
									$scope.lpArray.push({
								    typeDetailId: value.typeDetailId,
									name: value.typeDetailName,
									checked:false,
									id:data.labors_record.fertilizerPracticesTypeId
									});
								}
			                })
			                angular.forEach(doc.data.typeDetailModels, function(value, key){
								if (data.labors_record.biopesticidePracticesTypeId==value.typeId) {
									$scope.lpArray.push({
								    typeDetailId: value.typeDetailId,
									name: value.typeDetailName,
									checked:false,
									id:data.labors_record.biopesticidePracticesTypeId
									});
								}
			                })	
			                angular.forEach(doc.data.typeDetailModels, function(value, key){
								if (data.labors_record.irigationPracticesTypeId==value.typeId) {
									$scope.lpArray.push({
								    typeDetailId: value.typeDetailId,
									name: value.typeDetailName,
									checked:false,
									id:data.labors_record.irigationPracticesTypeId
									});
								}
			                })
			                angular.forEach(doc.data.typeDetailModels, function(value, key){
								if (data.labors_record.weedingPracticesTypeId==value.typeId) {
									$scope.lpArray.push({
								    typeDetailId: value.typeDetailId,
									name: value.typeDetailName,
									checked:false,
									id:data.labors_record.weedingPracticesTypeId
									});
								}
			                })
			                angular.forEach(doc.data.typeDetailModels, function(value, key){
								if (data.labors_record.pickingPracticesTypeId==value.typeId) {
									$scope.lpArray.push({
								    typeDetailId: value.typeDetailId,
									name: value.typeDetailName,
									checked:false,
									id:data.labors_record.pickingPracticesTypeId
									});
								}
			                })				                				                
		            
                })                            
	}).catch(function (err) {
			  console.log(err);
	});
	$scope.toggleGroup = function(group) {
	    if ($scope.isGroupShown(group)) {
	      $scope.shownGroup = null;
	    } else {
	    	 if (group.details.length<1) {
	         $scope.addSub(group,group[0]);
	      }
	      $scope.shownGroup = group;
	    }
	    // $ionicScrollDelegate.resize();
	}

	$scope.toggleSubGroup = function(item) {
	    if ($scope.isSubGroupShown(item)) {
	      $scope.shownChild = null;
	    } else {
	      $scope.shownChild = item;
	    }
	    // $ionicScrollDelegate.resize();
	}

	$scope.isGroupShown = function(group) {
	    return $scope.shownGroup === group;
	}

	$scope.isSubGroupShown = function(item) {
	    return $scope.shownChild === item;
	}
	var saveFlag = false;
    $scope.save=function(){
    	if (typeof currentFarmerwiseData[0]!="undefined") {
	       	if (currentFarmerwiseData[0].data.land_details.submitted){
	    		if(MainService.totalSum($scope.labors_record_obj.activities,"farmArea",areaOValue,$scope)){
	    			if(MainService.area_not_filled_child1($scope.labors_record_obj.activities,"farmArea",$scope)){
	   		        	MainService.save($scope.labors_record_obj, 15,$scope);
	   		        	saveFlag = true;
	   		        }
	   		    }
	     	}else{
				MainService.alertBox(msg_check_for_submit,$scope);
	     	}
	    }else{
			MainService.alertBox(msg_check_for_submit,$scope);
	    }
    }

    $scope.$on('eventFired', function(event, data) {
        if($scope.labors_record_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })     

    $scope.submit=function(){
    	if(saveFlag){
		    if (MainService.totalSum($scope.labors_record_obj.activities,"farmArea",areaOValue,$scope)) {
		   	    if(MainService.area_not_filled_child1($scope.labors_record_obj.activities,"farmArea",$scope)){
		   	       MainService.submit($scope.labors_record_obj, 15,$scope);
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
	MainService.setFlagForSyncedFarmer($scope, laborRecordsProcessId);    
}])