$(function() {
// TODO: replace with randomized fields
  var field_names = ["Name", "Email", "Phone Number", "Birthday", "Relationship Status",
 "Elementary School", "Middle School", "High School", "College", "Favorite Actor",
 "Favorite Musician", "Favorite Artist"];
  var field_vals = ["Jack Pot", "jack@pot.com", "(555) 555-5555", "4/20/69",
"In a relationship with Shannon Chang", "Cambridge Elementary", "Cambridge Middle", "Cambridge High",
 "MIT", "Leonardo DiCaprio", "Taylor Swift", "Vincent Van Gogh"];

  for(var i=0; i<field_names.length; i++) {
    var row = $('<div class="row"></div>').appendTo('.fb-item');
    row.append('<div class="field-name col-xs-4">' + field_names[i] + ':</div>');
    row.append('<div class="field-val col-xs-8">' + field_vals[i] + '</div>');
  }
});
