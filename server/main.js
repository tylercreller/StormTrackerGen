import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('alerts', function(query, options) {
    return Alerts.find(query, options);
});