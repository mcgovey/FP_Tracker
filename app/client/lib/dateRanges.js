Template.dateRangeCont.onRendered(function () {
	//check if session variable exists
	if (Session.get('dates')) {
		//get session variable
		var sessionDate = Session.get('dates');
		//convert to moment format
		var dates = {
			startDate: moment(sessionDate.startDate,'YYYY-MM-DD'),
			endDate: moment(sessionDate.endDate,'YYYY-MM-DD')
		};
	} else{
		// if session var doesn't exist set to standard dates
		var dates = {
			startDate: moment().startOf('month').subtract(1, 'years'),
			endDate: moment()
		};
	};

	// for the input date range, use the daterangepicker function from the so-named library
	$('input[name="daterange"]').daterangepicker(
		{
		locale: {
			format: 'MMM D YYYY'
			},
		startDate: dates.startDate,
		endDate: dates.endDate
		}
	);
	// reformat dates into format that will be readable by mongo
	var formattedDates = {
		startDate: dates.startDate.format('YYYY-MM-DD'),
		endDate: dates.endDate.format('YYYY-MM-DD')
	};
	// set the variable
	Session.set('dates',formattedDates);
});

Template.dateRangeCont.events({
	// on any change in the input field run the function to update the session var
	'change #daterange' : function (event) {
		var daterange = $('input[name="daterange"]').val().split(" - ");
		var dates = {
			startDate: moment(daterange[0],'MMM D YYYY').format('YYYY-MM-DD'),
			endDate: moment(daterange[1],'MMM D YYYY').format('YYYY-MM-DD')
		};
		// set the updated session vars to the dates in the inputbox
		Session.set('dates',dates);
	}
});
