Template.registerModal.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        });
        Router.go('home');
    }
});

Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.loginModal.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password);
    }
});

Template.navigation.helpers({
	//function used to check if the user is logged in
	'currentUserCust': function () {
		//check for user name - use ternary operator for when this function runs before full page load
		var theUserName = Meteor.user() ? Meteor.user().username : "";
		if (theUserName.substring(0,6)==="guest-") {
			console.log('guest account');
			return false;
		} else{
			console.log('real account');
			return true;
		};
		
	}
});
