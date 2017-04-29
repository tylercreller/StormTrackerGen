import {Template} from 'meteor/templating';

import './powerOutage.html';

Template.powerOutage.onRendered(function() {

});

Template.powerOutage.onCreated(function mainOnCreated() {});

Template.powerOutage.helpers({
    powerOutage: function() {
        return [
            'NONE',
            'Isolated',
            'Scattered',
            'Widespread',
            'Most Will Lose Power At Some Point'
        ];
    }
});

Template.powerOutage.events({
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
