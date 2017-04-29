var bankData = JSON.parse(window.sessionStorage.getItem('bankData'));

$(function() {
  $('#submit').click(function() {
    var amt = +parseFloat($('#amount').val()).toFixed(2);
    var acc = $('#from-account').val();
    acc = acc.substr(0, acc.length-11);

    
    if($('#bank').val() !== 'Galactic Bank') {
      $('.error').html('The bank you specified does not exist.');
    } else if($('#to-account-name').val() === '') {
      $('.error').html('Account name cannot be empty.');
    } else if($('#to-account-num').val() !== '12345678') {
      $('.error').html('Account number does not exist');
    } else if(!(amt > 0 && amt <= bankData.jack.accounts[acc])) {
      $('.error').html('Invalid amount of money');
    } else if($('#description').val() === '') {
      $('.error').html('Description cannot be empty.'); 
    } else {
      bankData.jack.accounts[acc] -= amt;
      var transact = {
        amount: -amt,
        date: moment().format('M/D/YY'),
        description: 'Transfer to ' + $('#to-account-name').val() + ': ' + $('#description').val(),
      };
      bankData.jack.transactions.unshift(transact);
      window.sessionStorage.setItem('bankData', JSON.stringify(bankData));

      location.href = 'accounts.html';
    }
  });
});
