import {Template} from 'meteor/templating';
import {HTTP} from 'meteor/http';

import './weatherForm.html';

var self = this,
    dateFormat = require('dateformat'),
    requiredClipboard = require('clipboard'),
    clipboard = new requiredClipboard('.copy');

// Clipboard Setup
clipboard.on('success', function (e) {
    self.snackbar.textContent = "Copied Successfully!";
    self.snackbar.className = "show";
    setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
});

clipboard.on('error', function (e) {
    self.snackbar.textContent = "Press Ctrl+C to copy to clipboard";
    self.snackbar.className = "show";
    setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
});

self.postDestination = '249878011776436';


self.processValues = function processValues(values) {
    var arr = [];
    if (!!values) {
        if (values.length) {
            for (var i = 0; i < values.length; i++) {
                if (values[i].value) {
                    arr.push(values[i].value);
                }
            }
        } else {
            if (values.value) {
                arr.push(values.value);
            }
        }
    }
    return arr;
};

self.generateText = function generateText(instance) {
    self.validationErrors = false;

    var startDate = new Date($(".start-date").val()),
        endDate = new Date($(".end-date").val()),
        customStartCheck = $('#customStart .checkbox').is(':checked'),
        customStartVal = $('#customStart .input')[0].value,
        customEndCheck = $('#customEnd .checkbox').is(':checked'),
        customEndVal = $('#customEnd .input')[0].value,
        alertLevel = processValues(instance.lastNode.alertLevel),
        alertType = processValues(instance.lastNode.alertType),
        precautions = processValues(instance.lastNode.safetyPrecaution),
        possibleDamage = processValues(instance.lastNode.possibleDamage),
        marineLocationOrigin = processValues(instance.lastNode.marineLocationOrigin),
        marineLocationDestination = processValues(instance.lastNode.marineLocationDestination),
        thunderstorms = processValues(instance.lastNode.thunderstorm),
        confidence = $('.confidence .btn-group .btn'),
        impact = $('.intensity .btn-group .btn'),
        visibility = $('.visibility .btn-group .btn'),
        traveling = $('.traveling .btn-group .btn'),
        powerOutage = $('.power-outage .btn-group .btn'),
        countyLocation = processValues(instance.lastNode.countyLocation),
        county = processValues(instance.lastNode.county),
        forecastersBriefing = $('.forecasters-briefing textarea')[0].value,
        fullName = Meteor.user().emails[0].address === 'jmweatherbum@gmail.com' ? 'Jack Matthys' : 'William Boggess',
        text = ''
        levelDefs = {
            'Awareness': 'Awareness Level - Nuisance weather expected, some level of caution needed.',
            'Potential': 'Potential Level - Possibility of hazardous weather. Continue to monitor situation.',
            'Action': 'Action Level - Hazardous weather is likely to occur. Some level of action will be needed.',
            'Immediate': 'Immediate Action Level - Hazardous weather is likely to occur shortly. Action is required now! Mainly used for thunderstorms and tornadoes.',
            'Emergency': 'Emergency Level - Extreme to catastrophic weather is expected or has already begun to occur. Action is needed to save life and property!'
        },
        levelDefSpec = levelDefs[alertLevel[0].split(' ')[0]];

    if (!alertLevel[0]) {
        self.validationErrors = true;
        swal("Oops...", "You didn't select an alert type", "error");
        return;
    }

    if (alertType[0] !== 'Misc') {
        text += 'STORM TRACKERS TEAM NY ALERT\n';
    } else {
        text += alertLevel[0] + '\n';
    }

    // Dates
    // Friday, March 3, 2017 @ 8:30 AM
    var now = new Date();
    text += dateFormat(now, "dddd, mmmm dS, yyyy @ h:MM TT") + '\n\n';

    if (alertType[0] !== 'Misc') {
        // Title text
        text += 'The Storm Trackers Team has issued a...\n\n';

        // Alert
        text += alertLevel[0];
        text += '\n\n';
    }

    if (startDate.toString() !== 'Invalid Date' || customStartCheck) {
        text += 'START TIME: ';
        // Time Start
        if (customStartCheck) {
            text += customStartVal;
        } else {
            text += dateFormat(startDate, "dddd, mmmm dS, yyyy @ h:MM TT");
        }
        text += '\n';
    }

    if (endDate.toString() !== 'Invalid Date' || customEndCheck) {
        text += 'END TIME: ';
        // Time expires
        if (customEndCheck) {
            text += customEndVal;
        } else {
            text += dateFormat(endDate, "dddd, mmmm dS, yyyy @ h:MM TT");
        }
        text += '\n\n';
    }

    // Counties Affected
    if (county.length && countyLocation.length && county.length === countyLocation.length) {
        text += 'COUNTIES AFFECTED: \n';
        for (var i = 0; i < county.length; i++) {
            text += countyLocation[i] + ' ' + county[i];
            text += '\n';
        }
        text += '\n';
    } else if (county.length !== 0 && countyLocation !== 0) {
        self.validationErrors = true;
        swal("That doesn't look right...", "Be sure Affected Counties is populated correctly", "error");
        return;
    }

    // Locations
    if (marineLocationOrigin.length === marineLocationDestination.length) {
        if (marineLocationOrigin.length && marineLocationDestination.length) {
            text += 'AFFECTED MARINE LOCATIONS: \n';
            for (var i = 0; i < marineLocationOrigin.length; i++) {
                text += marineLocationOrigin[i] + ' to ' + marineLocationDestination[i] + '\n';
            }
            text += '\n'
        }
    } else {
        self.validationErrors = true;
        swal("That doesn't look right...", "Be sure Marine Locations are populated correctly", "error");
        return;
    }


    // Confidence
    if (confidence[0].innerHTML.trim() !== 'NONE') {
        text += 'FORECASTER\'S CONFIDENCE LEVEL: ' + confidence[0].innerHTML.trim() + '\n\n';
    }

    // Impact
    if (impact[0].innerHTML.trim() !== 'NONE') {
        text += 'OVERALL IMPACT INTENSITY SCALE: ' + impact[0].innerHTML.trim() + '\n\n';
    }

    // Visibility
    if (visibility[0].innerHTML.trim() !== 'NONE') {
        text += 'VISIBILITY IMPACT: ' + visibility[0].innerHTML.trim() + '\n\n';
    }

    // Traveling
    if (traveling[0].innerHTML.trim() !== 'NONE') {
        text += 'TRAVELING IMPACT: ' + traveling[0].innerHTML.trim() + '\n\n';
    }

    // Power Outage
    if (powerOutage[0].innerHTML.trim() !== 'NONE') {
        text += 'POWER OUTAGE IMPACT: ' + powerOutage[0].innerHTML.trim() + '\n\n';
    }

    // Possible Damage expected
    if (possibleDamage.length) {
        text += 'POSSIBLE DAMAGE EXPECTED: \n';
        for (var i = 0; i < possibleDamage.length; i++) {
            text += possibleDamage[i] + '\n';
        }
        text += '\n\n'
    }

    // Thunderstorms
    if (thunderstorms.length) {
        text += 'THUNDERSTORMS COULD PRODUCE: \n';
        for (var i = 0; i < thunderstorms.length; i++) {
            text += thunderstorms[i] + '\n';
        }
        text += '\n'
    }

    // Precautions
    if (precautions.length) {
        text += 'SAFETY PRECAUTIONS: \n';
        for (var i = 0; i < precautions.length; i++) {
            text += precautions[i] + '\n';
        }
        text += '\n'
    }

    // Custom Text
    if (forecastersBriefing) {
        text += 'FORECASTER\'S BRIEFING: \n';
        text += forecastersBriefing + '\n\n';
    }

    // Forecaster
    if (fullName === 'William Boggess') {
        fullName = fullName.split(' ');
        fullName[0] = 'Bill';
        text += fullName.join(' ') + '\n';
    } else {
        text += fullName + '\n';
    }
    // Title
    if (fullName === 'Jack Matthys') {
        text += 'CEO/Founder' + '\n\n';
    } else {
        text += 'Forecaster' + '\n\n'
    }

    // Level Definitions
    if (!!levelDefSpec) {
        text += 'LEVEL DEFINITIONS:\n';
        text += levelDefSpec + '\n\n';
    }

    // Reporting Info
    text += 'REPORTING INFORMATION:\n' +
        'Weather Reporting Hotline: 315.332.1043\n' +
        'Email:  stormtrackershotline@gmail.com';

    return text;
};

