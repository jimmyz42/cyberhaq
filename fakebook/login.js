$(function() {
  $('#login-submit').click(function() {
    $('.error').css({ display: 'none' });

    if($('#username').val() === 'jack@pot.com' && $('#password').val()=='hitTheRoadJack') {
      window.location.href='timeline.html';
    } else {
      $('.error').css({ display: 'block' });
    }
  });
});
