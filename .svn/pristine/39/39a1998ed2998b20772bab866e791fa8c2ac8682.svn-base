angular.module('LandDetailsController', []).
controller('LandDetailsController', ['$scope', '$http','MainService', '$ionicPopup', '$stateParams', '$cordovaGeolocation', '$timeout', '$cordovaToast',
	function($scope, $http, MainService, $ionicPopup, $stateParams, $cordovaGeolocation, $timeout, $cordovaToast){
		$scope.myTitle = 'Template';
	 	$scope.getChange = function(f_Obj,s_Obj,val){
	        var index1=$scope.land_details_obj.activities.indexOf(f_Obj);
		    var index2=$scope.land_details_obj.activities[""+index1+""].details.indexOf(s_Obj);
		      var invalidEntries = 0;
		      var currentfiltData = $scope.landDetailCurrentStatus.filter(function(obj) { if (val == obj.name ) {
			    return true;
			  } else {
			    invalidEntries++;
			    return false;
			  } });
		    $scope.land_details_obj.activities[""+index1+""].details[""+index2+""].value=val;
		    $scope.land_details_obj.activities[""+index1+""].details[""+index2+""].id=currentfiltData[0].typeDetailId;
		};
        var formSave_Status=false;
           // fetch land details data
	    var areaValue,areaOValue;
	    $scope.$on('landdetail_result', function(event, data) {
	    	if (typeof data!="undefined") {
	    	areaValue=parseFloat(data[0].value);
	    	areaOValue=parseFloat(data[1].value);
	    	}
	 	});
        $scope.captureGPS = function(f_Obj,s_Obj){
	    	var index1=$scope.land_details_obj.activities.indexOf(f_Obj);
		    var long_i=$scope.land_details_obj.activities[""+index1+""].details.indexOf(s_Obj);
        	var lati=long_i+1;
        	var longi=long_i+2;
        	$scope.land_details_obj.pre_table_data.indexOf(f_Obj);
    		MainService.show_spinner();
		    var posOptions = {timeout: 10000, enableHighAccuracy: true};
		    $cordovaGeolocation.getCurrentPosition(posOptions)
		    .then(function (position) {
		      $scope.land_details_obj.activities[""+index1+""].details[""+lati+""].value  = position.coords.latitude;
		      $scope.land_details_obj.activities[""+index1+""].details[""+longi+""].value = position.coords.longitude
		      MainService.hide_spinner();
		    }, function(err) {
		    	MainService.alertBox(msg_gps_enable,$scope);
		      	MainService.hide_spinner();
		    });
		};
        // Area compare validation function called
         $scope.areaCompareValidation=function(f_obj,s_obj,key,val){
         	MainService.areaCompareValidation(f_obj,s_obj,key,val,$scope,"land_details_obj","landArea",areaOValue);
         }
        
        // Area calculation function called
        $scope.areaCalculation=function(prnt_dataObj,chld_dataObj2,key1,val,obj_name,key_name){
        	var prnt_obj = "";
        	if(typeof prnt_dataObj.name == "undefined")
        		prnt_obj = prnt_dataObj.key;
        	else
        		prnt_obj = prnt_dataObj.name;
        	var  clear_reg = "";
        	if(obj_name == "pre_table_data")
        		clear_reg = $scope.land_details_obj.pre_table_data;
        	else
        		clear_reg = $scope.land_details_obj.activities;
        	var clear_regX = clear_reg.indexOf(prnt_dataObj);
        	if(typeof val != "undefined"){
	        	var float_val=val.split(".").length == 2?val:parseFloat(val);
	           	if (obj_name=="pre_table_data") {
			        var index1=$scope.land_details_obj.pre_table_data.indexOf(prnt_dataObj);
				     if (key1=="toalArea") {
				     	if (MainService.validDeimal(val)) {
						    if (typeof val!="undefined") {
							       areaValue=float_val;
		                           $scope.land_details_obj.pre_table_data[""+index1+""].value=float_val;
					        }else{
					        	areaValue=float_val;
					        	$scope.land_details_obj.pre_table_data[""+index1+""].value="";
					        }
					        if (areaValue!="" && areaOValue!="") {
						      	if (parseFloat(areaValue)<parseFloat(areaOValue)) {
					      		   areaOValue=0;
					      		   var prev_index1=index1+1;
					      		   MainService.alertBox(msg_area_field_validation,$scope);
				                   $scope.land_details_obj.pre_table_data[""+prev_index1+""].value="";
						      	}
					          } 
					      }else{
					      	// MainService.alertBox(msg_area_field_validation,$scope);
					      	$scope.land_details_obj.pre_table_data[""+index1+""].value="";
					      }
				      }
				      else {
				      	if (MainService.validDeimal(val)) {
					      	if (typeof val!="undefined") {
		                      	if (typeof areaValue!="undefined") {
					    		 areaOValue=val;
					    		 $scope.land_details_obj.pre_table_data[""+index1+""].value=float_val;
					    	
					    	    }else{
					    	     areaOValue=0;
					    	     MainService.alertBox("Please enter total area!",$scope);
					    	     $scope.land_details_obj.pre_table_data[""+index1+""].value="";
					    	    }
					    	}else{
					    		 areaOValue=0;
					    	     MainService.alertBox(msg_number_field_validation,$scope);
					    		 $scope.land_details_obj.pre_table_data[""+index1+""].value="";
					    	}
		                 
			                 if (areaValue!="" && areaOValue!="") {
						      	 if (parseFloat(areaValue)<parseFloat(areaOValue)) {
					      		    areaOValue=0;
					      		    MainService.alertBox(msg_area_field_validation,$scope);
				                    $scope.land_details_obj.pre_table_data[""+index1+""].value="";
						      	 }
					          }  
					      }else{
					      	 areaOValue=0;
					      	 //MainService.alertBox(msg_area_field_validation,$scope);
					      	 $scope.land_details_obj.pre_table_data[""+index1+""].value="";
					      }
				      }
				   
			      }else{
			      	var index1=$scope.land_details_obj.activities.indexOf(prnt_dataObj);
				    var index2=$scope.land_details_obj.activities[""+index1+""].details.indexOf(chld_dataObj2);
	                if (MainService.validDeimal(val)) {
	              	     if(parseFloat(areaOValue)<val){
	              	     	MainService.alertBox(msg_landarea_field_validation,$scope);
					    	$scope.land_details_obj.activities[""+index1+""].details[""+index2+""].value="";
					      }else{
	                        if (typeof val!="undefined") {
							    $scope.land_details_obj.activities[""+index1+""].details[""+index2+""].value=float_val;
					    	}else{
						    	MainService.alertBox(msg_landarea_field_validation,$scope);
					    		$scope.land_details_obj.activities[""+index1+""].details[""+index2+""].value="";
					    	}
					      }
	                }else{
			    		$scope.land_details_obj.activities[""+index1+""].details[""+index2+""].value="";
	                }

			    }
			}else{			
        		if(obj_name == "pre_table_data")
        			clear_reg[""+clear_regX+""].value="";
        		else
        			clear_reg[""+clear_regX+""].details[0].value="";
				//regX.push(prnt_obj + key1 + obj_name);
								
				MainService.alertBox(msg_invalid_decimal,$scope);
			}
        }

        $scope.validString=function(f_obj,s_obj,val){
        	MainService.validString(f_obj,s_obj,val,$scope,"land_details_obj");
        }
    
    //// Responsive function called
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

	$scope.current_status = {
		name: "Tap to choose"
	};
    $scope.csClicked = function(f_Obj,s_Obj){
		if(!$scope.flag){
			var index1=$scope.land_details_obj.activities.indexOf(f_Obj);
			var index2=$scope.land_details_obj.activities[""+index1+""].details.indexOf(s_Obj);
			MainService.dropdownRefresh(index1,index2,"landDetailCurrentStatus","land_details_obj",$scope);
			cs_popup = $ionicPopup.show({
	    		templateUrl: "templates/csPopup.html",
	    		title: 'Current Status',
	    		// subTitle: 'Please use normal things',
	    		scope: $scope,
	    		buttons: [
	    			{
	     				text: 'Ok',
	     				type: 'button-positive',
	     				onTap: function(e) {
	                  		angular.forEach($scope.landDetailCurrentStatus, function(value, key){
								if (value.checked==true) {
							     $scope.land_details_obj.activities[""+index1+""].details[""+index2+""].value=value.name;
							     $scope.land_details_obj.activities[""+index1+""].details[""+index2+""].id=value.typeDetailId;
								}
							});
	     				}	
	   				}
	 			]
	  		});
		}
	};

	$scope.changeCS = function(status_index){
    	angular.forEach($scope.landDetailCurrentStatus,function(f_value,f_key){
	      	if (status_index==f_key) {
	      		$scope.landDetailCurrentStatus[f_key].checked = true;
	        }else{$scope.landDetailCurrentStatus[f_key].checked = false;}
    	})
	};

  	$scope.remove = function(){
        var click=true;
  		if($scope.land_details_obj.activities.length != 1){
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
                    		$scope.land_details_obj.activities.splice($scope.land_details_obj.activities.length-1, 1);
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
  		$http.get('land_details.json').	
		success(function(data){
			var land_details_obj2 = data.land_details;
			
			land_details_obj2.farmerId = parseInt($stateParams.farmerId);
			land_details_obj2.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);

			var activities = data.land_details.activities;		
			var details = data.land_details.details;
			var child_details = data.land_details.child_details;
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
			land_details_obj2.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name += ($scope.land_details_obj.activities.length + 1);
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
				land_details_obj2.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}

			$scope.land_details_obj.activities.push(land_details_obj2.activities[0]);			
			$scope.shownGroup = land_details_obj2.activities[0];
		}).
		error(function(err){
			//error fetching json
			console.error(err.message);
		});	
  	}; 
  	$scope.landDetailCurrentStatus=[];
	db.get(master_data_doc_name).then(function(doc) {
		$http.get('land_details.json').	
		success(function(data){
            var landDetailCurrentStatusTypeId=data.land_details.landDetailCurrentStatusTypeId;
			angular.forEach(doc.data.typeDetailModels, function(value, key){

				if (landDetailCurrentStatusTypeId==value.typeId) {
					$scope.landDetailCurrentStatus.push({
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

	$scope.land_details_obj = MainService.getForm_data();

    if($scope.land_details_obj.submitted === undefined){	
     	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		db.get(master_data_doc_name).then(function(doc) {
		$http.get('land_details.json').	
		success(function(data){
            var landDetailCurrentStatusTypeId=data.land_details.landDetailCurrentStatusTypeId;

			$scope.land_details_obj = data.land_details;
			$scope.land_details_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.land_details_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
         

			var activities = data.land_details.activities;		
			var details = data.land_details.details;
			var child_details = data.land_details.child_details;
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
			$scope.land_details_obj.activities = [];
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
				$scope.land_details_obj.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}

		}).
		error(function(err){
		//error fetching json
			console.error(err.message);
		});	
	}).catch(function (err) {
		  console.log(err);
		});
    }else if($scope.land_details_obj.submitted === false){
    	//// getting area details from land details
        MainService.getlandDetailsData($scope.land_details_obj.farmerId,$scope.land_details_obj.farmerTimePeriodId);
    	$scope.flag = false;
    }else{
    	$scope.flag = true;
    }
    /**
    @author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
    this function disable land details form if it was synced in 
    past and populate previous records.
    */
    db.get(selected_farmer_doc).
	then(function(doc){
		db.get(master_data_doc_name).
		then(function(data){
			$timeout(function(){
				// $scope.land_details_obj.pre_table_data = [{value:0},{value:0}];
				for(var i = 0; i < data.data.farmerModels.length; i++){
					if (doc.farmerId == data.data.farmerModels[i].farmerId && doc.farmerTimePeriodId== data.data.farmerModels[i].farmerTimePeriodId) {
						if(data.data.farmerModels[i].totalArea > 0){
							$scope.flag = true;
							$scope.land_details_obj.farmerId = data.data.farmerModels[i].farmerId;
							$scope.land_details_obj.farmerTimePeriodId = data.data.farmerModels[i].farmerTimePeriodId;
							$scope.land_details_obj.pre_table_data[0].value = data.data.farmerModels[i].totalArea;
							$scope.land_details_obj.pre_table_data[1].value = data.data.farmerModels[i].totalOrganicArea;
							$scope.land_details_obj.isSynced=true;
							MainService.land_dtls_submitted($scope.land_details_obj, 0,$scope);
							$cordovaToast.show(land_details_synced_msg, 'long', 'center');
						}
					}
				}
			},500);
		});
	});
	var saveFlag = false;
    $scope.save=function(){
    	if (areaValue!="" && areaOValue!="" && areaValue!=0 && areaOValue!=0 && typeof areaValue!="undefined" && typeof areaOValue!="undefined" && !isNaN(areaValue) &&  !isNaN(areaOValue)) {
		 	if (parseFloat(areaValue)<parseFloat(areaOValue)) {
				MainService.alertBox(msg_area_field_validation,$scope);
			}else{
		        if (MainService.totalSum_new($scope.land_details_obj.activities,"landArea",areaOValue,$scope)) {
		   			if(MainService.area_not_filled_new_int($scope.land_details_obj.activities,"landArea",$scope,msg_land_area_not_filled)){
		   		 		MainService.save($scope.land_details_obj, 0,$scope);
		   		 		saveFlag = true;
		   		    }
		   	    }
			}
        }else{
	   		MainService.alertBox(msg_incomplte_deatils,$scope);
	   	}	
    }
    $scope.$on('eventFired', function(event, data) {
        if($scope.land_details_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })

    $scope.submit=function(){
    	if(saveFlag){
	       	if (areaValue!="" && areaOValue!="" && areaValue!=0 && areaOValue!=0 && typeof areaValue!="undefined" && typeof areaOValue!="undefined" && !isNaN(areaValue) &&  !isNaN(areaOValue)) {
			 	 	if (parseFloat(areaValue)<parseFloat(areaOValue)) {
						MainService.alertBox(msg_area_field_validation,$scope);
				 	}else{
				 	    if (MainService.totalSum_new($scope.land_details_obj.activities,"landArea",areaOValue,$scope)) {
				 	 		if(MainService.area_not_filled_new_int($scope.land_details_obj.activities,"landArea",$scope,msg_land_area_not_filled)){
								MainService.submit($scope.land_details_obj, 0,$scope);
							}
					    }
			     	}
			}else{
		   		MainService.alertBox(msg_incomplte_deatils,$scope);
			}
		}else{
		    MainService.alertBox("Please save before submitting.", $scope);
		}
    }
}])
