Template.alertTemplate.onCreated(function onCreated() {
    self.alertsHandle = Meteor.subscribe('alerts');
    $('body').addClass('no-bg');
});

Template.alertTemplate.onDestroyed(function onDestroyed() {
    $('body').removeClass('no-bg');
});

Router.route('/alert/:_id', {
    name: 'alertTemplate',
    template: 'alertTemplate',
    data: function() {
        return Alerts.findOne({_id: this.params._id});
    }
});