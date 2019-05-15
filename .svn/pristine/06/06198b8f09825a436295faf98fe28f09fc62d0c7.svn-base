angular.module("MeetingAttendedByController", ['ionic-datepicker']).
controller('MeetingAttendedByController', ['$scope', '$http','MainService', '$ionicPopup', '$stateParams', 'ionicDatePicker', '$filter', '$timeout',
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
			var index1=$scope.meeting_attended_by_obj.activities.indexOf(f_Obj);
			var index2=$scope.meeting_attended_by_obj.activities[""+index1+""].details.indexOf(s_Obj);
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
	     				$scope.meeting_attended_by_obj.activities[""+index1+""].details[""+index2+""].value = $scope.date.day+"-"+$scope.date.month+"-"+$scope.date.year;
	     				pop.close();
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

	$scope.meeting_attended_by_obj = MainService.getForm_data();
    if($scope.meeting_attended_by_obj.submitted === undefined){
    	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		$http.get('meeting_attended_by.json').	
		success(function(data){
			$scope.meeting_attended_by_obj = data.meeting_attended_by;
			
			$scope.meeting_attended_by_obj.farmerId = parseInt($stateParams.farmerId);
			$scope.meeting_attended_by_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
            //// getting area details from land details
            MainService.getlandDetailsData($scope.meeting_attended_by_obj.farmerId,$scope.meeting_attended_by_obj.farmerTimePeriodId);

			var activities = data.meeting_attended_by.activities;		
			var details = data.meeting_attended_by.details;
			var child_details = data.meeting_attended_by.child_details;
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
			$scope.meeting_attended_by_obj.activities = [];
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
				$scope.meeting_attended_by_obj.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}
	     MainService.checkOrganicArea($scope.meeting_attended_by_obj.farmerId);
    	
	}).
	error(function(err){
		//error fetching json
		console.error(err.message);
	});	
    }else if($scope.meeting_attended_by_obj.submitted === false){
         //// getting area details from land details
	     MainService.checkOrganicArea($scope.meeting_attended_by_obj.farmerId);
         MainService.getlandDetailsData($scope.meeting_attended_by_obj.farmerId,$scope.meeting_attended_by_obj.farmerTimePeriodId);
    	$scope.flag = false;
    	console.log("false");
    }else{
    	$scope.flag = true;
    	console.log("true");
    }
    $scope.validString=function(f_obj,s_obj,val){
     	MainService.validString(f_obj,s_obj,val,$scope,"meeting_attended_by_obj");
    }
    var saveFlag = false;
    $scope.save=function(){
    	MainService.save($scope.meeting_attended_by_obj, 12,$scope);
    	saveFlag = true;
    }

    $scope.$on('eventFired', function(event, data) {
        if($scope.meeting_attended_by_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })     

    $scope.submit=function(){
    	if(saveFlag){
		   	    MainService.submit($scope.meeting_attended_by_obj, 12,$scope);
		}else{
			MainService.alertBox("Please save before submitting.", $scope);
		}    
    };


	$scope.remove = function(){
        var click=true;
  		if($scope.meeting_attended_by_obj.activities.length >1){
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
                         $scope.meeting_attended_by_obj.activities.splice($scope.meeting_attended_by_obj.activities.length-1, 1);
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
	
	$scope.subArray = [];
	$scope.landDetailCurrentStatus=[];
	db.get(master_data_doc_name).then(function(doc) {
		$http.get('meeting_attended_by.json').	
			success(function(data){
				doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
	            var subjectTypeId=data.meeting_attended_by.subjectTypeId;
				angular.forEach(doc.data.typeDetailModels, function(value, key){

					if (subjectTypeId==value.typeId) {
							$scope.subArray.push({
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
	$scope.getChange = function(f_Obj,s_Obj,val){
	        var index1=$scope.meeting_attended_by_obj.activities.indexOf(f_Obj);
		    var index2=$scope.meeting_attended_by_obj.activities[""+index1+""].details.indexOf(s_Obj);
              var invalidEntries = 0;
		      var moafiltData = $scope.subArray.filter(function(obj) { if (val == obj.name ) {
			    return true;
			  } else {
			    invalidEntries++;
			    return false;
			  } });
               $scope.meeting_attended_by_obj.activities[""+index1+""].details[""+index2+""].value=val;
		       $scope.meeting_attended_by_obj.activities[""+index1+""].details[""+index2+""].id=moafiltData[0].typeDetailId;
	};
	$scope.myfy=function(f_Obj,s_Obj,val){

		var index1=$scope.meeting_attended_by_obj.activities.indexOf(f_Obj);
		var index2=$scope.meeting_attended_by_obj.activities[""+index1+""].details.indexOf(s_Obj);
		$scope.meeting_attended_by_obj.activities[""+index1+""].details[""+index2+""].value=$filter('date')(val, 'yyyy-MM-dd'); //$filter('date')(val, 'yyyy-MM-dd'); 

	}
  	$scope.add = function(){
  		$http.get('meeting_attended_by.json').	
		success(function(data){
			var meeting_attended_by_obj2 = data.meeting_attended_by;
			
			meeting_attended_by_obj2.farmer_id = parseInt($stateParams.farmer_id);
			meeting_attended_by_obj2.financial_year = parseInt($stateParams.financial_year);

			var activities = data.meeting_attended_by.activities;		
			var details = data.meeting_attended_by.details;
			var child_details = data.meeting_attended_by.child_details;
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
			meeting_attended_by_obj2.activities = [];
			for(var i = 0; i < activities.length;i++){
				activities[i].name += ($scope.meeting_attended_by_obj.activities.length + 1);
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
				meeting_attended_by_obj2.activities.push({
					name: activities[i].name,
					details: details_here
				});
			}

			$scope.meeting_attended_by_obj.activities.push(meeting_attended_by_obj2.activities[0]);	
			$timeout(function(){
				$scope.shownGroup = meeting_attended_by_obj2.activities[0];
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
	MainService.setFlagForSyncedFarmer($scope, trainingMeetingFarmerProcessId);
}]);