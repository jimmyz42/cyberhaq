$(function() {
  if (typeof(window.sessionStorage) !== 'undefined' && window.sessionStorage.length === 0) {
    //Cipher data
    var selectedPuzzleData = puzzleData[Math.floor(Math.random() * (puzzleData.length))];
    window.sessionStorage.setItem('puzzleData', JSON.stringify(selectedPuzzleData));

    //Fakebook data (TODO)

    //Bank data
    window.sessionStorage.setItem('bankData', JSON.stringify(bankData));
  } else {
    console.log('either storage does not exist or is already populated');
  }
});
