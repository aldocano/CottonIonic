angular.module("PesticideApplicationDetailsController", ['ionic-datepicker']).
controller('PesticideApplicationDetailsController', ['$scope', '$http','MainService', '$ionicPopup', '$stateParams', 'ionicDatePicker', '$filter', '$timeout',
function($scope, $http, MainService, $ionicPopup, $stateParams, ionicDatePicker, $filter, $timeout){
 	 
 	//// fetch land details data
    var areaValue,areaOValue;
    $scope.$on('landdetail_result', function(event, data) {
    	areaValue=data[0].value;
    	areaOValue=data[1].value;
 	}) 
	//// Area compare validation function called
    $scope.areaCompareValidation=function(f_obj,s_obj,key,val){
     	MainService.areaCompareValidation(f_obj,s_obj,key,val,$scope,"pesticide_application_details_obj","farmArea",areaOValue);
    }
    //// positive number validation
    $scope.integerValidation=function(f_obj,s_obj,val){
       MainService.integerValidation(f_obj,s_obj,val,$scope,"pesticide_application_details_obj");
    }
    //// positive number validation
    $scope.integerValidation2=function(f_obj,s_obj,val){
       MainService.integerValidation1(f_obj,s_obj,val,$scope,"pesticide_application_details_obj");
    }
    //// positive number validation
    $scope.integerValidation4=function(f_obj,s_obj,val){
       MainService.integerValidation4(f_obj,s_obj,val,$scope,"pesticide_application_details_obj");
    }
    //// positive number validation
    $scope.floatValidation=function(f_obj,s_obj,val){
       MainService.floatValidation(f_obj,s_obj,val,$scope,"pesticide_application_details_obj");
    }
    $scope.floatValidation1=function(f_obj,s_obj,val){
       MainService.floatValidation1(f_obj,s_obj,val,$scope,"pesticide_application_details_obj");
    }
    $scope.floatValidation2=function(f_obj,s_obj,val){
       MainService.floatValidation_for_ry(f_obj,s_obj,val,$scope,"pesticide_application_details_obj");
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

	$scope.pesticide_application_details_obj = MainService.getForm_data();
    if($scope.pesticide_application_details_obj.submitted === undefined){
    	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		$http.get('pesticide_application_details.json').	
		success(function(data){
			$scope.pesticide_application_details_obj = data.pesticide_application_details;
			
			$scope.pesticide_application_details_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.pesticide_application_details_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
            //// getting area details from land details
            MainService.getlandDetailsData($scope.pesticide_application_details_obj.farmerId,$scope.pesticide_application_details_obj.farmerTimePeriodId);

			var activities = data.pesticide_application_details.activities;		
			var details = data.pesticide_application_details.details;
			var child_details = data.pesticide_application_details.child_details;
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
			$scope.pesticide_application_details_obj.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name = activities[i].name + (i+1);
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
				$scope.pesticide_application_details_obj.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}
	     MainService.checkOrganicArea($scope.pesticide_application_details_obj.farmerId);
    	
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
    }else if($scope.pesticide_application_details_obj.submitted === false){
         //// getting area details from land details
	     MainService.checkOrganicArea($scope.pesticide_application_details_obj.farmerId);
         MainService.getlandDetailsData($scope.pesticide_application_details_obj.farmerId,$scope.pesticide_application_details_obj.farmerTimePeriodId);
    	$scope.flag = false;
    	console.log("false");
    }else{
    	$scope.flag = true;
    	console.log("true");
    }
    $scope.validString=function(f_obj,s_obj,val){
     	MainService.validString(f_obj,s_obj,val,$scope,"pesticide_application_details_obj");
    }
    var saveFlag = false;
    $scope.save=function(){
    	if (typeof currentFarmerwiseData[0]!="undefined") {
	       	if (currentFarmerwiseData[0].data.land_details.submitted){
	    			if(MainService.area_not_filled_new($scope.pesticide_application_details_obj.activities,"farmArea",$scope,msg_area_ha_not_filled)){
	   		        	MainService.save($scope.pesticide_application_details_obj, 13,$scope);
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
        if($scope.pesticide_application_details_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })     

    $scope.submit=function(){
    	if(saveFlag){
		   	    if(MainService.area_not_filled_new($scope.pesticide_application_details_obj.activities,"farmArea",$scope,msg_area_ha_not_filled)){
		   	       MainService.submit($scope.pesticide_application_details_obj, 13,$scope);
		        }
		}else{
			MainService.alertBox("Please save before submitting.", $scope);
		}    
    };


	  	$scope.remove = function(){
        var click=true;
  		if($scope.pesticide_application_details_obj.activities.length >1){
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
                         $scope.pesticide_application_details_obj.activities.splice($scope.pesticide_application_details_obj.activities.length-1, 1);
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

	$scope.psdArray = [];
	$scope.srcArray = [];
	$scope.trpArray = [];
	$scope.landDetailCurrentStatus=[];
	db.get(master_data_doc_name).then(function(doc) {
		$http.get('pesticide_application_details.json').	
			success(function(data){
				doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
	            var pesticidesTypeId=data.pesticide_application_details.pesticidesTypeId;
	            var sourceTypeId=data.pesticide_application_details.sourceTypeId;
	            var targetPestTypeId=data.pesticide_application_details.targetPestTypeId;
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
					angular.forEach(doc.data.typeDetailModels, function(value, key){

						if (pesticidesTypeId==value.typeId) {
							if(value.typeDetailName === "Others"){
								other.typeDetailId = value.typeDetailId;
								other.name = value.typeDetailName;
							}else{
								$scope.psdArray.push({
							    typeDetailId: value.typeDetailId,
								name: value.typeDetailName,
								checked:false,
								});
							}	
						}
						if (sourceTypeId==value.typeId) {
							$scope.srcArray.push({
						    typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
							});
						}
						if (targetPestTypeId==value.typeId) {
							if(value.typeDetailName === "Others"){
								other1.typeDetailId = value.typeDetailId;
								other1.name = value.typeDetailName;
							}else{
								$scope.trpArray.push({
							    typeDetailId: value.typeDetailId,
								name: value.typeDetailName,
								checked:false,
								});
							}	
						}
					});
				angular.forEach($scope.pesticide_application_details_obj.activities, function(value, key){
                	angular.forEach(value.details, function(value_s, key_s){
                	 	if (value_s.type=="4.1") {
                	 		if (value_s.value!="Tap") {
	                	 		angular.forEach($scope.psdArray,function(value_t,key_t ) {
	                	 			if (value_t.name != value_s.value) {
	                	 				var results = $filter('filter')($scope.psdArray, {name : value_s.value}, true);
	                                 if (results.length<1) {
		     			               $scope.psdArray.push({"typeDetailId":0,"name":value_s.value,"checked":false})
	                	 			  }
	                	 			}
								});
                            }
                	 	}else if (value_s.type=="4.3") {
                	 		if (value_s.value!="Tap") {
	                	 		angular.forEach($scope.trpArray,function(value_t,key_t ) {
	                	 			if (value_t.name != value_s.value) {
	                	 				 var results = $filter('filter')($scope.trpArray, {name : value_s.value}, true);
		                                 if (results.length<1) {
			     			               $scope.trpArray.push({"typeDetailId":0,"name":value_s.value,"checked":false})
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
	$scope.otherArrayFor = {};
	$scope.otherArrayForTP = {};
	var element = [];
	$scope.getChange1 = function(f_Obj,s_Obj,val){
		if($("#sec_id").context.activeElement[3].selected == true){

		}
		var index1=$scope.pesticide_application_details_obj.activities.indexOf(f_Obj);
		var index2=$scope.pesticide_application_details_obj.activities[""+index1+""].details.indexOf(s_Obj);
		element.push($("#sec_id").context.activeElement);
		var soiFiltData;
		var ids = "";
		if(typeof val == "undefined"){
			$scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].otherVal = null;
			$scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].value = [];
			$scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].id=null;
		}
		var invalidEntries = 0;
	      var arr = [];
		for(var i = 0; i < val.length; i++){
			soiFiltData = $scope.trpArray.filter(function(obj) { if (val[i] == obj.name ) {
				arr.push({name:val[i],id:obj.typeDetailId});
				return true;
			}else{
		    	invalidEntries++;
		    	return false;
			} });
		}
		for(var j = 0; j < arr.length; j++){
			ids+=arr[j].id+",";
		}
		ids = ids.substring(0, ids.length-1);
		$scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].id=ids;
		if(!ids.includes("167")){
			$scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].otherVal = null;
		}
		if($scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].otherVal == null){
		
		if (val.includes("Other")) {
			element.push($("#sec_id").context.activeElement);
			var pop = $ionicPopup.show({
		 		template: '<input type="text" ng-pattern="/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/" ng-model="otherArrayForTP.othersSpecify" style="background: #45BFAE">',
			    title: 'Please Specify',
			    scope: $scope,
		 		buttons: [ { text: 'Cancel',
		 			  onTap:function(e){
	                        for(var j = 0; j<element.length; j++){
								if(element[j].id == "sec_id"){
									element[j][18].selected = false;
								}
							}
						$scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].id = ids.substring(0,ids.length-4);	
		 				 }},{
		 			text: 'Ok',
		 			onTap:function(e){
		      		    if (typeof $scope.otherArrayForTP.othersSpecify=="undefined" || $scope.otherArrayForTP.othersSpecify=="" || $scope.otherArrayForTP.othersSpecify=="Other") {
				            $scope.otherArrayForTP.othersSpecify = "";
				            MainService.alertBox(msg_others_mandatory,$scope); 
		                    e.preventDefault();	
		 				}else{
		 				var str =$scope.otherArrayForTP.othersSpecify.toString();
			            var n_count = str.length;
					       if (n_count<50) {
			                    $scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].otherVal = $scope.otherArrayForTP.othersSpecify;
			     				$scope.otherArrayForTP.othersSpecify = "";
			     				pop.close();
			     			}else{
			     				$scope.otherArrayForTP.othersSpecify="";
					            MainService.alertBox("This field accepts upto 50 characters.",$scope); 
		                        e.preventDefault();
			     			}
			     		}
		 			}
		 		}]
		 	})
		}else{
			$scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].otherVal = null;
		}
	}
	}
    $scope.getChange = function(f_Obj,s_Obj,clickName,val){
	        var index1=$scope.pesticide_application_details_obj.activities.indexOf(f_Obj);
		    var index2=$scope.pesticide_application_details_obj.activities[""+index1+""].details.indexOf(s_Obj);
		    var nocfiltData,stdfiltData;
		    if (clickName=="psd") {
		    	  var invalidEntries = 0;
			       nocfiltData = $scope.psdArray.filter(function(obj) { if (val == obj.name ) {
				    return true;
				  } else {
				    invalidEntries++;
				    return false;
				  } });
		        $scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].value=val;
		        $scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].id=nocfiltData[0].typeDetailId;
			}else{
				 var invalidEntries = 0;
			       stdfiltData = $scope.trpArray.filter(function(obj) { if (val == obj.name ) {
				    return true;
				  } else {
				    invalidEntries++;
				    return false;
				  } });
		        $scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].value=val;
		        $scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].id=stdfiltData[0].typeDetailId;;
			}
			 if(s_Obj.value == 'Other'){
		     	var pop = $ionicPopup.show({
		     		template: '<input type="text" ng-pattern="/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/" ng-model="otherArrayFor.othersSpecify" style="background: #45BFAE">',
				    title: 'Please Specify',
				    scope: $scope,
		     		buttons: [ { text: 'Cancel',
		     			  onTap:function(e){
                                    $scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].id =0;
				     				$scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].value = "";
				     				$scope.otherArrayFor.othersSpecify = "";
		     				 }},{
		     			text: 'Ok',
		     			onTap:function(e){
	              		    if (typeof $scope.otherArrayFor.othersSpecify=="undefined" || $scope.otherArrayFor.othersSpecify=="" || $scope.otherArrayFor.othersSpecify=="Other") {
					            $scope.otherArrayFor.othersSpecify = "";
					            MainService.alertBox(msg_others_mandatory,$scope); 
		                        e.preventDefault();	
		     				}else{
		     				var str =$scope.otherArrayFor.othersSpecify.toString();
				            var n_count = str.length;
						       if (n_count<50) {
		                          if (clickName=="psd") {
				     				$scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].id = nocfiltData[0].typeDetailId;
				     				$scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].value = $scope.otherArrayFor.othersSpecify;
				     			    $scope.psdArray.push({"typeDetailId":nocfiltData[0].typeDetailId,"name":$scope.otherArrayFor.othersSpecify,"checked":false})
				     				$scope.otherArrayFor.othersSpecify = "";
				     				pop.close();
				     			  }else{
				                    $scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].id = stdfiltData[0].typeDetailId;
				                    $scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].value = $scope.otherArrayFor.othersSpecify;
				     			    $scope.trpArray.push({"typeDetailId":stdfiltData[0].typeDetailId,"name":$scope.otherArrayFor.othersSpecify,"checked":false})
				     				$scope.otherArrayFor.othersSpecify = "";
				     				pop.close();
				     			  }
				     			}else{
				     				$scope.otherArrayFor.othersSpecify="";
						            MainService.alertBox("This field accepts upto 50 characters.",$scope); 
		                            e.preventDefault();
				     			}
				     		}
		     				
		     			
		     			}
		     		}]
		     	})
		     }
	 };
	$scope.myfy=function(f_Obj,s_Obj,val){

		var index1=$scope.pesticide_application_details_obj.activities.indexOf(f_Obj);
		var index2=$scope.pesticide_application_details_obj.activities[""+index1+""].details.indexOf(s_Obj);
		$scope.pesticide_application_details_obj.activities[""+index1+""].details[""+index2+""].value=$filter('date')(val, 'yyyy-MM-dd'); //$filter('date')(val, 'yyyy-MM-dd'); 

	}
  	$scope.add = function(){
  		$http.get('pesticide_application_details.json').	
		success(function(data){
			var pesticide_application_details_obj2 = data.pesticide_application_details;
			
			pesticide_application_details_obj2.farmer_id = parseInt($stateParams.farmer_id);
			pesticide_application_details_obj2.financial_year = parseInt($stateParams.financial_year);

			var activities = data.pesticide_application_details.activities;		
			var details = data.pesticide_application_details.details;
			var child_details = data.pesticide_application_details.child_details;
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
			pesticide_application_details_obj2.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name += ($scope.pesticide_application_details_obj.activities.length + 1);
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
				pesticide_application_details_obj2.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}

			$scope.pesticide_application_details_obj.activities.push(pesticide_application_details_obj2.activities[0]);	
			$timeout(function(){
				$scope.shownGroup = pesticide_application_details_obj2.activities[0];
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
	MainService.setFlagForSyncedFarmer($scope, bioPesticideDetailsProcessId);
}]);
