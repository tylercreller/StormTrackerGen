import {Template} from 'meteor/templating';

import './confidence.html';

Template.confidence.onRendered(function() {

});

Template.confidence.onCreated(function mainOnCreated() {});

Template.confidence.helpers({
    confidence: function() {
        return [
            'NONE',
            'Low',
            'Medium',
            'High'
        ];
    }
});

Template.confidence.events({
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
