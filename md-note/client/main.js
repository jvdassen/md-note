import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
Markdown = new Mongo.Collection('markdown');

var editmode = false;

jQuery( document ).ready(function() {

  setTimeout(function(){
    console.log(Markdown.find({}).fetch()[Markdown.find({}).fetch().length-1].md);
    jQuery('#md-input').val(Markdown.find({}).fetch()[Markdown.find({}).fetch().length-1].md);
    var converter = new showdown.Converter(),
        text      = Markdown.find({}).fetch()[Markdown.find({}).fetch().length-1].md,
        html      = converter.makeHtml(text);

    jQuery('#md-display').html(html);
  }, 1000);

  jQuery("textarea").keyup(function() {
    var converter = new showdown.Converter(),
        text      = jQuery('textarea').val(),
        html      = converter.makeHtml(text);

    jQuery('#md-display').html(html);
    console.log(Markdown.insert({md: text, type: "save"}));
  });
  jQuery('#mode-btn').click(function(){
    if (editmode) {
      jQuery('#display-wrapper').css('width', '100%');
      jQuery('#input-wrapper').hide();
      editmode = false;
      jQuery('#mode-btn').text('Show');
    }else {
      jQuery('#display-wrapper').css('width', '50%');
      jQuery('#input-wrapper').show();
      editmode = true;
      jQuery('#mode-btn').text('Hide');
    }
  });

});



//
// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });
//
// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });
//
// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
