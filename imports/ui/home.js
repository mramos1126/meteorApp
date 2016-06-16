import { Meteor } from 'meteor/meteor';
import './home.html';

Template.home.onCreated(function(){
  console.log('loaded');
});

Template.home.helpers({
  'message' : function(){
    return Message.find({}, {sort: {created_on: -1}, limit:10}).fetch().reverse();
  },
  'userLoggedIn': function(){
    return Meteor.user();
  }
});

Template.home.events({
  "submit #new-msg": function(e){
    e.preventDefault();
    var message = $("[name='message']").val();
    Meteor.call('insertMessage', message);
    setTimeout(function(){
      $("[name='message']").val('');
    }, 100);
  }
});