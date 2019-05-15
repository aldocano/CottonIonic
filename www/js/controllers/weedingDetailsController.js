angular.module("WeedingDetailsController", []).
controller('WeedingDetailsController', ['$scope','MainService', '$rootScope', '$ionicPopup', '$location','$cordovaToast','$filter','$http','$stateParams','$timeout',
	function($scope, MainService, $rootScope, $ionicPopup, $location, $cordovaToast, $filter,$http,$stateParams,$timeout){
	
      //@@@@@author Sourav Keshari Nath @@@@@@
	$scope.day=[01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
	$scope.month=[{id:01,name:"January"},
	{id:02,name:"February"},{id:03,name:"March"},{id:04,name:"April"},{id:05,name:"May"},
	{id:06,name:"June"},{id:07,name:"July"},{id:08,name:"August"},
	{id:09,name:"September"},{id:10,name:"October"},{id:11,name:"November"},
    {id:12,name:"December"}];
	$scope.year=[1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];

	var numDays = {
	                '1': 31, '2': 28, '3': 31, '4': 30, '5': 31, '6': 30,
	                '7': 31, '8': 31, '9': 30, '10': 31, '11': 30, '12': 31
	              };

	$scope.setDays=function(oMonthSel, oDaysSel, oYearSel)
		{
			$scope.day=[01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
			$scope.month=[{id:01,name:"January"},
			{id:02,name:"February"},{id:03,name:"March"},{id:04,name:"April"},{id:05,name:"May"},
			{id:06,name:"June"},{id:07,name:"July"},{id:08,name:"August"},
			{id:09,name:"September"},{id:10,name:"October"},{id:11,name:"November"},
		    {id:12,name:"December"}];
	        $scope.year=[1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];
                var v = new Date();
		        var n = v.getDate();
				var d = new Date();
		        var y = d.getFullYear();
		        var m = d.getMonth()+1;
		        if (oYearSel==y) {
			        if (oMonthSel>m) { oMonthSel=m;	$scope.date.month=m;}
			         if (oMonthSel==m) {
			           if (oDaysSel>n) { oDaysSel=n;$scope.date.day=n;}
			         }
                }
				var nDays, oDaysSelLgth, opt, i = 1;
				nDays = numDays[oMonthSel];
				if (nDays == 28 && oYearSel % 4 == 0)
					++nDays;
				oDaysSelLgth = oDaysSel;
			    $scope.selecteddate=[];
				angular.forEach($scope.day, function(value, key){
					if (value<=nDays) {
						$scope.selecteddate.push(value)
					}
				});

			    $scope.day=$scope.selecteddate;
			   
		        if (oYearSel!=y && oYearSel<y) {
                   $scope.currentYear=[];
					angular.forEach($scope.year, function(value, key){
							if (value<=y) {
								$scope.currentYear.push(value)
							}
					});
					$scope.year=$scope.currentYear;
					var indexValue = $scope.day.indexOf(oDaysSel);
					if (indexValue=="-1") {
						$scope.date.day=1;
					}
             
		        }else{
					$scope.currentMonth=[];
					angular.forEach($scope.month, function(value, key){
							if (value.id<=m) {
								$scope.currentMonth.push({id:value.id,name:value.name})
							}
							if (value.id==m) {
							   $scope.valuePointer=value.id;
							}
						});
                    $scope.currentDay=[];
			        if (oMonthSel==m) {
						angular.forEach($scope.day, function(value, key){
					        if (value<=n) {
						      $scope.currentDay.push(value)
				            }
			             });
					}else{
						angular.forEach($scope.day, function(value, key){
						      $scope.currentDay.push(value)
			             });
					}
			        $scope.currentYear=[];
					angular.forEach($scope.year, function(value, key){
							if (value<=y) {
								$scope.currentYear.push(value)
							}
						});
					$scope.day=$scope.currentDay;
					$scope.month=$scope.currentMonth;
					$scope.year=$scope.currentYear;
				}
				if (oDaysSel==undefined) {
					$scope.date.day=1;
				}
			
		}

	$scope.datepickerClicked = function(f_Obj,s_Obj,t_Obj){
		if(!$scope.flag){
	    	var v = new Date();
	        var n = v.getDate();
			var d = new Date();
	        var y = d.getFullYear();
	        var m =d.getMonth()+1;
			$scope.day=[01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
            
			$scope.currentDay=[];
			angular.forEach($scope.day, function(value, key){
				if (value<=n) {
					$scope.currentDay.push(value)
				}
			});
			$scope.currentMonth=[];
			angular.forEach($scope.month, function(value, key){
				if (value.id<=m) {
					$scope.currentMonth.push({id:value.id,name:value.name})
				}
			});
			$scope.currentYear=[];
			angular.forEach($scope.year, function(value, key){
				if (value<=y) {
					$scope.currentYear.push(value)
				}
			});
			$scope.day=$scope.currentDay;
			$scope.month=$scope.currentMonth;
			$scope.year=$scope.currentYear;
			var index1=$scope.weeding_details_obj.activities.indexOf(f_Obj);
			var index2=$scope.weeding_details_obj.activities[""+index1+""].details.indexOf(s_Obj);
			var index3=$scope.weeding_details_obj.activities[""+index1+""].details[""+index2+""].child_details.indexOf(t_Obj);
			$scope.date={
				month:0,
				day:1,
				year:0
			}
			$scope.date.month=m;
			$scope.date.day=n;
			$scope.date.year=y;
			var pop = $ionicPopup.show({
	     		template: '<div style="width:100%"><select style="width:42%"  ng-model="date.month" ng-options="obj.id as obj.name for obj in month" ng-change="setDays(date.month,date.day,date.year)" required></select>'+
	     		'<select style="width:25%"  ng-model="date.day" ng-options="obj for obj in day" ng-change="setDays(date.month,date.day,date.year)" required></select>'+
	     		'<select style="width:33%" ng-model="date.year" ng-options="obj for obj in year" ng-change="setDays(date.month,date.day,date.year)" required></select></div>',
			    title: 'DatePicker',
			    scope: $scope,
	     		buttons: [{
	     			text: 'Ok',
	     			onTap:function(e){
	     				$scope.weeding_details_obj.activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value = $scope.date.day+"-"+$scope.date.month+"-"+$scope.date.year;
	     				pop.close();
	     			}
	     		}]
	     	})
		}
	}; 
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
       MainService.integerValidationSub(f_obj,s_obj,t_obj,val,$scope,"weeding_details_obj");
    }
    //// positive number validation
    $scope.floatValidation=function(f_obj,s_obj,val){
       MainService.floatValidation(f_obj,s_obj,val,$scope,"weeding_details_obj");
    }
    $scope.floatValidation2=function(f_obj,s_obj,t_obj,val){
       MainService.floatValidation_for_child(f_obj,s_obj,t_obj,val,$scope,"weeding_details_obj");
    }
     //// Area compare validation function called
    $scope.areaCompareValidation=function(f_obj,s_obj,key,val){
        MainService.areaCompareValidation(f_obj,s_obj,key,val,$scope,"weeding_details_obj","farmArea",areaOValue);
    }

    $scope.weeding_details_obj = MainService.getForm_data();
      if($scope.weeding_details_obj.submitted === undefined){	
     	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		db.get(master_data_doc_name).then(function(doc) {
		$http.get('weeding_details.json').	
		success(function(data){
            var landDetailCurrentStatusTypeId=data.weeding_details.landDetailCurrentStatusTypeId;

			$scope.weeding_details_obj = data.weeding_details;
			$scope.weeding_details_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.weeding_details_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
         
            MainService.getlandDetailsData($scope.weeding_details_obj.farmerId,$scope.weeding_details_obj.farmerTimePeriodId);

			var activities = data.weeding_details.activities;		
			var details = data.weeding_details.details;
			var child_details = data.weeding_details.child_details;
			var data = [];
			var child_data = [];


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
			$scope.weeding_details_obj.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name = activities[i].name + (i+1);
				var childName = "Weeding Details No." + (i+1);
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
				$scope.weeding_details_obj.activities.push({
					name: activities[i].name,
					show:false,
					details: details_here,
				});
			}
            MainService.checkOrganicArea($scope.weeding_details_obj.farmerId);
		}).
		error(function(err){
		//error fetching json
			console.error(err.message);
		});	
	}).catch(function (err) {
		  console.log(err);
		});
    }else if($scope.weeding_details_obj.submitted === false){
    	//// getting area details from land details
    	MainService.checkOrganicArea($scope.weeding_details_obj.farmerId);
        MainService.getlandDetailsData($scope.weeding_details_obj.farmerId,$scope.weeding_details_obj.farmerTimePeriodId);
    	$scope.flag = false;
    }else{
    	$scope.flag = true;
    }
    $scope.add = function(){
  		$http.get('weeding_details.json').	
		success(function(data){

			var weeding_details_obj2 = data.weeding_details;
			weeding_details_obj2.farmerId = parseInt($stateParams.farmerId);
			weeding_details_obj2.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
         

			var activities = data.weeding_details.activities;		
			var details = data.weeding_details.details;
			var child_details = data.weeding_details.child_details;
			var data = [];
			var child_data = [];


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
			weeding_details_obj2.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name = activities[i].name + ($scope.weeding_details_obj.activities.length+1);
				var childName = "Weeding Details No." + (i+1);
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
				weeding_details_obj2.activities.push({
					name: activities[i].name,
					show:false,
					details: details_here,
				});
			}

			$scope.weeding_details_obj.activities.push(weeding_details_obj2.activities[0]);	
			$timeout(function(){
				$scope.shownChild=null;
				$scope.shownGroup = weeding_details_obj2.activities[0];
			},200);
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
  	};
  	 $scope.addSub = function(f_Obj,s_Obj){
  		$http.get('weeding_details.json').	
		success(function(data){
            var index1=$scope.weeding_details_obj.activities.indexOf(f_Obj);
			var details = data.weeding_details.details;
             var childDetails=[];
             angular.forEach(details, function(value, key){
             	if (value.child_details.length>0) {
             		childDetails=value.child_details;
             	}
             });
             var childs={
             	"name": "Weeding Details No."+($scope.weeding_details_obj.activities[""+index1+""].details.length-2+1),
				"type": 4,
				"has_child": true,
				"value": 0,
				"child_details": childDetails
             }
             $scope.weeding_details_obj.activities[""+index1+""].details.push(childs);
            $timeout(function(){
				$scope.shownChild = childs;
			},200);

	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
  	};
    $scope.remove = function(){
        var click=true;
  		if($scope.weeding_details_obj.activities.length != 1){
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
                    		$scope.weeding_details_obj.activities.splice($scope.weeding_details_obj.activities.length-1, 1);
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
    $scope.removeSub = function(f_Obj){
        var click=true;
        var index1=$scope.weeding_details_obj.activities.indexOf(f_Obj);
  		if($scope.weeding_details_obj.activities[""+index1+""].details.length > 3){
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
                    		$scope.weeding_details_obj.activities[""+index1+""].details.splice($scope.weeding_details_obj.activities[""+index1+""].details.length-1, 1);
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
    $scope.getChange = function(f_Obj,s_Obj,clickName,val){
	        var index1=$scope.weeding_details_obj.activities.indexOf(f_Obj);
		    var index2=$scope.weeding_details_obj.activities[""+index1+""].details.indexOf(s_Obj);
		    var nocfiltData;
		    if (clickName=="noc") {
		    	  var invalidEntries = 0;
			       nocfiltData = $scope.nocArray.filter(function(obj) { if (val == obj.name ) {
				    return true;
				  } else {
				    invalidEntries++;
				    return false;
				  } });
		        $scope.weeding_details_obj.activities[""+index1+""].details[""+index2+""].value=val;
		        $scope.weeding_details_obj.activities[""+index1+""].details[""+index2+""].id=nocfiltData[0].typeDetailId;
			}
			 if(s_Obj.value == 'Others'){
		     	var pop = $ionicPopup.show({
		     		template: '<input type="text" ng-pattern="/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/" ng-model="otherArrayForNOC.othersSpecify" style="background: #45BFAE">',
				    title: 'Please Specify',
				    scope: $scope,
		     		buttons: [ { text: 'Cancel',
		     			  onTap:function(e){
                                    $scope.weeding_details_obj.activities[""+index1+""].details[""+index2+""].id =0;
				     				$scope.weeding_details_obj.activities[""+index1+""].details[""+index2+""].value = "";
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
				     				$scope.weeding_details_obj.activities[""+index1+""].details[""+index2+""].id = nocfiltData[0].typeDetailId;
				     				$scope.weeding_details_obj.activities[""+index1+""].details[""+index2+""].value = $scope.otherArrayForNOC.othersSpecify;
				     			    $scope.nocArray.push({"typeDetailId":nocfiltData[0].typeDetailId,"name":$scope.otherArrayForNOC.othersSpecify,"checked":false})
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
	};


    $scope.nocArray = [];
	$scope.landDetailCurrentStatus=[];
	db.get(master_data_doc_name).then(function(doc) {
		$http.get('weeding_details.json').	
			success(function(data){
				doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
	            var nameOfCropTypeId=data.weeding_details.nameOfCropTypeId;
	            
		        var other = {
		   //      	typeDetailId: 0,
					// name: "",
					// checked:false
		        };
					angular.forEach(doc.data.typeDetailModels, function(value, key){

						if (nameOfCropTypeId==value.typeId) {
							if(value.typeDetailName === "Others"){
								other.typeDetailId = value.typeDetailId;
								other.name = value.typeDetailName;
							}else{
								$scope.nocArray.push({
							    typeDetailId: value.typeDetailId,
								name: value.typeDetailName,
								checked:false,
								});
							}	
						}
						
					});
					$scope.nocArray.push(other);
	                angular.forEach($scope.weeding_details_obj.activities, function(value, key){
	                	 angular.forEach(value.details, function(value_s, key_s){
	                	 	if (value_s.type=="1") {
	                	 		if (value_s.value!="Tap") {
		                	 		angular.forEach($scope.nocArray,function(value_t,key_t ) {
		                	 			if (value_t.name != value_s.value) {
		                	 				var results = $filter('filter')($scope.nocArray, {name : value_s.value}, true);
		                                 if (results.length<1) {
			     			               $scope.nocArray.push({"typeDetailId":0,"name":value_s.value,"checked":false})
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



	$scope.toggleGroup = function(group) {
	    if ($scope.isGroupShown(group)) {
	      $scope.shownGroup = null;
	    } else {
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
	    			if(MainService.area_not_filled_new($scope.weeding_details_obj.activities,"farmArea",$scope,msg_farm_area_not_filled)){
	   		        	MainService.save($scope.weeding_details_obj, 8,$scope);
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
        if($scope.weeding_details_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })     

    $scope.submit=function(){
    	if(saveFlag){
		    	if(MainService.area_not_filled_new($scope.weeding_details_obj.activities,"farmArea",$scope,msg_farm_area_not_filled)){
		   	       MainService.submit($scope.weeding_details_obj, 8,$scope);
		   	   }
		}else{
			MainService.alertBox("Please save before submitting.", $scope);
		}    
    };
	/*
	@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
	this function disable this process if it was synced in past.
	*/
	MainService.setFlagForSyncedFarmer($scope, weedingDetailProcessId);  	    
}])