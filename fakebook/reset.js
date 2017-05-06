$(function() {
  $('#pass1').focus();
  $('#pass1').keyup(function(e) {
    if(e.keyCode === 13) $('#pass2').focus();
  });

  $('#pass2').keyup(function(e) {
    if(e.keyCode === 13) $('#reset-submit').click();
  });
  $('#reset-submit').click(function() {
    if($('#pass1').val() !== $('#pass2').val()) {
      $('.alert-danger').html('Passwords do not match.');
      $('.alert-danger').css({ display: 'block' });
      $('.alert-success').css({ display: 'none' });
    } else if($('#pass1').val().length < 8) {
      $('.alert-danger').html('Password must be at least 8 characters.');
      $('.alert-danger').css({ display: 'block' });
      $('.alert-success').css({ display: 'none' });
    } else {
      window.sessionStorage.setItem('fakebookPassword', $('#pass1').val());
      $('.alert-success').css({ display: 'block' });
      $('.alert-danger').css({ display: 'none' });
      setTimeout(function() {
        window.location.href='fakebook.html';
      }, 1000);
    }
  });
});
