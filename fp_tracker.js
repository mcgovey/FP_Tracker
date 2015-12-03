Leads = new Mongo.Collection("leads");

if (Meteor.isClient) {
  Meteor.subscribe("leads");
//OnRender Activities
  Template.addLead.onRendered(function() {
      $('.todayDefault').val(new Date().toDateInputValue());
  });
  Template.leadForm.onRendered(function() {
      var leadSource = Session.get('clickedSource');
      // console.log('leadprint',leadSource);
      $('#leadSource').val(leadSource);
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
    }
  });

//   Template.leadForm.helpers({
//   log: function () {
//     console.log(this);
//   }
// });

//Events
  Template.addLead.events({
    "submit": function (event) {
      event.preventDefault();
      var leadText  = {
          name          : $('[name="leadName"]').val(),
          inquiryDate   : $('[name="leadInquiryDate"]').val(),
          source        : $('[name="leadSource"]').val(),
          sourceDetails : $('[name="sourceDetails"]').val()
        };

      var returnMsg = Meteor.call("addLead",leadText);

      // if(returnMsg='success'){
        $('#newLeadForm')[0].reset();
      // };
    }
  });
  Template.editLead.events({
    'submit': function(event){
      event.preventDefault();
      var documentId = this._id;
      var leadText  = {
            name          : $('[name="leadName"]').val(),
            inquiryDate   : $('[name="leadInquiryDate"]').val(),
            source        : $('[name="leadSource"]').val(),
            sourceDetails : $('[name="sourceDetails"]').val()
          };

      var returnMsg = Meteor.call("updateLead", documentId, leadText);
      if(returnMsg='success'){
        Router.go('viewLeads')
      };
    }
        
  });
  Template.leads.events({
    'click a.clickView': function(event) {
      // console.log('clicked:',this.source);
      Session.set('clickedSource',this.source);
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
      lastMod       : new Date(),
      createdAt     : new Date()
      // ,owner       : Meteor.userId(),
      // ownerEmail  : Meteor.user().emails[0].address
    });
  },
  updateLead: function (documentId, text) {
    Leads.update({ 
        _id: documentId 
      }, {$set: { 
      name          : text.name,
      inquiryDate   : text.inquiryDate,
      source        : text.source,
      sourceDetails : text.sourceDetails,
      lastMod       : new Date()
      // ,owner       : Meteor.userId(),
      // ownerEmail  : Meteor.user().emails[0].address
      }}
    );
    //still needs error handling
    return 'success';
  }
});


if (Meteor.isServer) {
  Meteor.publish("leads", function () {
    return Leads.find({},{inquiryDate:-1});
  });
}

