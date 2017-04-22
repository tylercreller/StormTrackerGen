import {Template} from 'meteor/templating';

import './intensity.html';

Template.intensity.onRendered(function() {

});

Template.intensity.onCreated(function mainOnCreated() {});

Template.intensity.helpers({
    intensity: function() {
        return [
            'NONE',
            'Minor',
            'Moderate',
            'Major',
            'Significant',
            'Severe'
        ];
    }
});

Template.intensity.events({
    'click .dropdown-menu li a' (event, instance){
        event.preventDefault();
        $(event.target.parentElement.parentElement.previousElementSibling).text(event.target.innerHTML);
        $(event.target.parentElement.parentElement.previousElementSibling).val(event.target.innerHTML);
    }
});
