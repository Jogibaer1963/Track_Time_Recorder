/**
 * Created by Jogibaer on 06.03.2016.
 */
if(Meteor.isClient) {

    Template.doubleEntry.events({
    'click .backButton': function() {
        event.preventDefault();
        console.log('clicked');
        FlowRouter.go('/');


    }
    })





}