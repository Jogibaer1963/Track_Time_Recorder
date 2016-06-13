/**
 * Created by Jogibaer on 01.03.2016.
 */

if (Meteor.isClient) {

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });


    Template.login.events({
        'submit form': function(event){
            event.preventDefault();
            var userVar = event.target.loginUser.value;
            var passwordVar = event.target.loginPassword.value;
            Meteor.loginWithPassword(userVar, passwordVar);
            FlowRouter.go('/')
        }
    });


    Template.register.events({
        'submit form': function(event) {
            event.preventDefault();
            var userVar = event.target.registerUser.value;
            var passwordVar = event.target.registerPassword.value;
            var role = event.target.registerRole.value;
            Accounts.createUser({
                username: userVar,
                password: passwordVar,
                profile: {name: role}
            });
        }
    });

    Template.mainLayout.events({
        'click .logout': function(event){
            event.preventDefault();
            Meteor.logout();
            FlowRouter.go('/');

        }
    });


}
