import { Session } from 'meteor/session';

var self = this,
    dateFormat = require('dateformat');

Template.alertBot.onCreated(function onCreated() {});

Template.alertBot.onRendered(function onRendered() {
    self.filterCount = 0;

    var activeFilters = Session.get('activeFilters'),
        allFilters =  $('.county-choice'),
        notification,
        audio;

    if (self.alertsHandle) {
        self.alertsHandle.stop();
    }
    if (!!activeFilters) {
        self.alertsHandle = Meteor.subscribe('alerts', {$or: activeFilters}, {sort: {"createdAt": -1}, limit: 20});
        if (allFilters.length === activeFilters[0].locations.$in.length) {
            $('.county-choice[value="All"]').addClass('active');
            self.filterCount += 1;
        }
        _.forEach(activeFilters[0].locations.$in, function doEach(name) {
            $('.county-choice[value="' + name + '"]').addClass('active');
            self.filterCount += 1;
        })
    } else {
        self.alertsHandle = Meteor.subscribe('alerts', {}, {sort: {"createdAt": -1}, limit: 20});
        allFilters.addClass('active');
        self.filterCount = 9;
    }

    $('.filterCount > .count').text(self.filterCount);

    self.alertWatch = Alerts.find().observeChanges({
        added: function (id, object) {
            if ("Notification" in window && self.alertsHandle && self.alertsHandle.ready()) {
                notification = new Notification('You have new alerts.', {icon: '/st-logo.jpeg'});
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
        return Alerts.find().fetch().sort(function compare(a, b) {
            var dateA = new Date(a.createdAt),
                dateB = new Date(b.createdAt);
            return dateB - dateA;
        });
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
                self.filterCount = 9;
            });
        } else {
            $('.county-choices').find('.county-choice').each(function () {
                self.filterCount = 0;
                $(this).removeClass('active');
            });
        }
        $('.filterCount > .count').text(self.filterCount);
    },
    'click .county-choice': function(event, target) {
        var locationsToFilter = [],
            countyChoices = $(".county-choices").find('.county-choice'),
            filterArr = [];

        if($(event.currentTarget).hasClass('active')) {
            $(event.currentTarget).removeClass('active');
            self.filterCount -= 1;
        } else {
            $(event.currentTarget).addClass('active');
            self.filterCount += 1;
        }

        countyChoices.each(function() {
            if ($(this)[0].innerText.trim() !== 'All' && $(this).hasClass('active')) {
                locationsToFilter.push($(this)[0].innerText.trim());
            }
        });
        if ((countyChoices.length - 1) === locationsToFilter.length) {
            $('.all-choice').addClass('active');
            self.filterCount += 1;
        } else if ( $('.all-choice').hasClass('active')) {
            $('.all-choice').removeClass('active');
            self.filterCount -= 1;
        }
        self.alertsHandle.stop();
        if(locationsToFilter.length) {
            filterArr.push({locations: {$in: locationsToFilter}});
            if (locationsToFilter.indexOf('Not Specified') > -1) {
                filterArr.push({locations: []});
            }
            self.alertsHandle = Meteor.subscribe('alerts', {$or: filterArr}, {sort: {"createdAt": -1}, limit: 20});
        }
        Session.set('activeFilters', filterArr);
        $('.filterCount > .count').text(self.filterCount);
    },
    'click .see-alert-button': function() {
        Router.go('/alert/' + this._id);
    }
});