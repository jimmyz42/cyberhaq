var audio = new Audio("../sound/endMusic.ogg ");
audio.oncanplaythrough = function ( ) { }
audio.onended = function ( ) { }
audio.play();

var field_names = ["Name", "Email", "Phone Number", "Birthday", "Relationship Status",
 "Elementary School", "Middle School", "High School", "College", "Favorite Actors",
 "Favorite Musicians", "Favorite Artists"];

var field_vals = field_names.map(function(field_name) {
  return fakebookData[field_name.toLowerCase()].toString();
});

$(function() {
  for(var i=0; i<field_names.length; i++) {
    var row = $('<div class="row"></div>').appendTo('.fb-item');
    row.append('<div class="field-name col-xs-4">' + field_names[i] + ':</div>');
    row.append('<div class="field-val col-xs-8">' + field_vals[i] + '</div>');
  }
});
