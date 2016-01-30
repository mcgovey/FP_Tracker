var getAllFields = function () {
	var leadText  = {
		name          : $('[name="leadName"]').val(),
		inquiryDate   : $('[name="leadInquiryDate"]').val(),
		source        : $('[name="leadSource"]').val(),
		sourceDetails : $('[name="sourceDetails"]').val(),
		expectOrientDate : $('[name="leadExpectedOrientation"]').val(),
		followupDate  : $('[name="leadFollowupDate"]').val(),
		orientAttendDate : $('[name="leadOrientAttendDate"]').val(),
		appSubmitDate : $('[name="leadAppSubmitDate"]').val(),
		// appStatus     : $('[name="leadAppStatus"]').val(),
		appDecisionDate : $('[name="leadAppDecisionDate"]').val(),
		reasonDiscont : $('[name="leadReasonDiscont"]').val(),
		homeOpenDate  : $('[name="leadHomeOpenDate"]').val(),
		homeOpenNotes : $('[name="leadHomeOpenNotes"]').val(),
		phoneNum      : $('[name="leadPhoneNum"]').val(),
		altPhoneNum	  : $('[name="leadAltPhoneNum"]').val(),
		email         : $('[name="leadEmail"]').val(),
		// streetAddress : $('[name="leadStreetAddress"]').val(),
		borough       : $('[name="leadBorough"]').val()
		// ,zipCode       : $('[name="leadZipCode"]').val()
	};
	return leadText;
};