Template.weatherForm.onRendered(function () {
    self.snackbar = document.getElementById("snackbar");
    this.$('.startDateTime').datetimepicker();
    this.$('.endDateTime').datetimepicker();
    $(".preview-post").hide();
    $(".loading").hide();
});

Template.weatherForm.onCreated(function mainOnCreated() {
});

Template.weatherForm.helpers({});

Template.weatherForm.events({
    'click .weather-form .post-to-facebook'(event, instance) {
        var user = Meteor.users.findOne(Meteor.userId()),
            fbAccessToken = user.services.facebook.accessToken,
            pageAccessToken,
            pageId,
            page,
            params,
            postType = 'feed',
            photoUrl = $('.photoUrl').val(),
            text = self.generateText(instance);
        $(".loading").show();
        HTTP.call(
            'GET',
            'https://graph.facebook.com/v2.8/me?fields=id,name,accounts&access_token=' + fbAccessToken,
            {/* options */},
            function (err, response) {
                if (self.validationErrors) {
                    swal("Oops...", "Make sure you populated all necessary fields!", "error");
                    $(".loading").hide();
                    return;
                }
                else if (err) {
                    swal("Oops...", "Something went wrong on Facebook's end!", "error");
                    $(".loading").hide();
                    return;
                } else {
                    page = _.find(response.data.accounts.data, function (o) {
                        return o.id === self.postDestination
                    });

                    if (!page) {
                        swal("Oops...", "Make sure you have permissions to post to this page!", "error");
                        $(".loading").hide();
                        return;
                    }
                    pageAccessToken = page.access_token;
                    pageId = page.id;

                    params = {
                        "access_token": pageAccessToken,
                        "message": text
                    };

                    if (photoUrl) {
                        postType = 'photos';
                        params.url = photoUrl;
                    }

                    HTTP.call(
                        'POST',
                        'https://graph.facebook.com/' + pageId + '/' + postType,
                        {
                            params: params
                        },
                        function (err, response) {
                            $(".loading").hide();
                            if (err) {
                                swal("Oops...", "Something went wrong!", "error");
                            } else {
                                var id = response.data.post_id ? response.data.post_id : response.data.id,
                                    arr = id.split('_'),
                                    link = "https://www.facebook.com/" + arr[0] + "/posts/" + arr[1];
                                swal("Success!",
                                    "Your alert has been posted\n",
                                    "success");
                                $('.sweet-alert p').append('<a href=\"' + link + '\" target="_blank">See post</a>');
                            }
                        }
                    );
                }
            }
        );
    },
    'click .weather-form .generate-sample' (event, instance) {
        $(".preview-post").show();
        $(".preview-text").val(self.generateText(instance));
    },

    'click #customStart .checkbox' (event, instance) {
        var ele = $('.start-date');
        if (event.target.checked) {
            ele.attr("disabled", true).val("");
            $(event.target.parentElement.nextElementSibling).removeAttr("disabled");
        } else {
            ele.removeAttr('disabled');
            $(event.target.parentElement.nextElementSibling).attr("disabled", true).val("");
        }
    },

    'click #customEnd .checkbox' (event, instance) {
        var ele = $('.end-date');
        if (event.target.checked) {
            ele.attr("disabled", true).val("");
            $(event.target.parentElement.nextElementSibling).removeAttr("disabled");
        } else {
            ele.removeAttr('disabled');
            $(event.target.parentElement.nextElementSibling).attr("disabled", true).val("");
        }
    },

    'click .dropdown-menu li a.page' (event, instance){
        event.preventDefault();
        if (event.target.parentElement.parentElement.previousElementSibling.previousElementSibling) {
            $(event.target.parentElement.parentElement.previousElementSibling.previousElementSibling).text(event.target.innerHTML);
            $(event.target.parentElement.parentElement.previousElementSibling.previousElementSibling).val(event.target.innerHTML);
        } else {
            $(event.target.parentElement.parentElement.previousElementSibling).text(event.target.innerHTML);
            $(event.target.parentElement.parentElement.previousElementSibling).val(event.target.innerHTML);
        }
        self.postDestination = event.target.attributes.value.value;
    },

    'click .publish-storm-trackers-team-ny-live' (event, instance){
        event.preventDefault();
        var counties = processValues(instance.lastNode.county),
            alertType = processValues(instance.lastNode.alertLevel),
            alertMessage = self.generateText(instance);

        if(alertMessage) {
            Alerts.insert({
                alertMessage: alertMessage,
                locations: _.uniq(_.sortBy(counties, function(county){return county}), true),
                alertType: alertType[0],
                alertLevel: alertType[0].split(' ')[0],
                user: Meteor.user().emails[0].address,
                createdAt: new Date()
            });

            self.snackbar.textContent = "Published Successfully!";
            self.snackbar.className = "show";
            setTimeout(function () {
                snackbar.className = snackbar.className.replace("show", "");
            }, 3000);
        }
    },

    'click #reset' (event, instance) {
        event.preventDefault();
        location.reload();
    }
});
