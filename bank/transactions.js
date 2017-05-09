$(function() {
  var transactions = JSON.parse(window.sessionStorage.getItem('bankTransactions'));  
  for(var i=0;i<transactions.length;i++) {
    var row = $('<tr></tr>').appendTo('table.transactions');
    row.append('<td>' + transactions[i].date + '</td>');
    row.append('<td>' + (transactions[i].amount >= 0 ? 'Deposit' : 'Withdraw') + '</td>');
    row.append('<td>$' + (+Math.abs(transactions[i].amount).toFixed(2)).toLocaleString() + '</td>');
    row.append('<td>' + transactions[i].description + '</td>');
  }
});
