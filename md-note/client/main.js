import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
Markdown = new Mongo.Collection('markdown');

var editmode = false;
var defnote = 1;
var noteid;
var cheatsheet = {
  loaded: false,
  shown: false
};
jQuery( document ).ready(function() {

  setTimeout(function(){
    console.log(Markdown.find({note:defnote}).fetch()[0].md);
    jQuery('#md-input').val(Markdown.find({}).fetch()[0].md);
    var converter = new showdown.Converter(),
        text      = Markdown.find({note:defnote}).fetch()[0].md,
        html      = converter.makeHtml(text);

    noteid = Markdown.find({note:defnote}).fetch()[0]._id
    jQuery('#md-display').html(html);
    jQuery('textarea').keyup();
  }, 1000);

  jQuery("textarea").keyup(function() {
    var converter = new showdown.Converter(),
        text      = jQuery('textarea').val(),
        html      = converter.makeHtml(text);

    jQuery('#md-display').html(html);
    //console.log(Markdown.insert({md: text, type: "save", note: defnote}));
    if (Markdown.find({_id: noteid}).fetch().length) {
      console.log('noteid: ' + noteid);
      Markdown.update({_id: noteid},{$set: {md: text}})
    }
    else {
      noteid = Markdown.insert({md: text, type: "save", note: defnote})
    }


  });

  jQuery('#note-selector button').click(function(){
    jQuery('#note-selector button').attr('class', 'btn-deactivated')
    jQuery(this).attr('class', 'btn-activated');
    defnote = Number(jQuery(this).attr('id'));
    console.log(defnote);
      if (Markdown.find({note: defnote}).fetch().length == 0) {
        noteid = Markdown.insert({md: "", type: "save", note: defnote})

      }
      else {

      console.log(Markdown.find({note:defnote}).fetch()[0].md);
      jQuery('#md-input').val('');
      jQuery('#md-input').val(Markdown.find({note:defnote}).fetch()[0].md);
      var converter = new showdown.Converter(),
          text      = Markdown.find({note:defnote}).fetch()[0].md,
          html      = converter.makeHtml(text);

      noteid = Markdown.find({note:defnote}).fetch()[0]._id
      console.log('noteid: ' + noteid);
      jQuery('#md-display').html(html);

      }
      jQuery('textarea').keyup();

  });

  jQuery('#mode-btn').click(function(){
    if (editmode) {
      jQuery('#display-wrapper').css('width', '100%');
      jQuery('#input-wrapper').hide();
      editmode = false;
      jQuery('#mode-btn img').attr('src', 'icons/png/inclined-pencil.png');
    }else {
      jQuery('#display-wrapper').css('width', '50%');
      jQuery('#input-wrapper').show();
      editmode = true;
      jQuery('#mode-btn img').attr('src', 'icons/png/big-eye.png');
    }
  });

  jQuery('#cheatsheet-switcher').click(function(){
    if (!cheatsheet.loaded) {
      jQuery('#pseudo-iframe').append('<iframe src="/markdown-cheatsheet.html"></iframe>')
      cheatsheet.loaded = true;
    }

    if (!cheatsheet.shown) {
      jQuery('iframe').show();
      jQuery('#cheatsheet-switcher img').attr('src', '/icons/png/cancel-symbol-inside-a-circle.png');
      cheatsheet.shown = true;
      jQuery('#nav-bar').css('-webkit-filter', ' blur(1px)');
      jQuery('#nav-bar').css('-moz-filter', 'blur(1px)');
      jQuery('#nav-bar').css('-ms-filter', 'blur(1px)');
      jQuery('#nav-bar').css('-o-filter', 'blur(1px)');
      jQuery('#nav-bar').css('filter', 'blur(1px)')
    }

    else {
      jQuery('iframe').hide();
      jQuery('#cheatsheet-switcher img').attr('src', '/icons/png/info.png');
      cheatsheet.shown = false;
      jQuery('#nav-bar').css('filter', '')
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
