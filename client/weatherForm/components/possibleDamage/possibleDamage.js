import {Template} from 'meteor/templating';

import './possibleDamage.html';

Template.possibleDamage.onRendered(function () {
    Session.set('numOfDamages', 0);
});

Template.possibleDamage.onCreated(function mainOnCreated() {
});

Template.possibleDamage.helpers({
    possibleDamage: function () {
        return [
            'NONE',
            'Some Damage to Trees',
            'Widespread Damage to Trees',
            'Some Power Lines Down',
            'Widespread Power Lines Down',
            'Some Structural Damage',
            'Widespread Structural Damage',
            'Vehicle Damage',
            'Crop Damage',
            'Flooding Damage',
            'Basement Flooding',
            'Roads Flooded / Washed Out',
            'Roads Impassable',
            'Loose Objects Outside',
            'Human Injuries or Death',
            'Roof Damage Due to Weight Load',
            'High Profle Vechicles Overturned',
            'Lake Shore Erosion',
            'Lake Shore Flooding',
            'Damage Livestock Outside',
            'Damage to Pipes and Water Lines',
            'Damage to Boats / Overturned'
        ];
    },

    numOfDamages: function() {
        return Session.get('numOfDamages');
    },

    loopCount: function(count){
        var countArr = [];
        for (var i=0; i<count; i++){
            countArr.push({});
        }
        return countArr;
    }
});

Template.possibleDamage.events({
    'click .add-damages' (event, instance) {
        Session.set('numOfDamages', parseInt(Session.get('numOfDamages')) + 1);
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
