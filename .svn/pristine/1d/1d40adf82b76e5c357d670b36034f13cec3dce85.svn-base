angular.module("SyncStatusController",[]).
controller('SyncStatusController', ['$scope','$filter','$location',
function($scope,$filter,$location){
	var syncStatusObj=[];
	$scope.$on('currentSyncStatusObj', function(event, data) {
        currentSyncStatusObj=data;
        $scope.syncStatus="";
        syncStatusObj=[];
        	if (currentSyncStatusObj.length>0) {
	 	var farmerIdObj=[];
	 	angular.forEach(currentSyncStatusObj, function(value, key){
	 		farmerIdObj.push(value.farmerId);
	 	});
		var uniq = farmerIdObj
		  .map((name) => {
		    return {count: 1, name: name}
		  })
		  .reduce((a, b) => {
		    a[b.name] = (a[b.name] || 0) + b.count
		    return a
		}, {})
		var sortedFarmer = Object.keys(uniq).sort((a, b) => uniq[a] < uniq[b])
        angular.forEach(sortedFarmer, function(f_value, f_key){
        	var child_farmer=[];
		 	angular.forEach(currentSyncStatusObj, function(s_value, s_key){

		 		if (s_value.farmerId==f_value) {
                   child_farmer.push({name:s_value.processName,msg:s_value.errorMessage,status:s_value.status})
		 		}
		 	});
		 	var fname=($filter('filter')(currentSyncStatusObj, {farmerId: f_value}));
		 	syncStatusObj.push({farmerName:fname[0].farmerName,details:child_farmer});
        });
	}
	$scope.syncStatus=syncStatusObj;
    })
	if (currentSyncStatusObj.length>0) {
	 	var farmerIdObj=[];
	 	angular.forEach(currentSyncStatusObj, function(value, key){
	 		farmerIdObj.push(value.farmerId);
	 	});
		var uniq = farmerIdObj
		  .map((name) => {
		    return {count: 1, name: name}
		  })
		  .reduce((a, b) => {
		    a[b.name] = (a[b.name] || 0) + b.count
		    return a
		}, {})
		var sortedFarmer = Object.keys(uniq).sort((a, b) => uniq[a] < uniq[b])
        angular.forEach(sortedFarmer, function(f_value, f_key){
        	var child_farmer=[];
		 	angular.forEach(currentSyncStatusObj, function(s_value, s_key){

		 		if (s_value.farmerId==f_value) {
                   child_farmer.push({name:s_value.processName,msg:s_value.errorMessage,status:s_value.status})
		 		}
		 	});
		 	var fname=($filter('filter')(currentSyncStatusObj, {farmerId: f_value}));
		 	syncStatusObj.push({farmerName:fname[0].farmerName,details:child_farmer});
        });
	}
	$scope.syncStatus=syncStatusObj;
	
	$scope.home = function(){
	    $location.path('app/home');
	};

}]);