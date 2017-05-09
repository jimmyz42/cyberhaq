var jackName = window.sessionStorage.getItem('jackName');

$(function() {
  $('#username').focus();
  $('#username').keyup(function(e) {
    if(e.keyCode === 13) $('#password').focus();
  });
  $('#password').keyup(function(e) {
    if(e.keyCode === 13) $('#submit').click();
  });

  $('#submit').click(function() {
    $('.error').css({ display: 'block' });
  });
});
