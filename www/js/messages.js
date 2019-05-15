var txn_data_doc_name = "txn_data";
var master_data_doc_name = 'mst_data';
var back_button_event_doc_name = 'back_button_event';


// var server_url = 'http://devserver.sdrc.co.in:8080/CottonConnect/';
// var server_url = 'http://192.168.1.36:8095/CottonConnect/';
// var server_url = 'http://192.168.1.107:8088/CottonConnect/';
// var server_url = 'http://192.168.1.116:8088/CottonConnect/';
 var server_url = 'http://115.112.237.130:8080/CottonConnect/';



var logged_in=false;
var selected_farmer_doc = 'selected_farmer';
var toastPosition = 'center';
var toastLDuration = 'long';
var toastSDuration = 'short';


//var checkInternetURL = server_url +'txnWebService';
 var checkInternetURL = 'http://www.google.com';

var gbl_land_details_Obj="land_details_obj";
var gbl_help_employment_Obj="help_employement_obj";
var gbl_irrigation_details_Obj="irrigation_details_obj";
var gbl_manure_application_Obj="manure_obj";
var gbl_soil_preparation_Obj="soil_prep_cost_obj";
var gbl_sowing_cost_Obj="sowing_cost_obj";
var gbl_water_use_Obj="water_use_obj";
var gbl_weeding_details_Obj="weeding_details_Obj";
var gbl_cotton_picking_harvesting_Obj="cotton_picking_harvesting_Obj";

var msg_check_for_submit="Land details data submission is required for this action.<br> Please submit the land details data and try again.";
var msg_submit_confirmation="Once submitted, no further modifications are allowed.<br>Are you sure you want to submit?";
var msg_area_field_validation="Total organic area should not be greater than total area.";
var msg_organic_area_field_validation="The area entered should not be greater than total organic area.";
var msg_organic_total_area_field_validation="The area(sum) entered should not be greater than total organic area.";
var msg_organic_total_area_field_validation_new="The area(sum) entered should be equal with total organic area.";
var msg_landarea_field_validation="The Land area should not be greater than total organic area.";
var msg_number_field_validation="Please enter a valid number.";
var msg_gps_enable="Please ensure that the GPS is enabled in your device.";
var msg_invalid_credetial="Invalid username or password!";
var msg_server_not_found="There was an error while connecting to the server.<br>Please contact the support team if you may need any further assistance";
var msg_login_default="Error status : ";
var msg_login_timeout="Connection timed out, please try again later.";
var msg_no_farmer_assigned = "No farmer assigned to this user!";
var msg_incomplte_deatils="Total area and total organic area are mandatory fields.";
var msg_labour_related_num_field="Please enter a number between 0 to 100.";
var msg_land_details_related_field="Please ensure land details section has been submitted before submitting this process.";
var msg_check_internet_connection = "Please check your internet connection";
var msg_user_data_replace = "The existing data will be erased if you proceed. </br> Are you sure you wish to continue?";
var msg_invalid_decimal = "Please enter a valid decimal number.<br> e.g: 000.00";
var msg_invalid_decimal_5 = "Please enter a valid decimal number.<br> e.g: 000000000.00";
var two_digit_validation="Please enter a valid number.<br> e.g: 00";
var three_digit_validation="Please enter a valid number.<br> e.g: 000";
var four_digit_validation="Please enter a valid number.<br> e.g: 0000";
var four_two_validation="Please enter a valid number.<br> e.g: 0000.00";
var msg_invalid_decimal_1="Please enter a valid number.<br> e.g: 00.00";
var msg_invalid_decimal_2="Please enter a valid number.<br> e.g: 0.00";
var msg_invalid_decimal_3="Please enter a valid number.<br> e.g: 000000.00";
var msg_invalid_decimal_4="Please enter a valid number.<br> e.g: 00000";
var msg_invalid_decimal_6="Please enter a valid number.<br> e.g: 00000.00";
var msg_area_not_filled = 'Operational farm area is a required field. Please provide this value before saving.';
var msg_farm_area_not_filled = 'Farm area is a required field. Please provide this value before saving.';
var msg_area_ha_not_filled = 'Area is a required field. Please provide this value before saving.';
var msg_cotton_area_not_filled = 'Cotton area irrigated is a required field. Please provide this value before saving.';
var msg_field_area_not_filled = 'Field/Area covered is a required field. Please provide this value before saving.';
var msg_land_area_not_filled = 'Land area is a required field. Please provide this value before saving.';
var msg_others_mandatory='This field is mandatory and will take only text, number and space. Please provide this value.';
var msg_same_maincrop_and_intercrop='you can not choose same crop for main crop and inter crop!';
var msg_sync_process_complete='Sync process has been completed.';
var land_details_synced_msg = 'Land details for this farmer has already been synced and you are provided with the total area and total organic area values!';
var landDetailProcessId=1
var helpEmploymentOnOrganicProcessId=2
var landPreparationDetailProcessId=3
var seedSowingProcessId=4
var electricPumpWaterUseProcessId=5
var irrigationDetailProcessId=6
var manureApplicationDetailProcessId=7
var landAndIrrigationDetailProcessId=8
var weedingDetailProcessId = 9
var estimationOfProductionProcessId = 10
var cottonPickingHarvestingRecordProcessId = 11
var trainingMeetingFarmerProcessId = 12
var bioPesticideDetailsProcessId = 13
var bestPracticesProcessId = 14
var laborRecordsProcessId = 15
var sellingAndOtherSourceOfIncomeProcessId = 16
var sustainablePracticesProcessId = 17
var otherInformationAdditionalDetailProcessId = 18
var otherInformationAssetOwnershipProcessId = 19
var otherInformationCottonCropDetailProcessId = 20
var otherInformationEducationalAndHousingDetailsProcessId = 21
var otherInformationFarmerHouseholdDetailsProcessId = 22
var otherInformationLandHoldingDetailsProcessId = 23
var otherInformationLiveStockAndCattleOwnershipProcessId = 24
var trainingFarmerProcessId = 25;

var otherNameOfCropId = 83;
var otherSeedTreatmentId = 33;
var otherManureNameId = 56;
var otherPesticidesNameId = 144;
var otherTargetPestNameId = 167;
var otherPracticesId = 235;
var meetingTypeId = 292;
var trainingTypeId = 293;

var land_details_submit_flag = false;
var currentFarmerwiseData={};

var currentSyncStatusObj={};