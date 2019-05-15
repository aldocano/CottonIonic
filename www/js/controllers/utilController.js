angular.module('UtilController', []).
controller('UtilController', ['$rootScope', '$state',
	function($rootScope, $state){	

		$rootScope.$on('page', function(event, pageURL){
       		$state.transitionTo(pageURL);
  		});
}]);