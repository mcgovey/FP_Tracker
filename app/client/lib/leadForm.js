//Default date value to today on load
Template.addLead.onRendered(function() {
  $('.todayDefault').val(new Date().toDateInputValue());
});

//Get session variables for dropdowns then set the drop values
Template.leadForm.onRendered(function() {
  var leadSource = Session.get('clickedSource'),
      leadAppStatus = Session.get('clickedAppStatus');

  $('#leadSource').val(leadSource);
  $('#leadAppStatus').val(leadAppStatus);
});

//helper if user directs to page without clicking from main
Template.editLead.helpers({
  'setDropdownValue': function( dropdownField, dropdownFieldSet ){
    $('#'+dropdownField).val(dropdownFieldSet);

  }
});


Template.leadForm.helpers({
	//values for inquiry source dropdown
	categories: function(){
	  return ["Google", "ACS", "Ad Campaign", "Word of Mouth", "Foster Parent", 
	          "Independent Recruitment Event", "ACS-Sponsored Recruitment Event", 
	          "Child-specific", "Unknown/Other"]
	},
	//values for application status dropdown
	appStatus: function(){
	  return ["Open","Submitted","Closed"]
	}
});

//event for creating a new lead
Template.addLead.events({
	"submit": function (event) {
		event.preventDefault();
		//get all fields from form
		var leadText = getAllFields();

		//call method for insert with fields
		var returnMsg = Meteor.call("addLead",leadText);

		//if insert is successful reset the form then add a success class to the button and change the text
		if(returnMsg='success'){
			$('#newLeadForm')[0].reset();
			$('.createLeadBtn').addClass("btn-success").removeClass("btn-primary").html("New Record Created")
				//after 2 seconds change button back to standard format
				.delay(2000).queue(function(){
					$(this).addClass("btn-primary").removeClass("btn-success").html("Create FP Record").dequeue();
				});
		};
	}
});

Template.editLead.events({
	//on submit of edited lead, call method to update method then return to lead page
	'submit': function(event){
		event.preventDefault();
		var documentId = this._id;
		var leadText = getAllFields();

		var returnMsg = Meteor.call("updateLead", documentId, leadText);
		if(returnMsg='success'){
			Router.go('viewLeads');
		};
	},
	'click .delete-lead': function(event){
		event.preventDefault();
		var documentId = this._id;
		var confirm = window.confirm("Delete this record?");
		if(confirm){
			var removeRec = Meteor.call("removeLead", documentId);
			Router.go('viewLeads');
		}
	}
});

//set session variable for source dropdown
Template.leads.events({
	'click a.clickView': function(event) {
		Session.set('clickedSource',this.source);
		Session.set('clickedAppStatus',this.appStatus);
	}
});


