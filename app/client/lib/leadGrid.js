Meteor.subscribe("leads");

Template.leads.helpers({
	'lead': function(){
		// var dateRange = Session.get('dates');
		var appFilters = Session.get('globalFilters');
		var monFilterString = getGlobalFilterForMongo(appFilters);

		return Leads.find(
			monFilterString,
			{sort: {inquiryDate: -1, createdAt: -1}});
	},
	isOwner: function () {
		return this.owner === Meteor.userId();
	}
});

Template.leadItem.helpers({
	'formatDate': function(date) {
		var dateVar;
		if (date) {
			dateVar = moment(date, 'YYYY-MM-DD').format('M/D/YY');
		} else{
			dateVar = "";
		};
		return dateVar;
	}
});

Template.main.helpers({
	'loginPopup': function () {
		var userStatus = authedUserCheck();
		// console.log(userStatus);
		if (!userStatus) {
			$('#loginModalDiv').modal('show');
			return false;
		} else {
			return true;
		};
	}
});