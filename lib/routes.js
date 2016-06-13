/**
 * Created by Jogibaer on 15.02.2016.
 */
FlowRouter.route('/', {
    name: '/',
    action() {
        BlazeLayout.render('mainLayout')
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render('login')
    }
});

FlowRouter.route('/startRecorder', {
    name: 'startRecorder',
    action() {
        BlazeLayout.render('startRecorder')
    }
});

FlowRouter.route('/doubleEntry', {
    name: 'doubleEntry',
    action() {
        BlazeLayout.render('doubleEntry')
    }
});

FlowRouter.route('/editMachine', {
    name: 'editMachine',
    action() {
        BlazeLayout.render('editMachine')
    }
});

FlowRouter.route('/editTime', {
    name: 'editTime',
    action() {
        BlazeLayout.render('editTime')
    }
});



