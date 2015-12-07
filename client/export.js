Template.export.onCreated( () => {
  Template.instance().subscribe( 'profile' );
});

Template.export.events({
  'click .export-data' ( event, template ) {
    $( event.target ).button( 'loading' );

    let user        = Meteor.user(),
        fileName    = `${user.profile.name.first} ${user.profile.name.last}`,
        profileHtml = Modules.client.getProfileHTML();

    Meteor.call( 'exportData', profileHtml, ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'warning' );
      } else {
        if ( response ) {
          // We'll handle the download here.
        }
      }
    });
  }
});