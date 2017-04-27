$(function() {
  $('.bookmark a').click(function() {
    parent.postMessage({
      'type': 'change-tab-url',
      'site': $(this).attr('name'),
    }, '*');
  });
});
