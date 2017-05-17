var audio = new Audio("../sound/endMusic.ogg ");
audio.oncanplaythrough = function ( ) { }
audio.onended = function ( ) { }
audio.play();


$(function() {
  var postStrings = [];
  var posts = fakebookData['posts'].map(function(obj) {
    return obj['text'] + '<img src="' + obj['image'] + '">';
  });
  var statuses = ['<div class="status-update">Born in ' + fakebookData['birthplace'] + '.</div>'];
  var so = fakebookData['relationships'];
  for(var i=0; i<so.length; i++) {
    statuses.push('<div class="status-update">Started dating ' + so[i] + '.</div>');
    if(i !== so.length-1) statuses.push('<div class="status-update">Broke up with ' + so[i] + '.</div>');
  }
  
  //Merge
  while(posts.length > 0 && statuses.length > 0) {
    postStrings.push(statuses.shift());
    postStrings.push(posts.shift());
  }
  while(posts.length > 0) postStrings.push(posts.shift());
  while(statuses.length > 0) postStrings.push(statuses.shift());

  for(var i=postStrings.length-1; i>=0; i--) { //put most recent first
    $('.main').append('<div class="fb-item">' + postStrings[i] + '</div>');
  }
});
