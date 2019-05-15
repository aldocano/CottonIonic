angular.module("SustainablePracticesController",[]).
controller('SustainablePracticesController', ['$scope', '$http','MainService', '$ionicPopup', '$filter', '$stateParams', '$timeout',
function($scope, $http, MainService, $ionicPopup, $filter, $stateParams, $timeout){
	$scope.sustainable_practices_obj = MainService.getForm_data();
    if($scope.sustainable_practices_obj.submitted === undefined){
		$http.get('sustainable_practices.json').	
		success(function(data){
			$scope.sustainable_practices_obj = data.sustainable_practices;
			
			$scope.sustainable_practices_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.sustainable_practices_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);

			var activities = data.sustainable_practices.activities;		
			var details = data.sustainable_practices.details;
			var data = [];

			for(var i = 0; i < details.length;i++){
				data.push({
					key:details[i].key,
					name: details[i].name,
					type: details[i].has_child?0:details[i].type,
					value: details[i].value?details[i].value:0,
					is_parent: true
				}); 
			}

			$scope.sustainable_practices_obj.activities = [];
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
				$scope.sustainable_practices_obj.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}
		}).
		error(function(err){
			//error fetching json
			console.error(err.message);
		});	
	}else if($scope.sustainable_practices_obj.submitted === false){
	    	$scope.flag = false;
    }else{
    	$scope.flag = true;
    }
	// responsive function called
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
  	$scope.add = function(){
  		$http.get('sustainable_practices.json').	
		success(function(data){
			var sustainable_practices_obj2 = data.sustainable_practices;
			
			sustainable_practices_obj2.farmerId = parseInt($stateParams.farmerId);
			sustainable_practices_obj2.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);

			var activities = data.sustainable_practices.activities;		
			var details = data.sustainable_practices.details;
			var data = [];

			for(var i = 0; i < details.length;i++){
				data.push({
					key:details[i].key,
					name: details[i].name,
					type: details[i].has_child?0:details[i].type,
					value: details[i].value?details[i].value:0,
					is_parent: true
				}); 
			}

			sustainable_practices_obj2.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name += ($scope.sustainable_practices_obj.activities.length + 1);
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
				sustainable_practices_obj2.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}
			$scope.sustainable_practices_obj.activities.push(sustainable_practices_obj2.activities[0]);
			$scope.shownGroup = sustainable_practices_obj2.activities[0];
		}).
		error(function(err){
			//error fetching json
			console.error(err.message);
		});  
  	}
	$scope.remove = function(){
        var click=true;
  		if($scope.sustainable_practices_obj.activities.length >1){
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
                     $scope.sustainable_practices_obj.activities.splice($scope.sustainable_practices_obj.activities.length-1, 1);
                     click=false;
                   }
                    confirmPopup.close();
                   
		        }
		      }
		    ]
		});
		}else{
			$scope.flag = false;
		}
  	};
	$scope.practicesArray = [];
	$scope.practiceMonthArray = [];
	db.get(master_data_doc_name).then(function(doc) {
		$http.get('sustainable_practices.json').	
		success(function(data){
			var orderedtypeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
            var practicesTypeId=data.sustainable_practices.practicesTypeId;
            var practiceAdoptedTypeId=data.sustainable_practices.practiceAdoptedTypeId;
	        var other = {
	        	typeDetailId: 0,
				name: "",
				checked:false
	        };
			angular.forEach(orderedtypeDetailModels, function(value, key){
				if (practicesTypeId==value.typeId) {
					if(value.typeDetailName === "Other"){
						other.typeDetailId = value.typeDetailId;
						other.name = value.typeDetailName;
					}else{
						$scope.practicesArray.push({
					    typeDetailId: value.typeDetailId,
						name: value.typeDetailName,
						checked:false,
						});
					}	
				}					
			});
			angular.forEach(doc.data.typeDetailModels, function(value, key){
				if(practiceAdoptedTypeId==value.typeId){
					$scope.practiceMonthArray.push({
				    typeDetailId: value.typeDetailId,
					name: value.typeDetailName,
					checked:false,
					});
				}					
			});
			$scope.practicesArray.push(other);
            angular.forEach($scope.sustainable_practices_obj.activities, function(value, key){
            	 angular.forEach(value.details, function(value_s, key_s){
            	 	if (value_s.type=="4.1") {
            	 		if (value_s.value!="Tap") {
                	 		angular.forEach($scope.practicesArray,function(value_t,key_t ) {
                	 			if (value_t.name != value_s.value) {
                	 				var results = $filter('filter')($scope.practicesArray, {name : value_s.value}, true);
                                 if (results.length<1) {
	     			               $scope.practicesArray.push({"typeDetailId":0,"name":value_s.value,"checked":false})
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
	$scope.otherArrayForPractices = {};
 	$scope.getChange = function(f_Obj,s_Obj,clickName,val){
        var index1=$scope.sustainable_practices_obj.activities.indexOf(f_Obj);
	    var pracfiltData,pracMonthfiltData;
	    if (clickName=="practices") {
	    	  var invalidEntries = 0;
		       pracfiltData = $scope.practicesArray.filter(function(obj) { if (val == obj.name ) {
			    return true;
			  } else {
			    invalidEntries++;
			    return false;
			  } });
	        $scope.sustainable_practices_obj.activities[""+index1+""].details[0].value=val;
	        $scope.sustainable_practices_obj.activities[""+index1+""].details[0].id=pracfiltData[0].typeDetailId;
		}else if (clickName=="pracMonth"){
	         var invalidEntries = 0;
		       pracMonthfiltData = $scope.practiceMonthArray.filter(function(obj) { if (val == obj.name ) {
			    return true;
			  } else {
			    invalidEntries++;
			    return false;
			  } });
	        $scope.sustainable_practices_obj.activities[""+index1+""].details[2].value=val;
	        $scope.sustainable_practices_obj.activities[""+index1+""].details[2].id=pracMonthfiltData[0].typeDetailId;
		}
		 if(s_Obj.value == 'Other'){
	     	var pop = $ionicPopup.show({
	     		template: '<input type="text" ng-pattern="/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/" ng-model="otherArrayForPractices.othersSpecify" style="background: #45BFAE">',
			    title: 'Please Specify',
			    scope: $scope,
	     		buttons: [ { text: 'Cancel',
	     			  onTap:function(e){
                                $scope.sustainable_practices_obj.activities[""+index1+""].details[0].id =0;
			     				$scope.sustainable_practices_obj.activities[""+index1+""].details[0].value = "";
			     				$scope.otherArrayForPractices.othersSpecify = "";
	     				 }},{
	     			text: 'Ok',
	     			onTap:function(e){
              		    if (typeof $scope.otherArrayForPractices.othersSpecify=="undefined" || $scope.otherArrayForPractices.othersSpecify=="" || $scope.otherArrayForPractices.othersSpecify=="Other") {
				            $scope.otherArrayForPractices.othersSpecify = "";
				            MainService.alertBox(msg_others_mandatory,$scope); 
	                        e.preventDefault();	
	     				}else{
	     				var str =$scope.otherArrayForPractices.othersSpecify.toString();
			            var n_count = str.length;
					       if (n_count<50) {
	                          if (clickName=="practices") {
			     				$scope.sustainable_practices_obj.activities[""+index1+""].details[0].id = pracfiltData[0].typeDetailId;
			     				$scope.sustainable_practices_obj.activities[""+index1+""].details[0].value = $scope.otherArrayForPractices.othersSpecify;
			     			    $scope.practicesArray.push({"typeDetailId":pracfiltData[0].typeDetailId,"name":$scope.otherArrayForPractices.othersSpecify,"checked":false})
			     				$scope.otherArrayForPractices.othersSpecify = "";
			     				pop.close();
			     			  }
			     			}else{
			     				$scope.otherArrayForPractices.othersSpecify="";
					            MainService.alertBox("This field accepts upto 50 characters.",$scope); 
	                            e.preventDefault();
			     			}
			     		}
	     			}
	     		}]
	     	})
	    }
	};

	var saveFlag = false;
    $scope.save=function(){
		MainService.save($scope.sustainable_practices_obj, 24,$scope);
		saveFlag = true;
    }

    $scope.$on('eventFired', function(event, data) {
        if($scope.sustainable_practices_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })     

    $scope.submit=function(){
    	if(saveFlag){
		   	MainService.submit($scope.sustainable_practices_obj, 24,$scope);
		}else{
			MainService.alertBox("Please save before submitting.", $scope);
		}    
    };		
	/*
	@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
	this function disable this process if it was synced in past.
	*/
	MainService.setFlagForSyncedFarmer($scope, sustainablePracticesProcessId);
}]);