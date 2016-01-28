Template.dateRangeCont.onRendered(function () {
	//check if session variable exists
	if (Session.get('globalFilters')) {
		//get session variable
		var sessionFilters = Session.get('globalFilters');
		//convert to moment format
		var filters = {
			dates: {
				startDate: moment(sessionFilters.dates.startDate,'YYYY-MM-DD'),
				endDate: moment(sessionFilters.dates.endDate,'YYYY-MM-DD')
			}
		};
	} else{
		// if session var doesn't exist set to standard dates
		var filters = {
			dates: {
				startDate: moment().startOf('month').subtract(1, 'years'),
				endDate: moment()
			}
		};
	};

	// for the input date range, use the daterangepicker function from the so-named library
	$('input[name="daterange"]').daterangepicker(
		{
		locale: {
			format: 'MMM D YYYY'
			},
		startDate: filters.dates.startDate,
		endDate: filters.dates.endDate
		}
	);
	// reformat dates into format that will be readable by mongo
	var formattedFilters = {
		dates: {
			startDate: filters.dates.startDate.format('YYYY-MM-DD'),
			endDate: filters.dates.endDate.format('YYYY-MM-DD')
		}
	};
	// set the variable
	Session.set('globalFilters',formattedFilters);
});

Template.dateRangeCont.events({
	// on any change in the input field run the function to update the session var
	'change #daterange' : function (event) {
		//get the date range from the input box
		var daterange = $('input[name="daterange"]').val().split(" - ");

		//get session variable
		var filters = Session.get('globalFilters');

		//update the dates in the global filter object
		filters.dates.startDate = moment(daterange[0],'MMM D YYYY').format('YYYY-MM-DD');
		filters.dates.endDate 	= moment(daterange[1],'MMM D YYYY').format('YYYY-MM-DD');

		// set the updated session vars to the dates in the inputbox
		Session.set('globalFilters',filters);
	}
});

