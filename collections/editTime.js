if (Meteor.isClient) {
    
    Template.editTime.helpers({


    });

    Template.editTime.events({


    });

    Template.machineTime.helpers({

        editMachineTime: function() {
            event.preventDefault();
            var machineTime = Session.get('editTime');
            return RecorderApp.find({_id: machineTime});
        },

        editIssuesPerCenter: function () {
            event.preventDefault();
            var editTime = Session.get('editTime') + 'workCenter';
            return TaktIssue.find({_id: editTime});
        }

    });

    Template.machineTime.events({

        'submit .timeEditPart_1': function() {
            var machineId = Session.get('editTime');
           var newMachine = event.target.newMachine.value;
           var newWaitTime = parseInt(event.target.newWaitTime.value);
           var newProcessDuration = parseInt(event.target.newProcessDuration.value);
           var newIssueCount = parseInt(event.target.newIssueCount.value);
            var newDownTime = parseInt(event.target.newDownTime.value);
           var newNoneValueTime = event.target.newNoneValueTime.value;
           Meteor.call('updateTime', machineId, newMachine, newWaitTime, newProcessDuration,
                        newIssueCount, newDownTime, newNoneValueTime);
            FlowRouter.go('editMachine');
        }

    });


    
}