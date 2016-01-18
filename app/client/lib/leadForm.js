//OnRender Activities
Template.addLead.onRendered(function() {
  $('.todayDefault').val(new Date().toDateInputValue());
});
Template.leadForm.onRendered(function() {
  var leadSource = Session.get('clickedSource'),
      leadAppStatus = Session.get('clickedAppStatus');

  $('#leadSource').val(leadSource);
  $('#leadAppStatus').val(leadAppStatus);
});

Template.editLead.helpers({
  //helper if user directs to page without clicking from main
  'setDropdownValue': function( dropdownField, dropdownFieldSet ){
    $('#'+dropdownField).val(dropdownFieldSet);

  }
});

Template.leadForm.helpers({
	categories: function(){
	  return ["Google", "ACS", "Ad Campaign", "Word of Mouth", "Foster Parent", 
	          "Independent Recruitment Event", "ACS-Sponsored Recruitment Event", 
	          "Child-specific", "Unknown/Other"]
	},
	appStatus: function(){
	  return ["Open","Submitted","Closed"]
	}
});

Template.addLead.events({
	"submit": function (event) {
		event.preventDefault();
		var leadText = getAllFields();

		var returnMsg = Meteor.call("addLead",leadText);

		if(returnMsg='success'){
		$('#newLeadForm')[0].reset();
		$('.createLeadBtn').addClass("btn-success").removeClass("btn-primary").html("New Record Created")
			.delay(2000).queue(function(){
				$(this).addClass("btn-primary").removeClass("btn-success").html("Create FP Record").dequeue();
			});
		};
	}
});

Template.editLead.events({
	'submit': function(event){
		event.preventDefault();
		var documentId = this._id;
		var leadText = getAllFields();

		var returnMsg = Meteor.call("updateLead", documentId, leadText);
		if(returnMsg='success'){
			Router.go('viewLeads');
		};
	}
});

Template.leads.events({
//set session variable for source dropdown
	'click a.clickView': function(event) {
		Session.set('clickedSource',this.source);
		Session.set('clickedAppStatus',this.appStatus);
	}
});


