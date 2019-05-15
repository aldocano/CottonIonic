angular.module("ManureApplicationController", []).
controller('ManureApplicationController', ['$scope', '$http','MainService', '$ionicPopup', '$stateParams', '$filter',
	function($scope, $http, MainService, $ionicPopup, $stateParams, $filter){
     

 	 $scope.getChange = function(f_Obj,s_Obj,clickName,val){
	        var index1=$scope.manure_obj.activities.indexOf(f_Obj);
		    var index2=$scope.manure_obj.activities[""+index1+""].details.indexOf(s_Obj);
		    var manfiltData,srcfiltData;
            if (clickName=="mn"){
            	  var invalidEntries = 0;
			       manfiltData = $scope.manureArray.filter(function(obj) { if (val == obj.name ) {
				    return true;
				  } else {
				    invalidEntries++;
				    return false;
				  } });
		        $scope.manure_obj.activities[""+index1+""].details[""+index2+""].value=val;
		        $scope.manure_obj.activities[""+index1+""].details[""+index2+""].id=manfiltData[0].typeDetailId;
			}else{
				 var invalidEntries = 0;
			       srcfiltData = $scope.sourceArray.filter(function(obj) { if (val == obj.name ) {
				    return true;
				  } else {
				    invalidEntries++;
				    return false;
				  } });
		        $scope.manure_obj.activities[""+index1+""].details[""+index2+""].value=val;
		        $scope.manure_obj.activities[""+index1+""].details[""+index2+""].id=srcfiltData[0].typeDetailId;
			}
			 if(s_Obj.value == 'Others'){
		     	var pop = $ionicPopup.show({
		     		template: '<input type="text" ng-pattern="/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/" ng-model="otherArray.othersSpecify" style="background: #45BFAE">',
				    title: 'Please Specify',
				    scope: $scope,
		     		buttons: [
                        { text: 'Cancel',
		     			  onTap:function(e){
                                 $scope.manure_obj.activities[""+index1+""].details[""+index2+""].value = "";
				                    $scope.manure_obj.activities[""+index1+""].details[""+index2+""].id=0;
				                    $scope.otherArray.othersSpecify = "";
		     				 }},
		     		    {text: 'Ok',
		     			onTap:function(e){
		     				if (typeof $scope.otherArray.othersSpecify=="undefined" || $scope.otherArray.othersSpecify=="" || $scope.otherArray.othersSpecify=="Others") {
						            $scope.otherArray.othersSpecify = "";
						            MainService.alertBox(msg_others_mandatory,$scope); 
		                            e.preventDefault();	
		     				}else{
   			     			    var str =$scope.otherArray.othersSpecify.toString();
					            var n_count = str.length;
						        if (n_count<50) {
				                    $scope.manure_obj.activities[""+index1+""].details[""+index2+""].value = $scope.otherArray.othersSpecify;
				                    $scope.manure_obj.activities[""+index1+""].details[""+index2+""].id=manfiltData[0].typeDetailId;
				     			    $scope.manureArray.push({"typeDetailId":manfiltData[0].typeDetailId,"name":$scope.otherArray.othersSpecify,"checked":false})
				     			    //var index = Object.keys($scope.manureArray).length - 1;
				     				//$scope.mn_dumObj[""+index1+""]= $scope.manureArray[""+index+""].name;
				     				//$scope.$apply();
				     				$scope.otherArray.othersSpecify = "";
				     				pop.close();
				     			}else{
					     			$scope.otherArray.othersSpecify="";
						            MainService.alertBox("This field accepts upto 50 characters.",$scope); 
		                            e.preventDefault();	
				     			}
			     		   }
		     			}
		     		}]
		     	})
		     }
	 };


    //// fetch land details data
    var areaValue,areaOValue;
    $scope.$on('landdetail_result', function(event, data) {
    	areaValue=data[0].value;
    	areaOValue=data[1].value;
 	})   
 	//// Area compare validation function called
    $scope.areaCompareValidation=function(f_obj,s_obj,key,val){
     	MainService.areaCompareValidation(f_obj,s_obj,key,val,$scope,"manure_obj","areaCovered",areaOValue);
    }
    //// positive number validation
    $scope.floatValidation=function(f_obj,s_obj,val){
      MainService.floatValidation(f_obj,s_obj,val,$scope,"manure_obj");
    }
    $scope.floatValidation_5=function(f_obj,s_obj,val){
      MainService.floatValidation_5(f_obj,s_obj,val,$scope,"manure_obj");
    }
    $scope.floatValidation_6=function(f_obj,s_obj,val){
      MainService.floatValidation_for_ry(f_obj,s_obj,val,$scope,"manure_obj");
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
	$scope.manure_obj = MainService.getForm_data();  

    $scope.manureArray=[];
    $scope.sourceArray=[];
	db.get(master_data_doc_name).then(function(doc) {
		$http.get('manure_application.json').	
			success(function(data){
				doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
	            var manureTypeId=data.manure_application.manureDetailsTypeId;
	            var sourceTypeId=data.manure_application.manureSourceTypeId;
		        var other = {
		        	typeDetailId: 0,
					name: "",
					checked:false
		        };	            
		        
					angular.forEach(doc.data.typeDetailModels, function(value, key){

						if (manureTypeId==value.typeId) {
							if(value.typeDetailName === "Others"){
								other.typeDetailId = value.typeDetailId;
								other.name = value.typeDetailName;
							}else{
								$scope.manureArray.push({
								    typeDetailId: value.typeDetailId,
									name: value.typeDetailName,
									checked:false
								});
							}
						}
						if (sourceTypeId==value.typeId) {
							$scope.sourceArray.push({
						    typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false
							});
						}
					});
					$scope.manureArray.push(other);

					 angular.forEach($scope.manure_obj.activities, function(value, key){
	                	 angular.forEach(value.details, function(value_s, key_s){
	                	 	if (value_s.type=="4.1") {
	                	 		if (value_s.value!="Tap") {
		                	 		angular.forEach($scope.manureArray,function(value_t,key_t ) {
		                	 			if (value_t.name != value_s.value) {
		                	 			   var results = $filter('filter')($scope.manureArray, {name : value_s.value}, true);
			                               if (results.length<1) {
			     			                  $scope.manureArray.push({"typeDetailId":0,"name":value_s.value,"checked":false})
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
	
	$scope.otherArray = {};
	$scope.dropdownClicked = function(f_Obj,s_Obj,clickname){
		if(!$scope.flag){
			var index1=$scope.manure_obj.activities.indexOf(f_Obj);
			var index2=$scope.manure_obj.activities[""+index1+""].details.indexOf(s_Obj);
			var pagename="";
			if (clickname=="manure"){
				MainService.dropdownRefresh(index1,index2,"manureArray","manure_obj",$scope);
				pagename="templates/manurePopup.html"
			}else{
				MainService.dropdownRefresh(index1,index2,"sourceArray","manure_obj",$scope);
				pagename="templates/sourcePopup.html"
			}
			var manure_popup = $ionicPopup.show({
	    		templateUrl: pagename,
	    		title: 'Manure',
	    		// subTitle: 'Please use normal things',
	    		scope: $scope,
	    		buttons: [
	    			{
	     				text: 'Ok',
	     				type: 'button-positive',
	     				onTap: function(e) {
		     				if (clickname=="manure") {
		                  		angular.forEach($scope.manureArray, function(value, key){
									if (value.checked==true) {
								     $scope.manure_obj.activities[""+index1+""].details[""+index2+""].value=value.name;
								     $scope.manure_obj.activities[""+index1+""].details[""+index2+""].id=value.typeDetailId;
								     if(value.name == 'Others'){
								     	var pop = $ionicPopup.show({
								     		template: '<input type="text" ng-model="otherArray.othersSpecify" style="background: #45BFAE">',
										    title: 'Please Specify',
										    scope: $scope,
								     		buttons: [{
								     			text: 'Ok',
								     			onTap:function(e){
								     				$scope.manure_obj.activities[""+index1+""].details[""+index2+""].value = $scope.otherArray.othersSpecify;
								     				$scope.otherArray.othersSpecify = "";
								     				pop.close();
								     			}
								     		}]
								     	})
								     }
									}
								});
		                  	}else{
		                  		angular.forEach($scope.sourceArray, function(value, key){
										if (value.checked==true) {
									     $scope.manure_obj.activities[""+index1+""].details[""+index2+""].value=value.name;
								         $scope.manure_obj.activities[""+index1+""].details[""+index2+""].id=value.typeDetailId;
										}
								});
		                  	}

	     				}	
	   				}
	 			]
	  		});
		}
	};

	$scope.changeCS = function(status_index){
      angular.forEach($scope.manureArray,function(f_value,f_key){
      	if (status_index==f_key) {
      	$scope.manureArray[f_key].checked = true;
        }else{$scope.manureArray[f_key].checked = false;}
      })
	};
	$scope.sourceClicked = function(f_Obj,s_Obj){
		var index1=$scope.manure_obj.activities.indexOf(f_Obj);
		var index2=$scope.manure_obj.activities[""+index1+""].details.indexOf(s_Obj);
		var manure_popup = $ionicPopup.show({
    		templateUrl: "templates/sourcePopup.html",
    		title: 'Source',
    		// subTitle: 'Please use normal things',
    		scope: $scope,
    		buttons: [
    			{
     				text: 'Ok',
     				type: 'button-positive',
     				onTap: function(e) {
                  		angular.forEach($scope.source, function(value, key){
                  			angular.forEach(value, function(s_value, s_key){
								if (s_value.checked==true) {
							     $scope.manure_obj.activities[""+index1+""].details[""+index2+""].value=s_value.name;
								}
							});
						});
     				}	
   				}
 			]
  		});
	};


	$scope.changeSource = function(status_index){
      angular.forEach($scope.sourceArray,function(f_value,f_key){
      	if (status_index==f_key) {
      	$scope.sourceArray[f_key].checked = true;
        }else{$scope.sourceArray[f_key].checked = false;}
      })
	};	     

	$scope.add = function(){
  		$http.get('manure_application.json').	
		success(function(data){
			var manure_obj2 = data.manure_application;
			
			manure_obj2.farmerId = parseInt($stateParams.farmerId);
			manure_obj2.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);

			var activities = data.manure_application.activities;		
			var details = data.manure_application.details;
			var child_details = data.manure_application.child_details;
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
			manure_obj2.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name += ($scope.manure_obj.activities.length + 1);
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
				manure_obj2.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}

			$scope.manure_obj.activities.push(manure_obj2.activities[0]);			
			$scope.shownGroup = manure_obj2.activities[0];
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
  	};  

  	$scope.remove = function(){
        var click=true;
  		if($scope.manure_obj.activities.length != 1){
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
                       $scope.manure_obj.activities.splice($scope.manure_obj.activities.length-1, 1);
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
           
	if($scope.manure_obj.submitted === undefined){
		db.get(master_data_doc_name).then(function(doc) {
		$http.get('manure_application.json').
		success(function(data){
  			$scope.manure_obj = data.manure_application;
			$scope.manure_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.manure_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
			//// getting area details from land details
            MainService.getlandDetailsData($scope.manure_obj.farmerId,$scope.manure_obj.farmerTimePeriodId);

			var activities = data.manure_application.activities;		
			var details = data.manure_application.details;
			var child_details = data.manure_application.child_details;
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
			$scope.manure_obj.activities = [];
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
				$scope.manure_obj.activities.push({
					name: activities[i].name,
					value:activities[i].value,
					details: details_here
				});
			}
			MainService.checkOrganicArea($scope.manure_obj.farmerId);
		}).
		error(function(err){
			//error fetching json
			console.error(err.message);
		});
	   }).catch(function (err) {
			  console.log(err);
	 });
	}else if($scope.manure_obj.submitted === false){
		//// getting area details from land details
		MainService.checkOrganicArea($scope.manure_obj.farmerId);
        MainService.getlandDetailsData($scope.manure_obj.farmerId,$scope.manure_obj.farmerTimePeriodId);
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
	       		if(MainService.area_not_filled_new($scope.manure_obj.activities,"areaCovered",$scope,msg_field_area_not_filled)){
   		            MainService.save($scope.manure_obj, 6,$scope);
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
    	if($scope.manure_obj.submitted)
			$scope.flag = true;
			MainService.hide_spinner();
 	})    

    $scope.submit=function(){
    	if(saveFlag){
    		if(MainService.area_not_filled_new($scope.manure_obj.activities,"areaCovered",$scope,msg_field_area_not_filled)){
	   		    MainService.submit($scope.manure_obj, 6,$scope);
	   		 }   
	   	}else{
			MainService.alertBox("Please save before submitting.", $scope);
		}	
	};
 	/*
	@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
	this function disable this process if it was synced in past.
	*/
	MainService.setFlagForSyncedFarmer($scope, manureApplicationDetailProcessId);
 }]);