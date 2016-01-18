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

// Only publish data for the matches we care about. Be careful not to over-publish
Meteor.publish('MatchPointMetrics', function(dateRange) {

  console.log('dateRange',dateRange);

  var sub = this;
  var initializing = true;

  // Define our aggregation pipeline
  var pipeline = [
    {$match : { inquiryDate: {
      $gte: dateRange.startDate,
      $lt: dateRange.endDate
      } }},
    {$match : { source: { $ne: "" } }},//exclude blank source records
    {
      $group: {
        _id: '$source',
        // total: {
        //   $sum: '$teams.totalMatchPoints'
        // },
        // avg: {
        //   $avg: '$teams.totalMatchPoints'
        // },
        value: {
          $sum: 1
        }
      }
    }
  ];

  // Track any changes on the collection we are going to use for aggregation
  var query = Leads.find({});//leagueMatchId: leagueMatchId
  var handle = query.observeChanges({
    added: function (id) {
      // observeChanges only returns after the initial `added` callbacks
      // have run. Until then, we don't want to send a lot of
      // `self.changed()` messages - hence tracking the
      // `initializing` state.
      if (!initializing) {
        runAggregation('changed');
      }
    },
    removed: function (id) {
      runAggregation('changed');
    },
    changed: function (id) {
      runAggregation('changed');
    },
    error: function(err){
      throw new Meteor.Error('Uh oh! something went wrong!', err.message);
    }
  });

  // Instead, we'll send one `self.added()` message right after
  // observeChanges has returned, and mark the subscription as
  // ready.
  initializing = false;
  // Run the aggregation initially to add some data to our aggregation collection
  runAggregation('added');
  // Wrap the aggregation call inside of a function
  // since it will be called more than once
  function runAggregation(action){
    Leads.aggregate(pipeline).forEach(function(e) {
      if(action === 'changed'){
        // Aggregate and update our collection with the new data changes
        sub.changed('InquirySource', e._id, {
          _id: e._id,
          // total: e.total,
          // avg: e.avg,
          value: e.value
        });
      }
      else {
        // Aggregate and then add a new record to our collection
        sub.added('InquirySource', e._id, {
          _id: e._id,
          // total: e.total,
          // avg: e.avg,
          value: e.value
        });
      }
      // Mark the subscription ready
      sub.ready();
    });
  }

  // Stop observing the cursor when client unsubs.
  // Stopping a subscription automatically takes
  // care of sending the client any removed messages.
  sub.onStop(function () {
    handle.stop();
  });
});