$(function() {
  $('#login').on('shown.bs.modal', function(e) {
    $('#username').focus();
  });
  $('#reset').on('shown.bs.modal', function(e) {
    $('#email').focus();
  });

  $('#password').keyup(function(e) {
    if(e.keyCode === 13) $('#login-submit').click();
  });
  $('#login-submit').click(function() {
    $('.error').css({ display: 'none' });

    if($('#username').val() === 'jack@pot.com' && $('#password').val()=='hitTheRoadJack') {
      window.location.href='timeline.html';
    } else {
      $('.error').css({ display: 'block' });
      $('#password').val('');
    }
  });

  $('#forgot-pass').click(function() {
    $('.alert-success').css({ display: 'none' });
    $('.alert-danger').css({ display: 'none' });
    $('#login').modal('hide');
    $('#reset').modal('show');
  });

  $('#email').keyup(function(e) {
    if(e.keyCode === 13) $('#reset-submit').click();
  });
  $('#reset-submit').click(function() {
    //TODO: set flags to note that reset email should appear in zmail
    if ($('#email').val() == "jackpot@zmail.com") {
        $('.alert-success').css({ display: 'block' });
        $('.alert-danger').css({ display: 'none' });
        window.sessionStorage.setItem("resetEmailSent", "true");
    } else {
        $('.alert-success').css({ display: 'none' });
        $('.alert-danger').css({ display: 'block' });
    }
  });
});
