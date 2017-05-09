var promptOpts = {};

$(window).on('message', function(e) {
  var msg = e.originalEvent.data;
  if(msg['type'] === 'change-tab-url') {
    $('li.active a').html(msg['site'] + '&nbsp;&nbsp;');
    $('.tab-pane.active .urlbar').val(_.find(webpage_data, { title: msg['site'] }).url);
  } else if(msg['type'] === 'chat-box-message') {
    $('.chat').trigger('chatMessage', [msg['message']]);
  } else if(msg['type'] === 'chat-box-prompt') {
    if(msg['initial prompt']) $('.chat').trigger('chatMessage', [msg['initial prompt']]);
    promptOpts = msg;
  } else if(msg['type'] === 'endgame') {
    setTimeout(function() {
      $('#browser, #instructions').animate({
        opacity: 0
      }, 2000, function() {
        location.href = "misc/result.html";
      });
    }, 500);
  }
});

$(function() {
  $('.chat').on('userMessage', function(e, msg) {
    if(msg === promptOpts['correct input']) {
      $('.chat').trigger('chatMessage', [promptOpts['correct message']]);
      promptOpts = {}; // done handling this prompt
    } else if(promptOpts['correct input'] !== undefined) {
      $('.chat').trigger('chatMessage', [promptOpts['incorrect message']]);
    } else {
      $('.chat').trigger('chatMessage', ["Do not use this chat. We don't want to attract too much attention, in case someone is eavesdropping on our conversation."]);
    }
  });
});

// MESSAGING PROTOCOL TO POST "message contents" onto chatbox
// parent.postMessage({
//    type: 'chat-box-message',
//    message: 'message contents.',
// }, '*');
/*
parent.postMessage({
   type: 'chat-box-prompt',
   'correct input': '<correct user input string>',
   'correct message': 'message Asterisk types if user input is right',
   'incorrect message': 'message Asterisk types if user
}, '*');
*/
