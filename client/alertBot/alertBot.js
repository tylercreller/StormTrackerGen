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
    'click .all-choice': function () {
        var checked = $('.all-choice').hasClass('active');
        if(!checked) {
            $('.county-choices').find('.county-choice').each(function () {
                $(this).addClass('active');
            });
        } else {
            $('.county-choices').find('.county-choice').each(function () {
                $(this).removeClass('active');
            });
        }
    },
    'click .county-choice': function(event, target) {
        var locationsToFilter = [],
            countyChoices = $(".county-choices").find('.county-choice'),
            filterArr = [];

        if($(event.currentTarget).hasClass('active')) {
            $(event.currentTarget).removeClass('active')
        } else {
            $(event.currentTarget).addClass('active')
        }

        countyChoices.each(function() {
            if ($(this)[0].innerText.trim() !== 'All' && $(this).hasClass('active')) {
                locationsToFilter.push($(this)[0].innerText.trim());
            }
        });
        if ((countyChoices.length - 1) === locationsToFilter.length) {
            $('.all-choice').addClass('active');
        } else {
            $('.all-choice').removeClass('active');
        }
        self.alertsHandle.stop();
        if(locationsToFilter.length) {
            filterArr.push({locations: {$in: locationsToFilter}});
        }
        if (locationsToFilter.indexOf('Not Specified') > -1) {
            filterArr.push({locations: []});
        }
        if(_.some(filterArr)) {
            self.alertsHandle = Meteor.subscribe('alerts', {$or: filterArr}, {sort: {"createdAt": -1}, limit: 20});
        }
    },
    'click .see-alert-button': function() {
        Router.go('/alert/' + this._id);
    }
});