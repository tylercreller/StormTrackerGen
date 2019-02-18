import { Template } from 'meteor/templating';

import './alertLevels.html';

Template.alertLevels.onRendered(function() {});

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
		];
	}
});

Template.alertLevels.events({
	'click .dropdown-menu li a'(event, instance) {
		event.preventDefault();
		if (
			event.target.parentElement.parentElement.previousElementSibling
				.previousElementSibling
		) {
			$(
				event.target.parentElement.parentElement.previousElementSibling
					.previousElementSibling
			).text(event.target.innerHTML);
			$(
				event.target.parentElement.parentElement.previousElementSibling
					.previousElementSibling
			).val(event.target.innerHTML);
		} else {
			$(event.target.parentElement.parentElement.previousElementSibling).text(
				event.target.innerHTML
			);
			$(event.target.parentElement.parentElement.previousElementSibling).val(
				event.target.innerHTML
			);
		}
	},
	'click .alertType-menu li a'(event, instance) {
		var alertDef = $('#alertDef'),
			alertDefMenu = $('.alertDef-menu'),
			alertType = $(event.target)[0].innerHTML,
			alertDefsObj = {
				Wind: [
					'Awareness Alert for Strong Winds',
					'Action Alert Damaging Winds',
					'Potential Alert Damaging Winds'
				],
				Flooding: [
					'Awareness Alert for General Flooding',
					'Potential Alert for General Flooding',
					'Action Alert for General Flooding',
					'Potential Alert for Rapid Flooding',
					'Immediate Action Alert for Rapid Flooding',
					'Potential Alert for Waterfront Flooding / Erosion',
					'Action Alert for Waterfront Flooding / Erosion'
				],
				'T-Storm': [
					'Potential Alert for Strong to Severe T-Storms',
					'Immediate Action Alert for Strong T-Storm',
					'Immediate Action Alert for Severe T-Storm',
					'Immediate Action Alert for Rotating T-Storm',
					'Emergency Action Alert for Tornadic T-Storm'
				],
				Winter: [
					'Awareness Alert for Minor Icing',
					'Awareness Alert for Hazardous Travel',
					'Action Alert for Dangerous Travel',
					'Potential Alert for Moderate Winter Storm',
					'Action Alert for Moderate Winter Storm',
					'Potential Alert for Major Winter Storm',
					'Action Alert for Major Winter Storm',
					'Potential Alert for Blizzard',
					'Emergency Alert for Blizzard',
					'Potential Alert for Significant Icing',
					'Action Alert for Significant Icing',
					'Awareness Alert for Lake Effect Snow',
					'Potential Alert for Heavy Lake Effect Snow',
					'Action Alert for Heavy Lake Effect Snow'
				],
				'Extreme Temp': [
					'Potential Alert for Dangerous Wind Chills',
					'Action Alert for Dangerous Wind Chills',
					'Potential Alert for Dangerous Cold',
					'Action Alert for Dangerous Cold',
					'Potential Alert for Dangerous Heat',
					'Action Alert for Dangerous Heat'
				],
				Marine: [
					'Potential Mariners Alert for Waterspouts',
					'Immediate Action Mariners Alert for Waterspouts',
					'Immediate Action Mariners Alert for Strong to Severe T-Storms',
					'Potential Mariners Alert for Strong Winds / Wave Action',
					'Action Mariners Alert for Strong Winds / Wave Action',
					'Shoreline Potential Alert for Waterspouts Coming Ashore',
					'Shoreline Action Alert for Waterspouts Coming Ashore'
				],
				Misc: [
					'Special Weather Report',
					'Special Alert(s) Update Report',
					'Special Damage Report',
					'Hazardous Weather Report'
				]
			},
			alertDefList = alertDefsObj[alertType];
		event.preventDefault();
		alertDefMenu.find('li a').remove();
		alertDef.text('Choose One ').append('<span class="caret"></span>');
		if (alertDefList) {
			for (var i = 0; i < alertDefList.length; i++) {
				alertDefMenu.append(
					'<li><a href="#" value="' +
						alertDefList[i] +
						'">' +
						alertDefList[i] +
						'</a></li>'
				);
			}
		}
	}
});
