angular.module("MainService", []).

service('MainService', ['$rootScope','$http','$ionicPopup','$cordovaFile','$filter', '$cordovaToast','$ionicLoading','MainServiceHelper', 'md5','$timeout','$location','$filter',
	function($rootScope,$http,$ionicPopup,$cordovaFile,$filter, $cordovaToast, $ionicLoading, MainServiceHelper, md5, $timeout,$location,$filter){

		this.setFlagForSyncedFarmer = function(scope, pId){
			db.get(selected_farmer_doc).
			then(function(doc){
				db.get(master_data_doc_name).
				then(function(data){
					$timeout(function(){
						for(var i = 0; i < data.data.farmerModels.length; i++){
							if (doc.farmerId == data.data.farmerModels[i].farmerId) {
								for(var j = 0; j<data.data.farmerModels[i].statusCodeList.length; j++){
									if (data.data.farmerModels[i].statusCodeList[j].key == pId && data.data.farmerModels[i].statusCodeList[j].value == "1") {
										scope.flag = true;
									}
								}
							}
						}
					},500);
				});
			});
		};
		this.isLoggedIn = false;
		this.username = "";
		this.main_obj = {};
		this.home_obj = {};
		this.form_data = {};
		this.getUsername = function(){
			return this.username;
		};
		this.setUsername = function(username){
			this.username = username;
		};

		this.get_date_time = function(){
			return $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss:sss');
		};
		this.show_spinner = function(){
			$ionicLoading.show({
		      template: 'Loading...'
		    });
		};
		this.hide_spinner = function(){
			$ionicLoading.hide();
		};		
		
		this.setMain_obj = function(main_obj){
			this.main_obj = main_obj;
		};
		this.getMain_obj = function(){
			return this.main_obj;
		};

		this.setHome_obj = function(home_obj){
			this.home_obj = home_obj;
		};
		this.getHome_obj = function(){
			return this.home_obj;
		};
		this.setForm_data = function(form_data){
			this.form_data = form_data;
		};
		this.getForm_data = function(){
			return this.form_data;
		};
        this.validInteger=function(val){
        	var regexp = /[0-9]$/g;
			var result = regexp.test(val);
			if (result) {
				return true;
			}else{
				return false;
			}
	    }
        this.validDeimal=function(val){
	        var regexp = /^\s*-?[0-9,.]\d*(\.\d{0,3})?\s*$/g;
			var result = regexp.test(val);
			if (result) {
				return true;
			}else{
				return false;
			}
	    }

		this.show_toast = function(msg){
			try{
				$cordovaToast.show(msg, toastSDuration, toastPosition);
			}catch(err){
				alert(msg);
			};
		};
		// @ author Sourav keshari nath @ /////
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
	    this.setLoggedIn = function(loggedIn){
	    	this.isLoggedIn = loggedIn;
	    };
	    this.getLoggedIn = function(){
	    		return this.isLoggedIn;
	    };
		// @ author Sourav keshari nath @ /////
	    this.checkOrganicArea=function(farmerId){
			db.get(txn_data_doc_name).then(function(doc){
			    var invalidEntries = 0;
				 currentFarmerwiseData = doc.records.filter(function(obj) {
					if(farmerId == obj.farmerId){
						return true;
					}else{
					  invalidEntries++;
					  return false;
					} 
				});
			}).catch(function(err){
				console.log(err.message);
			});  	   		
	    }
	    
		// @ author Sourav keshari nath @ /////
		this.dropdownRefresh=function(index1,index2,ref_Obj,parent_Obj,scope){
	    	if (scope[""+parent_Obj+""].activities[""+index1+""].details[""+index2+""].value=="Tap") {
				angular.forEach(scope[""+ref_Obj+""], function(value, s_key){
					scope[""+ref_Obj+""][""+s_key+""].checked=false;
				})
			}else{
				angular.forEach(scope[""+ref_Obj+""], function(value, s_key){
	               if (value.name==scope[""+parent_Obj+""].activities[""+index1+""].details[""+index2+""].value) {
					scope[""+ref_Obj+""][""+s_key+""].checked=true;
				   }else{
					scope[""+ref_Obj+""][""+s_key+""].checked=false;
				   }
				})
			}
	    }
		// @ author Sourav keshari nath @ /////
       this.areaCompareValidation=function(f_obj,s_obj,key,val,scope,objectname,keyname,totalOrganicArea){
               var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		       var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
               if (typeof totalOrganicArea!="undefined") {
	               	  if (totalOrganicArea=="") {
	               	  	totalOrganicArea=0;
	               	   }
	                if (parseFloat(totalOrganicArea)<parseFloat(val)) {
	                 	if (key==keyname) {
	                 		this.alertBox(msg_organic_area_field_validation,scope); 
		                 	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
	                     }
	                 }
	              
                }else{
                	//this.alertBox("Please enter organic area",scope); 
                }
       }
       		// @ author Sourav keshari nath @ /////
       this.areaCompareValidation_for_child=function(f_obj,s_obj,t_obj,key,val,scope,objectname,keyname,totalOrganicArea){
               var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		       var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		       var index3=scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details.indexOf(t_obj);
               if (typeof totalOrganicArea!="undefined") {
	               	  if (totalOrganicArea=="") {
	               	  	totalOrganicArea=0;
	               	   }
	                if (parseFloat(totalOrganicArea)<parseFloat(val)) {
	                 	if (key==keyname) {
	                 		this.alertBox(msg_organic_area_field_validation,scope); 
		                 	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value="";
	                     }
	                 }
	              
                }else{
                	//this.alertBox("Please enter organic area",scope); 
                }
       }
       this.integerValidation=function(f_obj,s_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		    if (typeof val!="undefined") {
		    if(val !== null && val != " " && val != ""){
			 if (this.validInteger(val)) {
			    if (typeof val!="undefined") {
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=val;
				}else{
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
					this.alertBox(msg_number_field_validation,scope); 
				}
			 }else{
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=null;
					this.alertBox(three_digit_validation,scope); 
			 }
			}
		}else
		{scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=null;
					this.alertBox(three_digit_validation,scope); }
	    }
	    this.integerValidation_others=function(f_obj,val,scope,objectname,msg){
			var index1=scope[""+objectname+""].details.indexOf(f_obj);
		    if (typeof val!="undefined") {
		    if(val !== null && val != " " && val != ""){
			 if (this.validInteger(val)) {
			    if (typeof val!="undefined") {
					scope[""+objectname+""].details[""+index1+""].value=val;
				}else{
					scope[""+objectname+""].details[""+index1+""].value="";
					this.alertBox(msg_number_field_validation,scope); 
				}
			 }else{
					scope[""+objectname+""].details[""+index1+""].value=null;
					this.alertBox(msg,scope); 
			 }
			}
		}else
		{scope[""+objectname+""].details[""+index1+""].value=null;
					this.alertBox(msg,scope); }
	    }
	    this.integerValidation1=function(f_obj,s_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
			if(val !== null && val != " " && val != ""){ 
			 if (this.validInteger(val)) {
			    if (typeof val!="undefined") {
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=val;
				}else{
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
					this.alertBox(msg_number_field_validation,scope); 
				}
			 }else{
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=null;
					this.alertBox(two_digit_validation,scope); 
			 }
			} 
	    }
	    this.integerValidation4=function(f_obj,s_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
			if(val !== null && val != " " && val != ""){ 
			 if (this.validInteger(val)) {
			    if (typeof val!="undefined") {
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=val;
				}else{
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
					this.alertBox(msg_number_field_validation,scope); 
				}
			 }else{
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=null;
					this.alertBox(four_digit_validation,scope); 
			 }
			} 
	    }
	    this.integerValidationSub=function(f_obj,s_obj,t_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		    var index3=scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details.indexOf(t_obj);
			if(val !== null && val != " " && val != ""){ 
			 if (this.validInteger(val)) {
			    if (typeof val!="undefined") {
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value=val;
				}else{
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value="";
					this.alertBox(msg_number_field_validation,scope); 
				}
			 }else{
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value=null;
					this.alertBox(two_digit_validation,scope); 
			 }
			} 
	    }
	    this.integerValidationSub_3_digit=function(f_obj,s_obj,t_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		    var index3=scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details.indexOf(t_obj);
			if(val !== null && val != " " && val != ""){ 
			 if (this.validInteger(val)) {
			    if (typeof val!="undefined") {
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value=val;
				}else{
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value="";
					this.alertBox(msg_number_field_validation,scope); 
				}
			 }else{
					scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value=null;
					this.alertBox(three_digit_validation,scope); 
			 }
			} 
	    }
		// @ author Sourav keshari nath @ /////
	   this.floatValidation=function(f_obj,s_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		    if(val !== null && val != " " && val != ""){
	        	if(typeof val != "undefined"){
		        	if (this.validDeimal(val)) {
					    if (typeof val!="undefined") {
					    	var float_val=val;
					        scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=float_val;
						}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
							this.alertBox(msg_number_field_validation,scope); 
						}
					}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
					}
	            }else{
	            	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
	            	this.alertBox(msg_invalid_decimal, scope);
	            }
	        }    
	    }
	    		// @ author Sourav keshari nath @ /////
	    this.floatValidation_others=function(f_obj,val,scope,objectname,msg){
			var index1=scope[""+objectname+""].details.indexOf(f_obj);
		    if(val !== null && val != " " && val != ""){
	        	if(typeof val != "undefined"){
		        	if (this.validDeimal(val)) {
					    if (typeof val!="undefined") {
					    	var float_val=val;
					        scope[""+objectname+""].details[""+index1+""].value=float_val;
						}else{
							scope[""+objectname+""].details[""+index1+""].value="";
							this.alertBox(msg_number_field_validation,scope); 
						}
					}else{
							scope[""+objectname+""].details[""+index1+""].value="";
					}
	            }else{
	            	scope[""+objectname+""].details[""+index1+""].value="";
	            	this.alertBox(msg, scope);
	            }
	        }    
	    }
	    this.floatValidation1=function(f_obj,s_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		    if(val !== null && val != " " && val != ""){
	        	if(typeof val != "undefined"){
		        	if (this.validDeimal(val)) {
					    if (typeof val!="undefined") {
					    	var float_val=val;
					        scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=float_val;
						}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
							this.alertBox(msg_number_field_validation,scope); 
						}
					}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
					}
	            }else{
	            	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
	            	this.alertBox(msg_invalid_decimal_5, scope);
	            }
	        }    
	    }
	    this.floatValidation_for_cap=function(f_obj,s_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		    if(val !== null && val != " " && val != ""){
	        	if(typeof val != "undefined"){
		        	if (this.validDeimal(val)) {
					    if (typeof val!="undefined") {
					    	var float_val=val;
					        scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=float_val;
						}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
							this.alertBox(msg_number_field_validation,scope); 
						}
					}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
					}
	            }else{
	            	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
	            	this.alertBox(msg_invalid_decimal_1, scope);
	            }
	        }    
	    }
	    this.floatValidation_for_losp=function(f_obj,s_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		    if(val !== null && val != " " && val != ""){
	        	if(typeof val != "undefined"){
		        	if (this.validDeimal(val)) {
					    if (typeof val!="undefined") {
					    	var float_val=val;
					        scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=float_val;
						}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
							this.alertBox(msg_number_field_validation,scope); 
						}
					}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
					}
	            }else{
	            	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
	            	this.alertBox(three_digit_validation, scope);
	            }
	        }    
	    }
	    this.floatValidation_for_dosp=function(f_obj,s_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		    if(val !== null && val != " " && val != ""){
	        	if(typeof val != "undefined"){
		        	if (this.validDeimal(val)) {
					    if (typeof val!="undefined") {
					    	var float_val=val;
					        scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=float_val;
						}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
							this.alertBox(msg_number_field_validation,scope); 
						}
					}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
					}
	            }else{
	            	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
	            	this.alertBox(msg_invalid_decimal_2, scope);
	            }
	        }    
	    }
	    this.floatValidation_for_lodp=function(f_obj,s_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		    if(val !== null && val != " " && val != ""){
	        	if(typeof val != "undefined"){
		        	if (this.validDeimal(val)) {
					    if (typeof val!="undefined") {
					    	var float_val=val;
					        scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=float_val;
						}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
							this.alertBox(msg_number_field_validation,scope); 
						}
					}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
					}
	            }else{
	            	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
	            	this.alertBox(four_two_validation, scope);
	            }
	        }    
	    }
	    this.floatValidation_for_ry=function(f_obj,s_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		    if(val !== null && val != " " && val != ""){
	        	if(typeof val != "undefined"){
		        	if (this.validDeimal(val)) {
					    if (typeof val!="undefined") {
					    	var float_val=val;
					        scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=float_val;
						}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
							this.alertBox(msg_number_field_validation,scope); 
						}
					}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
					}
	            }else{
	            	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
	            	this.alertBox(msg_invalid_decimal_3, scope);
	            }
	        }else{
	            	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
	            	this.alertBox(msg_invalid_decimal_3, scope);
	        }    
	    }
	    this.floatValidation_for_child=function(f_obj,s_obj,t_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		    var index3=scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details.indexOf(t_obj);
		    if(val !== null && val != " " && val != ""){
	        	if(typeof val != "undefined"){
		        	if (this.validDeimal(val)) {
					    if (typeof val!="undefined") {
					    	var float_val=val;
					        scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value=float_val;
						}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value="";
							this.alertBox(msg_number_field_validation,scope); 
						}
					}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value="";
					}
	            }else{
	            	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value="";
	            	this.alertBox(msg_invalid_decimal_3, scope);
	            }
	        }else{
	            	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value="";
	            	this.alertBox(msg_invalid_decimal_3, scope);
	        }    
	    }
	    this.floatValidation_for_child_3_digit=function(f_obj,s_obj,t_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		    var index3=scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details.indexOf(t_obj);
		    if(val !== null && val != " " && val != ""){
	        	if(typeof val != "undefined"){
		        	if (this.validDeimal(val)) {
					    if (typeof val!="undefined") {
					    	var float_val=val;
					        scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value=float_val;
						}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value="";
							this.alertBox(msg_number_field_validation,scope); 
						}
					}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value="";
					}
	            }else{
	            	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value="";
	            	this.alertBox(msg_invalid_decimal, scope);
	            }
	        }else{
	            	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].child_details[""+index3+""].value="";
	            	this.alertBox(msg_invalid_decimal, scope);
	        }    
	    }
	    this.floatValidation_5=function(f_obj,s_obj,val,scope,objectname){
			var index1=scope[""+objectname+""].activities.indexOf(f_obj);
		    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
		    if(val !== null && val != " " && val != ""){
	        	if(typeof val != "undefined"){
		        	if (this.validDeimal(val)) {
					    if (typeof val!="undefined") {
					    	var float_val=val;
					        scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=float_val;
						}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
							this.alertBox(msg_invalid_decimal_4,scope); 
						}
					}else{
							scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
					}
	            }else{
	            	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
	            	this.alertBox(msg_invalid_decimal_4, scope);
	            }
	        }    
	    }

		// @ author Sourav keshari nath @ /////
	    this.totalSum=function(compare_Obj,key_Name,total_Oarea,scope){
        	var sumOrganArea=0;
			angular.forEach(compare_Obj, function(f_value, f_key){
				    angular.forEach(f_value.details, function(s_value, s_key){
							if (s_value.key==key_Name) {
								if (parseFloat(s_value.value) >= 0){

							    	sumOrganArea=parseFloat(sumOrganArea)+parseFloat(s_value.value);
								}
							}
					});
			});
			
            sumOrganArea = (sumOrganArea).toFixed(2);
           // sumOrganArea = sumOrganArea.toString();
			if (parseFloat(sumOrganArea) > parseFloat(total_Oarea)) {
				this.alertBox(msg_organic_total_area_field_validation,scope); 
				return false;
			}
			else{
				return true;
			}
        }
        this.totalSum_new=function(compare_Obj,key_Name,total_Oarea,scope){
        	var sumOrganArea=0;
			angular.forEach(compare_Obj, function(f_value, f_key){
				    angular.forEach(f_value.details, function(s_value, s_key){
							if (s_value.key==key_Name) {
								if (parseFloat(s_value.value) >= 0)
							    	sumOrganArea=sumOrganArea+parseFloat(s_value.value);
							}
					});
			});
			if (sumOrganArea != total_Oarea) {
				this.alertBox(msg_organic_total_area_field_validation_new,scope); 
				return false;
			}
			else{
				return true;
			}
        }
        this.area_not_filled=function(compare_Obj,key_Name,scope){
        	var flag = false;
			angular.forEach(compare_Obj, function(f_value, f_key){
				    angular.forEach(f_value.details, function(s_value, s_key){
				    	if (s_value.key==key_Name){
				    		var checkVal=parseInt(s_value.value);
				    		if (isNaN(checkVal)||checkVal=="0") {
				    			flag = false;
				    		}else{
				    			if (parseInt(s_value.value) > 0){
									flag = true;
								}
				    		}

						}	
					});
			});
			if(flag){
				return true;
			}else{
				var my_popup = $ionicPopup.show({
					template: msg_area_not_filled,
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
				return false;
			}
        }
   		this.area_not_filled_new=function(compare_Obj,key_Name,scope,msg){
        	var count = 0;
			angular.forEach(compare_Obj, function(f_value, f_key){
			    angular.forEach(f_value.details, function(s_value, s_key){
			    	if (s_value.key==key_Name){
						if (typeof s_value.value=="undefined" || s_value.value.trim() == "" || Number(s_value.value) == 0){
							count++;
						}
					}	
				});
			});
			if(count > 0){
				var my_popup = $ionicPopup.show({
					template: msg,
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
				return false;   
			}else{
				return true;
			}
        }
        this.area_not_filled_new_int=function(compare_Obj,key_Name,scope,msg){
        	var count = 0;
			angular.forEach(compare_Obj, function(f_value, f_key){
			    angular.forEach(f_value.details, function(s_value, s_key){
			    	if (s_value.key==key_Name){
						if (typeof s_value.value=="undefined" || s_value.value == 0){
							count++;
						}
					}	
				});
			});
			if(count > 0){
				var my_popup = $ionicPopup.show({
					template: msg,
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
				return false;   
			}else{
				return true;
			}
        }
        this.area_not_filled_new1=function(compare_Obj,key_Name,scope,msg){
        	var count = 0;
			angular.forEach(compare_Obj, function(f_value, f_key){
			    angular.forEach(f_value.details, function(s_value, s_key){
			    	if (s_value.key==key_Name){
				    	if(f_value.details[0].value == true){
							if (typeof s_value.value=="undefined" || s_value.value.trim() == "" || Number(s_value.value) == 0){
								count++;
							}
						}
					}	
				});
			});
			if(count > 0){
				var my_popup = $ionicPopup.show({
					template: msg,
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
				return false;   
			}else{
				return true;
			}
        }
        this.area_not_filled_child=function(compare_Obj,key_Name,scope){
        	var count = 0;
			angular.forEach(compare_Obj, function(f_value, f_key){
				if (f_value.details.length>0) {
				    angular.forEach(f_value.details, function(s_value, s_key){
			    	    angular.forEach(s_value.child_details, function(t_value, t_key){
					    	if (t_value.key==key_Name){
								if (typeof t_value.value=="undefined" || t_value.value.trim() == "" || Number(t_value.value) == 0){
									console.log(t_value.value)
									count++;
								}
							}	
						})
					});
			    }else{
					count++;
			    }
			});
			if(count > 0){
				var my_popup = $ionicPopup.show({
					template: msg_area_not_filled,
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
				return false;   
			}else{
				return true;
			}
        }
        this.area_not_filled_child1=function(compare_Obj,key_Name,scope){
        	var count = 0;
			angular.forEach(compare_Obj, function(f_value, f_key){
				if (f_value.details.length>0) {
				    angular.forEach(f_value.details, function(s_value, s_key){
			    	    angular.forEach(s_value.child_details, function(t_value, t_key){
					    	if (t_value.key==key_Name){
					    	if(s_value.child_details[0].value != "Tap" && typeof(s_value.child_details[0].value) != 'undefined'){	
								if (typeof t_value.value=="undefined" || t_value.value.trim() == "" || Number(t_value.value) == 0){
									console.log(t_value.value)
									count++;
								}
							}
							}	
						})
					});
			    }
			});
			if(count > 0){
				var my_popup = $ionicPopup.show({
					template: msg_area_not_filled,
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
				return false;   
			}else{
				return true;
			}
        }
		this.getlandDetailsData=function(farmerid,fync_yearid){
	     	var result_val=[];
	     	 db.get(txn_data_doc_name).then(function(doc) {
	              angular.forEach(doc.records, function(f_value, f_key){
	              	if (farmerid==f_value.farmerId && fync_yearid==f_value.farmerTimePeriodId) {
	              		angular.forEach(f_value.data, function(s_value, s_key){
	              			if (s_key=="land_details") {
	                               result_val=s_value.pre_table_data;
			              	}
		                });
	              	}
	              });
	              if (result_val.length>0) {
		               $rootScope.$broadcast("landdetail_result", result_val);
	              }else{
	              	  $rootScope.$broadcast("landdetail_result", result_val);
	              }
	     	 }).catch(function (err) {
	     	 	//$cordovaToast.show("Data not found from database!", toastSDuration, toastPosition);
				  console.log(err);
			});
	    }	
	    this.checkPrevDataSubmitted=function(farmerid,fync_yearid,help_employement_obj,id){
	     	var chk_val=false;
	     	 db.get('txn_data').then(function(doc) {
	              angular.forEach(doc.records, function(f_value, f_key){
	              	if (farmerid==f_value.farmerId && fync_yearid==f_value.farmerTimePeriodId) {
	              		angular.forEach(f_value.data, function(s_value, s_key){
	              			if (s_key=="land_details") {
	                               chk_val=s_value.submitted;
			              	}
		                });
	              	}
	              });
	              if (chk_val) {
		               $rootScope.$broadcast("prevdata_result", true);
	              }else{
	              	  $rootScope.$broadcast("prevdata_result", false);
	              }
	     	 }).catch(function (err) {
	     	 	$cordovaToast.show("Data not found from database!", toastSDuration, toastPosition);
				  console.log(err);
			});
	    }
	    // @ author Sourav keshari nath @ /////
    this.ScreenSize=function(){
     	var physicalScreenWidth = window.screen.width * window.devicePixelRatio;
        var physicalScreenHeight = window.screen.height;// * window.devicePixelRatio;
        if (physicalScreenHeight >=790) {
	         var myObj = {"Content":{
		        "zoom" : "180%",
		        "font-size" : "11px",
		        "margin-top":"-40px",
		        "margin-bottom":"-0px",
		         "line-height": "190%",
		         "padding-top": "35px"
		        
	         },"View":{
		        "font-size" : "12px"},
		        "Popup":{
		        "zoom" : "180%",
		        "font-size" : "11px"},
		         "Text":{
		        "text-align": "center",
		         "line-height": "70%"},
		         "Homeicon":{"0":true},
		         "Headerheight":{"height":"60px"},
		         "Title":{"height": "inherit","line-height": "60px"}
		    }
	        return myObj;
        }
    }

	// @ author Sourav keshari nath @ /////
    this.check_create_directory=function(){
        $cordovaFile.checkDir(cordova.file.externalRootDirectory, "CottonConnect")
		.then(function (success) {},
			function (error) {
             	$cordovaFile.createDir(cordova.file.externalRootDirectory, "CottonConnect", false)
				.then(function (success) {
					$cordovaFile.checkDir(cordova.file.externalRootDirectory+"/CottonConnect/", "ErrorLog")
					.then(function (success) {},
						function (error) { 
                    	$cordovaFile.createDir(cordova.file.externalRootDirectory+"CottonConnect/", "ErrorLog", false)
						.then(function (success) {},
							function (error) { 
							console.error("Error in ErrorLog folder creation");
						});
					});
				},function (error) {
						        
				});
            });
    };
	// @ author Sourav keshari nath @ /////
        
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
    /*
	@author - Ratikanta Pradhan(ratikanta@sdrc.co.in)
	@author - Pratyush Kumar Rath(pratyush@sdrc.co.in)
    */ 
    this.doLogin = function(login_data,scope){
    	   //the following line encodes password to md5 pattern
    	   login_data.password = md5.createHash(login_data.username+'{'+login_data.password+'}');
	       var flag = true;
	       logged_in=false;
		   db.get(master_data_doc_name).
			then(function(result){
				for(var i = 0; i < result.data.authentications.length;i++){
					if(result.data.authentications[i].userName === login_data.username && 
						result.data.authentications[i].password === login_data.password){
						$rootScope.$broadcast("login_result", true);
						flag = false;
                        logged_in=true;
						break;
					}
				}
				if(flag){
					//username and password does not match in the database, have to fetch data from server
					$http.get(checkInternetURL).
					then(function(result){
						//if internet will be there the following code will be executed

						$http.post(server_url+'user', {"userName":login_data.username,"password":login_data.password,"alive":true}).
						then(function(response){
							//got the data, it implies user name and password was correct,
							//now we have to replace the master data
							if(response.data.farmerModels == null){
								MainServiceHelper.show_toast(msg_no_farmer_assigned);
								MainServiceHelper.hide_spinner();
								$rootScope.$broadcast("login_result", 4);
							}
							else if(response.data.authentications != null){
								var insertDoc={
									_id: master_data_doc_name,
									data: response.data
								};
								MainServiceHelper.hide_spinner();

								var confirmPopup = $ionicPopup.confirm({
							     title: 'Confirmation',
							     template: msg_user_data_replace,
							     scope:scope
							   	});

							   	confirmPopup.then(function(res) {
							     if(res) {
							     	MainServiceHelper.show_spinner();
								//delete master data table and recreate it
								db.get(master_data_doc_name).then(function(doc) {
								  return db.remove(doc);
								}).then(function (result) {
								  // handle result



								  //doc deleted 

								  //delete the txn table for the last user
								  db.get(txn_data_doc_name).
								  then(function(doc) {
									  return db.remove(doc);
								  }).then(function (result) {
									  // handle result
                                       
                                      //clear previous sync status data
                                      currentSyncStatusObj={};

									  db.put(insertDoc).
									  then(function (response) {
										  $rootScope.$broadcast("login_result", true);					  
									  }).catch(function(err){
										  MainServiceHelper.writeLog("MainService","dologin",err.status);							
										  $rootScope.$broadcast("login_result", err.status);
										  MainServiceHelper.hide_spinner();
									  });
									}).catch(function(err){
										if(err.status === 404){      
											db.put(insertDoc).
											  then(function (response) {
												  $rootScope.$broadcast("login_result", true);					  
											  }).catch(function(err){
												  MainServiceHelper.writeLog("MainService","dologin",err.status);							
												  $rootScope.$broadcast("login_result", err.status);
												  MainServiceHelper.hide_spinner();
											  });
										}else{
											MainServiceHelper.writeLog("MainService","dologin",err.status);
											$rootScope.$broadcast("login_result", err.status);
											MainServiceHelper.hide_spinner();
										}
									});
								}).catch(function (err) {
									//error in document deletion
								  MainServiceHelper.writeLog("MainService","dologin",err.status);							
								  $rootScope.$broadcast("login_result", err.status);
								  MainServiceHelper.hide_spinner();
								});
							     }else{							       
							       $rootScope.$broadcast("login_result", 3);
							     }
							   	});		

							}
							else {
								$rootScope.$broadcast("login_result", -1);
							}
						    
									
						},function(error){
							MainServiceHelper.writeLog("MainService","dologin",error.status);
							$rootScope.$broadcast("login_result", error.status);
						});
					},function(error){
						//if internet will not be there the following code will be executed
						$rootScope.$broadcast("login_result", 2);
					});    
				}
				
			}).
			catch(function(error){
				if(error.status === 404){
					$http.get(checkInternetURL).
					then(function(result){
						//if internet will be there the following code will be executed
						
						$http.post(server_url+'user', {"userName":login_data.username,"password":login_data.password,"alive":true}).
						then(function(response){
							if(response.data.farmerModels == null){
								MainServiceHelper.show_toast(msg_no_farmer_assigned);
								MainServiceHelper.hide_spinner();
								$rootScope.$broadcast("login_result", 4);
							}
							else if(response.data.authentications != null){
								var doc={
								  _id: master_data_doc_name,
								  data: response.data
								};
							    db.put(doc).then(function (response) {
								  $rootScope.$broadcast("login_result", true);					 

								}).catch(function(err){
									MainServiceHelper.writeLog("MainService","dologin",err.status);							
									$rootScope.$broadcast("login_result", err.status);
								});
							}
							else {
								$rootScope.$broadcast("login_result", -1);
							}
									
						},function(error){
	                        //MainServiceHelper.writeLog("MainService","dologin",error.status);
							$rootScope.$broadcast("login_result", error.status);
						}); 
					},function(error){
						//if internet will not be there the following code will be executed
						$rootScope.$broadcast("login_result", 2);
					});         
				}
	
			});

	};

	this.replaceCharacter = function(data){
		return data.replace(/[.*+?^${}()|/|&| |[\]\\]/g, "");
	};
	this.validString=function(f_obj,s_obj,val,scope,objectname){
    	var index1=scope[""+objectname+""].activities.indexOf(f_obj);
	    var index2=scope[""+objectname+""].activities[""+index1+""].details.indexOf(s_obj);
        if (typeof val!="undefined") {
        	var str = val.toString();
            var n_count = str.length;
            if (n_count<50) {
		    	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value=val;
			}else{
				scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
				this.alertBox("This field accepts upto 50 characters, and will take only text, number and space.",scope); 
		    }
		 }else{
		 	scope[""+objectname+""].activities[""+index1+""].details[""+index2+""].value="";
		    this.alertBox("This field accepts upto 50 characters and will take only text, number and space.",scope); 
		 }
	}

	this.save = function(obj, data_type,scope){

		if(obj.created_by === null || obj.created_by === undefined || obj.created_by === ""){
			obj.created_by = this.getUsername();
			obj.created_date = this.get_date_time();
		}else{
			obj.updated_by = this.getUsername();
			obj.updated_date = this.get_date_time();	
		}
		var records = [];
		var record = {};
		db.get(txn_data_doc_name).
		then(function(doc){
			records = doc.records;
			for(var i = 0; i < records.length;i++){
				if(records[i].farmerId === obj.farmerId && 
					records[i].farmerTimePeriodId === obj.farmerTimePeriodId ){
					record = records[i];

					//remove the record
					records.splice(i, 1);
					break;
				}
			}

			//insert new one
			switch(data_type){
			case 0:
				record.data.land_details = obj;
				break;	
			case 1:
				record.data.help_employment = obj;
				break;
			case 2:
				record.data.soil_preparation = obj;
				break;
			case 3:
				record.data.sowing_cost = obj;
				break;
			case 4:
				record.data.water_use = obj;
				break;
			case 5:
				record.data.irrigation_details = obj;
				break;
			case 6:
				record.data.manure_application = obj;
				break;
			case 7:
				record.data.land_and_irrigation = obj;
				break;
			case 8:
				record.data.weeding_details = obj;
				break;
			case 9:
				record.data.estimation = obj;
				break;	
			case 10:
				record.data.cotton_picking_harvesting = obj;
				break;
			case 11:
				record.data.trainings_attended_by = obj;
				break;	
			case 12:
				record.data.meeting_attended_by = obj;
				break;
			case 13:
				record.data.pesticide_application_details = obj;
				break;
			case 14:
				record.data.bestpractices_decentwork = obj;
				break;
			case 15:
				record.data.labors_record = obj;
				break;
			case 16:
				record.data.farmer_household_details = obj;
				break;
			case 17:
				record.data.land_holding_details = obj;
				break;	
			case 18:
				record.data.cotton_crop_details = obj;
				break;
			case 19:
				record.data.livestock_cattle_ownership = obj;
				break;
			case 20:
				record.data.asset_ownership = obj;
				break;
			case 21:
				record.data.educational_housing_details = obj;
				break;
			case 22:
				record.data.selling_othersource = obj;
				break;	
            case 23:
				record.data.additional_details = obj;
				break;														
			case 24:
				record.data.sustainable_practices = obj;
				break;												
			default :
				break;

			}
			
			records.push(record);
			return db.put({
				_id: txn_data_doc_name,
				_rev: doc._rev,
				records: records	
			}).
			then(function(){
				//success
				$ionicLoading.hide();
				$cordovaToast.show("successfully saved!", toastSDuration, toastPosition);


			}).
			catch(function(err){
				if(err.status === 409){
					console.error("Conflict");
				}else{
					console.error("err.status : " + err.status);	
				}
			});
		}).
		catch(function(err){
			console.error("Error : " + err.status);
		});

	};

	/*
		@author Ratikanta Pradhan (ratikanta@sdrc.co.in)
		@author Pratyush Kumar Rath (pratyush@sdrc.co.in)
		@author Sourav Keshari Nath (souravnath@sdrc.co.in)
		This method sends the transactional data to the server

	*/
	this.sync = function(scope){
		try{
			db.get(txn_data_doc_name).
			then(function (doc) {

				var farmers = [];
				var db_farmers = doc.records;
				var not_synced_farmers = [];
				for(var i = 0;i< db_farmers.length;i++)
					if(!db_farmers[i].isSynced)
						not_synced_farmers.push(db_farmers[i]);

				for(var i = 0;i< not_synced_farmers.length;i++){
					var countFarmer = 0;
					var farmer = {
						farmerId:not_synced_farmers[i].farmer.farmerId,
						farmerCode:not_synced_farmers[i].farmer.farmerCode,
						totalArea:not_synced_farmers[i].farmer.totalArea,
						totalOrganicArea:not_synced_farmers[i].farmer.totalOrganicArea,
						farmerName:not_synced_farmers[i].farmer.farmerName,
						village:not_synced_farmers[i].farmer.village,
						villageId:not_synced_farmers[i].farmer.villageId,
						projectName:not_synced_farmers[i].farmer.projectName,
						farmerTimePeriodId:not_synced_farmers[i].farmer.farmerTimePeriodId,
						isSynced:not_synced_farmers[i].farmer.isSynced,
						landDetailModel:null,
						helpEmploymentOnOrganicModel:null,
						landPreparationDetailModels:null,
						seedSowingModels:null,
						electricPumpWaterUseModels:null,
						irrigationDetailModels:null,
						manureApplicationDetailModels:null,
						landAndIrrigationDetailsModels:null,
						estimationOfProductionAndHarvestModels:null,
						weedingDetailModels:null,
						cottonPickingStorageModel:null,
						meetingTrainingAttendedModels:null,
						bioPesticideDetailsModels:null,
						bestPracticesModel:null,
						laborsRecordModels:null,
						sellingAndOtherSourceOfIncomeModel:null,
						sustainablePracticeModels:null,
						otherInformationFarmerHouseholdDetailModel:null,
						otherInformationLandHoldingDetailModel:null,
						otherInformationLiveStockAndCattleOwnershipModel:null,
						otherInformationLiveStockAndCattleOwnershipModel:null,
						otherInformationAssetOwnershipModel:null,
						otherInformationAdditionalDetailModel:null,
						gender:0,
						age:0,
						live:not_synced_farmers[i].farmer.live
					};
					//velue pass for totalArea and totalOrganicArea synced or not
					if(	not_synced_farmers[i].data.land_details.submitted){

						for(var j = 0; j < not_synced_farmers[i].data.land_details.pre_table_data.length;j++){
							if(not_synced_farmers[i].data.land_details.pre_table_data[j].key === "toalArea")
								farmer.totalArea = not_synced_farmers[i].data.land_details.pre_table_data[j].value === ""?0.0:not_synced_farmers[i].data.land_details.pre_table_data[j].value;
							

							if(not_synced_farmers[i].data.land_details.pre_table_data[j].key === "toalOArea")
								farmer.totalOrganicArea = not_synced_farmers[i].data.land_details.pre_table_data[j].value === ""?0.0:not_synced_farmers[i].data.land_details.pre_table_data[j].value;						

						}
					}
					//check landDetailModel synced or not
					if(!not_synced_farmers[i].data.land_details.isSynced  && not_synced_farmers[i].data.land_details.isSynced != undefined && 
						not_synced_farmers[i].data.land_details.submitted && (not_synced_farmers[i].data.land_details.errorMessage === undefined || not_synced_farmers[i].data.land_details.errorMessage === null)){
						countFarmer++;
						farmer.landDetailModel = {};
						farmer.landDetailModel.landDetailsId = 0;
						for(var j = 0; j < not_synced_farmers[i].data.land_details.pre_table_data.length;j++){
							if(not_synced_farmers[i].data.land_details.pre_table_data[j].key === "toalArea")
								farmer.landDetailModel.totalArea = not_synced_farmers[i].data.land_details.pre_table_data[j].value === ""?0.0:not_synced_farmers[i].data.land_details.pre_table_data[j].value;
							

							if(not_synced_farmers[i].data.land_details.pre_table_data[j].key === "toalOArea")
								farmer.landDetailModel.totalOrganicArea = not_synced_farmers[i].data.land_details.pre_table_data[j].value === ""?0.0:not_synced_farmers[i].data.land_details.pre_table_data[j].value;						

						}						
						farmer.landDetailModel.farmerTimePeriodId = not_synced_farmers[i].data.land_details.farmerTimePeriodId;
						farmer.landDetailModel.createdBy = not_synced_farmers[i].data.land_details.created_by;
						farmer.landDetailModel.createdDate = not_synced_farmers[i].data.land_details.created_date;
						farmer.landDetailModel.updatedDate = not_synced_farmers[i].data.land_details.updated_date;
						farmer.landDetailModel.updatedBy = not_synced_farmers[i].data.land_details.updated_by;
						farmer.landDetailModel.farmDetailsModels = [];


						for(var j = 0; j < not_synced_farmers[i].data.land_details.activities.length;j++){

							var details = not_synced_farmers[i].data.land_details.activities[j].details;
							var farmDetails = {}
							farmDetails.farmDetailId = 0;

							for(var k = 0; k < details.length;k++){
								if(details[k].name){
									switch(details[k].name){
										case "Land area(Ha)":
											farmDetails.landArea = details[k].value === ""?0.0:details[k].value;
										break;
										case "Survey No":
											farmDetails.surveyNumber = details[k].value;
										break;
										case "Latitude":
											farmDetails.latitude = details[k].value;
										break;
										case "Longitude":
											farmDetails.longitude = details[k].value;
										break;
										case "Current Status":
											farmDetails.currentStatus = details[k].value==="Tap"||details[k].value=== undefined?null:details[k].id;
										break;
										default:
										break;

									}
								}
							}							
							
							farmDetails.currentStatusName = null;
							farmDetails.farmerTimePeriodId = not_synced_farmers[i].data.land_details.farmerTimePeriodId;
							farmDetails.createdBy = not_synced_farmers[i].data.land_details.created_by;
							farmDetails.createdDate = not_synced_farmers[i].data.land_details.created_date;
							farmDetails.updatedDate = not_synced_farmers[i].data.land_details.updated_date;
							farmDetails.updatedBy = not_synced_farmers[i].data.land_details.updated_by;
							farmDetails.processId = landDetailProcessId;
							farmDetails.live = not_synced_farmers[i].data.land_details.live;
							farmer.landDetailModel.farmDetailsModels.push(farmDetails);
						}
						farmer.landDetailModel.live = not_synced_farmers[i].data.land_details.live;
					}

					//check help_employement synced or not
					if(!not_synced_farmers[i].data.help_employment.isSynced  && not_synced_farmers[i].data.help_employment.isSynced != undefined && 
						not_synced_farmers[i].data.help_employment.submitted && (not_synced_farmers[i].data.help_employment.errorMessage === undefined || not_synced_farmers[i].data.help_employment.errorMessage === null)){
						countFarmer++;
						farmer.helpEmploymentOnOrganicModel = {};

						for(var j = 0; j < not_synced_farmers[i].data.help_employment.pre_table_data.length;j++){
							if(not_synced_farmers[i].data.help_employment.pre_table_data[j].key === "numberOfMaleLabors"){
								if(typeof(not_synced_farmers[i].data.help_employment.pre_table_data[j].value) === "string")
									not_synced_farmers[i].data.help_employment.pre_table_data[j].value = (not_synced_farmers[i].data.help_employment.pre_table_data[j].value).trim();
								farmer.helpEmploymentOnOrganicModel.numberOfMaleLabors = not_synced_farmers[i].data.help_employment.pre_table_data[j].value === ""?0:not_synced_farmers[i].data.help_employment.pre_table_data[j].value;
							}
							

							if(not_synced_farmers[i].data.help_employment.pre_table_data[j].key === "numberOfFemaleLabors"){
								if(typeof(not_synced_farmers[i].data.help_employment.pre_table_data[j].value) === "string")
									not_synced_farmers[i].data.help_employment.pre_table_data[j].value = (not_synced_farmers[i].data.help_employment.pre_table_data[j].value).trim();
								farmer.helpEmploymentOnOrganicModel.numberOfFemaleLabors = not_synced_farmers[i].data.help_employment.pre_table_data[j].value === ""?0:not_synced_farmers[i].data.help_employment.pre_table_data[j].value;						
							}

						}
						var helpEmploymentOnOrganicModelTableRowData = [];
						for(var j = 0; j < not_synced_farmers[i].data.help_employment.activities.length;j++){

							var details = not_synced_farmers[i].data.help_employment.activities[j].details;

							var row_data = {};
							row_data.typeDetailId = not_synced_farmers[i].data.help_employment.activities[j].typeDetailId;
							row_data.typeDetailName = null;

							for(var k = 0; k < details.length;k++){
								if(typeof(details[k].value) === "string")
									details[k].value = (details[k].value).trim();
								switch(details[k].key){
									case "helpingEmployed":
										row_data.helpingEmployed = details[k].value;
									break;
									case "landPreparation":
										if(details[k].value == true)
											details[k].value = 1
										else if(details[k].value == false)
											details[k].value = 0
										row_data.landPreparation = details[k].value === ""?0:details[k].value;
									break;
									case "sowing":
										if(details[k].value == true)
											details[k].value = 1
										else if(details[k].value == false)
											details[k].value = 0
										row_data.sowing = details[k].value === ""?0:details[k].value;
									break;
									case "weeding":
										if(details[k].value == true)
											details[k].value = 1
										else if(details[k].value == false)
											details[k].value = 0
										row_data.weeding = details[k].value === ""?0:details[k].value;
									break;
									case "manureBotanicalapplication":
										if(details[k].value == true)
											details[k].value = 1
										else if(details[k].value == false)
											details[k].value = 0
										row_data.manureBotanicalapplication = details[k].value === ""?0:details[k].value;
									break;
									case "picking":
									if(details[k].value == true)
											details[k].value = 1
										else if(details[k].value == false)
											details[k].value = 0
										row_data.picking = details[k].value === ""?0:details[k].value;
									break;
								}
							}

							row_data.farmerTimePeriodId = not_synced_farmers[i].farmer.farmerTimePeriodId;
							row_data.createdBy = not_synced_farmers[i].data.help_employment.created_by;
							row_data.createdDate = not_synced_farmers[i].data.help_employment.created_date;
							row_data.updatedDate = not_synced_farmers[i].data.help_employment.updated_date;
							row_data.updatedBy = not_synced_farmers[i].data.help_employment.updated_by;
							row_data.processId = helpEmploymentOnOrganicProcessId;
							row_data.personId = 0; 
							row_data.live = not_synced_farmers[i].data.help_employment.live;
							helpEmploymentOnOrganicModelTableRowData.push(row_data);

						}
						
							
						farmer.helpEmploymentOnOrganicModel.farmerTimePeriodId = not_synced_farmers[i].farmer.farmerTimePeriodId;
						farmer.helpEmploymentOnOrganicModel.createdBy = not_synced_farmers[i].data.help_employment.created_by;
						farmer.helpEmploymentOnOrganicModel.createdDate = not_synced_farmers[i].data.help_employment.created_date;
						farmer.helpEmploymentOnOrganicModel.updatedDate = not_synced_farmers[i].data.help_employment.updated_date;
						farmer.helpEmploymentOnOrganicModel.updatedBy = not_synced_farmers[i].data.help_employment.updated_by;
						farmer.helpEmploymentOnOrganicModel.updatedBy = not_synced_farmers[i].data.help_employment.updated_by;
						farmer.helpEmploymentOnOrganicModel.live = not_synced_farmers[i].data.help_employment.live;
						farmer.helpEmploymentOnOrganicModel.helpEmploymentOnOrganicModelTableRowData = helpEmploymentOnOrganicModelTableRowData;
						
					}

					//check landPreparation synced or not
					if(!not_synced_farmers[i].data.soil_preparation.isSynced  && not_synced_farmers[i].data.soil_preparation.isSynced != undefined && 
						not_synced_farmers[i].data.soil_preparation.submitted && (not_synced_farmers[i].data.soil_preparation.errorMessage === undefined || not_synced_farmers[i].data.soil_preparation.errorMessage === null)){
						countFarmer++;
						farmer.landPreparationDetailModels = [];
						var landPreparationSubWork = function(typeDetailIdHere, detailsHere){
							var landPreparationDetailModel = {};
							landPreparationDetailModel.landPreparationDetailId = 0;
							landPreparationDetailModel.cultivationPratices = typeDetailIdHere;
							landPreparationDetailModel.cultivationPraticesName = null;
							var totalCost = 0.0;
							for(var d = 0; d < detailsHere.length;d++){
								if(typeof(detailsHere[d].value) === "string")
									detailsHere[d].value = (detailsHere[d].value).trim();
								switch(detailsHere[d].name){
									
									case "Activity performed":
										landPreparationDetailModel.activityPerformed = detailsHere[d].value;
									break;
									case "Month of activity":
										landPreparationDetailModel.monthId = detailsHere[d].value==="Tap"||detailsHere[d].value=== undefined?null:detailsHere[d].id;
										landPreparationDetailModel.monthName = null;
									break;
									case "Tractor":
										landPreparationDetailModel.tractor = detailsHere[d].value;
									break;
									case "Male":										
										landPreparationDetailModel.male = detailsHere[d].value === ""?0:detailsHere[d].value;
									break;
									case "Female":
										landPreparationDetailModel.female = detailsHere[d].value === ""?0:detailsHere[d].value;
									break;
									case "Out of school Children":
										landPreparationDetailModel.outOfSchoolChildren = detailsHere[d].value === ""?0:detailsHere[d].value;
									break;
									case "Operational/farm area(ha)":
										landPreparationDetailModel.area = parseFloat((detailsHere[d].value).trim() === ""?0.0:detailsHere[d].value);
									break;									
									case "Oil":
										landPreparationDetailModel.oilCost = parseFloat((detailsHere[d].value).trim() === ""?0.0:detailsHere[d].value);
										totalCost += parseFloat((detailsHere[d].value).trim() === ""?0.0:detailsHere[d].value); 
									break;
									case "Labor":
										landPreparationDetailModel.laborCost = parseFloat((detailsHere[d].value).trim() === ""?0.0:detailsHere[d].value);
										totalCost += parseFloat((detailsHere[d].value).trim() === ""?0.0:detailsHere[d].value);
									break;
									case "Equipment":
										landPreparationDetailModel.hiredEquipmentCost = parseFloat((detailsHere[d].value).trim() === ""?0.0:detailsHere[d].value);
										totalCost += parseFloat((detailsHere[d].value).trim() === ""?0.0:detailsHere[d].value);
									break;
									
									default:
									break;								
								};
							}
							landPreparationDetailModel.totalCost = parseFloat(totalCost.toFixed(2));
							landPreparationDetailModel.farmerTimePeriodId = not_synced_farmers[i].data.soil_preparation.farmerTimePeriodId;
							landPreparationDetailModel.createdBy = not_synced_farmers[i].data.soil_preparation.created_by;
							landPreparationDetailModel.createdDate = not_synced_farmers[i].data.soil_preparation.created_date;
							landPreparationDetailModel.updatedDate = not_synced_farmers[i].data.soil_preparation.updated_date;
							landPreparationDetailModel.updatedBy = not_synced_farmers[i].data.soil_preparation.updated_by;
							landPreparationDetailModel.processId = landPreparationDetailProcessId;
							landPreparationDetailModel.live = not_synced_farmers[i].data.soil_preparation.live;
							farmer.landPreparationDetailModels.push(landPreparationDetailModel);
						};

						for(var j = 0; j < not_synced_farmers[i].data.soil_preparation.activities.length;j++){

							var typeDetailId = not_synced_farmers[i].data.soil_preparation.activities[j].typeDetailId;
							switch(typeDetailId){
								case 11:
									var plDetails = not_synced_farmers[i].data.soil_preparation.activities[j].details;
									landPreparationSubWork(11, plDetails);
								break;
								case 12:
									var hrDetails = not_synced_farmers[i].data.soil_preparation.activities[j].details;
									landPreparationSubWork(12, hrDetails);
								break;
								case 13:
									var leDetails = not_synced_farmers[i].data.soil_preparation.activities[j].details;
									landPreparationSubWork(13, leDetails);
								break;
								case 14:
									var roDetails = not_synced_farmers[i].data.soil_preparation.activities[j].details;
									landPreparationSubWork(14, roDetails);
								break;
								case 15:
									var prDetails = not_synced_farmers[i].data.soil_preparation.activities[j].details;
									landPreparationSubWork(15, prDetails);
								break;
								case 16:
									var orDetails = not_synced_farmers[i].data.soil_preparation.activities[j].details;
									landPreparationSubWork(16, orDetails);
								break;
								case 17:
									var otDetails = not_synced_farmers[i].data.soil_preparation.activities[j].details;
									landPreparationSubWork(17, otDetails);
								break;
								default:
								break;							

							};
							
						}				
					}


					//check sowing cost synced or not
					if(!not_synced_farmers[i].data.sowing_cost.isSynced  && not_synced_farmers[i].data.sowing_cost.isSynced != undefined 
							&& not_synced_farmers[i].data.sowing_cost.submitted && (not_synced_farmers[i].data.sowing_cost.errorMessage === undefined || not_synced_farmers[i].data.sowing_cost.errorMessage === null)){
						countFarmer++;
						farmer.seedSowingModels = [];
						
						for(var j = 0; j < not_synced_farmers[i].data.sowing_cost.activities.length;j++){
							

							var details = not_synced_farmers[i].data.sowing_cost.activities[j].details;
							var seedSowingModel = {};
							seedSowingModel.sowingId = 0;

							var totalCost = 0.0;							
							for(var k = 0; k < details.length;k++){
								if(typeof(details[k].value) === "string")
									details[k].value = (details[k].value).trim();

								if(details[k].name){
									switch(details[k].name){
										case "Name of Crop":
										    seedSowingModel.nameOfCropId = details[k].value==="Tap"||details[k].value=== undefined?null:details[k].id;
										    if(seedSowingModel.nameOfCropId == otherNameOfCropId)
										    	seedSowingModel.otherNameOfCrop = details[k].value != 'Tap'?details[k].value:null;
											break;
										case "Variety":
											seedSowingModel.varity = details[k].value;
											break;
										case "No. of Packets":
											seedSowingModel.numberOfPackets = details[k].value === ""?0:details[k].value;
											break;
										case "Quantity of seed used(in KG)":
											seedSowingModel.quantityOfSeedUsed = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Date of sowing":
											if(details[k].value != 'Tap')
												seedSowingModel.dateOfSowing = details[k].value;
											else
												seedSowingModel.dateOfSowing = null;
											break;
										case "Source of Seed":
											seedSowingModel.sourceOfSeed = details[k].value==="Tap"||details[k].value=== undefined?null:details[k].id;
											seedSowingModel.sourceOfSeedName = null;
											break;
										case "Type of Seed":
											seedSowingModel.typeOfSeed = details[k].value==="Tap"||details[k].value=== undefined?null:details[k].id;
											seedSowingModel.typeOfSeedName = null;
											break;
										case "Seed treatment details, if any":
											seedSowingModel.seedTreatmentDetails = details[k].value==="Tap"||details[k].value=== undefined?null:details[k].id;
											if(seedSowingModel.seedTreatmentDetails == otherSeedTreatmentId)
												seedSowingModel.otherSeedTreatment =details[k].value != 'Tap'?details[k].value:null;
											break;
										case "Operational/farm area(ha)":
											seedSowingModel.operationalFarmArea = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Seed":
											seedSowingModel.seedCost = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											totalCost += parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Labor":
											seedSowingModel.laborCost = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											totalCost += parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Oil":
											seedSowingModel.oilCost= parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											totalCost += parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Equipment":
											seedSowingModel.equipmentCost = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											totalCost += parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										default:
											break;

									}
								}
							}							
							seedSowingModel.totalCost = parseFloat(totalCost.toFixed(2));
							seedSowingModel.farmerTimePeriodId = not_synced_farmers[i].data.sowing_cost.farmerTimePeriodId;
							seedSowingModel.createdBy = not_synced_farmers[i].data.sowing_cost.created_by;
							seedSowingModel.createdDate = not_synced_farmers[i].data.sowing_cost.created_date;
							seedSowingModel.updatedDate = not_synced_farmers[i].data.sowing_cost.updated_date;
							seedSowingModel.updatedBy = not_synced_farmers[i].data.sowing_cost.updated_by;
							seedSowingModel.processId = seedSowingProcessId;
							seedSowingModel.isLive = not_synced_farmers[i].data.sowing_cost.live;
							farmer.seedSowingModels.push(seedSowingModel);							
						}
						
					}
					//land and irrigation
					if(!not_synced_farmers[i].data.land_and_irrigation.isSynced  && not_synced_farmers[i].data.land_and_irrigation.isSynced != undefined 
							&& not_synced_farmers[i].data.land_and_irrigation.submitted && (not_synced_farmers[i].data.land_and_irrigation.errorMessage === undefined || not_synced_farmers[i].data.land_and_irrigation.errorMessage === null)){
						countFarmer++;
						farmer.landAndIrrigationDetailsModels = [];
						
						for(var j = 0; j < not_synced_farmers[i].data.land_and_irrigation.activities.length;j++){
							

							var details = not_synced_farmers[i].data.land_and_irrigation.activities[j].details;
							var landAndIrrigationModel = {};
							landAndIrrigationModel.landAndIrrigationDetailId = 0;

							for(var k = 0; k < details.length;k++){
								if(typeof(details[k].value) === "string")
									details[k].value = (details[k].value).trim();
								if(details[k].name){
									switch(details[k].name){
										case "Season":
											landAndIrrigationModel.seasonId = details[k].value == "Tap" || typeof(details[k].value) == "undefined" ?null:details[k].id;
											landAndIrrigationModel.seasonIdName = null;
											break;
										case "Land area(Ha)":
											landAndIrrigationModel.landArea = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Irrigated":
											if(details[k].value == " " || details[k].value == false)
												landAndIrrigationModel.irrigated = 0;
											else
												landAndIrrigationModel.irrigated = 1;
											break;	
										case "Main Crop":
											if(details[k].value)
											    landAndIrrigationModel.mainCropId = details[k].id;
											else
												landAndIrrigationModel.mainCropId = null;
										    if(landAndIrrigationModel.mainCropId == otherNameOfCropId)
										    	landAndIrrigationModel.otherMainCrop = details[k].value != 'Tap'?details[k].value:null;
											landAndIrrigationModel.mainCropIdName = null;
											break;
										case "Intercrop":
											if(details[k].value)
											    landAndIrrigationModel.interCropId = details[k].id;
											else
												landAndIrrigationModel.interCropId = null;
										    if(landAndIrrigationModel.interCropId == otherNameOfCropId)
										    	landAndIrrigationModel.otherInterCrop = details[k].value != 'Tap'?details[k].value:null;
											landAndIrrigationModel.interCropIdName = null;
											break;
										case "Source of irrigation":
											if(details[k].value == "Tap" || typeof(details[k].value) == 'undefined')
												landAndIrrigationModel.sourceOfIrrigation = null;
											else
												landAndIrrigationModel.sourceOfIrrigation = details[k].id;
											landAndIrrigationModel.sourceOfIrrigationNames = [];
										case "Type of irrigation":
											if(details[k].value == "Tap" || typeof(details[k].value) == 'undefined')
												landAndIrrigationModel.typeOfIrrigation = null;
											else if(typeof(details[k].value) == 'object' && details[k].value.length == 0)
												landAndIrrigationModel.typeOfIrrigation = null;
											else
												landAndIrrigationModel.typeOfIrrigation = details[k].id;
											landAndIrrigationModel.typeOfIrrigationNames = [];
										default:
											break;

									}
								}
							}
							landAndIrrigationModel.processId = landAndIrrigationDetailProcessId;					
							landAndIrrigationModel.farmerTimePeriodId = not_synced_farmers[i].data.land_and_irrigation.farmerTimePeriodId;
							landAndIrrigationModel.createdBy = not_synced_farmers[i].data.land_and_irrigation.created_by;
							landAndIrrigationModel.createdDate = not_synced_farmers[i].data.land_and_irrigation.created_date;
							landAndIrrigationModel.updatedDate = not_synced_farmers[i].data.land_and_irrigation.updated_date;
							landAndIrrigationModel.updatedBy = not_synced_farmers[i].data.land_and_irrigation.updated_by;
							landAndIrrigationModel.isAlive = not_synced_farmers[i].data.land_and_irrigation.live;
							farmer.landAndIrrigationDetailsModels.push(landAndIrrigationModel);							
						}
						
					}
					//estimation of production and harvest records
					if(!not_synced_farmers[i].data.estimation.isSynced  && not_synced_farmers[i].data.estimation.isSynced != undefined 
							&& not_synced_farmers[i].data.estimation.submitted && (not_synced_farmers[i].data.estimation.errorMessage === undefined || not_synced_farmers[i].data.estimation.errorMessage === null)){
						countFarmer++;
						farmer.estimationOfProductionAndHarvestModels = [];
						
						for(var j = 0; j < not_synced_farmers[i].data.estimation.activities.length;j++){
							

							var details = not_synced_farmers[i].data.estimation.activities[j].details;
							var estimationModel = {};
							estimationModel.estimationAndProductionId = 0;

							for(var k = 0; k < details.length;k++){
								if(typeof(details[k].value) === "string")
									details[k].value = (details[k].value).trim();
								if(details[k].name){
									switch(details[k].name){
										case "Farm area(Ha)":
											estimationModel.farmArea = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Name of Crop":
											if(details[k].value)
											    estimationModel.nameOfCropId = details[k].id;
											else
												estimationModel.nameOfCropId = null;
										    if(estimationModel.nameOfCropId == otherNameOfCropId)
										    	estimationModel.otherNameOfCrop = details[k].value != 'Tap'?details[k].value:null;
											estimationModel.nameOfCropIdName = null;
											break;
										case "Estimated":
											if(details[k].value)
												estimationModel.estimatedMonthOfHarvest = details[k].id;
											else
												estimationModel.estimatedMonthOfHarvest = null;
											estimationModel.estimatedMonthOfHarvestName = null;
											break;
										case "Actual":
											if(details[k].value)
												estimationModel.actualMonthOfHarvest = details[k].id;
											else
												estimationModel.actualMonthOfHarvest = null;
											estimationModel.actualMonthOfHarvestName = null;
											break;
										case "Estimated Production (Kg)":
											if(details[k].value)
												estimationModel.estimatedProduction = details[k].value;
											else
												estimationModel.estimatedProduction = null;
											break;
										case "Actual Production (Kg)":
											if(details[k].value)
												estimationModel.actualProduction = details[k].value;
											else
												estimationModel.actualProduction = null;	
											break;
										default:
											break;

									}
								}
							}	
							estimationModel.processId = estimationOfProductionProcessId;						
							estimationModel.farmerTimePeriodId = not_synced_farmers[i].data.estimation.farmerTimePeriodId;
							estimationModel.createdBy = not_synced_farmers[i].data.estimation.created_by;
							estimationModel.createdDate = not_synced_farmers[i].data.estimation.created_date;
							estimationModel.updatedDate = not_synced_farmers[i].data.estimation.updated_date;
							estimationModel.updatedBy = not_synced_farmers[i].data.estimation.updated_by;
							estimationModel.isAlive = not_synced_farmers[i].data.estimation.live;
							farmer.estimationOfProductionAndHarvestModels.push(estimationModel);							
						}
						
					}

					//sustainable practices
					if(!not_synced_farmers[i].data.sustainable_practices.isSynced  && not_synced_farmers[i].data.sustainable_practices.isSynced != undefined 
							&& not_synced_farmers[i].data.sustainable_practices.submitted && (not_synced_farmers[i].data.sustainable_practices.errorMessage === undefined || not_synced_farmers[i].data.sustainable_practices.errorMessage === null)){
						countFarmer++;
						farmer.sustainablePracticeModels = [];
						
						for(var j = 0; j < not_synced_farmers[i].data.sustainable_practices.activities.length;j++){
							

							var details = not_synced_farmers[i].data.sustainable_practices.activities[j].details;
							var sustainable_practicesModel = {};
							sustainable_practicesModel.sustainablePracticesId = 0;

							for(var k = 0; k < details.length;k++){
								if(typeof(details[k].value) === "string")
									details[k].value = (details[k].value).trim();
								if(details[k].name){
									switch(details[k].name){
										case "Practices":
											sustainable_practicesModel.practicesId = details[k].value === 'Tap' || !(details[k].value) ?null:details[k].id;
											if(sustainable_practicesModel.practicesId == otherPracticesId)
											   	sustainable_practicesModel.otherPractices = details[k].value === 'Tap'?null:details[k].value;
											sustainable_practicesModel.practicesName = null;
											break;
										case "Practice adopted":
											sustainable_practicesModel.practiceAdopted = details[k].value == 0?false:details[k].value;
											break;
										case "Practice adopted in (month)":
											if(!(details[k].value) || details[k].value == "Tap")
												sustainable_practicesModel.practiceAdoptedInMonthId = null;
											else	
												sustainable_practicesModel.practiceAdoptedInMonthId = details[k].value?details[k].id:null;
											sustainable_practicesModel.practiceAdoptedInMonthName = null;
											break;	
										default:
											break;

									}
								}
							}
							sustainable_practicesModel.processId = sustainablePracticesProcessId;						
							sustainable_practicesModel.farmerTimePeriodId = not_synced_farmers[i].data.sustainable_practices.farmerTimePeriodId;
							sustainable_practicesModel.createdBy = not_synced_farmers[i].data.sustainable_practices.created_by;
							sustainable_practicesModel.createdDate = not_synced_farmers[i].data.sustainable_practices.created_date;
							sustainable_practicesModel.updatedDate = not_synced_farmers[i].data.sustainable_practices.updated_date;
							sustainable_practicesModel.updatedBy = not_synced_farmers[i].data.sustainable_practices.updated_by;
							sustainable_practicesModel.isAlive = not_synced_farmers[i].data.sustainable_practices.live;
							farmer.sustainablePracticeModels.push(sustainable_practicesModel);							
						}
						
					}

			 		//check water use synced or not
					if(!not_synced_farmers[i].data.water_use.isSynced  && not_synced_farmers[i].data.water_use.isSynced != undefined 
							&& not_synced_farmers[i].data.water_use.submitted && (not_synced_farmers[i].data.water_use.errorMessage === undefined || not_synced_farmers[i].data.water_use.errorMessage === null)){
						countFarmer++;
						farmer.electricPumpWaterUseModels = [];
						
						for(var j = 0; j < not_synced_farmers[i].data.water_use.activities.length;j++){
							

							var details = not_synced_farmers[i].data.water_use.activities[j].details;
							var electricPumpWaterUseModel = {};
							electricPumpWaterUseModel.electricPumpId =0 ;
							
							for(var k = 0; k < details.length;k++){
								if(details[k].name){
									switch(details[k].name){
										case "Capacity of the water pump installed (In HP)":
											electricPumpWaterUseModel.capacityOfTheWaterPump = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Length of suction pipe (meters)":
											electricPumpWaterUseModel.lengthOfSuctionPipe = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Diameter of suction Pipe (in inches)":
											electricPumpWaterUseModel.diameterOfSuctionPipe = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Length of delivery pipe (meters)":
											electricPumpWaterUseModel.lengthOfDeliveryPipe = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Rupees/ Unit":
											electricPumpWaterUseModel.electricityCostPerUnit = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Rupees/ Year":
											electricPumpWaterUseModel.electricityCostPerYear = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Depth of water at source (In Ft)":
											electricPumpWaterUseModel.depthOfWaterAtSource = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										default:
											break;

									}
								}
							}
							electricPumpWaterUseModel.farmerTimePeriodId = not_synced_farmers[i].data.water_use.farmerTimePeriodId;
							electricPumpWaterUseModel.createdBy = not_synced_farmers[i].data.water_use.created_by;
							electricPumpWaterUseModel.createdDate = not_synced_farmers[i].data.water_use.created_date;
							electricPumpWaterUseModel.updatedDate = not_synced_farmers[i].data.water_use.updated_date;
							electricPumpWaterUseModel.updatedBy = not_synced_farmers[i].data.water_use.updated_by;
							electricPumpWaterUseModel.processId = electricPumpWaterUseProcessId;
							electricPumpWaterUseModel.isLive = not_synced_farmers[i].data.water_use.live;
							farmer.electricPumpWaterUseModels.push(electricPumpWaterUseModel);
						}					
					} 

			 		//check irrigation detail synced or not				
					if(!not_synced_farmers[i].data.irrigation_details.isSynced  && not_synced_farmers[i].data.irrigation_details.isSynced != undefined 
						&& not_synced_farmers[i].data.irrigation_details.submitted && (not_synced_farmers[i].data.irrigation_details.errorMessage === undefined || not_synced_farmers[i].data.irrigation_details.errorMessage === null)){
						countFarmer++;
						farmer.irrigationDetailModels = [];
						
						for(var j = 0; j < not_synced_farmers[i].data.irrigation_details.activities.length;j++){

							var details = not_synced_farmers[i].data.irrigation_details.activities[j].details;
							
							var irrigationDetailModel = {};
							irrigationDetailModel.irrigationNo =0 ;

							for(var k = 0; k < details.length;k++){
                                if(typeof(details[k].value) === "string")
									details[k].value = (details[k].value).trim();

								if(details[k].name){
									switch(details[k].name){
										case "Cotton area irrigated (Ha)":
											irrigationDetailModel.cottonAreaIrrigated= parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;											
										case "Duration of Motor Running (Hours)":
											irrigationDetailModel.durationOfMotorRunning= parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;											
										case "Kerosene or Diesel motor used":
											irrigationDetailModel.keroseneOrDieselMotorUsed= details[k].value;
											break;											
										case "Quantity of oil used (liters)":
											irrigationDetailModel.quantityOfOilUsed= parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;											
										case "Cost of oil (INR)":
											irrigationDetailModel.costOfOil= parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										default:
											break;

									}
								}
							}

							irrigationDetailModel.farmerTimePeriodId = not_synced_farmers[i].data.irrigation_details.farmerTimePeriodId;
							irrigationDetailModel.createdBy = not_synced_farmers[i].data.irrigation_details.created_by;
							irrigationDetailModel.createdDate = not_synced_farmers[i].data.irrigation_details.created_date;
							irrigationDetailModel.updatedDate = not_synced_farmers[i].data.irrigation_details.updated_date;
							irrigationDetailModel.updatedBy = not_synced_farmers[i].data.irrigation_details.updated_by;
							irrigationDetailModel.processId = irrigationDetailProcessId;
							irrigationDetailModel.live = not_synced_farmers[i].data.irrigation_details.live;
							farmer.irrigationDetailModels.push(irrigationDetailModel);					
						}
					}

				 	//check fertilizer details synced or not
					if(!not_synced_farmers[i].data.manure_application.isSynced  && not_synced_farmers[i].data.manure_application.isSynced != undefined 
							&& not_synced_farmers[i].data.manure_application.submitted && (not_synced_farmers[i].data.manure_application.errorMessage === undefined || not_synced_farmers[i].data.manure_application.errorMessage === null)){
						countFarmer++;
						farmer.manureApplicationDetailModels = [];
						
						for(var j = 0; j < not_synced_farmers[i].data.manure_application.activities.length;j++){
							
							var details = not_synced_farmers[i].data.manure_application.activities[j].details;
							var manureApplicationDetailModel = {};
							manureApplicationDetailModel.manureApplicationDetailId =0 ;
														
							for(var k = 0; k < details.length;k++){
								if(typeof(details[k].value) === "string")
									details[k].value = (details[k].value).trim();
								if(details[k].name){
									switch(details[k].name){
										case "Manure":
										    manureApplicationDetailModel.manureId = details[k].id;
										    if(manureApplicationDetailModel.manureId == otherManureNameId)
										    	manureApplicationDetailModel.otherManureName = details[k].value;
											break;
										case "Source":
											manureApplicationDetailModel.sourceId = details[k].id;
											manureApplicationDetailModel.sourceName = null;
											break;
										case "Field /Area covered(ha)":
											manureApplicationDetailModel.fieldAreaCovered= parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Quantity (Kg)":
											manureApplicationDetailModel.quantity= parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Material Cost(In Rs.)":
											manureApplicationDetailModel.materialCost= parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Labor Cost(In Rs.)":
											manureApplicationDetailModel.laborCost= parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										default:
											break;
				
									}
								}
							}
							manureApplicationDetailModel.farmerTimePeriodId = not_synced_farmers[i].data.manure_application.farmerTimePeriodId;
							manureApplicationDetailModel.createdBy = not_synced_farmers[i].data.manure_application.created_by;
							manureApplicationDetailModel.createdDate = not_synced_farmers[i].data.manure_application.created_date;
							manureApplicationDetailModel.updatedDate = not_synced_farmers[i].data.manure_application.updated_date;
							manureApplicationDetailModel.updatedBy = not_synced_farmers[i].data.manure_application.updated_by;
							manureApplicationDetailModel.processId = manureApplicationDetailProcessId;
							manureApplicationDetailModel.live = not_synced_farmers[i].data.manure_application.live;
							farmer.manureApplicationDetailModels.push(manureApplicationDetailModel);
							
							}
						}
                    //check weeding detail synced or not				
					if(!not_synced_farmers[i].data.weeding_details.isSynced  && not_synced_farmers[i].data.weeding_details.isSynced != undefined && not_synced_farmers[i].data.weeding_details.submitted && (not_synced_farmers[i].data.weeding_details.errorMessage === undefined || not_synced_farmers[i].data.weeding_details.errorMessage === null)){
						countFarmer++;
						farmer.weedingDetailModels = [];
						for(var j = 0; j < not_synced_farmers[i].data.weeding_details.activities.length;j++){

							var details = not_synced_farmers[i].data.weeding_details.activities[j].details;
							
							var weedingDetailModel = {};
							weedingDetailModel.weedingDetailId =0 ;
							weedingDetailModel.processId = weedingDetailProcessId ;
                            weedingDetailModel.weedingMethodDetails = [];
							for(var k = 0; k < details.length;k++){
								if(typeof(details[k].value) === "string")
									details[k].value = (details[k].value).trim();

								if(details[k].name){
									var weedingName="Weeding Details No."+(k-1);

									switch(details[k].name){
										case "Crop Name":
											weedingDetailModel.cropName = details[k].value == 'Tap' || typeof(details[k].value) == "undefined"?null : details[k].id;
										    if(weedingDetailModel.cropName == otherNameOfCropId)
										    	weedingDetailModel.otherCropName = details[k].value == 'Tap' || typeof(details[k].value) == "undefined"?null:details[k].value;
                    						weedingDetailModel.cropIdName = null;
                    						break;											
										case "Farm Area(ha)":
											weedingDetailModel.farmArea= parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case weedingName:
												var weedingChildDetailModel={};
												var childDetailsArray=details[k].child_details;
												var totalCost=0.0;
												for(var c = 0; c < childDetailsArray.length;c++){
													if(childDetailsArray[c].name){
														switch(childDetailsArray[c].name){
															case "Date of Weeding":
																weedingChildDetailModel.dateOfWeeding= childDetailsArray[c].value==="Tap"?null:childDetailsArray[c].value;
																break;
															case "Male labor":
																weedingChildDetailModel.numberOfMale = childDetailsArray[c].value===""?0:childDetailsArray[c].value;
															case "Female labor":
																weedingChildDetailModel.numberOfFemale= childDetailsArray[c].value===""?0:childDetailsArray[c].value;
																break;
															case "Out of School Children":
																weedingChildDetailModel.outOfSchoolChildren= childDetailsArray[c].value===""?0:childDetailsArray[c].value;
																break;
															case "Mechanical":
																weedingChildDetailModel.mechanical= childDetailsArray[c].value===true?1:0;
																break;																
															case "Labor":
																weedingChildDetailModel.laborCost= parseFloat((childDetailsArray[c].value).trim() === ""?0.0:childDetailsArray[c].value);
											                    totalCost += parseFloat((childDetailsArray[c].value).trim() === ""?0.0:childDetailsArray[c].value);
																break;
															case "Equipment":
																weedingChildDetailModel.equipmentCost= parseFloat((childDetailsArray[c].value).trim() === ""?0.0:childDetailsArray[c].value);
											                    totalCost += parseFloat((childDetailsArray[c].value).trim() === ""?0.0:childDetailsArray[c].value);
																break;
															case "Oil":
																weedingChildDetailModel.oilCost= parseFloat((childDetailsArray[c].value).trim() === ""?0.0:childDetailsArray[c].value);
											                    totalCost += parseFloat((childDetailsArray[c].value).trim() === ""?0.0:childDetailsArray[c].value);
																break;
															default:
																break;
														}
													}
												}
												weedingChildDetailModel.processId=weedingDetailProcessId;
												weedingChildDetailModel.totalCost=totalCost;
												weedingChildDetailModel.weedingMethodDetailId=0;
												weedingChildDetailModel.farmerTimePeriodId = not_synced_farmers[i].data.weeding_details.farmerTimePeriodId;
												weedingChildDetailModel.createdBy = not_synced_farmers[i].data.weeding_details.created_by;
												weedingChildDetailModel.createdDate = not_synced_farmers[i].data.weeding_details.created_date;
												weedingChildDetailModel.updatedDate = not_synced_farmers[i].data.weeding_details.updated_date;
												weedingChildDetailModel.updatedBy = not_synced_farmers[i].data.weeding_details.updated_by;
												weedingChildDetailModel.isAlive = not_synced_farmers[i].data.weeding_details.live;
												weedingDetailModel.weedingMethodDetails.push(weedingChildDetailModel)
											break;

										default:
											break;
									}
								}
							}
							weedingDetailModel.farmerTimePeriodId = not_synced_farmers[i].data.weeding_details.farmerTimePeriodId;
							weedingDetailModel.createdBy = not_synced_farmers[i].data.weeding_details.created_by;
							weedingDetailModel.createdDate = not_synced_farmers[i].data.weeding_details.created_date;
							weedingDetailModel.updatedDate = not_synced_farmers[i].data.weeding_details.updated_date;
							weedingDetailModel.updatedBy = not_synced_farmers[i].data.weeding_details.updated_by;
							weedingDetailModel.isAlive = not_synced_farmers[i].data.weeding_details.live;
							farmer.weedingDetailModels.push(weedingDetailModel);					
						}
						
					}

					//check cotton picking harvesting synced or not
					if(!not_synced_farmers[i].data.cotton_picking_harvesting.isSynced  && not_synced_farmers[i].data.cotton_picking_harvesting.isSynced != undefined && 
						not_synced_farmers[i].data.cotton_picking_harvesting.submitted && (not_synced_farmers[i].data.cotton_picking_harvesting.errorMessage === undefined || not_synced_farmers[i].data.cotton_picking_harvesting.errorMessage === null)){
						countFarmer++;
						farmer.cottonPickingStorageModel = {};
						farmer.cottonPickingStorageModel.cottonPickingStorageId = 0;
						for(var j = 0; j < not_synced_farmers[i].data.cotton_picking_harvesting.pre_table_data.length;j++){
							if(not_synced_farmers[i].data.cotton_picking_harvesting.pre_table_data[j].key === "storageFacility")
								farmer.cottonPickingStorageModel.storageFacility = not_synced_farmers[i].data.cotton_picking_harvesting.pre_table_data[j].value === ""?0:not_synced_farmers[i].data.cotton_picking_harvesting.pre_table_data[j].value;
							

							if(not_synced_farmers[i].data.cotton_picking_harvesting.pre_table_data[j].key === "typeOfStorage")
								farmer.cottonPickingStorageModel.typeOfStorage = not_synced_farmers[i].data.cotton_picking_harvesting.pre_table_data[j].value?not_synced_farmers[i].data.cotton_picking_harvesting.pre_table_data[j].id:null;						

						}		
						farmer.cottonPickingStorageModel.processId = cottonPickingHarvestingRecordProcessId;				
						farmer.cottonPickingStorageModel.farmerTimePeriodId = not_synced_farmers[i].data.cotton_picking_harvesting.farmerTimePeriodId;
						farmer.cottonPickingStorageModel.createdBy = not_synced_farmers[i].data.cotton_picking_harvesting.created_by;
						farmer.cottonPickingStorageModel.createdDate = not_synced_farmers[i].data.cotton_picking_harvesting.created_date;
						farmer.cottonPickingStorageModel.updatedDate = not_synced_farmers[i].data.cotton_picking_harvesting.updated_date;
						farmer.cottonPickingStorageModel.updatedBy = not_synced_farmers[i].data.cotton_picking_harvesting.updated_by;
						farmer.cottonPickingStorageModel.cottonPickingHarvestingModels = [];


						for(var j = 0; j < not_synced_farmers[i].data.cotton_picking_harvesting.activities.length;j++){

							var details = not_synced_farmers[i].data.cotton_picking_harvesting.activities[j].details;
							var farmDetails = {}
							farmDetails.cottonPickingId = 0;

							for(var k = 0; k < details.length;k++){
								if(details[k].name){
									switch(details[k].name){
										case "Month of Picking":
											farmDetails.monthOfPicking = details[k].value?details[k].id:null;
											farmDetails.monthOfPickingName = null;
										break;
										case "Hired Labor":
											farmDetails.harvestedByHiredLabor = details[k].value===""?0:details[k].value;
										break;
										case "Self":
											farmDetails.harvestedBySelf = details[k].value===""?0:details[k].value;
										break;
										case "Total quantity picked(in KG)":
											farmDetails.totalQuantityPicked = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
										break;
										case "Total labor cost":
											farmDetails.totalLaborCost = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
										break;
										default:
										break;

									}
								}
							}							
							farmDetails.processId = cottonPickingHarvestingRecordProcessId;
							farmDetails.farmerTimePeriodId = not_synced_farmers[i].data.cotton_picking_harvesting.farmerTimePeriodId;
							farmDetails.createdBy = not_synced_farmers[i].data.cotton_picking_harvesting.created_by;
							farmDetails.createdDate = not_synced_farmers[i].data.cotton_picking_harvesting.created_date;
							farmDetails.updatedDate = not_synced_farmers[i].data.cotton_picking_harvesting.updated_date;
							farmDetails.updatedBy = not_synced_farmers[i].data.cotton_picking_harvesting.updated_by;
							farmDetails.isAlive = not_synced_farmers[i].data.cotton_picking_harvesting.live;
							farmer.cottonPickingStorageModel.cottonPickingHarvestingModels.push(farmDetails);
						}
						farmer.cottonPickingStorageModel.isAlive = not_synced_farmers[i].data.cotton_picking_harvesting.live;
					}
					//check selling and other source of iccome synced or not
					if(!not_synced_farmers[i].data.selling_othersource.isSynced  && not_synced_farmers[i].data.selling_othersource.isSynced != undefined && 
						not_synced_farmers[i].data.selling_othersource.submitted && (not_synced_farmers[i].data.selling_othersource.errorMessage === undefined || not_synced_farmers[i].data.selling_othersource.errorMessage === null)){
						countFarmer++;
						farmer.sellingAndOtherSourceOfIncomeModel = {};
						farmer.sellingAndOtherSourceOfIncomeModel.sellingAndOtherSourceId = 0;
						for(var j = 0; j < not_synced_farmers[i].data.selling_othersource.details.length;j++){
							if(not_synced_farmers[i].data.selling_othersource.details[j].name === "Do you grow crop other than cotton in organic/in-conversion farm?")
								farmer.sellingAndOtherSourceOfIncomeModel.growCropsOtherThanCotton = typeof(not_synced_farmers[i].data.selling_othersource.details[j].value) == 'undefined'?false:not_synced_farmers[i].data.selling_othersource.details[j].value;

							if(not_synced_farmers[i].data.selling_othersource.details[j].name === "Do you have any other source of income from growing other crop?")
								farmer.sellingAndOtherSourceOfIncomeModel.anyOtherSourceOfIncome = typeof(not_synced_farmers[i].data.selling_othersource.details[j].value) == 'undefined'?false:not_synced_farmers[i].data.selling_othersource.details[j].value;

							if(not_synced_farmers[i].data.selling_othersource.details[j].name === "Source of income other than crops"){
								farmer.sellingAndOtherSourceOfIncomeModel.sourceOfIncome = typeof(not_synced_farmers[i].data.selling_othersource.details[j].id) == 'undefined'?null:not_synced_farmers[i].data.selling_othersource.details[j].id;
								farmer.sellingAndOtherSourceOfIncomeModel.otherSourceOfIncome = typeof(not_synced_farmers[i].data.selling_othersource.details[j].otherVal) == 'undefined'?null:not_synced_farmers[i].data.selling_othersource.details[j].otherVal;
								farmer.sellingAndOtherSourceOfIncomeModel.sourceOfIncomeNames = [];
							}
							if(not_synced_farmers[i].data.selling_othersource.details[j].name === "Total annual income from other source of income")
								farmer.sellingAndOtherSourceOfIncomeModel.netIncomeFromOtherSource = isNaN(parseFloat(not_synced_farmers[i].data.selling_othersource.details[j].value))?0.0:not_synced_farmers[i].data.selling_othersource.details[j].value;
						}
						farmer.sellingAndOtherSourceOfIncomeModel.processId = sellingAndOtherSourceOfIncomeProcessId;					
						farmer.sellingAndOtherSourceOfIncomeModel.farmerTimePeriodId = not_synced_farmers[i].data.selling_othersource.farmerTimePeriodId;
						farmer.sellingAndOtherSourceOfIncomeModel.createdBy = not_synced_farmers[i].data.selling_othersource.created_by;
						farmer.sellingAndOtherSourceOfIncomeModel.createdDate = not_synced_farmers[i].data.selling_othersource.created_date;
						farmer.sellingAndOtherSourceOfIncomeModel.updatedDate = not_synced_farmers[i].data.selling_othersource.updated_date;
						farmer.sellingAndOtherSourceOfIncomeModel.updatedBy = not_synced_farmers[i].data.selling_othersource.updated_by;
						farmer.sellingAndOtherSourceOfIncomeModel.isAlive = not_synced_farmers[i].data.selling_othersource.live;
						farmer.sellingAndOtherSourceOfIncomeModel.sellingAndOtherSourceOfIncomeDetailsModels = [];

						for(var j = 0; j < not_synced_farmers[i].data.selling_othersource.activities.length;j++){

							var details = not_synced_farmers[i].data.selling_othersource.activities[j].details;
							var farmDetails = {}
							farmDetails.sellingAndOtherSourceDetailId = 0;

							for(var k = 0; k < details.length;k++){
								if(details[k].name){
									switch(details[k].name){
										case "Month of selling and quantity of crop produce(in quintal)":
											farmDetails.monthOfSellingId = details[k].value?details[k].id:null;
											farmDetails.monthOfSellingName = null;
										break;
										case "Name of Crop/Harvest sold":
											farmDetails.nameOfCropId = details[k].value?details[k].id:null;
											if(farmDetails.nameOfCropId == otherNameOfCropId)
												farmDetails.otherNameOfCrop = details[k].value?details[k].value:null;
											farmDetails.nameOfCrop = null;
										break;
										case "Sold to":
											farmDetails.soldToId = details[k].value?details[k].id:null;
											farmDetails.soldToName = null;
										break;
										case "Quantity(in quintal)":
											farmDetails.quantitySold = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);;
										break;
										case "Rate(rupees/quintal)":
											farmDetails.costPerQuintal = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);;
										break;
										case "Transport Charges":
											farmDetails.transportCharges = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);;
										break;
										case "Other Charges(labor etc.)":
											farmDetails.otherCharges = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);;
										break;
										default:
										break;

									}
								}
							}							
							
							farmDetails.farmerTimePeriodId = not_synced_farmers[i].data.selling_othersource.farmerTimePeriodId;
							farmDetails.createdBy = not_synced_farmers[i].data.selling_othersource.created_by;
							farmDetails.createdDate = not_synced_farmers[i].data.selling_othersource.created_date;
							farmDetails.updatedDate = not_synced_farmers[i].data.selling_othersource.updated_date;
							farmDetails.updatedBy = not_synced_farmers[i].data.selling_othersource.updated_by;
							farmDetails.isAlive = not_synced_farmers[i].data.selling_othersource.live;
							farmer.sellingAndOtherSourceOfIncomeModel.sellingAndOtherSourceOfIncomeDetailsModels.push(farmDetails);
						}
					}

					farmer.meetingTrainingAttendedModels=null;
					//check  Training synced or not
					if(!not_synced_farmers[i].data.trainings_attended_by.isSynced  && not_synced_farmers[i].data.trainings_attended_by.isSynced != undefined 
							&& not_synced_farmers[i].data.trainings_attended_by.submitted && (not_synced_farmers[i].data.trainings_attended_by.errorMessage === undefined || not_synced_farmers[i].data.trainings_attended_by.errorMessage === null)){
						countFarmer++;

					    if (farmer.meetingTrainingAttendedModels==null) {
						    farmer.meetingTrainingAttendedModels=[];
						}

						var meetingTrainingAttended = [];
						
						for(var j = 0; j < not_synced_farmers[i].data.trainings_attended_by.activities.length;j++){
							

							var details = not_synced_farmers[i].data.trainings_attended_by.activities[j].details;
							var meetingTrainingAttendedModel = {};
							meetingTrainingAttendedModel.meetingTrainingId = 0;

							for(var k = 0; k < details.length;k++){
								if(typeof(details[k].value) === "string")
									details[k].value = (details[k].value).trim();

								if(details[k].name){
									switch(details[k].name){
										case "Attended by farmer":
										    meetingTrainingAttendedModel.attendedByFarmer = details[k].value=== ""?0:details[k].value;
										   	break;
										case "Date of training":
											meetingTrainingAttendedModel.date = details[k].value==="Tap"?null:details[k].value;
											break;
										case "Subject of training":
											meetingTrainingAttendedModel.subject = details[k].value==="Tap"||details[k].value=== undefined?null:details[k].id;
											meetingTrainingAttendedModel.subjectName = null;
											break;
										default:
											break;
									}
								}
							}			
							meetingTrainingAttendedModel.processId = trainingMeetingFarmerProcessId;
							meetingTrainingAttendedModel.farmerTimePeriodId = not_synced_farmers[i].data.trainings_attended_by.farmerTimePeriodId;
							meetingTrainingAttendedModel.createdBy = not_synced_farmers[i].data.trainings_attended_by.created_by;
							meetingTrainingAttendedModel.createdDate = not_synced_farmers[i].data.trainings_attended_by.created_date;
							meetingTrainingAttendedModel.updatedDate = not_synced_farmers[i].data.trainings_attended_by.updated_date;
							meetingTrainingAttendedModel.updatedBy = not_synced_farmers[i].data.trainings_attended_by.updated_by;
							meetingTrainingAttendedModel.meetingOrTraining = trainingTypeId;
							meetingTrainingAttendedModel.icsStaffDate = $filter('date')(new Date(), 'dd-MM-yyyy');
							meetingTrainingAttendedModel.isAlive = not_synced_farmers[i].data.trainings_attended_by.live;
							farmer.meetingTrainingAttendedModels.push(meetingTrainingAttendedModel);							
						}
					}
					//check  Meeting synced or not
					if(!not_synced_farmers[i].data.meeting_attended_by.isSynced  && not_synced_farmers[i].data.meeting_attended_by.isSynced != undefined 
							&& not_synced_farmers[i].data.meeting_attended_by.submitted && (not_synced_farmers[i].data.meeting_attended_by.errorMessage === undefined || not_synced_farmers[i].data.meeting_attended_by.errorMessage === null)){
						countFarmer++;
						if (farmer.meetingTrainingAttendedModels==null) {
						    farmer.meetingTrainingAttendedModels=[];
						}
						
						for(var j = 0; j < not_synced_farmers[i].data.meeting_attended_by.activities.length;j++){
							var details = not_synced_farmers[i].data.meeting_attended_by.activities[j].details;
							var meetingTrainingAttendedModel = {};
							meetingTrainingAttendedModel.meetingTrainingId = 0;

							for(var k = 0; k < details.length;k++){
								if(typeof(details[k].value) === "string")
									details[k].value = (details[k].value).trim();

								if(details[k].name){
									switch(details[k].name){
										case "Attended by farmer":
										    meetingTrainingAttendedModel.attendedByFarmer = details[k].value=== ""?0:details[k].value;
										   	break;
										case "Date of meeting":
											meetingTrainingAttendedModel.date = details[k].value==="Tap"?null:details[k].value;
											break;
										case "Subject of meeting":
											meetingTrainingAttendedModel.subject = details[k].value==="Tap"||details[k].value=== undefined?null:details[k].id;
											meetingTrainingAttendedModel.subjectName = null;
											break;
										default:
											break;
									}
								}
							}
							meetingTrainingAttendedModel.processId = trainingMeetingFarmerProcessId;
							meetingTrainingAttendedModel.farmerTimePeriodId = not_synced_farmers[i].data.meeting_attended_by.farmerTimePeriodId;
							meetingTrainingAttendedModel.createdBy = not_synced_farmers[i].data.meeting_attended_by.created_by;
							meetingTrainingAttendedModel.createdDate = not_synced_farmers[i].data.meeting_attended_by.created_date;
							meetingTrainingAttendedModel.updatedDate = not_synced_farmers[i].data.meeting_attended_by.updated_date;
							meetingTrainingAttendedModel.updatedBy = not_synced_farmers[i].data.meeting_attended_by.updated_by;
							meetingTrainingAttendedModel.meetingOrTraining = meetingTypeId;
							meetingTrainingAttendedModel.icsStaffDate = $filter('date')(new Date(), 'dd-MM-yyyy');
							meetingTrainingAttendedModel.isAlive = not_synced_farmers[i].data.meeting_attended_by.live;
							farmer.meetingTrainingAttendedModels.push(meetingTrainingAttendedModel);							
						}
						
					}
					//check  Pesticide application details synced or not
					if(!not_synced_farmers[i].data.pesticide_application_details.isSynced  && not_synced_farmers[i].data.pesticide_application_details.isSynced != undefined 
							&& not_synced_farmers[i].data.pesticide_application_details.submitted && (not_synced_farmers[i].data.pesticide_application_details.errorMessage === undefined || not_synced_farmers[i].data.pesticide_application_details.errorMessage === null)){
						countFarmer++;
						farmer.bioPesticideDetailsModels = [];
						
						for(var j = 0; j < not_synced_farmers[i].data.pesticide_application_details.activities.length;j++){

							var details = not_synced_farmers[i].data.pesticide_application_details.activities[j].details;
							var bioPesticideDetailsModel = {};
							bioPesticideDetailsModel.bioPesticideDetailId = 0;

							for(var k = 0; k < details.length;k++){
								if(typeof(details[k].value) === "string")
									details[k].value = (details[k].value).trim();

								if(details[k].name){
									switch(details[k].name){
										case "Pesticides":
										    bioPesticideDetailsModel.bioPesticideId = details[k].value === 'Tap' || !(details[k].value) ?null:details[k].id;
										    if(bioPesticideDetailsModel.bioPesticideId == otherPesticidesNameId)
										    	bioPesticideDetailsModel.otherBioPesticide = details[k].value === 'Tap'?null:details[k].value;
										   	bioPesticideDetailsModel.bioPesticideName = null;
										   	break;
										case "Source":
                                            bioPesticideDetailsModel.sourceId = details[k].value === 'Tap'?null:details[k].value;
											bioPesticideDetailsModel.sourceName = null;
											break;
										case "Target pest":
										    bioPesticideDetailsModel.targetPestId = details[k].value === 'Tap'?null:details[k].id;
										    bioPesticideDetailsModel.otherTargetPest = details[k].otherVal?details[k].otherVal:null;
											bioPesticideDetailsModel.targetPestName = [];
											break;
										case "Area(ha)":
											bioPesticideDetailsModel.area = details[k].value=== ""?0.00:details[k].value;
											break;
										case "No of pumps/ha":
											bioPesticideDetailsModel.numberOfPumpsPerHectre = details[k].value=== ""?0:details[k].value;
											break;
										case "ml/pump":
											bioPesticideDetailsModel.mlPerPump = details[k].value=== ""?0:details[k].value;
											break;
										case "Bio-Pesticides":
											bioPesticideDetailsModel.bioPesticideCost = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										case "Labor":
											bioPesticideDetailsModel.laborCost = parseFloat((details[k].value).trim() === ""?0.0:details[k].value);
											break;
										default:
											break;
									}
								}
							}							
							bioPesticideDetailsModel.processId = bioPesticideDetailsProcessId;
							bioPesticideDetailsModel.farmerTimePeriodId = not_synced_farmers[i].data.pesticide_application_details.farmerTimePeriodId;
							bioPesticideDetailsModel.createdBy = not_synced_farmers[i].data.pesticide_application_details.created_by;
							bioPesticideDetailsModel.createdDate = not_synced_farmers[i].data.pesticide_application_details.created_date;
							bioPesticideDetailsModel.updatedDate = not_synced_farmers[i].data.pesticide_application_details.updated_date;
							bioPesticideDetailsModel.updatedBy = not_synced_farmers[i].data.pesticide_application_details.updated_by;
							bioPesticideDetailsModel.isAlive = not_synced_farmers[i].data.pesticide_application_details.live;
							farmer.bioPesticideDetailsModels.push(bioPesticideDetailsModel);							
						}
					}
					//check best practice/decent work sync or not
					if(!not_synced_farmers[i].data.bestpractices_decentwork.isSynced  && not_synced_farmers[i].data.bestpractices_decentwork.isSynced != undefined 
							&& not_synced_farmers[i].data.bestpractices_decentwork.submitted && (not_synced_farmers[i].data.bestpractices_decentwork.errorMessage === undefined || not_synced_farmers[i].data.bestpractices_decentwork.errorMessage === null)){
						countFarmer++;
						farmer.bestPracticesModel = {};
						
						for(var j = 0; j < not_synced_farmers[i].data.bestpractices_decentwork.details.length;j++){
							var details = not_synced_farmers[i].data.bestpractices_decentwork.details;
							var bestPracticesModels = {};
							bestPracticesModels.bestPracticesId = 0;

							for(var k = 0; k < details.length;k++){
								if(typeof(details[k].value) === "string")
									details[k].value = (details[k].value).trim();

								if(details[k].name){
									switch(details[k].name){
										case "Do you use any protection clothing while spraying organic pesticide in Registered Farm?":
										    if(details[k].value == false || details[k].value == "")
										    	bestPracticesModels.protectionClothing = 0;
										    else
										    	bestPracticesModels.protectionClothing = 1;
										   	break;
										case "What kind of protection clothing do you use in Registered Farm?":
											if(details[k].value == "" || typeof(details[k].value) == 'undefined')
												bestPracticesModels.kindOfProtectionClothingId = null;
											else
												bestPracticesModels.kindOfProtectionClothingId = details[k].id;
											
												bestPracticesModels.otherKindOfProtectionClothing = details[k].otherVal?details[k].otherVal:null;
											bestPracticesModels.kindOfProtectionClothingNames = [];
											break;
										case "Do you store organic seeds, pesticides and manure for Registered Farm?":
											if(details[k].value == false || details[k].value == "")
										    	bestPracticesModels.storeOrganicSeeds = 0;
										    else
										    	bestPracticesModels.storeOrganicSeeds = 1;
										   	break;
										case "Where do you store organic seeds, pesticides and manure for Registered Farm?":
											if(details[k].value == "" || typeof(details[k].value) == 'undefined')
												bestPracticesModels.whereStoreOrganicSeeds = null;
											else
												bestPracticesModels.whereStoreOrganicSeeds = details[k].id;
											bestPracticesModels.otherWhereStoreOrganicSeeds = details[k].otherVal?details[k].otherVal:null;
											bestPracticesModels.whereStoreOrganicSeedNames = [];
											break;
										case "How do you deal with organic seeds, pesticides and manure packs after use in Registered Farm?":
											if(details[k].value == "" || typeof(details[k].value) == 'undefined')
												bestPracticesModels.dealWithOrganicSeeds = null;
											else
												bestPracticesModels.dealWithOrganicSeeds = details[k].id;
											bestPracticesModels.otherDealWithOrganicSeeds = details[k].otherVal?details[k].otherVal:null;
											bestPracticesModels.dealWithOrganicSeedNames = [];
											break;
										default:
											break;   	
									}
								}	
							}
							bestPracticesModels.processId = bestPracticesProcessId;
							bestPracticesModels.farmerTimePeriodId = not_synced_farmers[i].data.bestpractices_decentwork.farmerTimePeriodId;
							bestPracticesModels.createdBy = not_synced_farmers[i].data.bestpractices_decentwork.created_by;
							bestPracticesModels.createdDate = not_synced_farmers[i].data.bestpractices_decentwork.created_date;
							bestPracticesModels.updatedDate = not_synced_farmers[i].data.bestpractices_decentwork.updated_date;
							bestPracticesModels.updatedBy = not_synced_farmers[i].data.bestpractices_decentwork.updated_by;
							bestPracticesModels.isAlive = not_synced_farmers[i].data.bestpractices_decentwork.live;
							farmer.bestPracticesModel = bestPracticesModels;
						}
					}	
					//check labors record sync or not				
					if(!not_synced_farmers[i].data.labors_record.isSynced  && not_synced_farmers[i].data.labors_record.isSynced != undefined && not_synced_farmers[i].data.labors_record.submitted && (not_synced_farmers[i].data.labors_record.errorMessage === undefined || not_synced_farmers[i].data.labors_record.errorMessage === null)){
						countFarmer++;
						farmer.laborsRecordModels = [];
						
						for(var j = 0; j < not_synced_farmers[i].data.labors_record.activities.length;j++){
							var activity = not_synced_farmers[i].data.labors_record.activities[j].details;
							var farmActivityId=not_synced_farmers[i].data.labors_record.activities[j].id;
							var childDetails1=activity.child_details;
							for(var k = 0; k < activity.length;k++){
							    var childDetails = activity[k].child_details;
							    
							    var laborsChildDetailModel = {};

								   for(var s = 0; s < childDetails.length;s++){
									 	switch(childDetails[s].key){
											case "practices":
												laborsChildDetailModel.practicesId= childDetails[s].value === "Tap" || childDetails[s].value === undefined?null:childDetails[s].value;
												laborsChildDetailModel.practiceName = null;
												break;
											case "farmArea":
												laborsChildDetailModel.operationalArea = childDetails[s].value===""?0.00:childDetails[s].value;
											case "maleNo":
												laborsChildDetailModel.manPowerMaleNumber= childDetails[s].value===""?0:childDetails[s].value;
												break;					
											case "maleDays":
												laborsChildDetailModel.manPowerMaleNumberOfDays= childDetails[s].value===""?0:childDetails[s].value;
												break;
											case "maleLabor":
												laborsChildDetailModel.manPowerMaleRatePerDay= childDetails[s].value===""?0:childDetails[s].value;
												break;
											case "femaleNo":
												laborsChildDetailModel.manPowerFemaleNumber= childDetails[s].value===""?0:childDetails[s].value;
												break;												
											case "femaleDays":
												laborsChildDetailModel.manPowerFemaleNumberOfDays= childDetails[s].value===""?0:childDetails[s].value;
												break;																
											case "femaleLabor":
												laborsChildDetailModel.manPowerFemaleRatePerDay= childDetails[s].value === ""?0:childDetails[s].value;
												break;
											case "childrenNo":
												laborsChildDetailModel.manPowerChildrenNumber= childDetails[s].value === ""?0:childDetails[s].value;
												break;
											case "childrenDays":
												laborsChildDetailModel.manPowerChildrenNumberOfDays= childDetails[s].value === ""?0:childDetails[s].value;
												break;
											default:
												break;   	
										}
								    }
								laborsChildDetailModel.processId = laborRecordsProcessId;
								laborsChildDetailModel.farmActivityId=farmActivityId;
								laborsChildDetailModel.farmActivityName=null;
								laborsChildDetailModel.laborRecordDetailId=0;
								laborsChildDetailModel.farmerTimePeriodId = not_synced_farmers[i].data.labors_record.farmerTimePeriodId;
								laborsChildDetailModel.createdBy = not_synced_farmers[i].data.labors_record.created_by;
								laborsChildDetailModel.createdDate = not_synced_farmers[i].data.labors_record.created_date;
								laborsChildDetailModel.updatedDate = not_synced_farmers[i].data.labors_record.updated_date;
								laborsChildDetailModel.updatedBy = not_synced_farmers[i].data.labors_record.updated_by;
								laborsChildDetailModel.isAlive = not_synced_farmers[i].data.labors_record.live;
								farmer.laborsRecordModels.push(laborsChildDetailModel)
							}
						}
					}
					//check farmer house hold work sync or not
					if(!not_synced_farmers[i].data.farmer_household_details.isSynced  && not_synced_farmers[i].data.farmer_household_details.isSynced != undefined 
							&& not_synced_farmers[i].data.farmer_household_details.submitted && (not_synced_farmers[i].data.farmer_household_details.errorMessage === undefined || not_synced_farmers[i].data.farmer_household_details.errorMessage === null)){
						countFarmer++;
						farmer.otherInformationFarmerHouseholdDetailModel = [];
						var farmerHouseholdModels = {};
						
						for(var k = 0; k < not_synced_farmers[i].data.farmer_household_details.details.length;k++){
							farmerHouseholdModels.farmerHouseholdDetailId = 0;
							var details = not_synced_farmers[i].data.farmer_household_details.details;

									switch(details[k].key){
										case "adultMalePresowing":
										    	farmerHouseholdModels.numberOfAdultMalePreSowing = details[k].value=== ""?0:details[k].value;
										   	break;
										case "adultMalePostharvest":
												farmerHouseholdModels.numberOfAdultMalePostHarvest = details[k].value=== ""?0:details[k].value;
											break;
										case "adultFemalePresowing":
										    	farmerHouseholdModels.numberOfAdultFemalePreSowing = details[k].value=== ""?0:details[k].value;
										   	break;
										case "adultFemalePostharvest":
												farmerHouseholdModels.numberOfAdultFemalePostHarvest = details[k].value=== ""?0:details[k].value;
											break;
										case "childrenMalePresowing":
												farmerHouseholdModels.numberOfChildrenMalePreSowing = details[k].value=== ""?0:details[k].value;
											break;
										case "childrenMalePostharvest":
												farmerHouseholdModels.numberOfChildrenMalePostHarvest = details[k].value=== ""?0:details[k].value;
											break;
										case "childrenFemalePresowing":
												farmerHouseholdModels.numberOfChildrenFemalePreSowing = details[k].value=== ""?0:details[k].value;
											break;
										case "childrenFemalePostharvest":
												farmerHouseholdModels.numberOfChildrenFemalePostHarvest = details[k].value=== ""?0:details[k].value;
											break;
										case "schoolGoingMalePresowing":
												farmerHouseholdModels.numberOfSchoolGoingChildrenMalePreSowing = details[k].value=== ""?0:details[k].value;
											break;
										case "schoolGoingMalePostharvest":
												farmerHouseholdModels.numberOfSchoolGoingChildrenMalePostHarvest = details[k].value=== ""?0:details[k].value;
											break;
										case "schoolGoingFemalePresowing":
												farmerHouseholdModels.numberOfSchoolGoingChildrenFemalePreSowing = details[k].value=== ""?0:details[k].value;
											break;
										case "schoolGoingFemalePostharvest":
												farmerHouseholdModels.numberOfSchoolGoingChildrenFemalePostHarvest = details[k].value=== ""?0:details[k].value;
											break;
										case "migratedPresowing":
												farmerHouseholdModels.numberOfHouseholdMemberMigratedPreSowing = details[k].value=== ""?0:details[k].value;
											break;
										case "migratedPostharvest":
												farmerHouseholdModels.numberOfHouseholdMemberMigratedPostHarvest = details[k].value=== ""?0:details[k].value;
											break;
										default:
											break;   	
									}
							farmerHouseholdModels.processId = otherInformationFarmerHouseholdDetailsProcessId;
							farmerHouseholdModels.farmerTimePeriodId = not_synced_farmers[i].data.farmer_household_details.farmerTimePeriodId;
							farmerHouseholdModels.createdBy = not_synced_farmers[i].data.farmer_household_details.created_by;
							farmerHouseholdModels.createdDate = not_synced_farmers[i].data.farmer_household_details.created_date;
							farmerHouseholdModels.updatedDate = not_synced_farmers[i].data.farmer_household_details.updated_date;
							farmerHouseholdModels.updatedBy = not_synced_farmers[i].data.farmer_household_details.updated_by;
							farmerHouseholdModels.isAlive = not_synced_farmers[i].data.farmer_household_details.live;
						}
							farmer.otherInformationFarmerHouseholdDetailModel=farmerHouseholdModels;
					}
					//check land holding details work sync or not
					if(!not_synced_farmers[i].data.land_holding_details.isSynced  && not_synced_farmers[i].data.land_holding_details.isSynced != undefined 
							&& not_synced_farmers[i].data.land_holding_details.submitted && (not_synced_farmers[i].data.land_holding_details.errorMessage === undefined || not_synced_farmers[i].data.land_holding_details.errorMessage === null)){
						countFarmer++;
						farmer.otherInformationLandHoldingDetailModel = {};
						var landholdingModels = {};
						
						for(var k = 0; k < not_synced_farmers[i].data.land_holding_details.details.length;k++){
							landholdingModels.landholdingDetailsId = 0;
							var details = not_synced_farmers[i].data.land_holding_details.details;

									switch(details[k].key){
										case "ownLandPreSowing":
										    	landholdingModels.ownLandPreSowing = details[k].value=== ""?0:details[k].value;
										   	break;
										case "ownLandPostHarvest":
												landholdingModels.ownLandPostHarvest = details[k].value=== ""?0:details[k].value;
											break;
										case "leasedLandPreSowing":
										    	landholdingModels.leasedLandPreSowing = details[k].value=== ""?0:details[k].value;
										   	break;
										case "leasedLandPostHarvest":
												landholdingModels.leasedLandPostHarvest = details[k].value=== ""?0:details[k].value;
											break;
										case "irrigatedLandPreSowing":
												landholdingModels.irrigatedLandPreSowing = details[k].value=== ""?0:details[k].value;
											break;
										case "irrigatedLandPostHarvest":
												landholdingModels.irrigatedLandPostHarvest = details[k].value=== ""?0:details[k].value;
											break;
										case "sourceOfIrrigationPreSowing":
												landholdingModels.sourceOfIrrigationPreSowing = !details[k].value || details[k].value === "Tap"?null:details[k].value;
												landholdingModels.sourceOfIrrigationPreSowingName = null;
											break;
										case "sourceOfIrrigationPostHarvest":
												landholdingModels.sourceOfIrrigationPostHarvest = !details[k].value || details[k].value === "Tap"?null:details[k].value;
												landholdingModels.sourceOfIrrigationPostHarvestName = null;
											break;
										case "typeOfIrrigationPreSowing":
												landholdingModels.typeOfIrrigationPreSowing = !details[k].value || details[k].value=== "Tap"?null:details[k].value;
												landholdingModels.typeOfIrrigationPreSowingName = null;
											break;
										case "typeOfIrrigationPostHarvest":
												landholdingModels.typeOfIrrigationPostHarvest = !details[k].value || details[k].value=== "Tap"?null:details[k].value;
												landholdingModels.typeOfIrrigationPostHarvestName = null;
											break;
										default:
											break;   	
									}
							landholdingModels.processId = otherInformationLandHoldingDetailsProcessId;
							landholdingModels.farmerTimePeriodId = not_synced_farmers[i].data.land_holding_details.farmerTimePeriodId;
							landholdingModels.createdBy = not_synced_farmers[i].data.land_holding_details.created_by;
							landholdingModels.createdDate = not_synced_farmers[i].data.land_holding_details.created_date;
							landholdingModels.updatedDate = not_synced_farmers[i].data.land_holding_details.updated_date;
							landholdingModels.updatedBy = not_synced_farmers[i].data.land_holding_details.updated_by;
							landholdingModels.isAlive = not_synced_farmers[i].data.land_holding_details.live;
						}
							farmer.otherInformationLandHoldingDetailModel=landholdingModels;
					}
					//check cotton crop details work sync or not
					if(!not_synced_farmers[i].data.cotton_crop_details.isSynced  && not_synced_farmers[i].data.cotton_crop_details.isSynced != undefined 
							&& not_synced_farmers[i].data.cotton_crop_details.submitted && (not_synced_farmers[i].data.cotton_crop_details.errorMessage === undefined || not_synced_farmers[i].data.cotton_crop_details.errorMessage === null)){
						countFarmer++;
						farmer.otherInformationCottonCropDetailModel = {};
						var cottonCropModels = {};
						
						for(var k = 0; k < not_synced_farmers[i].data.cotton_crop_details.details.length;k++){
							cottonCropModels.cottonCropDetailsId = 0;
							var details = not_synced_farmers[i].data.cotton_crop_details.details;

									switch(details[k].key){
										case "staplePreSowing":
												if(details[k].value)
										    		cottonCropModels.staplePreSowing = details[k].value;
										    	else
										    		cottonCropModels.staplePreSowing = null;
										   		cottonCropModels.staplePreSowingName = null;
										   	break;
										case "areaUnderProductionPreSowing":
												cottonCropModels.areaUnderProductionPreSowing = details[k].value=== ""?0.00:details[k].value;
											break;
										case "areaUnderProductionMidSeason":
										    	cottonCropModels.areaUnderProductionMidSeason = details[k].value=== ""?0.00:details[k].value;
										   	break;
										case "areaUnderProductionPostHarvest":
												cottonCropModels.areaUnderProductionPostHarvest = details[k].value=== ""?0.00:details[k].value;
											break;
										case "yieldEstimatePreSowing":
												cottonCropModels.yieldEstimatePreSowing = details[k].value=== ""?0:details[k].value;
											break;
										case "yieldEstimateMidSeason":
												cottonCropModels.yieldEstimateMidSeason = details[k].value=== ""?0:details[k].value;
											break;
										default:
											break;   	
									}
							cottonCropModels.processId = otherInformationCottonCropDetailProcessId;		
							cottonCropModels.farmerTimePeriodId = not_synced_farmers[i].data.cotton_crop_details.farmerTimePeriodId;
							cottonCropModels.createdBy = not_synced_farmers[i].data.cotton_crop_details.created_by;
							cottonCropModels.createdDate = not_synced_farmers[i].data.cotton_crop_details.created_date;
							cottonCropModels.updatedDate = not_synced_farmers[i].data.cotton_crop_details.updated_date;
							cottonCropModels.updatedBy = not_synced_farmers[i].data.cotton_crop_details.updated_by;
							cottonCropModels.isAlive = not_synced_farmers[i].data.cotton_crop_details.live;
						}
							farmer.otherInformationCottonCropDetailModel=cottonCropModels;
					}
					//check livestock and cattle ownership work sync or not
					if(!not_synced_farmers[i].data.livestock_cattle_ownership.isSynced  && not_synced_farmers[i].data.livestock_cattle_ownership.isSynced != undefined 
							&& not_synced_farmers[i].data.livestock_cattle_ownership.submitted && (not_synced_farmers[i].data.livestock_cattle_ownership.errorMessage === undefined || not_synced_farmers[i].data.livestock_cattle_ownership.errorMessage === null)){
						countFarmer++;
						farmer.otherInformationLiveStockAndCattleOwnershipModel = {};
						var liveStockModels = {};
						
						for(var k = 0; k < not_synced_farmers[i].data.livestock_cattle_ownership.details.length;k++){
							liveStockModels.livestockAndCattleId = 0;
							var details = not_synced_farmers[i].data.livestock_cattle_ownership.details;

									switch(details[k].key){
										case "numberOfCowBuffalloBullOxPreSowing":
										    	liveStockModels.numberOfCowBuffalloBullOxPreSowing = details[k].value===""?0:details[k].value;
										   	break;
										case "numberOfCowBuffalloBullOxMidSeason":
												liveStockModels.numberOfCowBuffalloBullOxMidSeason = details[k].value=== ""?0:details[k].value;
											break;
										case "numberOfGoatSheepPreSowing":
										    	liveStockModels.numberOfGoatSheepPreSowing = details[k].value=== ""?0:details[k].value;
										   	break;
										case "numberOfGoatSheepPostHarvest":
												liveStockModels.numberOfGoatSheepPostHarvest = details[k].value=== ""?0:details[k].value;
											break;
										case "numberOfPoultryPreSowing":
												liveStockModels.numberOfPoultryPreSowing = details[k].value=== ""?0:details[k].value;
											break;
										case "numberOfPoultryPostHarvest":
												liveStockModels.numberOfPoultryPostHarvest = details[k].value=== ""?0:details[k].value;
											break;
										default:
											break;   	
									}
							liveStockModels.processId = otherInformationLiveStockAndCattleOwnershipProcessId;		
							liveStockModels.farmerTimePeriodId = not_synced_farmers[i].data.livestock_cattle_ownership.farmerTimePeriodId;
							liveStockModels.createdBy = not_synced_farmers[i].data.livestock_cattle_ownership.created_by;
							liveStockModels.createdDate = not_synced_farmers[i].data.livestock_cattle_ownership.created_date;
							liveStockModels.updatedDate = not_synced_farmers[i].data.livestock_cattle_ownership.updated_date;
							liveStockModels.updatedBy = not_synced_farmers[i].data.livestock_cattle_ownership.updated_by;
							liveStockModels.isAlive = not_synced_farmers[i].data.livestock_cattle_ownership.live;
						}
							farmer.otherInformationLiveStockAndCattleOwnershipModel=liveStockModels;
					}	
					//check asset ownership  work sync or not
					if(!not_synced_farmers[i].data.asset_ownership.isSynced  && not_synced_farmers[i].data.asset_ownership.isSynced != undefined 
							&& not_synced_farmers[i].data.asset_ownership.submitted && (not_synced_farmers[i].data.asset_ownership.errorMessage === undefined || not_synced_farmers[i].data.asset_ownership.errorMessage === null)){
						countFarmer++;
						farmer.otherInformationAssetOwnershipModel = {};
						var assetOwnershipModels = {};
						
						for(var k = 0; k < not_synced_farmers[i].data.asset_ownership.details.length;k++){
							assetOwnershipModels.assetOwnershipId = 0;
							var details = not_synced_farmers[i].data.asset_ownership.details;

									switch(details[k].key){
										case "agriculturalImplementsPreSowing":
										    assetOwnershipModels.agriculturalImplementsPreSowing = details[k].value==="Tap"||details[k].value=== undefined?null:details[k].id;
										   	assetOwnershipModels.agriculturalImplementsPreSowingNames = [];
										   	break;
										case "agriculturalImplementsMidSeason":
											assetOwnershipModels.agriculturalImplementsMidSeason = details[k].value=== "Tap"||details[k].value=== undefined?null:details[k].id;
											assetOwnershipModels.agriculturalImplementsMidSeasonNames = [];
											break;
										case "consumerElectronicsPreSowing":
										    assetOwnershipModels.consumerElectronicsPreSowing = details[k].value=== "Tap"||details[k].value=== undefined?null:details[k].id;
										   	assetOwnershipModels.consumerElectronicsPreSowingNames = [];
										   	break;
										case "consumerElectronicsPostHarvest":
											assetOwnershipModels.consumerElectronicsPostHarvest = details[k].value=== "Tap"||details[k].value=== undefined?null:details[k].id;
											assetOwnershipModels.consumerElectronicsPostHarvestNames = [];
											break;
										case "vehiclePreSowing":
											assetOwnershipModels.vehiclePreSowing = details[k].value=== "Tap"||details[k].value=== undefined?null:details[k].id;
											assetOwnershipModels.vehiclePreSowingNames = [];
											break;
										case "vehiclePostHarvest":
											assetOwnershipModels.vehiclePostHarvest = details[k].value=== "Tap"||details[k].value=== undefined?null:details[k].id;
											assetOwnershipModels.vehiclePostHarvestNames = [];
											break;
										case "cellPhonePreSowing":
											assetOwnershipModels.cellPhonePreSowing = details[k].value=== " "||details[k].value=== undefined?0:details[k].value;
											break;
										case "cellPhonePostHarvest":
											assetOwnershipModels.cellPhonePostHarvest = details[k].value=== " "||details[k].value=== undefined?0:details[k].value;
											break;
										default:
											break;   	
									}
							assetOwnershipModels.processId = otherInformationAssetOwnershipProcessId;		
							assetOwnershipModels.farmerTimePeriodId = not_synced_farmers[i].data.asset_ownership.farmerTimePeriodId;
							assetOwnershipModels.createdBy = not_synced_farmers[i].data.asset_ownership.created_by;
							assetOwnershipModels.createdDate = not_synced_farmers[i].data.asset_ownership.created_date;
							assetOwnershipModels.updatedDate = not_synced_farmers[i].data.asset_ownership.updated_date;
							assetOwnershipModels.updatedBy = not_synced_farmers[i].data.asset_ownership.updated_by;
							assetOwnershipModels.isAlive = not_synced_farmers[i].data.asset_ownership.live;
						}
							farmer.otherInformationAssetOwnershipModel=assetOwnershipModels;
					}	
					//check educational housing details  work sync or not
					if(!not_synced_farmers[i].data.educational_housing_details.isSynced  && not_synced_farmers[i].data.educational_housing_details.isSynced != undefined 
							&& not_synced_farmers[i].data.educational_housing_details.submitted && (not_synced_farmers[i].data.educational_housing_details.errorMessage === undefined || not_synced_farmers[i].data.educational_housing_details.errorMessage === null)){
						countFarmer++;
						farmer.otherInformationEducationalAndHousingDetailModel = {};
						var educationalHousingModels = {};
						
						for(var k = 0; k < not_synced_farmers[i].data.educational_housing_details.details.length;k++){
							educationalHousingModels.educationalDetailsId = 0;
							var details = not_synced_farmers[i].data.educational_housing_details.details;

									switch(details[k].key){
										case "educationalLevelIdPreSowing":
										    	educationalHousingModels.educationalLevelIdPreSowing = details[k].value==="Tap"?null:details[k].value;
										   		educationalHousingModels.educationalLevelIdPreSowingName = null;
										   	break;
										case "educationalLevelIdMidSeason":
												educationalHousingModels.educationalLevelIdMidSeason = details[k].value=== "Tap"?null:details[k].value;
												educationalHousingModels.educationalLevelIdMidSeasonName = null;
											break;
										case "housingIdPreSowing":
										    	educationalHousingModels.housingIdPreSowing = details[k].value=== "Tap"?null:details[k].value;
										   		educationalHousingModels.housingNamePreSowing = null;
										   	break;
										case "housingIdPostHarvest":
												educationalHousingModels.housingIdPostHarvest = details[k].value=== "Tap"?null:details[k].value;
												educationalHousingModels.housingNamePostHarvest = null;
											break;
										case "electrifiedHousingPreSowing":
												educationalHousingModels.electrifiedHousingPreSowing = details[k].value=== " "?0:details[k].value;
											break;
										case "electrifiedHousingPostHarvest":
												educationalHousingModels.electrifiedHousingPostHarvest = details[k].value=== " "?0:details[k].value;
											break;
										case "drinkingWaterPreSowing":
												educationalHousingModels.drinkingWaterPreSowing = details[k].value=== "Tap"||details[k].value=== undefined?null:details[k].id;
												educationalHousingModels.drinkingWaterPreSowingNames = [];
											break;
										case "drinkingWaterPostHarvest":
												educationalHousingModels.drinkingWaterPostHarvest = details[k].value=== "Tap"||details[k].value=== undefined?null:details[k].id;
												educationalHousingModels.drinkingWaterPostHarvestNames = [];
											break;
										default:
											break;   	
									}
							educationalHousingModels.processId = otherInformationEducationalAndHousingDetailsProcessId;
							educationalHousingModels.farmerTimePeriodId = not_synced_farmers[i].data.educational_housing_details.farmerTimePeriodId;
							educationalHousingModels.createdBy = not_synced_farmers[i].data.educational_housing_details.created_by;
							educationalHousingModels.createdDate = not_synced_farmers[i].data.educational_housing_details.created_date;
							educationalHousingModels.updatedDate = not_synced_farmers[i].data.educational_housing_details.updated_date;
							educationalHousingModels.updatedBy = not_synced_farmers[i].data.educational_housing_details.updated_by;
							educationalHousingModels.isAlive = not_synced_farmers[i].data.educational_housing_details.live;
						}
							farmer.otherInformationEducationalAndHousingDetailModel=educationalHousingModels;
					}	
					//check additional details  work sync or not
					if(!not_synced_farmers[i].data.additional_details.isSynced  && not_synced_farmers[i].data.additional_details.isSynced != undefined 
							&& not_synced_farmers[i].data.additional_details.submitted && (not_synced_farmers[i].data.additional_details.errorMessage === undefined || not_synced_farmers[i].data.additional_details.errorMessage === null)){
						countFarmer++;
						farmer.otherInformationAdditionalDetailModel = {};
						var additionalModels = {};
						
						for(var k = 0; k < not_synced_farmers[i].data.additional_details.details.length;k++){
							additionalModels.additionalDetailsId = 0;
							var details = not_synced_farmers[i].data.additional_details.details;

									switch(details[k].key){
										case "lifeInsurancePreSowing":
										    	additionalModels.lifeInsurancePreSowing = details[k].value=== " "?0:details[k].value;
										   	break;
										case "lifeInsurancePostHarvest":
												additionalModels.lifeInsurancePostHarvest = details[k].value=== " "?0:details[k].value;
											break;
										case "cropInsurancePreSowing":
										    	additionalModels.cropInsurancePreSowing = details[k].value=== " "?0:details[k].value;
										   	break;

										case "cropInsurancePostHarvest":
												additionalModels.cropInsurancePostHarvest = details[k].value=== " "?0:details[k].value;
											break;
										case "bankAccountPreSowing":
												additionalModels.bankAccountPreSowing = details[k].value=== "Tap"?null:details[k].value;
												additionalModels.bankAccountPreSowingName = null;
											break;
										case "bankAccountPostHarvest":
												additionalModels.bankAccountPostHarvest = details[k].value=== "Tap"?null:details[k].value;
												additionalModels.bankAccountPostHarvestName = null;
											break;
										case "loanTakenPreSowing":
												additionalModels.loanTakenPreSowing = details[k].value=== " "?0:details[k].value;
											break;
										case "loanTakenPostHarvest":
												additionalModels.loanTakenPostHarvest = details[k].value=== " "?0:details[k].value;
											break;
										default:
											break;   	
									}
							additionalModels.processId = otherInformationAdditionalDetailProcessId;
							additionalModels.farmerTimePeriodId = not_synced_farmers[i].data.additional_details.farmerTimePeriodId;
							additionalModels.createdBy = not_synced_farmers[i].data.additional_details.created_by;
							additionalModels.createdDate = not_synced_farmers[i].data.additional_details.created_date;
							additionalModels.updatedDate = not_synced_farmers[i].data.additional_details.updated_date;
							additionalModels.updatedBy = not_synced_farmers[i].data.additional_details.updated_by;
							additionalModels.isAlive = not_synced_farmers[i].data.additional_details.live;
						}
							farmer.otherInformationAdditionalDetailModel=additionalModels;
					}
					if(countFarmer > 0){
						farmers.push(farmer);
						countFarmer = 0;
					}

					}
					
					if(farmers.length > 0){
						farmers = JSON.parse('{"farmerModels":' + JSON.stringify(farmers) + ',"fedata":true}');
                        var rejectedFlag=false;
						$http.post(server_url+'txnData', farmers).
						then(function(response){
                            currentSyncStatusObj= response.data;

                            $rootScope.$broadcast('currentSyncStatusObj', currentSyncStatusObj);
							 //This will get two parameters (farmerId and ProcessId)
							 //If error will be there, return the error else return false 
							    var isRejected = function(fId, pId,formName){
							        var isRejectCount=0;
								 	var rejecteds = response.data;
								 	angular.forEach(rejecteds, function(value, key){
								 		if(fId === value.farmerId && pId === value.processId){
								 			rejectedFlag=true;
                                            isRejectCount++;
								 		}
	
								 	});

							 		if (isRejectCount>0) {
							 			return true;
							 		}else{
							 			return false;
							 		}
							    };
                              
							 //make processes isSynced true

							 db.get(txn_data_doc_name).
							 then(function(doc){

							 	//database farmers records=no.of farmers
							 	var records = doc.records;
							 	farmers = farmers.farmerModels;
							 	for(var m = 0; m < records.length;m++){

							 		//variable for future use
							 		var farmerIdCount = [];

							 		//this left side farmers variable is just a variable
							 		
							 		for(var i = 0; i < farmers.length;i++){

							 			//p1-> process 1
							 			farmerIdCount.push({
							 				id: farmers[i].farmerId,
							 				p1: 0,
							 				p2: 0,
							 				p3: 0,
							 				p4: 0,
							 				p5: 0,
							 				p6: 0,
							 				p7: 0,
							 				p8: 0,
							 				p9: 0,
							 				p10:0,
							 				p11:0,
							 				p12:0,
							 				p13:0,
							 				p14:0,
							 				p15:0,
							 				p16:0,
							 				p17:0,
							 				p18:0,
							 				p19:0,
							 				p20:0,
							 				p21:0,
							 				p22:0,
							 				p23:0,
							 				p24:0,
							 				p25:0
							 			});

							 			//checking the current farmer id is database farmer id or not
							 			if(records[m].farmerId === farmers[i].farmerId && records[m].farmerTimePeriodId === farmers[i].farmerTimePeriodId){
							 				//this variable is for future use
							 				var errorMessage;


							 				if(records[m].data.land_details.isSynced){
									 				farmerIdCount[i].p1++;							 					
									 		}

									 		//checking the land detail record had gone for sync or not,
									 		//if had gone then apply the logic else ignore. Same for all the 7 process
							 				if(!records[m].data.land_details.isSynced  && records[m].data.land_details.isSynced != undefined && records[m].data.land_details.submitted){
							 					errorMessage = isRejected(farmers[i].farmerId, 1,records[m].data.land_details.title);
							 					if(errorMessage){

							 						//set error message in particular object
							 						records[m].data.land_details.errorMessage = errorMessage;
							 						records[m].data.land_details.isSynced = false;
							 					}else{

							 						//make perticular object isSynced true
							 						records[m].data.land_details.isSynced = true;							 				
									 				farmerIdCount[i].p1++;
									 			}
							 				}	
							 			}
						 				if(records[m].data.help_employment.isSynced){
						 					farmerIdCount[i].p2++;
						 				}
						 				if(!records[m].data.help_employment.isSynced  && records[m].data.help_employment.isSynced != undefined && records[m].data.help_employment.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 2,records[m].data.help_employment.title);
						 					if(errorMessage){
						 						records[m].data.help_employment.errorMessage = errorMessage;
						 						records[m].data.help_employment.isSynced = false;
						 					}else{
						 						records[m].data.help_employment.isSynced = true;
						 						farmerIdCount[i].p2++;
						 					}
						 				}
						 				if(records[m].data.soil_preparation.isSynced){
						 					farmerIdCount[i].p3++;
						 				}
						 				if(!records[m].data.soil_preparation.isSynced  && records[m].data.soil_preparation.isSynced != undefined && records[m].data.soil_preparation.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 3,records[m].data.soil_preparation.title);
						 					if(errorMessage){
						 						records[m].data.soil_preparation.errorMessage = errorMessage;
						 						records[m].data.soil_preparation.isSynced = false;
						 					}else{
						 						records[m].data.soil_preparation.isSynced = true;
						 						farmerIdCount[i].p3++;
						 					}
						 				}
						 				if(records[m].data.sowing_cost.isSynced){
						 					farmerIdCount[i].p4++;
						 				}
						 				if(!records[m].data.sowing_cost.isSynced  && records[m].data.sowing_cost.isSynced != undefined && records[m].data.sowing_cost.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 4,records[m].data.sowing_cost.title);
						 					if(errorMessage){
						 						records[m].data.sowing_cost.errorMessage = errorMessage;
						 						records[m].data.sowing_cost.isSynced = false;
						 					}else{
						 						records[m].data.sowing_cost.isSynced = true;
						 						farmerIdCount[i].p4++;
						 					}
						 				}
						 				if(records[m].data.water_use.isSynced){
						 					farmerIdCount[i].p5++;
						 				}
						 				if(!records[m].data.water_use.isSynced  && records[m].data.water_use.isSynced != undefined && records[m].data.water_use.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 5,records[m].data.water_use.title);
						 					if(errorMessage){
						 						records[m].data.water_use.errorMessage = errorMessage;
						 						records[m].data.water_use.isSynced = false;
						 					}else{
						 						records[m].data.water_use.isSynced = true;
						 						farmerIdCount[i].p5++;
						 					}
						 				}
						 				if(records[m].data.irrigation_details.isSynced){
						 					farmerIdCount[i].p6++;
						 				}
						 				if(!records[m].data.irrigation_details.isSynced  && records[m].data.irrigation_details.isSynced != undefined && records[m].data.irrigation_details.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 6,records[m].data.irrigation_details.title);
						 					if(errorMessage){
						 						records[m].data.irrigation_details.errorMessage = errorMessage;
						 						records[m].data.irrigation_details.isSynced = false;
						 					}else{
						 						records[m].data.irrigation_details.isSynced = true;
						 						farmerIdCount[i].p6++;
						 					}
						 				}
						 				if(records[m].data.manure_application.isSynced){
						 					farmerIdCount[i].p7++;
						 				}
						 				if(!records[m].data.manure_application.isSynced  && records[m].data.manure_application.isSynced != undefined && records[m].data.manure_application.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 7,records[m].data.manure_application.title);
						 					if(errorMessage){
						 						records[m].data.manure_application.errorMessage = errorMessage;
						 						records[m].data.manure_application.isSynced = false;
						 					}else{
						 						records[m].data.manure_application.isSynced = true;
						 						farmerIdCount[i].p7++;
						 					}
						 				}

	                                    if(records[m].data.land_and_irrigation.isSynced){
						 					farmerIdCount[i].p8++;
						 				}
						 				if(!records[m].data.land_and_irrigation.isSynced  && records[m].data.land_and_irrigation.isSynced != undefined && records[m].data.land_and_irrigation.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 8,records[m].data.land_and_irrigation.title);
						 					if(errorMessage){
						 						records[m].data.land_and_irrigation.errorMessage = errorMessage;
						 						records[m].data.land_and_irrigation.isSynced = false;
						 					}else{
						 						records[m].data.land_and_irrigation.isSynced = true;
						 						farmerIdCount[i].p8++;
						 					}
						 				}

						 				if(records[m].data.weeding_details.isSynced){
						 					farmerIdCount[i].p9++;
						 				}
						 				if(!records[m].data.weeding_details.isSynced  && records[m].data.weeding_details.isSynced != undefined && records[m].data.weeding_details.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 9,records[m].data.weeding_details.title);
						 					if(errorMessage){
						 						records[m].data.weeding_details.errorMessage = errorMessage;
						 						records[m].data.weeding_details.isSynced = false;
						 					}else{
						 						records[m].data.weeding_details.isSynced = true;
						 						farmerIdCount[i].p9++;
						 					}
						 				}

						 				if(records[m].data.estimation.isSynced){
						 					farmerIdCount[i].p10++;
						 				}
						 				if(!records[m].data.estimation.isSynced  && records[m].data.estimation.isSynced != undefined && records[m].data.estimation.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 10,records[m].data.estimation.title);
						 					if(errorMessage){
						 						records[m].data.estimation.errorMessage = errorMessage;
						 						records[m].data.estimation.isSynced = false;
						 					}else{
						 						records[m].data.estimation.isSynced = true;
						 						farmerIdCount[i].p10++;
						 					}
						 				}

						 				if(records[m].data.cotton_picking_harvesting.isSynced){
						 					farmerIdCount[i].p11++;
						 				}
						 				if(!records[m].data.cotton_picking_harvesting.isSynced  && records[m].data.cotton_picking_harvesting.isSynced != undefined && records[m].data.cotton_picking_harvesting.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 11,records[m].data.cotton_picking_harvesting.title);
						 					if(errorMessage){
						 						records[m].data.cotton_picking_harvesting.errorMessage = errorMessage;
						 						records[m].data.cotton_picking_harvesting.isSynced = false;
						 					}else{
						 						records[m].data.cotton_picking_harvesting.isSynced = true;
						 						farmerIdCount[i].p11++;
						 					}
						 				}

						 				if(records[m].data.trainings_attended_by.isSynced){
						 					farmerIdCount[i].p12++;
						 				}
						 				if(!records[m].data.trainings_attended_by.isSynced  && records[m].data.trainings_attended_by.isSynced != undefined && records[m].data.trainings_attended_by.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 12,records[m].data.trainings_attended_by.title);
						 					if(errorMessage){
						 						records[m].data.trainings_attended_by.errorMessage = errorMessage;
						 						records[m].data.trainings_attended_by.isSynced = false;
						 					}else{
						 						records[m].data.trainings_attended_by.isSynced = true;
						 						farmerIdCount[i].p12++;
						 					}
						 				}

						 				if(records[m].data.meeting_attended_by.isSynced){
						 					farmerIdCount[i].p25++;
						 				}
						 				if(!records[m].data.meeting_attended_by.isSynced  && records[m].data.meeting_attended_by.isSynced != undefined && records[m].data.meeting_attended_by.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 12,records[m].data.meeting_attended_by.title);
						 					if(errorMessage){
						 						records[m].data.meeting_attended_by.errorMessage = errorMessage;
						 						records[m].data.meeting_attended_by.isSynced = false;
						 					}else{
						 						records[m].data.meeting_attended_by.isSynced = true;
						 						farmerIdCount[i].p25++;
						 					}
						 				}
						 				if(records[m].data.pesticide_application_details.isSynced){
						 					farmerIdCount[i].p13++;
						 				}
						 				if(!records[m].data.pesticide_application_details.isSynced  && records[m].data.pesticide_application_details.isSynced != undefined && records[m].data.pesticide_application_details.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 13,records[m].data.pesticide_application_details.title);
						 					if(errorMessage){
						 						records[m].data.pesticide_application_details.errorMessage = errorMessage;
						 						records[m].data.pesticide_application_details.isSynced = false;
						 					}else{
						 						records[m].data.pesticide_application_details.isSynced = true;
						 						farmerIdCount[i].p13++;
						 					}
						 				}

						 				if(records[m].data.bestpractices_decentwork.isSynced){
						 					farmerIdCount[i].p14++;
						 				}
						 				if(!records[m].data.bestpractices_decentwork.isSynced  && records[m].data.bestpractices_decentwork.isSynced != undefined && records[m].data.bestpractices_decentwork.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 14,records[m].data.bestpractices_decentwork.title);
						 					if(errorMessage){
						 						records[m].data.bestpractices_decentwork.errorMessage = errorMessage;
						 						records[m].data.bestpractices_decentwork.isSynced = false;
						 					}else{
						 						records[m].data.bestpractices_decentwork.isSynced = true;
						 						farmerIdCount[i].p14++;
						 					}
						 				}

						 				if(records[m].data.labors_record.isSynced){
						 					farmerIdCount[i].p15++;
						 				}
						 				if(!records[m].data.labors_record.isSynced  && records[m].data.labors_record.isSynced != undefined && records[m].data.labors_record.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 15,records[m].data.labors_record.title);
						 					if(errorMessage){
						 						records[m].data.labors_record.errorMessage = errorMessage;
						 						records[m].data.labors_record.isSynced = false;
						 					}else{
						 						records[m].data.labors_record.isSynced = true;
						 						farmerIdCount[i].p15++;
						 					}
						 				}
						 				if(records[m].data.farmer_household_details.isSynced){
						 					farmerIdCount[i].p22++;
						 				}
						 				if(!records[m].data.farmer_household_details.isSynced  && records[m].data.farmer_household_details.isSynced != undefined && records[m].data.farmer_household_details.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 22,records[m].data.farmer_household_details.title);
						 					if(errorMessage){
						 						records[m].data.farmer_household_details.errorMessage = errorMessage;
						 						records[m].data.farmer_household_details.isSynced = false;
						 					}else{
						 						records[m].data.farmer_household_details.isSynced = true;
						 						farmerIdCount[i].p22++;
						 					}
						 				}
						 				if(records[m].data.land_holding_details.isSynced){
						 					farmerIdCount[i].p23++;
						 				}
						 				if(!records[m].data.land_holding_details.isSynced  && records[m].data.land_holding_details.isSynced != undefined && records[m].data.land_holding_details.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 23,records[m].data.land_holding_details.title);
						 					if(errorMessage){
						 						records[m].data.land_holding_details.errorMessage = errorMessage;
						 						records[m].data.land_holding_details.isSynced = false;
						 					}else{
						 						records[m].data.land_holding_details.isSynced = true;
						 						farmerIdCount[i].p23++;
						 					}
						 				}
						 				if(records[m].data.cotton_crop_details.isSynced){
						 					farmerIdCount[i].p20++;
						 				}
						 				if(!records[m].data.cotton_crop_details.isSynced  && records[m].data.cotton_crop_details.isSynced != undefined && records[m].data.cotton_crop_details.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 20,records[m].data.cotton_crop_details.title);
						 					if(errorMessage){
						 						records[m].data.cotton_crop_details.errorMessage = errorMessage;
						 						records[m].data.cotton_crop_details.isSynced = false;
						 					}else{
						 						records[m].data.cotton_crop_details.isSynced = true;
						 						farmerIdCount[i].p20++;
						 					}
						 				}
				                        if(records[m].data.livestock_cattle_ownership.isSynced){
						 					farmerIdCount[i].p24++;
						 				}
						 				if(!records[m].data.livestock_cattle_ownership.isSynced  && records[m].data.livestock_cattle_ownership.isSynced != undefined && records[m].data.livestock_cattle_ownership.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 24,records[m].data.livestock_cattle_ownership.title);
						 					if(errorMessage){
						 						records[m].data.livestock_cattle_ownership.errorMessage = errorMessage;
						 						records[m].data.livestock_cattle_ownership.isSynced = false;
						 					}else{
						 						records[m].data.livestock_cattle_ownership.isSynced = true;
						 						farmerIdCount[i].p24++;
						 					}
						 				}
				                        if(records[m].data.asset_ownership.isSynced){
						 					farmerIdCount[i].p19++;
						 				}
						 				if(!records[m].data.asset_ownership.isSynced  && records[m].data.asset_ownership.isSynced != undefined && records[m].data.asset_ownership.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 19,records[m].data.asset_ownership.title);
						 					if(errorMessage){
						 						records[m].data.asset_ownership.errorMessage = errorMessage;
						 						records[m].data.asset_ownership.isSynced = false;
						 					}else{
						 						records[m].data.asset_ownership.isSynced = true;
						 						farmerIdCount[i].p19++;
						 					}
						 				}
				                        if(records[m].data.educational_housing_details.isSynced){
						 					farmerIdCount[i].p21++;
						 				}
						 				if(!records[m].data.educational_housing_details.isSynced  && records[m].data.educational_housing_details.isSynced != undefined && records[m].data.educational_housing_details.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 21,records[m].data.educational_housing_details.title);
						 					if(errorMessage){
						 						records[m].data.educational_housing_details.errorMessage = errorMessage;
						 						records[m].data.educational_housing_details.isSynced = false;
						 					}else{
						 						records[m].data.educational_housing_details.isSynced = true;
						 						farmerIdCount[i].p21++;
						 					}
						 				}
				                        if(records[m].data.additional_details.isSynced){
						 					farmerIdCount[i].p18++;
						 				}
						 				if(!records[m].data.additional_details.isSynced  && records[m].data.additional_details.isSynced != undefined && records[m].data.additional_details.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 18,records[m].data.additional_details.title);
						 					if(errorMessage){
						 						records[m].data.additional_details.errorMessage = errorMessage;
						 						records[m].data.additional_details.isSynced = false;
						 					}else{
						 						records[m].data.additional_details.isSynced = true;
						 						farmerIdCount[i].p18++;
						 					}
						 				}
				                        if(records[m].data.selling_othersource.isSynced){
						 					farmerIdCount[i].p16++;
						 				}
						 				if(!records[m].data.selling_othersource.isSynced  && records[m].data.selling_othersource.isSynced != undefined && records[m].data.selling_othersource.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 16,records[m].data.selling_othersource.title);
						 					if(errorMessage){
						 						records[m].data.selling_othersource.errorMessage = errorMessage;
						 						records[m].data.selling_othersource.isSynced = false;
						 					}else{
						 						records[m].data.selling_othersource.isSynced = true;
						 						farmerIdCount[i].p16++;
						 					}
						 				}
				                        if(records[m].data.sustainable_practices.isSynced){
						 					farmerIdCount[i].p17++;
						 				}
						 				if(!records[m].data.sustainable_practices.isSynced  && records[m].data.sustainable_practices.isSynced != undefined && records[m].data.sustainable_practices.submitted){
						 					errorMessage = isRejected(farmers[i].farmerId, 17,records[m].data.sustainable_practices.title);
						 					if(errorMessage){
						 						records[m].data.sustainable_practices.errorMessage = errorMessage;
						 						records[m].data.sustainable_practices.isSynced = false;
						 					}else{
						 						records[m].data.sustainable_practices.isSynced = true;
						 						farmerIdCount[i].p17++;
						 					}
						 				}
							 		//whether all process of that farmer synced of not

							 		//Taken different variable names to stay away from ambiguity
							 		var oobj = [];
							 		var checkOobj = function(iid){
							 			for(var g = 0; g < oobj.length;g++){
							 				if(oobj[g].id === iid)
							 					return g;
							 			}
							 			return false;
							 		}

						 			}//farmers loop
						 			for(var o = 0; o < farmerIdCount.length;o++){
						 				var rValue = checkOobj(farmerIdCount[o].id);
						 				if(rValue){
						 					oobj[rValue].count += (farmerIdCount[o].p1 + farmerIdCount[o].p2 +farmerIdCount[o].p3 + farmerIdCount[o].p4 + farmerIdCount[o].p5 + farmerIdCount[o].p6 + farmerIdCount[o].p7+ farmerIdCount[o].p8 + farmerIdCount[o].p9+ farmerIdCount[o].p10 + farmerIdCount[o].p11 + farmerIdCount[o].p12 + farmerIdCount[o].p13 + farmerIdCount[o].p14 + farmerIdCount[o].p15 + farmerIdCount[o].p16 + farmerIdCount[o].p17 + farmerIdCount[o].p18 + farmerIdCount[o].p19 + farmerIdCount[o].p20 + farmerIdCount[o].p21 + farmerIdCount[o].p22 + farmerIdCount[o].p23 + farmerIdCount[o].p24 + farmerIdCount[o].p25);			 					
						 				}else{
						 					oobj.push({
						 							id: farmerIdCount[o].id,
						 							count : farmerIdCount[o].p1 + farmerIdCount[o].p2 +farmerIdCount[o].p3 + farmerIdCount[o].p4 + farmerIdCount[o].p5 + farmerIdCount[o].p6 + farmerIdCount[o].p7 + farmerIdCount[o].p8 + farmerIdCount[o].p9 + farmerIdCount[o].p10 + farmerIdCount[o].p11 + farmerIdCount[o].p12 + farmerIdCount[o].p13 + farmerIdCount[o].p14 + farmerIdCount[o].p15 + farmerIdCount[o].p16 + farmerIdCount[o].p17 + farmerIdCount[o].p18 + farmerIdCount[o].p19 + farmerIdCount[o].p20 + farmerIdCount[o].p21 + farmerIdCount[o].p22 + farmerIdCount[o].p23 + farmerIdCount[o].p24 + farmerIdCount[o].p25			 							
						 						}
						 					);
						 				}
					 				}

					 				//if the all process of the farmer is synced then we have to set the farmer synced
					 				for(var o = 0; o < oobj.length;o++){
					 					if(oobj[0].count == 25){
					 						records[m].isSynced = true;
					 					}
					 				}
							 	}//records loop
							 	
								//updating the database with modified records					 		
						 		return db.put({
						 			_id: txn_data_doc_name,
						 			_rev: doc._rev,
						 			records: records
						 		}).
						 		then(function(res){	

								  var successCount=  $filter('filter')(currentSyncStatusObj, {status:'Success'});
								  var failedCount=  $filter('filter')(currentSyncStatusObj, {status:'Failed'});
						 			
						 			  $rootScope.$broadcast('page', 'app.home');
						 	         // MainServiceHelper.alertBox(msg_sync_process_complete,scope);					
						               var my_popup = $ionicPopup.show({
											template: msg_sync_process_complete+"<br/><span style='color:green'> Success:</span> "+successCount.length+" process(es)<br/><span style='color:red'> Failed:</span> "+failedCount.length+" process(es)<br/> Please tap on 'OK' for details.",
											title: 'Warning',
											scope: scope,
											buttons: [
												{
													text: 'Ok',
													type: 'button-positive',
													onTap: function(e){
														$location.path("app/syncStatus");
														my_popup.close;
													}
												}
											]
										});
						              MainServiceHelper.hide_spinner();
						 		}).catch(function(err){				 
						 			MainServiceHelper.hide_spinner();			
						 			MainServiceHelper.writeLog('js/services/mainService.js', 'sycn', "Error status : " + err.status + " Error : " + err);
						 			MainServiceHelper.show_toast("Error status : " + err.status);
						 			$rootScope.$broadcast('page', 'app.home');	
						 		});
							 }).
							 catch(function(err){
							 	MainServiceHelper.hide_spinner();
							 	MainServiceHelper.writeLog('js/services/mainService.js', 'sycn', "Error status : " + err.status + " Error : " + err);
							 	MainServiceHelper.show_toast("Error status : " + err.status);
						 		$rootScope.$broadcast('page', 'app.home');	
							 });

						},function(error){					
							MainServiceHelper.hide_spinner();
							MainServiceHelper.show_toast("Server error status : " + error.status);					
							$rootScope.$broadcast('page', 'app.home');	
						});  
					}else{
						MainServiceHelper.hide_spinner();
						MainServiceHelper.show_toast("No farmer to sync");
						$rootScope.$broadcast('page', 'app/home');
					} 

			}).
			catch(function (err) {
	            if (err.status==404) {
	            	MainServiceHelper.hide_spinner();
	        		MainServiceHelper.show_toast("No data to sync");
					$rootScope.$broadcast('page', 'app/home');    	
	            }else{
	            	MainServiceHelper.hide_spinner();
	            	MainServiceHelper.writeLog('js/services/mainService.js', 'sycn', "Error " + error);
					MainServiceHelper.show_toast("Error status : " + err.status);
					$rootScope.$broadcast('page', 'app/home');
	            }		        
			});
		}catch(error){
			MainServiceHelper.hide_spinner();
			MainServiceHelper.writeLog('js/services/mainService.js', 'sycn', "Error " + error);
			MainServiceHelper.show_toast("Error in syncing process");
			$rootScope.$broadcast('page', 'app/home');
		}
   	};

	this.submit = function(obj, data_type,scope){

		if(obj.created_by === null || obj.created_by === undefined || obj.created_by === ""){
			obj.created_by = this.getUsername();
			obj.created_date = this.get_date_time();
		}else{
			obj.updated_by = this.getUsername();
			obj.updated_date = this.get_date_time();	
		}
		 
		var confirmPopup = $ionicPopup.confirm({
			title: 'Confirm',
			scope:scope,
			template: msg_submit_confirmation
		});

		confirmPopup.then(function(res) {
		if(res) {	       			
			var records = [];
			var record = {};
			db.get(txn_data_doc_name).
			then(function(doc){
				records = doc.records;
				for(var i = 0; i < records.length;i++){
					if(records[i].farmerId === obj.farmerId && 
						records[i].farmerTimePeriodId === obj.farmerTimePeriodId ){
						record = records[i];

						//remove the record
						records.splice(i, 1);
						break;
					}
				}

				//insert new one with submitted
				switch(data_type){
					case 0:
						record.data.land_details = obj;
						record.data.land_details.submitted = true;
						break;
					case 1:
						record.data.help_employment = obj;
						record.data.help_employment.submitted = true;
						break;
					case 2:
						record.data.soil_preparation = obj;
						record.data.soil_preparation.submitted = true;
						break;
					case 3:
						record.data.sowing_cost = obj;
						record.data.sowing_cost.submitted = true;
						break;
					case 4:
						record.data.water_use = obj;
						record.data.water_use.submitted = true;
						break;
					case 5:
						record.data.irrigation_details = obj;
						record.data.irrigation_details.submitted = true;
						break;
					case 6:
						record.data.manure_application = obj;
						record.data.manure_application.submitted = true;
						break;
					case 7:
						record.data.land_and_irrigation = obj;
						record.data.land_and_irrigation.submitted = true;
						break;
					case 8:
						record.data.weeding_details = obj;
						record.data.weeding_details.submitted = true;
						break;
					case 9:
						record.data.estimation = obj;
						record.data.estimation.submitted = true;
						break;	
					case 10:
						record.data.cotton_picking_harvesting = obj;
						record.data.cotton_picking_harvesting.submitted = true;
						break;	
					case 11:
						record.data.trainings_attended_by = obj;
						record.data.trainings_attended_by.submitted = true;
						break;
					case 12:
						record.data.meeting_attended_by = obj;
						record.data.meeting_attended_by.submitted = true;
						break;	
					case 13:
						record.data.pesticide_application_details = obj;
						record.data.pesticide_application_details.submitted = true;
						break;
					case 14:
						record.data.bestpractices_decentwork = obj;
						record.data.bestpractices_decentwork.submitted = true;
						break;
					case 15:
						record.data.labors_record = obj;
						record.data.labors_record.submitted = true;
						break;	
					case 16:
						record.data.farmer_household_details = obj;
						record.data.farmer_household_details.submitted = true;
						break;
					case 17:
						record.data.land_holding_details = obj;
						record.data.land_holding_details.submitted = true;
						break;
					case 18:
						record.data.cotton_crop_details = obj;
						record.data.cotton_crop_details.submitted = true;
						break;	
                    case 19:
						record.data.livestock_cattle_ownership = obj;
						record.data.livestock_cattle_ownership.submitted = true;
						break;
                    case 20:
						record.data.asset_ownership = obj;
						record.data.asset_ownership.submitted = true;
						break;
                    case 21:
						record.data.educational_housing_details = obj;
						record.data.educational_housing_details.submitted = true;
						break;
					case 22:
						record.data.selling_othersource = obj;
						record.data.selling_othersource.submitted = true;
						break;
                    case 23:
						record.data.additional_details = obj;
						record.data.additional_details.submitted = true;
						break;
					case 24:
						record.data.sustainable_practices = obj;
						record.data.sustainable_practices.submitted = true;
						break;	
					default :
						break;
				}
				
				records.push(record);
				return db.put({
					_id: txn_data_doc_name,
					_rev: doc._rev,
					records: records	
				}).
				then(function(){
					//success
					$rootScope.$broadcast('eventFired', {
                		data: true
            		});
				}).
				catch(function(err){
					if(err.status === 409){
						console.error("Conflict");
					}else{
						console.error("err.status : " + err.status);	
					}
				});
			}).
			catch(function(err){
				console.error("Error : " + err.status);
			});
			$cordovaToast.show('Submitted!', 'short', 'center');
		} else {}
		});
		
	};	

	this.land_dtls_submitted = function(obj, data_type,scope){
		var records = [];
		var record = {};
		db.get(txn_data_doc_name).
		then(function(doc){
			records = doc.records;
			for(var i = 0; i < records.length;i++){
				if(records[i].farmerId === obj.farmerId && 
					records[i].farmerTimePeriodId === obj.farmerTimePeriodId ){
					record = records[i];
					//remove the record
					records.splice(i, 1);
					break;
				}
			}
			//insert new one with submitted
			switch(data_type){
				case 0:
					record.data.land_details = obj;
					record.data.land_details.submitted = true;
					break;
				default :
					break;
			}
			
			records.push(record);
			return db.put({
				_id: txn_data_doc_name,
				_rev: doc._rev,
				records: records	
			}).
			then(function(){
				//success
				$rootScope.$broadcast('eventFired', {
		    		data: true
				});
				// $cordovaToast.show("Successfully saved and submitted!", toastSDuration, toastPosition);
			}).
			catch(function(err){
				if(err.status === 409){
					console.error("Conflict");
				}else{
					console.error("err.status : " + err.status);	
				}
			});
		}).
		catch(function(err){
			console.error("Error : " + err.status);
		});
	}

	this.fetch_help_employement_obj = function(){
		db.get(selected_farmer_doc).
		then(function(doc){
			var farmerId = doc.farmerId;
			var farmerTimePeriodId = doc.farmerTimePeriodId;
			db.get(txn_data_doc_name).
			then(function(result){

				var records = result.records;
				var record_not_present = true;
				for(var i = 0; i < records.length;i++){
					if(records[i].farmerId === farmerId && 
						records[i].farmerTimePeriodId === farmerTimePeriodId){
						$rootScope.$broadcast("help_employement_obj", records[i]);
						record_not_present = false;
						break;
					}		
				}
				if(record_not_present)
					$rootScope.$broadcast("help_employement_obj", {});			
			}).catch(function(err){
				console.error(err);	
				$rootScope.$broadcast("help_employement_obj", {});
			});			
		}).catch(function(err){
			console.error(err);			
			$rootScope.$broadcast("help_employement_obj", {});
		});
	};

	this.fetch_home_object= function(){
		var home_obj = {};
		
		db.get(master_data_doc_name).
		then(function(doc){
			home_obj.countries = doc.countries;
			for(var j = 0; j < home_obj.countries.length;j++){
	  			home_obj.countries[j].index = j;
	  			if(j == 0)
	  				home_obj.countries[j].checked = true;
	  			else
	  				home_obj.countries[j].checked = false;
	  		};
	  		home_obj.states = doc.states;			  		
	  		home_obj.districts = doc.districts;	
	  		home_obj.blocks = doc.blocks;			  		
	  		home_obj.villages = doc.villages;		
	  		home_obj.farmers = doc.farmers;	
		  	$rootScope.$broadcast('home_obj', home_obj);

		}).
		catch(function(err){
			console.error(err);
			$rootScope.$broadcast('home_obj', home_obj);
		});
	};

	this.fetch_main_obj = function(){
		db.get(selected_farmer_doc).
		then(function(doc){
			var farmer_id = doc.farmerId;
			var financial_year = doc.farmerTimePeriodId;
			db.get(txn_data_doc_name).
			then(function(result){

				var records = result.records;
				var record_not_present = true;
				for(var i = 0; i < records.length;i++){
					if(records[i].farmerId === farmer_id && 
						records[i].farmerTimePeriodId === financial_year){
						$rootScope.$broadcast("main_obj", records[i]);
						record_not_present = false;
						break;
					}		
				}
				if(record_not_present)
					$rootScope.$broadcast("main_obj", {});			
			}).catch(function(err){
				console.error(err);	
				$rootScope.$broadcast("main_obj", {});
			});			
		}).catch(function(err){
			console.error(err);			
			$rootScope.$broadcast("main_obj", {});
		});
	};
	
}]);