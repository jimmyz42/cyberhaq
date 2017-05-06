var jackName = window.sessionStorage.getItem('jackName');

parent.postMessage({
  type: 'chat-box-message',
  message: 'Try to access ' + jackName + '\'s bank account through whatever means possible.',
}, '*');

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
