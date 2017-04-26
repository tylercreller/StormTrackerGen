import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import './safetyPrecautions.html';

Template.safetyPrecautions.onRendered(function() {
    Session.set('numOfPrecautions', 0);
});

Template.safetyPrecautions.onCreated(function mainOnCreated() {});

Template.safetyPrecautions.helpers({
    precautions: function() {
        return [
            'Shelter in place immediately',
            'Stay away from windows and doors',
            'Remain alert for flooding and move to higher grounds if needed',
            'Stay clear of downed power lines',
            'Stay away from large trees',
            'Stay indoors',
            'Move to your basement or interior room on the lowest level of your home',
            'Dress in layered clothing',
            'Keep hydrated',
            'Do not run a generator near your home or in your garage',
            'Reduce your time outside',
            'Be prepared to lose power',
            'Watch for signs of heat exhaustion',
            'Watch for signs of hypothermia and frostbite',
            'Secure loose objects outside that can blow around',
            'Large hail stones can cause severe injuries - stay indoors',
            'If possible do not seek shelter in a mobile home or vehicle',
            'If you are trapped in rising flood waters, get to the highest point you can as quickly as possible.',
            'Stay calm and remain alert to your surroundings',
            'Boaters should seek safe harbor immediately',
            'Boaters should not venture out on the waters',
            'Boaters should stay clear of waterspouts',
            'Careful when walking on driveways and sidewalks',
            'If caught outside in a t-storm, stay away from trees / power lines',
            'If caught outside in a t-storm, lay in the nearest ditch if sturdy shelter is not available to you'
        ];
    },

    numOfPrecautions: function() {
        return Session.get('numOfPrecautions');
    },

    loopCount: function(count){
        var countArr = [];
        for (var i=0; i<count; i++){
            countArr.push({});
        }
        return countArr;
    }
});

Template.safetyPrecautions.events({
    'click .add-precaution' (event, instance) {
        Session.set('numOfPrecautions', parseInt(Session.get('numOfPrecautions')) + 1);
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
