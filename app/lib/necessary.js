Date.prototype.toDateInputValue = (function() {
      var local = new Date(this);
      local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
      return local.toJSON().slice(0,10);
  });

getGlobalFilterForMongo = function (filterObj) {
	var returnObj = { inquiryDate: {
				$gte: filterObj.dates.startDate,
				$lte: filterObj.dates.endDate
			} };
	return returnObj;
};

updateUndefinedFilter = function () {
	var filters, sessionFilters;
	if (Session.get('globalFilters')) {
		//get session variable
		sessionFilters = Session.get('globalFilters');
		//convert to moment format
		filters = {
			dates: {
				startDate: moment(sessionFilters.dates.startDate,'YYYY-MM-DD').format('YYYY-MM-DD'),
				endDate: moment(sessionFilters.dates.endDate,'YYYY-MM-DD').format('YYYY-MM-DD')
			}
		};
	} else{
		// if session var doesn't exist set to standard dates
		filters = {
			dates: {
				startDate: moment().startOf('month').subtract(1, 'years').format('YYYY-MM-DD'),
				endDate: moment().format('YYYY-MM-DD')
			}
		};
	};

	return filters;
};