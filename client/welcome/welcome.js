import {Template} from 'meteor/templating';

import './welcome.html';

Template.welcome.onCreated(function mainOnCreated() {});

Template.welcome.helpers({});

Template.welcome.events({
    'click .login'(event, instance) {

        Meteor.loginWithFacebook({
            requestPermissions: [
                'user_friends',
                'public_profile',
                'email',
                'publish_pages',
                'manage_pages'
            ]
        }, (err) => {
            if (err) {
                // handle error
            } else {
                // successful login!
            }
        });
    }
});
