import {Template} from 'meteor/templating';
import {HTTP} from 'meteor/http';

import './weatherForm.html';

var self = this,
    dateFormat = require('dateformat');

self.generateText = function generateText() {
    var startDate = new Date($(".start-date").val()),
        endDate = new Date($(".end-date").val()),
        customStartCheck = $('#customStart .checkbox').is(':checked'),
        customStartVal = $('#customStart .input')[0].value,
        customEndCheck = $('#customEnd .checkbox').is(':checked'),
        customEndVal = $('#customEnd .input')[0].value,
        //alertType = $('.alertType .btn'),
        alertLevel = $('.alertDef .btn'),
        precautions = $('.safety-precautions .btn-group .btn'),
        possibleDamage = $('.possible-damage .btn-group .btn'),
        locations = $('.locations .btn-group .btn'),
        thunderstorms = $('.thunderstorms .btn-group .btn'),
        confidence = $('.confidence .btn-group .btn'),
        impact = $('.intensity .btn-group .btn'),
        visibility = $('.visibility .btn-group .btn'),
        traveling = $('.traveling .btn-group .btn'),
        powerOutage = $('.power-outage .btn-group .btn'),
        countyGroup = $('.counties .county-group'),
        forecastersBriefing = $('.forecasters-briefing textarea')[0].value,
        fullName = Meteor.user().profile.name,
        text = '',
        levelDefs = {
            'Awareness': 'Awareness Level - Nuisance weather expected, some level of caution needed.',
            'Potential': 'Potential Level - Possibility of hazardous weather. Continue to monitor situation.',
            'Action': 'Action Level - Hazardous weather is likely to occur. Some level of action will be needed.',
            'Immediate': 'Immediate Action Level - Hazardous weather is likely to occur shortly. Action is required now! Mainly used for thunderstorms and tornadoes.',
            'Emergency': 'Emergency Level - Extreme to catastrophic weather is expected or has already begun to occur. Action is needed to save life and property!'
        },
        levelDefSpec = levelDefs[alertLevel[0].innerHTML.split(' ')[0]];


    if (alertLevel[0].innerHTML !== 'Special Weather Report') {
        text += 'STORM TRACKERS TEAM NY ALERT\n';
    } else {
        text += alertLevel[0].innerHTML + '\n';
    }

    // Dates
    // Friday, March 3, 2017 @ 8:30 AM
    var now = new Date();
    text += dateFormat(now, "dddd, mmmm dS, yyyy @ h:MM TT") + '\n\n';

    if (alertLevel[0].innerHTML !== 'Special Weather Report') {
        // Title text
        text += 'The Storm Trackers Team has issued an...\nALERT(S):\n';

        // Alert
        text += alertLevel[0].innerHTML;
        text += '\n\n';
    }

    // TODO DATEFORMAT
    if (startDate.toString() !== 'Invalid Date' || customStartCheck) {
        text += 'TIME START: ';
        // Time Start
        if (customStartCheck) {
            text += customStartVal;
        } else {
            text += startDate.toString();
        }
        text += '\n';
    }

    if (endDate.toString() !== 'Invalid Date'  || customEndCheck) {
        text += 'TIME END: ';
        // Time expires
        if (customEndCheck) {
            text += customEndVal;
        } else {
            text += endDate.toString();
        }
        text += '\n\n';
    }

    // Counties Affected
    if (countyGroup.length) {
        text += 'COUNTIES AFFECTED: \n';
        for(var i = 0; i < countyGroup.length; i++) {
            var county = $(countyGroup[i]).find('.btn-group .btn');
            text += county[0].innerHTML;
            if (county.length === 2) {
                text += ' ' + county[1].innerHTML;
            }
            text += '\n';
        }
        text += '\n';
    }

    // Locations
    if (locations.length) {
        text += 'AFFECTED MARINE LOCATIONS: \n';
        for(var i = 0; i < locations.length; i++) {
            text += locations[i].innerHTML + '\n';
        }
        text += '\n'
    }


    // Confidence
    if(confidence[0].innerHTML.trim() !== 'NONE') {
        text += 'FORECASTER\'S CONFIDENCE LEVEL: ' + confidence[0].innerHTML.trim() + '\n\n';
    }

    // Impact
    if(impact[0].innerHTML.trim() !== 'NONE') {
        text += 'OVERALL IMPACT INTENSITY SCALE: ' + impact[0].innerHTML.trim() + '\n\n';
    }

    // Visibility
    if(visibility[0].innerHTML.trim() !== 'NONE') {
        text += 'VISIBILITY IMPACT: ' + visibility[0].innerHTML.trim() + '\n\n';
    }

    // Traveling
    if(traveling[0].innerHTML.trim() !== 'NONE') {
        text += 'TRAVELING IMPACT: ' + traveling[0].innerHTML.trim() + '\n\n';
    }

    // Power Outage
    if(powerOutage[0].innerHTML.trim() !== 'NONE') {
        text += 'POWER OUTAGE IMPACT: ' + powerOutage[0].innerHTML.trim() + '\n\n';
    }

    // Possible Damage expected
    if (possibleDamage.length) {
        text += 'POSSIBLE DAMAGE EXPECTED: \n';
        for(var i = 0; i < possibleDamage.length; i++) {
            text += possibleDamage[i].innerHTML + '\n';
        }
        text += '\n\n'
    }

    // Thunderstorms
    if (thunderstorms.length) {
        text += 'THUNDERSTORMS COULD PRODUCE: \n';
        for(var i = 0; i < thunderstorms.length; i++) {
            text += thunderstorms[i].innerHTML + '\n';
        }
        text += '\n\n'
    }

    // Precautions
    if (precautions.length) {
        text += 'SAFETY PRECAUTIONS: \n';
        for(var i = 0; i < precautions.length; i++) {
            text += precautions[i].innerHTML + '\n';
        }
        text += '\n\n'
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

Template.weatherForm.onRendered(function() {
    this.$('.startDateTime').datetimepicker();
    this.$('.endDateTime').datetimepicker();
    $(".preview-post").hide();
});

Template.weatherForm.onCreated(function mainOnCreated(){});

Template.weatherForm.helpers({});

Template.weatherForm.events({
    'click .copy'(event, instance) {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", $('.preview-post textarea')[0].value);
    },
    'click .post-to-facebook'(event, instance) {
        var user = Meteor.users.findOne(Meteor.userId()),
            fbAccessToken = user.services.facebook.accessToken,
            pageAccessToken,
            pageId,
            page,
            params,
            postType = 'feed',
            photoUrl = $('.photoUrl').val(),
            text = self.generateText();
        HTTP.call(
            'GET',
            'https://graph.facebook.com/v2.8/me?fields=id,name,accounts&access_token=' + fbAccessToken,
            {/* options */},
            function (err, response) {
                page = _.find(response.data.accounts.data, function (o) {return o.id === "1742942359353590"});
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
                    'https://graph.facebook.com/'+ pageId +'/' + postType,
                    {
                        params: params
                    },
                    function (err, response) {
                        if(err) {
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
        );
    },
    'click .generate-sample' (event, instance) {
        $(".preview-post").show();
        // Apply text
        $(".preview-text").val(self.generateText());
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
    }
});
