import {Template} from 'meteor/templating';

import './sidenav.html';

Template.sidenav.onRendered(function() {
    document.getElementById("mySidenav").style.width = "0";
});

Template.sidenav.onCreated(function mainOnCreated(){});

Template.sidenav.helpers({});

Template.sidenav.events({
    'click .open-nav': function() {
        document.getElementById("mySidenav").style.width = "250px";
    },
    'click .close-nav': function() {
        document.getElementById("mySidenav").style.width = "0";
    }
});
