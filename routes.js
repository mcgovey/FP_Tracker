Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    name: 'home',
    template: 'home'
});

Router.route('/addLead');

Router.route('/searchLead');

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