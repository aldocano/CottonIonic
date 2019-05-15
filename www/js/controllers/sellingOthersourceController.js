angular.module('SellingOthersourceController', [])
.controller('SellingOthersourceController', ['$scope', 'MainService', '$http', '$filter', '$stateParams', '$ionicPopup',
	function($scope, MainService, $http, $filter, $stateParams, $ionicPopup){
		$scope.selling_othersource_obj = MainService.getForm_data();
		if($scope.selling_othersource_obj.submitted === undefined){
			db.get(master_data_doc_name).then(function(doc) {
				$http.get('selling_othersource.json').success(function(data){
					$scope.selling_othersource_obj = data.selling_othersource;
					$scope.selling_othersource_obj.farmerId = parseInt($stateParams.farmerId);
					$scope.selling_othersource_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);

					var activities = data.selling_othersource.activities;
					var details = data.selling_othersource.activities_details;
					var data = [];

					for(var i = 0; i < details.length;i++){
						data.push({
							name: details[i].name,
							type: details[i].type,
							value: details[i].value?details[i].value:0,
							is_parent: true
						}); 
					}
					$scope.selling_othersource_obj.activities = [];
					for(var i = 0; i < activities.length;i++){
						activities[i].name = activities[i].name + (i+1);
						var details_here = [];
						for(var j = 0;j <data.length;j++){
							details_here.push({
								name: data[j].name,
								type: data[j].type,
								value: data[j].value,
								is_parent: data[j].is_parent
							});
						}
						$scope.selling_othersource_obj.activities.push({
							name: activities[i].name,
							details: details_here
						});
					}
					//MainService.checkOrganicArea($scope.selling_othersource_obj.farmerId);

				}).error(function(err){
					//error fetching json
					console.error(err.message);
				});
			}).catch(function (err) {
		  		console.log(err);
			});
		}
		else if($scope.selling_othersource_obj.submitted === false){
	    	$scope.flag = false;
	    }else{
	    	$scope.flag = true;
	    }
		$scope.floatValidation = function(val){
			if(typeof(val.value) =="undefined"){
				$scope.selling_othersource_obj.details[3].value = "";
				MainService.alertBox(msg_invalid_decimal_3, $scope);
			}
		};
		$scope.other_source_of_income=[];
		db.get(master_data_doc_name).then(function(doc) {
			$http.get('selling_othersource.json').
			success(function(data){
				doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
				var other_source_of_incomeTypeId=data.selling_othersource.other_source_of_incomeTypeId;
		            var other = {
			        	typeDetailId: 0,
						name: "",
						checked:false
			        };
			    angular.forEach(doc.data.typeDetailModels, function(value, key){
					if(other_source_of_incomeTypeId==value.typeId){
						if(value.typeDetailName === "Other"){
							other.typeDetailId = value.typeDetailId;
							other.name = value.typeDetailName;
						}else{
							$scope.other_source_of_income.push({
						    	typeDetailId: value.typeDetailId,
								name: value.typeDetailName,
								checked:false,
							});
						}
					}
				});
				$scope.other_source_of_income.push(other);
			})
		}).catch(function (err) {
			console.log(err);
		});
		//responsive function
	  	var style_Obj=MainService.ScreenSize();
		if (typeof  style_Obj!="undefined") {
			$scope.popup_Style=style_Obj.Popup;
			$scope.content_Style=style_Obj.Content;
			$scope.title_Style=style_Obj.Title;
		}
		$scope.flag_soi = function(data){
			if(data.value){
				$scope.selling_othersource_obj.details[2].status = false;
			}else{
				$scope.selling_othersource_obj.details[2].status = true;
				$scope.selling_othersource_obj.details[2].id = null;
				$scope.selling_othersource_obj.details[2].otherVal = null;
				$scope.selling_othersource_obj.details[3].status = true;
				$scope.selling_othersource_obj.details[3].value = null;
				for(var j = 0; j<element.length; j++){
					if(element[j].id == "soi_id"){
						for(var i=0; i<element[j].length;i++)
							element[j][i].selected = false;
					}	
				}
				$("#soi_id").context.activeElement = [];
				$("#soi_id").context.activeElement.push(element[0]);
			}
		};
		var element = [];
		$scope.otherArray = {};
		$scope.getChange = function(s_obj){
			if($("#soi_id").context.activeElement[3].selected == true){

			}
			element.push($("#soi_id").context.activeElement);
			if(typeof(s_obj.value) == 'undefined'){
				$scope.selling_othersource_obj.details[2].otherVal = null;
				$scope.selling_othersource_obj.details[2].id = null;
				$scope.selling_othersource_obj.details[3].status = true;
				$scope.selling_othersource_obj.details[3].value = null;
			}	
			if(!s_obj.value.includes("Other"))
				$scope.selling_othersource_obj.details[2].otherVal = null;
			var soiFiltData;
			var soi_ids = "";
			if(typeof s_obj.value == "undefined"){
				$scope.selling_othersource_obj.details[2].id = null;
			}else{
				var arr = [];
				for(var i=0; i<s_obj.value.length; i++){
					soiFiltData = $scope.other_source_of_income.filter(function(obj) { if (s_obj.value[i] == obj.name ) {
				    	arr.push({name:s_obj.value[i],id:obj.typeDetailId});
				    	return true;
					}else{
				    	return false;
					} });
				}
				for(var j = 0; j < arr.length; j++){
					soi_ids+=arr[j].id+",";
				}
				soi_ids = soi_ids.substring(0, soi_ids.length-1);
				$scope.selling_othersource_obj.details[2].id = soi_ids;
			}
			if(typeof(s_obj.value) != "undefined"){
				if($scope.selling_othersource_obj.details[2].otherVal == null){
					if(s_obj.value.includes("Other")){
						element.push($("#soi_id").context.activeElement);
						var pop = $ionicPopup.show({
				     		template: '<input type="text" ng-pattern="/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/" ng-model="otherArray.othersSpecify" style="background: #45BFAE">',
						    title: 'Please Specify',
						    scope: $scope,
				     		buttons: [ { text: 'Cancel',
				     			onTap:function(e){
				     				$scope.selling_othersource_obj.details[3].status = true;
				     				for(var j = 0; j<element.length; j++){
										if(element[j].id == "soi_id"){
											element[j][3].selected = false;
										}	
									}
									$("#soi_id").context.activeElement = (element[0]);
									$scope.selling_othersource_obj.details[2].otherVal = null;
									$scope.selling_othersource_obj.details[2].id = soi_ids.substring(0,soi_ids.length-4);
						     		$scope.otherArray.othersSpecify = "";
				     			}},{
				     			text: 'Ok',
				     			onTap:function(e){
			              		    if (typeof $scope.otherArray.othersSpecify=="undefined" || $scope.otherArray.othersSpecify=="") {
							            MainService.alertBox(msg_others_mandatory,$scope); 
				                        e.preventDefault();	
				     				}else{
				     				var str =$scope.otherArray.othersSpecify.toString();
						            var n_count = str.length;
								       if (n_count<50) {
						     			  	$scope.selling_othersource_obj.details[2].otherVal = $scope.otherArray.othersSpecify;
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
				}
				
			}
			if($scope.selling_othersource_obj.details[2].id.length > 1)
				$scope.selling_othersource_obj.details[3].status = false;
		};
		
		$scope.toggleGroup = function(activity) {
			if ($scope.isGroupShown(activity))
		  		$scope.shownGroup = null;
			else
		  		$scope.shownGroup = activity;
	  	};
	  	$scope.isGroupShown = function(activity) {
	    	return $scope.shownGroup === activity;
	  	};
	  	$scope.add = function(){
	  		$http.get('selling_othersource.json').
	  		success(function(data){
	  			var selling_othersource_obj2 = data.selling_othersource;
				selling_othersource_obj2.farmerId = parseInt($stateParams.farmerId);
				selling_othersource_obj2.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);

				var activities = data.selling_othersource.activities;
				var details = data.selling_othersource.activities_details;
				var data = [];

				for(var i = 0; i < details.length;i++){
					data.push({
						name: details[i].name,
						type: details[i].type,
						value: details[i].value?details[i].value:0,
						is_parent: true
					}); 
				}
				selling_othersource_obj2.activities = [];
				for(var i = 0; i < activities.length;i++){
					activities[i].name += ($scope.selling_othersource_obj.activities.length + 1);
					var details_here = [];
					for(var j = 0;j <data.length;j++){
						details_here.push({
							name: data[j].name,
							type: data[j].type,
							value: data[j].value,
							is_parent: data[j].is_parent
						});
					}
					selling_othersource_obj2.activities.push({
						name: activities[i].name,
						details: details_here
					});
				}
				$scope.selling_othersource_obj.activities.push(selling_othersource_obj2.activities[0]);			
				$scope.shownGroup = selling_othersource_obj2.activities[0];
	  		}).
	  		error(function(err){
				//error fetching json
				console.error(err.message);
			});
	  	};
	 	$scope.remove = function(){
	        var click=true;
	  		if($scope.selling_othersource_obj.activities.length != 1){
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
	                    		$scope.selling_othersource_obj.activities.splice($scope.selling_othersource_obj.activities.length-1, 1);
	                    		click = false;
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
  		$scope.sellingMonth=[];
  		$scope.NOC=[];
  		$scope.soldTo=[];
  	  	db.get(master_data_doc_name).then(function(doc) {
			$http.get('selling_othersource.json').
			success(function(data){
				typeDetailModels_ordered = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
				// doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
	            var month_of_selling_TypeId=data.selling_othersource.month_of_selling_TypeId;
	            var NOCTypeId=data.selling_othersource.NOCTypeId;
	            var soldtoTypeId=data.selling_othersource.soldtoTypeId;
	            var other = {
		        	typeDetailId: 0,
					name: "",
					checked:false
		        };
		        angular.forEach(doc.data.typeDetailModels, function(value, key){
					if(month_of_selling_TypeId==value.typeId){	
						$scope.sellingMonth.push({
					    	typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
						});
					}
					
				});
				angular.forEach(doc.data.typeDetailModels, function(value, key){
					if(soldtoTypeId==value.typeId){	
						$scope.soldTo.push({
					    	typeDetailId: value.typeDetailId,
							name: value.typeDetailName,
							checked:false,
						});}
					
				});
				angular.forEach(typeDetailModels_ordered, function(value, key){
					if(NOCTypeId==value.typeId){
						if(value.typeDetailName == "Others"){
							other.typeDetailId = value.typeDetailId;
							other.name = value.typeDetailName;
						}else{
							$scope.NOC.push({
						    	typeDetailId: value.typeDetailId,
								name: value.typeDetailName,
								checked:false,
							});
						}
					}
				});
				$scope.NOC.push(other);
				angular.forEach($scope.selling_othersource_obj.activities, function(value, key){
                	angular.forEach(value.details, function(value_s, key_s){
                	 	if (value_s.type=="7.2") {
                	 		if (value_s.value!=" ") {
	                	 		angular.forEach($scope.NOC,function(value_t,key_t ) {
	                	 			if (value_t.name != value_s.value) {
	                	 				var results = $filter('filter')($scope.NOC, {name : value_s.value}, true);
	                                 if (results.length<1) {
		     			               $scope.NOC.push({"typeDetailId":0,"name":value_s.value,"checked":false})
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
		$scope.getChange1 = function(f_obj,s_obj,clickName, val){
			var index1 = $scope.selling_othersource_obj.activities.indexOf(f_obj);
			var nocFiltData, mosFiltData, stFiltData;
			if(clickName=="noc"){
				nocFiltData = $scope.NOC.filter(function(obj) { if (val == obj.name ) {
				    return true;
				}else{
				    return false;
				} });
				$scope.selling_othersource_obj.activities[""+index1+""].details[1].value=val;
				$scope.selling_othersource_obj.activities[""+index1+""].details[1].id=nocFiltData[0].typeDetailId;
			}else if(clickName=="mos"){
				mosFiltData = $scope.sellingMonth.filter(function(obj) { if (val == obj.name ) {
				    return true;
				}else{
				    return false;
				} });
				$scope.selling_othersource_obj.activities[""+index1+""].details[0].value=val;
				$scope.selling_othersource_obj.activities[""+index1+""].details[0].id=mosFiltData[0].typeDetailId;
			}else if(clickName=="st"){
				stFiltData = $scope.soldTo.filter(function(obj) { if (val == obj.name ) {
				    return true;
				}else{
				    return false;
				} });
				$scope.selling_othersource_obj.activities[""+index1+""].details[2].value=val;
				$scope.selling_othersource_obj.activities[""+index1+""].details[2].id=stFiltData[0].typeDetailId;
			}
			if(s_obj.value == 'Others'){
				var pop = $ionicPopup.show({
		     		template: '<input type="text" ng-pattern="/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/" ng-model="otherArrayForNOC.othersSpecify" style="background: #45BFAE">',
				    title: 'Please Specify',
				    scope: $scope,
		     		buttons: [ { text: 'Cancel',
		     			  onTap:function(e){
                                    $scope.selling_othersource_obj.activities[""+index1+""].details[1].id =0;
                                    $scope.selling_othersource_obj.activities[""+index1+""].details[1].value ="";
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
				     				$scope.selling_othersource_obj.activities[""+index1+""].details[1].id = nocFiltData[0].typeDetailId;
				     				$scope.selling_othersource_obj.activities[""+index1+""].details[1].value = $scope.otherArrayForNOC.othersSpecify;
				     			    $scope.NOC.push({"typeDetailId":nocFiltData[0].typeDetailId,"name":$scope.otherArrayForNOC.othersSpecify,"checked":false})
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
		$scope.quantityValidation = function(f_obj, val){
			var index1 = $scope.selling_othersource_obj.activities.indexOf(f_obj);
			if(typeof(val) =="undefined"){
				$scope.selling_othersource_obj.activities[""+index1+""].details[3].value = "";
				MainService.alertBox(four_two_validation, $scope);
			}
		};
		$scope.costValidation = function(index, f_obj,val){
			var index1 = $scope.selling_othersource_obj.activities.indexOf(f_obj);
			if(typeof(val) =="undefined"){
				$scope.selling_othersource_obj.activities[""+index1+""].details[index].value = "";
				MainService.alertBox(msg_invalid_decimal_3, $scope);
			}
		};

		var saveFlag = false;
		$scope.save=function(){
			MainService.save($scope.selling_othersource_obj, 22,$scope);
			saveFlag = true;
		}

		$scope.$on('eventFired', function(event, data) {
	       if($scope.selling_othersource_obj.submitted){     
				$scope.flag = true;
				MainService.hide_spinner();
	 		}
	    })

	    $scope.submit=function(){
	    	if(saveFlag){
	    		MainService.submit($scope.selling_othersource_obj, 22,$scope);
	    	}else{
				MainService.alertBox("Please save before submitting.", $scope);
			}
	    };
		/*
		@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
		this function disable this process if it was synced in past.
		*/
		MainService.setFlagForSyncedFarmer($scope, sellingAndOtherSourceOfIncomeProcessId);	
	}
]);