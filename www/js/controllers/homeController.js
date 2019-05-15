angular.module("HomeController", []).
controller('HomeController', ['$scope','MainService', '$rootScope', '$ionicPopup', '$location','$cordovaToast','$filter',
	function($scope, MainService, $rootScope, $ionicPopup, $location, $cordovaToast, $filter){
	
	   // @ author Sourav keshari nath @ /////
	    $scope.Submit_disable=true;
        var style_Obj=MainService.ScreenSize();
        if (typeof  style_Obj!="undefined") {
	        $scope.popup_Style=style_Obj.Popup;
	        $scope.content_Style=style_Obj.Content;
	        $scope.title_Style=style_Obj.Title;
        }
		$scope.country = {
				country_Name : "Not Available"
		};
		$scope.state = {
				state_Name : "Not Available"
		};
		$scope.district = {
				district_Name : "Not Available"
		};
		$scope.block = {
			block_Name: "Not Available"
		};
		$scope.village = {
			village_Name : "Not Available"
		};
		$scope.farmer = {
			farmerName : "Not Available"
		};


		db.get(master_data_doc_name).
		then(function(doc){
			$scope.countries = $filter('orderBy')(doc.data.countries, 'country_Name');
			if($scope.countries){
				for(var j = 0; j < $scope.countries.length;j++){
		  			$scope.countries[j].index = j;
		  			if(j == 0)
		  				$scope.countries[j].checked = true;
		  			else
		  				$scope.countries[j].checked = false;
		  		};
	  		}


			$scope.countries_obj = $filter('orderBy')(doc.data.countries, 'country_Name');
	        $scope.states_obj = $filter('orderBy')(doc.data.states, 'state_Name');			  		
	  		$scope.districts_obj = $filter('orderBy')(doc.data.districts, 'district_Name');	
	  		$scope.blocks_obj = $filter('orderBy')(doc.data.blocks, 'block_Name');			  		
	  		$scope.villages_obj = $filter('orderBy')(doc.data.villages, 'village_Name');		
	  		$scope.farmers_obj =doc.data.farmerModels;// $filter('orderBy')(doc.data.farmerModels, 'farmerName');
	  	
	  		$scope.timePeriod_obj = $filter('orderBy')(doc.data.timePeriodModels, 'timePeriodId');

	  		//$scope.set_defaults();
	  		$scope.$apply();
		}).
		catch(function(err){
			console.error(err);
			$cordovaToast.show("Couldn't fetch data!", toastSDuration, toastPosition);			
		});
	
	   // @ author Sourav keshari nath @ /////

        $scope.farmer_Obj={};
	    $scope.getCountryStates = function(){
	        $scope.states = $scope.getCountryState($scope.farmer_Obj.Country);
	        $scope.farmer_Obj.State="";
	        $scope.farmer_Obj.District="";
	        $scope.farmer_Obj.Block="";
	        $scope.farmer_Obj.Village="";
	        $scope.farmer_Obj.TimePeriod="";
	        $scope.farmer_Obj.Farmer="";
	        $scope.districts=[];
	        $scope.blocks=[];
	        $scope.villages=[];
	       	$scope.timePeriods=[];
	        $scope.farmers=[];
	    };
	    $scope.getStatesDistricts = function(){
	        $scope.districts = $scope.getStatesDistrict($scope.farmer_Obj.State);
	        $scope.farmer_Obj.District="";
	        $scope.farmer_Obj.Block="";
	        $scope.farmer_Obj.Village="";
	        $scope.farmer_Obj.TimePeriod="";
	        $scope.farmer_Obj.Farmer="";
	        $scope.blocks=[];
	        $scope.villages=[];
	       	$scope.timePeriods=[];
	        $scope.farmers=[];
	    };
	    $scope.getDistrictBlocks = function(){
	        $scope.blocks = $scope.getDistrictBlock($scope.farmer_Obj.District);
	        $scope.farmer_Obj.Block="";
	        $scope.farmer_Obj.Village="";
	        $scope.farmer_Obj.TimePeriod="";
	        $scope.farmer_Obj.Farmer="";
	        $scope.villages=[];
	       	$scope.timePeriods=[];
	        $scope.farmers=[];
	    };
	    $scope.getBlockVillages = function(){
	        $scope.villages = $scope.getBlockVillage($scope.farmer_Obj.Block);
	        $scope.farmer_Obj.Village="";
	        $scope.farmer_Obj.TimePeriod="";
	        $scope.farmer_Obj.Farmer="";
	        $scope.timePeriods=[];
	        $scope.farmers=[];
	    };
	    $scope.getVillageTimePeriods = function(){
	        $scope.timePeriods = $scope.getVillageTimePeriod($scope.farmer_Obj.Village);
	        $scope.farmer_Obj.TimePeriod="";
	        $scope.farmer_Obj.Farmer="";
	        $scope.farmers=[];
	    }
	    $scope.getVillageTimePeriodsFarmer = function(){
	    	$scope.farmers=[];
	        $scope.farmers = $scope.getVillageFarmer($scope.farmer_Obj.Village,$scope.farmer_Obj.TimePeriod);
	        $scope.farmer_Obj.Farmer="";
	    }
	    $scope.getFarmers = function(){
	    	 var items =$scope.getFarmer($scope.farmer_Obj.Farmer);  
	    	 $scope.farmer=items[0];
	    	 var filteredTimeperiod=($filter('filter')(items, {timePeriodId: $scope.farmer_Obj.TimePeriod}));
	         $scope.farmer.farmerTimePeriodId=filteredTimeperiod[0].farmerTimePeriodId;
	         $scope.farmer.farmerId=parseInt($scope.farmer_Obj.Farmer);
	    }
	   // @ author Sourav keshari nath @ /////
	    
	    $scope.$watch('farmer_Obj', function() {
	        var submit_Validation=Object.keys($scope.farmer_Obj);
	        var count=0;
	        if (submit_Validation.length==7) {
	        	var ch_disable=false;
	        	angular.forEach($scope.farmer_Obj, function(value, key){
	        		if (typeof value !="undefined") {
		        		if (value!="") {
	                       $scope.Submit_disable=false;
		        		}else{
		        		   count++;
	                       $scope.Submit_disable=true;
		        		}
		        	}else{ch_disable=true;$scope.Submit_disable=true;}

	        	});
	        	if (count>0) {
                     $scope.Submit_disable=true;
	        	}
	        }

	
	    }, true);
	   
	   ///////////////////////////////// @ author Sourav keshari nath @ ///////////////////////////////////////////////////////
	    $scope.getCountryState = function(countryId){
	    	var states=[];
	    	if (typeof countryId !="undefined") {
	            states = ($filter('filter')($scope.states_obj, {country_ID: countryId}));
	    	}else{
	    		states=[];
	    	}
	        return states;
	    };
	    $scope.getStatesDistrict = function(stateId){
	    	var district=[];
	    	if (typeof stateId !="undefined") {
	            district = ($filter('filter')($scope.districts_obj, {state_ID: stateId}));      
	        }else{
	    		district=[];
	    	}
	        return district;
	    };
	    $scope.getDistrictBlock = function(districtId){
	    	var block=[];
	    	if (typeof districtId !="undefined") {
	           block = ($filter('filter')($scope.blocks_obj, {district_ID: districtId}));
	        }else{
	    	   block=[];
	    	}     
	        return block;
	    };
	    $scope.getBlockVillage = function(blockId){
	    	var village=[];
	    	if (typeof blockId !="undefined") {
	           village = ($filter('filter')($scope.villages_obj, {block_ID: blockId}));
	        }else{
	    	   village=[];
	    	}       
	        return village;
	    };
	    $scope.getVillageTimePeriod = function(vilageId){
	    	var timePeriod=[];
	    	if (typeof vilageId !="undefined") {
	            timePeriod = $scope.timePeriod_obj;
	        }else{
	    	   timePeriod=[];
	    	}     
	        return timePeriod;
	    };
	    $scope.getVillageFarmer = function(stateId,timePeriod){
	        var items = ($filter('filter')($scope.farmers_obj, {villageId: stateId,timePeriodId:timePeriod}));      
	        return items;
	    };
	    $scope.getFarmer = function(farmerId){
	        var items = ($filter('filter')($scope.farmers_obj, {farmerId: farmerId}));      
	        return items;
	    };
				
	$scope.go_to_main_page = function(){
		/*
			The following variable will help to insert a recordin transaction table records.
			If there will be a record in the record array having this farmer id and financial_year,
			The MainService will not insert the record

			This should execute after use gives the farmer id
 		*/
		var farmer_details = {
				farmerId: $scope.farmer.farmerId,
				farmerTimePeriodId: $scope.farmer.farmerTimePeriodId,
				farmer: $scope.farmer,				
				submitted: false,
				data:{
					land_details: {},
					help_employment:{},
					soil_preparation:{},
					sowing_cost:{},
					water_use:{},
					irrigation_details:{},
					manure_application:{},
					land_and_irrigation:{},
					weeding_details:{},
					estimation:{},
					cotton_picking_harvesting:{},
					trainings_attended_by:{},
					meeting_attended_by:{},
					pesticide_application_details:{},
					bestpractices_decentwork:{},
					labors_record:{},
					selling_othersource:{},
					farmer_household_details:{},
					land_holding_details:{},
					cotton_crop_details:{},
					livestock_cattle_ownership:{},
					asset_ownership:{},
					educational_housing_details:{},
					additional_details:{},
					sustainable_practices:{}
				}
		};
		var records = [];
		db.get(txn_data_doc_name).
		then(function(doc){
			records = doc.records;
			var record_not_present = true;
			for(var i = 0; i < records.length;i++){
				if(records[i].farmerId === $scope.farmer.farmerId && 
					records[i].farmerTimePeriodId === $scope.farmer.farmerTimePeriodId){
					farmer_details = records[i];
					record_not_present = false;
					break;
				}
			}
			if(record_not_present){
				records.push(farmer_details);
				return db.put({
					_id: txn_data_doc_name,
					_rev: doc._rev,
					records: records	
				}).
				then(function(){
					//success
					MainService.setMain_obj(farmer_details);
					$location.path('app/main');
					$scope.$apply();
				}).
				catch(function(err){
					if(err.status === 409){
						console.error("Conflict");
					}else{
						console.error("err.status : " + err.status);	
					}
				});
			}else{
				MainService.setMain_obj(farmer_details);
				$location.path('app/main');
				$scope.$apply();
			}
			
		}).
		catch(function(error){
			if(error.status === 404){
				records.push(farmer_details);
				db.put({
					_id: txn_data_doc_name,
				  	records: records,
				}).
				then(function(){
					MainService.setMain_obj(farmer_details);
					$location.path('app/main');
					$scope.$apply();
				}).
				catch(function(err){
					console.error("err.message : " + err.message + "err.status : " + err.status);
				});
			}else{
				console.error("Error status : " + error.status + "\nError message : " + error.message);
			}
		});
	};

	$scope.next = function(){
	  db.get(selected_farmer_doc).
		then(function(doc){
			return db.put({
				_id: selected_farmer_doc,
				_rev: doc._rev,
				farmerId: $scope.farmer.farmerId,
				farmerTimePeriodId: $scope.farmer.farmerTimePeriodId
			}).
			then(function(){
				$scope.go_to_main_page();
			}).
			catch(function(err){
				console.error(err);
			});
		}).catch(function(err){
			if(err.status === 404){
				db.put({
					_id: selected_farmer_doc,				
					farmerId: $scope.farmer.farmerId,
					farmerTimePeriodId: $scope.farmer.farmerTimePeriodId
				}).
				then(function(){
					$scope.go_to_main_page();
				}).
				catch(function(err){
					console.error(err);
				});
			}else{
				console.error(err);
			}
		});
	};
 var x = document.body.querySelectorAll('.popup'); 

	//angular.element(document.body.querySelectorAll(".popup")).attr( "ng-style","content_Style" );
	
}])

