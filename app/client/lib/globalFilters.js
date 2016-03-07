Template.dateRangeCont.onRendered(function () {
	//check if session variable exists
	var filters = Session.get('globalFilters');
    if (!filters) {
    	filters = updateUndefinedFilter();
    	Session.set('globalFilters',filters);
    };

    //call function to set date filters using date picker
	setDateInputField('daterange','daterange',filters);
	setDateInputField('appDateRange','appDateRange',filters);
	setDateInputField('followDateRange','followDateRange',filters);
	setDateInputField('expectOrientDateRange','expectOrientDateRange',filters);
	setDateInputField('orientDateRange','orientDateRange',filters);
});

Template.dateRangeCont.events({
	// on any change in the input field run the function to update the session var
	'change .dateinput' : function (event) {
		//get the date range from the input box
		var daterange = $('input[name="'+event.target.id+'"]').val().split(" - ");

		//update the dates in the temp filter object to pass to set function
		var dateObj = {
			startDate	: moment(daterange[0],'MMM D YYYY').format('YYYY-MM-DD'),
			endDate		: moment(daterange[1],'MMM D YYYY').format('YYYY-MM-DD')
		};

		// call session variable set func
		filVar = setFilterToggle(event.target.id,dateObj);
		// set the updated session vars to the dates in the inputbox
		Session.set('globalFilters',filVar);
	},
	'click #inqDateSelector button': function (event) {
		var filVar;
		$('#inqDateSelector button').addClass('active').not(event.target).removeClass('active');
		if (event.target.id==="filteredInqDateBtn") {
			$('#daterangeDiv').show('2000');
			filVar = setFilterToggle("inqDateFilter",true);
			Session.set('globalFilters',filVar);
		} else{
			$('#daterangeDiv').hide('2000');
			filVar = setFilterToggle("inqDateFilter",false);
			Session.set('globalFilters',filVar);
		};
	},
	'click #submitSelector button': function (event) {
		var filVar;
		$('#submitSelector button').addClass('active').not(event.target).removeClass('active');
		if (event.target.id==="submittedAppBtn") {
			$('#appSubmitDiv').show('2000');
			filVar = setFilterToggle("appSubmitFilter",true);
			Session.set('globalFilters',filVar);
		} else{
			$('#appSubmitDiv').hide('2000');
			filVar = setFilterToggle("appSubmitFilter",false);
			Session.set('globalFilters',filVar);
		};
	},
	'click #followupSelector button': function (event) {
		var filVar;
		$('#followupSelector button').addClass('active').not(event.target).removeClass('active');
		if (event.target.id==="followupBtn") {
			$('#followupDiv').show('2000');
			filVar = setFilterToggle("followupFilter",true);
			Session.set('globalFilters',filVar);
		} else{
			$('#followupDiv').hide('2000');
			filVar = setFilterToggle("followupFilter",false);
			Session.set('globalFilters',filVar);
		};
	},
	'click #expectOrientSelector button': function (event) {
		var filVar;
		$('#expectOrientSelector button').addClass('active').not(event.target).removeClass('active');
		if (event.target.id==="expectOrientBtn") {
			$('#expectOrientDiv').show('2000');
			filVar = setFilterToggle("expectOrientFilter",true);
			Session.set('globalFilters',filVar);
		} else{
			$('#expectOrientDiv').hide('2000');
			filVar = setFilterToggle("expectOrientFilter",false);
			Session.set('globalFilters',filVar);
		};
	},
	'click #orientSelector button': function (event) {
		var filVar;
		$('#orientSelector button').addClass('active').not(event.target).removeClass('active');
		if (event.target.id==="orientBtn") {
			$('#orientDiv').show('2000');
			filVar = setFilterToggle("orientFilter",true);
			Session.set('globalFilters',filVar);
		} else{
			$('#orientDiv').hide('2000');
			filVar = setFilterToggle("orientFilter",false);
			Session.set('globalFilters',filVar);
		};
	}
});

setFilterToggle = function (field, value) {
	//get session variable
	var filters = Session.get('globalFilters');
    if (!filters) {
    	filters = updateUndefinedFilter();
    };

	//update the dates in the global filter object
	filters[field] = value;
	// set the updated session vars to the dates in the inputbox

	return filters;
};

setDateInputField = function (inputName, varName, filters) {
	// console.log('everything passed:',inputName,varName,filters);
	$('input[name="'+inputName+'"]').daterangepicker(
		{
		locale: {
			format: 'MMM D YYYY'
			},
		startDate: moment(filters[varName].startDate,'YYYY-MM-DD'),
		endDate: moment(filters[varName].endDate,'YYYY-MM-DD')
		}
	);
};