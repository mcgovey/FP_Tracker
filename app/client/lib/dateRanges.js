Template.dateRangeCont.onRendered(function () {
	
	if (Session.get('dates')) {
		var sessionDate = Session.get('dates');
		var dates = {
			startDate: moment(sessionDate.startDate,'YYYY-MM-DD'),
			endDate: moment(sessionDate.endDate,'YYYY-MM-DD')
		};
		// console.log('exists',sessionDate);
	} else{
		// console.log('does not exist');
		var dates = {
			startDate: moment().startOf('month').subtract(1, 'years'),
			endDate: moment()
		};
	};
	$('input[name="daterange"]').daterangepicker(
		{
		locale: {
			format: 'MMM D YYYY'
			},
		startDate: dates.startDate,
		endDate: dates.endDate
		}
	);
	var formattedDates = {
		startDate: dates.startDate.format('YYYY-MM-DD'),
		endDate: dates.endDate.format('YYYY-MM-DD')
	};
	Session.set('dates',formattedDates);
});

Template.dateRangeCont.events({
	'change #daterange' : function (event) {
		var daterange = $('input[name="daterange"]').val().split(" - ");
		var dates = {
			startDate: moment(daterange[0],'MMM D YYYY').format('YYYY-MM-DD'),
			endDate: moment(daterange[1],'MMM D YYYY').format('YYYY-MM-DD')
		};
		// console.log('dates',dates);
		Session.set('dates',dates);
	}
});
