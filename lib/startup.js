RecorderApp = new Mongo.Collection("taktTimeStudy");
TaktIssue = new Mongo.Collection("taktTimeIssue");

if (Meteor.isClient) {

    Meteor.subscribe("timeStudy_2");
    Meteor.subscribe('timeStudy');
    Meteor.subscribe('taktIssue');
    Meteor.subscribe('taktTimeStudy');

    machinesArray();
    machinesProcess();
    nonValueTime();


    function machinesArray() {
        Meteor.call('arrayGraph', function(error, machineArray) {
            if (machineArray) {
                Session.set('machineArray', machineArray);
            } 
        });
    }

    function machinesProcess() {
        Meteor.call('processTime', function(error, processArray) {
            if (processArray) {
                Session.set('processTime', processArray);
            }
        });
    }

    function nonValueTime() {
        Meteor.call('nonValueTime', function(error, nonValueArray) {
            if (nonValueArray) {
                Session.set('nonValueTime', nonValueArray);
            }
        });
    }

}