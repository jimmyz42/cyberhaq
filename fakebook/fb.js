var fakebookData = JSON.parse(window.sessionStorage.getItem('fakebookData'));

$(function() {
  $('.profile-pic').attr('src', fakebookData['profile image']);
  $('.banner').attr('src', fakebookData['banner image']);
  $('.profile-name, .banner-name').html(fakebookData['name']);
  $('html, body').css({ 'background-color': fakebookData['background color'] });
});
