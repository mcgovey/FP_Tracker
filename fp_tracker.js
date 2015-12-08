Leads = new Mongo.Collection("leads");

if (Meteor.isClient) {
  Meteor.subscribe("leads");

// Template.home.helpers({
//   log: function () {
//     console.log(this);
//   }
// });


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

//Helpers
  Template.leads.helpers({
    'lead': function(){
      return Leads.find({}, {sort: {createdAt: -1}});
    },
    isOwner: function () {
      return this.owner === Meteor.userId();
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


//******************************Helpers not setting on page refresh
  Template.editLead.helpers({
      //helper if user directs to page without clicking from main
      'setDropdownValue': function( dropdownField, dropdownFieldSet ){
        $('#'+dropdownField).val(dropdownFieldSet);

        // if(dropdownField==='leadSource'){
        //   $('#leadSource').val(this.source);
        //   // console.log('second',this.source);
        // } else if(dropdownField==='leadAppStatus'){
        //   $('#leadAppStatus').val(this.appStatus);
        //   // console.log('third',this.appStatus);
        // }
      }
  });

  function getAllFields () {
    var leadText  = {
      name          : $('[name="leadName"]').val(),
      inquiryDate   : $('[name="leadInquiryDate"]').val(),
      source        : $('[name="leadSource"]').val(),
      sourceDetails : $('[name="sourceDetails"]').val(),
      expectOrientDate : $('[name="leadExpectedOrientation"]').val(),
      followupDate : $('[name="leadFollowupDate"]').val(),
      orientAttendDate : $('[name="leadOrientAttendDate"]').val(),
      appSubmitDate : $('[name="leadAppSubmitDate"]').val(),
      appStatus     : $('[name="leadAppStatus"]').val(),
      appDecisionDate : $('[name="leadAppDecisionDate"]').val(),
      reasonDiscont : $('[name="leadReasonDiscont"]').val(),
      homeOpenDate  : $('[name="leadHomeOpenDate"]').val(),
      homeOpenNotes : $('[name="leadHomeOpenNotes"]').val(),
      phoneNum      : $('[name="leadPhoneNum"]').val(),
      email         : $('[name="leadEmail"]').val(),
      streetAddress : $('[name="leadStreetAddress"]').val(),
      borough       : $('[name="leadBorough"]').val(),
      zipCode       : $('[name="leadZipCode"]').val()
    };
    return leadText;
  }

//Events
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

  Template.leads.events({
    //set session variable for source dropdown
    'click a.clickView': function(event) {
      Session.set('clickedSource',this.source);
      Session.set('clickedAppStatus',this.appStatus);
    }
  });
}


Meteor.methods({
  addLead: function (text) {
    Leads.insert({
      name          : text.name,
      inquiryDate   : text.inquiryDate,
      source        : text.source,
      sourceDetails : text.sourceDetails,
      expectOrientDate: text.expectOrientDate,
      followupDate  : text.followupDate,
      orientAttendDate: text.orientAttendDate,
      appSubmitDate : text.appSubmitDate,
      appStatus     : text.appStatus,
      appDecisionDate : text.appDecisionDate,
      reasonDiscont : text.reasonDiscont,
      homeOpenDate  : text.homeOpenDate,
      homeOpenNotes : text.homeOpenNotes,
      phoneNum      : text.phoneNum,
      email         : text.email,
      streetAddress : text.streetAddress,
      borough       : text.borough,
      zipCode       : text.zipCode,
      lastMod       : new Date(),
      createdAt     : new Date()
      // ,owner       : Meteor.userId(),
      // ownerEmail  : Meteor.user().emails[0].address
    });
    //needs error handling
    return 'success';
  },
  updateLead: function (documentId, text) {
    Leads.update({ 
        _id: documentId 
      }, {$set: { 
      name          : text.name,
      inquiryDate   : text.inquiryDate,
      source        : text.source,
      sourceDetails : text.sourceDetails,
      expectOrientDate: text.expectOrientDate,
      followupDate  : text.followupDate,
      orientAttendDate: text.orientAttendDate,
      appSubmitDate : text.appSubmitDate,
      appStatus     : text.appStatus,
      appDecisionDate : text.appDecisionDate,
      reasonDiscont : text.reasonDiscont,
      homeOpenDate  : text.homeOpenDate,
      homeOpenNotes : text.homeOpenNotes,
      phoneNum      : text.phoneNum,
      email         : text.email,
      streetAddress : text.streetAddress,
      borough       : text.borough,
      zipCode       : text.zipCode,
      lastMod       : new Date()
      // ,owner       : Meteor.userId(),
      // ownerEmail  : Meteor.user().emails[0].address
      }}
    );
    //needs error handling
    return 'success';
  },
  removeLead: function (documentId){
    Leads.remove({ _id: documentId });
  }
});


if (Meteor.isServer) {
  Meteor.publish("leads", function () {
    return Leads.find({},{inquiryDate:-1});
  });
}

