var self = this,
    dateFormat = require('dateformat');

Template.alertBot.onCreated(function onCreated() {
    self.alertsHandle = Meteor.subscribe('alerts', {}, {sort: {"createdAt": -1}, limit: 20});

    self.alertWatch = Alerts.find().observeChanges({
        added: function (id, object) {
            if ("Notification" in window && self.alertsHandle && self.alertsHandle.ready()) {
                var notification = new Notification('You have new alerts.', {icon: '/st-logo.jpeg'}),
                    audio = new Audio('ding.wav');
                audio.addEventListener('canplaythrough', function() {
                    audio.play();
                });
            }
        }
    });

    if ("Notification" in window) {
        if (Notification.permission !== "denied") {
            Notification.requestPermission();
        }
    }
});

Template.alertBot.onDestroyed(function onDestroyed() {
    alertWatch.stop();
});

Template.alertBot.helpers({
    issuedAlerts: function () {
        return Alerts.find().fetch();
    },
    dateFormat: function (date) {
        return dateFormat(date, "ddd, mmm dS, yyyy h:MM TT");
    },
    formatLocations: function (locations) {
        return locations.join(', ');
    },
    equalsOr: function (a, b, c) {
        return a === b || a === c;
    },
    toLower: function (a) {
        return a.toLowerCase();
    }
});

Template.alertBot.events({
    'click .all-checkbox': function () {
        var checked = $('.all-checkbox').prop('checked');
        $('.county-choices').find('input:checkbox').prop('checked', checked);
    },
    'click input:checkbox': function() {
        var locationsToFilter = [],
            countyChoices = $(".county-choices").find('input:checkbox');
        countyChoices.each(function() {
            if ($(this).val() !== 'All' && $(this).prop('checked')) {
                locationsToFilter.push($(this).val());
            }
        });
        $('.all-checkbox').prop('checked', (countyChoices.length - 1) === locationsToFilter.length);
        self.alertsHandle.stop();
        if(locationsToFilter.length) {
            self.alertsHandle = Meteor.subscribe('alerts', {locations: {$in: locationsToFilter}}, {sort: {"createdAt": -1}, limit: 20});
        }
    },
    'click .see-alert-button': function() {
        Router.go('/alert/' + this._id);
    }
});