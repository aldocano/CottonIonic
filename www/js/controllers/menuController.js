angular.module("MenuCtrl", []).
controller('MenuCtrl', ['$scope','$ionicModal', '$timeout','MainService','$cordovaToast','$rootScope','$location', '$state',
  function($scope, $ionicModal, $timeout,MainService,$cordovaToast,$rootScope, $location, $state){
    var style_Obj=MainService.ScreenSize();
      if (typeof  style_Obj!="undefined") {
          if (style_Obj.Homeicon[0]==true) {
           $scope.homeicon_Style="font-size:50px";
          }else{
           $scope.homeicon_Style="";
          }
          //$scope.headerheight_Style=style_Obj.Headerheight;
      }
  $scope.sync=function(){
    if(MainService.getLoggedIn()){
      MainService.sync();  
    }else{
      MainService.show_toast("Login to sync");
    }
    
  }  
  $scope.home = function(){
      $location.path('app/main');
  };

  $scope.homeFlag = function(){
    if($state.current.name=="app.home" | $state.current.name=="app.login" | $state.current.name=="app.main"| $state.current.name=="app.syncStatus")
      return false;
    else
      return true;
  };
  $scope.expression = function(){
    if($state.current.name=="app.login")
      return false;
    else
      return true;
  };

  $scope.sendmail=function(){
      if(window.plugins && window.plugins.emailComposer) {
          window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
              console.log("Response -> " + result);
          }, 
          "Send your queries to developer", // Subject
          "Write queries here",                      // Body
          ["souravnath@sdrc.co.in"],    // To
          null,                    // CC
          null,                    // BCC
          false,                   // isHTML
          null,// Attachments
          null); // Attachment Data
        }
  }
  $scope.loginData = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

}]);