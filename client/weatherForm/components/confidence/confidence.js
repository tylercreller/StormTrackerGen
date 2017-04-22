import {Template} from 'meteor/templating';

import './confidence.html';

Template.confidence.onRendered(function() {

});

Template.confidence.onCreated(function mainOnCreated() {});

Template.confidence.helpers({
    confidence: function() {
        return [
            'NONE',
            'LOW',
            'MEDIUM',
            'HIGH'
        ];
    }
});

Template.confidence.events({
    'click .dropdown-menu li a' (event, instance){
        event.preventDefault();
        $(event.target.parentElement.parentElement.previousElementSibling).text(event.target.innerHTML);
        $(event.target.parentElement.parentElement.previousElementSibling).val(event.target.innerHTML);
    }
});
