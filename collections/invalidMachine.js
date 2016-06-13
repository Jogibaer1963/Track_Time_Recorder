/**
 * Created by Jogibaer on 22.05.2016.
 */
if(Meteor.isClient) {


    Template.centerTestTemplate.helpers({

        centerTestTemplate: function () {
            event.preventDefault();
            var machineId = Session.get('machineId');
            var workCenter = Session.get('workCenter');
            return {workCenter: workCenter, machineId: machineId};
        }
    });

}