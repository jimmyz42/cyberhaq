$(function() {
  $('span.jack-name').replaceWith(window.sessionStorage.getItem('jackName'));
  $('span.jack-email').replaceWith(window.sessionStorage.getItem('jackEmail'));
  $('span.lucy-name').replaceWith(window.sessionStorage.getItem('lucyName'));
  $('span.jack-first-name').replaceWith(window.sessionStorage.getItem('jackName').split(' ')[0]);
  $('span.lucy-first-name').replaceWith(window.sessionStorage.getItem('lucyName').split(' ')[0]);
});
