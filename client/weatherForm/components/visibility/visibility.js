import {Template} from 'meteor/templating';

import './visibility.html';

Template.visibility.onRendered(function() {

});

Template.visibility.onCreated(function mainOnCreated() {});

Template.visibility.helpers({
    visibility: function() {
        return [
            'NONE',
            'Not an issue with this event',
            'Occasionally Reduced',
            'Somewhat Reduced',
            'Greatly Reduced',
            'Impossible to see'
        ];
    }
});

Template.visibility.events({
    'click .dropdown-menu li a' (event, instance){
        event.preventDefault();
        $(event.target.parentElement.parentElement.previousElementSibling).text(event.target.innerHTML);
        $(event.target.parentElement.parentElement.previousElementSibling).val(event.target.innerHTML);
    }
});
