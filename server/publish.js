Meteor.publish("leads", function () {
  return Leads.find({},{inquiryDate:-1});
});
Meteor.publish("theCallLog", function () {
  return Calls.find({});
});

Meteor.startup(function() {
  return Meteor.methods({
    removeAllPosts: function() {
      return Leads.remove({});
    }
  });
});