Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    name: 'home',
    template: 'home'
});

Router.route('/addLead');

Router.route('/searchLead');

Router.route('/analysis');

Router.route('/viewLeads', {
    template: 'leads'
});

Router.route('/lead/:_id', {
    template: 'editLead',
    data: function(){
        var currentLead = this.params._id;
        return Leads.findOne({ _id: currentLead });
    }
});


Router.route('/newCall/:_id',{
    data: function () {
        var currentLead = this.params._id;
        console.log(currentLead);
        return Leads.findOne({_id: currentLead});
    }
});

Router.route('/callHistory/:_id',{
	template : 'callHistory',
	data: function () {
		var currentLead = this.params._id;
        var d = (Calls.findOne({fpID: currentLead})) ? undefined : Leads.findOne({_id: currentLead})
        console.log(d);
		return Calls.findOne({fpID: currentLead});
	}
});

