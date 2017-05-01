$(window).on('message', function(e) {
  var msg = e.originalEvent.data;
  if(msg['type'] === 'change-tab-url') {
    $('li.active a').html(msg['site'] + '&nbsp;&nbsp;');
    $('.tab-pane.active .urlbar').val(_.find(webpage_data, { title: msg['site'] }).url);
  } else if(msg['type'] === 'chat-box-message') {
    $('.chat').trigger('chatMessage', [msg['message']]);
  }
});
