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
  }
  // ,
  // aggrResults: function () {
  //   // var metrics = Leads;
  //   // console.log('leads',Leads);
  //   var pipeline = [
  //     {$group: {_id: null, source: {$sum: "$source"}}}
  //   ];
  //   console.log('pipeline',pipeline);
  //   var result = leadMetrics.aggregate(pipeline);
  //   console.log('results',result);
  //   return result;
  // }
});