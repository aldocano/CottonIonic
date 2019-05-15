angular.module('MainServiceHelper', []).
service('MainServiceHelper', ['$cordovaToast', '$filter', '$ionicLoading', '$ionicPopup',
	function($cordovaToast, $filter, $ionicLoading, $ionicPopup){
	
	this.show_toast = function(msg){
		try{
			$cordovaToast.show(msg, toastSDuration, toastPosition);
		}catch(err){
			alert(msg);
		};
	};

	this.alertBox=function(msg_text,scope){
   		$(':focus').blur();
   	    var my_popup = $ionicPopup.show({
			template: msg_text,
			title: 'Warning',
			scope: scope,
			buttons: [
				{
					text: 'Ok',
					type: 'button-positive',
					onTap: function(e){
						my_popup.close;
					}
				}
			]
		});
    }

	this.show_spinner = function(){
			$ionicLoading.show({
		      template: 'Loading...'
		    });
	};

	this.hide_spinner = function(){
			$ionicLoading.hide();
	};		
	this.writeLog = function(pagename,funcname,strmsg){
    	 window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory+"/CottonConnect/ErrorLog/", function(dir) {
	        dir.getFile("ErrorLog.txt", {create:true}, function(file) {
	            var log = "" + $filter('date')(new Date(), 'medium') + "--- Page name:"+pagename+",  Function name:"+funcname+",  Error : "+strmsg + " \n";
				    file.createWriter(function(fileWriter) {
				        fileWriter.seek(fileWriter.length);
				        var blob = new Blob([log], {type:'text/plain'});
				        fileWriter.write(blob);
				    }, false);
		        });
        });
	};
}]);