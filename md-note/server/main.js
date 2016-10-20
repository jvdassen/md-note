import { Meteor } from 'meteor/meteor';
Markdown = new Mongo.Collection('markdown');
Meteor.startup(() => {
  // code to run on server at startup

var basicAuth = new HttpBasicAuth("guest", "password");
basicAuth.protect();
});
