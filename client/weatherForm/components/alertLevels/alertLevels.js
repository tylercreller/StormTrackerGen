import {Template} from 'meteor/templating';

import './alertLevels.html';

Template.alertLevels.onRendered(function() {

});

Template.alertLevels.onCreated(function mainOnCreated() {});

Template.alertLevels.helpers({
    alertTypes: function() {
        return [
            'Wind',
            'Flooding',
            'T-Storm',
            'Winter',
            'Extreme Temp',
            'Marine',
            'Misc'
        ]
    }
});

Template.alertLevels.events({
    'click .dropdown-menu li a' (event, instance){
        event.preventDefault();
        $(event.target.parentElement.parentElement.previousElementSibling).text(event.target.innerHTML);
        $(event.target.parentElement.parentElement.previousElementSibling).val(event.target.innerHTML);
    },
    'click .alertType-menu li a' (event, instance) {
        var alertDef = $('#alertDef'),
            alertDefMenu = $('.alertDef-menu'),
            alertType = $(event.target)[0].innerHTML,
            alertDefsObj = {
                'Wind': [
                    'Awareness Alert for Strong Winds',
                    'Action Alert Damaging Winds',
                    'Potential Alert Damaging Winds'
                ],
                'Flooding': [
                    'Awareness Alert for General Flooding',
                    'Potential Alert for General Flooding',
                    'Action Alert for General Flooding',
                    'Potential Alert for Rapid Flooding',
                    'Immediate Action Alert for Rapid Flooding'
                ],
                'T-Storm': [
                    'Potential Alert for Strong to Severe T-Storms',
                    'Immediate Action Alert for Strong T-Storm',
                    'Immediate Action Alert for Severe T-Storm',
                    'Immediate Action Alert for Rotating T-Storm',
                    'Emergency Action Alert for Tornadic T-Storm'
                ],
                'Winter': [
                    'Awareness Alert for Hazardous Traveling',
                    'Action Alert for Dangerous Traveling',
                    'Potential Alert for Significant Winter Weather',
                    'Action Alert for Significant Winter Weather',
                    'Potential Alert for Significant Icing',
                    'Action Alert for Significant Icing',
                    'Potential Alert for Blizzard',
                    'Emergency Alert for Blizzard'
                ],
                'Extreme Temp': [
                    'Potential Alert: Dangerous Wind Chills',
                    'Action Alert: Dangerous Wind Chills',
                    'Potential Alert: Dangerous Cold',
                    'Action Alert: Dangerous Cold',
                    'Potential Alert: Dangerous Heat',
                    'Action Alert: Dangerous Heat'
                ],
                'Marine': [
                    'Potential Mariners Alert: Waterspouts',
                    'Immediate Action Mariners Alert: Waterspouts',
                    'Potential Mariners Alert: Lakeside Flooding / Erosion',
                    'Action Mariners Alert: Lakeside Flooding / Erosion',
                    'Immediate Action Mariners Alert: Strong to Severe T-Storms',
                    'Potential Mariners Alert: Strong Winds / Wave Action',
                    'Action Mariners Alert: Strong Winds / Wave Action',
                ],
                'Misc': [
                    'Special Weather Report'
                ]
            },
            alertDefList = alertDefsObj[alertType];
        event.preventDefault();
        alertDefMenu.find('li a').remove();
        alertDef.text('Choose One ').append('<span class="caret"></span>');
        if(alertDefList) {
            for(var i = 0; i < alertDefList.length; i++) {
                alertDefMenu.append('<li><a href="#" value="' + alertDefList[i] + '">' + alertDefList[i] + '</a></li>');
            }
        }
    },
});