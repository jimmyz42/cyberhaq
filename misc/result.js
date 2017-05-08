$(function() {
  var resultName = window.sessionStorage.getItem('resultName');
  var result = _.find(outroData, { name: resultName });
  $('.result-item').append('<img class="result-img" src="' + result.image + '"></img>');
  $('.result-item').append('<p class="result-text">' + result.text + '</p>');
});
