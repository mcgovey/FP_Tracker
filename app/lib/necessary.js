Date.prototype.toDateInputValue = (function() {
      var local = new Date(this);
      local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
      return local.toJSON().slice(0,10);
  });

getGlobalFilterForMongo = function (filterObj) {
	var returnObj = {};
	if (filterObj.inqDateFilter) {
		returnObj["inquiryDate"]= {
				$gte: filterObj.daterange.startDate,
				$lte: filterObj.daterange.endDate
			};
	};
	if (filterObj.appSubmitFilter) {
		returnObj["appSubmitDate"]= {
				$gte: filterObj.appDateRange.startDate,
				$lte: filterObj.appDateRange.endDate
			};
	};
	if (filterObj.followupFilter) {
		returnObj["followupDate"]= {
				$gte: filterObj.followDateRange.startDate,
				$lte: filterObj.followDateRange.endDate
			};
	};
	if (filterObj.expectOrientFilter) {
		returnObj["expectOrientDate"]= {
				$gte: filterObj.expectOrientDateRange.startDate,
				$lte: filterObj.expectOrientDateRange.endDate
			};
	};
	if (filterObj.orientFilter) {
		returnObj["orientAttendDate"]= {
				$gte: filterObj.orientDateRange.startDate,
				$lte: filterObj.orientDateRange.endDate
			};
	};
	// console.log('returnObj',returnObj);
	return returnObj;
};

updateUndefinedFilter = function () {
	var filters;
	if (Session.get('globalFilters')) {
		//get session variable
		filters = Session.get('globalFilters');

	} else{
		// if session var doesn't exist set to standard dates
		filters = {
			daterange: {
				startDate: moment().startOf('month').subtract(1, 'years').format('YYYY-MM-DD'),
				endDate: moment().format('YYYY-MM-DD')
			},
			appDateRange: {
				startDate: moment().startOf('month').subtract(1, 'years').format('YYYY-MM-DD'),
				endDate: moment().format('YYYY-MM-DD')
			},
			followDateRange: {
				startDate: moment().startOf('month').subtract(1, 'years').format('YYYY-MM-DD'),
				endDate: moment().format('YYYY-MM-DD')
			},
			expectOrientDateRange: {
				startDate: moment().startOf('month').subtract(1, 'years').format('YYYY-MM-DD'),
				endDate: moment().format('YYYY-MM-DD')
			},
			orientDateRange: {
				startDate: moment().startOf('month').subtract(1, 'years').format('YYYY-MM-DD'),
				endDate: moment().format('YYYY-MM-DD')
			},
			inqDateFilter	: true,
			appSubmitFilter	: false,
			followupFilter	: false,
			expectOrientFilter	: false,
			orientFilter	: false
		};
	};

	return filters;
};

authedUserCheck = function () {
	//check for user name - use ternary operator for when this function runs before full page load
	var authedUser = Meteor.user() ? Meteor.user().loginStateSignedUp : " ";
	// confirm that account is real
	if (authedUser) {
		// console.log('real account');
		return true;
	} else if (!authedUser) {
		// console.log('guest account');
		return false;
	};
}