Date.prototype.toDateInputValue = (function() {
      var local = new Date(this);
      local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
      return local.toJSON().slice(0,10);
  });

getGlobalFilterForMongo = function (filterObj) {
	var returnObj = { inquiryDate: {
				$gte: filterObj.dates.startDate,
				$lte: filterObj.dates.endDate
			}
	};
	if (filterObj.appSubmitFilter) {
		returnObj["appSubmitDate"] = {$ne: ""};
	};
	if (filterObj.followupFilter) {
		returnObj["followupDate"] = {$ne: ""};
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
			dates: {
				startDate: moment().startOf('month').subtract(1, 'years').format('YYYY-MM-DD'),
				endDate: moment().format('YYYY-MM-DD')
			},
			appSubmitDate: false,
			followupDate: false
		};
	};

	return filters;
};