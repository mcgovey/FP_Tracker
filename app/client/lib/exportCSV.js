
Template.leads.events({
	'click .btnRawCSV' : function() {
	    Router.go('exportSelections');
	}
});


Template.exportSelections.events({
	'click .exportBtn' : function() {
	    var rawData = Leads.find({},{fields: { _id: 0 }}).fetch();
	    csv = Papa.unparse(rawData);//json2csv( rawData, true, true );
	    var blob = new Blob([csv], {type: "text/plain;charset=utf-8;",});

	    saveAs(blob, "allfp.csv");    
	}
});