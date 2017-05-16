var promptOpts = {};
var blocked = false;
var messageQueue = [];

function processMessage() {
  if(blocked || messageQueue.length === 0) return;
  blocked = true;
  var msg = messageQueue.shift();
  if(msg['type'] === 'chat-box-message') {
    $('.chat').trigger('chatMessage', [msg['message']]);
  } else if(msg['type'] === 'chat-box-prompt') {
    if(msg['initial prompt']) $('.chat').trigger('chatMessage', [msg['initial prompt']]);
    promptOpts = msg;
  }
}

$(window).on('message', function(e) {
  var msg = e.originalEvent.data;
  if(msg['type'] === 'change-tab-url') {
    $('li.active a').html(msg['site'] + '&nbsp;&nbsp;');
    $('.tab-pane.active .urlbar').val(_.find(webpage_data, { title: msg['site'] }).url);
  } else if(msg['type'] === 'open-new-tab') {
    $('#add-tab').click();
    $('li.active a').html(msg['site'] + '&nbsp;&nbsp;');
    $('.tab-pane.active .urlbar').val(_.find(webpage_data, { title: msg['site'] }).url);
    $('.tab-pane.active .webpage-iframe').attr('src', msg['src']);
  } else if(msg['type'] === 'chat-box-message' || msg['type'] === 'chat-box-prompt') {
    messageQueue.push(msg);
    processMessage();
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
  function checkInput(msg, correct, opts) {
    opts = opts || [];
    if(!opts.includes('dontTrim')) {
      msg = msg.trim();
      correct = correct.trim();
    }
    if(opts.includes('ignoreCase')) {
      msg = msg.toLowerCase();
      correct = correct.toLowerCase();
    }
    if(opts.includes('contains')) {
      return correct.split(" ").every(v => msg.split(" ").includes(v));
    } else {
      return msg == correct;
    }
  }

  $('.chat').on('userMessage', function(e, msg) {
    console.log(msg);
    console.log( promptOpts['correct input']);
    console.log(msg === promptOpts['correct input']);
    if(checkInput(msg, promptOpts['correct input'], promptOpts['opts'])) {
      console.log(promptOpts['correct message']);
      $('.chat').trigger('chatMessage', [promptOpts['correct message']]);
      promptOpts = {}; // done handling this prompt
//      messageQueue.push({ type: 'chat-box-message', message: promptOpts['correct message'] });
//      processMessage();
    } else if(promptOpts['correct input'] !== undefined) {
      $('.chat').trigger('chatMessage', [promptOpts['incorrect message']]);
//      messageQueue.push({ type: 'chat-box-message', message: promptOpts['incorrect message'] });
//      processMessage();
    } else {
      $('.chat').trigger('chatMessage', ["Do not use this chat. We don't want to attract too much attention, in case someone is eavesdropping on our conversation."]);
//      messageQueue.push({ type: 'chat-box-message', message: "Do not use this chat for idle chatter. We don't want to attract too much attention, in case someone is eavesdropping on our conversation." });
//      processMessage();
    }
  });

  $('.chat').on('voiceoverDone', function(e) {
    blocked = false;
    if(promptOpts['correct input'] !== undefined) blocked = true;
    processMessage();
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
