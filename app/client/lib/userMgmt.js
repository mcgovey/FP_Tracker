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
                $('#registerModalDiv').modal('toggle'); // Redirect user if registration succeeds
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
                // console.log(error.reason);
                var msg =   '<div id="loginAlert"  class="alert alert-danger"><strong>Uh oh!</strong> '+error.reason;
                    msg +=  '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a></div>';
                // console.log(msg);
                $('#loginModalBody').prepend(msg);
            } else {
                $('#loginModalDiv').modal('toggle');
            }
        });
    }
});


Template.navigation.helpers({
	//function used to check if the user is logged in
	'currentUserCust': function () {
		//call authentication method
		var userStatus = authedUserCheck();
		return userStatus;
	}
});
