Meteor.subscribe("leads");

Template.leads.helpers({
	'lead': function(){
		var dateRange = Session.get('dates');

		return Leads.find({ inquiryDate: {
				$gte: dateRange.startDate,
				$lt: dateRange.endDate
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

Template.leadItem.events({
	'click .delete-lead': function(event){
		event.preventDefault();
		var documentId = this._id;
		var confirm = window.confirm("Delete this record?");
		if(confirm){
			var removeRec = Meteor.call("removeLead", documentId);
		}
	}
});