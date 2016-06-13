if (Meteor.isClient) {

    processData = [];

    Template.editMachine.helpers({

        showMachine: function() {
            return RecorderApp.find();
        },

        'selectedClass': function() {
            var checkedMachine = this._id;
            var selectedMachine = Session.get('selectedMachineId');
            if(selectedMachine == checkedMachine) {
                Session.set('editTime', checkedMachine);
                return 'selected'
            }
        }

    });


    Template.editMachine.events({
        'click .processMachine': function() {
            event.preventDefault();
            var processId = this._id;
            Session.set('selectedMachineId', processId);
        }

    });


    Template.issueTemplate.helpers({
        showIssuesPerCenter: function () {
            event.preventDefault();
            return TaktIssue.find();
        }

    });

    Template.editMachineData.events({
       'submit .editDataSet': function() {
           event.preventDefault();
           var editMachine = Session.get('selectedEditMachine');
           var workCenter = event.target.workCenter.value;
           var processStartString = event.target.processStartString.value;
           var processDuration = event.target.processDuration.value;
           var downtime = event.target.downTime.value;
           Meteor.call('updateMachine', editMachine, workCenter, processStartString, processDuration, downtime);
       }

    });


}