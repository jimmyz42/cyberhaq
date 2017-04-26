$(function() {
  if (typeof(window.sessionStorage) !== 'undefined' && window.sessionStorage.length === 0) {
    //Puzzle data
    var selectedPuzzleData = _.sample(puzzleData);
    window.sessionStorage.setItem('puzzleData', JSON.stringify(selectedPuzzleData));
    window.sessionStorage.setItem('solvedCipher', JSON.stringify(false));

    //Fakebook data (TODO)
    var selectedFakebookData = _.sample(fakebookData);
    window.sessionStorage.setItem('fakebookData', JSON.stringify(selectedFakebookData));

    //Bank data
    window.sessionStorage.setItem('bankData', JSON.stringify(bankData));
  } else {
    console.log('either storage does not exist or is already populated');
  }
});
