if (Meteor.isServer) {

    Meteor.publish('timeStudy', function () {
        return RecorderApp.find({}, {fields: {machineId: 1, issueCount: 1}});
    });

    Meteor.publish('timeStudy_2', function () {
        return RecorderApp.find({});
    });

    Meteor.publish('taktIssue', function() {
        return TaktIssue.find({});
    });

    Meteor.methods({

        'setWorkCenter':function(machineId, centerId, workCenter) {
            TaktIssue.upsert({_id: centerId}, {$addToSet: {machineId: machineId, WorkCenters: {workCenter: workCenter}}});
        },

        'stopProcess': function(machineId, waitTime, minutes, issueCounter, nonValueMin, trueTime) {
            RecorderApp.insert({_id: machineId, waitTime: waitTime,
                processDuration: minutes, issuesTotal: issueCounter, downTime: nonValueMin, trueTime: trueTime});
        },

        'startIssueRecorder': function(document_Id, issueStartTime) {
            RecorderApp.update({_id: document_Id}, {$set: {issueStartTime: issueStartTime}});
        },

        'stopIssueRecorder': function(centerId, workCenter, issueType, nonValueTime, trueTime) {
            TaktIssue.upsert({_id: centerId, 'WorkCenters.workCenter': {$eq: workCenter}},
                {$addToSet: {'WorkCenters.$.Issues': {issueType: issueType, issueDuration: nonValueTime, trueTime: trueTime}}});
        },

        'issueType': function (document_Id, issueType) {
            RecorderApp.update({_id: document_Id}, {$set: {issueType: issueType}});
        },

        'removeProcessMachine': function(processId, centerId) {
            RecorderApp.remove(processId);
            TaktIssue.remove({_id: centerId});
        },

        'updateMachine': function(editMachine, workCenter, processStartString, processDuration, downTime){
            RecorderApp.update({_id:editMachine}, {$set: {workCenter: workCenter, processStartString: processStartString,
                processDuration: processDuration, downTime: downTime}});
        },

        'updateTime': function(machineId, newMachine, newWaitTime, newProcessDuration, newIssueCount, newDownTime, newNoneValueTime) {
                RecorderApp.update({_id: machineId}, {$set: {waitTime: newWaitTime, processDuration: newProcessDuration,
                                     issuesTotal: newIssueCount, downTime: newDownTime, trueTime: newNoneValueTime}});
        },

        'arrayGraph': function() {
            var machineArray = [];
            var result = RecorderApp.find({}, {fields: {_id: 1}}, {sort: {_id: 1}}, {limit:10}).fetch();

            var graphArrayCount = result.length;
            for (i=0; i<graphArrayCount; i++) {
                var arrayString = JSON.stringify(result[i]);
                var arrayGraph = arrayString.slice(8,16);
                machineArray.push(arrayGraph);
                
            }
            return machineArray;
        },

        'processTime': function() {
            var processArray = [];
            var result = RecorderApp.find({}, {fields: {processDuration: 1, _id: 0}, limit:10}).fetch();
            var graphArrayCount = result.length;
            for (i=0; i<graphArrayCount; i++) {
            var arrayString = JSON.stringify(result[i]);
            var arrayProcess = arrayString.slice(19);
            var arrayProcessString = arrayProcess.replace("}", "");
            var arrayPro = parseInt(arrayProcessString);
            processArray.push(arrayPro);
            }
            return processArray;
        },

        'nonValueTime': function() {
            var nonValueArray = [];
            var result = RecorderApp.find({}, {fields: {downTime: 1, _id: 0}, limit:10}).fetch();
            var graphArrayCount = result.length;
            for (i=0; i<graphArrayCount; i++) {
                var arrayString = JSON.stringify(result[i]);
                var arrayProcess = arrayString.slice(12);
                var arrayProcessString = arrayProcess.replace("}", "");
                var arrayPro = parseInt(arrayProcessString);
                nonValueArray.push(arrayPro);
            }
            return nonValueArray;
        }
    })
}
