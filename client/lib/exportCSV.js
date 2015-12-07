
Template.leads.events({
	'click .btnRawCSV' : function() {
	    var rawData = Leads.find({}).fetch();
	    csv = Papa.unparse(rawData);//json2csv( rawData, true, true );
	    var blob = new Blob([csv], {type: "text/plain;charset=utf-8;",});

	    saveAs(blob, "allfp.csv");    
	}
});