$(function() {
  var games = ['Cipher', 'WifiCrack', 'Zmail', 'Fakebook'];
  for(var i=0; i<games.length; i++) {
    if(window.sessionStorage.getItem('solved' + games[i]) === 'true') {
      $('.bookmark-contain[unlock="' + games[i] + '"] .lock').css({ display: 'none' });
    } else {
      $('.bookmark-contain[unlock="' + games[i] + '"] .icon').css({ opacity: 0.5 });
    }
  }

  $('.bookmark a').click(function() {
    parent.postMessage({
      'type': 'change-tab-url',
      'site': $(this).attr('name'),
    }, '*');
  });
});
