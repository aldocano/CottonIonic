angular.module("MainController", []).
controller('MainController', ['$scope','MainService', '$rootScope', '$ionicPopup', '$location','$http','$stateParams','$cordovaToast','$timeout',
	function($scope, MainService, $rootScope, $ionicPopup, $location,$http, $stateParams, $cordovaToast, $timeout){

// $scope.main_obj = JSON.parse($stateParams.farmerDetails);
// $scope.main_obj = MainService.getMain_obj();
    var style_Obj=MainService.ScreenSize();
       if (typeof  style_Obj!="undefined") {
	        $scope.popup_Style=style_Obj.Popup;
	        $scope.content_Style=style_Obj.Content;
	        $scope.title_Style=style_Obj.Title;
         }

    $scope.main_obj = {};

    $scope.storeValue = function(){
		db.get(back_button_event_doc_name).
		then(function(doc){
			return db.put({
			    _id: back_button_event_doc_name,
				_rev: doc._rev,	
			    title: false
			  });
		}).
		catch(function(err){
			if(err.status === 404){
				db.put({
				  _id: back_button_event_doc_name,
				  title: false
				}).then(function (response) {
				  // handle response
				  console.log("done");
				}).catch(function (err) {
				  console.log(err);
				});
			}else{
				console.log(err.status);
			}
		});
	};

    $scope.storeValue();


	db.get(selected_farmer_doc).
		then(function(doc){
			var farmerId = doc.farmerId;
			var farmerTimePeriodId = doc.farmerTimePeriodId;
			db.get(txn_data_doc_name).
			then(function(result){
				var records = result.records;				
				for(var i = 0; i < records.length;i++){
					if(records[i].farmerId === farmerId && 
						records[i].farmerTimePeriodId === farmerTimePeriodId){
						$scope.main_obj = records[i];
						$scope.$apply();		
						break;
					}		
				}
			}).catch(function(err){
				console.error(err);					
				$cordovaToast.show("Couldn't fetch data!", toastSDuration, toastPosition);			
			});			
		}).catch(function(err){
			console.error(err);
			$cordovaToast.show("Couldn't fetch data!", toastSDuration, toastPosition);									
		});




$scope.click_to_form=function(id){
try{
 switch(id){
 	case '0':
 		MainService.setForm_data($scope.main_obj.data.land_details);
 		$location.path("app/land_details/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '1':
 		$location.path("app/help_Employment/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '2':
 		MainService.show_spinner();
 		$timeout(function(){
 			MainService.setForm_data($scope.main_obj.data.soil_preparation);
 			$location.path("app/soil_Preparation/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);	
 		}, 1000);
 		// alert("hello");
 		
 		break;
 	case '3':
 		MainService.setForm_data($scope.main_obj.data.sowing_cost);
 		$location.path("app/sowing_cost/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '4':
 		MainService.setForm_data($scope.main_obj.data.water_use);
 		$location.path("app/waterUse/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '5':
 		MainService.setForm_data($scope.main_obj.data.irrigation_details);
 		$location.path("app/irrigationDetails/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '6':
 		MainService.setForm_data($scope.main_obj.data.manure_application);
 		$location.path("app/manureApplication/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '7':
 		MainService.setForm_data($scope.main_obj.data.land_and_irrigation);
 		$location.path("app/landAndIrrigation/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;	
 	case '8':
 		MainService.setForm_data($scope.main_obj.data.weeding_details);
 		$location.path("app/weeding_details/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '9':
 		MainService.setForm_data($scope.main_obj.data.estimation);
 		$location.path("app/estimation/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;	
 	case '10':
 		MainService.setForm_data($scope.main_obj.data.cotton_picking_harvesting);
 		$location.path("app/cotton_picking_harvesting/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '11':
 		MainService.setForm_data($scope.main_obj.data.trainings_attended_by);
 		$location.path("app/trainings_attended_by/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '12':
 		MainService.setForm_data($scope.main_obj.data.meeting_attended_by);
 		$location.path("app/meeting_attended_by/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break; 
 	case '13':
 		MainService.setForm_data($scope.main_obj.data.pesticide_application_details);
 		$location.path("app/pesticide_application_details/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '14':
 		MainService.setForm_data($scope.main_obj.data.bestpractices_decentwork);
 		$location.path("app/bestpractices_decentwork/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '15':
 		MainService.setForm_data($scope.main_obj.data.labors_record);
 		$location.path("app/labors_record/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '16':
 		MainService.setForm_data($scope.main_obj.data.selling_othersource);
 		$location.path("app/selling_othersource/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '17':
 		MainService.setForm_data($scope.main_obj.data.farmer_household_details);
 		$location.path("app/farmer_household_details/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '18':
 		MainService.setForm_data($scope.main_obj.data.land_holding_details);
 		$location.path("app/land_holding_details/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '19':
 		MainService.setForm_data($scope.main_obj.data.cotton_crop_details);
 		$location.path("app/cotton_crop_details/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '20':
 		MainService.setForm_data($scope.main_obj.data.livestock_cattle_ownership);
 		$location.path("app/livestock_cattle_ownership/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '21':
 		MainService.setForm_data($scope.main_obj.data.asset_ownership);
 		$location.path("app/asset_ownership/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '22':
 		MainService.setForm_data($scope.main_obj.data.educational_housing_details);
 		$location.path("app/educational_housing_details/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
  	case '23':
 		MainService.setForm_data($scope.main_obj.data.additional_details);
 		$location.path("app/additional_details/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;
 	case '25':
 		MainService.setForm_data($scope.main_obj.data.sustainable_practices);
 		$location.path("app/sustainable_practices/"+$scope.main_obj.farmerId+"/"+$scope.main_obj.farmerTimePeriodId);
 		break;	
 	default:
 		break;						
 }
}catch(err){
	MainService.show_toast("Go to login page and refresh and login!");
}
}
$scope.click_to_section = function(id){
	switch(id){
		case '1':
			$location.path("app/section_a");
			break;
		default:
			break;	
	}
}
	
}]);