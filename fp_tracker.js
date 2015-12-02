Leads = new Mongo.Collection("leads");

if (Meteor.isClient) {
  Meteor.subscribe("leads");


  Template.leads.helpers({
    'lead': function(){
      return Leads.find({}, {sort: {createdAt: -1}});
    },
    isOwner: function () {
      return this.owner === Meteor.userId();
    }
  });

  Template.leadForm.helpers({
      setDropdownValue: function(){
        $('[name="leadSource"]').val(this.source);
      }

      // 'checked': function(){
          
      //     // var checkedVal = Leads.find({ _id: this._id }).fetch()[0].source;

      //     // $('[name="leadSource"] [val='+checkedVal+']').checked
      //     console.log("this",this);
      //     // var isCompleted = this.checked;
      //     // if(isCompleted){
      //     //     return "checked";
      //     // } else {
      //     //     return "";
      //     // }

      //     //:checked

      //     // $('[name="leadSource"]:input:radio').each(function() {
      //     //   var checked = this.value;
      //     //   console.log('values',checked);
      //     // });
      //     // return 'checked';
      // }
  });



  Template.addLead.onRendered(function() {
      $('.todayDefault').val(new Date().toDateInputValue());
  });
  Template.addLead.events({
    "submit": function (event) {
        event.preventDefault();
        var leadText  = {
            name          : $('[name="leadName"]').val(),
            inquiryDate   : $('[name="leadInquiryDate"]').val(),
            source        : $('[name="leadSource"]').val(),
            sourceDetails : $('[name="sourceDetails"]').val()
          };

        // console.log('leadText:',leadText);
        Meteor.call("addLead",leadText);
        $('#newLeadForm')[0].reset();
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

      Meteor.call("updateLead", documentId, leadText);
      }
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
  }
});


if (Meteor.isServer) {
  Meteor.publish("leads", function () {
    return Leads.find({},{inquiryDate:-1});
  });
}

