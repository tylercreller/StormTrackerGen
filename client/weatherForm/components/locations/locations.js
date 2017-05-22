import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import './locations.html';

Template.locations.onRendered(function () {
    Session.set('numOfLocations', 0);
});

Template.locations.onCreated(function mainOnCreated() {
});

Template.locations.helpers({
    locations: function () {
        return [
            'Irondequoit Bay to Sodus Bay',
            'Sodus Bay to Fair Haven',
            'Irondequoit Bay to Fair Haven'
        ];
    },

    numOfLocations: function () {
        return Session.get('numOfLocations');
    },

    loopCount: function (count) {
        var countArr = [];
        for (var i = 0; i < count; i++) {
            countArr.push({});
        }
        return countArr;
    }
});

Template.locations.events({
    'click .add-location' (event, instance) {
        Session.set('numOfLocations', parseInt(Session.get('numOfLocations')) + 1);
    },

    'click .dropdown-menu li a' (event, instance){
        event.preventDefault();
        if (event.target.parentElement.parentElement.previousElementSibling.previousElementSibling) {
            $(event.target.parentElement.parentElement.previousElementSibling.previousElementSibling).text(event.target.innerHTML);
            $(event.target.parentElement.parentElement.previousElementSibling.previousElementSibling).val(event.target.innerHTML);
        } else {
            $(event.target.parentElement.parentElement.previousElementSibling).text(event.target.innerHTML);
            $(event.target.parentElement.parentElement.previousElementSibling).val(event.target.innerHTML);
        }
    },

    'click .glyphicon-remove' (event, instance) {
        $(event.target.parentElement).remove();
        //Session.set('numOfPrecautions', parseInt(Session.get('numOfPrecautions')) - 1);
    }
});
