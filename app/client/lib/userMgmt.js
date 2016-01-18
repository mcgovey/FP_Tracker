Template.registerModal.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        }, function(error){
            if(error){
                console.log(error.reason); // Output error if registration fails
            } else {
                Router.go("home"); // Redirect user if registration succeeds
            }
        });
        Meteor.loginWithPassword(email, password);
        $('#registerModalDiv').modal('toggle');
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
        
        Meteor.loginWithPassword(email, password, function(error){
		    if(error){
		        console.log(error.reason);
		    } else {
		        $('#loginModalDiv').modal('toggle');
		    }
		});
    }
});

Template.navigation.helpers({
	//function used to check if the user is logged in
	'currentUserCust': function () {
		//check for user name - use ternary operator for when this function runs before full page load
		var authedUser = Meteor.user() ? Meteor.user().loginStateSignedUp : " ";
		// confirm that account is real
		if (authedUser) {
			// console.log('real account');
			return true;
		} else if (!authedUser) {
			// console.log('guest account');
			return false;
		};
		
	}
});
