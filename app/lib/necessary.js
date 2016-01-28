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