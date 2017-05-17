var windowZindex = 1;
var windowNum = 0;

var audio = new Audio("../sound/startMusic.ogg ");
audio.oncanplaythrough = function ( ) { }
audio.onended = function ( ) { }

audio.play()

function createWindow(title, name, src) {
      var wbox = $('.app-window:first').clone();
      wbox.find('.window-title').html(name);
      wbox.find('.window-content').attr('src', '../' + src);
      wbox.css({ display: 'block', 'z-index': ++windowZindex });
      wbox.attr('id', 'window' + (++windowNum));
      wbox.appendTo('.main-content');
      wbox.draggable({
        containment: 'parent',
        stop: function() {
          if($(this).css('left') === '0px') {
//            $(this).attr('prev-size', JSON.stringify($(this).css(['width', 'height'])));
            $(this).css({ left: '0px', top: '0px', width: '50%', height: 'calc(100% - 34px)' });
          } else if ($(this).css('right') === '0px') {
//            $(this).attr('prev-size', JSON.stringify($(this).css(['width', 'height'])));
            $(this).css({ left: '50%', top: '0px', width: 'calc(50% - 5px)', height: 'calc(100% - 34px)' });
//          } else if($(this).attr('prev-size')) {
//            $(this).css(JSON.parse($(this).attr('prev-size')));
//            $(this).removeAttr('prev-size');
          }
        },
      }).resizable({
//        animate: true,
//        ghost: true,
        containment: 'parent',
      });

      var tab = $('<li class="mini-tab ui-state-default"></li>').appendTo('#sortable');
      tab.append('<div class="mini-btn" point-to="window' + windowNum + '">' + title + '</div>');
}

$(function() {
/*
  $('#sortable').sortable({
    axis: 'x',
    containment: 'parent',
  });
*/
  $('.start-name').html(window.sessionStorage.getItem('lucyName'));
  $('#sortable').disableSelection();

  $('.chat-window').draggable({
        containment: 'parent',
      }).resizable({
        containment: 'parent',
      });

  window.postMessage({
   type: 'chat-box-message',
   message: "So you decided to do it? Very well. Follow my instructions and do everything I say to avoid detection. I got an intercepted message from " + window.sessionStorage.getItem("jackName") + " and one of their clients, some druggie. Go to the break my cipher app located on the desktop or the Start menu to decrypt it."
  }, '*');

  webpage_data.forEach(function(page) {
    var icon = $('<div class="app-icon"></div>').appendTo('.main-content');
    icon.append('<img src="../' + page.image + '">');
    icon.draggable({
      "containment": "parent",
    });
    icon.dblclick(function() {
      createWindow(page.title, page.name, page.src);
    });

    var menuRow = $('<div class="start-row"></div>').appendTo('.left-menu-content');
    menuRow.append('<img class="menu-icon" src="../' + page.image + '">');
    menuRow.append('<span class="menu-text">' + page.title + '</span>');
    menuRow.click(function() {
      icon.dblclick();
    });
  });

  for(prop in fileData) {
    var menuRow = $('<div class="start-row"></div>').appendTo('.right-menu-content');
    menuRow.append('<img class="menu-icon" src="../' + fileData[prop].icon + '">');
    menuRow.append('<span class="menu-text">' + prop + '</span>');
    menuRow.click(function() {
      window.sessionStorage.setItem('fileProps', this.prop);
      createWindow(this.prop, this.prop, fileData[this.prop].src);
    }.bind({ prop: prop }));
  }

  $('.start-btn').click(function(e) {
    if($('.start-menu').css('display') === 'none') {
      $('.start-menu').css({ display: 'block' });
      e.stopPropagation();
    } else {
      $('.start-menu').css({ display: 'none' });
    }
  });

  $('body').click(function() {
    document.body.webkitRequestFullScreen();
//    document.body.mozRequestFullScreen();
    $('.start-menu').css({ display: 'none' });
  });
});

$(document).on('click', '.window-header', function() {
  if($(this).parent().css('z-index') != windowZindex) {
    $(this).parent().css({ 'z-index': ++windowZindex });
  }
});

$(document).on('click', '.close-btn', function() {
  var wbox = $(this).parent().parent();
  $('.mini-btn[point-to="' + wbox.attr('id') + '"]').remove();
  wbox.remove();
});

$(document).on('click', '.max-btn', function() {
  var glyphicon = $(this).find('.glyphicon');
  var wbox = $(this).parent().parent();
  $(this).parent().click(); //move to front
  if(glyphicon.hasClass('glyphicon-resize-full')) { //maximize
    wbox.draggable('disable').resizable('disable');
    $(this).siblings('.min-btn').attr('disabled', true);
    wbox.attr('orig-size', JSON.stringify(wbox.css(['top', 'left', 'width', 'height'])));
    wbox.animate({
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
    }, 500);
    glyphicon.removeClass('glyphicon-resize-full').addClass('glyphicon-resize-small');
  } else { //return to previous state
    wbox.animate(JSON.parse(wbox.attr('orig-size')), 500);
    glyphicon.removeClass('glyphicon-resize-small').addClass('glyphicon-resize-full');
    $(this).siblings('.min-btn').attr('disabled', false);
    wbox.draggable('enable').resizable('enable');
  }
});

$(document).on('click', '.mini-btn', function() {
  var wbox = $('#' + $(this).attr('point-to'));
  if(wbox.css('display') === 'none') {
    wbox.css({ display: 'block' });
    wbox.find('.window-header').click();
  } else if(wbox.css('z-index') != windowZindex) {
    wbox.find('.window-header').click();
  } else {
    wbox.css({ display: 'none' });
  }
});

$(document).on('click', '.min-btn', function() {
  var wbox = $(this).parent().parent();
  wbox.css({ display: 'none' });
});
