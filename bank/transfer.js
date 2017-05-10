var bankAccounts = JSON.parse(window.sessionStorage.getItem('bankAccounts'));
var bankTransactions = JSON.parse(window.sessionStorage.getItem('bankTransactions'));

$(function() {
  $('option.checking').attr('value', 'checking');
  $('option.savings').attr('value', 'savings');
  $('option.checking').html('Checking Account (' + bankAccounts.checking.account + ')');
  $('option.savings').html('Savings Account (' + bankAccounts.savings.account + ')');

  var savedState = window.sessionStorage.getItem('bankTransferState');
  if(savedState !== undefined) {
    savedState = JSON.parse(savedState);
    for(field in savedState) {
      $(field).val(savedState[field]);
    }
  }

  $('#submit').click(function() {
    var amt = +parseFloat($('#amount').val().replace(/[, $]/g, '')).toFixed(2);
    var fromAccName = $('#from-account').val();
    var toAccName = _.findKey(bankAccounts, { account: parseInt($('#to-account-num').val()) });    
    console.log(bankAccounts);
    console.log(toAccName);
    
    if($('#bank').val() !== 'Galactic Bank') {
      $('.error').html('The bank you specified does not exist.');
    } else if($('#to-account-name').val() === '') {
      $('.error').html('Account name cannot be empty.');
    } else if(toAccName === undefined) {
      $('.error').html('Account number does not exist');
    } else if(!(amt > 0 && amt <= bankAccounts[fromAccName].amount)) {
      $('.error').html('Invalid amount of money');
    } else if($('#description').val() === '') {
      $('.error').html('Description cannot be empty.'); 
    } else {
      window.sessionStorage.removeItem('bankTransferState');
      bankAccounts[fromAccName].amount -= amt;
      bankAccounts[toAccName].amount += amt;
      var transact = {
        amount: -amt,
        date: moment().format('M/D/YY'),
        description: 'Transfer to ' + $('#to-account-name').val() + ': ' + $('#description').val(),
      };
      bankTransactions.unshift(transact);
      window.sessionStorage.setItem('bankAccounts', JSON.stringify(bankAccounts));
      window.sessionStorage.setItem('bankTransactions', JSON.stringify(bankTransactions));

      var largeAcc = _.findKey(bankAccounts, acc => acc.amount >= 40000000);
      if(largeAcc !== undefined && largeAcc !== 'checking') {
        window.sessionStorage.setItem('resultName', largeAcc);
        parent.postMessage({
          type: 'endgame',
        }, '*');
      }

      location.href = 'accounts.html';
    }
  });
});

$(window).on('beforeunload', function() {
  var fields = ['#from-account', '#bank', '#to-account-name', '#to-account-num', '#amount', '#description'];
  var bankTransferState = _.zipObject(fields, _.map(fields, s => $(s).val()));
  window.sessionStorage.setItem('bankTransferState', JSON.stringify(bankTransferState));
});
