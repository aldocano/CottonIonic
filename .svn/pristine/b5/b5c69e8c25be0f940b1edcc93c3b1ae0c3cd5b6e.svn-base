angular.module('SidemenuController', []).
controller('SidemenuController', ['$scope', 'MainService','$location','$rootScope','$state', '$http', 
 function($scope, MainService, $location, $rootScope, $state, $http){
	$scope.sync = function(){
		$scope.closeDrawer();

		if(MainService.getLoggedIn()){
			MainService.show_spinner();
			$http.get(checkInternetURL).
			then(function(result){
				//if internet will be there the following code will be executed
	      		MainService.sync($scope);
	      	},function(error){
				//if internet will not be there the following code will be executed
				MainService.hide_spinner();						
				MainService.show_toast(msg_check_internet_connection);
			});         	  
	    }else{
	      MainService.show_toast("Login to sync");
	    }
	};
    $scope.syncStatus = function(){
    	$scope.closeDrawer();
    	if (currentSyncStatusObj.length<1 || currentSyncStatusObj.length==undefined) {
		  MainService.show_toast("No sync data to show.");
     	}else{
     	  $location.path("app/syncStatus");
     	}	
	};

	$scope.logout = function(){
		$scope.closeDrawer();
		MainService.setUsername("");
		MainService.setLoggedIn(false);
		$location.path('app/login');
	};
    $scope.expression = function(){
      if($state.current.name=="app.login")
        return false;
      else
        return true;
    };	
}]);