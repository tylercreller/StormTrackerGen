import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import './thunderstorms.html';

Template.thunderstorms.onRendered(function() {
    Session.set('numOfEvents', 0);
});

Template.thunderstorms.onCreated(function mainOnCreated() {});

Template.thunderstorms.helpers({
    events: function() {
        return [
            'Small Hail',
            'Large Hail',
            'Strong Winds',
            'Damaging Winds',
            'Widespread Damaging Winds',
            'Heavy Rainfall',
            'Localized Flooding',
            'Occasional Lightning Strikes',
            'Frequent Lightning Strikes',
            'Waterspouts',
            'Rotation in this Thunderstorm May Produce a Tornado',
            'Tornadoes'
        ];
    },

    numOfEvents: function() {
        return Session.get('numOfEvents');
    },

    loopCount: function(count){
        var countArr = [];
        for (var i=0; i<count; i++){
            countArr.push({});
        }
        return countArr;
    }
});

Template.thunderstorms.events({
    'click .add-event' (event, instance) {
        Session.set('numOfEvents', parseInt(Session.get('numOfEvents')) + 1);
    },

    'click .dropdown-menu li a' (event, instance){
        event.preventDefault();
        $(event.target.parentElement.parentElement.previousElementSibling.previousElementSibling).text(event.target.innerHTML);
        $(event.target.parentElement.parentElement.previousElementSibling.previousElementSibling).val(event.target.innerHTML);
    },

    'click .glyphicon-remove' (event, instance) {
        $(event.target.parentElement).remove();
        //Session.set('numOfPrecautions', parseInt(Session.get('numOfPrecautions')) - 1);
    }
});
