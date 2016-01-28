Template.dateRangeCont.onRendered(function () {
	Tracker.autorun(function(){
		//check if session variable exists
		var filters = Session.get('globalFilters');
	    if (!filters) {
	    	filters = updateUndefinedFilter();
	    };

		// reformat dates into format that will be readable by mongo
		var formattedFilters = {
			dates: {
				startDate: filters.dates.startDate,
				endDate: filters.dates.endDate
			}
		};

		// set the variable
		Session.set('globalFilters',formattedFilters);

		// for the input date range, use the daterangepicker function from the respective library
		$('input[name="daterange"]').daterangepicker(
			{
			locale: {
				format: 'MMM D YYYY'
				},
			startDate: moment(filters.dates.startDate,'YYYY-MM-DD'),
			endDate: moment(filters.dates.endDate,'YYYY-MM-DD')
			}
		);
	});
});

Template.dateRangeCont.events({
	// on any change in the input field run the function to update the session var
	'change #daterange' : function (event) {
		//get the date range from the input box
		var daterange = $('input[name="daterange"]').val().split(" - ");

		//get session variable
		var filters = Session.get('globalFilters');
	    if (!filters) {
	    	filters = updateUndefinedFilter();
	    };

		//update the dates in the global filter object
		filters.dates.startDate = moment(daterange[0],'MMM D YYYY').format('YYYY-MM-DD');
		filters.dates.endDate 	= moment(daterange[1],'MMM D YYYY').format('YYYY-MM-DD');

		// set the updated session vars to the dates in the inputbox
		Session.set('globalFilters',filters);
	}
	,'click #submitSelector button': function (event) {
		// console.log(event);
		$('#submitSelector button').addClass('active').not(event.target).removeClass('active');
	}
});

