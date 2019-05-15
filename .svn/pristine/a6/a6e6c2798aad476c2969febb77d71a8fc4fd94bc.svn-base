angular.module("LoginController", []).
controller('LoginController', ['$scope','MainService', '$rootScope', '$ionicPopup', '$location','$ionicHistory','$compile','$ionicSideMenuDelegate',
	function($scope, MainService, $rootScope, $ionicPopup, $location, $ionicHistory,$compile,$ionicSideMenuDelegate){

    // Responsive function called
	var style_Obj=MainService.ScreenSize();
		if (typeof  style_Obj!="undefined") {
			$scope.popup_Style=style_Obj.Popup;
			$scope.title_Style=style_Obj.Title;
			// $scope.content_Style=style_Obj.Content;
	}

    $ionicSideMenuDelegate.canDragContent(false)
    $scope.show=false;

	$scope.countries = [];
	$scope.states_db = [];
	$scope.districts_db = [];
	$scope.blocks_db = [];
	$scope.villages_db = [];
	$scope.farmers_db = [];

	$scope.fetch_data = function(){
		db.get(master_data_doc_name).
		then(function(doc){
			$scope.countries = doc.countries;
			for(var j = 0; j < $scope.countries.length;j++){
	  			$scope.countries[j].index = j;
	  			if(j == 0)
	  				$scope.countries[j].checked = true;
	  			else
	  				$scope.countries[j].checked = false;
	  		};
	  		$scope.states_db = doc.states;			  		
	  		$scope.districts_db = doc.districts;	
	  		$scope.blocks_db = doc.blocks;			  		
	  		$scope.villages_db = doc.villages;		
	  		$scope.farmers_db = doc.farmers;	
	  		 //all data are fetched from database not we have to set the defaults
	  		 var home_obj = {};
		    home_obj.countries = $scope.countries;
		    home_obj.states = $scope.states_db;
		    home_obj.districts = $scope.districts_db;
		    home_obj.blocks = $scope.blocks_db;
		    home_obj.villages = $scope.villages_db;
		    home_obj.farmers = $scope.farmers_db;
		    MainService.setHome_obj(home_obj);
		    $location.path('app/home');
			$scope.$apply();
		}).
		catch(function(err){
			MainService.writeLog("LoginController.js", "$scope.fetch_data", err.message);
		});
	};

	// $ionicHistory.clearHistory();
	$scope.loginData = {
		username: "",
		password: ""
	};
	setTimeout(function(){
	  MainService.check_create_directory();
	}, 1000);
	
	$scope.doLogin = function(){
		MainService.show_spinner();
		$scope.show=true;
		if($scope.loginData.userName == "" || $scope.loginData.password == ""){
			alert("Username and Password fields are mandatory!");
			MainService.hide_spinner();
		}else	
			MainService.doLogin($scope.loginData,$scope);	
	};

	$rootScope.$on('login_result', function(event, data){
		MainService.hide_spinner();
		$scope.show=false;
		if(data == true){
			MainService.setUsername($scope.loginData.username);
			MainService.setLoggedIn(true);
			//control to homepage
			$location.path('app/home');
			$scope.$apply();
		}else{
			switch (data) {
			case -1:
				MainService.show_toast(msg_invalid_credetial);
				break;
			case 2:
				MainService.show_toast(msg_check_internet_connection);
				break;
			case 0:
				MainService.alertBox(msg_login_timeout,$scope);
				break;
			case 404:
				MainService.alertBox(msg_server_not_found,$scope);
				break;
			case 3:
				$scope.loginData.password = "";
				$scope.loginData.username = "";
				break;
			case 4:
				// MainService.show_toast("No farmers assigned to this user!", $scope);
				$scope.loginData.password = "";
				break;
			default:
				MainService.alertBox(msg_login_default + data,$scope);
				break;
			}
			
		}
	});
	angular.element(document.querySelector('.buttons-left')).attr('ng-show','false');
	angular.element(document.querySelector('.menu-left')).attr('ng-show','false');
}]);