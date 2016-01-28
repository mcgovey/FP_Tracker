
Template.leads.events({
	'click .btnRawCSV' : function() {
	    // Router.go('exportSelections');
		var appFilters = Session.get('globalFilters');
		var monFilterString = getGlobalFilterForMongo(appFilters);

	    var rawData = Leads.find(
	    	monFilterString
	    	,{fields: { _id: 0 }}).fetch();
	    csv = Papa.unparse(rawData);//json2csv( rawData, true, true );
	    var blob = new Blob([csv], {type: "text/plain;charset=utf-8;",});

	    saveAs(blob, "fosterparents.csv"); 	    
	}
});


// Template.exportSelections.events({
// 	'click .exportBtn' : function() {
// 		var dateRange = Session.get('dates');
// 	    var rawData = Leads.find({ inquiryDate: {
// 				$gte: dateRange.startDate,
// 				$lt: dateRange.endDate
// 			} },{fields: { _id: 0 }}).fetch();
// 	    csv = Papa.unparse(rawData);//json2csv( rawData, true, true );
// 	    var blob = new Blob([csv], {type: "text/plain;charset=utf-8;",});

// 	    saveAs(blob, "allfp.csv");    
// 	}
// });