angular.module("HelpEmploymentController", []).
controller('HelpEmploymentController', ['$scope','$http','MainService', '$rootScope','$ionicPopup','$stateParams','$timeout',
	function($scope,$http,MainService, $rootScope, $ionicPopup, $stateParams,$timeout){
   
	// @ author Sourav keshari nath @ /////
    //// fetch land details data 
    var areaValue,areaOValue;
    $scope.$on('landdetail_result', function(event, data) {
    	areaValue=data[0].value;
    	areaOValue=data[1].value;
 	});

 	$scope.integerValidation = function (key1,key2,val,type){
    	if(val !== null && val != " " && val != ""){ 
	 	  	if (type=="pre_table_data") {
	 	  		var index1=$scope.help_employement_obj.pre_table_data.indexOf(key1);
	 	  		if (typeof val!="undefined"){
	            if(MainService.validInteger(val)){
			        if (typeof val!="undefined"){
			    		$scope.help_employement_obj.pre_table_data[""+index1+""].value=val;
			    	}else{
			    		MainService.alertBox(msg_labour_related_num_field,$scope);
			    		$scope.help_employement_obj.pre_table_data[""+index1+""].value="";
			    	}
			    }else{
			    	MainService.alertBox(three_digit_validation,$scope);
			    	$scope.help_employement_obj.pre_table_data[""+index1+""].value= null;
			    }
			}else{
				MainService.alertBox(three_digit_validation,$scope);
			    $scope.help_employement_obj.pre_table_data[""+index1+""].value= null;
			}
	    	}else{
		 		var index1=$scope.help_employement_obj.activities.indexOf(key1);
			    var index2=$scope.help_employement_obj.activities[""+index1+""].details.indexOf(key2);
			    if (typeof val!="undefined"){
			    if (MainService.validInteger(val)){
			        if (typeof val!="undefined"){
			    		$scope.help_employement_obj.activities[""+index1+""].details[""+index2+""].value=val;
			    	}else{
			    		MainService.alertBox(msg_labour_related_num_field,$scope);
			    		$scope.help_employement_obj.activities[""+index1+""].details[""+index2+""].value="";
			    	}
			    }else{
			    	MainService.alertBox(two_digit_validation,$scope);
			    	$scope.help_employement_obj.activities[""+index1+""].details[""+index2+""].value=null;
			    }
			}else{
				MainService.alertBox(two_digit_validation,$scope);
			    $scope.help_employement_obj.activities[""+index1+""].details[""+index2+""].value=null;
			}
	 	    }
	 	}    
 	}
    //// validation function called
   $scope.floatValidation = function (key1,key2,val,type) {
 	if (type=="pre_table_data") {
        var index1=$scope.help_employement_obj.pre_table_data.indexOf(key1);
        if (typeof val!="undefined") {
    		$scope.help_employement_obj.pre_table_data[""+index1+""].value=val;
    	}else{
    		MainService.alertBox(msg_number_field_validation,$scope);
    		$scope.help_employement_obj.pre_table_data[""+index1+""].value="";
    	}
 	}else{
 		 var index1=$scope.help_employement_obj.activities.indexOf(key1);
	    var index2=$scope.help_employement_obj.activities[""+index1+""].details.indexOf(key2);
        if (typeof val!="undefined") {
    		$scope.help_employement_obj.activities[""+index1+""].details[""+index2+""].value=val;
    	}else{
    		MainService.alertBox(msg_number_field_validation,$scope);
    		$scope.help_employement_obj.activities[""+index1+""].details[""+index2+""].value="";
    	}
 	}
 	          
   }
	// @ author Sourav keshari nath @ /////
   
     var style_Obj=MainService.ScreenSize();
      if (typeof  style_Obj!="undefined") {
	        $scope.popup_Style=style_Obj.Popup;
	        $scope.content_Style=style_Obj.Content;
	        $scope.title_Style=style_Obj.Title;
         }
	$scope.title = {
		name: "Help /Employment"
	};	

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
    var landDetailsSubmitted=false;
  	MainService.fetch_help_employement_obj();
  	$rootScope.$on('help_employement_obj', function(event, data){
  		$scope.help_employement_obj = data.data.help_employment;
  		if($scope.help_employement_obj.submitted === undefined){

    	
    	//fetching data from json and storing it in $scope.activities property
		// $http.get('data.json').
		            db.get(master_data_doc_name).then(function(doc) {
			          
					$http.get('help_employement.json').	
					success(function(data){
						var typeId=data.help_employement.typeId;
			            $scope.help_employement_obj = data.help_employement;
						
						$scope.help_employement_obj.farmerId = parseInt($stateParams.farmerId);
						$scope.help_employement_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);
                        //// getting area details from land details
                        MainService.getlandDetailsData($scope.help_employement_obj.farmerId,$scope.help_employement_obj.farmerTimePeriodId);

						//the following activities will be filled up with database typeDetailsModel data
						
						//database
			  			//go to typeDetailsModel element of mst-data table and keep it in a array name and ids
			  			//on success fetch data from json
						$scope.help_employement_obj.activities=[];
						angular.forEach(doc.data.typeDetailModels, function(value, key){
							
							if (typeId==value.typeId) {
								$scope.help_employement_obj.activities.push({
							    typeDetailId: value.typeDetailId,
								name: value.typeDetailName
								});
							}
						});

                        var activities = data.help_employement.activities;		
						var details = data.help_employement.details;
						var child_details = data.help_employement.child_details;
						var data = [];
						for(var i = 0; i < details.length;i++){
							data.push({
								key:  details[i].key,
								name: details[i].name,
								type: details[i].has_child?0:details[i].type,
								value: details[i].value != undefined?details[i].value:0,
								is_parent: true
							}); 
							for(var j = 0; j < child_details.length; j++){
								if(details[i].name == child_details[j].parent){
									data.push({
										name: child_details[j].name,
										type: child_details[j].type,
										value: child_details[j].value != undefined?child_details[j].value:0,
										is_parent: false
									}); 
								}
							}
						}
						$scope.help_employement_obj.activities = [];
						for(var i = 0; i < activities.length;i++){
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
							$scope.help_employement_obj.activities.push({
								typeDetailId: activities[i].typeDetailId,
								name: activities[i].name,
								details: details_here
							});
						}
					}).
				error(function(err){
					//error fetching json
					console.error(err.message);
				});	

			}).then(function(response) {
			  // handle response
			}).catch(function (err) {
			  console.log(err);
			});
			
		 }else if($scope.help_employement_obj.submitted === false){
	         //// getting area details from land details
            MainService.getlandDetailsData($scope.help_employement_obj.farmerId,$scope.help_employement_obj.farmerTimePeriodId);
			$scope.flag = false;
			 console.log("false");
			}else{
			$scope.flag = true;
			 console.log("true");
			}
		});

  	var saveFlag = false;
    $scope.save=function(){
       MainService.save($scope.help_employement_obj, 1,$scope);
       saveFlag = true;
    }

    $scope.$on('eventFired', function(event, data) {
        if($scope.help_employement_obj.submitted){     
			$scope.flag = true;
			MainService.hide_spinner();
 		}
    })   

    $scope.submit=function(){
    	if(saveFlag)
        	MainService.submit($scope.help_employement_obj, 1,$scope);
        else
        	MainService.alertBox("Please save before submitting.", $scope);
    };

	/*
	@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
	this function disable this process if it was synced in past.
	*/
	MainService.setFlagForSyncedFarmer($scope, helpEmploymentOnOrganicProcessId);
	
}]);
