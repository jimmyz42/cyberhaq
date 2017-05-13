$(window).on('message', function(e) {
  var msg = e.originalEvent.data;
  if(msg['type'] === 'open-new-tab' || msg['type'] === 'open-new-window') {
    createWindow(msg.site, msg.site, msg.src);
  } else if(msg['type'] === 'endgame') {
    var rect = $('<div class="black-rect"></div>').appendTo('body');
    setTimeout(function() {
      rect.animate({
        opacity: 1
      }, 2000, function() {
        location.href = "../misc/result.html";
      });
    }, 500);
  }
});
