import {Template} from 'meteor/templating';

import './traveling.html';

Template.traveling.onRendered(function() {

});

Template.traveling.onCreated(function mainOnCreated() {});

Template.traveling.helpers({
    traveling: function() {
        return [
            'NONE',
            'Not an issue with this event',
            'Allow Extra Time / Reduce Speeds',
            'No Unnecessary Travel Recommended',
            'Near impassable Roads. No Travel Advised',
            'Roads Are Closed',
            'Do Not Cross Flooded Roadways'
        ];
    }
});

Template.traveling.events({
    'click .dropdown-menu li a' (event, instance){
        event.preventDefault();
        if(event.target.parentElement.parentElement.previousElementSibling.previousElementSibling) {
            $(event.target.parentElement.parentElement.previousElementSibling.previousElementSibling).text(event.target.innerHTML);
            $(event.target.parentElement.parentElement.previousElementSibling.previousElementSibling).val(event.target.innerHTML);
        } else {
            $(event.target.parentElement.parentElement.previousElementSibling).text(event.target.innerHTML);
            $(event.target.parentElement.parentElement.previousElementSibling).val(event.target.innerHTML);
        }
    }
});
