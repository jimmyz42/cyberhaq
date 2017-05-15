$(function() {
  var resultName = window.sessionStorage.getItem('resultName');
  var result = _.find(outroData, { name: resultName });
  $('.result-item').append('<img class="result-img" src="' + result.image + '"></img>');
  $('.result-item').append('<p class="result-text">' + result.text + '</p>');

  setTimeout(function() {
    $('.result-item').animate({
      opacity: 1
    }, 2000);
  }, 0); // can adjust wait time

  $('#go-back').click(function() {
//    location.href="../index.html";
    location.href="../desktop/desktop.html";
  });
  $('#new-game').click(function() {
    window.sessionStorage.clear();
//    location.href="instructions.html";
    location.href="../desktop/desktop.html";
  });
});
