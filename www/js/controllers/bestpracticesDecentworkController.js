angular.module('BestpracticesDecentworkController', [])
.controller('BestpracticesDecentworkController', ['$scope', 'MainService', '$http', '$filter', '$stateParams', '$ionicPopup', '$timeout',
	function($scope, MainService, $http, $filter, $stateParams, $ionicPopup, $timeout){
		$scope.bestpractices_decentwork_obj = MainService.getForm_data();
		if($scope.bestpractices_decentwork_obj.submitted === undefined){
			db.get(master_data_doc_name).then(function(doc) {
				$http.get('best_practices_decent_work.json').success(function(data){
					$scope.bestpractices_decentwork_obj = data.best_practices_decent_work;
					$scope.bestpractices_decentwork_obj.farmerId = parseInt($stateParams.farmerId);
					$scope.bestpractices_decentwork_obj.farmerTimePeriodId = parseInt($stateParams.farmerTimePeriodId);

					var details = data.best_practices_decent_work.details;
					$scope.data = [];

					for(var i = 0; i < details.length;i++){
						$scope.data.push({
							key:details[i].key,
							name: details[i].name,
							type: details[i].has_child?0:details[i].type,
							value: details[i].value?details[i].value:0,
							is_parent: true
						}); 
					}
					//MainService.checkOrganicArea($scope.bestpractices_decentwork_obj.farmerId);

				}).error(function(err){
					//error fetching json
					console.error(err.message);
				});
			}).catch(function (err) {
		  		console.log(err);
			});
		}
		else if($scope.bestpractices_decentwork_obj.submitted === false){
	    	$scope.flag = false;
	    }else{
	    	$scope.flag = true;
	    }
		$scope.kindOfProtectionClothing=[];
		$scope.whereYouStore=[];
		$scope.howDoYouDeal=[];
		db.get(master_data_doc_name).then(function(doc) {
			$http.get('best_practices_decent_work.json').
				success(function(data){
					doc.data.typeDetailModels = $filter('orderBy')(doc.data.typeDetailModels, 'typeDetailName');
		            var kindOfProtectionClothingTypeId=data.best_practices_decent_work.kindOfProtectionClothingTypeId;
		            var whereYouStoreTypeId=data.best_practices_decent_work.whereYouStoreTypeId;
		            var howDoYouDealTypeId=data.best_practices_decent_work.howDoYouDealTypeId;
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
			        var other2 = {
			        	typeDetailId: 0,
						name: "",
						checked:false
			        };
					angular.forEach(doc.data.typeDetailModels, function(value, key){
						if(kindOfProtectionClothingTypeId==value.typeId){
							if(value.typeDetailName === "Other"){
								other.typeDetailId = value.typeDetailId;
								other.name = value.typeDetailName;
							}else{
								$scope.kindOfProtectionClothing.push({
							    	typeDetailId: value.typeDetailId,
									name: value.typeDetailName,
									checked:false,
								});
							}
						}else if(whereYouStoreTypeId==value.typeId){
							if(value.typeDetailName === "Other"){
								other1.typeDetailId = value.typeDetailId;
								other1.name = value.typeDetailName;
							}else{
								$scope.whereYouStore.push({
							    	typeDetailId: value.typeDetailId,
									name: value.typeDetailName,
									checked:false,
								});
							}
						}else if(howDoYouDealTypeId==value.typeId){
							if(value.typeDetailName === "Other"){
								other2.typeDetailId = value.typeDetailId;
								other2.name = value.typeDetailName;
							}else{
								$scope.howDoYouDeal.push({
							    	typeDetailId: value.typeDetailId,
									name: value.typeDetailName,
									checked:false,
								});
							}
						}
					});
					$scope.kindOfProtectionClothing.push(other);
					$scope.whereYouStore.push(other1);
					$scope.howDoYouDeal.push(other2);
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
		var element = [];
		var element1 = [];
		var element2 = [];
		$scope.otherArray = {};
		$scope.getChange = function(s_Obj,clickName, val){
			if($("#sec_id").context.activeElement[3].selected == true){

			}
			
			var index = $scope.bestpractices_decentwork_obj.details.indexOf(s_Obj);
			element.push($("#sec_id").context.activeElement);
			element1.push($("#where_id").context.activeElement);
			element2.push($("#how_id").context.activeElement);
			var secondFiltData,	fourthFiltData, fifthFiltData;
			if(typeof(s_Obj.value)!="undefined"){
				if(!s_Obj.value.includes("Other"))
					$scope.bestpractices_decentwork_obj.details[index].otherVal = null;
			}
			var second_ids = "";
			var fourth_ids = "";
			var fifth_ids = "";
			if(clickName=="2nd"){
				if(typeof val == "undefined" || !val.includes("Other"))
					$scope.bestpractices_decentwork_obj.details[1].otherVal = null;
				if(typeof val == "undefined"){
					$scope.bestpractices_decentwork_obj.details[1].id = null;
				}else{
				var arr = [];
				for(var i=0; i<val.length; i++){
					secondFiltData = $scope.kindOfProtectionClothing.filter(function(obj) { if (val[i] == obj.name ) {
				    	arr.push({name:val[i],id:obj.typeDetailId});
				    	return true;
					}else{
				    	return false;
					} });
				}
				for(var j = 0; j < arr.length; j++){
					second_ids+=arr[j].id+",";
				}
				second_ids = second_ids.substring(0, second_ids.length-1);
				$scope.bestpractices_decentwork_obj.details[1].id = second_ids;
				}
			}else if(clickName=="4th"){
				if(typeof val == "undefined" || !val.includes("Other"))
					$scope.bestpractices_decentwork_obj.details[3].otherVal = null;
				if(typeof val == "undefined"){
					$scope.bestpractices_decentwork_obj.details[3].id = null;
				}else{
				var arr = [];
				for(var i=0; i<val.length; i++){
					fourthFiltData = $scope.whereYouStore.filter(function(obj) { if (val[i] == obj.name ) {
				    	arr.push({name:val[i],id:obj.typeDetailId});
				    	return true;
					}else{
				    	return false;
					} });
				}
				for(var j = 0; j < arr.length; j++){
					fourth_ids+=arr[j].id+",";
				}
				fourth_ids = fourth_ids.substring(0, fourth_ids.length-1);
				$scope.bestpractices_decentwork_obj.details[3].id = fourth_ids;
				}
			}else if(clickName=="5th"){
				if(typeof val == "undefined" || !val.includes("Other"))
					$scope.bestpractices_decentwork_obj.details[4].otherVal = null;
				if(typeof val == "undefined"){
					$scope.bestpractices_decentwork_obj.details[4].id = null;
				}else{
				var arr = [];
				for(var i=0; i<val.length; i++){
					fourthFiltData = $scope.howDoYouDeal.filter(function(obj) { if (val[i] == obj.name ) {
				    	arr.push({name:val[i],id:obj.typeDetailId});
				    	return true;
					}else{
				    	return false;
					} });
				}
				for(var j = 0; j < arr.length; j++){
					fifth_ids+=arr[j].id+",";
				}
				fifth_ids = fifth_ids.substring(0, fifth_ids.length-1);
				$scope.bestpractices_decentwork_obj.details[4].id = fifth_ids;
				}
			}
			if(typeof(val) != "undefined"){
				
				if($scope.bestpractices_decentwork_obj.details[index].otherVal == null){
				if(val.includes("Other")){
					element.push($("#sec_id").context.activeElement);
					element1.push($("#where_id").context.activeElement);
					element2.push($("#how_id").context.activeElement);
					var pop = $ionicPopup.show({
			     		template: '<input type="text" ng-pattern="/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/" ng-model="otherArray.othersSpecify" style="background: #45BFAE">',
					    title: 'Please Specify',
					    scope: $scope,
			     		buttons: [ { text: 'Cancel',
			     			onTap:function(e){
			     				if(clickName == "2nd"){
				     				for(var j = 0; j<element.length; j++){
										if(element[j].id == "sec_id"){
											element[j][3].selected = false;
										}
									}
								$scope.bestpractices_decentwork_obj.details[1].id = second_ids.substring(0,second_ids.length-4);	
								}else if(clickName == "4th"){
				     				for(var j = 0; j<element1.length; j++){
										if(element1[j].id == "where_id"){
											element1[j][3].selected = false;
										}
									}
								$scope.bestpractices_decentwork_obj.details[3].id = fourth_ids.substring(0,fourth_ids.length-4);	
								}else if(clickName == "5th"){
				     				for(var j = 0; j<element2.length; j++){
										if(element2[j].id == "how_id"){
											element2[j][6].selected = false;
										}
									}
								$scope.bestpractices_decentwork_obj.details[4].id = fifth_ids.substring(0,fifth_ids.length-4);	
								}
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
			                          if (clickName=="2nd") {
					     				$scope.bestpractices_decentwork_obj.details[1].otherVal = $scope.otherArray.othersSpecify;
					     				$scope.otherArray.othersSpecify = "";
					     				pop.close();
					     			  }else if(clickName=="4th"){
					     			  	$scope.bestpractices_decentwork_obj.details[3].otherVal = $scope.otherArray.othersSpecify;
					     				$scope.otherArray.othersSpecify = "";
					     				pop.close();
					     			  }else if(clickName=="5th"){
					     			  	$scope.bestpractices_decentwork_obj.details[4].otherVal = $scope.otherArray.othersSpecify;
					     				$scope.otherArray.othersSpecify = "";
					     				pop.close();
					     			  }
					     			}else{
					     				$scope.otherArray.othersSpecify="";
							            MainService.alertBox("This field accepts upto 50 characters.",$scope); 
			                            e.preventDefault();
					     			}
					     		}
			     			}
			     		}]
			     	})

				}else{
					$scope.otherArray.othersSpecify = "";
					if(clickName == "2nd")
						$scope.bestpractices_decentwork_obj.details[1].otherVal = null;
					else if(clickName == "4th")
						$scope.bestpractices_decentwork_obj.details[3].otherVal = null;
					else if(clickName == "5th")
						$scope.bestpractices_decentwork_obj.details[4].otherVal = null;

					switch(clickName){
			     		case "2nd":
			     			if($scope.bestpractices_decentwork_obj.details[1].id.includes("171"))
			     				$scope.bestpractices_decentwork_obj.details[1].id = $scope.bestpractices_decentwork_obj.details[1].id.substring(0, $scope.bestpractices_decentwork_obj.details[1].id.length-4);
			     			break;
			     		case "4th":
			     			if($scope.bestpractices_decentwork_obj.details[3].id.includes("175"))
			     				$scope.bestpractices_decentwork_obj.details[3].id = $scope.bestpractices_decentwork_obj.details[3].id.substring(0, $scope.bestpractices_decentwork_obj.details[3].id.length-4);
			     			break;
			     		case "5th":
			     			if($scope.bestpractices_decentwork_obj.details[4].id.includes("182"))
			     				$scope.bestpractices_decentwork_obj.details[4].id = $scope.bestpractices_decentwork_obj.details[4].id.substring(0, $scope.bestpractices_decentwork_obj.details[4].id.length-4);
			     			break;
			     	}
				}
				}
			}
			if($scope.bestpractices_decentwork_obj.details[index].id == "" || $scope.bestpractices_decentwork_obj.details[index].id == null)
				$scope.bestpractices_decentwork_obj.details[index].value = "";

		};
		$scope.flag_en_ds = function(val){
			if(val.name == "Do you use any protection clothing while spraying organic pesticide in Registered Farm?"){
				if(val.value){
					$scope.bestpractices_decentwork_obj.details[1].status = false;
				}
				else{
					$scope.bestpractices_decentwork_obj.details[1].status = true;
					$scope.bestpractices_decentwork_obj.details[1].id = null;
					$scope.bestpractices_decentwork_obj.details[1].otherVal = null;
					for(var j = 0; j<element.length; j++){
						if(element[j].id == "sec_id"){
							for(var i=0; i<element[j].length;i++)
								element[j][i].selected = false;
						}	
					}
					$("#sec_id").context.activeElement = [];
					$("#sec_id").context.activeElement.push(element[0]);
				}
			}else if(val.name == "Do you store organic seeds, pesticides and manure for Registered Farm?"){
				if(val.value){
					$scope.bestpractices_decentwork_obj.details[3].status = false;
				}else{
					$scope.bestpractices_decentwork_obj.details[3].status = true;
					$scope.bestpractices_decentwork_obj.details[3].id = null;
					$scope.bestpractices_decentwork_obj.details[3].otherVal = null;
					for(var j = 0; j<element1.length; j++){
						if(element1[j].id == "where_id"){
							for(var i=0; i<element1[j].length;i++)
								element[j][i].selected = false;
						}	
					}
					$("#where_id").context.activeElement = [];
					$("#where_id").context.activeElement.push(element1[0]);
				}	
			}	
		};
		
		var saveFlag = false;
		$scope.save=function(){
			MainService.save($scope.bestpractices_decentwork_obj, 14,$scope);
			saveFlag = true;
		};

		$scope.$on('eventFired', function(event, data) {
	       if($scope.bestpractices_decentwork_obj.submitted){     
				$scope.flag = true;
				MainService.hide_spinner();
	 		}
	    })

	    $scope.submit=function(){
	    	if(saveFlag){
	    		MainService.submit($scope.bestpractices_decentwork_obj, 14,$scope);
	    	}else{
				MainService.alertBox("Please save before submitting.", $scope);
			}
	    };
		/*
		@author: Pratyush Kumar Rath(pratyush@sdrc.co.in)
		this function disable this process if it was synced in past.
		*/
		MainService.setFlagForSyncedFarmer($scope, bestPracticesProcessId);	
	}	
]);