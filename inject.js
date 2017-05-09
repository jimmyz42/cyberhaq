$(function() {
  $('span.jack-name').replaceWith(window.sessionStorage.getItem('jackName'));
  $('span.jack-email').replaceWith(window.sessionStorage.getItem('jackEmail'));
  $('span.lucy-name').replaceWith(window.sessionStorage.getItem('lucyName'));
  $('span.lucy-email').replaceWith(window.sessionStorage.getItem('lucyName').toLowerCase().replace(/[^a-z]/g,'') + '@zmail.com');
  $('span.jack-first-name').replaceWith(window.sessionStorage.getItem('jackName').split(' ')[0]);
  $('span.lucy-first-name').replaceWith(window.sessionStorage.getItem('lucyName').split(' ')[0]);
});
