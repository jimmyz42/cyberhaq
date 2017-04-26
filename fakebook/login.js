$(function() {
  $('#password').keyup(function(e) {
    if(e.keyCode === 13) $('#login-submit').click();
  });
  $('#login-submit').click(function() {
    $('.error').css({ display: 'none' });

    if($('#username').val() === 'jack@pot.com' && $('#password').val()=='hitTheRoadJack') {
      window.location.href='timeline.html';
    } else {
      $('.error').css({ display: 'block' });
    }
  });

  $('#forgot-pass').click(function() {
    $('.alert-success').css({ display: 'none' });
    $('#login').modal('hide');
    $('#reset').modal('show');
  });

  $('#email').keyup(function(e) {
    if(e.keyCode === 13) $('#reset-submit').click();
  });
  $('#reset-submit').click(function() {
    $('.alert-success').css({ display: 'block' });
    //TODO: set flags to note that reset email should appear in zmail
  });
});
