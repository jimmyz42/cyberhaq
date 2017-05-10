$(function() {
    $(document).bind('keyup', function(e) {
        if(e.which == 39){
            $('.carousel').carousel('next');
        }
        else if(e.which == 37){
            $('.carousel').carousel('prev');
        }
    });

  var imageUrls = imageSources;
  for(var i=0; i<fakebookData.length; i++) {
    imageUrls.push(...fakebookData[i].friends.map(s => s.image));
    imageUrls.push(...fakebookData[i].posts.map(s => s.image));
    imageUrls.push(fakebookData[i]['profile image']);
    imageUrls.push(fakebookData[i]['banner image']);
  }

  $('.credits').html('CyberHaq was created by Jimmy Zeng, Elise Xue, Kairat Ashim, Raul Boquinr, Nick Nguyen, and Emily Ramirez. Image sources are shown below:<br><br>' + imageUrls.join('<br>'));

  $('#begin-btn').click(function() {
    location.href = "../index.html";
  });
  $('#view-btn').click(function() {
    if($(this).html() === 'Show Credits') {
      $('.credits').css({ display: 'block' });
      $('#credits-hide').css({ display: 'none' });
      $(this).html('Hide Credits');
    } else {
      $('.credits').css({ display: 'none' });
      $('#credits-hide').css({ display: 'block' });
      $(this).html('Show Credits');
    }
  });
});
