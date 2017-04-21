$(function() {
  var accounts = JSON.parse(window.sessionStorage.getItem('bankData')).jack.accounts;
  for(var account in accounts) {
    var row = $('<div class="row acc-item"></div>').appendTo('.bank-item');
    row.append('<div class="col-xs-7 col-xs-offset-1">' + account + '</div>');
    var value = (+accounts[account].toFixed(2)).toLocaleString();
    row.append('<div class="col-xs-4">$' + value + '</div>');
  }
});
