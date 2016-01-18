Template.dateRangeCont.onRendered(function () {
	$('input[name="daterange"]').daterangepicker(
		{
		locale: {
			format: 'MMM D YYYY'
			},
		startDate: moment().startOf('month'),
		endDate: moment()
		}
	);
	var dates = {
		startDate: moment().startOf('month').format('YYYY-MM-DD'),
		endDate: moment().format('YYYY-MM-DD')
	}
	Session.set('dates',dates)
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
	
