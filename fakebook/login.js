var audio = new Audio("../sound/endMusic.ogg ");
audio.oncanplaythrough = function ( ) { }
audio.onended = function ( ) { }

var jackName = window.sessionStorage.getItem('jackName');

parent.postMessage({
   type: 'chat-box-message',
   message: 'Try to log in to ' + jackName + '\'s Fakebook account. You know their email address already, try to see if that provides any help.',
}, '*');

$(function() {
  $('#login').on('shown.bs.modal', function(e) {
    $('#username').focus();
  });
  $('#reset').on('shown.bs.modal', function(e) {
    $('#email').focus();
  });

  $('#username').keyup(function(e) {
    if(e.keyCode === 13) $('#password').focus();
  });
  $('#password').keyup(function(e) {
    if(e.keyCode === 13) $('#login-submit').click();
  });
  $('#login-submit').click(function() {
    $('.error').css({ display: 'none' });

    if($('#username').val() === window.sessionStorage.getItem('jackEmail') && $('#password').val() === window.sessionStorage.getItem('fakebookPassword')) {
      window.location.href='timeline.html';

      window.sessionStorage.setItem('solvedFakebook', true);
      console.log("whoaaaa");
      audio.play();

      parent.postMessage({
        type: 'chat-box-message',
        message: 'Now try to access ' + jackName + '\'s bank account! People put their whole lives on Fakebook, maybe the information on their Fakebook will be of some help.',
      }, '*');
    } else {
      $('.error').css({ display: 'block' });
      $('#password').val('');
      parent.postMessage({
        type: 'chat-box-message',
        message: 'Hmm, seems like you\'re having trouble logging in. Maybe try resetting their password?',
      }, '*');
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
    if ($('#email').val() === window.sessionStorage.getItem('jackEmail')) {
        $('.alert-success').css({ display: 'block' });
        $('.alert-danger').css({ display: 'none' });
        window.sessionStorage.setItem("resetEmailSent", "true");
        parent.postMessage({
          type: 'chat-box-message',
          message: 'Nice! Now go to ' + jackName + '\'s email to find the password reset email.',
        }, '*'); 
        setTimeout(function() {
          $('#reset').modal('hide');
          $('#email').val('');
        }, 1000);
    } else {
        $('.alert-success').css({ display: 'none' });
        $('.alert-danger').css({ display: 'block' });
    }
  });
});
