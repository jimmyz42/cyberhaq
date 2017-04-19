var STARTING_FISH_COUNT = 0;

// globals
var $count, $pond, pondWidth, pondHeight;

// on document ready
$(function() {
  // setup
  $count = $('.count');
  $pond = $('.pond');
  determinePondSize();

  // events
  $(window).on('resize', determinePondSize);
  $pond.on('click', stirPond);

  // fill the pond
  spawnStartingFish();
});

function determinePondSize() {
  pondWidth = $pond.width();
  pondHeight = $pond.height();
}

function spawnStartingFish() {
  for (var i = 0; i < STARTING_FISH_COUNT; i++) {
    spawnFish(getRandom(pondWidth), getRandom(pondHeight));
  }
}

function stirPond(event) {
  spawnFish(event.clientX, event.clientY);
  if ($('.fish').length == 20) {
      if (window.sessionStorage.getItem("phishingSuccess") == "true") {
          window.location.href = "success.html";
      } else {
          window.location.href = "fail.html";
      }
  }
}

function spawnFish(x, y) {
  // setup fish
  var $fish = $('<div class="fish"><div class="fish-bob"><div class="fish-direction"><div class="fish-body"></div></div></div></div>');
  var colors = [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4];
  $fish.addClass('fish-' + colors[Math.floor(getRandom(15))]);
  if (getRandom(2) < 1) {
    $fish.addClass('fish-flip');
  }
  $fish.find('.fish-bob').css('animation-delay', '-' + getRandom(7) + 's');
  $fish.find('.fish-body').on('click', pokeFish.bind(this, $fish));
  positionFish($fish, x, y);

  // let fish go
  $pond.append($fish);
  setTimeout(doFishyThings.bind(this, $fish), getRandom(10000))
  $count.text($('.fish').length);
}

function pokeFish($fish) {
  $fish.toggleClass('fish-spin');
  return false;
}

function doFishyThings($fish) {
  blowBubble($fish);
  moveFish($fish);

  var timeout = $fish.data('timeout');
  clearTimeout(timeout);
  timeout = setTimeout(doFishyThings.bind(this, $fish), 10000 + getRandom(6000));
  $fish.data('timeout', timeout);
}

function blowBubble($fish) {
  var $bubble = $('<div class="bubble">');
  if ($fish.hasClass('fish-flip')) {
    $bubble.addClass('bubble-flip');
  }

  var x = $fish.data('x');
  var y = $fish.data('y');
  $bubble.css({ top: y + 'px', left: x + 'px' });

  $pond.prepend($bubble);
  setTimeout(popBubble.bind(this, $bubble), 4000);
}

function moveFish($fish) {
  var x = getRandom(pondWidth);
  var y = getRandom(pondHeight);

  if (x < $fish.data('x')) {
    $fish.addClass('fish-flip');
  } else {
    $fish.removeClass('fish-flip');
  }
  positionFish($fish, x, y);
}

function positionFish($fish, x, y) {
  $fish
    .css('transform', 'translate(' + x + 'px, ' + y + 'px)')
    .data('x', x)
    .data('y', y);
}

function popBubble($bubble) {
  $bubble.remove();
}

function getRandom(upper) {
  return Math.random() * upper;
}
