angular.module("SowingCostController", ['ionic-datepicker']).
controller('SowingCostController', ['$scope', '$http','MainService', '$ionicPopup', '$stateParams', 'ionicDatePicker', '$filter', '$timeout',
function($scope, $http, MainService, $ionicPopup, $stateParams, ionicDatePicker, $filter, $timeout){
 	 
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

	$scope.datepickerClicked = function(f_Obj,s_Obj){
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
			var index1=$scope.sowing_cost_obj.activities.indexOf(f_Obj);
			var index2=$scope.sowing_cost_obj.activities[""+index1+""].details.indexOf(s_Obj);
			$scope.date={
				month:0,
				day:0,
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
	     				$scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value = $scope.date.day+"-"+$scope.date.month+"-"+$scope.date.year;
	     				pop.close();
	     			}
	     		}]
	     	})
		}
	}; 
 	 
 	 $scope.getChange = function(f_Obj,s_Obj,clickName,val){
	        var index1=$scope.sowing_cost_obj.activities.indexOf(f_Obj);
		    var index2=$scope.sowing_cost_obj.activities[""+index1+""].details.indexOf(s_Obj);
		    var nocfiltData,sosfiltData,tosfiltData,stdfiltData;
		    if (clickName=="noc") {
		    	  var invalidEntries = 0;
			       nocfiltData = $scope.nocArray.filter(function(obj) { if (val == obj.name ) {
				    return true;
				  } else {
				    invalidEntries++;
				    return false;
				  } });
		        $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value=val;
		        $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].id=nocfiltData[0].typeDetailId;
			}else if (clickName=="sos"){
		         var invalidEntries = 0;
			       sosfiltData = $scope.sosArray.filter(function(obj) { if (val == obj.name ) {
				    return true;
				  } else {
				    invalidEntries++;
				    return false;
				  } });
		        $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value=val;
		        $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].id=sosfiltData[0].typeDetailId;
			}
			else if (clickName=="tos"){
				 var invalidEntries = 0;
			       tosfiltData = $scope.tosArray.filter(function(obj) { if (val == obj.name ) {
				    return true;
				  } else {
				    invalidEntries++;
				    return false;
				  } });
		        $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value=val;
		        $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].id=tosfiltData[0].typeDetailId;
			}else{
				 var invalidEntries = 0;
			       stdfiltData = $scope.stdArray.filter(function(obj) { if (val == obj.name ) {
				    return true;
				  } else {
				    invalidEntries++;
				    return false;
				  } });
		        $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value=val;
		        $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].id=stdfiltData[0].typeDetailId;;
			}
			 if(s_Obj.value == 'Others'){
		     	var pop = $ionicPopup.show({
		     		template: '<input type="text" ng-pattern="/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/" ng-model="otherArrayForNOC.othersSpecify" style="background: #45BFAE">',
				    title: 'Please Specify',
				    scope: $scope,
		     		buttons: [ { text: 'Cancel',
		     			  onTap:function(e){
                                    $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].id =0;
				     				$scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value = "";
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
				     				$scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].id = nocfiltData[0].typeDetailId;
				     				$scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value = $scope.otherArrayForNOC.othersSpecify;
				     			    $scope.nocArray.push({"typeDetailId":nocfiltData[0].typeDetailId,"name":$scope.otherArrayForNOC.othersSpecify,"checked":false})
				     				$scope.otherArrayForNOC.othersSpecify = "";
				     				pop.close();
				     			  }else{
				                    $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].id = stdfiltData[0].typeDetailId;
				                    $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value = $scope.otherArrayForNOC.othersSpecify;
				     			    $scope.stdArray.push({"typeDetailId":stdfiltData[0].typeDetailId,"name":$scope.otherArrayForNOC.othersSpecify,"checked":false})
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

 	//// fetch land details data
    var areaValue,areaOValue;
    $scope.$on('landdetail_result', function(event, data) {
    	areaValue=data[0].value;
    	areaOValue=data[1].value;
 	}) 
	//// Area compare validation function called
    $scope.areaCompareValidation=function(f_obj,s_obj,key,val){
     	MainService.areaCompareValidation(f_obj,s_obj,key,val,$scope,"sowing_cost_obj","farmArea",areaOValue);
    }
    //// positive number validation
    $scope.integerValidation=function(f_obj,s_obj,val){
       MainService.integerValidation(f_obj,s_obj,val,$scope,"sowing_cost_obj");
    }
    //// positive number validation
    $scope.floatValidation=function(f_obj,s_obj,val){
       MainService.floatValidation(f_obj,s_obj,val,$scope,"sowing_cost_obj");
    }
    $scope.floatValidation1=function(f_obj,s_obj,val){
       MainService.floatValidation1(f_obj,s_obj,val,$scope,"sowing_cost_obj");
    }
    $scope.floatValidation2=function(f_obj,s_obj,val){
       MainService.floatValidation_for_ry(f_obj,s_obj,val,$scope,"sowing_cost_obj");
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

	$scope.sowing_cost_obj = MainService.getForm_data();
    if($scope.sowing_cost_obj.submitted === undefined){
    	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		$http.get('sowing_cost.json').	
		success(function(data){
			$scope.sowing_cost_obj = data.sowing_cost;
			
			$scope.sowing_cost_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.sowing_cost_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
            //// getting area details from land details
            MainService.getlandDetailsData($scope.sowing_cost_obj.farmerId,$scope.sowing_cost_obj.farmerTimePeriodId);

			var activities = data.sowing_cost.activities;		
			var details = data.sowing_cost.details;
			var child_details = data.sowing_cost.child_details;
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
			$scope.sowing_cost_obj.activities = [];
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
				$scope.sowing_cost_obj.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}
	     MainService.checkOrganicArea($scope.sowing_cost_obj.farmerId);
    	
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
    }else if($scope.sowing_cost_obj.submitted === false){
         //// getting area details from land details
	     MainService.checkOrganicArea($scope.sowing_cost_obj.farmerId);
         MainService.getlandDetailsData($scope.sowing_cost_obj.farmerId,$scope.sowing_cost_obj.farmerTimePeriodId);
    	$scope.flag = false;
    	console.log("false");
    }else{
    	$scope.flag = true;
    	console.log("true");
    }
    $scope.validString=function(f_obj,s_obj,val){
     	MainService.validString(f_obj,s_obj,val,$scope,"sowing_cost_obj");
    }
    var saveFlag = false;
    $scope.save=function(){
    	if (typeof currentFarmerwiseData[0]!="undefined") {
	       	if (currentFarmerwiseData[0].data.land_details.submitted){
	    		if(MainService.totalSum($scope.sowing_cost_obj.activities,"farmArea",areaOValue,$scope)){
	    			if(MainService.area_not_filled_new($scope.sowing_cost_obj.activities,"farmArea",$scope, msg_area_not_filled)){
	   		        	MainService.save($scope.sowing_cost_obj, 3,$scope);
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
        if($scope.sowing_cost_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })     

    $scope.submit=function(){
    	if(saveFlag){
		    if (MainService.totalSum($scope.sowing_cost_obj.activities,"farmArea",areaOValue,$scope)) {
		   	   if(MainService.area_not_filled_new($scope.sowing_cost_obj.activities,"farmArea",$scope, msg_area_not_filled)){
		   	    MainService.submit($scope.sowing_cost_obj, 3,$scope);
		   	   }
		    }
		}else{
			MainService.alertBox("Please save before submitting.", $scope);
		}    
    };


	  	$scope.remove = function(){
        var click=true;
  		if($scope.sowing_cost_obj.activities.length >1){
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
                         $scope.sowing_cost_obj.activities.splice($scope.sowing_cost_obj.activities.length-1, 1);
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

	$scope.nocArray = [];
	$scope.sosArray = [];
	$scope.tosArray = [];
	$scope.stdArray = [];
	$scope.landDetailCurrentStatus=[];
	db.get(master_data_doc_name).then(function(doc) {
		$http.get('sowing_cost.json').	
			success(function(data){
				doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
	            var sowingNameOfCropTypeId=data.sowing_cost.sowingNameOfCropTypeId;
	            var sowingSourceOfSeedTypeId=data.sowing_cost.sowingSourceOfSeedTypeId;
	            var sowingTypeOfSeedTypeId=data.sowing_cost.sowingTypeOfSeedTypeId;
	            var sowingSeedTreatmentDetailsTypeId=data.sowing_cost.sowingSeedTreatmentDetailsTypeId;
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

						if (sowingNameOfCropTypeId==value.typeId) {
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
						if (sowingSourceOfSeedTypeId==value.typeId) {
							$scope.sosArray.push({
						    typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
							});
						}
						if (sowingTypeOfSeedTypeId==value.typeId) {
							$scope.tosArray.push({
						    typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
							});
						}
						if (sowingSeedTreatmentDetailsTypeId==value.typeId) {
							if(value.typeDetailName === "Others"){
								other1.typeDetailId = value.typeDetailId;
								other1.name = value.typeDetailName;
							}else{
								$scope.stdArray.push({
							    typeDetailId: value.typeDetailId,
								name: value.typeDetailName,
								checked:false,
								});
							}	
						}
					});
					$scope.nocArray.push(other);
					$scope.stdArray.push(other1);
	                angular.forEach($scope.sowing_cost_obj.activities, function(value, key){
	                	 angular.forEach(value.details, function(value_s, key_s){
	                	 	if (value_s.type=="4.4") {
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
	                	 	}else if (value_s.type=="4.3") {
	                	 		if (value_s.value!="Tap") {
		                	 		angular.forEach($scope.stdArray,function(value_t,key_t ) {
		                	 			if (value_t.name != value_s.value) {
		                	 				 var results = $filter('filter')($scope.stdArray, {name : value_s.value}, true);
			                                 if (results.length<1) {
				     			               $scope.stdArray.push({"typeDetailId":0,"name":value_s.value,"checked":false})
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
	$scope.otherArrayForSTD = {};
	$scope.dropdownClicked = function(f_Obj,s_Obj,clickName){
		if(!$scope.flag){
			var index1=$scope.sowing_cost_obj.activities.indexOf(f_Obj);
			var index2=$scope.sowing_cost_obj.activities[""+index1+""].details.indexOf(s_Obj);
			
			var pagename="";
			if (clickName=="noc") {
				MainService.dropdownRefresh(index1,index2,"nocArray","sowing_cost_obj",$scope)
	            pagename="templates/name_of_cropPopup.html"
			}else if (clickName=="sos"){
				MainService.dropdownRefresh(index1,index2,"sosArray","sowing_cost_obj",$scope)
	            pagename="templates/source_of_seedPopup.html"
			}
			else if (clickName=="tos"){
				MainService.dropdownRefresh(index1,index2,"tosArray","sowing_cost_obj",$scope)
	            pagename="templates/type_of_seedPopup.html"
			}else{
				MainService.dropdownRefresh(index1,index2,"stdArray","sowing_cost_obj",$scope)
	            pagename="templates/seed_trtmnt_dtlsPopup.html"
			}

			var sos_popup = $ionicPopup.show({
	    		templateUrl: pagename,
	    		title: 'Choose Item',
	    		// subTitle: 'Please use normal things',
	    		scope: $scope,
	    		buttons: [
	    			{
	     				text: 'Ok',
	     				type: 'button-positive',
	     				onTap: function(e) {
	     					if (clickName=="noc") {
	                  		angular.forEach($scope.nocArray, function(value, key){
	              				if (value.checked==true) {
							     $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value=value.name;
								 $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].id=value.typeDetailId;
								 	if(value.name == 'Others'){
								     	var pop = $ionicPopup.show({
								     		template: '<input type="text" ng-model="otherArrayForNOC.othersSpecify" style="background: #45BFAE">',
										    title: 'Please Specify',
										    scope: $scope,
								     		buttons: [{
								     			text: 'Ok',
								     			onTap:function(e){
								     				$scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value = $scope.otherArrayForNOC.othersSpecify;
								     				$scope.otherArrayForNOC.othersSpecify = "";
								     				pop.close();
								     			}
								     		}]
								     	})
								     }
								}
							});
	                  	    }else if (clickName=="sos"){
							angular.forEach($scope.sosArray, function(value, s_key){
								if (value.checked==true) {
							     $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value=value.name;
								 $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].id=value.typeDetailId;

								}
							});
						    }else if (clickName=="tos"){
							angular.forEach($scope.tosArray, function(value, s_key){
								if (value.checked==true) {
							     $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value=value.name;
								 $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].id=value.typeDetailId;

								}
							});
							}else{
							angular.forEach($scope.stdArray, function(value, s_key){
								if (value.checked==true) {
							     $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value=value.name;
								 $scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].id=value.typeDetailId;
								 	if(value.name == 'Other'){
								     	var pop = $ionicPopup.show({
								     		template: '<input type="text" ng-model="otherArrayForSTD.othersSpecify" style="background: #45BFAE">',
										    title: 'Please Specify',
										    scope: $scope,
								     		buttons: [{
								     			text: 'Ok',
								     			onTap:function(e){
								     				$scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value = $scope.otherArrayForSTD.othersSpecify;
								     				$scope.otherArrayForSTD.othersSpecify = "";
								     				pop.close();
								     			}
								     		}]
								     	})
								     }
								}
							});
						    }
	     				}	
	   				}
	 			]
	  		});
		}
	}; 

	$scope.changeSos = function(status_index){
      angular.forEach($scope.sosArray,function(f_value,f_key){
      	if (status_index==f_key) {
      	$scope.sosArray[f_key].checked = true;
        }else{$scope.sosArray[f_key].checked = false;}
      })
	};	

	$scope.changeTos = function(status_index){
      angular.forEach($scope.tosArray,function(f_value,f_key){
      	if (status_index==f_key) {
      	$scope.tosArray[f_key].checked = true;
        }else{$scope.tosArray[f_key].checked = false;}
      })
	};

	$scope.changeStd = function(status_index){
      angular.forEach($scope.stdArray,function(f_value,f_key){
      	if (status_index==f_key) {
      	$scope.stdArray[f_key].checked = true;
        }else{$scope.stdArray[f_key].checked = false;}
      })
	};	

	$scope.changeNoc = function(status_index){
      angular.forEach($scope.nocArray,function(f_value,f_key){
      	if (status_index==f_key) {
      	$scope.nocArray[f_key].checked = true;
        }else{$scope.nocArray[f_key].checked = false;}
      })
	};
	$scope.myfy=function(f_Obj,s_Obj,val){

		var index1=$scope.sowing_cost_obj.activities.indexOf(f_Obj);
		var index2=$scope.sowing_cost_obj.activities[""+index1+""].details.indexOf(s_Obj);
		$scope.sowing_cost_obj.activities[""+index1+""].details[""+index2+""].value=$filter('date')(val, 'yyyy-MM-dd'); //$filter('date')(val, 'yyyy-MM-dd'); 

	}
  	$scope.add = function(){
  		$http.get('sowing_cost.json').	
		success(function(data){
			var sowing_cost_obj2 = data.sowing_cost;
			
			sowing_cost_obj2.farmer_id = parseInt($stateParams.farmer_id);
			sowing_cost_obj2.financial_year = parseInt($stateParams.financial_year);

			var activities = data.sowing_cost.activities;		
			var details = data.sowing_cost.details;
			var child_details = data.sowing_cost.child_details;
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
			sowing_cost_obj2.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name += ($scope.sowing_cost_obj.activities.length + 1);
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
				sowing_cost_obj2.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}

			$scope.sowing_cost_obj.activities.push(sowing_cost_obj2.activities[0]);	
			$timeout(function(){
				$scope.shownGroup = sowing_cost_obj2.activities[0];
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
	MainService.setFlagForSyncedFarmer($scope, seedSowingProcessId);
	
}]);


	
