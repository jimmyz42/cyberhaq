$(function() {
  $('span.jack-name').replaceWith(window.sessionStorage.getItem('jackName'));
  $('span.jack-email').replaceWith(window.sessionStorage.getItem('jackEmail'));
  $('span.lucy-name').replaceWith(window.sessionStorage.getItem('lucyName'));
});
