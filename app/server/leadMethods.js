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
      }}
    );
    //needs error handling
    return 'success';
  },
  removeLead: function (documentId){
    Leads.remove({ _id: documentId });
  },
  updateDates: function (dateField) {
    Leads.find().forEach(function(el){
        if (el[dateField]) {
          el[dateField]= moment(el[dateField],'MM/DD/YYYY').format('YYYY-MM-DD');
        } else{
          el[dateField]="";
        };

        Leads.update({_id: el._id},{$set: el});

        //Meteor.call("updateDates", "inquiryDate");
        //Meteor.call("updateDates", "expectOrientDate");
        //Meteor.call("updateDates", "followupDate");
        //Meteor.call("updateDates", "orientAttendDate");
        //Meteor.call("updateDates", "appSubmitDate");
        //Meteor.call("updateDates", "homeOpenDate");
        //Meteor.call("updateDates", "appDecisionDate");
    });
  }
});