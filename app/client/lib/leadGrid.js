Meteor.subscribe("leads");

Template.leads.helpers({
	'lead': function(){
		var dateRange = Session.get('dates');

		return Leads.find({ inquiryDate: {
				$gte: dateRange.startDate,
				$lte: dateRange.endDate
			} },
			{sort: {inquiryDate: -1, createdAt: -1}});
	},
	isOwner: function () {
		return this.owner === Meteor.userId();
	}
});

Template.leadItem.helpers({
	'formatDate': function(date) {
		var dateVar = moment(date, 'YYYY-MM-DD').format('M/D/YY');
		return dateVar;
	}
});

