import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import './counties.html';

Template.counties.onRendered(function() {
    Session.set('numOfCounties', 0);
});

Template.counties.onCreated(function mainOnCreated() {});

Template.counties.helpers({
    countyOptions: function() {
        return [
            'Monroe',
            'Wayne',
            'Ontario',
            'Seneca',
            'Yates',
            'Cayuga',
            'Lakeshore',
        ];
    },

    cardinalOptions: function () {
        return [
            'All of',
            'Northern',
            'Southern',
            'Western',
            'Eastern',
            'Northwestern',
            'Northeastern',
            'Southwestern',
            'Southeastern',
            'Central'
        ];
    },

    numOfCounties: function() {
        return Session.get('numOfCounties');
    },

    loopCount: function(count){
        var countArr = [];
        for (var i=0; i<count; i++){
            countArr.push({});
        }
        return countArr;
    }
});

Template.counties.events({
    'click .add-county' (event, instance) {
        Session.set('numOfCounties', parseInt(Session.get('numOfCounties')) + 1);
    },

    'click .dropdown-menu li a' (event, instance){
        event.preventDefault();
        if(event.target.parentElement.parentElement.previousElementSibling.previousElementSibling) {
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
