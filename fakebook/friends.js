var audio = new Audio("../sound/endMusic.ogg ");
audio.oncanplaythrough = function ( ) { }
audio.onended = function ( ) { }
audio.play();

$(function() {
  var row;
  var friends = fakebookData['friends'];
  for(var i=0; i<friends.length; i++) {
    if(i % 3 === 0) row = $('<div class="row"></div>').appendTo('.fb-item');
    var col = $('<div class="friend col-xs-4"></div>').appendTo(row);
    col.append('<img class="friend-pic" src="' + friends[i]['image'] + '"><br>' + friends[i]['name']);
  }
});
