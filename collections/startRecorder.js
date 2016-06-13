/**
 * Created by Jogibaer on 20.02.2016.
 */
if (Meteor.isClient) {


    var issueCounter = 0;
    var downTime = 0;
    var timer = new Chronos.Timer(100);
    var timer_2 = new Chronos.Timer(100);
    var counter = 0;
    var counter_2 = 0;
    var minutes = 0;
    var minutes_2 = 0;
    var nonValueTime = 0;
    Session.set('inActiveState', 0);

    Template.startRecorder.helpers({

        time: function () {
            var timeNow = Session.get('timeStamp');
            var timeCount = ((timer.time.get()  / 1000).toFixed(0)) - timeNow;
            if(timeCount < 0) {
                timeCount = 0;
            }
            Session.set('timeCount', timeCount);
            if(timeCount >= 60){
                minutes ++;
                var timeStamp = (Date.now() / 1000).toFixed(0);
                Session.set('timeStamp', timeStamp);
            }
            return (minutes + ' : ' +  timeCount);
        },

        time_2: function () {
            var timeNow_2 = Session.get('timeStamp_2');
            var timeCount_2 = ((timer_2.time.get()  / 1000).toFixed(0)) - timeNow_2;
            if(timeCount_2 < 0) {
                timeCount_2 = 0;
            }
            Session.set('timeCount_2', timeCount_2);
            if(timeCount_2 >= 60){
                minutes_2 ++;
                var timeStamp_2 = (Date.now() / 1000).toFixed(0);
                Session.set('timeStamp_2', timeStamp_2);
            }
            return (minutes_2 + ' : ' +  timeCount_2);
        },

        'machineInProcess': function() {
            return Session.get('machineId');
        },

        'locationInProcess': function() {
           return Session.get('workCenter');
        }
    });


    Template.startRecorder.events({


        'click .buttonReturn': function() {
            Session.set('inActiveState', 0);
            FlowRouter.go('/');
        },

        'click #myonoffswitch': function(event) {
            if(counter == 0) {
                counter ++;
                timer.stop();
                timer_2.stop();
            } else {
                counter = 0;
                timer.start();
                var pauseTime = Session.get('timeCount');
                var timeStamp = (Date.now() / 1000).toFixed(0);
                var newTimeStart = timeStamp - pauseTime;
                Session.set('timeStamp', newTimeStart);
            }
        },

        'click #myonoffswitch_2': function(event) {
            if(counter_2 == 0) {
                counter_2 ++;
                timer_2.stop();
            } else {
                counter_2 = 0;
                timer_2.start();
                var pauseTime = Session.get('timeCount_2');
                var timeStamp = (Date.now() / 1000).toFixed(0);
                var newTimeStart = timeStamp - pauseTime;
                Session.set('timeStamp_2', newTimeStart);
            }
        },


        'click .startProcessButton': function () {
            event.preventDefault();
            Session.set('inActiveState', 1);
            var timeStamp = (Date.now() / 1000).toFixed(0);
            Session.set('timeStamp', timeStamp);
            timer.start();
            var processStartTime = Date.now();
            Session.set('startProcess', processStartTime);
        },

        'click .stopProcessButton': function () {
            timer.stop();
            Session.set('inActiveState', 4);
            var machineId = Session.get('machineId');
            var workCenter = Session.get('workCenter');
            var waitTime = '';
            var nonValueMin = parseInt(Math.floor(downTime/60).toFixed(0));
            var nonValueSec = (downTime - (nonValueMin*60));
            var trueTime = nonValueMin + ':' + nonValueSec +' min';
            Meteor.call('stopProcess', machineId, waitTime, minutes,
                issueCounter, nonValueMin, trueTime);
            minutes = 0;
            downTime = 0;
            issueCounter = 0;
        },

        'click .issueFoundButton': function (event) {
            event.preventDefault();
            var timeStamp_2 = (Date.now() / 1000).toFixed(0);
            Session.set('inActiveState', 3);
            Session.set('timeStamp_2', timeStamp_2);
            timer_2.start();
            timer.stop();
            var issueStartTime = Date.now();
            Session.set('startIssue', issueStartTime);
        },

        'click .issueSolvedButton': function (event) {
            event.preventDefault();
            Session.set('inActiveState', 1);
            timer_2.stop();
            timer.start();
            issueCounter += 1;
            var issueStart = Session.get('startIssue');
            var issueStopTime = Date.now();
            nonValueTime = ((issueStopTime - issueStart) / 1000).toFixed(0);
            console.log(nonValueTime);
            var nonValueMin = Math.floor(nonValueTime / 60).toFixed(0);
            var nonValueSec = (nonValueTime - (nonValueMin * 60));
            var trueTime = nonValueMin + ':' + nonValueSec +' min';
            downTime +=  parseInt(nonValueTime);
            var issueType = Session.get('issueType');
            var centerId = Session.get('centerId');
            var workCenter = Session.get('workCenter');
            Meteor.call('stopIssueRecorder', centerId, workCenter, issueType, nonValueTime, trueTime );
            minutes_2 = 0;
        }
      });

    Template.resultOfProcess.helpers({
        machineOverview: function() {
            var document_Id = Session.get('document_Id');
            return RecorderApp.find({_id: document_Id});
        },

        result: function() {
            var document_Id = Session.get('document_Id');
            return TaktIssue.find({mId: document_Id});
        }
    });

    Template.resultOfProcess.events({
        'click .buttonReturn': function() {
            Session.set('inActiveState', 0);
            FlowRouter.go('/');
        }
    });

    Template.issueReasonTemplate.events({
        'click .materialMovement': function (event) {
            event.preventDefault();
            var issueType = 'Material Movement';
            Session.set('issueType', issueType);
            Session.set('inActiveState', 5);
           },

        'click .techError': function (event) {
            event.preventDefault();
            var issueType = 'Tech Error';
            Session.set('issueType', issueType);
            Session.set('inActiveState', 5);
        },

        'click .lackOfTool': function (event) {
            event.preventDefault();
            var issueType = 'Lack of Tool';
            Session.set('issueType', issueType);
            Session.set('inActiveState', 5);
        },

        'click .undefined': function (event) {
            event.preventDefault();
            var issueType = 'undefined';
            Session.set('issueType', issueType);
            Session.set('inActiveState', 5);
        },

        'click .commCol': function (event) {
            event.preventDefault();
            var issueType = 'Communication COL';
            Session.set('issueType', issueType);
            Session.set('inActiveState', 5);
        },

        'click .commCoa': function (event) {
            event.preventDefault();
            var issueType = 'Communication COA';
            Session.set('issueType', issueType);
            Session.set('inActiveState', 5);
        },
        'click .commCse': function (event) {
            event.preventDefault();
            var issueType = 'Communication CSE';
            Session.set('issueType', issueType);
            Session.set('inActiveState', 5);
        },
        'click .partFitment': function (event) {
            event.preventDefault();
            var issueType = 'Part Fitment';
            Session.set('issueType', issueType);
            Session.set('inActiveState', 5);
        },

        'click .partDamaged': function (event) {
            event.preventDefault();
            var issueType = 'Damaged Part';
            Session.set('issueType', issueType);
            Session.set('inActiveState', 5);
        },

        'click .missStock': function (event) {
            event.preventDefault();
            var issueType = 'Missing in Stock';
            Session.set('issueType', issueType);
            Session.set('inActiveState', 5);
        },

        'click .missOutStock': function (event) {
            event.preventDefault();
            var issueType = 'Missing out of Stock';
            Session.set('issueType', issueType);
            Session.set('inActiveState', 5);
        }

    });

    Handlebars.registerHelper('inActive', function() {
        var inActiveStatus = Session.get('inActiveState');
        if(inActiveStatus == 0) {
            return 'inActiveButton';
        }
    });

    Handlebars.registerHelper('inActive_2', function() {
        var inActiveStatus = Session.get('inActiveState');
        if(inActiveStatus == 1) {
            return 'inActiveButton';
        }
    });

    Handlebars.registerHelper('inActive_3', function() {
        var inActiveStatus = Session.get('inActiveState');
        if(inActiveStatus == 3) {
            return 'inActiveButton';
        }
    });

    Handlebars.registerHelper('inActive_4', function() {
        var inActiveStatus = Session.get('inActiveState');
        if(inActiveStatus == 4) {
            return 'inActiveButton';
        }
    });

    Handlebars.registerHelper('inActive_5', function() {
        var inActiveStatus = Session.get('inActiveState');
        if(inActiveStatus == 5) {
            return 'inActiveButton';
        }
    });


}
